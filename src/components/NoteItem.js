import React,{useContext} from "react";
import NoteContext from "../context/notes/NoteContext";


function NoteItem(props) {
  const context = useContext(NoteContext);
  const { deleteNote} = context;
 

  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-item-center">
            <h5 className="card-title">{props.note.title}</h5>
            <i className="fa fa-trash-o mx-2" onClick={()=>{deleteNote(props.note._id);props.showAlert("Deleted Successfully","success")}}></i>
            <i className="fa fa-pencil-square-o mx-2" onClick={()=>{props.updateNote(props.note)}}></i>
          </div>
          <p className="card-text"> {props.note.description}</p>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
