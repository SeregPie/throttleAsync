import Function_noop from './core/Function/noop';
import Promise_try from './core/Promise/try';

export default function(func, delay = 0, trailing) {
	let queue = Promise.resolve();
	let enqueue = (func => {
		queue = queue.then(func).catch(Function_noop);
	});
	let currentThis;
	let currentArgs;
	let currentPromise;
	let resolveCurrentPromise;
	let invoke = (() => {
		currentPromise = null;
		let promise = Promise_try(() => func.apply(currentThis, currentArgs));
		resolveCurrentPromise(promise);
		return promise;
	});
	let wait = (() => new Promise(resolve => {
		setTimeout(resolve, delay);
	}));
	return function(...args) {
		return Promise_try(() => {
			currentThis = this;
			currentArgs = args;
			if (!currentPromise) {
				currentPromise = new Promise(resolve => {
					resolveCurrentPromise = resolve;
				});
				if (trailing) {
					enqueue(wait);
					enqueue(invoke);
				} else {
					enqueue(invoke);
					enqueue(wait);
				}
			}
			return currentPromise;
		});
	};
}
