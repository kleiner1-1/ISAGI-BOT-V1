import fetch from 'node-fetch';

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
if (!text) return conn.reply(m.chat, '*Ingresa el texto de lo que quieres buscar en SoundCloud*', m);

try {
let api = await fetch(`https://apis-starlights-team.koyeb.app/starlight/soundcloud-search?text=${encodeURIComponent(text)}`);

let json = await api.json();
if (!Array.isArray(json) || json.length === 0) return conn.reply(m.chat, 'No se encontraron resultados.', m);

let txt = '🎵 s ᴇ ᴀ ʀ ᴄ ʜ - s ᴏ ᴜ ɴ ᴅ ᴄ ʟ ᴏ ᴜ ᴅ';
for (let i = 0; i < json.length; i++) {
      txt += `\n\n`;
      txt += `*\`Nro\`* : ${i + 1}\n`;
      txt += `*\`Título\`* : ${json[i].title}\n`;
      txt += `*\`Artista\`* : ${json[i].artist}\n`;
      txt += `*\`Reproducciones\`* : ${json[i].repro}\n`;
      txt += `*\`Duración\`* : ${json[i].duration}\n`;
      txt += `*\`Url\`* : ${json[i].url}`;
    }

await conn.sendFile(m.chat, json[0].image, 'thumbnail.jpg', txt, m);

} catch {
conn.reply('error :v')
}
};

handler.help = ['soundcloudsearch'];
handler.tags = ['buscador'];
handler.command = ['soundcloudsearch', 'cloudsearch'];

export default handler;
