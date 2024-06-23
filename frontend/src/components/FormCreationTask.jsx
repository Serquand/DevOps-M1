import { useState } from "react";
import axios from "axios";

const FormCreationTask = ({ onCreateTask, onCloseForm }) => {
    const API_URL = process.env.REACT_APP_API_URL;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [due_date, setDueDate] = useState(undefined);

    const createTask = async (event) => {
        event.preventDefault();
        const todo = { due_date, description, title };

        try {
            await axios.post(`${API_URL}/todos`, {...todo});

            onCreateTask();
        } catch (err) {
            console.error("Error: ", err);
        }
    };

    return (
        <form 
            onSubmit={createTask}
            className="form-create-task form"
        >   
            <div className="form-part">
                <label htmlFor="new-task-title">
                    Nom de la tâche
                </label>

                <input 
                    id="new-task-title"
                    type="text" 
                    onChange={e => setTitle(e.target.value)}
                />   
            </div>

            <div className="form-part">
                <label htmlFor="new-task-desc">
                    Description de la tâche
                </label>

                <textarea
                    id="new-task-desc"
                    type="text" 
                    onChange={e => setDescription(e.target.value)}
                />   
            </div>

            <div className="form-part form-date-container">
                <label htmlFor="new-task-date">Date</label>
                <input 
                    type="date" 
                    id="new-task-date"
                    onChange={e => setDueDate(e.target.value)} 
                />
            </div>

            <div className="form-buttons">
                <button
                    type="button"
                    onClick={onCloseForm}
                    className="form-button button button-close"
                >Annuler</button>
                
                <button
                    type="submit"
                    onClick={createTask}
                    className="form-button button button-submit-task"
                >Valider</button>
            </div>
        </form>
    );
}

export default FormCreationTask