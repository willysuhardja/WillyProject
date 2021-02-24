import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {View} from 'react-native';
import {ProgressBar} from 'react-native-paper';

import {WebView} from 'react-native-webview';
import {AppIconButton} from '../../components';

const Screen = ({
  route: {
    params: {url},
  },
  navigation,
  theme,
}) => {
  const [title, setTitle] = useState('');
  const [progress, setProgress] = useState(0);
  const webView = useRef();

  useLayoutEffect(() => {
    console.log(typeof webView.current.goForward);
    navigation.setOptions({
      title,
      headerRight: ({tintColor}) => (
        <View style={{flexDirection: 'row'}}>
          <AppIconButton
            onPress={webView.current.goBack}
            icon="chevron-left"
            color={tintColor}
            containerStyle={{backgroundColor: theme.colors.primary}}
          />
          <AppIconButton
            onPress={webView.current.goForward}
            icon="chevron-right"
            color={tintColor}
            containerStyle={{backgroundColor: theme.colors.primary}}
          />
        </View>
      ),
    });
  }, [title, navigation, theme.colors.primary]);

  const onMessageWebView = (event) => {
    setTitle(event.nativeEvent.data);
  };

  const onLoadStart = useCallback(() => {
    setProgress(0);
  }, []);

  const onLoadProgress = useCallback(() => {
    if (progress > 90) {
      setProgress(progress + 20);
    }
  }, [progress]);

  const onLoadEnd = useCallback(() => {
    setProgress(100);
  }, []);

  return (
    <>
      <ProgressBar
        progress={progress / 100}
        color={theme.colors.accent}
        style={{backgroundColor: theme.colors.background}}
      />
      <WebView
        onLoadStart={onLoadStart}
        onLoadProgress={onLoadProgress}
        onLoadEnd={onLoadEnd}
        source={{uri: url}}
        ref={webView}
        injectedJavaScript="window.ReactNativeWebView.postMessage(document.title)"
        onMessage={onMessageWebView}
      />
    </>
  );
};

export default Screen;
