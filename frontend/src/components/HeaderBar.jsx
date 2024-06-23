import '../index.css';

const HeaderBar = ({ handleClickOnCreateEvent }) => {
    return (
        <header className="header">
            <h1>DevOps M1 | Lab 2</h1>

            <button
                onClick={handleClickOnCreateEvent}
                className='button-add-task'
            >
                Add a task
            </button>
        </header>
    )
}

export default HeaderBar;