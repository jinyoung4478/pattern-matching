import { match, P } from 'ts-pattern';

/**
 * example 4
 */

interface Shape {
  kind: 'circle' | 'rectangle' | 'triangle';
  radius?: number;
  width?: number;
  height?: number;
}

const calculateArea = (shape: Shape): number => {
  return match<Shape, number>(shape)
    .with({ kind: 'circle', radius: P.number }, ({ radius }) => Math.PI * Math.pow(radius, 2))
    .with(
      { kind: 'rectangle', width: P.number, height: P.number },
      ({ width, height }) => width * height
    )
    .with(
      { kind: 'triangle', width: P.number, height: P.number },
      ({ width, height }) => (width * height) / 2
    )
    .otherwise(() => 0);
};

const circle: Shape = { kind: 'circle', radius: 5 };
console.log(calculateArea(circle)); // 78.53981633974483

const rectangle: Shape = { kind: 'rectangle', width: 4, height: 6 };
console.log(calculateArea(rectangle)); // 24

const triangle: Shape = { kind: 'triangle', width: 3, height: 8 };
console.log(calculateArea(triangle)); // 12

// const invalidShape: Shape = { kind: 'square', side: 5 }; // Type Error
// console.log(calculateArea(invalidShape)); // 0
