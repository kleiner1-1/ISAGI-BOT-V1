let handler = async (m, { conn, command, usedPrefix }) => {
let img = './src/catalogo.jpg'
let staff = `  ︵ٜ⊹۬︵߭ꥈ‌⏜ׄ︵‌୨ ꥇ⭐߭ ୧‌︵۬߭⏜ꥇ‌︵⊹︵
    ꥇ𝐄ٜ۬߭𝐐ׄꥇ‌𝐔ᨘ࣪𝐈ꥈ𝐏࣭߭𝐎 𝐃𝐄 𝐀𝐘𝐔𝐃𝐀𝐍𝐓𝐄𝐒.il
  ⏝۬‌ꥇ︶ꥇ⊹۬︶‌⏝۬︶ᨘ⊹߭︶ׅꥇ⏝߭︶۬⊹ꥈ︶⏝
          .⬪  ࣪   🏜️(*𝕀𝕊𝔸𝔾𝕀-𝕌𝕃𝕋ℝ𝔸*) 

╭──────────────╮
✰ *Dueño* ${creador}
✦ *Bot:* ${botname}
⚘ *Versión:* ${vs}
❖ *Libreria:* ${libreria} ${baileys}
╰──────────────╯

❍ *Creador:*
╭━✧━─━─━═◇═━─━✦━╮
│┏ᰔᩚ 𓊈𒆜𝐓𝐡𝐞 𝐛𝐚𝐣𝐨 𝐛𝐨𝐭𝐬𒆜𓊉
│┣🜸 *Rol:* *Creador*
│┣⍰ *Numero:* https://wa.me/573162402768
│┗✧ *GitHub:* https://github.com/kleiner1-1
╰━✧━─━─━═◇═━─━✦━╯

❒ *Colaboradores:*

╭━✧━─━─━═◇═━─━✦━╮
│┏ᰔᩚ 𓊈𒆜YOSOYO𒆜𓊉
│┣🜸 *Rol:* *EDITOR*
│┣⍰ *Numero:* https://wa.me/573133374132
│┗✧ *GitHub:* 
╰━✧━─━─━═◇═━─━✦━╯



await conn.sendFile(m.chat, img, 'staff.jpg', staff.trim(), fkontak)
}
  
handler.help = ['staff']
handler.command = ['colaboradores', 'staff']
handler.register = true
handler.tags = ['main']

export default handler
