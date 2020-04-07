# throttleAsync

`throttleAsync(func, delay = 0, trailing = false)`

Creates a throttled function.

| argument | description |
| ---: | :--- |
| `func` | A function to throttle. |
| `delay` | A number as the delay. |
| `trailing` | If `true`, the function is invoked on the trailing edge of the delay. |

Returns a new function.

## setup

### npm

```shell
npm install @seregpie/throttle-async
```

### ES module

```javascript
import throttleAsync from '@seregpie/throttle-async';
```

### Node

```javascript
let throttleAsync = require('@seregpie/throttle-async');
```

### browser

```html
<script src="https://unpkg.com/@seregpie/throttle-async"></script>
```

The function is globally available as `throttleAsync`.

## usage

```javascript
let throttled = throttleAsync(async n => {
  await new Promise(resolve => {
    setTimeout(resolve, 2000);
  });
  return n;
}, 1000);
let p0 = throttled(0);
let p1 = throttled(1);
let p2 = throttled(2);
await new Promise(resolve => {
  setTimeout(resolve, 3000);
});
let p3 = throttled(3);
let p4 = throttled(4);
let p5 = throttled(5);
let r = await Promise.all([p0, p1, p2, p3, p4, p5]);
// => [0, 2, 2, 3, 5, 5]
```
