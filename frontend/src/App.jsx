import { useEffect, useState } from "react";
import axios from "axios";
import './index.css';
import HeaderBar from "./components/HeaderBar";
import FormCreationTask from "./components/FormCreationTask";
import Modal from "./components/Modal";
import Category from "./components/Category";

const Home = () => {
    const API_URL = process.env.REACT_APP_API_URL;

    const [todos, setTodos] = useState([]);
    const [done, setDone] = useState([]);
    const [creationTaskRunning, setCreationTaskRunning] = useState(false);

    const getTodos = async () => {
        try {
            const res = await axios.get(`${API_URL}/todos`);

            setTodos(res.data.todos);
            setDone(res.data.done);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const getData = async () => {
            getTodos();
        };
        getData();
    }, []); // eslint-disable-line

    const endCreationTask = async () => {
        await getTodos();
        setCreationTaskRunning(false);
    }

    const openCreationTaskModal = () => {
        setCreationTaskRunning(true);
    }

    return (
        <>
            <HeaderBar
                handleClickOnCreateEvent={openCreationTaskModal}
            />

            <main>
                {todos.length > 0 ? <Category
                    onUpdateTask={getTodos}
                    title='Tâches à faire'
                    tasks={todos}
                    complete={false}
                /> : null}

                {done.length > 0 ? <Category
                    onUpdateTask={getTodos}
                    title='Tâches réalisées'
                    tasks={done}
                    complete={true}
                /> : null}
            </main>

            {creationTaskRunning ? <Modal titleModal='Créer une tâche'>
                <FormCreationTask
                    onCreateTask={() => endCreationTask() }
                    onCloseForm={() => setCreationTaskRunning(false) }
                />
            </Modal> : null}
        </>
    );
};

export default Home;
