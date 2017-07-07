import Firestack from 'react-native-firestack';

const firestack = new Firestack();

firestack.on('debug', (msg) => {
  console.tron.display({
    name: 'Firestack Debug',
    value: msg,
    important: true,
  });
});

export default firestack;
