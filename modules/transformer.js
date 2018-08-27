/**
 *
 * @param data
 * @returns {*}
 */
function transformLine(data) {
    let lineStruct = data.trim().split(';');

    switch (lineStruct[1]) {

        /**
         * 27.08.18 20:58:37;CALL;1;10;3511541;017620136070;SIP0;
         */
        case "CALL": return transformCall(lineStruct);

        /**
         * 27.08.18 20:58:41;DISCONNECT;1;0;
         */
        case "DISCONNECT": return transformDisconnect(lineStruct);

        /**
         * 27.08.18 20:59:57;CONNECT;0;10;017620136070;
         */
        case "CONNECT": return transformConnect(lineStruct);

        /**
         * 27.08.18 20:59:55;RING;0;017620136070;3511541;SIP0;
         */
        case "RING": return transformRing(lineStruct);
    }
    return lineStruct
}

/**
 * 27.08.18 20:58:37;CALL;1;10;3511541;017620136070;SIP0;
 *
 * @param data
 * @returns {{time: *, event: *, line: *, connection_id: *, connecton_number: *, number: *}}
 */
function transformCall(data) {
    return {
        "time": data[0],
        "event": data[1],
        "line": data[2],
        "connection_id": data[6],
        "connecton_number": data[4],
        "number": data[5]
    }
}

/**
 *
 * @param data
 * @returns {{time: *, event: *, line: *, connection_id: *, connection_number: *, number: *}}
 */
function transformRing(data) {
    return {
        "time": data[0],
        "event": data[1],
        "line": data[2],
        "connection_id": data[5],
        "connection_number": data[4],
        "number": data[3]
    }
}

/**
 *
 * @param data
 * @returns {{time: *, event: *, line: *, duration: *}}
 */
function transformDisconnect(data) {
    return {
        "time": data[0],
        "event": data[1],
        "line": data[2],
        "duration": data[3]
    }
}

/**
 *
 * @param data
 * @returns {{time: *, event: *, line: *, number: *}}
 */
function transformConnect(data) {
    return {
        "time": data[0],
        "event": data[1],
        "line": data[2],
        "number": data[4]
    }
}
module.exports = transformLine;