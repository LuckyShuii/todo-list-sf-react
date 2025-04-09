import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import axios from 'axios';
import type { TaskType } from '@/types/taskType';
import TableHeaderComponent from '@/components/tasks/TableHeader';

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    getAllTasks();
  }, []);

  const updateStatusTask = async (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].isDone = !updatedTasks[index].isDone;
    setTasks(updatedTasks);
    await handleStatusChange(updatedTasks[index].id);
  }

  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`http://localhost:7002/api/task/delete/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }

  const handleStatusChange = async (id: number) => {
    try {
      const response = await axios.put(`http://localhost:7002/api/task/edit/status/${id}`);
      console.log("done", response.data);
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  }

  const getAllTasks = async () => {
    try {
      const response = await axios.get('http://localhost:7002/api/task/all');
      setTasks(response.data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }

  return <>
    <div className='flex w-full justify-end mb-8'>
      <Button className="w-[8rem]">Create new task</Button>
    </div>
    <Table>
      <TableCaption className='mt-8'>A list of your tasks</TableCaption>
      <TableHeaderComponent />  
      <TableBody>
        {tasks.map((task, idx) => (
          <TableRow key={idx}>
            <TableCell><Checkbox checked={task.isDone} onClick={() => updateStatusTask(idx)} /></TableCell>
            <TableCell>{task.name}</TableCell>
            <TableCell>{task.importance}</TableCell>
            <TableCell>{task.limitDate}</TableCell>
            <TableCell>
              <Button className="w-[3.5rem]">Edit</Button>
              <Button className="w-[3.5rem] ml-2" variant='destructive' onClick={() => deleteTask(task.id)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </>;
};

export default TasksPage; 
