export async function retry(fn: () => Promise<any>, attempts = 3, delay = 500) {
  let lastError;

  for (let i = 1; i <= attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      await new Promise(res => setTimeout(res, delay * i));
    }
  }

  throw lastError;
}
