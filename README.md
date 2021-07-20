# ecma-async-loop
JavaScript / TypeScript library to help to perform asynchronous loop
> javescripeto de assinchrono

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
```

it does not work:
```typescript
let index = 0;
while (index < 10) {
  await yourCustomAsyncFunction();
}
```

But you can do that:
```typescript
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


## Instalation
```sh
npm install ecma-async-loop --save
```

## Contributing

### 1. Create an issue
No one feature will be implemented without it having an open issue and without which the proposed has been accepted by the team responsible for the project. After the issue is approved, the applicant, a team member or anyone else can open a pull request associated with that issue (just paste the issue link in the pull request).

### 2. Did you find a bug?
When logging a bug, please be sure to include the following:
 * The library version;
 * If at all possible, an *isolated* way to reproduce the behavior;
 * The behavior you expect to see, and the actual behavior.

You can try to update the library to the last version to see if the bug has already been fixed.

### 3. Do not create a duplicate issue
[Search the existing issues](https://github.com/lordazzi/ecma-async-loop/search?type=Issues) before logging a new one.

Some search tips:
 * *Don't* restrict your search to only open issues. An issue with a title similar to yours may have been closed as a duplicate of one with a less-findable title.
 * Check for synonyms. For example, if your bug involves an interface, it likely also occurs with type aliases or classes.

### 4. Create a Pull Request
Follow the steps:

 * Create a [fork](https://guides.github.com/activities/forking/) from our repository by [clicking here](https://github.com/lordazzi/ecma-async-loop/fork), install [node](https://nodejs.org/), do a `git clone` of your forked repository and run `npm install` in the application folder;
 * Create a branch in your forked repository, then code the feature or fix the bug;
 * Run `npm run lint`, `npm run test` and `npm run build` in the repository;
 * Create a Pull Request from your repository to this one, with the issue in the body and some information you think could be usefull to the reviewer (print or a [gif of it working](https://www.screentogif.com/) will be appreciated);
 * The reviewer can ask some changes, don't be mad, this is the GIT Flow process;
 * You get approved and your branch with the feature / fix 