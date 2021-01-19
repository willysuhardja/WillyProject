import React, {useEffect} from 'react';
import {axiosClient} from '../utils/axios';
import {useDispatch} from 'react-redux';
import {Alert} from 'react-native';
import {setBranch, setUserToken} from '../features/Auth/redux/actions';

const checkRequests = (Wrapped) => {
  function CheckRequests(props) {
    const dispatch = useDispatch();
    useEffect(() => {
      axiosClient.interceptors.response.use(
        function (response) {
          // Do something with response data
          return response;
        },
        function (error) {
          if (error.response) {
            switch (error.response.status) {
              case 401:
                Alert.alert(
                  'Your login session is expired, please login again',
                  '',
                  [
                    {
                      text: 'OK',
                      onPress: () => {
                        dispatch(setBranch(null));
                        dispatch(setUserToken(null));
                      },
                    },
                  ],
                );
                break;
              default:
                break;
            }
          }
          // Do something with response error
          return Promise.reject(error);
        },
      );
    });

    return <Wrapped {...props} />;
  }
  return CheckRequests;
};

export default checkRequests;
