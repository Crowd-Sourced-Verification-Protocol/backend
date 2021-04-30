const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.listen(port, function(err) {
  if (err) console.log(err);
  console.log('server listening on PORT', port);
});

app.get('/', (req, res) => {
  res.send('GET request called');
})

console.log('restfulAPI started at port', port);
