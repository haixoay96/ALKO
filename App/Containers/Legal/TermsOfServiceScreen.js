import React, { Component } from 'react';

import { fetch } from '../../Firebase/remote-config';
import { download } from '../../Lib/RemoteFile';
import localFile from './terms-of-service.md';
import DocumentScreen from './DocumentScreen';

class TermsOfServiceScreen extends Component {

  state = {
    file: null,
  }

  componentDidMount = () => {
    fetch('terms_of_service')
      .then(download)
      .then(file => this.setState({ file }))
      .catch(() => this.setState({ file: localFile }));

    console.track('viewed_terms_of_service');
  }

  render = () => {
    const { file } = this.state;

    if (!file) {
      return null;
    }

    return <DocumentScreen file={file} />;
  }

}

export default TermsOfServiceScreen;
