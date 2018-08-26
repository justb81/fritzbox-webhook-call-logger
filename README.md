# AVM Fritzbox Webhook call-logger
This application connects to the call-log port of the fritzbox and sends webhook event for every incoming and outgoing call.

## Environment
```
FRITZBOX_HOST = "fritz.box"
FRITZBOX_PORT = 1012
WEBHOOK = "https://httpbin.org/post"
JSON_SCHEMA = "default"
```

## Events
### CALL
An outgoing call.
### RING
An incoming call.
### CONNECT
Call is connected.
### DISCONNECT
Call is disconnected.
