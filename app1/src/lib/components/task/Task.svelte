<script lang="ts">
  import type { TaskType } from '$lib/components/task/taskType.ts';
  import './task.scss';

  import circleUrl from './circle.svg';
  import circleCheckedUrl from './circle-checked.svg';
	import type { MouseEventHandler } from 'svelte/elements';

  let {
    id,
		name,
		description,
		finished,
		complexity,
    onMarkDone,
	}: TaskType = $props();

</script>

<div id="component" class={finished ? "finished" : ""}>
  <div id="first-line">
    <p class="title {finished ? "finished" : ""}">{name}</p>
    <div class="complexity-wrapper" onclick={() => onMarkDone(id)}>
      {#if !finished}
        <img src="{circleUrl}" alt="cercle" class="complexity-circle" />
        <span class="complexity-value">{complexity}</span>
        <!-- <button onclick={() => onMarkDone(id)}>Terminer</button> -->
        {:else}
        <img src="{circleCheckedUrl}" alt="cercle coché" class="complexity-circle" />
        <!-- <button onclick={() => onMarkDone(id)}>Restaurer</button> -->
      {/if}
    </div>
  </div>
  <div id="description">
    {description}
  </div>
</div>
