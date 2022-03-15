<template>
  <div class="about">
    <input type="text"
           placeholder="请输入用户名"
           v-model="username">
           &nbsp;
    <button @click="login">登录</button>
  </div>
</template>
<script>
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
export default {
  setup () {
    const username = ref('');
    const router = useRouter();
    const login = () => {
      if(!username.value.trim().length) {
        alert('请输入用户名登录')
        return
      };
      localStorage.setItem('username', username.value)
      router.push('/home')
    }
    onMounted(()=>{
      username.value = localStorage.getItem('username')
      if(username.value) router.push('/home')
    })
    return {
      username,
      login,
    }
  },
}
</script>
