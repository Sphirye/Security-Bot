import TelegramBot from 'node-telegram-bot-api';
import ConstantTool from "./services/tools/ConstantTool"
import SecurityServices from "./services/SecurityServices";

const axios = require('axios')

function init(): void{
	const bot = new TelegramBot(ConstantTool.TELEGRAM_BOT_TOKEN as string, {polling: true});

	const bannedList: { 
		[key: string]: number 
	} = {};

	bot.on("message", (msg) => {
		const sender_id = msg.chat.id;

		if ((sender_id == ConstantTool.VUE_GROUP_CHAT_ID) || (sender_id == ConstantTool.TESTING_GROUP_CHAT_ID)) {
			SecurityServices.SafeMessageFilter(bot, msg, bannedList)
		}
	})

	bot.on('photo', (msg)=>{
		const sender_id = msg.chat.id;

		if ((sender_id == ConstantTool.VUE_GROUP_CHAT_ID) || (sender_id == ConstantTool.TESTING_GROUP_CHAT_ID)) {
			SecurityServices.SafeImageFilter(bot, msg, bannedList)
		}
	})
}

/*
function dictionarySearch(text: string): Array<[string, string]>{
	const fs = require('fs');
	const dictionary: {
		[word: string]: string
	} = JSON.parse(fs.readFileSync('./dictionary.json', 'utf8'));

	const matches: Array<[string, string]> = Object.entries(dictionary).filter(([word])=>{
		return word.includes(text);
	})

	return matches;
}*/

const BotController = {init};
export default BotController;