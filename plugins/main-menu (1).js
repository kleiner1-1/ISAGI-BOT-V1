import fs from 'fs'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
const { levelling } = '../lib/levelling.js'
import { promises } from 'fs'
import { join } from 'path'
let handler = async (m, { conn, usedPrefix, usedPrefix: _p, __dirname, text, command }) => {
try {        
/*let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}*/
let { exp, coin, level, role } = global.db.data.users[m.sender]
let { min, xp, max } = xpRange(level, global.multiplier)
let name = await conn.getName(m.sender)
let _uptime = process.uptime() * 1000
let _muptime
if (process.send) {
process.send('uptime')
_muptime = await new Promise(resolve => {
process.once('message', resolve)
setTimeout(resolve, 1000)
}) * 1000
}
let user = global.db.data.users[m.sender]
let muptime = clockString(_muptime)
let uptime = clockString(_uptime)
let totalf = Object.values(global.plugins).filter((v) => v.help && v.tags).length;
let totalreg = Object.keys(global.db.data.users).length
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let mentionedJid = [who]
let perfil = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://files.catbox.moe/8ghilc.jpg')
let taguser = '@' + m.sender.split("@s.whatsapp.net")[0]
const vid = ['https://files.catbox.moe/cyvhxp.mp4', 'https://files.catbox.moe/v6ksr6.jpg', 'https://files.catbox.moe/ljmjmj.jpg']

let menu = `  
       [𔓕𝐈𝐒𝐀𝐆𝐈 𝐁𝐎𝐓 𝐕𝟏꯭꯭𔓕]
  
╭──────────────
┃ *❤️ Hola @${taguser} Soy ${botname}*
╰──────────────
┏━━⌠ \`𝗜 𝗡 𝗙 𝗢 - 𝗕 𝗢 𝗧\` ⌡━━
┃╭━═┅═━––––––––─•
┃│• 𝙾𝚆𝙽𝙴𝚁: ᴏғᴄ
┃│• 𝙼𝙾𝙳𝙾: 𝙿𝚁𝙸𝚅𝙰𝙳𝙾 
┃│• 𝙱𝙾𝚃: ${(conn.user.jid == global.conn.user.jid ? '`ᴏғɪᴄɪᴀʟ 🅞`' : '`sᴜʙ - ʙᴏᴛ 🅢`')}
┃│• 𝚄𝚂𝚄𝙰𝚁𝙸𝙾𝚂: ${totalreg}
┃│• 𝙲𝙾𝙼𝙰𝙽𝙳𝙾𝚂: ${totalf}
┃│• 𝙰𝙲𝚃𝙸𝚅𝙾: ${uptime}
┃╰━═┅═━––––––––─•
┗━━━━━━━━━━━━━━━━━━

┏━━⌠ \`𝗨 𝗦 𝗨 𝗔 𝗥 𝗜 𝗢\` ⌡━━━
┃ *╭ ╴ ╴╴╴╴╴╴╴╴╴╴╴*
┃│あ 𝙲𝙻𝙸𝙴𝙽𝚃𝙴: ${name}
┃│あ 𝙴𝚇𝙿: ${exp}
┃│あ 𝙲𝙾𝙸𝙽𝚂: ${coin}
┃│あ 𝙽𝙸𝚅𝙴𝙻: ${level}
┃│あ 𝚁𝙰𝙽𝙶𝙾: ${role}
┃ *╰ ╴ ╴╴╴╴╴╴╴╴╴╴╴*
┗━━━━━━━━━━━━━━━━━━
‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎
ꪶ  𝙇𝙄𝙎𝙏𝘼 𝘿𝙀 𝘾𝙊𝙈𝘼𝙉𝘿𝙊𝙎


> ᥴrᥱᥲ ᥙᥒ *sᥙᑲ-ᑲ᥆𝗍* ᥴ᥆ᥒ 𝗍ᥙ ᥒúmᥱr᥆ ᥙ𝗍іᥣіzᥲᥒძ᥆ *#qr* o *#code*
ׅׄ︶ٜٜٜٜׄ߭ׄ߭ׄ߭ׄ߭⏝ׅׄ︶ٜٜׄ߭ׄ߭⏝ׄ.ׅ︶ٜٜׄ߭ׄ߭⏝ׅׄ︶ٜٜׄ߭ׄ߭⏝ٜׄׄ߭⏝ׅׄ.︶ٜٜٜٜׄ߭ׄ߭ׄ߭ׄ߭

╭──⬣「 𝙸𝙽𝙵𝙾 」⬣
│ ≡◦ .menu
│ ≡◦ .uptime
│ ≡◦ .script
│ ≡◦ .staff
│ ≡◦ .creador
│ ≡◦ .grupos
│ ≡◦ .estado
│ ≡◦ .infobot
│ ≡◦ .sug
│ ≡◦ .ping
│ ≡◦ .reportar *<text>*
│ ≡◦ .reglas
│ ≡◦ .speed
│ ≡◦ .sistema
│ ≡◦ .usuarios
│ ≡◦ .ds
│ ≡◦ .funciones
│ ≡◦ .editautoresponder
╰───────────────╯

╭──⬣「 𝚂𝙴𝙰𝚁𝙲𝙷 」⬣
│ ≡◦ .animeinfo
│ ≡◦ .animesearch
│ ≡◦ .cuevana
│ ≡◦ .githubsearch
│ ≡◦ .searchhentai
│ ≡◦ .google *<búsqueda>*
│ ≡◦ .imagen *<query>*
│ ≡◦ .infoanime
│ ≡◦ .githubstalk *<query>*
│ ≡◦ .soundcloudsearch *<txt>*
│ ≡◦ .pinterest
│ ≡◦ .pornhubsearch
│ ≡◦ .npmjs
│ ≡◦ .tiktoksearch *<txt>*
│ ≡◦ .tweetposts
│ ≡◦ .xnxxs
│ ≡◦ .xvsearch
│ ≡◦ .yts
╰───────────────╯

╭──⬣「 𝚂𝚄𝙱 𝙱𝙾𝚃𝚂 」⬣
│ ≡◦ .qr
│ ≡◦ .code
│ ≡◦ .token
│ ≡◦ .sockets
│ ≡◦ .deletesesion
│ ≡◦ .pausarai
╰───────────────╯

╭──⬣「 𝙵𝚄𝙽 」⬣
│ ≡◦ .gay <@tag> | <nombre> 
│ ≡◦ .lesbiana <@tag> | <nombre> 
│ ≡◦ .pajero <@tag> | <nombre> 
│ ≡◦ .pajera <@tag> | <nombre> 
│ ≡◦ .puto <@tag> | <nombre> 
│ ≡◦ .puta <@tag> | <nombre> 
│ ≡◦ .manco <@tag> | <nombre> 
│ ≡◦ .manca <@tag> | <nombre> 
│ ≡◦ .rata <@tag> | <nombre>
│ ≡◦ .prostituta <@tag> | <nombre> 
│ ≡◦ .amigorandom
│ ≡◦ .jalamela
│ ≡◦ .simi
│ ≡◦ .chiste
│ ≡◦ .consejo
│ ≡◦ .doxear <mension>
│ ≡◦ .facto
│ ≡◦ .prostituto <@tag> | <nombre>
│ ≡◦ .formarpareja
│ ≡◦ .formarpareja5
│ ≡◦ .frase
│ ≡◦ .huevo @user
│ ≡◦ .chupalo <mencion>
│ ≡◦ .aplauso <mencion>
│ ≡◦ .marron <mencion>
│ ≡◦ .suicidar
│ ≡◦ .iqtest <mencion>
│ ≡◦ .meme
│ ≡◦ .morse
│ ≡◦ .nombreninja *<texto>*
│ ≡◦ .paja
│ ≡◦ .personalidad <mencion>
│ ≡◦ .pregunta 
│ ≡◦ .piropo 
│ ≡◦ .zodiac *2002 02 25*
│ ≡◦ .ship 
│ ≡◦ .sorte 
│ ≡◦ .top [texto]
│ ≡◦ .formartrio <mencion>
│ ≡◦ .tt 
╰───────────────╯

╭──⬣「 𝙶𝙰𝙼𝙴 」⬣
│ ≡◦ .ahorcado
│ ≡◦ .delxo
│ ≡◦ .genio *<pregunta>*
│ ≡◦ .math *<mode>*
│ ≡◦ .ppt 
│ ≡◦ .pvp
│ ≡◦ .sopa
│ ≡◦ .ttt
╰───────────────╯

╭──⬣「 𝙰𝙽𝙸𝙼𝙴 」⬣
│ ≡◦ .angry/enojado @tag
│ ≡◦ .bath/bañarse @tag
│ ≡◦ .bite/morder @tag
│ ≡◦ .bleh/lengua @tag
│ ≡◦ .blush/sonrojarse @tag
│ ≡◦ .bored/aburrido @tag
│ ≡◦ .nights/noches
│ ≡◦ .dias/days
│ ≡◦ .coffe/cafe @tag
│ ≡◦ .cry/llorar @tag
│ ≡◦ .cuddle/acurrucarse @tag
│ ≡◦ .dance/bailar @tag
│ ≡◦ .drunk/borracho @tag
│ ≡◦ .eat/comer @tag
│ ≡◦ .facepalm/palmada @tag
│ ≡◦ .happy/feliz @tag
│ ≡◦ .hello/hola @tag
│ ≡◦ .hug/abrazar @tag
│ ≡◦ .kill/matar @tag
│ ≡◦ .kiss2/besar2 @tag
│ ≡◦ .kiss/besar @tag
│ ≡◦ .laugh/reirse @tag
│ ≡◦ .lick/lamer @tag
│ ≡◦ .love2/enamorada @tag
│ ≡◦ .patt/acariciar @tag
│ ≡◦ .poke/picar @tag
│ ≡◦ .pout/pucheros @tag
│ ≡◦ .ppcouple
│ ≡◦ .preg/embarazar @tag
│ ≡◦ .punch/golpear @tag
│ ≡◦ .run/correr @tag
│ ≡◦ .sad/triste @tag
│ ≡◦ .scared/asustada @tag
│ ≡◦ .seduce/seducir @tag
│ ≡◦ .shy/timida @tag
│ ≡◦ .slap/bofetada @tag
│ ≡◦ .sleep/dormir @tag
│ ≡◦ .smoke/fumar @tag
│ ≡◦ .think/pensando @tag
│ ≡◦ .undress/encuerar @tag
│ ≡◦ .waifu
╰───────────────╯

╭──⬣「 𝙿𝙴𝚁𝙵𝙸𝙻 」⬣
│ ≡◦ .reg
│ ≡◦ .unreg
│ ≡◦ .profile
│ ≡◦ .marry *[mension / etiquetar]*
│ ≡◦ .divorce
│ ≡◦ .setgenre *<text>*
│ ≡◦ .delgenre
│ ≡◦ .setbirth *<text>*
│ ≡◦ .delbirth
│ ≡◦ .setdesc *<text>*
│ ≡◦ .deldesc
╰───────────────╯

╭──⬣「 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳 」⬣
│ ≡◦ .animedl
│ ≡◦ .fb
│ ≡◦ .sound
│ ≡◦ .gitclone *<url git>*
│ ≡◦ .gdrive
│ ≡◦ .ig
│ ≡◦ .mediafire <url>
│ ≡◦ .mega
│ ≡◦ .apk <nombre>
│ ≡◦ .pinvid *<link>*
│ ≡◦ .apk2 <busqueda>
│ ≡◦ .npmdl
│ ≡◦ .tt2
│ ≡◦ .play
│ ≡◦ .play2
│ ≡◦ .tiktokrandom
│ ≡◦ .spotify
│ ≡◦ .tiktokhd
│ ≡◦ .snapchat *<link>*
│ ≡◦ .terabox
│ ≡◦ .tiktok *<url>*
│ ≡◦ .tiktokmp3 *<url>*
│ ≡◦ .tiktokimg <url>
│ ≡◦ .twitter <url>
│ ≡◦ .xvideosdl
│ ≡◦ .xnxxdl
│ ≡◦ .pindl
╰───────────────╯

╭──⬣「 𝚂𝚃𝙰𝙻𝙺 」⬣
│ ≡◦ .tiktokstalk *<usuario>*
│ ≡◦ .kwaistalk *<usuario>*
│ ≡◦ .telegramstalk *<nombre_usuario>*
│ ≡◦ .youtubestalk *<nombre de usuario>*
╰───────────────╯

╭──⬣「 𝙿𝚁𝙴𝙼𝙸𝚄𝙼 」⬣
│ ≡◦ .comprarpremium
│ ≡◦ .premium
│ ≡◦ .vip
│ ≡◦ .spamwa <number>|<mesage>|<no of messages>
╰───────────────╯

╭──⬣「 𝙴𝙲𝙾𝙽𝙾𝙼𝙸𝙰 」⬣
│ ≡◦ .aventura
│ ≡◦ .baltop
│ ≡◦ .bank / bal
│ ≡◦ .cazar 
│ ≡◦ .codigo *<cantida de coins>*
│ ≡◦ .canjear *<código>*
│ ≡◦ .cartera
│ ≡◦ .apostar *<cantidad>*
│ ≡◦ .cf
│ ≡◦ .cofre
│ ≡◦ .crimen
│ ≡◦ .daily
│ ≡◦ .depositar 
│ ≡◦ .explorar
│ ≡◦ .gremio
│ ≡◦ .halloween
│ ≡◦ .heal
│ ≡◦ .inventario 
│ ≡◦ .mensual
│ ≡◦ .mazmorra
│ ≡◦ .minar
│ ≡◦ .navidad
│ ≡◦ .retirar
│ ≡◦ .robar
│ ≡◦ .robarxp
│ ≡◦ .ruleta *<cantidad> <color>*
│ ≡◦ .buyall
│ ≡◦ .buy
│ ≡◦ .protituirse
│ ≡◦ .work
│ ≡◦ .pay / transfer 
│ ≡◦ .semanal
│ ≡◦ .levelup
│ ≡◦ .lvl @user
│ ≡◦ .slot *<apuesta>*
╰───────────────╯

╭──⬣「 𝙶𝙰𝙲𝙷𝙰 」⬣
*│*  .rw
*│*  .reclamar 
*│*  .harem
*│*  .waifuimage
*│*  .charinfo
*│*  .topwaifus [pagina]
*│*  .regalar <nombre del personaje> @usuario
*│*  .vote <personaje>
╰───────────────╯

╭──⬣「 𝚂𝚃𝙸𝙲𝙺𝙴𝚁𝚂 」⬣
│ ≡◦ .sticker <img>
│ ≡◦ .sticker <url>
│ ≡◦ .setmeta
│ ≡◦ .delmeta
│ ≡◦ .bratvid <texto>
│ ≡◦ .pfp @user
│ ≡◦ .qc
│ ≡◦ .toimg (reply)
│ ≡◦ .brat
│ ≡◦ .bratvid <texto>
│ ≡◦ .emojimix  *<emoji+emoji>*
│ ≡◦ .wm <packname>|<author>
╰───────────────╯

╭──⬣「 𝚃𝙾𝙾𝙻𝚂 」⬣
│ ≡◦ .letra *<texto>*
│ ≡◦ .fake
│ ≡◦ .hd
│ ≡◦ .detectar
│ ≡◦ .clima *<ciudad/país>*
│ ≡◦ .join
│ ≡◦ .nuevafotochannel
│ ≡◦ .nosilenciarcanal
│ ≡◦ .silenciarcanal
│ ≡◦ .noseguircanal
│ ≡◦ .seguircanal 
│ ≡◦ .avisoschannel 
│ ≡◦ .resiviravisos 
│ ≡◦ .inspect 
│ ≡◦ .inspeccionar 
│ ≡◦ .eliminarfotochannel 
│ ≡◦ .reactioneschannel 
│ ≡◦ .reaccioneschannel 
│ ≡◦ .nuevonombrecanal 
│ ≡◦ .nuevadescchannel
│ ≡◦ .setavatar
│ ≡◦ .setbanner
│ ≡◦ .seticono
│ ≡◦ .setmoneda
│ ≡◦ .setname nombre1/nombre2
│ ≡◦ .cal *<ecuacion>*
│ ≡◦ .horario
│ ≡◦ .read
│ ≡◦ .traducir <idoma>
│ ≡◦ .say
│ ≡◦ .whatmusic <audio/video>
│ ≡◦ .paisinfo
│ ≡◦ .ssweb
│ ≡◦ .tamaño *<cantidad>*
│ ≡◦ .document *<audio/video>*
│ ≡◦ .translate
│ ≡◦ .up
│ ≡◦ .enhance
│ ≡◦ .wikipedia
╰───────────────╯

╭──⬣「 𝙶𝚁𝚄𝙿𝙾𝚂 」⬣
│ ≡◦ .admins
│ ≡◦ .agregar
│ ≡◦ .advertencia <@user>
│ ≡◦ .delwarn
│ ≡◦ .grupo abrir / cerrar
│ ≡◦ .group open / close
│ ≡◦ .delete
│ ≡◦ .demote <@user>
│ ≡◦ .promote <@user>
│ ≡◦ .encuesta <text|text2>
│ ≡◦ .kickfantasmas
│ ≡◦ .gpbanner
│ ≡◦ .gpdesc
│ ≡◦ .gpname
│ ≡◦ .hidetag
│ ≡◦ .infogrupo
│ ≡◦ .kick <@user>
│ ≡◦ .kicknum
│ ≡◦ .listonline
│ ≡◦ .link
│ ≡◦ .listadv
│ ≡◦ .mute
│ ≡◦ .unmute
│ ≡◦ .config
│ ≡◦ .restablecer
│ ≡◦ .setbye
│ ≡◦ .setwelcome
│ ≡◦ .testwelcome
│ ≡◦ .setemoji <emoji>
│ ≡◦ .invocar *<mensaje opcional>*
╰───────────────╯

╭──⬣「 𝙽𝚂𝙵𝚆 」⬣
│ ≡◦ .sixnine/69 @tag
│ ≡◦ .anal/culiar @tag
│ ≡◦ .blowjob/mamada @tag
│ ≡◦ .boobjob/rusa @tag
│ ≡◦ .cum/leche @tag
│ ≡◦ .fap/paja @tag
│ ≡◦ .follar @tag
│ ≡◦ .fuck/coger @tag
│ ≡◦ .footjob/pies @tag
│ ≡◦ .fuck2/coger2 @tag
│ ≡◦ .grabboobs/agarrartetas @tag
│ ≡◦ .grop/manosear @tag
│ ≡◦ .penetrar @user
│ ≡◦ .lickpussy/coño @tag
│ ≡◦ .r34 <tag>
│ ≡◦ .sexo/sex @tag
│ ≡◦ .spank/nalgada @tag
│ ≡◦ .suckboobs/chupartetas @tag
│ ≡◦ .violar/perra @tag
│ ≡◦ .lesbianas/tijeras @tag
│ ≡◦ .pack
│ ≡◦ .tetas
│ ≡◦ .undress/encuerar
╰───────────────╯

╭──⬣「 𝙾𝚆𝙽𝙴𝚁 」⬣
│ ≡◦ .addcoins *<@user>*
│ ≡◦ .addowner / delowner
│ ≡◦ .addprem [@user] <days>
│ ≡◦ .añadirxp
│ ≡◦ .copia
│ ≡◦ .autoadmin
│ ≡◦ .banuser <@tag> <razón>
│ ≡◦ .banlist
│ ≡◦ .bcgc
│ ≡◦ .block / unblock
│ ≡◦ .blocklist
│ ≡◦ .chetar *@user* / *<número>*
│ ≡◦ .cleartmp
│ ≡◦ .creargc
│ ≡◦ .deletefile
│ ≡◦ .delprem <@user>
│ ≡◦ .deschetar *@user* / *<número>*
│ ≡◦ .dsowner
│ ≡◦ =>
│ ≡◦ >
│ ≡◦ $
│ ≡◦ .fetch
│ ≡◦ .getplugin
│ ≡◦ .grouplist
│ ≡◦ .salir
│ ≡◦ .let
│ ≡◦ .prefix [prefix]
│ ≡◦ .quitarcoin *<@user>* / all
│ ≡◦ .quitarxp *<@user>*
│ ≡◦ .resetprefix
│ ≡◦ .restablecerdatos
│ ≡◦ .restart / reiniciar
│ ≡◦ .reunion
│ ≡◦ .savefile <ruta/nombre>
│ ≡◦ .saveplugin
│ ≡◦ .setcmd *<texto>*
│ ≡◦ .delcmd
│ ≡◦ .listcmd
│ ≡◦ .setimage
│ ≡◦ .setstatus <teks>
│ ≡◦ .spam2
│ ≡◦ .unbanuser <@tag>
│ ≡◦ .ip <alamat ip>
│ ≡◦ .update / fix
╰───────────────╯

╭──⬣「 𝙰𝙸 - 𝙸𝙰 」⬣
│ ≡◦ .dalle
│ ≡◦ .demo *<texto>*
│ ≡◦ .flux *<texto>*
│ ≡◦ .gemini
│ ≡◦ .ia
│ ≡◦ .llama
╰───────────────╯

╭──⬣「 𝚃𝚁𝙰𝙽𝚂𝙵𝙾𝚃𝙼𝙰𝙳𝙾𝚁 」⬣
│ ≡◦ .tourl <imagen>
│ ≡◦ .catbox
│ ≡◦ .tourl3
│ ≡◦ .togifaud
│ ≡◦ .tomp3
│ ≡◦ .tovideo
│ ≡◦ .tts
│ ≡◦ .tts2
╰───────────────╯

> ${dev}`.trim()

await conn.sendMessage(m.chat, { video: { url: vid.getRandom() }, caption: menu, contextInfo: { mentionedJid: [m.sender], isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, newsletterName: channelRD.name, serverMessageId: -1, }, forwardingScore: 999, externalAdReply: { title: '⚽ ꙰,𝙸𝚂𝙰𝙶𝙸-𝙱𝙾𝚃', body: dev, thumbnailUrl: perfil, sourceUrl: redes, mediaType: 1, renderLargerThumbnail: false,
}, }, gifPlayback: true, gifAttribution: 0 }, { quoted: null })
await m.react(emojis)    

} catch (e) {
await m.reply(`✘ Ocurrió un error al enviar el menú\n\n${e}`)
await m.react(error)
}}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'help', 'menú', 'allmenú', 'allmenu', 'menucompleto'] 
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}