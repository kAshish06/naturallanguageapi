var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  res.render('index.html');
});

router.get('/firstTest', function(req, res, next) {
  var test = {
    "test1": "test1",
    "test2": "test2",
    "test3": "test3"
  };


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

module.exports = router;
