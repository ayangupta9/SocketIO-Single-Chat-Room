let socket = io('http://localhost:5000')

const message = document.getElementById('message'),
  handle = document.getElementById('handle'),
  sendBtn = document.querySelector('.sendBtn'),
  output = document.getElementById('output'),
  messageWrapper = document.querySelector('.messageWrapper'),
  checkBox = document.getElementById('flexSwitchCheckDefault')

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
  output.innerHTML += `<p><strong>${data.handle}: </strong>${data.message}</p>`
  setFocusOnDivWithId('toBeScrolled')
})

socket.on('alreadyExistsError', data => {
  alert(data)
})

// Utils
function setFocusOnDivWithId (elementId) {
  const scrollIntoViewOptions = { behavior: 'smooth', block: 'center' }
  document.getElementById(elementId).scrollIntoView(scrollIntoViewOptions)
}
