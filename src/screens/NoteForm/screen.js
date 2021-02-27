import React, {useState} from 'react';
import {AppContainer} from '../../components';
import screenNames from '../../features/Note/navigation/screenNames';
import FormNote from './components/FormNote';

export default function NoteForm({
  navigation,
  route: {
    params: {note, mode},
  },
  loading,
  errorMessage,
  doAdd,
  doEdit,
}) {
  const [defaultValue] = useState(() => note);

  const onSubmit = (data) => {
    const actions = mode === 'add' ? doAdd(data) : doEdit(note.id, data);

    actions.then(() => {
      navigation.navigate(screenNames.list, {
        reset: true,
      });
    });
  };

  return (
    <AppContainer start>
      <FormNote
        defaultValue={defaultValue}
        onSubmit={onSubmit}
        loading={loading}
      />
    </AppContainer>
  );
}
