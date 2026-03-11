const express = require("express");
const router = express.Router();
const {getAllNotes,createNote,getNote,updateNote,deleteNote,patchNote} = require("../controllers/notesController")

router.get("/", getAllNotes)
router.post("/", createNote);

router.get("/:id", getNote);
router.put("/:id", updateNote );
router.delete("/:id", deleteNote);
router.patch("/:id", patchNote);


module.exports = router;