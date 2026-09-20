import React, {useContext, useEffect, useState} from 'react'  //problem note_id in id edit-div and closemodal in updateNote
import noteContext from "../context/notes/noteContext";
import {useClickAway} from "@uidotdev/usehooks";


export default function EditNote(props) {

    const editNoteRef = useClickAway(() => {
        setDisplayEditNote(false)
    });

    const context = useContext(noteContext)
    const {editNote} = context

    const {note, displayEditNote, setDisplayEditNote} = props
    const closeModal = () => {
        setNotes({id: note._id, etitle: note.title, edescription: note.description, etag: note.tag})
        setDisplayEditNote(false)
    }

    const [notes, setNotes] = useState({
        id: note._id,
        etitle: note.title,
        edescription: note.description,
        etag: note.tag
    })

    const onChange = (e) => {
        setNotes({...notes, [e.target.name]: e.target.value}) //spread operator
    }

    const updateNote = async (e) => {
        e.preventDefault();
        const update = await editNote(notes.id, notes.etitle.trim(), notes.edescription.trim(), notes.etag.trim(), note.color)
        if (update) {
            console.log("Hello")
            document.getElementById(`edit-div ${note._id}`).style.display = "none";
        } else {
            // console.log("Hello")
            closeModal()
        }
    }

    return (
        <div id={`edit-div ${note._id}`}
             className={`${displayEditNote ? "visible opacity-100" : "invisible opacity-0"} transform ease-in-out duration-300 fixed top-0 left-0 box-border px-2 w-full h-full bg-[#ffffffcc] z-50`}>
            <div className={`${displayEditNote ? "scale-100 opacity-100 visible" : "scale-95 opacity-0 invisible"} transform ease-in-out duration-300 relative top-[25%] bg-white max-w-4xl m-auto p-4 pt-0 pb-1 rounded-xl shadow-2xl`} ref={editNoteRef}>
                <form id={"add-form"} onSubmit={updateNote}>
                    <div className={"flex items-center justify-between"}>
                        <p className="text-xl self-end">Title</p>
                        <span
                            className="text-[#aaaaaa] font-bold text-[28px] cursor-pointer hover:text-black decoration-0"
                            onClick={closeModal}>&times;</span>
                    </div>
                    <input placeholder="Min-3 characters" name={"etitle"}
                           className={"border-[1px] rounded-md my-2 p-2 w-full"} value={notes.etitle}
                           onChange={onChange} minLength={3} required/>
                    <p className="text-xl">Description</p>
                    <textarea placeholder={"Min-5 characters"} name={"edescription"} value={notes.edescription}
                              onChange={onChange} className={"w-full border-[1px] rounded-md my-2 p-2 resize-y"}
                              minLength={5} required></textarea>
                    <p className="text-xl">Tag</p>
                    <input placeholder="Ex-Work,Personal etc" className={"border-[1px] rounded-md my-2 p-2 w-full"}
                           name={"etag"} value={notes.etag} onChange={onChange} required/>
                    <button type="submit" className="button active:scale-95" id="edit_button">
                        <span className={"text"}>Edit Note</span>
                    </button>
                </form>
            </div>
        </div>
    )
}
