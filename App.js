import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ImageScreen from './screens/ImageScreen';
import AudioScreen from './screens/AudioScreen';
import VideoScreen from './screens/VideoScreen';




export default function App() {
  const Stack = createNativeStackNavigator();


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ImageScreen">
        <Stack.Screen name="ImageScreen" component={ImageScreen} options={{ title: 'Image Screen' }} />
        <Stack.Screen name="AudioScreen" component={AudioScreen} options={{ title: 'Audio Screen' }} />
        <Stack.Screen name="VideoScreen" component={VideoScreen} options={{ title: 'Video Screen' }} />
        {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

