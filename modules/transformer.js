function transformLine(data) {
    let lineStruct = data.trim().split(';');

    switch (lineStruct[1]) {
        case "CALL": return transformCall(lineStruct);
        case "DISCONNECT": return transformDisconnect(lineStruct);
        case "CONNECT": return transformConnect(lineStruct);
        case "RING": return transformRing(lineStruct);
    }
    return lineStruct
}

function transformCall(data) {
    return {
        "time": data[0],
        "type": data[1],
        "line": data[2],
        "ownnumber": data[4],
        "foreignnumber": data[5],
        "connection": data[6]
    }
}


function transformRing(data) {
    return {
        "time": data[0],
        "type": data[1],
        "line": data[2],
        "ownnumber": data[4],
        "foreignnumber": data[3],
        "connection": data[5]
    }
}

function transformDisconnect(data) {
    return {
        "time": data[0],
        "type": data[1],
        "line": data[2],
        "seconds": data[3]
    }
}


function transformConnect(data) {
    return {
        "time": data[0],
        "type": data[1],
        "line": data[2],
        "foreignnumber": data[4]
    }
}
module.exports = transformLine;