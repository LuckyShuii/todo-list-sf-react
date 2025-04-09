import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import axios from "axios"
import type { TaskType } from "@/types/taskType"

interface Props {
    task: TaskType;
    handleDeleteTask: (id: number) => void;
}

const DeleteDialog: React.FC<Props> = ({task, handleDeleteTask}) => {
    const deleteTask = async () => {
        try {
            await axios.delete(`http://localhost:7002/api/task/delete/${task.id}`);
            handleDeleteTask(task.id);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    }

    return <>
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="w-[3.5rem] ml-2" variant="destructive">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your task and remove data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteTask()}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </>
}   

export default DeleteDialog;