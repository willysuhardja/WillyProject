import {tableSchema} from '@nozbe/watermelondb';

export const notes = tableSchema({
  name: 'notes',
  columns: [
    {name: 'title', type: 'string'},
    {name: 'notes', type: 'string'},
    {name: 'timestamp', type: 'string'},
  ],
});
