<script lang="ts">
    import Header from '$lib/components/header/Header.svelte' ; 
	import Task from '$lib/components/task/Task.svelte';
    import type { TaskType } from '$lib/components/task/taskType.ts';
    import './home-page.scss';

    let tasks: Array<TaskType> = $state([]);
    let nb_tasks = $derived(tasks.length);
    let id_tasks: number = 0;
    let counterDisplay: number = 0 ; 

    function add_task(e: SubmitEvent) {
        e.preventDefault();

        console.log("ajout tache");

        let name = document.getElementById("name").value;
        let description = document.getElementById("description").value;
        let finished = document.getElementById("state").checked;
        let complexity = document.getElementById("complexity").value;

        if (!name || !complexity) {
            alert("Il faut entrer au moins un nom et une complexité");
            return;
        }

        let task: TaskType = {
            id: id_tasks,
            name: name,
            description: (description ? description : ""),
            finished: (finished ? finished: false),
            complexity: parseInt(complexity),
            onMarkDone: markTaskDone,
            onDelete: deleteTask,
        };

        id_tasks += 1;


        console.log(task);
        
        tasks.push(task);

        console.log(tasks.length);
        console.log(tasks);
    }

    function markTaskDone(id: number) {
        tasks.forEach(task => {
            if (task.id === id) {
                task.finished = !task.finished;
            }
        });
    }

    function deleteTask(id: number) {
        tasks = tasks.filter(task => task.id !== id);
    }

    
    function openNav() {
    document.getElementById("mySidepanel").style.width = "250px";
    }

    
    function closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
    } 

    

</script>

<!-- open button du panel-->
<button class="openbtn" onclick= {openNav} >&#9776; Menu</button>  

<Header/> 

<p>Nombre de taches : {nb_tasks}</p>

<form onsubmit={add_task}>
    <div>
    <label for="name">Titre</label>  
    <input type="text" id="name" name="name">
    </div> <br> 

    <div>
    <label for="description">Description</label>
    <input type="text" id="description" name="description">
    </div> <br> 

    <div>
    <label for="state">Terminée ? </label>
    <input type="checkbox" id="state" name="state" value="finished"><br>
    </div> <br>

    <div>
    <label for="complexity">Complexité</label>
    <input type="number" id="complexity" name="complexity"><br>
    </div> <br>

    <input type="submit" value="Submit">
</form>

<div class="task-grid">
{#each tasks as task}  
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

<!-- Sidebar -->
<div id = "mySidepanel" class="sidebar">
    <h2> ToDO App </h2>
    <a href="javascript:void(0)" class="closebtn" onclick={closeNav} >&times;</a>
    <br> 
    <h3>Filtrer mes tâches : </h3>
    <div>
    <label for="complexity">Complexité</label>
    <input type="number" id="complexity" name="complexity"><br>
    </div> <br> 

    <button>
      Filtrer
    </button>
    
</div>




