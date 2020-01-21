import React from 'react';
import { StyleSheet, Text, Dimensions, Platform } from 'react-native';
import { View } from 'react-native-animatable';
import PropTypes from 'prop-types';
import { GiftedChat } from 'react-native-gifted-chat';
import NavigationBar from './NavigationBar';

const { height, width } = Dimensions.get('window');
const totalSize = num => (Math.sqrt((height * height) + (width * width)) * num) / 100;

export default class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.renderFooter = this.renderFooter.bind(this);
  }

  handleSend = (messages) => {
    this.props.handleSendMessage(messages[0].text)
  };

  closeChat = () => {
    this.props.closeChat();
  };

  renderFooter = () => {
    if (this.props.isTyping) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            Agent is typing...
          </Text>
        </View>
      );
    }
    return null;
  };

  render() {
    if (this.props.isChatOn) {
      return (
        <View
          animation="fadeInUp"
          style={styles.container}
          ref={(ref) => { this.chat = ref; }}
        >
          <NavigationBar chatTitle={this.props.chatTitle} closeChat={this.closeChat} />
          { this.props.connectionState !== 'connected' && <Text style={styles.connectionStatus}>Reconnecting...</Text> }
          {this.props.headerText && <Text style={styles.status}>{ this.props.headerText }</Text> }
          <GiftedChat
            inverted={false}
            messages={this.props.messages}
            scrollToBottom
            renderFooter={this.renderFooter}
            onSend={this.handleSend}
            onInputTextChanged={this.props.onInputChange}
            user={this.props.customer}
            isTyping={this.props.isTyping}
            onQuickReply={this.props.onQuickReply}
            disableComposer={this.props.disableComposer}
            showAvatarForEveryMessage={false}
            {...this.props}
          />
        </View>
      );
    }
    return null;
  }
}

Chat.propTypes = {
  license: PropTypes.string.isRequired,
  chatTitle: PropTypes.string.isRequired,
  closeChat: PropTypes.func.isRequired,
  isChatOn: PropTypes.bool.isRequired,
  greeting: PropTypes.string.isRequired,
  noAgents: PropTypes.string.isRequired,
  messages: PropTypes.array.isRequired,
  customer: PropTypes.object,
  onInputChange: PropTypes.func.isRequired,
  isTyping: PropTypes.bool.isRequired,
  connectionState: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  hide: {
    width: 0,
    height: 0,
    position: 'absolute',
  },
  container: {
    width,
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  navigation: {
    flex: 1,
  },
  systemMessage: {
    backgroundColor: '#fff',
    alignSelf: 'center',
  },
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
  status: {
    textAlign: 'center',
    fontSize: totalSize(2.1),
    fontWeight: '500',
    color: '#444',
    padding: 5,
  },
  connectionStatus: {
    textAlign: 'center',
    fontWeight: '500',
    color: '#000',
    backgroundColor: '#edbe25',
    padding: 10,
  }
});
