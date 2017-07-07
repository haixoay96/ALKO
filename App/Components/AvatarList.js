import React, { Component, PropTypes } from 'react';
import {
  View,
  ListView,
  Dimensions,
} from 'react-native';

import { Metrics } from '../Themes';
import styles from './Styles/AvatarListStyle';
import Avatar from './Avatar';

const { width } = Dimensions.get('window');

export default class AvatarList extends Component {

  static propTypes = {
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    users: PropTypes.object,
    columns: PropTypes.number,
    columnPadding: PropTypes.number,
    iconOnly: PropTypes.bool,
  }

  static defaultProps = {
    columns: 3,
    columnPadding: 15,
  }


  render() {
    const { users, columns, columnPadding, style, iconOnly } = this.props;
    // eslint-disable-next-line
    const avatarWidth = (width - Metrics.doubleBaseMargin * 2) / columns - columnPadding * 2;
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    if (!users) {
      return null;
    }

    return (
      <ListView
        enableEmptySections
        contentContainerStyle={[styles.list, style]}
        dataSource={ds.cloneWithRows(users)}
        renderRow={user =>
          <View style={[styles.avatarContainer, { padding: columnPadding }]}>
            {(user.photoURL && !iconOnly) ? (
              <Avatar
                image={{ uri: user.photoURL }}
                width={avatarWidth}
                height={avatarWidth - 15}
                name={user.firstName}
                // message={user.message}
                // messagesRead={user.messagesRead}
                onPress={user.message ? this.onShowMessage : null}
                disabled={!user.arrived_at}
              />
            ) : (
              <Avatar icon={user.icon} width={avatarWidth} disabled={!user.arrived} name={user.firstName} />
            )}
          </View>
        }
      />
    );
  }
}
