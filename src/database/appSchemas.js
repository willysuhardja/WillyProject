import {appSchema} from '@nozbe/watermelondb';
import {scan_items} from '../features/Scan/database/schema';

export const mainSchema = appSchema({
  version: 1,
  tables: [scan_items],
});
