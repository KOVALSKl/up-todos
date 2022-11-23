import { Task } from '../../types/types';
import TaskItem from '../TaskItem/TaskItem';
import './TasksList.scss'

type TasksListProps = {
    list: Task[];
    onDeleteClick: (task: Task) => void;
    updateTask: (task: Task, value: Task) => void;
}

function TasksList({ list, onDeleteClick, updateTask }: TasksListProps) {

    const currentDate = new Date();

    return (
        <ul className='task-list'>
            {(list.length === 0)
                ? 'There is no task here'
                : list.map((item, index) => {
                    return (
                        <TaskItem
                            task={item}
                            currentDate={currentDate}
                            key={index}
                            onDeleteClick={onDeleteClick}
                            updateTask={updateTask}
                        />
                    )
                })}
        </ul>
    );
}

export default TasksList;