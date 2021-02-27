import {Q} from '@nozbe/watermelondb';
import moment from 'moment';
import database from '../../../../database';

const noteCollection = database.collections.get('notes');

export const addNote = async (data) => {
  return await database.action(async (action) => {
    return await noteCollection.create((noteData) => {
      noteData.title = data.title;
      noteData.notes = data.notes;

      noteData.timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    });
  });
};

export const editNote = async (id, data) => {
  return await database.action(async (action) => {
    const noteList = await noteCollection.query(Q.where('id', id)).fetch();

    const note = noteList[0];
    console.log(note);
    return await note.update((noteData) => {
      noteData.title = data.title;
      noteData.notes = data.notes;
    });
  });
};

export const deleteNote = async (id) => {
  return await database.action(async (action) => {
    const noteList = await noteCollection.query(Q.where('id', id)).fetch();

    const note = noteList[0];

    return await note.destroyPermanently();
  });
};
