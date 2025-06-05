import { promises as fs } from 'fs'

const charactersFilePath = './src/database/characters.json'
const haremFilePath = './src/database/harem.json'

const cooldowns = {}

async function loadCharacters() {
    try {
        const data = await fs.readFile(charactersFilePath, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        throw new Error('🔥 No se pudo cargar el archivo characters.json.')
    }
}

async function saveCharacters(characters) {
    try {
        await fs.writeFile(charactersFilePath, JSON.stringify(characters, null, 2), 'utf-8')
    } catch (error) {
        throw new Error('🔥 No se pudo guardar el archivo characters.json.')
    }
}

async function loadHarem() {
    try {
        const data = await fs.readFile(haremFilePath, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        return []
    }
}

async function saveHarem(harem) {
    try {
        await fs.writeFile(haremFilePath, JSON.stringify(harem, null, 2), 'utf-8')
    } catch (error) {
        throw new Error('🔥 No se pudo guardar el archivo harem.json.')
    }
}

let handler = async (m, { conn }) => {
    const userId = m.sender
    const now = Date.now()

    if (cooldowns[userId] && now < cooldowns[userId]) {
        const remainingTime = Math.ceil((cooldowns[userId] - now) / 1000)
        const minutes = Math.floor(remainingTime / 60)
        const seconds = remainingTime % 60
        return await conn.reply(m.chat, `¡𝐸𝑠𝑝𝑒𝑟𝑎 𝑢𝑛 𝑝𝑜𝑐𝑜 𝑚𝑎𝑠 𝑝𝑎𝑟𝑎 𝑝𝑜𝑑𝑒𝑟 𝑢𝑠𝑎𝑟 𝑒𝑠𝑡𝑒 𝑐𝑜𝑚𝑎𝑛𝑑𝑜!\n*𝑇𝑖𝑒𝑚𝑝𝑜 𝑟𝑒𝑠𝑡𝑎𝑛𝑡𝑒 ${minutes} 𝑀𝑖𝑛𝑢𝑡𝑜𝑠 𝑦 ${seconds} 𝑆𝑒𝑔𝑢𝑛𝑑𝑜𝑠 𝑝𝑎𝑟𝑎 𝑢𝑠𝑎𝑟 #rw 𝑑𝑒 𝑛𝑢𝑒𝑣𝑜.*`, m)
    }

    try {
        const characters = await loadCharacters()
        const randomCharacter = characters[Math.floor(Math.random() * characters.length)]
        const randomImage = randomCharacter.img[Math.floor(Math.random() * randomCharacter.img.length)]

        const harem = await loadHarem()
        const userEntry = harem.find(entry => entry.characterId === randomCharacter.id)
        const statusMessage = randomCharacter.user 
            ? `𝑹𝒆𝒄𝒍𝒂𝒎𝒂𝒅𝒐 𝒑𝒐𝒓 @${randomCharacter.user.split('@')[0]}` 
            : 'Libre'

        const message = `
❀ 𝙽𝙾𝙼𝙱𝚁𝙴 » *${randomCharacter.name}*
⚥ 𝙶𝙴𝙽𝙴𝚁𝙾 » *${randomCharacter.gender}*
✰ 𝚅𝙰𝙻𝙾𝚁 » *${randomCharacter.value}*
♡ 𝙴𝚂𝚃𝙰𝙳𝙾 » ${statusMessage}
❖ 𝙵𝚄𝙴𝙽𝚃𝙴 » *${randomCharacter.source}*
✦ 𝙸𝙳: *${randomCharacter.id}*`

        const mentions = userEntry ? [userEntry.userId] : []
        await conn.sendFile(m.chat, randomImage, `${randomCharacter.name}.jpg`, message, m, { mentions })

        if (!randomCharacter.user) {
            await saveCharacters(characters)
        }

        cooldowns[userId] = now + 15 * 60 * 1000

    } catch (error) {
        await conn.reply(m.chat, `✘ Error al cargar el personaje: ${error.message}`, m)
    }
}

handler.help = ['ver', 'rw', 'rollwaifu']
handler.tags = ['gacha']
handler.command = ['ver', 'rw', 'rollwaifu']
handler.group = true

export default handler
