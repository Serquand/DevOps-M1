import ListTask from "./ListTask";

const Category = ({ onUpdateTask, title, tasks, complete }) => {
    return (
        <div className="category">
            <h2 className="category-title">
                { title }
                <span>&nbsp;({tasks.length})</span>
            </h2>

            <ListTask 
                complete={complete}
                tasks={tasks} 
                onUpdateTask={onUpdateTask}
            />
        </div>
    );
}

export default Category