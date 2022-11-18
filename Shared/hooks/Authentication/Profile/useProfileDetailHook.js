/* eslint-disable indent */
// import Notification from 'components/common/Notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback } from 'react';
import {
  useAuthenticationHoc,
  useQuery,
  useDashboardHoc,
  useResetState,
  useCancelAllRunningApiCalls,
} from 'Shared/hoc';
// import { setOnBoardingScreenStatus } from 'Shared/utils/token';

export default () => {
  const {
    reducerName,
    axios: authenticationAxios,
    actions: { UPDATE_PROFILE_API_CALL },
    reducerConstants: { UPDATE_PROFILE_API },
  } = useAuthenticationHoc();
  const { reducerName: dashboardReducer, axios: dashboardAxios } =
    useDashboardHoc();

  const authReset = useResetState(reducerName);
  const dashboardReset = useResetState(dashboardReducer);
  const cancelAllDashboardRunningApiCalls =
    useCancelAllRunningApiCalls(dashboardReducer);
  const cancelAllAuthenticationRunningApiCalls =
    useCancelAllRunningApiCalls(dashboardReducer);

  const onClearTokens = async () => {
    delete authenticationAxios.defaults.headers.common.Authorization;
    delete dashboardAxios.defaults.headers.common.Authorization;
    AsyncStorage.clear();
    setTimeout(() => {
      // setOnBoardingScreenStatus('true');
      AsyncStorage.multiSet([
        ['onBoardingSelection', 'true'],
        ['onBoarded', 'true'],
      ]);
    }, 10);
  };

  const onResetAndClearToken = () => {
    onClearTokens();
    authReset();
    dashboardReset();
    cancelAllDashboardRunningApiCalls();
    cancelAllAuthenticationRunningApiCalls();
  };

  const [profile, { loader }] = useQuery(reducerName, [
    {
      key: 'profile',
    },
    { key: UPDATE_PROFILE_API, requiredKey: ['loader'] },
  ]);
  const [{ selectedFlat: flatDetails }] = useQuery(dashboardReducer, [
    {
      requiredKey: ['selectedFlat'],
    },
    { key: UPDATE_PROFILE_API, requiredKey: ['loader'] },
  ]);

  const onUpdateProfile = useCallback((data, callback) => {
    UPDATE_PROFILE_API_CALL({
      request: {
        payload: data,
      },
      callback: {
        successCallback: () => {
          if (callback) callback('SUCCESS');
        },
        errorCallback: ({ isNetworkError, message }) => {
          if (isNetworkError || message)
            if (callback)
              // eslint-disable-next-line no-alert
              callback(
                'ERROR',
                typeof message === 'string' ? message : JSON.stringify(message),
              );
        },
      },
    });
  }, []);

  return {
    profile,
    onResetAndClearToken,
    onUpdateProfile,
    loader,
    flatDetails,
  };
};
