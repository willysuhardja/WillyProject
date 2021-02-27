import {store} from '../../../redux/store';
import {axiosClient} from '../../../utils/axios';
import {getProfile} from '../../AccoutManagement/redux/getters';
import * as actionTypes from './constant';

export const doGetMenu = () => {
  return async (dispatch) => {
    try {
      const user = getProfile(store.getState());

      dispatch({
        type: actionTypes.GET_MENU_PENDING,
      });

      const params = {user_id: user.id};

      const menuResponse = await axiosClient.get('/menu', {params});

      const responseData = menuResponse.data.data;

      dispatch({
        type: actionTypes.GET_MENU_SUCCESS,
        payload: responseData,
      });

      return Promise.resolve(true);
    } catch (error) {
      dispatch({
        type: actionTypes.GET_MENU_FAILED,
        error,
      });

      return Promise.reject(error.response);
    }
  };
};
