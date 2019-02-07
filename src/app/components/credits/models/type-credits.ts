import { Credits } from './credits';
import { Description } from './description';
import { Range } from './range';

export interface TypeCredits {
  credit: Credits;
  description: Description;
  ranges: Range[];
}
