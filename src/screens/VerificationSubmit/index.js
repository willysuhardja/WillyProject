import {Q} from '@nozbe/watermelondb';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';
import {connect} from 'react-redux';
import {getLoading} from '../../features/Location/redux/getters';
import {doUpdateQtyBatch} from '../../features/Location/redux/actions';

import Screen from './screen';

const ScreenWithDatabase = withDatabase(
  withObservables(
    [],
    ({
      database,
      route: {
        params: {id: locationId},
      },
    }) => {
      return {
        localDetails: database.collections
          .get('scan_items')
          .query(Q.where('location_id', locationId))
          .observe(),
      };
    },
  )(Screen),
);

const mapStateToProps = (state) => {
  return {
    loading: getLoading(state, 'updateItems'),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doUpdateQtyBatch: (locationId, data) =>
      dispatch(doUpdateQtyBatch(locationId, data)),
  };
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const LocationListDetailEditScreen = connectRedux(ScreenWithDatabase);

export default LocationListDetailEditScreen;
