const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

const Client = require('pg')

const client = new Client.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

client.connect()

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  });

const clubRouter = require('./routes/club.routes')

app.use('/clubs', clubRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
})