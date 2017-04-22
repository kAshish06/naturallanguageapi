var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
//var router = express.Router();
//var index = require('./route/index');
var port = 3000;
var app = express();
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use('/', index);
app.get('/', function(req, res, next) {
  res.render('index.html');
});

app.post('/detectSentiment', function(req, res, next) {
  var string = req.body.string;
  const Language = require('@google-cloud/language');
  const language = Language({ apiVersion: 'v1beta2'});

  //const text = 'The hotel was amazing, clean rooms and supportive staff. Highly recommended.';

  const document = language.document({ content: string });
  document.detectSentiment()
    .then((results) => {
      res.json(results[1]);
      console.log(`PRINTING RESULTS`);
      console.log(results[0]);
      console.log(`result 1`);
      console.log(results[1]);
      const sentiment = results[1].documentSentiment;
      console.log(`Document sentiment`);
      console.log(` Score: ${sentiment.score}`);
      console.log(` Magnitude: ${sentiment.magnitude}`);

      const sentences = results[1].sentences;
      sentences.forEach((sentence) => {
        console.log(`Sentence: ${sentence.text.content}`);
        console.log(`   Score: ${sentence.sentiment.score}`);
        console.log(`   Magnitude: ${sentence.sentiment.magnitude}`);
        console.log(`-----printing whole objects----`);
      });
    })
    .catch((err) => {
      console.log('Error: ', err);
    })
})

app.get('/firstTest', function(req, res, next) {
  const Language = require('@google-cloud/language');
  const language = Language({ apiVersion: 'v1beta2'});

  const text = 'The hotel was amazing, clean rooms and supportive staff. Highly recommended.';

  const document = language.document({ content: text });

  document.detectSentiment()
    .then((results) => {
      res.json(results[1]);
      console.log(`PRINTING RESULTS`);
      console.log(results[0]);
      console.log(`result 1`);
      console.log(results[1]);
      const sentiment = results[1].documentSentiment;
      console.log(`Document sentiment`);
      console.log(` Score: ${sentiment.score}`);
      console.log(` Magnitude: ${sentiment.magnitude}`);

      const sentences = results[1].sentences;
      sentences.forEach((sentence) => {
        console.log(`Sentence: ${sentence.text.content}`);
        console.log(`   Score: ${sentence.sentiment.score}`);
        console.log(`   Magnitude: ${sentence.sentiment.magnitude}`);
        console.log(`-----printing whole objects----`);
      });
    })
    .catch((err) => {
      console.log('Error: ', err);
    })
  //res.json(test);
});

app.listen(port, function() {
  console.log('Server started on port' + port);
})
