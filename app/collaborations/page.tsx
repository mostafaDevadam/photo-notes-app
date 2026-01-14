import React from 'react'
import GridCollaborations from '../_components/_grids/GridCollaborations'
import { getAllCollborationsByMember } from '../api/collaboration.api'
import { getID } from '../_lib/id'

// CardCollboration: RemoveCollborationButton
const CollaborationsPage = async () => {
    const userId = await getID()
    const collabrations = await getAllCollborationsByMember()
    console.log("collabrations:", collabrations)

    
    return (
        <div><GridCollaborations collabrations={collabrations!!} userId={userId} /></div>
    )
}

export default CollaborationsPage