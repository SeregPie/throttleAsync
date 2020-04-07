let assert = require('assert').strict;

let throttleAsync = require('./index');

let waitAsync = function(ms) {
	return new Promise(resolve => {
		setTimeout(resolve, ms);
	});
};

(async () => {
	let run = async function(wait, trailing) {
		let d = 10;
		let f = throttleAsync(async n => {
			if (wait) {
				await waitAsync(d*8);
			}
			return n;
		}, d, trailing);
		let p = [];
		p.push(f(0));
		await waitAsync(d/4);
		p.push(f(1));
		await waitAsync(d/4);
		p.push(f(2));
		await waitAsync(d*4);
		p.push(f(3));
		await waitAsync(d/4);
		p.push(f(4));
		await waitAsync(d/4);
		p.push(f(5));
		return Promise.all(p);
	};
	{
		let r = await run(false, false);
		assert.deepEqual(r, [0, 2, 2, 3, 5, 5]);
	}
	{
		let r = await run(true, false);
		assert.deepEqual(r, [0, 5, 5, 5, 5, 5]);
	}
	{
		let r = await run(false, true);
		assert.deepEqual(r, [2, 2, 2, 5, 5, 5]);
	}
	{
		let r = await run(true, true);
		assert.deepEqual(r, [2, 2, 2, 5, 5, 5]);
	}
})();
