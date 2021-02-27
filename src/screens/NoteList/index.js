import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';
import {connect} from 'react-redux';
import {doDeleteNote} from '../../features/Note/redux/actions';
import Screen from './screen';

const mapStateToProps = (state) => {
  return {
    loading: false,
  };
};

const ScreenWithDatabase = withDatabase(
  withObservables([], ({database}) => {
    return {
      notes: database.collections.get('notes').query().observe(),
    };
  })(Screen),
);

const mapDispatchToProps = (dispatch) => {
  return {
    doGetNotes: () => {},
    doDeleteNote: (id) => dispatch(doDeleteNote(id)),
  };
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const NoteListScreen = connectRedux(ScreenWithDatabase);

export default NoteListScreen;
