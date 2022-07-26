export default class CustomPromise {
  public static all(): Promise<number[]> {
    console.log('promise all')
    return Promise.resolve([1,2,3]);
  }

  public static async sequence(): Promise<void> {
    console.log('promise sequence');
    await Promise.resolve();
  }
}
