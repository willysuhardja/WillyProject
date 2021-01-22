import {tableSchema} from '@nozbe/watermelondb';

export const scan_items = tableSchema({
  name: 'scan_items',
  columns: [
    {name: 'location_id', type: 'number'},
    {name: 'sku', type: 'string'},
    {name: 'sku_desc', type: 'string'},
    {name: 'barcode', type: 'string'},
    {name: 'qty_1', type: 'number'},
    {name: 'qty_2', type: 'number'},
    {name: 'scan_order', type: 'number'},
    {name: 'timestamp', type: 'string'},
  ],
});
