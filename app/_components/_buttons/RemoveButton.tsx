import React, { useActionState } from 'react'
type Props = {
    action: (prevState: any, formData: FormData) => Promise<any>
    invitationId?: any
    collborationId?: any
    noteId?: any

}
const RemoveButton = ({ action, invitationId, collborationId, noteId }: Props) => {
    const [state, formAction] = useActionState(action, null)

    return (
        <div>
            <form action={formAction}>
                <input hidden type="text" name="noteId" value={noteId} />
                <input hidden type="text" name="invitationId" value={invitationId} />
                <input hidden type="text" name="collborationId" value={collborationId} />
                <button type="submit" className='bg-blue-500 rounded-md px-2 py-2 text-white'>Remove</button>
            </form>
        </div>
    )
}

export default RemoveButton