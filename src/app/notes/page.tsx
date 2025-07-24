'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { v4 as uuidv4 } from 'uuid';

interface Note {
  id: string;
  title: string;
  content: string;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState<string | null>(null);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;

    if (editId) {
      setNotes((prev) =>
        prev.map((n) =>
          n.id === editId ? { ...n, title, content } : n
        )
      );
      setEditId(null);
    } else {
      const newNote = {
        id: uuidv4(),
        title,
        content,
      };
      setNotes((prev) => [...prev, newNote]);
    }

    setTitle('');
    setContent('');
  };

  const handleEdit = (note: Note) => {
    setEditId(note.id);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleDelete = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">📝 Notes</h1>

      <div className="space-y-2">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button onClick={handleSave}>
          {editId ? 'Update Note' : 'Add Note'}
        </Button>
      </div>

      <div className="space-y-4 pt-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="border p-4 rounded shadow-sm bg-gray-50"
          >
            <h2 className="text-lg font-semibold">{note.title}</h2>
            <p className="whitespace-pre-wrap text-sm text-gray-700">
              {note.content}
            </p>
            <div className="flex gap-2 mt-2">
              <Button
                variant="outline"
                onClick={() => handleEdit(note)}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(note.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
