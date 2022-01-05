const user_avatar = document.querySelector(
  'body > div > header > section.header-right > a'
)
user_avatar.onclick = e => {
  try {
    e.preventDefault()
    if (!localStorage.getItem('token')) {
      return (location = '/login')
    }
    return (location = '/admin')
  } catch (xato) {
    console.log(xato)
  }
}
let user_list = document.querySelector(
  'body > div > main > div.left-menu-wrapper > ul'
)
let video_list = document.querySelector(
  'body > div > main > div.iframes-wrapper > ul'
)
let dataLIST = document.querySelector('#datalist')
get_data()

async function get_data() {
  try {
    let res = await fetch('https://auth0-server.herokuapp.com/all/user')
    res = await res.json()

    if (res['ERROR']) {
      return alert('user list:\n\n\n' + res['ERROR'])
    }
    dataLIST.innerHTML = null
    for (const uid in res) {
      if (Object.hasOwnProperty.call(res, uid)) {
        const { videos } = res[uid]
        for (const vid in videos) {
          if (Object.hasOwnProperty.call(videos, vid)) {
            const { title } = videos[vid]
            let op = document.createElement('option')
            op.value = title
            dataLIST.append(op)
          }
        }
      }
    }
    user_list_render(res)
    video_list_render(res)
  } catch (xato) {
    console.log(xato)
  }
}

function user_list_render(data) {
  try {
    user_list.innerHTML = `<h1>YouTube Members</h1>`

    for (const id in data) {
      if (Object.hasOwnProperty.call(data, id)) {
        const { username, avatar } = data[id]
        let li = document.createElement('li')

        li.id = id
        li.classList.add('channel')
        li.innerHTML = `<a href="#">
              <img src="https://auth0-server.herokuapp.com${avatar}" alt="channel-icon" width="30px" height="30px">
              <span>${username}</span>
              </a>`
        li.onclick = async () => {
          try {
            user_list.childNodes.forEach(el => {
              el?.classList?.remove('active')
            })

            li.classList.add('active')

            let res = await fetch(
              'https://auth0-server.herokuapp.com/search' + '?US=' + li.id
            )
            res = await res.json()

            if (res['ERROR']) {
              return alert(res['ERROR'])
            }
            video_list_render(res['db'])
          } catch (_xato) {
            console.log(_xato)
          }
        }
        user_list.append(li)
      }
    }
  } catch (xato) {
    console.log(xato)
  }
}

function video_list_render(data) {
  try {
    video_list.innerHTML = null
    for (const id in data) {
      if (Object.hasOwnProperty.call(data, id)) {
        const { avatar, username, videos } = data[id]

        for (const vid in videos) {
          if (Object.hasOwnProperty.call(videos, vid)) {
            const { path, size, time, title } = videos[vid]

            let li = document.createElement('li')
            let div = document.createElement('div')
            let h2 = document.createElement('h2')
            let h3 = document.createElement('h3')
            let time_ = document.createElement('time')
            let a = document.createElement('a')
            let span = document.createElement('span')
            let img = document.createElement('img')
            let img2 = document.createElement('img')
            let div2 = document.createElement('div')
            let video = document.createElement('video')

            li.className = 'iframe'
            div.className = 'iframe-footer'
            div2.className = 'iframe-footer-text'
            h2.className = 'channel-name'
            h3.className = 'iframe-title'
            time.className = 'uploaded-time'
            a.className = 'download'

            video.setAttribute(
              'src',
              'https://auth0-server.herokuapp.com' + path
            )
            video.setAttribute('controls', 'controls')
            a.setAttribute('href', '#')
            img.setAttribute(
              'src',
              'https://auth0-server.herokuapp.com' + avatar
            )
            img2.setAttribute('src', './img/download.png')

            span.innerText = size + ' mb'
            h2.innerText = username
            h3.innerText = title
            time_.innerText = time

            a.onclick = async () => {
              try {
                location = `https://auth0-server.herokuapp.com/download?u=${path}`
              } catch (_xato) {
                console.log(_xato)
              }
            }

            a.append(span, img2)
            div2.append(h2, h3, time_, a)
            div.append(img, div2)
            li.append(video, div)
            video_list.append(li)
          }
        }
      }
    }
  } catch (xato) {
    console.log(xato)
  }
}

let user_avatar_img = document.querySelector(
  'body > div > header > section.header-right > a > img'
)
if (localStorage.getItem('img')) {
  user_avatar_img.setAttribute(
    'src',
    'https://auth0-server.herokuapp.com' + localStorage.getItem('img')
  )
}

let search_form = document.querySelector('body > div > header > form')
let search_form_inp = document.querySelector(
  'body > div > header > form > input'
)
let search_form_voice = document.querySelector(
  'body > div > header > form > button:nth-child(4)'
)

search_form.onsubmit = async eve => {
  eve.preventDefault()

  await for_search_form(eve)
}
search_form_inp.onchange = async eve => {
  await for_search_form(eve)
}
search_form_voice.onclick = eve => {
  const voice = new window.webkitSpeechRecognition()
  const msg = new SpeechSynthesisUtterance()
  msg.lang = 'en'
  voice.lang = 'en-EN'
  voice.start()

  voice.onresult = async asde => {
    let data = asde.results[0][0].transcript
    search_form_inp.value = data
    await for_search_form(eve)
  }
}

async function for_search_form(eve) {
  try {
    if (!search_form_inp.value) return

    let res = await fetch(
      'https://auth0-server.herokuapp.com/search' +
        '?s=' +
        search_form_inp.value
    )
    res = await res.json()
    if (res['ERROR']) {
      return alert(res['ERROR'])
    }
    video_list_render(res['db'])
  } catch (xato) {
    console.log(xato)
  }
}
