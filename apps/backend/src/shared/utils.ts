// Output from GPT-4
import { TransformFnParams } from 'class-transformer';

function stringToArray(value: any) {
  if (typeof value === 'string') {
    return value.split(',').map((tag: string) => tag.trim());
  }
  return value;
}

export function stringToArrayTransformer({ value }: TransformFnParams) {
  return stringToArray(value);
}
