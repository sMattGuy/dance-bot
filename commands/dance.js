const { SlashCommandBuilder } = require('discord.js');

//make special array
var dancingLetters = ["aa","bb","cc","dd","ee","ff","gg","hh","i_","jj","kk","ll","m_","nn","oo","pp","qq","rr","ss","tt","uu","vv","ww","xx","y_","z_"];
var dancingNumbers = ["00","11","2_","33","44","55","6_","77","88","99"];
var dancingSpecial = ["excimation","dollar","amprs","questmark","at"];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dance')
		.setDescription('Turns your message into dancing letters!')
		.addStringOption(option => 
			option.setName('message')
				.setDescription('The message to convert')
				.setMaxLength(4000)
				.setRequired(true)),
	async execute(interaction) {
		let msg = interaction.options.getString('message');
		let client = interaction.client;
		let newMsg = "";
		let emoji;
		for(let i=0;i<msg.length;i++){
			if(msg.charAt(i) === '<'){
				while(msg.charAt(i)!='>'){
					i++;
				}
			}
			else if(48 <= msg.charCodeAt(i) && msg.charCodeAt(i) <=57){
				emoji = client.emojis.cache.find(emoji => emoji.name === dancingNumbers[msg.charCodeAt(i)-48]);
				newMsg = newMsg + `${emoji}`;
			}
			else if(65 <= msg.charCodeAt(i) && msg.charCodeAt(i) <= 90){
				emoji = client.emojis.cache.find(emoji => emoji.name === dancingLetters[msg.charCodeAt(i)-65]);
				newMsg = newMsg + `${emoji}`;
			}
			else if(97 <= msg.charCodeAt(i) && msg.charCodeAt(i) <= 122){
				emoji = client.emojis.cache.find(emoji => emoji.name === dancingLetters[msg.charCodeAt(i)-97]);
				newMsg = newMsg + `${emoji}`;
			}
			else if(msg.charCodeAt(i) == 33){
				emoji = client.emojis.cache.find(emoji => emoji.name === dancingSpecial[0]);
				newMsg = newMsg + `${emoji}`;
			}
			else if(msg.charCodeAt(i) == 36){
				emoji = client.emojis.cache.find(emoji => emoji.name === dancingSpecial[1]);
				newMsg = newMsg + `${emoji}`;
			}
			else if(msg.charCodeAt(i) == 38){
				emoji = client.emojis.cache.find(emoji => emoji.name === dancingSpecial[2]);
				newMsg = newMsg + `${emoji}`;
			}
			else if(msg.charCodeAt(i) == 63){
				emoji = client.emojis.cache.find(emoji => emoji.name === dancingSpecial[3]);
				newMsg = newMsg + `${emoji}`;
			}
			else if(msg.charCodeAt(i) == 64){
				emoji = client.emojis.cache.find(emoji => emoji.name === dancingSpecial[4]);
				newMsg = newMsg + `${emoji}`;
			}
			else if(msg.charCodeAt(i) == 32){
				newMsg = newMsg + msg[i] + '    ';
			}
			else{
				//skips unknown character
			}
		}
		if(newMsg.length > 2000){
			await interaction.reply({ content: `Your message was too long!`, ephemeral: true })
		}
		else if(newMsg.length == 0){
			await interaction.reply({ content: `Your message was too short!`, ephemeral: true })
		}
		else{
			await interaction.reply(newMsg);
		}
	},
};
