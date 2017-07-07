import ImagePicker from 'react-native-image-crop-picker';

export const openPicker = args => selectPhoto('openPicker', args);
export const openCamera = args => selectPhoto('openCamera', args);

function selectPhoto(func, opts) {
  return new Promise((resolve, reject) => {

    ImagePicker[func](opts)
      .then(resolve)
      .catch(reject);
  });
}
