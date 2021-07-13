const express = require('express')
const cors = require('cors')
const Pool = require('pg')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

const app = express()
app.use(cors())

const clubRouter = require('./routes/club.routes')

app.use('/clubs', clubRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/db', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
})