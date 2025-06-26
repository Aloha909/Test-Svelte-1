<script lang="ts">
  import type { Task } from '$lib/components/task/taskType.ts';

  let {
		name,
		description,
		finished,
		complexity,
	}: Task = $props();

</script>

<div id="component">
  <div id="first-line">
    <p class="title">{name}</p>
    <p>{complexity}</p>
  </div>
  <div id="description">
    {description}
  </div>
</div>
