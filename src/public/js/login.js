let login_pass = document.querySelector('#passwordInput')
let login_user = document.querySelector('#usernameInput')
let login_view_btn = document.querySelector('#showButton')
let login_form = document.querySelector('body > div > div > form')

login_view_btn.onclick = () => {
  if (login_pass.type == 'password') {
    login_pass.type = 'text'
  } else {
    login_pass.type = 'password'
  }
}

login_form.onsubmit = async ev => {
  try {
    ev.preventDefault()

    let res = await fetch('http://localhost:4000/user/old', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        username: login_user.value,
        parol: login_pass.value,
      }),
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
