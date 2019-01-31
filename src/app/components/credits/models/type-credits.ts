import { Credits } from './credits';
import {Description} from './description';

export interface TypeCredits {
  credit: Credits;
  description: Description;
  ranges: Range[];
}
