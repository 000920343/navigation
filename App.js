import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Appearance } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import AboutScreen from './src/screens/AboutScreen';
import { MaterialIcons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

const App = () => {
  const colorScheme = Appearance.getColorScheme(); // Detect light/dark mode

  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Drawer.Navigator
        screenOptions={({ route }) => ({
          drawerIcon: ({ color, size }) => {
            let iconName = route.name === 'Home' ? 'home' : 'info';
            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="About" component={AboutScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
