import React from 'react';
import {DataTable, Text} from 'react-native-paper';

export function LocationItem({
  sku,
  qty1 = '0',
  qty2 = '0',
  fix = 'null',
  scanOrder = null,
  description,
}) {
  return (
    <>
      <DataTable.Row style={styles.rowTop}>
        <DataTable.Cell>{sku}</DataTable.Cell>
        {scanOrder !== null && (
          <DataTable.Cell numeric style={styles.numericCell}>
            <Text style={styles.numericText}>{scanOrder}</Text>
          </DataTable.Cell>
        )}
        <DataTable.Cell numeric style={styles.numericCell}>
          <Text style={styles.numericText}>{qty1}</Text>
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row style={styles.rowBottom}>
        <DataTable.Cell>{description || 'INVALID'}</DataTable.Cell>
      </DataTable.Row>
    </>
  );
}

const styles = {
  rowTop: {borderBottomWidth: 0},
  rowBottom: {marginTop: -20},
  numericCell: {marginTop: 0},
  numericText: {fontWeight: 'bold', textDecorationLine: 'underline'},
};
