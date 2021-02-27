import React, {
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {Alert, FlatList, StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';
import {AppContainer, AppSearchForm} from '../../components';
import screenNames from '../../features/Note/navigation/screenNames';
import {DefaultTheme} from '../../theme';
import {keyExtractor, refreshControl} from '../../utils/flatlist';
import NoteItem from './components/NoteItem';
import ShimmerNoteList from './components/ShimmerNoteList';

const Screen = (props) => {
  const {navigation, notes, doGetNotes, loading} = props;
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const bootstrap = () => {
      getNotesAsync();
    };

    bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          color={DefaultTheme.colors.white}
          icon="plus"
          onPress={onAddPressed}
        />
      ),
    });
  }, [navigation, onAddPressed]);

  const getNotesAsync = () => {
    doGetNotes();
  };

  const renderItem = ({item, index}) => (
    <NoteItem
      name={item.title}
      slug={item.notes}
      onPress={loading ? null : () => onItemPressed(item)}
      onDelete={loading ? null : () => onItemDelete(item)}
    />
  );

  const onItemPressed = (item) => {
    navigation.navigate(screenNames.form, {
      mode: 'edit',
      note: item,
    });
  };

  const onItemDelete = (item) => {
    Alert.alert('Delete?', '', [
      {
        text: 'Oke',
      },
      {
        text: 'Cancel',
      },
    ]);
  };

  const onAddPressed = useCallback(() => {
    navigation.navigate(screenNames.form, {
      mode: 'add',
    });
  }, [navigation]);

  return (
    <Fragment>
      <AppSearchForm
        setSearchResult={setSearchResult}
        setSearchText={setSearchText}
        searchFields={['name', 'initial']}
        placeholder="Search Note"
        list={notes}
      />
      <AppContainer containerStyle={styles.container}>
        <FlatList
          refreshControl={refreshControl(loading, getNotesAsync)}
          data={searchText.length > 0 ? searchResult : notes}
          keyExtractor={keyExtractor('note')}
          renderItem={renderItem}
          ListHeaderComponent={loading && <ShimmerNoteList />}
        />
      </AppContainer>
    </Fragment>
  );
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: DefaultTheme.colors.surface,
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
});
