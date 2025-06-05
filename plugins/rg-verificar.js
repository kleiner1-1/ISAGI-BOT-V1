import db from '../lib/database.js'
import fs from 'fs'
import PhoneNumber from 'awesome-phonenumber'
import { createHash } from 'crypto'  
import fetch from 'node-fetch'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i

let handler = async function (m, { conn, text, usedPrefix, command }) {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let mentionedJid = [who]
  let pp = await conn.profilePictureUrl(who, 'image').catch((_) => 'https://files.catbox.moe/xr2m6u.jpg')
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)
  if (user.registered === true) return m.reply(`\`\`\`『✦』Ya estás registrado.\`\`\`\n\n*¿Quiere volver a registrarse?*\n\nUse este comando para eliminar su registro.\n*${usedPrefix}unreg*`)
  if (!Reg.test(text)) return m.reply(`\`\`\`『✦』Formato incorrecto.\`\`\`\n\nUso del comamdo: *${usedPrefix + command} nombre.edad*\nEjemplo : *${usedPrefix + command} ${name2}.18*`)
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) return m.reply(`『✦』El nombre no puede estar vacío.`)
  if (!age) return m.reply(`『✦』La edad no puede estar vacía.`)
  if (name.length >= 100) return m.reply(`『✦』El nombre es demasiado largo.`)
  age = parseInt(age)
  if (age > 1000) return m.reply(`『✦』Wow el abuelo quiere jugar al bot.`)
  if (age < 5) return m.reply(`『✦』hay un abuelo bebé jsjsj.`)
  user.name = name + '✓'.trim()
  user.age = age
  user.regTime = + new Date      
  user.registered = true
  global.db.data.users[m.sender].coin += 40
  global.db.data.users[m.sender].exp += 300
  global.db.data.users[m.sender].joincount += 20
  let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 20)
let regbot = `╭━⭓ 〘 ʀᴇɢɪsᴛʀᴏ ᴄᴏᴍᴘʟᴇᴛᴏ 〙\n`
regbot += `╏ *˚ ༘♡ ⋆｡˚ 𝓝𝓸𝓶𝓫𝓻𝓮* » ${name}\n`
regbot += `╏ *˚ ༘♡ ⋆｡˚ 𝓔𝓭𝓪𝓭* » ${age} años\n`
regbot += `╏╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╮\n`
regbot += `╏┆• 🎁 𝗥𝗲𝗰𝗼𝗺𝗽𝗲𝗻𝘀𝗮𝘀:\n`
regbot += `╏╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯\n`
regbot += `╏├≡ ⛁ 𝙲𝙾𝙸𝙽𝚂: 40\n`
regbot += `╏├≡ ✰ 𝙴𝚇𝙿𝙴𝚁𝙸𝙴𝙽𝙲𝙸𝙰: 300\n`
regbot += `╏├≡ ❖ 𝚃𝙾𝙺𝙴𝙽𝚂: 20\n`
regbot += `╏╰──────\n`
regbot += `╰━━━━━━━━━━━━━━━━━┛\n`
regbot += `> \`\`\`Usa #𝗽𝗲𝗿𝗳𝗶𝗹 para ver tu perfil.\`\`\``
await m.react('📩')

await conn.sendMessage(m.chat, {
        text: regbot,
        contextInfo: {
            externalAdReply: {
                title: '୧⍤⃝⋆⌣⋆ 𝑼𝒔𝒖𝒓𝒂𝒓𝒊𝒐 𝑽𝒆𝒓𝒆𝒇𝒊𝒄𝒂𝒅𝒐 ❛░⃟ ⃟°˟',
                body: dev,
                thumbnailUrl: pp,
                sourceUrl: channel,
                mediaType: 1,
                showAdAttribution: true,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });    
}; 
handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar'] 

export default handler
