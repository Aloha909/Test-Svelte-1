<script lang="ts">
    import Header from '$lib/components/header/Header.svelte' ; 
	import Task from '$lib/components/task/Task.svelte';
    import type { TaskType } from '$lib/components/task/taskType.ts';
    import { socket } from '$lib/stores/socket';
    import './home-page.scss';

    let tasks: Array<TaskType> = $state([]);
    let filtered_tasks: Array<TaskType> = $derived(tasks)
    let id_tasks: number = 0;

    socket.on('create_task', (task: TaskType) => {
			tasks.push(task);
		});
    socket.on('delete_task', (id: number) => {
			deleteTask(id, false);
		});
    socket.on('mark_done', (id: number) => {
			markTaskDone(id, false);
		});

    function add_task(e: SubmitEvent) {
        e.preventDefault();

        console.log("ajout tache");

        let name = document.getElementById("name").value;
        let description = document.getElementById("description").value;
        let complexity = document.getElementById("complexity").value;

        if (!name || !complexity) {
            alert("Il faut entrer au moins un nom et une complexité");
            return;
        }

        let task: TaskType = {
            id: id_tasks,
            name: name,
            description: (description ? description : ""),
            finished: false,
            complexity: parseInt(complexity),
            onMarkDone: markTaskDone,
            onDelete: deleteTask,
        };

        socket.emit('create_task', { task });

        id_tasks += 1;


        console.log(task);
        
        tasks.push(task);

        console.log(tasks.length);
        console.log(tasks);
    }

    function markTaskDone(id: number, share: Boolean=true) {
        tasks.forEach(task => {
            if (task.id === id) {
                task.finished = !task.finished;
            }
        if (share) {
            socket.emit('delete_task', { id });
        }
        });
    }

    function deleteTask(id: number, share: Boolean=true) {
        tasks = tasks.filter(task => task.id !== id);
        if (share) {
            socket.emit('mark_done', { id });
        }
    }

    function filter_array() {
        let sort_type = document.getElementById("sort-menu").value;
        let filter_type = document.getElementById("filter-menu").value;

        function filter_func(task: TaskType) {return true}
        let sort_func = function(task1: TaskType, task2: TaskType) {return 0}

        switch (sort_type) {
            case "id":
                sort_func = function(task1: TaskType, task2: TaskType) {
                    return task1.id - task2.id;
                }
                break;
                case "complexity":
                sort_func = function(task1: TaskType, task2: TaskType) {
                    return task1.complexity - task2.complexity;
                }
                break;
                case "alphabetical":
                sort_func = function(task1: TaskType, task2: TaskType) {
                    return task1.name.localeCompare(task2.name);
                }
                break;
                case "done":
                sort_func = function(task1: TaskType, task2: TaskType) {
                    if (task1.finished === task2.finished) {
                        return 0;
                    } else if (task1.finished) {
                        return 1;
                    } else {
                        return -1;
                    }
                }
                break;
        
            default:
                break;
        }
        switch (filter_type) {
            case "all":
                filter_func = function(task: TaskType) {
                    return true;
                }
                break;
                case "not_done":
                filter_func = function(task: TaskType) {
                    return !task.finished;
                }
                break;
                case "done":
                filter_func = function(task: TaskType) {
                    return task.finished;
                }
                break;
        
            default:
                break;
        }
        // tasks = filter(tasks, filter_func, sort_func);
        filtered_tasks = tasks.filter(filter_func);
        filtered_tasks = filtered_tasks.sort(sort_func);

    }
    
    // /**
    //  * Returns the tasks array filtered and sorted according to the functions. The array will fist be filtered and the sorted
    //  * @param tasks The array of tasks to filter and sort
    //  * @param filter_func A function that accepts one argument (a task) and returns a boolean of whether or not it should be kept
    //  * @param sort_func A function that accepts two arguments and returns a negative value if the first argument is less than the second argument, zero if they're equal, and a positive value otherwise.
    //  */
    // function filter(tasks: Array<TaskType>, filter_func: (task: TaskType) => Boolean = (task) => true, sort_func: (a: TaskType, b: TaskType) => number = (task1, task2) => 0): Array<TaskType> {
    //     let filtered_tasks = tasks.filter(filter_func);
    //     filtered_tasks = filtered_tasks.sort(sort_func);
    //     return filtered_tasks;
    // }

</script>

<Header/> 

<form id="add-menu" onsubmit={add_task}>
    <div class="line first">
        <div>
            <label for="name">Titre</label>  
            <input type="text" id="name" name="name">
        </div>

        <div>
            <label for="complexity">Complexité</label>
            <input type="number" id="complexity" name="complexity"><br>
        </div>
    </div>

    <div class="line">
        <label for="description">Description</label>
        <input type="text" id="description" name="description">
    </div>

    <input class="submit-btn" type="submit" value="Submit">
</form>

{#if tasks.length > 0}
    <form onsubmit={filter_array}>
        <select id="sort-menu" onchange={filter_array}>
            <option value="id">Date d'ajout</option>
            <option value="complexity">Complexité</option>
            <option value="alphabetical">Alphabétique</option>
            <option value="done">Terminées</option>
        </select>
        <select id="filter-menu" onchange={filter_array}>
            <option value="all">Toutes</option>
            <option value="not_done">Pas terminées</option>
            <option value="done">Terminées</option>
        </select>
    </form>
{/if}

<div class="task-grid">
{#each filtered_tasks as task}  
    <div> 
    <Task 
        id ={task.id}  
        name={task.name} 
        description={task.description} 
        finished={task.finished} 
        complexity={task.complexity}
        onMarkDone={markTaskDone}
        onDelete={deleteTask} />
    <br>
    </div>
{/each}
</div>
