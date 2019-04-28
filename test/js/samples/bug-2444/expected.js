/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	append,
	attr,
	destroy_each,
	detach,
	element,
	init,
	insert,
	listen,
	noop,
	safe_not_equal,
	set_data,
	space,
	text,
	toggle_class
} from "svelte/internal";

function get_each_context(ctx, list, i) {
	const child_ctx = Object.create(ctx);
	child_ctx.todo = list[i];
	child_ctx.each_value = list;
	child_ctx.todo_index = i;
	return child_ctx;
}

// (24:0) {#each filtered as todo}
function create_each_block(ctx) {
	var label, input, t0, t1_value = ctx.todo.text, t1, dispose;

	function input_change_handler_1() {
		ctx.input_change_handler_1.call(input, ctx);
	}

	return {
		c() {
			label = element("label");
			input = element("input");
			t0 = space();
			t1 = text(t1_value);
			attr(input, "type", "checkbox");
			toggle_class(label, "done", ctx.todo.done);
			dispose = listen(input, "change", input_change_handler_1);
		},

		m(target, anchor) {
			insert(target, label, anchor);
			append(label, input);

			input.checked = ctx.todo.done;

			append(label, t0);
			append(label, t1);
		},

		p(changed, new_ctx) {
			ctx = new_ctx;
			if (changed.filtered) input.checked = ctx.todo.done;

			if ((changed.filtered) && t1_value !== (t1_value = ctx.todo.text)) {
				set_data(t1, t1_value);
			}

			if (changed.filtered) {
				toggle_class(label, "done", ctx.todo.done);
			}
		},

		d(detaching) {
			if (detaching) {
				detach(label);
			}

			dispose();
		}
	};
}

function create_fragment(ctx) {
	var label, input, t0, t1, hr, t2, t3, p, t4, t5_value = ctx.done.length, t5, t6, t7_value = ctx.todos.length, t7, dispose;

	var each_value = ctx.filtered;

	var each_blocks = [];

	for (var i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	return {
		c() {
			label = element("label");
			input = element("input");
			t0 = text("\r\n\thide done");
			t1 = space();
			hr = element("hr");
			t2 = space();

			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t3 = space();
			p = element("p");
			t4 = text("completed ");
			t5 = text(t5_value);
			t6 = text(" of ");
			t7 = text(t7_value);
			attr(input, "type", "checkbox");
			dispose = listen(input, "change", ctx.input_change_handler);
		},

		m(target, anchor) {
			insert(target, label, anchor);
			append(label, input);

			input.checked = ctx.hideDone;

			append(label, t0);
			insert(target, t1, anchor);
			insert(target, hr, anchor);
			insert(target, t2, anchor);

			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert(target, t3, anchor);
			insert(target, p, anchor);
			append(p, t4);
			append(p, t5);
			append(p, t6);
			append(p, t7);
		},

		p(changed, ctx) {
			if (changed.hideDone) input.checked = ctx.hideDone;

			if (changed.filtered) {
				each_value = ctx.filtered;

				for (var i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(changed, child_ctx);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(t3.parentNode, t3);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}
				each_blocks.length = each_value.length;
			}

			if ((changed.done) && t5_value !== (t5_value = ctx.done.length)) {
				set_data(t5, t5_value);
			}
		},

		i: noop,
		o: noop,

		d(detaching) {
			if (detaching) {
				detach(label);
				detach(t1);
				detach(hr);
				detach(t2);
			}

			destroy_each(each_blocks, detaching);

			if (detaching) {
				detach(t3);
				detach(p);
			}

			dispose();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let todos = [
		{ done: true, text: 'this thing' },
		{ done: true, text: 'that thing' },
		{ done: false, text: 'another thing' }
	];
	
	let hideDone = false;

	function input_change_handler() {
		hideDone = this.checked;
		$$invalidate('hideDone', hideDone);
	}

	function input_change_handler_1({ todo, each_value, todo_index }) {
		each_value[todo_index].done = this.checked;
		$$invalidate('hideDone', hideDone), $$invalidate('todos', todos), $$invalidate('filtered', filtered);
	}

	let done, filtered;
	$$self.$$.update = ($$dirty = { todos: 1, hideDone: 1 }) => {
		if ($$dirty.todos) { $$invalidate('done', done = todos.filter(t => t.done)); }
		if ($$dirty.hideDone || $$dirty.todos) { $$invalidate('filtered', filtered = hideDone
				? todos.filter(t => !t.done)
				: todos); }
	};

	return {
		todos,
		hideDone,
		done,
		filtered,
		input_change_handler,
		input_change_handler_1
	};
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, []);
	}
}

export default Component;