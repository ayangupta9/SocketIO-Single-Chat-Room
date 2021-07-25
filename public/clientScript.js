let socket = io(window.location.href)

const message = document.getElementById('message'),
  handle = document.getElementById('handle'),
  sendBtn = document.querySelector('.sendBtn'),
  output = document.getElementById('output'),
  messageWrapper = document.querySelector('.messageWrapper'),
  checkBox = document.getElementById('flexSwitchCheckDefault'),
  feedback = document.getElementById('feedback')

checkBox.addEventListener('change', e => {
  if (e.target.checked === false) {
    handle.disabled = false
    message.disabled = true
    sendBtn.disabled = true
  } else {
    if (handle.value === '') {
      alert('Enter a valid handle')
      e.target.checked = false
    } else {
      handle.disabled = true
      message.disabled = false
      sendBtn.disabled = false
    }
  }
})

document.addEventListener('DOMContentLoaded', e => {
  if (handle.checked === false) {
    handle.disabled = false
    message.disabled = true
    sendBtn.disabled = true
  } else {
    handle.disabled = true
    message.disabled = false
    sendBtn.disabled = false
  }
})

sendBtn.addEventListener('click', e => {
  if (
    (handle.value !== '' && message.value !== '') ||
    (handle.value !== undefined && message.value !== undefined) ||
    (handle.value !== null && message.value !== null)
  ) {
    socket.emit('chat', {
      message: message.value,
      handle: handle.value
    })
    message.value = ''
  } else {
    alert('Important field missing')
  }
})

socket.on('chat', data => {
  feedback.innerText = ''
  feedback.style.visibility = 'collapse'
  output.innerHTML =
    `<p><strong>${data.handle}: </strong>${data.message}</p>` + output.innerHTML
})

socket.on('alreadyExistsError', data => {
  alert(data)
})

// Utils
function setFocusOnDivWithId (elementId) {
  const scrollIntoViewOptions = { behavior: 'smooth', block: 'center' }
  document.getElementById(elementId).scrollIntoView(scrollIntoViewOptions)
}

let timeout = undefined
let typing = false

function timeOutFunction () {
  typing = false
  socket.emit('notTyping')
}

message.addEventListener('keydown', e => {
  if (typing === false) {
    typing = true
    socket.emit('typing', handle.value)
    timeout = setTimeout(timeOutFunction, 2000)
  } else {
    clearTimeout(timeout)
    timeout = setTimeout(timeOutFunction, 2000)
  }
})

socket.on('typing', data => {
  feedback.style.visibility = 'visible'
  feedback.innerText = `${data} is typing`
})

socket.on('notTyping', data => {
  if (data === true) {
    feedback.innerText = ''
    feedback.style.visibility = 'collapse'
  }
})
