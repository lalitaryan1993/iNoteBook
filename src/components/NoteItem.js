import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

export default function NoteItem(props) {
  const context = useContext(noteContext);
  const { deleteNote } = context;

  const { note, updateNote, showAlert } = props;
  return (
    <div className='col-md-3 my-3'>
      <div className='card'>
        <div className='card-body'>
          <div className='d-flex align-items-center'>
            <h5 className='card-title'>{note.title}</h5>
            <button
              type='button'
              className='btn btn-danger btn-sm mx-1'
              onClick={async (e) => {
                e.preventDefault();
                let deleted = await deleteNote(note._id);
                if (deleted) {
                  showAlert('Note Deleted Successfully', 'success');
                }
              }}
            >
              <i className='far fa-trash-alt'></i>
            </button>
            <button
              type='button'
              className='btn btn-info btn-sm mx-1'
              onClick={(e) => {
                e.preventDefault();
                updateNote(note);
              }}
            >
              <i className='far fa-edit'></i>
            </button>
          </div>

          <p className='card-text'>{note.description}</p>
        </div>
      </div>
    </div>
  );
}
