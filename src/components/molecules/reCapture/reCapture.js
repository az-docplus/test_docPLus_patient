import React from 'react';
import { View } from 'react-native';
import ConfirmGoogleCaptcha from 'react-native-google-recaptcha-v2';
const siteKey = '6LfHLHEaAAAAAH5qJxmQklSq7hJR__yj3kZGRF5H';
//const siteKey = "6Leu1IIaAAAAABqtx2DdCAgQdVDyYXx6j9kbyYaR"
const baseUrl = 'http://www.docplus.online';

class ReCaptcha extends React.Component {
  onMessage = event => {
    if (event && event.nativeEvent.data) {
      if (['cancel', 'error', 'expired'].includes(event.nativeEvent.data)) {
        this.captchaForm.hide();
        return;
      } else {
        console.log('Verified code from Google', event.nativeEvent.data);
        setTimeout(() => {
          this.captchaForm.hide();
          this.props.handleSubmit();
        }, 1500);
      }
    }
  };
  componentDidMount() {
    if (this.props.ShowReCaptcha)
      this.captchaForm.show();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(this.props, 'this.props')
    if (this.props.ShowReCaptcha)
      this.captchaForm.show();
  }
  render() {
    return (
      <View>
        <ConfirmGoogleCaptcha
          ref={_ref => this.captchaForm = _ref}
          siteKey={siteKey}
          baseUrl={baseUrl}
          languageCode='en'
          onMessage={this.onMessage}
        />
      </View>
    );
  }
}

export default ReCaptcha