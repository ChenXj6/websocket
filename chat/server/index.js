const WS = require('ws');

; ((Ws) => {
  // ws:localhost:8000
  const serve = new Ws.Server({ port: '8000' });

  const init = () => {
    bindEvent()
  }

  function bindEvent () {
    serve.on('open', handleOpen)
    serve.on('close', handleClose)
    serve.on('error', handleError)
    serve.on('connection', handleConnection)
  }

  function handleOpen () {
    console.log('webSocket open')
  }
  function handleClose (e) {
    console.log('webSocket close', e)
  }
  function handleError () {
    console.log('webSocket error')
  }
  function handleConnection (ws) {
    ws.on('message',handleMessage)
  }

  function handleMessage(msg) {
    // console.log(msg.toString())   二进制 用toString转一下
    serve.clients.forEach(c=>{
      c.send(msg.toString())
    })
  }

  init();

})(WS)