const API_URL = 'http://localhost:3001';

let todos = [];
let done = [];
let creationTaskRunning = false;

const getTodos = async () => {
    try {
        const res = await fetch(`${API_URL}/todos`);
        const data = await res.json();
        todos = data.todos;
        done = data.done;
        render();
    } catch (err) {
        console.error(err);
    }
};

const openCreationTaskModal = () => {
    creationTaskRunning = true;
    render();
};

const endCreationTask = async () => {
    await getTodos();
    creationTaskRunning = false;
    render();
};

const setCreationTaskRunning = (value) => {
    creationTaskRunning = value;
    render();
};

const createTask = async (event) => {
    event.preventDefault();
    const todo = { due_date, description, title };
    try {
        await fetch(`${API_URL}/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        });
        endCreationTask();
    } catch (err) {
        console.error("Error: ", err);
    }
};

const setTitle = (value) => {
    title = value;
};

const setDescription = (value) => {
    description = value;
};

const setDueDate = (value) => {
    due_date = value;
};

const updateTaskCompletion = async (id) => {
    try {
        await fetch(`${API_URL}/todos/complete/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ is_complete: !isComplete })
        });
        getTodos();
    } catch (err) {
        console.error("Error :", err);
    }
};

const deleteTask = async (id) => {
    try {
        await fetch(`${API_URL}/todos/${id}`, {
            method: 'DELETE'
        });
        getTodos();
    } catch (err) {
        console.error("Error :", err);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    getTodos();
});