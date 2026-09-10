/* THE SAINTS CLUB — email templates. Table layout, inline styles, dark by design. */
const SITE = () => (process.env.SITE_URL || 'https://the-saints-club.vercel.app').replace(/\/$/, '');

const C = { ink: '#0a0a0b', ink2: '#111113', ink3: '#1a1a1e', ink4: '#26262b', bone: '#ede7e3', bone2: '#c9c3be', ash: '#8a8a88', rose: '#d0a4af', blood: '#b90000', green: '#0b2a22' };
const MONO = "'Courier New', Courier, monospace";
const SANS = "'Inter Tight', 'Helvetica Neue', Helvetica, Arial, sans-serif";
const BLACK = "'Grenze Gotisch', 'Old English Text MT', Georgia, 'Times New Roman', serif";
const DISPLAY = "'Big Shoulders Display', Impact, 'Arial Narrow', 'Helvetica Neue', Arial, sans-serif";

const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const money = n => 'R ' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const mono = (text, color = C.ash, size = 11, extra = '') => `<span style="font-family:${MONO};font-size:${size}px;letter-spacing:2px;text-transform:uppercase;color:${color};${extra}">${text}</span>`;

const NEXT_DROP = { name: 'OG Hoodie Restock', sub: 'Black faded // 500 GSM', day: '02', month: 'OCT', time: '19:00 SAST', units: 250 };

function copyFor(source, product) {
  switch (source) {
    case 'restock': return { pre: `You're on the restock list for ${product ? product.name : 'the piece'}. Members get the door first.`, title: ['Saved a', 'spot for you.'], body: `You're on the list for <b style="color:${C.bone}">${esc(product ? product.name : 'the piece')}</b>. When it lands you get the link before it goes public. No bots, no resellers, one per Saint.` };
    case 'drop': return { pre: 'Early access confirmed. The door opens 24 hours before everybody else.', title: ['You have', 'early access.'], body: `Confirmed for <b style="color:${C.bone}">Drop 07 // ${NEXT_DROP.name}</b>. Your link goes out 24 hours before the public opening. Keep this address alive.` };
    case 'waitlist': return { pre: 'Every waitlist, one address. You will hear first.', title: ['Every list.', 'One address.'], body: `You're on every waitlist from here on: restocks, new drops, mixers. First notice, every time. That's the whole deal.` };
    default: return { pre: 'Welcome to the club. Not for everybody, and that includes you now.', title: ['Welcome', 'to the club.'], body: `You're in. Rank <b style="color:${C.bone}">Saint</b>, effective now. First notice on every drop, waitlist priority on restocks, member price on tees and headwear. Rank up in the store and at the door.` };
  }
}

function productTile(p) {
  if (!p) return '';
  const img = `${SITE()}/assets/email/${p.img}.jpg`;
  return `
  <tr><td style="padding:0 32px 8px">${mono('The piece')}</td></tr>
  <tr><td style="padding:0 32px 32px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${C.ink4};background:${C.ink}">
      <tr>
        <td width="180" valign="top" style="padding:0"><a href="${SITE()}/product?h=${esc(p.handle)}" style="display:block"><img src="${img}" width="180" alt="${esc(p.name)}" style="display:block;width:180px;height:auto;border:0"></a></td>
        <td valign="middle" style="padding:20px 22px">
          ${mono(esc(p.cat) + ' // ' + (p.soldOut ? 'Restocking' : 'In stock'), C.rose)}<br>
          <a href="${SITE()}/product?h=${esc(p.handle)}" style="font-family:${DISPLAY};font-size:26px;line-height:1;font-weight:800;text-transform:uppercase;color:${C.bone};text-decoration:none;display:inline-block;margin:10px 0 8px">${esc(p.name)}</a><br>
          <span style="font-family:${DISPLAY};font-size:20px;font-weight:700;color:${C.bone}">${money(p.price)}</span>
          &nbsp;&nbsp;${mono('Members ' + money(p.member), C.rose, 10)}
        </td>
      </tr>
    </table>
  </td></tr>`;
}

function subscriberEmail({ email, source, product, rank = 'Saint' }) {
  const t = copyFor(source, product);
  const S = SITE();
  const raw = email.split('@')[0].replace(/[._-]+/g, ' ').trim();
  const name = esc(raw.charAt(0).toUpperCase() + raw.slice(1));
  t.body = t.body.charAt(0).toLowerCase() + t.body.slice(1);
  const steps = ['Saint', 'Apostle', 'Archangel'];
  const rankIdx = Math.max(0, steps.indexOf(rank));
  return `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark"><meta name="supported-color-schemes" content="dark">
<title>The Saints Club</title>
<link href="https://fonts.googleapis.com/css2?family=Grenze+Gotisch:wght@500&family=Big+Shoulders+Display:wght@700;800&family=Inter+Tight:wght@400;600&display=swap" rel="stylesheet">
<!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
<style>
  body { margin:0; padding:0; background:${C.ink}; -webkit-font-smoothing:antialiased; }
  table { border-collapse:collapse; }
  img { border:0; line-height:100%; -ms-interpolation-mode:bicubic; }
  a { color:${C.rose}; }
  @media (max-width: 620px) { .wrap { width:100% !important; } .pad { padding-left:20px !important; padding-right:20px !important; } .h1 { font-size:54px !important; } .stack, .stack td { display:block !important; width:100% !important; } .cd { font-size:44px !important; } }
</style>
</head>
<body style="margin:0;padding:0;background:${C.ink}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${C.ink}">${esc(t.pre)}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.ink}">
<tr><td align="center" style="padding:0">

  <!-- promo strip -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.bone}">
    <tr><td align="center" style="padding:9px 16px;font-family:${MONO};font-size:10px;letter-spacing:2px;text-transform:uppercase;color:${C.ink}">
      Not for everybody &nbsp;<span style="color:${C.blood}">&#9670;</span>&nbsp; JHB 011 &nbsp;<span style="color:${C.blood}">&#9670;</span>&nbsp; Drop 07 // ${NEXT_DROP.day}.${NEXT_DROP.month} ${NEXT_DROP.time}
    </td></tr>
  </table>

  <table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background:${C.ink}">

    <!-- header -->
    <tr><td class="pad" style="padding:28px 32px 18px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
        <td align="left" valign="middle"><a href="${S}" style="text-decoration:none"><img src="${S}/assets/email/logo.png" width="72" alt="TSC" style="display:block;width:72px;height:auto"></a></td>
        <td align="right" valign="middle">${mono('Sanctuary // <span style="color:' + C.blood + '">&#9679;</span> Live', C.ash, 10)}</td>
      </tr></table>
    </td></tr>

    <!-- hero -->
    <tr><td style="padding:0 0 0">
      <a href="${S}" style="display:block"><img src="${S}/assets/email/hero.jpg" width="600" alt="The Saints Club" style="display:block;width:100%;height:auto"></a>
    </td></tr>
    <tr><td style="height:2px;background:${C.blood};font-size:0;line-height:0">&nbsp;</td></tr>

    <!-- title -->
    <tr><td class="pad" style="padding:36px 32px 10px">
      ${mono('00 / ' + esc(source === 'restock' ? 'Restock list' : source === 'drop' ? 'Early access' : source === 'waitlist' ? 'Waitlist' : 'Membership'), C.ash)}
      <div class="h1" style="font-family:${BLACK};font-size:72px;line-height:0.9;color:${C.bone};margin-top:14px">${esc(t.title[0])}<br><span style="color:${C.rose}">${esc(t.title[1])}</span></div>
    </td></tr>
    <tr><td class="pad" style="padding:8px 32px 30px;font-family:${SANS};font-size:16px;line-height:1.55;color:${C.bone2}">
      ${name}, ${t.body}
    </td></tr>

    <!-- drop card -->
    <tr><td class="pad" style="padding:0 32px 8px">${mono('Next drop')}</td></tr>
    <tr><td class="pad" style="padding:0 32px 32px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.ink2};border:1px solid ${C.ink4}">
        <tr class="stack">
          <td width="50%" valign="top" style="padding:24px 22px;border-right:1px solid ${C.ink4}">
            ${mono('Drop 07 // ' + esc(NEXT_DROP.sub), C.rose, 10)}
            <div style="font-family:${BLACK};font-size:34px;line-height:0.95;color:${C.bone};margin-top:10px">${esc(NEXT_DROP.name)}</div>
            <div style="font-family:${SANS};font-size:13px;color:${C.ash};margin-top:12px">${NEXT_DROP.units} units. Members get the door 24 hours early.</div>
          </td>
          <td width="50%" valign="middle" align="center" style="padding:24px 22px">
            <table role="presentation" cellpadding="0" cellspacing="0"><tr>
              <td align="center" style="padding:0 10px"><div class="cd" style="font-family:${DISPLAY};font-size:56px;line-height:0.9;font-weight:800;color:${C.bone}">${NEXT_DROP.day}</div>${mono(NEXT_DROP.month, C.ash, 10)}</td>
              <td align="center" style="padding:0 10px;color:${C.blood};font-size:28px">&#9670;</td>
              <td align="center" style="padding:0 10px"><div class="cd" style="font-family:${DISPLAY};font-size:56px;line-height:0.9;font-weight:800;color:${C.bone}">19</div>${mono('00 SAST', C.ash, 10)}</td>
            </tr></table>
          </td>
        </tr>
      </table>
    </td></tr>

    ${productTile(product)}

    <!-- rank -->
    <tr><td class="pad" style="padding:0 32px 8px">${mono('Your rank')}</td></tr>
    <tr><td class="pad" style="padding:0 32px 34px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.green};border:1px solid #1c4a3c">
        <tr><td style="padding:22px 22px 6px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
            <td style="font-family:${BLACK};font-size:38px;line-height:1;color:${C.bone}">${esc(rank)}</td>
            <td align="right" style="font-family:${MONO};font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${C.rose}">Rank 0${rankIdx + 1} / 03</td>
          </tr></table>
        </td></tr>
        <tr><td style="padding:10px 22px 22px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
            ${steps.map((s, i) => `<td width="33%" style="padding:0 2px 0 0"><div style="height:3px;background:${i <= rankIdx ? C.rose : '#1c4a3c'};font-size:0;line-height:0">&nbsp;</div><div style="font-family:${MONO};font-size:9px;letter-spacing:2px;text-transform:uppercase;color:${i <= rankIdx ? C.bone : '#5f8a7a'};margin-top:8px">${s}${i === 1 ? ' // R5k' : i === 2 ? ' // R20k' : ''}</div></td>`).join('')}
          </tr></table>
        </td></tr>
      </table>
    </td></tr>

    <!-- CTA -->
    <tr><td align="center" class="pad" style="padding:0 32px 40px">
      <table role="presentation" cellpadding="0" cellspacing="0"><tr>
        <td align="center" bgcolor="${C.bone}" style="background:${C.bone}">
          <a href="${S}/shop" style="display:inline-block;padding:18px 36px;font-family:${MONO};font-size:12px;letter-spacing:3px;text-transform:uppercase;color:${C.ink};text-decoration:none;font-weight:bold">Enter the sanctuary &nbsp;&rarr;</a>
        </td>
      </tr></table>
    </td></tr>

    <!-- manifesto strip -->
    <tr><td style="background:${C.bone};padding:26px 32px" class="pad">
      <div style="font-family:${DISPLAY};font-size:26px;line-height:1.05;font-weight:800;text-transform:uppercase;color:${C.ink}">Heavyweight because the city is. Faded because we've been here. <span style="font-family:${BLACK};text-transform:none;color:${C.blood};font-weight:500">Reflective</span> because we move at night.</div>
    </td></tr>

    <!-- footer -->
    <tr><td class="pad" style="padding:30px 32px 10px" align="center">
      <a href="https://www.instagram.com/the.saintsclub/" style="font-family:${MONO};font-size:10px;letter-spacing:2px;text-transform:uppercase;color:${C.bone2};text-decoration:none">Instagram</a>
      <span style="color:${C.ink4}">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
      <a href="https://www.tiktok.com/@thesaintsclub" style="font-family:${MONO};font-size:10px;letter-spacing:2px;text-transform:uppercase;color:${C.bone2};text-decoration:none">TikTok</a>
      <span style="color:${C.ink4}">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
      <a href="${S}/club" style="font-family:${MONO};font-size:10px;letter-spacing:2px;text-transform:uppercase;color:${C.bone2};text-decoration:none">The Club</a>
    </td></tr>
    <tr><td class="pad" align="center" style="padding:6px 32px 40px;font-family:${MONO};font-size:9px;letter-spacing:1.5px;text-transform:uppercase;line-height:1.9;color:${C.ash}">
      &copy; 2026 The Saints Club &nbsp;//&nbsp; Midrand, Gauteng, ZA &nbsp;//&nbsp; JHB 011<br>
      You asked for this at ${S.replace(/^https?:\/\//, '')}. Reply with STOP to leave the list.
    </td></tr>
    <tr><td align="center" style="padding:0 0 30px"><div style="font-family:${BLACK};font-size:120px;line-height:0.8;color:${C.ink3}">TSC</div></td></tr>
  </table>

</td></tr>
</table>
</body>
</html>`;
}

function subscriberText({ email, source, product }) {
  const t = copyFor(source, product);
  return `THE SAINTS CLUB // JHB 011\n\n${t.title.join(' ')}\n\n${t.body.replace(/<[^>]+>/g, '')}\n\nNext drop: ${NEXT_DROP.name} // ${NEXT_DROP.day} ${NEXT_DROP.month} ${NEXT_DROP.time}\n${product ? `Piece: ${product.name} // ${money(product.price)}\n` : ''}\n${SITE()}/shop\n\nReply STOP to leave the list.`;
}

function ownerEmail({ email, phone, source, product, ip, ua }) {
  const row = (k, v) => `<tr><td style="padding:10px 14px;border-bottom:1px solid ${C.ink4};font-family:${MONO};font-size:10px;letter-spacing:2px;text-transform:uppercase;color:${C.ash};width:120px">${k}</td><td style="padding:10px 14px;border-bottom:1px solid ${C.ink4};font-family:${SANS};font-size:14px;color:${C.bone}">${esc(v || '—')}</td></tr>`;
  return `<!DOCTYPE html><html><body style="margin:0;background:${C.ink};padding:24px">
  <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:100%;background:${C.ink2};border:1px solid ${C.ink4}">
    <tr><td style="padding:22px 14px 8px;font-family:${BLACK};font-size:34px;color:${C.bone}">New Saint.</td></tr>
    <tr><td style="padding:0 14px 16px;font-family:${MONO};font-size:10px;letter-spacing:2px;text-transform:uppercase;color:${C.rose}">${esc(source)} signup // ${new Date().toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' })} SAST</td></tr>
    <tr><td><table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${row('Email', email)}${row('Phone', phone)}${row('Source', source)}${row('Piece', product ? `${product.name} (${product.handle})` : '')}${row('IP', ip)}${row('Device', ua)}
    </table></td></tr>
    <tr><td style="padding:16px 14px;font-family:${MONO};font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:${C.ash}">Sent by the-saints-club.vercel.app/api/subscribe</td></tr>
  </table></body></html>`;
}

/* ---------- contact form ---------- */
function shell({ pre, eyebrow, title, body, cta, ctaHref, extra = '' }) {
  const S = SITE();
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark"><title>The Saints Club</title>
<link href="https://fonts.googleapis.com/css2?family=Grenze+Gotisch:wght@500&family=Big+Shoulders+Display:wght@800&family=Inter+Tight:wght@400;600&display=swap" rel="stylesheet">
<style>body{margin:0;background:${C.ink}} @media (max-width:620px){.wrap{width:100%!important}.pad{padding-left:20px!important;padding-right:20px!important}.h1{font-size:50px!important}}</style></head>
<body style="margin:0;padding:0;background:${C.ink}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${C.ink}">${esc(pre)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.ink}"><tr><td align="center">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.bone}"><tr><td align="center" style="padding:9px 16px;font-family:${MONO};font-size:10px;letter-spacing:2px;text-transform:uppercase;color:${C.ink}">Not for everybody &nbsp;<span style="color:${C.blood}">&#9670;</span>&nbsp; JHB 011</td></tr></table>
  <table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background:${C.ink}">
    <tr><td class="pad" style="padding:28px 32px 18px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
      <td align="left"><a href="${S}"><img src="${S}/assets/email/logo.png" width="72" alt="TSC" style="display:block;width:72px;height:auto;border:0"></a></td>
      <td align="right">${mono('Sanctuary // <span style="color:' + C.blood + '">&#9679;</span> Live', C.ash, 10)}</td></tr></table></td></tr>
    <tr><td style="height:2px;background:${C.blood};font-size:0;line-height:0">&nbsp;</td></tr>
    <tr><td class="pad" style="padding:36px 32px 10px">${mono(esc(eyebrow), C.ash)}<div class="h1" style="font-family:${BLACK};font-size:66px;line-height:0.9;color:${C.bone};margin-top:14px">${title}</div></td></tr>
    <tr><td class="pad" style="padding:8px 32px 28px;font-family:${SANS};font-size:16px;line-height:1.55;color:${C.bone2}">${body}</td></tr>
    ${extra}
    ${cta ? `<tr><td align="center" class="pad" style="padding:6px 32px 40px"><table role="presentation" cellpadding="0" cellspacing="0"><tr><td bgcolor="${C.bone}" style="background:${C.bone}"><a href="${ctaHref}" style="display:inline-block;padding:18px 36px;font-family:${MONO};font-size:12px;letter-spacing:3px;text-transform:uppercase;color:${C.ink};text-decoration:none;font-weight:bold">${cta} &nbsp;&rarr;</a></td></tr></table></td></tr>` : ''}
    <tr><td class="pad" align="center" style="padding:10px 32px 40px;font-family:${MONO};font-size:9px;letter-spacing:1.5px;text-transform:uppercase;line-height:1.9;color:${C.ash}">&copy; 2026 The Saints Club &nbsp;//&nbsp; Midrand, Gauteng, ZA &nbsp;//&nbsp; JHB 011</td></tr>
    <tr><td align="center" style="padding:0 0 30px"><div style="font-family:${BLACK};font-size:120px;line-height:0.8;color:${C.ink3}">TSC</div></td></tr>
  </table></td></tr></table></body></html>`;
}

function quoteBlock({ topic, order, message }) {
  return `<tr><td class="pad" style="padding:0 32px 30px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.ink2};border:1px solid ${C.ink4};border-left:3px solid ${C.rose}"><tr><td style="padding:20px 22px">
    ${mono(esc(topic) + (order ? ' // Order ' + esc(order) : ''), C.rose, 10)}
    <div style="font-family:${SANS};font-size:15px;line-height:1.6;color:${C.bone2};margin-top:10px;white-space:pre-wrap">${esc(message)}</div>
  </td></tr></table></td></tr>`;
}

function contactReplyEmail(d) {
  const first = esc(d.name.split(' ')[0]);
  return shell({ pre: `We got your message, ${d.name}. Replies within a day.`, eyebrow: '00 / Received', title: `Got it,<br><span style="color:${C.rose}">${first}.</span>`,
    body: `Your message is in the inbox and a real person in Johannesburg will answer within a day, usually faster after dark. Here is what you sent us, for your records.`,
    extra: quoteBlock(d), cta: 'Back to the sanctuary', ctaHref: SITE() });
}
function contactReplyText(d) { return `THE SAINTS CLUB // JHB 011\n\nGot it, ${d.name}. We answer within a day.\n\nTopic: ${d.topic}${d.order ? ' // Order ' + d.order : ''}\n\n${d.message}\n\n${SITE()}`; }

function contactOwnerEmail(d) {
  const row = (k, v) => `<tr><td style="padding:10px 14px;border-bottom:1px solid ${C.ink4};font-family:${MONO};font-size:10px;letter-spacing:2px;text-transform:uppercase;color:${C.ash};width:120px">${k}</td><td style="padding:10px 14px;border-bottom:1px solid ${C.ink4};font-family:${SANS};font-size:14px;color:${C.bone}">${esc(v || '—')}</td></tr>`;
  return `<!DOCTYPE html><html><body style="margin:0;background:${C.ink};padding:24px">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:100%;background:${C.ink2};border:1px solid ${C.ink4}">
    <tr><td style="padding:22px 14px 8px;font-family:${BLACK};font-size:34px;color:${C.bone}">New message.</td></tr>
    <tr><td style="padding:0 14px 16px;font-family:${MONO};font-size:10px;letter-spacing:2px;text-transform:uppercase;color:${C.rose}">${esc(d.topic)} // ${new Date().toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' })} SAST // reply to this mail to answer</td></tr>
    <tr><td><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${row('From', d.name)}${row('Email', d.email)}${row('Order', d.order)}${row('Topic', d.topic)}${row('IP', d.ip)}${row('Device', d.ua)}</table></td></tr>
    <tr><td style="padding:18px 14px;font-family:${SANS};font-size:15px;line-height:1.6;color:${C.bone};white-space:pre-wrap;border-top:3px solid ${C.rose}">${esc(d.message)}</td></tr>
    <tr><td style="padding:16px 14px;font-family:${MONO};font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:${C.ash}">Sent by ${SITE().replace(/^https?:\/\//, '')}/contact</td></tr>
  </table></body></html>`;
}

module.exports = { subscriberEmail, subscriberText, ownerEmail, copyFor, contactReplyEmail, contactReplyText, contactOwnerEmail };
