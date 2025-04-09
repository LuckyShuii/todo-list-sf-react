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
import axios from "axios"
import type { TaskType } from "@/types/taskType"
import { useForm } from 'react-hook-form';
import { FormField } from "../ui/form";
import { Input } from "../ui/input";
import { useEffect } from "react";

interface Props {
    handleCreatedTask: (task: TaskType) => void;
    taskToEdit: TaskType | null;
    handleCloseDialog: () => void;
    dialogOpen: boolean;
    handleEditedTask: (task: TaskType) => void;
}

interface FormData extends Omit<TaskType, 'id'> {
    id?: number;
}

const CreateEditDialog: React.FC<Props> = ({handleCreatedTask, taskToEdit, handleCloseDialog, dialogOpen, handleEditedTask}) => {
    useEffect(() => {
        form.setValue("name", taskToEdit?.name ?? '');
        form.setValue("importance", taskToEdit?.importance ?? '');
        form.setValue("isDone", taskToEdit?.isDone ?? false);
        form.setValue("limitDate", taskToEdit?.limitDate ?? '2025-04-09 13:43:41');
        form.setValue("userId", taskToEdit?.userId ?? 1);
        form.setValue("id", taskToEdit?.id ?? undefined);
    }, [taskToEdit]);

    const form = useForm<FormData>({
        defaultValues: {
            name: "",
            importance: "",
            isDone: false,
            limitDate: "2025-04-09 13:43:41",
            userId: 1,
            id: undefined,
        },
    });

    const onSubmit = async () => {
        try {
            const {id, ...formData} = form.getValues();

            if (taskToEdit) {
                await editTask({ ...formData, id });
            } else {
                await createTask(formData);
            }

            handleCloseDialog();
            form.reset();
        } catch (error) {
            console.error('Error creating task:', error);
        }
    }

    const editTask = async (task: FormData) => {
        const response = (await axios.put(`http://localhost:7002/api/task/`, { task: task })).data;

        handleEditedTask(response.task);
    }

    const createTask = async (task: FormData) => {
        const response = (await axios.post(`http://localhost:7002/api/task/`, { task: task })).data;

        handleCreatedTask(response.task);
    }

    const title = taskToEdit ? "Edit Task" : "Create Task";

    return <>
        <AlertDialog open={dialogOpen}>
            <AlertDialogTrigger asChild>

            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="mb-4">{title}</AlertDialogTitle>
                    <AlertDialogDescription className="flex flex-col gap-4 mb-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <Input placeholder="name" {...field} />
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="importance"
                            render={({ field }) => (
                                <Input placeholder="importance" {...field} />
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="limitDate"
                            render={({ field }) => (
                                <Input placeholder="limit date" {...field} />
                            )}
                        />
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => handleCloseDialog()}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={form.handleSubmit(onSubmit)}>{ taskToEdit ? 'Edit' : 'Create' }</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </>
}   

export default CreateEditDialog;