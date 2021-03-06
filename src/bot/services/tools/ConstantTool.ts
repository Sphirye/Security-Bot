export default class ConstantTool {
    static readonly TELEGRAM_BOT_TOKEN: string = process.env.TELEGRAM_BOT_TOKEN!
    static readonly DEEP_AI_TOKEN: string = process.env.DEEP_AI_TOKEN!
    static readonly VUE_GROUP_CHAT_ID: number = parseFloat(process.env.VUE_GROUP_CHAT_ID!)
    static readonly TESTING_GROUP_CHAT_ID: number = parseFloat(process.env.TESTING_GROUP_CHAT_ID!)
}