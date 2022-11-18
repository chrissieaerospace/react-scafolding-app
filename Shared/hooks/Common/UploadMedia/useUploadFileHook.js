// upload file hook
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
import { useEffect, useState, useCallback } from 'react';
import { useDashboardHoc, useQuery, toPromise } from '../../../hoc';
import { DASHBOARD_BASE_URL } from '../../../utils/config';
export const useUploadFileHook = ({
  onUploadFileSuccess = () => {},
  onUploadFileError = () => {},
} = {}) => {
  const {
    reducerName,
    reducerConstants: { GENERATE_UPLOAD_URL_API },
    axios,
    actions: {
      GENERATE_UPLOAD_URL_API_CALL,
      // GENERATE_UPLOAD_URL_API_CANCEL,
      UPLOAD_URL_API_CALL,
    },
  } = useDashboardHoc();
  const [Loader, setLoader] = useState(false);
  const [File, setFile] = useState({});
  const { loader: uploadLoader } = useQuery(reducerName, {
    key: GENERATE_UPLOAD_URL_API,
    default: {},
    requiredKey: ['loader'],
    initialLoaderState: false,
  });

  useEffect(
    () => () => {
      // GENERATE_UPLOAD_URL_API_CANCEL();
    },
    [],
  );

  const handleUploadImage = useCallback(async (fileInfo = {}, type) => {
    if (type && fileInfo && fileInfo.path) {
      const _name = fileInfo.path.split('/').slice(-1)[0];
      if (typeof setFile === 'function')
        setFile({
          ...fileInfo,
          uri: fileInfo.path,
          type: fileInfo.mime,
          name: _name,
        });
    }
    try {
      const payload = {
        request: {
          payload: {
            extension: '.jpg',
          },
        },
      };
      const { data, status } = await toPromise(
        GENERATE_UPLOAD_URL_API_CALL,
        payload,
      );
      if (status === 'SUCCESS' && data.data) {
        const _payload = {
          request: {
            params: {
              url: data.data.upload_url,
            },
            axiosConfig: {
              headers: {
                'Content-Type': 'image/png',
              },
            },
            payload: fileInfo,
          },
        };
        const {
          data: uploadedData,
          status: uploadStatus,
          error,
        } = await toPromise(UPLOAD_URL_API_CALL, _payload);
        if (uploadStatus === 'SUCCESS')
          onUploadFileSuccess({
            status,
            message: '',
            data: uploadedData.data,
            imageUrl: uploadedData.data && data.data.url,
            fileInfo,
            type,
          });
        else if (uploadStatus === 'ERROR') {
          console.log(error);
        }
      } else if (status === 'ERROR') {
        onUploadFileError({ message: '', status });
      }
      console.log(status);
    } catch (e) {
      console.log(e);
    }
    if (false)
      if (type === 'video') {
        (async () => {
          try {
            if (typeof setLoader === 'function') setLoader(true);
            var formData = new FormData();
            console.log(fileInfo.path.split('/').slice(-1)[0]);
            const _name = fileInfo.path.split('/').slice(-1)[0];
            formData.append('file', {
              ...fileInfo,
              uri: fileInfo.path,
              type: fileInfo.mime,
              name: _name,
            });
            // console.log(formData, typeof fileInfo, {
            //   ...fileInfo,
            //   uri: fileInfo.path,
            //   type: fileInfo.mime,
            //   name: _name,
            // });
            // https://student-api.cartoonmango.com/api/upload/attachments
            const data = await axios.post(
              // 'https://student-api.cartoonmango.com/api/upload/video',
              `${DASHBOARD_BASE_URL}/api/upload/video`,
              formData,
              {
                headers: {
                  accept: 'application/json',
                  'content-type': 'multipart/form-data',
                },
              },
            );
            if (data.data && data.data.data && data.data.data.url) {
              onUploadFileSuccess({
                data: data.data && data.data.data,
                imageUrl: data.data && data.data.data && data.data.data.url,
                fileInfo,
                name: _name,
                type,
              });
            } else {
              onUploadFileError({
                message:
                  (data.data && data.data.message) ||
                  data.message ||
                  'something went wrong',
              });
            }
          } catch (data) {
            if (data)
              onUploadFileError({
                message:
                  (data.data && data.data.message) ||
                  data.message ||
                  'something went wrong',
              });
            console.log(data);
          } finally {
            if (typeof setLoader === 'function') setLoader(false);
            // setIsLoading(false);
          }
        })();
      } else
        GENERATE_UPLOAD_URL_API_CALL({
          request: {
            payload: {
              // image: fileInfo.data,
              // image_ext: fileInfo.mime.split('/')[1],
              // type: 'content',
              extension: '.jpg',
            },
          },
          callback: {
            successCallback({ data, message }) {
              // if (data.data && data.data.url) {
              //   setImageUrl(data.data.url);
              // }
              onUploadFileSuccess({
                message,
                data: data.data,
                imageUrl: data.data && data.data.url,
                fileInfo,
                type,
              });
            },
            errorCallback({ message }) {
              onUploadFileError({ message });
            },
          },
        });
  }, []);

  return {
    onUploadImage: handleUploadImage,
    uploadLoader,
    loader: Loader,
    file: File,
  };
};
