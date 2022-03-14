; ((doc, storage) => {


  const list = doc.querySelector('#list');
  const oMsg = doc.querySelector('#message');
  const sendBtn = doc.querySelector('#send');
  const ws = new WebSocket('ws:localhost:8000')

  let user = ''

  const init = () => {
    bindEvent()
  }

  function bindEvent () {
    sendBtn.addEventListener('click', handleSendBtnClick, false)
    ws.addEventListener('open', handleOpen, false)
    ws.addEventListener('close', handleClose, false)
    ws.addEventListener('error', handleError, false)
    ws.addEventListener('message', handleMessage, false)
  }

  function handleSendBtnClick () {
    const msg = oMsg.value;
    if (!msg.trim().length) return;
    ws.send(JSON.stringify({
      user,
      dateTime: new Date().getTime(),
      message: msg
    }))

    oMsg.value = ''
  }

  function handleOpen (e) {
    console.log('WebSocket open', e)
    user = storage.getItem('username')

    if (!user) location.href = 'enter.html'
  }
  function handleClose (e) {
    console.log('WebSocket close', e)
  }

  function handleError (e) {
    console.log('WebSocket error', e)
  }

  function handleMessage (e) {
    const msg = JSON.parse(e.data)
    list.appendChild(createMsg(msg))
  }

  function createMsg (data) {
    const { user, dateTime, message } = data;
    const liItem = doc.createElement('li');
    liItem.innerHTML = `
      <p>
        <span>${user}</span>
        <span>${new Date(dateTime)}</span>
      </p>
      <p>消息：${message}</p>
    `
    return liItem
  }

  init();

})(document, localStorage);