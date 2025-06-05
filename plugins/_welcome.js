import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;
  const fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net"}  
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg')
  let img = await (await fetch(`${pp}`)).buffer()
  let chat = global.db.data.chats[m.chat]
  let txt = `  ..••°°°°••....••°°°°••..\n     𝓑𝓲𝓮𝓷𝓿𝓮𝓷𝓲𝓭𝓸 \n${groupMetadata.subject}`;
  let txt1 = `   ..••°°°°••....••°°°°••..\n     𝓐𝓭𝓲𝓸𝓼 \n${groupMetadata.subject}`;
  let groupSize = participants.length
  if (m.messageStubType == 27) {
    groupSize++;
  } else if (m.messageStubType == 28 || m.messageStubType == 32) {
    groupSize--;
  }

  if (chat.welcome && m.messageStubType == 27) {
    let bienvenida = `╭┈〔 𝐁𝐈𝐄𝐍𝐕𝐄𝐍𝐈𝐃𝐎/𝐀 〕┈╮
│🎉 𝚄𝚂𝚄𝙰𝚁𝙸𝙾: @${m.messageStubParameters[0].split`@`[0]}
│🍬 𝙼𝙸𝙴𝙼𝙱𝚁𝙾𝚂: ${groupSize}
│🗓️ 𝙵𝙴𝙲𝙷𝙰: ${date}
│🪀 𝙶𝚁𝚄𝙿𝙾: ${groupMetadata.subject}
╰─────────────────╯
${global.welcom1}

> ✐ \`\`\`Usa #𝗺𝗲𝗻𝘂 para ver los comandos disponibles.\`\`\`
¡🌴 Disfruta tu estadía en el grupo!`    
    await conn.sendMini(m.chat, txt, textbot, bienvenida, img, img, redes, fkontak)
  }
  
  if (chat.welcome && (m.messageStubType == 28 || m.messageStubType == 32)) {
    let bye = `╭┈〔 𝐇𝐀𝐒𝐓𝐀 𝐏𝐑𝐎𝐍𝐓𝐎 〕┈╮
│🧩 *𝚄𝚂𝚄𝙰𝚁𝙸𝙾:* @${m.messageStubParameters[0].split`@`[0]}
│🌴 *𝙼𝙸𝙴𝙼𝙱𝚁𝙾𝚂:* ${groupSize}
│🗓️ *𝙵𝙴𝙲𝙷𝙰:* ${date}
│🍬 *𝙶𝚁𝚄𝙿𝙾:* ${groupMetadata.subject}
╰─────────────────╯
${global.welcom2}

> ✐ \`\`\`Usa #𝗺𝗲𝗻𝘂 para ver los comandos disponibles.\`\`\`
😢 ¡Te extrañaremos xd!`
    await conn.sendMini(m.chat, txt1, dev, bye, img, img, redes, fkontak)
  }}
