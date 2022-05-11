export {};

const myFilter = <T>(arr: T[], predicate: (elm: T) => Boolean) => {
  const result = [];
  for (const elm of arr) {
    if (predicate(elm)) {
      result.push(elm);
    }
  }
  return result;
};

// 使用例
const res = myFilter([1, 2, 3, 4, 5], (num) => num % 2 === 0);
const res2 = myFilter(['foo', 'hoge', 'bar'], (str) => str.length >= 4);

type Speed = 'slow' | 'medium' | 'fast';

function getSpeed(speed: Speed): number {
  switch (speed) {
    case 'slow':
      return 10;
    case 'medium':
      return 50;
    case 'fast':
      return 200;
  }
}

// 使用例
const slowSpeed = getSpeed('slow');
const mediumSpeed = getSpeed('medium');
const fastSpeed = getSpeed('fast');

type OptionsObject = {
  capture?: Boolean;
  once?: Boolean;
  passive?: Boolean;
};

declare function addEventListener(
  str: string,
  handler: () => void,
  options?: OptionsObject | Boolean
): void;

// 使用例
addEventListener('foobar', () => {});
addEventListener('event', () => {}, true);
addEventListener('event2', () => {}, {});
addEventListener('event3', () => {}, {
  capture: true,
  once: false,
});

// エラー例
// addEventListener('foobar', () => {}, 'string');
// addEventListener('hoge', () => {}, {
//   capture: true,
//   once: false,
//   excess: true,
// });

function giveId<T>(obj: T): T & { id: string } {
  const id = '本当はランダムがいいけどここではただの文字列';
  return {
    ...obj,
    id,
  };
}

// 使用例
const obj1: {
  id: string;
  foo: number;
} = giveId({ foo: 123 });

const obj2: {
  id: string;
  num: number;
  hoge: boolean;
} = giveId({
  num: 0,
  hoge: true,
});

// エラー例
// const obj3: {
//   id: string;
//   piyo: string;
// } = giveId({
//   foo: 'bar',
// });

// 使用例
type UpdateStateArgument<T> = T | ((old: T) => T);

declare function useState<T>(
  state: T
): [T, (updater: UpdateStateArgument<T>) => void];
// number型のステートを宣言 (numStateはnumber型)
const [numState, setNumState] = useState(0);
// setNumStateは新しい値で呼び出せる
setNumState(3);
// setNumStateは古いステートを新しいステートに変換する関数を渡すこともできる
setNumState((state) => state + 10);

// 型引数を明示することも可能
const [anotherState, setAnotherState] = useState<number | null>(null);
setAnotherState(100);

// エラー例
// setNumState('foobar');
