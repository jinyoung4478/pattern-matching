import { match, P } from 'ts-pattern';

/**
 * example 3
 */

const sanitize = (name: string) =>
  match(name)
    .with('text', 'span', 'p', () => 'text')
    .with('btn', 'button', () => 'button')
    .otherwise(() => name);

const test1 = sanitize('span');
console.log(test1);

const test2 = sanitize('p');
console.log(test2);

const test3 = sanitize('button');
console.log(test3);
