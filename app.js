'use strict';

const host = process.env.FRITZBOX_HOST || "fritz.box";
const port = process.env.FRITZBOX_PORT || 1012;

// get references to the required stuff
let TelnetSocket;

const net = require("net");

({TelnetSocket} = require("telnet-stream"));

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
        console.log(buffer.toString("utf8").trim());
        //return process.stdout.write(buffer.toString("utf8"));
    });
}

run();