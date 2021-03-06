import cron from 'node-cron';
import { sendMessageToChannel } from './channel';
import {fetchQuote} from './api';
import TelegramBot from 'node-telegram-bot-api';

export function initCron(bot: TelegramBot){
    console.log("init")
    cron.schedule('*/2 * * * *', async ()=>{
        const quote = await fetchQuote();
        sendMessageToChannel(bot, quote);
    })
}