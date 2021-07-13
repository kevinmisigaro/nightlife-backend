const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT || 3000
const app = express()
app.use(cors())

const clubRouter = require('./routes/club.routes')

app.use('/clubs', clubRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Example app listening at ${PORT}`)
})