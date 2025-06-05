import { areJidsSameUser } from '@whiskeysockets/baileys'
export async function before(m, { participants, conn }) {
    if (m.isGroup) {
        let chat = global.db.data.chats[m.chat];

         if (!chat.antiBot2) {
            return
        }


        let botJid = global.conn.user.jid // JID del bot principal

       if (botJid === conn.user.jid) {
           return
        } else {
           let isBotPresent = participants.some(p => areJidsSameUser(botJid, p.id))

          if (isBotPresent) {
                setTimeout(async () => {
                    await conn.reply(m.chat, ` ︵ٜ⊹۬︵߭ꥈ‌⏜ׄ︵‌୨ ꥇ☕߭ ୧‌︵۬߭⏜ꥇ‌︵⊹︵\n      ꥇ𝐒ٜ۬𝐀𝐃ꥇ‌𝐎𝐖ᨘ࣪ 𝐁ꥈ𝐎߭𝐓\n⏝۬‌ꥇ︶ꥇ⊹۬︶‌⏝۬︶ᨘ⊹߭︶ׅꥇ⏝߭︶۬⊹ꥈ︶⏝\n╔═══•|.⚡.|•════•|.☁️.|•═══╗\n *⏤͟͟͞͞En este grupo está el bot principal, el cual me saldré para no hacer spam* .⃯⃜★꙰⃟⸙.\n╚═══•|.⚔️.|•════•|.☃️.|•═══╝*\nׄ•ׅ︶ٜٜٜٜׄ߭ׄ߭ׄ߭ׄ߭⏝ׅׄ︶ٜٜׄ߭ׄ߭⏝ׅׄ︶ٜٜׄ߭ׄ߭⏝ׅׄ︶ٜׄ߭ׄ߭⏝ٜׄׄ߭⏝ׅׄ︶ٜٜٜٜׄ߭ׄ߭ׄ߭ׄ߭`, m, rcanal)
                    await this.groupLeave(m.chat)
                }, 5000)// 5 segundos
            }
        }
    }
}