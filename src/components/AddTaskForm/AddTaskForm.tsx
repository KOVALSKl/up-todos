import { useEffect, useState } from 'react';
import { ActionTypes, Task } from '../../types/types';
import './AddTaskForm.scss'

type AddTaskFormProps = {
    addNewTask?: (task: Task) => void;
    updateTask?: (task: Task, value: Task) => void;
    task?: Task;
}

function AddTaskForm({ addNewTask, updateTask, task }: AddTaskFormProps) {

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setDate(task.date);
            setFiles(task.files);
        }
    }, [task])

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [files, setFiles] = useState<string[]>([]);

    useEffect(() => {
        const formClick = (e: MouseEvent) => e.stopPropagation();

        const form = document.getElementById('add-task-form');
        form?.addEventListener('click', formClick);

        return () => {
            form?.removeEventListener('click', formClick);
        }
    }, [])

    return (
        <form
            className='add-task-form'
            id='add-task-form'
            onSubmit={(e) => {
                e.preventDefault();

                if (title && description && date) {
                    if (updateTask && task) {
                        updateTask(task, {
                            title,
                            description,
                            date,
                            files,
                            complete: false,
                        })
                    }
                    else if (addNewTask) {
                        addNewTask({
                            title,
                            description,
                            date,
                            files,
                            complete: false,
                        })
                        setFiles([]);
                    }
                    setTitle('');
                    setDescription('');
                    setDate('');
                } else {
                    e.stopPropagation();
                }
            }}
        >
            <div className='title-input'>
                <label htmlFor='task-title'>Title</label>
                <input
                    id='task-title'
                    name='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className='description-input'>
                <label htmlFor='task-description'>Description</label>
                <textarea
                    id='task-description'
                    name='description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className='title-input'>
                <label htmlFor='task-date'>Date</label>
                <input
                    id='task-date'
                    name='date'
                    type='date'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <div className='files-input'>
                <label htmlFor='task-files'>
                    Attached files:
                    {files.map((item, index) => {
                        return (
                            <div key={index}>{item}</div>
                        )
                    })}
                </label>
                <input
                    id='task-files'
                    name='files'
                    type='file'
                    multiple
                    onChange={(e) => {
                        let files = Object.values(e.target.files ?? {});
                        setFiles(files.map((item) => item.name))
                    }}
                />
            </div>
            <button type='submit'>
                {(updateTask && task)
                    ? 'Save'
                    : 'Create'
                }
            </button>
        </form>
    );
}

export default AddTaskForm;