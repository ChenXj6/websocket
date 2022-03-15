import { WS_ADDRESS_URL } from "@/config";

export default function useWebSocket (handleMessage) {
  const ws = new WebSocket(WS_ADDRESS_URL);
  const init = () => {
    bindEvent()
  }

  function bindEvent () {
    ws.addEventListener('open', handleOpen, false)
    ws.addEventListener('close', handleClose, false)
    ws.addEventListener('error', handleError, false)
    ws.addEventListener('message', handleMessage, false)
  }

  function handleOpen (e) {
    console.log('websocket open', e)
  }
  function handleClose (e) {
    console.log('websocket close', e)
  }

  function handleError (e) {
    console.log('websocket error', e)
  }

  init()

  return ws
}