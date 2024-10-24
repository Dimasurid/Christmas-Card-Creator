import React, { useState } from 'react';
import { CheckSquare, Save } from 'lucide-react';

const Day23Game = ({ onSave, initialState }) => {
  const [tasks, setTasks] = useState(initialState?.tasks || [
    { id: 1, text: 'Wrap presents', completed: false },
    { id: 2, text: 'Prepare Christmas Eve dinner', completed: false },
    { id: 3, text: 'Set out cookies for Santa', completed: false },
    { id: 4, text: 'Hang stockings', completed: false },
    { id: 5, text: 'Track Santa on NORAD', completed: false },
  ]);

  const [newTask, setNewTask] = useState('');

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleSave = () => {
    onSave({ tasks });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center">Christmas Eve Preparations Checklist</h3>
      <form onSubmit={addTask} className="flex space-x-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="flex-grow p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
      </form>
      <ul className="space-y-2">
        {tasks.map(task => (
          <li key={task.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              className="form-checkbox h-5 w-5 text-green-600"
            />
            <span className={task.completed ? 'line-through text-gray-500' : ''}>{task.text}</span>
          </li>
        ))}
      </ul>
      <div className="text-center">
        <p className="font-bold">
          {tasks.filter(task => task.completed).length} / {tasks.length} tasks completed
        </p>
      </div>
      <button 
        onClick={handleSave} 
        className="bg-red-500 text-white px-4 py-2 rounded w-full flex items-center justify-center"
      >
        <CheckSquare className="mr-2" size={20} />
        Save Checklist
      </button>
    </div>
  );
};

export default Day23Game;