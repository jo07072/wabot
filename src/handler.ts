import { Message } from "@open-wa/wa-automate";
import { info } from "console";
import { client } from "./client";
import { commands, defaultText, helpText } from "./consts";
import { sendSticker } from "./sticker";

export async function onMessage(message: Message) {
    var command = commands.find(e => e === message.text.split(" ")[0].toLowerCase())

    if (command === undefined) {
        client.sendText(message.from, defaultText)
        return
    } else {
        console.info(`${message.chatId} : ${command}`)
    }

    switch (command) {
        case ".help":
            client.sendText(message.from, helpText)
            break;

        case ".stiker":
            sendSticker(client, message)
            break;
    
        default:
            client.sendText(message.from, defaultText)
            break;
    }

    return
}