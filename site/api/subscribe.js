/* POST /api/subscribe — join the club / drop early access / restock list / waitlist.
   Sends a branded confirmation to the subscriber and a notification to the brand. */
const { getTransport, configured, from } = require('./_mail/transport');
const { subscriberEmail, subscriberText, ownerEmail } = require('./_mail/template');
const catalogue = require('./_mail/catalogue');

const SOURCES = new Set(['newsletter', 'drop', 'restock', 'waitlist']);
const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[a-z]{2,}$/i;
const hits = new Map(); // best-effort per-instance rate limit

function json(res, status, body) { res.setHeader('Content-Type', 'application/json'); res.setHeader('Cache-Control', 'no-store'); res.status(status).end(JSON.stringify(body)); }

function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  try { return JSON.parse(req.body || '{}'); } catch (e) { return {}; }
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return json(res, 405, { ok: false, error: 'POST only' });
  const body = readBody(req);
  const email = String(body.email || '').trim().toLowerCase();
  const phone = String(body.phone || '').trim().slice(0, 32);
  const source = SOURCES.has(body.source) ? body.source : 'newsletter';
  const product = body.product ? catalogue[String(body.product)] : null;
  if (body.company) return json(res, 200, { ok: true, delivered: false }); // honeypot: pretend success
  if (!EMAIL_RE.test(email)) return json(res, 400, { ok: false, error: 'Enter a real email address' });

  const ip = (req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '').split(',')[0].trim();
  const now = Date.now(); const h = hits.get(ip) || [];
  const recent = h.filter(t => now - t < 60_000); recent.push(now); hits.set(ip, recent);
  if (recent.length > 8) return json(res, 429, { ok: false, error: 'Slow down. Try again in a minute.' });

  const payload = { email, phone, source, product, rank: 'Saint', ip, ua: String(req.headers['user-agent'] || '').slice(0, 160) };
  console.log('[subscribe]', JSON.stringify({ email, phone, source, product: product?.handle || null, ip }));

  if (!configured()) return json(res, 200, { ok: true, delivered: false, note: 'SMTP not configured; signup logged' });

  const transport = getTransport();
  const to = process.env.MAIL_TO;
  try {
    const results = await Promise.allSettled([
      transport.sendMail({
        from: from(), to: email, replyTo: process.env.MAIL_REPLY_TO || to || undefined,
        subject: source === 'restock' ? `Restock list: ${product ? product.name : 'saved'} // TSC` : source === 'drop' ? 'Early access confirmed // Drop 07' : source === 'waitlist' ? 'Every list, one address // TSC' : 'Welcome to the club // TSC',
        html: subscriberEmail(payload), text: subscriberText(payload),
        headers: { 'X-TSC-Source': source, 'List-Unsubscribe': `<mailto:${process.env.MAIL_REPLY_TO || to || process.env.SMTP_USER}?subject=STOP>` }
      }),
      to ? transport.sendMail({ from: from(), to, subject: `New Saint // ${source} // ${email}`, html: ownerEmail(payload) }) : Promise.resolve(null)
    ]);
    const sent = results[0].status === 'fulfilled';
    if (!sent) console.error('[subscribe] subscriber mail failed', results[0].reason?.message);
    if (results[1].status === 'rejected') console.error('[subscribe] owner mail failed', results[1].reason?.message);
    return json(res, sent ? 200 : 502, { ok: sent, delivered: sent, error: sent ? undefined : 'Mail could not be sent right now' });
  } catch (e) {
    console.error('[subscribe]', e);
    return json(res, 502, { ok: false, error: 'Mail could not be sent right now' });
  }
};
