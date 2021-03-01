import React, {
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {Alert, FlatList, StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';
import {AppContainer, AppListEmpty, AppSearchForm} from '../../components';
import screenNames from '../../features/Note/navigation/screenNames';
import {DefaultTheme} from '../../theme';
import {keyExtractor, refreshControl} from '../../utils/flatlist';
import NoteItem from './components/NoteItem';
import ShimmerNoteList from './components/ShimmerNoteList';

const Screen = (props) => {
  const {
    navigation,
    notes,
    doDeleteNote,
    loading,
    route: {
      params: {reset},
    },
  } = props;
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const bootstrap = () => {
      getNotesAsync();
    };

    bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (reset) {
      navigation.setParams({
        reset: false,
      });
    }
  }, [navigation, reset]);

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
    console.log(notes);
  };

  const renderItem = ({item, index}) => (
    <NoteItem
      index={index}
      title={item.title}
      content={item.notes}
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
        onPress: () => deleteNodeAction(item),
      },
      {
        text: 'Cancel',
      },
    ]);
  };

  const deleteNodeAction = (item) => {
    doDeleteNote(item.id);
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
        searchFields={['title', 'notes']}
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
          ListEmptyComponent={<AppListEmpty />}
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
