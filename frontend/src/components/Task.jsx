import '../index.css';
import axios from 'axios';
import dayjs from "dayjs";

const Task = ({ title, description, dueDate, isComplete, onUpdateTask, id }) => {
    const API_URL = process.env.REACT_APP_API_URL;

    const updateTaskCompletion = async () => {
        try {
            await axios.patch(`${API_URL}/todos/complete/${id}`, {
                is_complete: !isComplete,
            });
            
            onUpdateTask();
        } catch (err) {
            console.error("Error :", err);
        }
    };

    const deleteTask = async () => {
        try {
            await axios.delete(`${API_URL}/todos/${id}`);

            onUpdateTask();
        } catch (err) {
            console.error("Error :", err);
        }
    }

    return (
        <div className='task'>
            <div className='task-info'>
                <h4 className='task-title'>{ title }</h4>
                <p className='task-date'>{ dayjs(dueDate).format("Pour le D MMM YYYY") }</p>
                <div className='task-desc-container'>
                    <p className='task-desc'>{ description }</p>
                </div>                
            </div>
        
            <div className='task-update'>
                <button onClick={updateTaskCompletion}>{ isComplete ? 'Non terminé' : 'Terminé' }</button>
        
                <button onClick={deleteTask}>Supprimer</button>
            </div>
        </div>
    )
}

export default Task;