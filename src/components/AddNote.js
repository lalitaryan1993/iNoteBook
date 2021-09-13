import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

export default function AddNote(props) {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: '', description: '', tag: '' });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: '', description: '', tag: '' });
    props.showAlert('Note Added Successfully', 'success');
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className='container mt-4'>
        <h1>Add a Note</h1>
        <form>
          <div className='mb-3'>
            <label htmlFor='title' className='form-label'>
              Title
            </label>
            <input
              type='text'
              className='form-control'
              name='title'
              id='title'
              minLength={3}
              value={note.title}
              onChange={onChange}
              required
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='description' className='form-label'>
              Description
            </label>
            <input
              type='text'
              onChange={onChange}
              className='form-control'
              name='description'
              minLength={3}
              value={note.description}
              required
              id='description'
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='tag' className='form-label'>
              Tag
            </label>
            <input type='text' onChange={onChange} value={note.tag} className='form-control' name='tag' id='tag' />
          </div>
          <button
            disabled={note.title.length < 3 && note.description.length < 3}
            type='submit'
            className='btn btn-primary'
            onClick={handleClick}
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
}
