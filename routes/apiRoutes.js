var db = require("../db/db");
var fs = require("fs");
var path = require("path");


fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
  if (err) {
    throw err;
  }
  noteObj = JSON.parse(data);
  return noteObj
});


module.exports = function (app){
// save note
  app.post("/api/notes", function (req, res){
    console.log(req.body)
    let newNote = {};
    newNote.id = getId();
    newNote.title = req.body.title;
    newNote.text = req.body.text;
    

    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
      if (err){
        throw err
      }
      noteObj = JSON.parse(data);
      noteObj.push(newNote);
      fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(noteObj), (err)=>{
        if (err){
          throw err
        }
      })
      db.push(noteObj)
    })
  })
  // delete note
  app.delete("/api/notes/:id", function (req, res) {
    let id = JSON.parse(req.params.id);
        console.log(noteObj[0].id)
        console.log(id)
        for (i = 0; i <= noteObj.length; i++) {
            if (noteObj[i].id === id) {
                noteObj.splice(i, 1);
                console.log(noteObj)
        fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(noteObj), (err) => {
            if (err) {
                throw err
            }
            db =[];
            db.push(noteObj)
        })
       }
    }


})


  // show stored 
  app.get("/api/notes", function (req, res){
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data)=>{
      if (err){
        throw err;
      }
      return res.json(JSON.parse(data))
    })
  });
  
}

function getId() {
  let id = (Math.floor(Math.random() * 100000));

  return id
};
