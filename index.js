var express =  require('express');
var cors = require('cors');

// https://murmuring-garden-99473.herokuapp.com/
const app = express();
app.use(cors());

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
  response.send('Hello World!')
});

app.get('/users', function(req, res) {
  // Hard coding for simplicity. Pretend this hits a real database
  res.json([
    {"id": 1,"firstName":"Jerry","lastName":"Relunia","email":"zz@gmail.com"},
    {"id": 2,"firstName":"Berry","lastName":"Relunia","email":"zzz@yahoo.com"},
    {"id": 3,"firstName":"Muff","lastName":"Relunia","email":"zzzz@hotmail.com"}
  ]);
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port')); 
});