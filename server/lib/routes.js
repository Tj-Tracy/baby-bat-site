import express from 'express';
import DpsParse from './parse.js';
import path from 'path';
import * as parser from 'xml2json';
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

router.get('/parseList', (req, res) => {
  res.set('Content-type', 'application/json');
  DpsParse.find({}, "id uploadTime title", (err, dpsParse) => {
    if (err) {
      console.log(`Something went wrong: ${err}`);
      res.send(`{"success": "false", "code": "02, couldn't find anything"}`)
    } else {
      res.write("[");
      dpsParse.map((currentParse, i) => {
        res.write(`{
          "uploadTime": "${currentParse.uploadTime}",
          "id": "${currentParse.id}",
          "title": "${currentParse.title}"
        }`);
        if (i + 1 !== dpsParse.length) {
          res.write(",");
        }
      });
      res.write("]");
      res.end();
    }
  });
});

// Handle submitting a parse to the database
router.post('/submitParse', (req, res) => {
  
  // create the object to save to mongo
  if (req.body.raw) {
    let parsedRaw = JSON.parse(parser.toJson(req.body.raw));
    const d = new Date();
    const newDpsParse = new DpsParse({
      id: parsedRaw.EncounterTable.Row[0].EncId,
      uploadTime: `${d.getMonth()}-${d.getDay()}-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`,
      raw: JSON.stringify(parsedRaw),
      title: req.body.title
    });
    // save it to the db
    newDpsParse.save((err) => {
      if (err) {
        console.log("Something went wrong saving to db: ", err);
      }
    });
    // return results
    res.send(JSON.stringify(newDpsParse));
  } else {
    res.send(`{"success": "false", "code": "01, no body"}`);
  }
});


router.get('/api/parse/:id', (req, res) => {
  res.set('Content-type', 'application/json');
  DpsParse.findOne({
    id: req.params.id
  }, (err, dpsParse) => {
    if (err) {
      res.send(`{"success": "false", "code": "01, no parse here"}`);
    } else {
      res.send(dpsParse);
    }
  })
});

router.get('/parse/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});


export default router;