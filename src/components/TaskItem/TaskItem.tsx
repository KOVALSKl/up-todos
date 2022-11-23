import { useEffect, useState } from 'react';
import { Task } from '../../types/types';
import AddTaskForm from '../AddTaskForm/AddTaskForm';
import './TaskItem.scss'

type TaskItemProps = {
    task: Task;
    currentDate: Date;
    onDeleteClick: (task: Task) => void;
    updateTask: (task: Task, value: Task) => void;
}

function TaskItem({ task, currentDate, onDeleteClick, updateTask }: TaskItemProps) {

    const [isEdit, setIsEdit] = useState<boolean>(false);

    function getTaskStatus(): string {
        return (task.complete)
            ? ' completed'
            : (new Date(task.date) < currentDate)
                ? ' overdue'
                : ' in-progress'
    }

    return (
        <li className="task-item"
            onSubmit={() => setIsEdit(false)}
        >
            {(isEdit)
                ? <AddTaskForm updateTask={updateTask} task={task} />
                :
                <div className='container'>
                    <div className="content">
                        <div className='title-container'>
                            <h3 className="title">
                                {task.title}
                                <span
                                    className={['status', getTaskStatus()].join(' ')}>
                                    {getTaskStatus()}
                                </span>
                                <span className='date'>{new Date(task.date).toLocaleDateString('en-EN')}</span>
                            </h3>
                            <input
                                className='complete-task-checkbox'
                                type='checkbox'
                                checked={task.complete}
                                id={`task-${task.date}`}
                                onChange={(e) => {
                                    updateTask(task, { ...task, complete: e.target.checked })
                                }}
                            />
                        </div>
                        <div className='description section'>
                            <span className='title'>Description</span>
                            <div className='body'>
                                {task.description}
                            </div>
                        </div>
                        <div className="attached-files section">
                            <span className='title'>Attached Files</span>
                            <ul>
                                {task.files.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            {item}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className='action-buttons'>
                        <button
                            className="edit"
                            onClick={() => setIsEdit(true)}
                        >
                            Edit
                        </button>
                        <button
                            className="delete"
                            onClick={(e) => onDeleteClick(task)}
                        >
                            Delete
                        </button>
                    </div>
                </div>}
        </li>
    );
}

export default TaskItem;