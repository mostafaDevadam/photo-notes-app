import React from 'react'
import GridFolders from '../_components/_grids/GridFolders'
import { getID } from '../_lib/id'
import { getAllFoldersByUserId } from '../api/folder.api'

const FoldersPage = async () => {
  const folders = await getAllFoldersByUserId()
  console.log("folders:", folders)
  const userId = await getID()
  return (
    <div>
      <GridFolders folders={folders!!} userId={userId} />
    </div>
  )
}

export default FoldersPage