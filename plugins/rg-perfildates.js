let handler = async(m, { conn, usedPrefix, command }) => {

//let img = `https://files.catbox.moe/dpjivg.jpg`;
let txt = `╭ - - - - - - -✎ 🌹   ❜ ⊹\n
    *︵₊˚꒰Ꮺ mᥲᥒᥙᥲᥣ ⍴ᥲrᥲ ᥱძі𝗍ᥲr 𝗍ᥙ ⍴ᥱr𝖿іᥣ*\n
    *꒰ ୨⚔️୧─・┈・୨⚡୧・┈・─୨⚔️୧ ꒱*\n
    ₊˚୨🍧 *${usedPrefix}setbirth*\n> ✦ 𝐸𝑑𝑖𝑡𝑎 𝑡𝑢 𝑓𝑒𝑐𝒉𝑎 𝑑𝑒 𝑐𝑢𝑚𝑝𝑙𝑒𝑎ñ𝑜𝑠 🎂.\n
    ₊˚୨💥 *${usedPrefix}delbirth*\n> ✦ 𝐸𝑙𝑖𝑚𝑖𝑛𝑎 𝑡𝑢 𝑓𝑒𝑐𝒉𝑎 𝑑𝑒 𝑐𝑢𝑚𝑝𝑙𝑒𝑎ñ𝑜𝑠 🎂.\n
    ₊˚୨⚔️ *${usedPrefix}setdesc*\n> ♡ 𝐸𝑑𝑖𝑡𝑎 𝐿𝑎 𝑑𝑒𝑠𝑐𝑟𝑖𝑝𝑐𝑖ó𝑛 𝑑𝑒 𝑡𝑢 𝑝𝑒𝑟𝑓𝑖𝑙.\n
    ₊˚୨🍁 *${usedPrefix}setdesc*\n> ♡ 𝐸𝑙𝑖𝑚𝑖𝑛𝑎 𝐿𝑎 𝑑𝑒𝑠𝑐𝑟𝑖𝑝𝑐𝑖ó𝑛 𝑑𝑒 𝑡𝑢 𝑝𝑒𝑟𝑓𝑖𝑙.\n
    ₊˚୨🌲 *${usedPrefix}setgenre*\n> ✐ 𝐸𝑑𝑖𝑡𝑎 𝑡𝑢 𝑔𝑒𝑛𝑒𝑟𝑜 𝑒𝑛 𝑡𝑢 𝑝𝑒𝑟𝑓𝑖𝑙.\n
    ₊˚୨🏜️ *${usedPrefix}delgenre*\n> ✐ 𝐸𝑙𝑖𝑚𝑖𝑛𝑎 𝑡𝑢 𝑔𝑒𝑛𝑒𝑟𝑜 𝑒𝑛 𝑡𝑢 𝑝𝑒𝑟𝑓𝑖𝑙.\n
    ₊˚୨❄️ *${usedPrefix}marry*\n> ᰔᩚ 𝐶𝑎𝑠𝑎𝑡𝑒 𝑐𝑜𝑛 𝑢𝑛𝑎 𝑝𝑒𝑟𝑠𝑜𝑛𝑎.\n
    ₊˚୨🍥 *${usedPrefix}divorce*\n> ঔ 𝐷𝑖𝑣𝑜𝑟𝑐𝑖𝑎𝑡𝑒 𝑑𝑒 𝑢𝑛𝑎 𝑝𝑒𝑟𝑠𝑜𝑛𝑎.\n
    ٭꒷꒦ ✨︶︶︶︶︶︶︶︶︶︶ 🔥꒦꒷٭`;

conn.reply(m.chat, txt, m, rcanal);
m.react('👻');
}

handler.command = ['perfildates', 'pedates', 'perd'];
handler.tag = ['rg'];
handler.help = ['perfildates'];
handler.coin = 2; 

export default handler;



