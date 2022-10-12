import { Client, decryptMedia, Message, MessageTypes, Mp4StickerConversionProcessOptions } from "@open-wa/wa-automate";
import { noMediaText } from "./consts";

const stickerMetadata = {
    author: "Jo :)",
    pack: "Made by : ",
    keepScale: true
}

const videoOptions: Mp4StickerConversionProcessOptions = {
    crop: false,
    endTime: "00:00:10.0",
    square: 256 * 256
}

export async function sendSticker(client: Client, message: Message) {
    if (message.isMedia) {
        let mediaBuffer = await decryptMedia(message)
        let imageBase64 = `data:${message.mimetype};base64,${mediaBuffer.toString('base64')}`;
        
        if (message.type === MessageTypes.IMAGE) {
            client.sendImageAsSticker(message.from, imageBase64, stickerMetadata)
        } else if (message.type === MessageTypes.VIDEO) {
            if (typeof(message.duration) === "number" && message.duration > 10) {
                client.sendText(message.from, noMediaText)
                return
            }

            client.sendMp4AsSticker(message.from, imageBase64, videoOptions, stickerMetadata)
        }
    } else {
        client.sendText(message.from, noMediaText)
    }
}