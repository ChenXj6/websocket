<template>
  <div class="home">
    <ul>
      <li v-for="item in msgList"
          :key="item.id">
        <p>
          <span>{{item.username}}</span>&nbsp;
          <span>{{moment(item.dateTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
        </p>
        <p>
          消息：{{item.msg}}
        </p>
      </li>
    </ul>
    <input type="text"
           placeholder="请输入聊天信息"
           autofocus
           v-model="msg">
    <button @click="handleSendClick">发送</button>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import moment from 'moment'
import { useWebSocket } from '../hooks'

export default {
  name: 'home',
  setup () {
    let user = ''
    const state = reactive({
      msg: '',
      msgList: []
    })

    const router = useRouter()
    const handleSendClick = () => {
      const _msg = state.msg;
      if (!_msg.trim().length) return
      ws.send(JSON.stringify({
        id: new Date().getTime(),
        username: user,
        msg: _msg,
        dateTime: new Date().getTime()
      }))

      state.msg = ''
    }
    const handleMessage = (msg) => {
      // console.log(msg)
      state.msgList.push(JSON.parse(msg.data))
    }
    const ws = useWebSocket(handleMessage)
    onMounted(() => {
      user = localStorage.getItem('username')
      if (!user) {
        router.push('/')
      }
    })
    return {
      ...toRefs(state),
      handleSendClick,
      moment,
    }
  }
}
</script>
