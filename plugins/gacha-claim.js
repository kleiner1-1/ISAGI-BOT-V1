import { promises as fs } from 'fs';

const charactersFilePath = './src/database/characters.json';
const haremFilePath = './src/database/harem.json';

const cooldowns = {};

async function loadCharacters() {
    try {
        const data = await fs.readFile(charactersFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error('❀ No se pudo cargar el archivo characters.json.');
    }
}

async function saveCharacters(characters) {
    try {
        await fs.writeFile(charactersFilePath, JSON.stringify(characters, null, 2), 'utf-8');
    } catch (error) {
        throw new Error('❀ No se pudo guardar el archivo characters.json.');
    }
}

let handler = async (m, { conn }) => {
    const userId = m.sender;
    const now = Date.now();

    if (cooldowns[userId] && now < cooldowns[userId]) {
        const remainingTime = Math.ceil((cooldowns[userId] - now) / 1000);
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        return await conn.reply(m.chat, `𝑫𝒆𝒗𝒆𝒔 𝒆𝒔𝒑𝒆𝒓𝒂𝒓 *${minutes} 𝑴𝒊𝒏𝒖𝒕𝒐𝒔 𝒚 ${seconds} 𝑺𝒆𝒈𝒖𝒏𝒅𝒐𝒔* 𝒑𝒂𝒓𝒂 𝒖𝒔𝒂𝒓 *#c* 𝒅𝒆 𝒏𝒖𝒆𝒗𝒐.`, m);
    }

    if (m.quoted && m.quoted.sender === conn.user.jid) {
        try {
            const characters = await loadCharacters();
        const characterIdMatch = m.quoted.text.match(/✦ ID: \*(.+?)\*/);

            if (!characterIdMatch) {
                await conn.reply(m.chat, '《✧》𝑁𝑜 𝑠𝑒 𝑝𝑢𝑒𝑑𝑒 𝑒𝑛𝑐𝑜𝑛𝑡𝑟𝑎𝑟 𝑒𝑙 ID 𝑑𝑒𝑙 𝑝𝑒𝑟𝑠𝑜𝑛𝑎𝑗𝑒 𝑒𝑛 𝑒𝑙 𝑚𝑒𝑛𝑠𝑎𝑗𝑒 𝑐𝑖𝑡𝑎𝑑𝑜.', m);
                return;
            }

            const characterId = characterIdMatch[1];
            const character = characters.find(c => c.id === characterId);

            if (!character) {
                await conn.reply(m.chat, '《✧》𝐸𝑙 𝑚𝑒𝑛𝑠𝑎𝑗𝑒 𝑐𝑖𝑡𝑎𝑑𝑜 𝑛𝑜 𝑒𝑠 𝑢𝑛 𝑝𝑒𝑟𝑠𝑜𝑛𝑎𝑗𝑒 𝑣𝑎𝑙𝑖𝑑𝑜.', m);
                return;
            }

            if (character.user && character.user !== userId) {
                await conn.reply(m.chat, `¡𝑬𝒍 𝒑𝒆𝒓𝒔𝒐𝒏𝒂𝒋𝒆 𝒚𝒂 𝒉𝒂 𝒔𝒊𝒅𝒐 𝒓𝒆𝒄𝒍𝒂𝒎𝒂𝒅𝒐 𝒑𝒐𝒓! @${character.user.split('@')[0]}, 𝒊𝒏𝒕𝒆𝒏𝒕𝒂𝒍𝒐 𝒍𝒂 𝒑𝒓𝒐𝒙𝒊𝒎𝒂 :v.`, m, { mentions: [character.user] });
                return;
            }

            character.user = userId;
            character.status = "Reclamado";

            await saveCharacters(characters);

            await conn.reply(m.chat, `✦ 𝑯𝒂𝒔 𝒓𝒆𝒄𝒍𝒂𝒎𝒂𝒅𝒐 𝒂 *${character.name}* 𝒄𝒐𝒏 𝒆𝒙𝒊𝒕𝒐.`, m);
            cooldowns[userId] = now + 30 * 60 * 1000;

        } catch (error) {
            await conn.reply(m.chat, `✘ Error al reclamar el personaje: ${error.message}`, m);
        }

    } else {
        await conn.reply(m.chat, '《✧》𝐷𝑒𝑏𝑒𝑠 𝑐𝑖𝑡𝑎𝑟 𝑢𝑛 𝑝𝑒𝑟𝑠𝑜𝑛𝑎𝑗𝑒 𝑣𝑎𝑙𝑖𝑑𝑜 𝑝𝑎𝑟𝑎 𝑟𝑒𝑐𝑙𝑎𝑚𝑎𝑟.', m);
    }
};

handler.help = ['claim'];
handler.tags = ['gacha'];
handler.command = ['c', 'claim', 'reclamar'];
handler.group = true;

export default handler;