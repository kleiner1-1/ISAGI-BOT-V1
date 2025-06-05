let handler = async (m, { conn, usedPrefix, isOwner }) => {
let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;𝐓𝐡𝐞 𝐛𝐚𝐣𝐨 𝐛𝐨𝐭𝐬⁩⁩;;\nFN:𝐓𝐡𝐞 𝐛𝐚𝐣𝐨 𝐛𝐨𝐭𝐬⁩\nORG:𝐓𝐡𝐞 𝐛𝐚𝐣𝐨 𝐛𝐨𝐭𝐬\nTITLE:\nitem1.TEL;waid=573162402768:573162402768\nitem1.X-ABLabel:𝐓𝐡𝐞 𝐛𝐚𝐣𝐨 𝐛𝐨𝐭𝐬\nX-WA-BIZ-DESCRIPTION:\nX-WA-BIZ-NAME:𝐓𝐡𝐞 𝐛𝐚𝐣𝐨 𝐛𝐨𝐭𝐬⁩\nEND:VCARD`
await conn.sendMessage(m.chat, { contacts: { displayName: 'お𝐓𝐡𝐞 𝐛𝐚𝐣𝐨 𝐛𝐨𝐭𝐬⁩', contacts: [{ vcard }] }}, {quoted: m})
}
handler.help = ['owner']
handler.tags = ['main']
handler.command = ['owner', 'creator', 'creador', 'dueño'] 

export default handler