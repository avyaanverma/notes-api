const notes = require("../notes")

function  getAllNotes(req,res){
    return res.json(notes);
}
function  createNote(req,res){
    const note = req.body;
    if(!note.title || !note.content || !note.tags ) 
        return res.status(400).json({
            message: "Notes are Empty....."
        })

    notes.notes.push({id: Date.now(), ...note});

    return res.status(201).json({
        message: "Notes Successfully Created!",
        data: note
    })

}
function  getNote(req,res){
    const id = Number(req.params.id);
    const note = notes.notes.find((n)=> n.id == id);
    if(!note) return res.status(400).json({
        message: "Note not found."
    })

    return res.status(201).json({
        message: "Note Found!",
        data: note
    })
}
function  updateNote(req,res){
    const id = Number(req.params.id);
    const note = notes.notes.find((n)=> n.id == id);
    if(!note) return res.status(400).json({
        message: "Note not found."
    })

    const updatedChanges = req.body;
    note.title = updatedChanges.title || note.title; 
    note.content = updatedChanges.content || note.content; 
    note.tags = updatedChanges.tags || note.tags; 
    return res.status(201).json({
        data: note 
    })
}
function  deleteNote(req,res){
    const id = Number(req.params.id);
    const note = notes.notes.find((n)=> n.id == id);
    if(!note) return res.status(400).json({
        message: "Note not found."
    })

    notes.notes = notes.notes.filter((n)=>n.id != id)
    
    return res.status(204).send();

}
function  patchNote(req,res){
    return res.json(notes);
}


module.exports = {getAllNotes,createNote,getNote,updateNote,deleteNote,patchNote}
