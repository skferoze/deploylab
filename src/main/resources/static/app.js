const API_URL = "/api/tasks";


const taskForm = document.getElementById("taskForm");

const titleInput = document.getElementById("title");

const descriptionInput = document.getElementById("description");

const taskList = document.getElementById("taskList");

const refreshButton = document.getElementById("refreshButton");



async function loadTasks() {

    try {

        const response = await fetch(API_URL);


        if (!response.ok) {

            throw new Error("Failed to load tasks");

        }


        const tasks = await response.json();


        displayTasks(tasks);


    } catch (error) {

        console.error(error);

        taskList.innerHTML = "<p>Could not load tasks.</p>";

    }

}



function displayTasks(tasks) {

    taskList.innerHTML = "";


    if (tasks.length === 0) {

        taskList.innerHTML =
            '<p class="empty-message">No tasks yet. Add your first task.</p>';

        return;

    }


    tasks.forEach(task => {

        const taskElement = document.createElement("div");


        taskElement.className =
            task.completed
                ? "task completed"
                : "task";


        const title = document.createElement("h3");

        title.textContent = task.title;


        const description = document.createElement("p");

        description.textContent =
            task.description || "No description";


        const status = document.createElement("p");

        status.textContent =
            task.completed
                ? "Status: Completed"
                : "Status: Pending";


        const actions = document.createElement("div");

        actions.className = "task-actions";



        if (!task.completed) {

            const completeButton =
                document.createElement("button");


            completeButton.textContent = "Complete";

            completeButton.className = "complete-button";


            completeButton.addEventListener(
                "click",
                () => completeTask(task.id)
            );


            actions.appendChild(completeButton);

        }



        const deleteButton =
            document.createElement("button");


        deleteButton.textContent = "Delete";

        deleteButton.className = "delete-button";


        deleteButton.addEventListener(
            "click",
            () => deleteTask(task.id)
        );


        actions.appendChild(deleteButton);



        taskElement.appendChild(title);

        taskElement.appendChild(description);

        taskElement.appendChild(status);

        taskElement.appendChild(actions);


        taskList.appendChild(taskElement);

    });

}



taskForm.addEventListener("submit", async function(event) {

    event.preventDefault();


    const task = {

        title: titleInput.value.trim(),

        description: descriptionInput.value.trim(),

        completed: false

    };


    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(task)

        });



        if (!response.ok) {

            throw new Error("Failed to create task");

        }



        taskForm.reset();


        await loadTasks();


    } catch (error) {

        console.error(error);

        alert("Could not create task.");

    }

});



async function completeTask(id) {

    try {

        const response = await fetch(

            `${API_URL}/${id}/complete`,

            {
                method: "PUT"
            }

        );


        if (!response.ok) {

            throw new Error("Failed to complete task");

        }


        await loadTasks();


    } catch (error) {

        console.error(error);

        alert("Could not complete task.");

    }

}



async function deleteTask(id) {

    try {

        const response = await fetch(

            `${API_URL}/${id}`,

            {
                method: "DELETE"
            }

        );


        if (!response.ok) {

            throw new Error("Failed to delete task");

        }


        await loadTasks();


    } catch (error) {

        console.error(error);

        alert("Could not delete task.");

    }

}



refreshButton.addEventListener(
    "click",
    loadTasks
);



loadTasks();