let register_pass = document.querySelector('#passwordInput')
let register_view_btn = document.querySelector('#showButton')
let register_form = document.querySelector('body > div > div > form')

register_view_btn.onclick = () => {
  if (register_pass.type == 'password') {
    register_pass.type = 'text'
  } else {
    register_pass.type = 'password'
  }
}

register_form.onsubmit = async ev => {
  try {
    ev.preventDefault()
    let fd = new FormData(register_form)

    let res = await fetch('https://auth0-server.herokuapp.com/user/new', {
      method: 'POST',
      body: fd,
    })
    res = await res.json()

    if (res['ERROR']) {
      return alert('\n\n\n' + res['ERROR'])
    }
    localStorage.setItem('token', res['token'])
    localStorage.setItem('img', res['url'])
    location = '/'
  } catch (xato) {
    console.log(xato)
  }
}
