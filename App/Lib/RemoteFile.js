import RNFetchBlob from 'react-native-fetch-blob';

export const download = url => (
  new Promise((resolve, reject) => {
    RNFetchBlob
      .config({
        fileCache: true,
      })
      .fetch('GET', url)
      .then(res => (
        RNFetchBlob.fs.readStream(res.path(), 'utf8')
      ))
      .then((ifstream) => {
        ifstream.open();

        let data = '';
        ifstream.onData((chunk) => {
          data = chunk;
        });

        ifstream.onEnd(() => {
          resolve(data);
        });

        ifstream.onError(reject);
      })
      .catch(reject);
  })
);
