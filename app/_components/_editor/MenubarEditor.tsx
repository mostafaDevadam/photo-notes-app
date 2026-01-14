"use client";

import { Bold, Heading1, Italic, List, Redo, Undo } from 'lucide-react';
import React from 'react'


const MenubarEditor = ({ editor }: any) => {
  if (!editor) return null

  return (
    <div className="border border-gray-300 rounded-md p-2 mb-4 bg-gray-50">
      <div className="flex space-x-1">
        {/* Bold Button with Icon */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded transition-colors ${
            editor.isActive('bold') ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'
          }`}
          title="Bold" // NEW: Tooltip for accessibility
        >
          <Bold className="h-4 w-4" />
        </button>
        {/* Italic Button with Icon */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded transition-colors ${
            editor.isActive('italic') ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'
          }`}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </button>
        {/* Heading 1 Button with Icon */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded transition-colors ${
            editor.isActive('heading', { level: 1 }) ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'
          }`}
          title="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
        </button>
        {/* Bullet List Button with Icon */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded transition-colors ${
            editor.isActive('bulletList') ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'
          }`}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </button>
        {/* NEW: Undo Button */}
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className={`p-2 rounded transition-colors ${
            editor.can().undo() ? 'text-gray-700 hover:bg-gray-200' : 'text-gray-400 cursor-not-allowed'
          }`}
          disabled={!editor.can().undo()}
          title="Undo"
        >
          <Undo className="h-4 w-4" />
        </button>
        {/* NEW: Redo Button */}
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className={`p-2 rounded transition-colors ${
            editor.can().redo() ? 'text-gray-700 hover:bg-gray-200' : 'text-gray-400 cursor-not-allowed'
          }`}
          disabled={!editor.can().redo()}
          title="Redo"
        >
          <Redo className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default MenubarEditor
