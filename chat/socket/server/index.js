const WebSocket = require('ws')

  ; ((Ws) => {
    const server = new Ws.Server({ port: 3030 });
    const init = () => {
      bindEvent()
    }
    function bindEvent () {
      server.on('open', handleOpen)
      server.on('close', handleClose)
      server.on('error', handleError)
      server.on('connection', handleConnection)
    }

    function handleOpen (e) {
      // console.log('websocket-serve open', e)
    }
    function handleClose (e) {
      console.log('websocket-serve close', e)
    }
    function handleError (e) {
      console.log('websocket-serve error', e)
    }
    function handleConnection (ws) {
      // console.log('websocket-serve connection', ws)
      ws.on('message', handleMessage)
    }
    function handleMessage (msg) {
      const _msg = msg.toString()
      server.clients.forEach(c => {
        c.send(_msg)
      })
    }

    init()
  })(WebSocket);