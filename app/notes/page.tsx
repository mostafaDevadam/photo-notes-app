import React, { use } from 'react'
import GridNotes from '../_components/_grids/GridNotes'
import { getAllNotesByUserId } from '../api/notes.api'
import { getID } from '../_lib/id'
import { NOTE_TYPE } from '../_types/types'
import { getAllUsers } from '../api/user.api'

const NotesPage = async () => {
  const notes = await getAllNotesByUserId()
  console.log("notes:", notes)
  const userId = await getID()
  const users = await getAllUsers()
  console.log("users:", users)
  return (
    <div>
      <GridNotes notes={notes!!} userId={userId!!} users={users} />
    </div>
  )
}

export default NotesPage