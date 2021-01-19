import React, {createContext, useContext} from 'react';
import codePush from 'react-native-code-push';

const CodePushContext = createContext({});

export const useCodePush = () => useContext(CodePushContext);

export const CodePushProvider = codePush({
  installMode: codePush.InstallMode.IMMEDIATE,
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
})(
  class extends React.Component {
    state = {
      status: null,
      progress: null,
    };

    codePushStatusDidChange(status) {
      this.setState({status});
    }

    codePushDownloadDidProgress(progress) {
      this.setState({progress: progress.receivedBytes / progress.totalBytes});
    }

    render() {
      const {status, progress} = this.state;
      return (
        <CodePushContext.Provider
          value={{
            status: status,
            progress: progress,
          }}>
          {this.props.children}
        </CodePushContext.Provider>
      );
    }
  },
);

export default CodePushProvider;
