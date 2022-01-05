let admin_list = document.querySelector(
  'body > div > main > div.admin-wrapper > ul'
)

render_list_video()

async function render_list_video() {
  try {
    let token = localStorage.getItem('token')
    if (!token) {
      return (location = '/')
    }
    let res = await fetch('http://localhost:4000/video/all', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        token,
      },
    })
    res = await res.json()

    if (res['ERROR']) {
      if (/(jwt)/.test(res['ERROR'])) {
        localStorage.removeItem('token')
        localStorage.removeItem('img')
      }
      return alert('render:\n\n\n' + res['ERROR'])
    }

    render_list(res['videos'])
  } catch (xato) {
    console.log(xato)
  }
}

let admin_form = document.querySelector(
  'body > div > main > div.wrapper > form'
)

admin_form.onsubmit = async eve => {
  try {
    eve.preventDefault()
    let token = localStorage.getItem('token')
    if (!token) {
      return (location = '/')
    }
    let fd = new FormData(admin_form)

    let res = await fetch('http://localhost:4000/video/new', {
      method: 'POST',
      headers: {
        token,
      },
      body: fd,
    })
    res = await res.json()

    if (res['ERROR']) {
      if (/(jwt)/.test(res['ERROR'])) {
        localStorage.removeItem('token')
        localStorage.removeItem('img')
      }
      return alert('form:\n\n\n' + res['ERROR'])
    }
    admin_form.reset()
    await render_list_video()
  } catch (xato) {
    console.log(xato)
  }
}

function render_list(videos) {
  admin_list.innerHTML = null

  for (const id in videos) {
    if (Object.hasOwnProperty.call(videos, id)) {
      const { title, path } = videos[id]
      let li = document.createElement('li')
      let p = document.createElement('p')
      let im = document.createElement('img')
      let v = document.createElement('video')

      li.className = 'video-item'
      p.className = 'content'
      im.className = 'delete-icon'

      p.id = id

      v.setAttribute('src', 'http://localhost:4000' + path)
      v.setAttribute('controls', 'controls')
      im.setAttribute('src', './img/delete.png')
      p.setAttribute('contenteditable', 'true')

      p.innerText = title
      im.style.width = '25px'

      //enet for new title
      p.onkeydown = async aw => {
        try {
          if (aw.keyCode != 13 || !p.innerText) return
          p.innerText = p.innerText.trim()
          let token = localStorage.getItem('token')
          if (!token) {
            return (location = '/')
          }
          let res = await fetch('http://localhost:4000/video/old', {
            method: 'PUT',
            headers: {
              'content-type': 'application/json',
              token,
            },
            body: JSON.stringify({ vide_id: p.id, newTitle: p.innerText }),
          })
          res = await res.json()
          if (res['ERROR']) {
            if (/(jwt)/.test(res['ERROR'])) {
              localStorage.removeItem('token')
              localStorage.removeItem('img')
            }
            return alert('title:\n\n\n' + res['ERROR'])
          }
          p.innerText = p.innerText.trim()
        } catch (p_xato) {
          console.log(p_xato)
        }
      }
      //end new title

      //enet for delete video
      im.onclick = async aw => {
        try {
          let token = localStorage.getItem('token')
          if (!token) {
            return (location = '/')
          }
          let res = await fetch('http://localhost:4000/video/old', {
            method: 'DELETE',
            headers: {
              'content-type': 'application/json',
              token,
            },
            body: JSON.stringify({ vide_id: p.id }),
          })
          res = await res.json()
          if (res['ERROR']) {
            if (/(jwt)/.test(res['ERROR'])) {
              localStorage.removeItem('token')
              localStorage.removeItem('img')
            }
            return alert('delete:\n\n\n' + res['ERROR'])
          }
          alert('ok!')
          await render_list_video()
        } catch (p_xato) {
          console.log(p_xato)
        }
      }
      //end delete video

      li.append(v, p, im)
      admin_list.append(li)
    }
  }
}
