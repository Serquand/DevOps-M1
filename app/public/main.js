(async () => {
    const toDoContainer = document.querySelector("#todo-list")
    const doneContainer = document.querySelector("#done-list")

    const formField = document.querySelectorAll(".form-field input")
    const modal = document.querySelector(".modal")

    let allEvents = [];
    let todos = [];
    let done = [];

    const fetchEvent = async () => {
        const filterTask = () => {
            console.log(allEvents);
            todos = allEvents.todos;
            done = allEvents.done;
        }

        allEvents = await (await fetch("http://localhost:3000/event")).json();
        filterTask();
    }

    document.querySelector(".add-event").addEventListener("click", () => modal.style.display = 'flex')

    document.querySelector("button.submit-button").addEventListener("click", async () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: formField[0].value,
                description: formField[1].value,
                due_date: formField[2].value,
            })
        }

        await fetch("http://localhost:3000/event", requestOptions)
        modal.style.display = 'none'

        await displayEvents()
    })

    const displayEvents = async () => {
        await fetchEvent();

        toDoContainer.innerHTML = '';
        doneContainer.innerHTML = '';

        todos.forEach(event => {
            toDoContainer.innerHTML += `
                <div id="${event._id}" class="task todo">
                    <p><span>Titre: </span>${event.title}</p>
                    <p><span>Description: </span>${event.description}</p>
                    <p><span>End date: </span>${event.due_date}</p>
                    <div>
                        <button class="delete-event">Delete</button>
                        <button class="update-event">Done</button>
                    </div>
                </div>
            `
        });

        done.forEach(event => {
            doneContainer.innerHTML += `
                <div id="${event._id}" class="task done">
                    <p><span>Titre: </span>${event.title}</p>
                    <p><span>Description: </span>${event.description}</p>
                    <p><span>End date: </span>${event.due_date}</p>
                    <div>
                        <button class="delete-event">Delete</button>
                        <button class="update-event">To Do</button>
                    </div>
                </div>
            `
        })

        const deleteEvent = async (el) => {
            await fetch("http://localhost:3000/event/" + el.parentNode.parentNode.id, { method: 'DELETE' });
            await displayEvents()
        }

        const updateEvent = async (el) => {
            const is_complete = el.parentNode.parentNode.classList.contains('todo');
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ is_complete })
            }
            await fetch("http://localhost:3000/event/" + el.parentNode.parentNode.id, requestOptions);
            await displayEvents()
        }

        document.querySelectorAll(".delete-event").forEach(el => el.addEventListener("click", () => deleteEvent(el)))
        document.querySelectorAll(".update-event").forEach(el => el.addEventListener("click", () => updateEvent(el)))
    }

    displayEvents()
})();