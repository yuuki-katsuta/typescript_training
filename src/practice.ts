export {};

{
  // オプションパラメータ
  function log(message: string, id?: number) {
    console.log(message, id || 10);
  }
  log('aaa');
  // アノテーション不要
  function log2(message: string, id = 10) {
    console.log(message, id || 10);
  }
  // restパラメータ
  const aa = (...list: number[]) => list.map((n) => console.log(n));
  aa(1, 2, 3, 4, 5);

  // thisの型を宣言 (すべての呼び出し場所で望む値になる)
  function date(this: Date) {
    return console.log(
      `${this.getMonth() + 1}/${this.getDate()}/${this.getFullYear()}`
    );
  }
  date.call(new Date());
}
{
  //呼び出しシグネチャ (関数の型についての構文)
  type Log = (message: string, id: string) => void; // 何も返さないのでvoid型

  let log: Log = (message, id = '1') => {
    console.log(message, id);
  };

  function times(f: (index: number) => void, n: number) {
    for (let i = 0; i < n; i++) {
      f(i);
    }
  }
  times((n) => console.log(n), 4); //コールバックをインラインで宣言、明示的にアノテートされる

  type Reserve = {
    (from: Date, to: Date, destination: string): void;
    (from: Date, destination: string): void;
  };
  // let reserve: Reserve = (from, to, destination) => { } error

  let reserve: Reserve = (
    from,
    toOrDestination: Date | string,
    destination?: string
  ) => {};
}
{
  //ジェネリック
  type Filter = {
    <T>(array: T[], f: (item: T) => boolean): T[];
  };

  let filter: Filter = (array, f) => {
    let result = [];
    for (let i = 0; i < array.length; i++) {
      let item = array[i];
      if (f(item)) {
        result.push(item);
      }
    }
    return result;
  };
  filter([1, 2, 3], (n) => n > 2); // Tはnumberにバインドされる

  const map = <T, U>(array: T[], f: (item: T) => U) => {
    let result = [];
    for (let i = 0; i < array.length; i++) {
      let item = array[i];
      if (f(item)) {
        result.push(item);
      }
    }
    return result;
  };
  console.log(map([1, 2, 3], (n) => n > 2)); // Tはnumberにバインドされる
}
// ts-node src/function
