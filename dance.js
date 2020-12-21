//make special array
var dancingLetters = ["aa","bb","cc","dd","ee","ff","gg","hh","i_","jj","kk","ll","m_","nn","oo","pp","qq","rr","ss","tt","uu","vv","ww","xx","y_","z_"];
var dancingNumbers = ["00","11","2_","33","44","55","6_","77","88","99"];
var dancingSpecial = ["excimation","dollar","amprs","questmark","at"];

'use strict';

// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();

// import token
const credentials = require('./auth.json');

client.on('ready', () => {
  client.user.setPresence({
    status: 'online',
    activity: {
        name: 'for ^message',
	type: "WATCHING"
    }
  });
  console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', message => {
	client.user.setPresence({
		status: 'online',
		activity: {
			name: 'for ^message',
		type: "WATCHING"
		}
	});
	// waits for up caret
	if (message.content.substring(0,1) === '^' && message.content.length > 1) {
		var hasContent = false;
		var msg = "";
		msg = message.content.substring(1);
		var user = message.author.username;
		console.log(user + ":" + msg);
		var newMsg = "";
		var emoji;
		for(let i=0;i<msg.length;i++){
			if(msg.charAt(i) === '<'){
				var temp = "";
				var okSend = true;
				while(msg.charAt(i)!='>'){
					temp = temp + msg.charAt(i);
					i++;
					if(i > msg.length){
						okSend = false;
						break;
					}
				}
				if(okSend){
					temp = temp + msg.charAt(i);
					i++;
					newMsg = newMsg + `${temp}`;
				}
			}
			if(48 <= msg.charCodeAt(i) && msg.charCodeAt(i) <=57){
				emoji = client.emojis.cache.find(emoji => emoji.name === dancingNumbers[msg.charCodeAt(i)-48]);
				newMsg = newMsg + `${emoji}`;
				hasContent = true;
			}
			else if(65 <= msg.charCodeAt(i) && msg.charCodeAt(i) <= 90){
				emoji = client.emojis.cache.find(emoji => emoji.name === dancingLetters[msg.charCodeAt(i)-65]);
				newMsg = newMsg + `${emoji}`;
				hasContent = true;
			}
			else if(97 <= msg.charCodeAt(i) && msg.charCodeAt(i) <= 122){
				emoji = client.emojis.cache.find(emoji => emoji.name === dancingLetters[msg.charCodeAt(i)-97]);
				newMsg = newMsg + `${emoji}`;
				hasContent = true;
			}
			else{
				if(msg.charCodeAt(i) == 33){
					emoji = client.emojis.cache.find(emoji => emoji.name === dancingSpecial[0]);
					newMsg = newMsg + `${emoji}`;
					hasContent = true;
				}
				else if(msg.charCodeAt(i) == 36){
					emoji = client.emojis.cache.find(emoji => emoji.name === dancingSpecial[1]);
					newMsg = newMsg + `${emoji}`;
					hasContent = true;
				}
				else if(msg.charCodeAt(i) == 38){
					emoji = client.emojis.cache.find(emoji => emoji.name === dancingSpecial[2]);
					newMsg = newMsg + `${emoji}`;
					hasContent = true;
				}
				else if(msg.charCodeAt(i) == 63){
					emoji = client.emojis.cache.find(emoji => emoji.name === dancingSpecial[3]);
					newMsg = newMsg + `${emoji}`;
					hasContent = true;
				}
				else if(msg.charCodeAt(i) == 64){
					emoji = client.emojis.cache.find(emoji => emoji.name === dancingSpecial[4]);
					newMsg = newMsg + `${emoji}`;
					hasContent = true;
				}
				else{
					newMsg = newMsg + `   `;
				}
			}
			//console.log(newMsg);
		}
		if(hasContent){
			message.delete();
			if(newMsg.length > 2000){
				 message.channel.send(`Message was too long!`);
			}
			else{
				 message.channel.send(`*${user} said,*`);
				 message.channel.send(`${newMsg}`);
			}
		}
	}
});

// Log our bot in using the token from https://discord.com/developers/applications
client.login(`${credentials.token}`);
