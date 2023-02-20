import { Component } from 'react';
import { WebView } from 'react-native-webview';
import { Linking, View } from 'react-native';

// Define an array of apps to be blocked
const BLOCKED_APPS = ['com.facebook.ios', 'com.twitter.android', 'com.instagram.android'];

class App extends Component {
  state = {
    showPaywall: false,
    currentApp: null,
  };

  componentDidMount() {
    // Request permission to access installed apps
    Linking.getInitialURL()
      .then(url => {
        if (url) {
          // Get the package name from the URL
          const packageName = url.replace('package:', '');
          // Check if the package name is in the list of blocked apps
          if (BLOCKED_APPS.includes(packageName)) {
            this.setState({ showPaywall: true });
          }
          this.setState({ currentApp: packageName });
        }
      })
      .catch(err => console.error('Error getting initial URL', err));
  }

  render() {
    return (
      <View>
        {this.state.showPaywall ? (
          <WebView source={{ uri: 'https://stripe.com' }} />
        ) : null}
      </View>
    );
  }
}

export default App;

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>PP PooPoo Check!!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#808080',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

