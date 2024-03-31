import { useState } from 'react'

const NoteForm = ({ createNote }) => {

  return (
    <div className="formDiv">
      <h2>Create a new note</h2>

      <form onSubmit={createNote}>
        <input
          name='content'
          placeholder='write note content here'
          id='note-input'
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default NoteForm