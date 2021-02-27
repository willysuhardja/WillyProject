import {connect} from 'react-redux';
import {doCreateNote, doUpdateNote} from '../../features/Note/redux/actions';
import Screen from './screen';

const mapStateToProps = (state) => {
  return {
    loading: false,
    errorMessage: state.note.errorMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doAdd: (data) => dispatch(doCreateNote(data)),
    doEdit: (id, data) => dispatch(doUpdateNote(id, data)),
  };
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const NoteFormScreen = connectRedux(Screen);

export default NoteFormScreen;
