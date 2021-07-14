const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000
const fileUpload = require('express-fileupload')
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// enable files upload
app.use(fileUpload({
    createParentPath: true
}))

const clubRouter = require('./routes/club.routes')
const userRouter = require('./routes/user.routes')

app.use('/clubs', clubRouter)
app.use('/user', userRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Example app listening at ${PORT}`)
})