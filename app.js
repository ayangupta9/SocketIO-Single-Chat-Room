const express = require('express')

let app = express()
const PORT = process.env.PORT || 5000
let server = app.listen(PORT, () => {
  console.log('Listening at 5000')
})

app.use(express.static('./public'))
