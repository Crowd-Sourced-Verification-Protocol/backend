const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://nandit123:mehra123@cluster0.nj3nz.mongodb.net/db1?retryWrites=true&w=majority";

const app = express();
app.use(express.json())

const port = process.env.PORT || 3001;

app.listen(port, function (err) {
  if (err) console.log(err);
  console.log('server listening on PORT', port);
});

app.get('/', (req, res) => {
  res.send('GET request called');
})

app.post('/addRating', (req, res) => {
  console.log('entered addRating with parameters: ', req.body);
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  async function run() {
    try {
      console.log('entered try block');
      await client.connect();
      console.log('connected correctly to the server');

      const db = client.db("db1");

      const col = db.collection("cl1");

      let ratingDocument = {
        userId: req.body.userId,
        url: req.body.url,
        rating: req.body.rating
      };

      // insert a single document, wait for promise  so we can read it back
      const p = await col.insertOne(ratingDocument);
      
      // find one document
      const myDoc = await col.findOne();

      // print to the console
      console.log('mydoc:', myDoc);
    } catch (e) {
      console.log('got an error:', e);
    } finally {
      await client.close();
    }
  }
  run();
  res.send('done')
})

console.log('restfulAPI started at port', port);
