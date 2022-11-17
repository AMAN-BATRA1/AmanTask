import React from 'react';
import { useColorScheme } from "react-native"
import { NavigationContainer, DefaultTheme, DarkTheme, createNavigationContainerRef } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import RestaurantsList from './container/restaurantsList';
import MapViewScreen from './container/MapView';
import MapDirection from './container/MapDirection';
import Mpgs from './container/Mpgs';
import MpgsVardView from './container/MpgscardView';
import MpgsVardViewNew from './container/mpgsnew';


const App = () => {

    const Stack = createNativeStackNavigator();





    const AuthStack = () => {
        return (
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName="MpgsVardView">
                <Stack.Screen name="RestaurantsList" component={RestaurantsList} />
                <Stack.Screen name="MapViewScreen" component={MapViewScreen} />
                <Stack.Screen name="MapDirection" component={MapDirection} />
                <Stack.Screen name="Mpgs" component={Mpgs} />
                <Stack.Screen name="MpgsVardView" component={MpgsVardView} />
                <Stack.Screen name="MpgsVardViewNew" component={MpgsVardViewNew} />


            </Stack.Navigator>
        )
    }
    const navigationRef = createNavigationContainerRef()
    const colorScheme = useColorScheme()
    return (
        <NavigationContainer
            ref={navigationRef}
            theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <AuthStack />
        </NavigationContainer>
    )
}
export default App