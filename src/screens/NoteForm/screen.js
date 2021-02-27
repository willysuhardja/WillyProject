import React, {useState} from 'react';
import {AppContainer} from '../../components';
import FormNote from './components/FormNote';

export default function NoteForm({
  route: {
    params: {note},
  },
}) {
  const [defaultValue] = useState(() => note);

  return (
    <AppContainer start>
      <FormNote defaultValue={defaultValue} />
    </AppContainer>
  );
}
