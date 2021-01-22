import React from 'react';
import {DataTable} from 'react-native-paper';
import {AppTextInput} from '../../../components';

export function LocationItem({
  id,
  sku,
  qty1,
  description,
  onQtyChange,
  qtyValue = qty1.toString(),
}) {
  return (
    <>
      <DataTable.Row style={styles.rowTop}>
        <DataTable.Cell>{sku}</DataTable.Cell>
        <DataTable.Cell numeric style={styles.numericCell}>
          <AppTextInput
            value={qtyValue}
            keyboardType="numeric"
            maxLength={6}
            inputStyle={[styles.numericCell, {marginBottom: 5}]}
            onChangeText={(text) => {
              onQtyChange(text, id);
            }}
          />
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
  numericCell: {width: 90},
};
