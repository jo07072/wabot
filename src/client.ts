import { Client, Message, OnError, STATE, create } from "@open-wa/wa-automate";
import { onMessage } from "./handler";

export let client: Client

export async function startClient() {
    client = await create({
        multiDevice: true,
        authTimeout: 0,
        qrTimeout: 0,
        cacheEnabled: false,
        useChrome: true,
        onError: OnError.LOG_AND_FALSE,
        restartOnCrash: startClient
    })

    initListener(client)
}

function initListener(client: Client) {
    client.onStateChanged((state: STATE) => console.info(`BOT STATE : ${state}`))
    client.onMessage((message: Message) => onMessage(message))
}