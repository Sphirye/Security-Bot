import TelegramBot from "node-telegram-bot-api";
import ConstantTool from "./tools/ConstantTool";

export default class GetFileService{
    //Devuelve el link de la ultima imagen enviada.
    static async getPhotoURL (bot: TelegramBot , msg: any) {
        const sender_id = msg.chat.id;
		const id = msg.photo[msg.photo.length - 1].file_id;
		const file = await bot.getFile(id);
		const path = file.file_path;
        const URL: string = `https://api.telegram.org/file/bot${ConstantTool.TELEGRAM_BOT_TOKEN}/${path}`;
        
        return URL;
    }
}