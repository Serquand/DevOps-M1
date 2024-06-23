import Task from "./Task";

const ListTask = ({ onUpdateTask, complete, tasks }) => {
    return (
        <div className="list-tasks-container">
            {tasks.map((task) => (
                <Task 
                    title={task.title}
                    description={task.description}
                    dueDate={task.due_date}
                    isComplete={complete}
                    onUpdateTask={onUpdateTask}
                    id={task._id}
                    key={task._id}
                />
            ))}
        </div>
    );
}

export default ListTask