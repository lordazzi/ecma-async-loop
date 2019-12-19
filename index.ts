export async function asyncDoWhile(args: {
  while: () => boolean,
  execute: () => Promise<void>
}): Promise<void> {
  await args.execute();
  if (args.while()) {
    return asyncDoWhile(args);
  }

  return Promise.resolve();
}

export async function asyncForEach(executionQueue: (() => Promise<void>)[]): Promise<void> {
  const executionQueueClone = cloneArray(executionQueue);
  const promisableFunction = executionQueueClone.shift();
  if (promisableFunction) {
    return promisableFunction().then(
      () => asyncForEach(executionQueueClone)
    ).catch(
      error => Promise.reject(error)
    );
  } else {
    return Promise.resolve();
  }
}

function cloneArray<T>(array: T[]): T[] {
  return ([] as T[]).concat(array);
}