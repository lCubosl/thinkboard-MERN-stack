import Note from "../model/Note.js"

// GET all notes
// _ (underscore) skips the req parameter 
export async function getAllNotes(_, res) {
  try {
    const notes = await Note.find().sort({createdAt:-1}) //newest first
    res.status(200).json(notes)

  } catch (error) {
    console.error("Error in getAllNotes controller", error)
    res.status(500).json({message: "Internal server error"})
  }
}

// GET single note
export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id)
    if(!note) return res.status(404).json({message:"Note not found"})
    res.json(note)
    
  } catch (error) {
    console.error("Error in getNoteById controller", error)
    res.status(500).json({message: "Internal server error"})    
  }
}

// POST single note
export async function createNote(req, res)  {
  try {
    const{title, content} = req.body
    const note = new Note({title, content})
    
    const savedNote = await note.save()
    res.status(201).json(savedNote)

  } catch (error) {
    console.error("Error in createNote controller", error)    
    res.status(500).json({message: "Internal server error"})
  }  
}

// PUT changes note content
export async function updateNote(req, res) {
  try {
    const {title, content} = req.body
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new:true})
    if(!updateNote) return res.status(404).json({message: "Note not found"})
    res.status(200).json(updateNote)
    
  } catch (error) {
    console.error("Error in updateNote controller", error)    
    res.status(500).json({message: "Internal server error"})    
  }
}

// DELETE single note
export async function deleteNote(req, res) {
  try {
    const deleteNote = await Note.findByIdAndDelete(req.params.id)    
    if(!deleteNote) return res.status(404).json({message: "Note not found"})
    res.status(200).json({message: "Note deleted successfully"})
  
  } catch (error) {
    console.error("Error in deleteNote controller", error)    
    res.status(500).json({message: "Internal server error"})    
  }
}