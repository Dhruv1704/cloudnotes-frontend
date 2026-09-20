import React, {useState} from 'react'
import EditNote from "./EditNote";
import DeleteNote from "./DeleteNote";

export default function NoteCard(props) {
    const {note, noteID, setNoteID} = props;

    const [displayDeleteNote, setDisplayDeleteNote] = useState(false)
    const [displayEditNote, setDisplayEditNote] = useState(false)

    const displayEditNotes = () => {
        setDisplayEditNote(true)
    }
    const openDeleteModal =(id)=>{
        setNoteID(id)
        setDisplayDeleteNote(true)
    }

    return (
        <>
            <div className={`notes bg-[${note.color}] w-[348px] h-[332px] break-words whitespace-break-spaces rounded-3xl p-7 px-8 shadow-lg hover:scale-105 duration-300 ease-out cursor-pointer flex flex-col justify-between`}>
                <div className={"note-pad overflow-hidden hover:overflow-auto"}>
                    <div className={"flex justify-between mb-6"}>
                        <h3 className="text-3xl max-w-[70%] font-semibold">{note.title}</h3>
                        <div>
                            <small className={"relative top-[-8px] font-[500]"}>{note.tag}</small>
                        </div>
                    </div>
                    <p className="text-lg">{note.description}</p>
                </div>
                <div className={"flex self-end gap-x-3 mt-2"}>
                    <div className={"bg-black w-[42px] h-[42px] justify-center rounded-full flex items-center cursor-pointer select-none active:scale-90 edit-note"} onClick={displayEditNotes}>
                        <i className="fa-solid fa-pen text-white edit-note"></i>
                    </div>
                    <div className={"bg-black w-[42px] h-[42px] justify-center rounded-full flex items-center cursor-pointer select-none active:scale-90 delete-note"} onClick={() => {
                        openDeleteModal(note._id)
                    }}>
                        <i className="fa fa-trash text-white delete-note" aria-hidden="true" ></i>
                    </div>
                </div>
            </div>
            <EditNote note={note} displayEditNote={displayEditNote} setDisplayEditNote={setDisplayEditNote}/>
            <DeleteNote id={noteID} displayDeleteNote={displayDeleteNote} setDisplayDeleteNote={setDisplayDeleteNote}/>
        </>
    )
}
