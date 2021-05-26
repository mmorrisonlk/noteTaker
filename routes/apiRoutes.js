const fs = require('fs')
const {v4: uuidv4} = require('uuid');

module.exports = (app) => {

  app.get('/api/notes', (req, res) => {
    let Notes = [];
    let previousNotes = fs.readFileSync('./db/db.json', {encoding: 'utf-8'});
    if (previousNotes) {
      Notes = JSON.parse(previousNotes);
    }
    res.json(Notes);
  });


  app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();

    fs.readFile('./db/db.json', { encoding: 'utf-8' }, (err, previousNotes) => {
      if (err) throw err;

      let Notes = [];
      if (previousNotes) {
        Notes = JSON.parse(previousNotes);
      }
      Notes.push(newNote);

      fs.writeFile('./db/db.json', JSON.stringify(Notes), (err) => {
        if (err) throw err;
        res.json(newNote)
      });
    });
  });



  app.post('/api/clear', (req, res) => {
    tableData.length = 0;
    waitListData.length = 0;

    res.json({ ok: true });
  });
};