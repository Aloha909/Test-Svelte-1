<script lang="ts">
    import Header from '$lib/components/header/Header.svelte' ; 
	import Task from '$lib/components/task/Task.svelte';
    import type { TaskType } from '$lib/components/task/taskType.ts';
    import './home-page.scss';

    let tasks: Array<TaskType> = $state([]);
    let nb_tasks = $derived(tasks.length);

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
            name: name,
            description: (description ? description : ""),
            finished: (finished ? finished: false),
            complexity: parseInt(complexity),
        };


        console.log(task);
        
        tasks.push(task);

        console.log(tasks.length);
        console.log(tasks);
    }

</script>

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

{#if nb_tasks>0}
    <Task name={tasks[tasks.length - 1].name} description={tasks[tasks.length - 1].description} finished={tasks[tasks.length - 1].finished} complexity={tasks[tasks.length - 1].complexity} />
{/if}
