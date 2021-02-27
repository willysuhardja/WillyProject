import {connect} from 'react-redux';
import Screen from './screen';

const mapStateToProps = (state) => {
  return {
    loading: false,
    notes: [
      {
        id: 369,
        user_id: 1707,
        initial_store: 'BGR',
        notes: '',
        created_at: '2020-12-18T05:02:42.000Z',
        updated_at: '2020-12-18T05:02:42.000Z',
        title: 'Catatan Saran dari Konsumen .....',
      },
      {
        id: 368,
        user_id: 1707,
        initial_store: 'BGR',
        notes: 'Hdjskanz\nMmlll',
        created_at: '2020-12-18T05:02:07.000Z',
        updated_at: '2020-12-21T08:35:44.000Z',
        title: 'Catatan Breafing Pagi ini',
      },
    ],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doGetNotes: () => {},
  };
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const NoteListScreen = connectRedux(Screen);

export default NoteListScreen;
