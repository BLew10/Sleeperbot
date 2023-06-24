// const Discord = require('discord.js');
// const axios = require('axios');
// const client = new Discord.Client();
import League from "./sleeperData.js";

// client.once('ready', () => {
//     console.log('Bot is ready!');
// });

// client.on('message', async message => {
//     // check if the message is from the desired channel
//     if (message.channel.id !== 'Your Channel ID') return;

//     if (message.content === '!players') {
//         try {
//             const response = await axios.get('https://api.sleeper.app/v1/players/nfl');
//             const players = response.data;

//             // send the first 10 players
//             let reply = '';
//             let count = 0;
//             for (let player in players) {
//                 reply += `${players[player].first_name} ${players[player].last_name}\n`;
//                 if (++count === 10) break;
//             }
//             message.channel.send(reply);
//         } catch (error) {
//             console.error(error);
//         }
//     }
// });

// client.login('Your Bot Token');

const league = new League('Your League ID');

console.log(league.players)
