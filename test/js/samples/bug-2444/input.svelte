<script>
	let todos = [
		{ done: true, text: 'this thing' },
		{ done: true, text: 'that thing' },
		{ done: false, text: 'another thing' }
	];
	
	let hideDone = false;
	
	$: done = todos.filter(t => t.done);
	
	$: filtered = hideDone
		? todos.filter(t => !t.done)
		: todos;
</script>

<label>
	<input type="checkbox" bind:checked={hideDone}>
	hide done
</label>

<hr>

{#each filtered as todo}
	<label class:done={todo.done}>
		<input type="checkbox" bind:checked={todo.done}>
		{todo.text}
	</label>
{/each}

<p>completed {done.length} of {todos.length}</p>