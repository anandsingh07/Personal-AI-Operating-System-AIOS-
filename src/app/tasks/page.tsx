'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { v4 as uuidv4 } from 'uuid';

interface Task {
  id: string;
  name: string;
  completed: boolean;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState('');
  const [editId, setEditId] = useState<string | null>(null);

  const handleAddOrUpdate = () => {
    if (!taskName.trim()) return;

    if (editId) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === editId ? { ...t, name: taskName } : t
        )
      );
      setEditId(null);
    } else {
      const newTask: Task = {
        id: uuidv4(),
        name: taskName,
        completed: false,
      };
      setTasks((prev) => [...prev, newTask]);
    }

    setTaskName('');
  };

  const toggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const handleEdit = (task: Task) => {
    setTaskName(task.name);
    setEditId(task.id);
  };

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">✅ Tasks</h1>

      <div className="flex gap-2">
        <Input
          placeholder="Enter task"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <Button onClick={handleAddOrUpdate}>
          {editId ? 'Update' : 'Add'}
        </Button>
      </div>

      <ul className="space-y-2 pt-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between bg-gray-50 p-3 rounded shadow-sm"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
              />
              <span className={task.completed ? 'line-through text-gray-400' : ''}>
                {task.name}
              </span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => handleEdit(task)}>
                Edit
              </Button>
              <Button variant="destructive" onClick={() => handleDelete(task.id)}>
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
