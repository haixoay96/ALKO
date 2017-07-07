import React from 'react';
import { View, ScrollView } from 'react-native';
import Markdown, { parseFile } from '../../Components/Markdown';
import { download } from '../../Lib/RemoteFile';

import styles from '../Styles/SponsoredScreenStyle';

export default class SponsoredScreen extends React.Component {

  static propTypes = {
    bar: React.PropTypes.object.isRequired,
  }

  state = {
    file: null,
  }

  componentDidMount = () => {
    const { event } = this.props.bar;
    download(event.content)
      .then((file) => {
        this.setState({
          file: parseFile(file),
        });
      });
  }

  render() {
    const { file } = this.state;

    if (!file) { return null; }

    return (
      <View style={styles.mainContainer}>
        <ScrollView>
          <Markdown content={file.content} style={styles} />
        </ScrollView>
      </View>
    );
  }

}
