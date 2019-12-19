# ecma-async-loop
JavaScript / TypeScript library to help to perform asynchronous loop
> javescripeto de assinchro

[![npm version](https://badge.fury.io/js/ecma-async-loop.svg)](https://badge.fury.io/js/ecma-async-loop)
[![Npm Total Downloads](https://img.shields.io/npm/dt/ecma-async-loop.svg)](https://github.com/lordazzi/ecma-async-loop)
[![Npm Monthly Downloads](https://img.shields.io/npm/dm/ecma-async-loop.svg)](https://github.com/lordazzi/ecma-async-loop)
[![Build Status](https://travis-ci.org/lordazzi/ecma-async-loop.svg?branch=master)](https://travis-ci.org/lordazzi/ecma-async-loop)
[![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://github.com/lordazzi/ecma-async-loop/blob/documentation/LICENSE)

## The problem and the solution

You have a async function and need to loop it, but the loop structure in ecmascript do not
allow you to use "await" keywork inside a loop (you are allowed, but it does not work) 
```typescript
async function yourCustomAsyncFunction(): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 100);
  });
}

//  it does not work:
let index = 0;
while (index < 10) {
  await yourCustomAsyncFunction();
}

//  but you can do that:
asyncDoWhile({
  while: () => index < 10,
  execute: () => yourCustomAsyncFunction()
}).then(() => {
  //  loop complete
}).catch(e => {
  //  some of the functions has broken
});

//  you can create an execution queue to use in the for each method:
declare someHttpApi(importantData: number): Promise<void>;
const dataToSendToSomeApi = [ 2, 4, 2, 2, 6 ];

//  here you create an array of async functions (or functions that returns promises)
const executionQueue = dataToSendToSomeApi.map(no => {
  return () => someHttpApi(importantData);
});

asyncForEach(executionQueue).then(() => {
  //  loop complete
}).catch(e => {
  //  some of the functions has broken
});
```