import fs from 'fs';

export function containsNotAllowedWords(msg: string){
    let blocked_word: Array<string> = JSON.parse(fs.readFileSync("./badWords.json", "utf8"))
    return !!blocked_word.find(word => msg.includes(word))
}