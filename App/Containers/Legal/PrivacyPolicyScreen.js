import React, { Component } from 'react';

import { fetch } from '../../Firebase/remote-config';
import { download } from '../../Lib/RemoteFile';
import localFile from './privacy-policy.md';
import DocumentScreen from './DocumentScreen';

class PrivacyPolicyScreen extends Component {

  state = {
    file: null,
  }

  componentDidMount = () => {
    fetch('privacy_policy')
      .then(download)
      .then(file => this.setState({ file }))
      .catch(() => this.setState({ file: localFile }));

    console.track('viewed_privacy_policy');
  }

  render = () => {
    const { file } = this.state;

    if (!file) {
      return null;
    }

    return <DocumentScreen file={file} />;
  }

}

export default PrivacyPolicyScreen;
