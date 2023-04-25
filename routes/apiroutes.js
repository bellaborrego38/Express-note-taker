const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require ("fs");
// const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// // GET Route for retrieving information
router.get('/api/notes', (req, res) => {
  readFromFile('./db/db.json').then((data) =>
    res.json(JSON.parse(data))
  );
});




router.post('/api/notes', (req, res) => {
  const dbJson = JSON.parse(fs.readFileSync("db/db.json","utf8"));
  const newFeedback = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4(),
  };
  dbJson.push(newFeedback);
  fs.writeFileSync("db/db.json",JSON.stringify(dbJson));
  res.json(dbJson);
});



// POST Route for a error logging
// router.post('/api/notes', (req, res) => {

//   const Json = JSON.parse(fs.readfile)
  
//   const { isValid, errors } = req.body;


//   const payload = {
//     time: Date.now(),
//     error_id: uuidv4(),
//     errors,
//   };

//   if (!isValid) {
//     readAndAppend(payload, './db/db.json');
//     res.json(`Diagnostic information added 🔧`);
//   } else {
//     res.json({
//       message: 'Object is valid, not logging. Check front end implementation',
//       error_id: payload.error_id,
//     });
//   }
// });

module.exports = router;
