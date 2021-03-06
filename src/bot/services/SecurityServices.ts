import TelegramBot from "node-telegram-bot-api";
import ConstantTool from "./tools/ConstantTool";
import GetFileService from "./GetFileService";
import { containsNotAllowedWords } from "../blocked";

const deepai = require('deepai')
deepai.setApiKey(ConstantTool.DEEP_AI_TOKEN)

export default class SecurityServices {
    static async SafeImageFilter(bot: TelegramBot, msg: any, bannedList: any) {
		const sender_id = msg.chat.id;
		const URL: string = await GetFileService.getPhotoURL(bot, msg)
		try {
			await deepai.callStandardApi("nsfw-detector", { image: URL })
			.then((data: any)=> {
				if (data.output.detections.length > 0) {
					bannedList[msg.from!.id] = bannedList[msg.from!.id] === undefined ? 1 : bannedList[msg.from!.id] + 1;
					if (bannedList[msg.from!.id] >= 3) {
						bot.kickChatMember(sender_id, msg.from!.id.toString());
					} else {
						bot.sendMessage(sender_id, `Advertencia: Imagenes explicitas detectadas.
						De: ${msg.from.first_name} ${msg.from.last_name}`)
						bot.deleteMessage(sender_id, msg.message_id)
					}
				}
			})
		} catch (error) {
			console.log(error)
		}
	}

	static async SafeMessageFilter(bot: TelegramBot, msg: any, bannedList: any) {
		if (msg.text && containsNotAllowedWords(msg.text.toLowerCase())){
			const sender_id = msg.chat.id;
			bannedList[msg.from!.id] = bannedList[msg.from!.id] === undefined ? 1 : bannedList[msg.from!.id] + 1;
			if (bannedList[msg.from!.id] >= 3) {
				bot.kickChatMember(sender_id, msg.from!.id.toString());
			} else {
				bot.sendMessage(sender_id, `Cuida tu vocabulario, Advertencia No. ${bannedList[msg.from!.id]}`, {                
					reply_to_message_id: msg.message_id
				})
			}
		}
	}
}