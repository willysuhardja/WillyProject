import {Q} from '@nozbe/watermelondb';
import moment from 'moment';
import database from '../../../../database';

const scanItemCollection = database.collections.get('scan_items');

export const verifySku = async (locationId, barcode) => {
  const count = await scanItemCollection
    .query(
      Q.and(Q.where('location_id', locationId), Q.where('barcode', barcode)),
    )
    .fetchCount();

  if (count === 0) {
    return Promise.resolve(true);
  } else {
    return Promise.reject({
      message: 'SKU telah terdaftar',
    });
  }
};

export const addScanItem = async (data) => {
  return await database.action(async (action) => {
    const lastScanItems = await scanItemCollection
      .query(
        Q.where('location_id', data.locationId),
        Q.experimentalSortBy('scan_order', Q.desc),
        Q.experimentalTake(1),
      )
      .fetch();

    let nextScanOrder = 1;

    if (lastScanItems.length > 0) {
      nextScanOrder = lastScanItems[0].scanOrder + 1;
    }

    return await scanItemCollection.create((scanItemData) => {
      scanItemData.locationId = data.locationId;
      scanItemData.sku = data.sku;
      scanItemData.skuDesc = data.skuDesc;
      scanItemData.barcode = data.barcode;
      scanItemData.qty1 = parseFloat(data.qty1);
      scanItemData.qty2 = parseFloat(data.qty2);
      scanItemData.scanOrder = nextScanOrder;
      scanItemData.timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    });
  });
};

export const updateQtyBatch = async (locationId, data) => {
  return await database.action(async (action) => {
    const query = Q.and(Q.where('location_id', locationId));

    const scanItemList = await scanItemCollection.query(query).fetch();

    await database.batch(
      ...scanItemList.map((scanItem) => {
        return scanItem.prepareUpdate((scanItemData) => {
          const dataToUpdate = data.find((item) => item.id === scanItemData.id);

          if (dataToUpdate) {
            scanItemData.qty1 = parseFloat(dataToUpdate.qty1);
          }
        });
      }),
    );
  });
};

export const getScannedList = async (locationId) => {
  return await database.action(async (action) => {
    const query = Q.and(Q.where('location_id', locationId));

    const scanItemList = await scanItemCollection.query(query).fetch();

    return scanItemList;
  });
};
