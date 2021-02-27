import {appSchema} from '@nozbe/watermelondb';
import {notes} from '../features/Note/database/schema';

export const mainSchema = appSchema({
  version: 1,
  tables: [notes],
});
