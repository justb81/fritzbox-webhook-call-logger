'use strict';

const host = process.env.FRITZBOX_HOST || "fritz.box";
const port = process.env.FRITZBOX_PORT || 1012;

// get references to the required stuff
let TelnetSocket;

const net = require("net");

// Initialize WebHooks module. Init
let WebHooks = require('node-webhooks');
let webhookSender;

({TelnetSocket} = require("telnet-stream"));

const transform = require("./modules/transformer");

function run() {
// create a Socket connection
    let socket = net.createConnection(port, host);

// decorate the Socket connection as a TelnetSocket
    let tSocket = new TelnetSocket(socket);

// if the socket closes, reconnect
    tSocket.on("close", function() {
        run();
    });

// if we get any data, display it to stdout
    tSocket.on("data", function(buffer) {
        let line = buffer.toString(), data = transform(line);
        console.debug(line);
        console.debug(data);

        webhookSender.trigger('addEvent', data)
    });
}

function init(){
    const webhook_url = process.env.WEBHOOK || '';

    webhookSender = new WebHooks({
        db: {"addEvent": [webhook_url]}
    })
}

init();
run();