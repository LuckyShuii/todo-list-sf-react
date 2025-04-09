import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import axios from 'axios';
import type { TaskType } from '@/types/taskType';
import TableHeaderComponent from '@/components/tasks/TableHeader';
import DeleteDialog from '@/components/tasks/DeleteDialog';
import CreateEditDialog from '@/components/tasks/CreateEditDialog';

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [taskToEdit, setTaskToEdit] = useState<TaskType | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    getAllTasks();
  }, []);

  const updateStatusTask = async (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].isDone = !updatedTasks[index].isDone;
    setTasks(updatedTasks);
    await handleStatusChange(updatedTasks[index].id);
  }

  const handleStatusChange = async (id: number) => {
    try {
      const response = await axios.put(`http://localhost:7002/api/task/status/${id}`);
      console.log("done", response.data);
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  }

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task: TaskType) => task.id !== id));
  }

  const getAllTasks = async () => {
    try {
      const response = await axios.get('http://localhost:7002/api/task/');
      setTasks(response.data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }

  const handleCreatedTask = (task: TaskType) => {
    setTasks([...tasks, task]);
    setTaskToEdit(null);
  }

  const handleEditTask = (task: TaskType) => {
    setTaskToEdit(task);
    setDialogOpen(true);
  }

  const handleEditedTask = (task: TaskType) => {
    const updatedTasks = tasks.map((currentTask: TaskType) => currentTask.id === task.id ? task : currentTask);
    setTasks(updatedTasks);
  }

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setTaskToEdit(null);
  }

  return <>
    <div className='flex w-full justify-end mb-8'>
      <Button className="w-[8rem] ml-2" onClick={() => setDialogOpen(true)}>Create</Button>
    </div>
    <Table>
      <TableCaption className='mt-8'>A list of your tasks - <a href="/login" className='text-blue-500 hover:underline'>log out</a></TableCaption>
      <TableHeaderComponent />
      <TableBody>
        {tasks.map((task, idx) => (
          <TableRow key={idx}>
            <TableCell><Checkbox checked={task.isDone} onClick={() => updateStatusTask(idx)} /></TableCell>
            <TableCell>{task.name}</TableCell>
            <TableCell>{task.importance}</TableCell>
            <TableCell>{task.limitDate}</TableCell>
            <TableCell>
              <Button className="w-[3.5rem]" onClick={() => handleEditTask(task)}>Edit</Button>
              <DeleteDialog task={task} handleDeleteTask={handleDeleteTask} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

    <CreateEditDialog handleCreatedTask={handleCreatedTask} taskToEdit={taskToEdit} handleCloseDialog={handleCloseDialog} dialogOpen={dialogOpen} handleEditedTask={handleEditedTask} />
  </>;
};

export default TasksPage; 
