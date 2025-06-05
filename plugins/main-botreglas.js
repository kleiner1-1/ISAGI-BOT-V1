let handler = async (m, { conn, usedPrefix, command}) => {
  
let black = `
╭━━━━━━━━━━━━━━━━━━━⬣
┃ ⚽ 𝗥𝗘𝗦𝗣𝗘𝗧𝗔 𝗟𝗔𝗦 𝗥𝗘𝗚𝗟𝗔𝗦 🍬
╰━━━━━━━━━━━━━━━━━━━⬣
> ╭─⋄
> │• 𝔑𝔬 𝔩𝔩𝔞𝔪𝔞𝔯 𝔞𝔩 𝔟𝔬𝔱.
> │• 𝔑𝔬 𝔥𝔞𝔠𝔢𝔯𝔩𝔢 𝔰𝔭𝔞𝔪 𝔞𝔩 𝔟𝔬𝔱.
> │• 𝔓𝔢𝔯𝔡𝔦𝔯 𝔭𝔢𝔯𝔪𝔦𝔰𝔬 𝔭𝔞𝔯𝔞 𝔞ñ𝔞𝔡𝔦𝔯 𝔢𝔩 𝔟𝔬𝔱 𝔞 𝔲𝔫 𝔤𝔯𝔲𝔭𝔬.
> │• ℭ𝔬𝔫𝔱𝔞𝔠𝔱𝔞 𝔞𝔩 𝔠𝔯𝔢𝔞𝔡𝔬𝔯 𝔰𝔦 𝔢𝔰 𝔫𝔢𝔠𝔢𝔰𝔞𝔯𝔦𝔬.
> │• 𝔘𝔰𝔞 𝔢𝔩 𝔟𝔬𝔱 𝔡𝔢 𝔣𝔬𝔯𝔪𝔞 𝔞𝔭𝔯𝔬𝔭𝔦𝔞𝔡𝔞.
> ╰─⋄

━━━━━━━━━━━━━━━━━━━━
│📚  \`N O T A\`
╰─◇◈◇◈◇◈◇◈◇◈⋄
\`\`\`Si rompe alguna de las reglas del bot, puede ser baneado y bloqueado del bot.\`\`\`
━━━━━━━━━━━━━━━━━━━━
│⚽  \`I N F O\`
╰─◇◈◇◈◇◈◇◈◇◈⋄
\`\`\`Si te gusta el bot, tambien puedes ir al repositorio y dejar una 🌟.\`\`\`
━━━━━━━━━━━━━━━━━━━━

> ${md}
> ${textbot}
`.trim()
await conn.sendFile(m.chat, catalogo, 'isagi.mp4', black)
}
handler.customPrefix ='reglas','reglasbot', /reglas|Reglas|reglasbot, botreglas|uso, usobot|uso del bot/i
handler.command = new RegExp
handler.register = true
handler.coin = 5
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}
