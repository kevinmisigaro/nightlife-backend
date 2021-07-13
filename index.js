const express = require('express')
const port = 3000
const cors = require('cors')

const app = express()
app.use(cors())

const clubRouter = require('./routes/club.routes')

app.use('/clubs', clubRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})