import {Model, Q} from '@nozbe/watermelondb';
import {action, field} from '@nozbe/watermelondb/decorators';

export default class ScanItem extends Model {
  static table = 'scan_items';

  @field('location_id') locationId;
  @field('sku') sku;
  @field('qty_1') qty1;
  @field('qty_2') qty2;
  @field('scan_order') scanOrder;
  @field('timestamp') timestamp;

  @action async verifySku(locationId, sku) {
    const count = await this.collection
      .query(Q.and(Q.where('location_id', locationId), Q.where('sku', sku)))
      .fetchCount();

    if (count === 0) {
      return Promise.resolve(true);
    } else {
      return Promise.reject({
        message: 'SKU telah terdaftar',
      });
    }
  }

  @action async addScanItem(data) {
    return await this.collection.create((scanItemData) => {
      scanItemData.locationId = data.locationId;
      scanItemData.sku = data.sku;
      scanItemData.qty1 = data.qty1;
      scanItemData.qty2 = data.qty2;
      scanItemData.scanOrder = data.scanOrder;
      scanItemData.timestamp = data.timestamp;
    });
  }

  @action async updateQtyBatch(locationId, data) {
    return await this.database.action(async (action) => {
      const query = Q.and(Q.where('location_id', locationId));

      const scanItemList = await this.collection.query(query).fetch();

      return await this.database.batch(
        ...scanItemList.map((scanItem) => {
          scanItem.prepareUpdate((scanItemData) => {
            const dataToUpdate = data.find(
              (item) => item.id === scanItemData.id,
            );

            if (dataToUpdate) {
              scanItemData.qty1 = parseFloat(dataToUpdate.qty);
            }
          });
        }),
      );
    });
  }
}
