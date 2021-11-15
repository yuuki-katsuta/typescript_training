//any できるだけ使わない
{
  let a: any = 111;
  let b: any = ['danger'];
  let c = a + b; //警告しない
  console.log(c);
}

//unknown
{
  let a: unknown = 11;
  let b = a === 11; //比較は可能
  // let c = a + 10; error
  if (typeof a === 'number') {
    let d = a + 10;
  }
  console.log(b);
}

// boolean
{
  let a: boolean = true;
  const b = true; //const の場合リテラル型
  const c: true = true;
}

// number
{
  let a = 9;
  let b: 9 = 9;
  const c = 9; // const で特定のナンバーであることを推論
  let y: number = 11;
  let d = a < b; // boolean
}

// string 可能な限り推論させる
{
  let a = '11';
  let b: String = '11';
  let c = a.slice(-1);
  const s = '!';
  let d: 'max' = 'max';
}

// object
{
  let a: object = {
    b: 'x',
  };
  // a.b error

  //オブジェクト表記リテラル
  let c: { b: number } = {
    b: 12,
  };
  let d = {
    s: 'ss',
  };
  // constをオブジェクトに使っても型を狭く議論することにはならない（ミュータブルだから）
  const f: { n: number } = {
    n: 22,
  };

  //　省略可能や予定より多くのプロパティが存在することを伝える
  let z: {
    b: number; //number型のプロパティ
    c?: string; // stringであるプロパティcをもつ可能性あり
    [key: number]: boolean; // booleanである数値プロパティを任意の数だけ持つことができる
  };
  z = {
    b: 21,
    c: '22',
    11: false,
  };
  // [key: T] インデックスシグネチャ
  // object型　フィールドは関係ない
  let r: object = {
    name: 'yuuki',
  };
  let aa: object = ['a'];
}

// type alias 型エイリアス
{
  type Age = number;
  type Person = {
    name: string;
    age: Age;
  };

  let age: Age = 11;
  let driver: Person = {
    name: 'ken',
    age: 22,
  };
  if (true) {
    type Age = boolean;
    let a: Age = true;
  }
}

// 合併　交差
{
  type Cat = { name: string; purrs: boolean };
  type Dog = { name: string; barks: boolean; wags: boolean };
  type CatAndDog = Cat & Dog; //交差
  type catOrDogOrBoth = Cat | Dog; //合併

  // 交差(両方の型をもつ)
  let y: CatAndDog = {
    // purrs: true error
    name: 'aaa',
    purrs: true,
    barks: true,
    wags: true,
  };
  //合併（CatかDogのどちらかの型、もしくは両方の型をもつ）
  let c: catOrDogOrBoth = {
    name: 'ddd',
    purrs: true,
  };
  // 返す値が　string | boolean　でどちらかになる
  const aa = (isTrue: boolean): string | boolean => {
    if (isTrue) return 'true';
    else return true;
  };
  const e = ['a', 1]; // (string | number)[]
  let ss: string[] = ['a', 'a'];
}

// タプル 固定長の配列の型定義
{
  let a: [string, string, number] = ['11', '11', 11];
  //可変長にも対応
  let z: [string, ...string[]] = ['1', '2', '3']; //少なくとも１つの要素を持つ文字列のリスト
  let f: [string, boolean?] = ['a']; //省略可能

  let r: readonly number[] = [1, 1, 1, 1, 1]; // readonly で読み取り専用
}

// enum 列挙型　ある型の取りうる値を列挙
{
  const enum Language {
    English,
    Japanese,
    Russian,
  }
  console.log(Language['English']);

  const enum F {
    Burger = 'Burger',
    Chair = 'Chair',
  }
  function flip(f: F) {
    return 'hoge';
  }
  flip(F.Burger);
}
let e = [1, false];
let s = [1];
let h = null;
