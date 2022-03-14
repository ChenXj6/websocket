((doc,storge,location) => {
  const input = document.getElementById('username')
  const btn = document.getElementById('enter')

  const init = () => {
    btnEvent()
  }

  function btnEvent () {
    btn.addEventListener('click', handleEnterClick, false)
  }
  init();

  function handleEnterClick(){
    const username = input.value.trim()

    if(username.length < 6) {
      alert('用户名小于6位')
      return
    }

    storge.setItem('username', username)

    location.href = 'index.html'
  }

})(document,localStorage,location)