import {addNote, deleteNote, editNote} from '../database/actions/note';
import * as actionTypes from './constant';

export const doCreateNote = (data) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.CREATE_NOTE_PENDING,
    });

    try {
      const createAction = await addNote(data);

      dispatch({
        type: actionTypes.CREATE_NOTE_SUCCESS,
        createAction,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.CREATE_NOTE_FAILED,
        error,
      });
    }
  };
};

export const doUpdateNote = (id, data) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_NOTE_PENDING,
    });

    try {
      const updateAction = await editNote(id, data);

      dispatch({
        type: actionTypes.UPDATE_NOTE_SUCCESS,
        updateAction,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_NOTE_FAILED,
        error,
      });
    }
  };
};

export const doDeleteNote = (id, data) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_NOTE_PENDING,
    });

    try {
      const updateAction = await deleteNote(id);

      dispatch({
        type: actionTypes.DELETE_NOTE_SUCCESS,
        updateAction,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.DELETE_NOTE_FAILED,
        error,
      });
    }
  };
};
