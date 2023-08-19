/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { View, ScrollView, Dimensions,StatusBar } from "react-native";
import { Provider } from "react-redux";
import { store } from "./state-management/store";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";
import { ActivityIndicator } from "react-native";
import Navigation from "./screens/navigation/Navigation";
import { useEffect, useState, useCallback } from "react";
// import Spinner from "react-native-loading-spinner-overlay";
// import * as SplashScreen from "expo-splash-screen";
import { SafeAreaView } from "react-native";
import { Spinner } from "./components/Spinner";
const persistor = persistStore(store);
const { height } = Dimensions.get("window");
export default function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  }, []);
//   const [fontsLoaded] = useFonts({
//     CircularStd: require("./assets/fonts/CircularStdFont.otf"),
//   });
//
//   if (!fontsLoaded) {
//     return null;
//   }

  return (
    <Provider store={store}>
      <PersistGate loading={<Spinner />} persistor={persistor}>
        <StatusBar translucent={true} animated={true} style="auto" />
        <Navigation />
      </PersistGate>
    </Provider>
  );
}


/*
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';




const App = () => {
 return (
 <View>
 <Text>Hello world</Text>
 </View>
 )
}

export default App

*/
// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
//
// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;
//
// function Section({children, title}: SectionProps): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }
//
// function App(): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//
//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };
//
//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.tsx</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }
//
// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });
//
// export default App;


