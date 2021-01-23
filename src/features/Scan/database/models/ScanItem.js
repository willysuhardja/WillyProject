import {Model} from '@nozbe/watermelondb';
import {field} from '@nozbe/watermelondb/decorators';

export default class ScanItem extends Model {
  static table = 'scan_items';

  @field('location_id') locationId;
  @field('sku') sku;
  @field('till_code') tillCode;
  @field('sku_desc') skuDesc;
  @field('barcode') barcode;
  @field('qty_1') qty1;
  @field('qty_2') qty2;
  @field('scan_order') scanOrder;
  @field('timestamp') timestamp;
}
