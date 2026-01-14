"use client";

import React, { useEffect, useState } from 'react'
import { NOTE_TYPE, PHOTO_TYPE, USER_TYPE } from '../../_types/types';
import NoteDialogButton from '../_buttons/NoteDialogButton';
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Toolbar, ToolbarGroup, ToolbarSeparator } from '@/components/tiptap-ui-primitive/toolbar';
import { Button } from '@/components/ui/button';
import { BoldIcon, ItalicIcon } from 'lucide-react';
import MenubarEditor from '../_editor/MenubarEditor';
import { getPhotosByNoteIdAction } from '../../actions/photo.actions';
import { removeEmptyParagraphs } from '../../_utils/sanitizeContent';
import { createNoteByUserId } from '../../api/notes.api';
import { createNoteByUserIdAction, updateNoteByIdAction } from '../../actions/note.actions';
import NotePhotoDialogButton from '../_buttons/NotePhotoDialogButton';
import ShareButton from '../_buttons/ShareButton';
import { createShareByUserIdAction } from '../../actions/share.actions';
import TextAreaEditor from '../_editor/TextAreaEditor';
import InviteDialogButton from '../_buttons/InviteDialogButton';
import { createInvitationByUserIdAction } from '../../actions/invitation.actions';


type Props = {
  notes: NOTE_TYPE[],
  userId: any,
  users: USER_TYPE[] | null,
}

const GridNotes = ({ notes, userId, users }: Props) => {
  const [note, setNote] = useState<NOTE_TYPE>()
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [editorContent, setEditorContent] = useState<string | null>()
  const [photos, setPhotos] = useState<PHOTO_TYPE[]>([])
  const [isSelectedNote, setIsSelectedNote] = useState<boolean>(false)
  const [isAddNote, setIsAddNote] = useState<boolean>(false)

  const editor = useEditor({
    extensions: [
      StarterKit, // Includes basic extensions: bold, italic, lists, etc.
    ],
    content: `
      <h2>
        Hi there,
      </h2>
      <p>
        this is a <em>basic</em> first example of <strong>TipTap</strong>. Surprised? 🙌
      </p>
    `,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const rawHtml = editor.getHTML()
      const cleanHtml = removeEmptyParagraphs(rawHtml)
      handleContentChange(cleanHtml)

    },
    // Prevents immediate rendering on the server to avoid hydration mismatches
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none h-[400px] overflow-y-auto p-4 border border-gray-300 rounded-md',
      },
    },
  })

  useEffect(() => {
    if (editor && note?.content !== editor.getHTML()) {
      const cleanInitial = removeEmptyParagraphs(note?.content!!)
      editor.commands.setContent(cleanInitial, {})

    }
  }, [note, editor])

  const handleSelectNote = (e: any, note: NOTE_TYPE) => {
    e.preventDefault()
    setNote(note)
    setIsEdit(false)
    const formData = new FormData();
    formData.append("noteId", note._id!!);
    getPhotosByNoteIdAction(null, formData).then((th) => {
      console.log("handleSelectNote data th:", th.data)
      setPhotos(th.data)
      setIsSelectedNote(true)

    })
  }

  const handleSwitchEdit = (e: any) => {
    e.preventDefault()
    if (isEdit) {
      setIsEdit(!isEdit)
      return
    } else {
      setIsEdit(true)
    }

  }

  const handleContentChange = (newContent: string) => {
    setEditorContent(newContent)
    console.log("handleContentChange newContent:", newContent)
  }


  const saveNote = (e: any) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("content", editorContent!!);
    formData.append("noteId", note?._id!!);
    formData.append("userId", userId);
    console.log("saveNote formData:", formData)
    if (isEdit) {
      updateNoteByIdAction(null, formData).then((th) => {
        console.log("saveNote updated data th:", th)
        //setIsEdit(false)
      })
    }
    if (isAddNote) {
      createNoteByUserIdAction(null, formData).then((th) => {
        console.log("saveNote created data th:", th)
        setIsAddNote(false)
      })
    }

    setIsSelectedNote(false)
  }

  const handleAddNote = (e: any) => {
    e.preventDefault()
    if (isAddNote) {
      setIsAddNote(false)
    } else {
      setIsAddNote(true)
    }


  }


  return (
    <div className=' flex flex-row gap-5'>
      <div className=' w-1/2 border-r'>
        <div className='flex justify-end h-10 mt-5 px-2'>
          <button className='bg-blue-500 rounded-md px-4 py-2 text-white' onClick={handleAddNote}>Add Note</button>
        </div>
        <div className='flex flex-col gap-5 px-2 py-2 mt-5'>
          {
            notes?.map((note) => {
              return (
                <div key={note._id} className='border px-2 py-2 cursor-pointer' onClick={(e) => handleSelectNote(e, note)}>
                  {note.content}
                </div>
              )
            })
          }
        </div>

      </div>
      <div className=' w-1/2'>
        {
          !isAddNote && note &&
          <div className=' px-2 py-2'>
            <div>
              <div className='flex gap-5 justify-between mt-3 mb-5'>
                <div className='flex gap-5'>
                  <InviteDialogButton action={createInvitationByUserIdAction} noteId={note?._id} userId={userId} users={users} />
                  <ShareButton action={createShareByUserIdAction} share={note?._id} stateShare='Note' />
                </div>

                <div className='flex gap-5'>
                  <NotePhotoDialogButton noteId={note?._id} />
                  <button className='bg-blue-500 rounded-md px-4 py-2 text-white' onClick={handleSwitchEdit}>Edit</button>
                </div>

              </div>
              {!isEdit && <p>{note.content}</p>}
              {
                isEdit &&
                <div className='h-full'>
                  <MenubarEditor editor={editor} />
                  <EditorContent editor={editor} />
                </div>

              }

              {
                isSelectedNote ?
                  (<div className={`flex flex-row gap-5 mt-5  px-2 py-2 border border-gray-300 rounded-lg `} >
                    {
                      photos && photos.map((photo) => {
                        return (
                          <div key={photo._id}>
                            <img src={photo.url} alt="" width={200} height={200} className='rounded-lg' />
                          </div>
                        )
                      })
                    }
                  </div>) : null
              }
              {
                !isAddNote && isEdit &&
                <div className='flex justify-end items-end mt-3'>
                  <button className='bg-blue-500 rounded-md px-4 py-2 text-white' onClick={saveNote}>Save</button>
                </div>
              }

            </div>
          </div>
        }
        {
          isAddNote &&
          <div className=' px-2 py-2'>
            <div className='h-full'>
              <MenubarEditor editor={editor} />
              <EditorContent editor={editor} />
            </div>
            <div className='flex justify-end items-end mt-3'>
              <button className='bg-blue-500 rounded-md px-4 py-2 text-white' onClick={saveNote}>Save</button>
            </div>
          </div>

        }
        {
          /*!isAddNote && !isEdit &&
          <div>
            <TextAreaEditor userId={userId} />
          </div>*/
        }
      </div>
    </div>
  )
}

export default GridNotes