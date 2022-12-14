import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import { RegistrationScreen } from "./Screens/RegistrationScreen";
import { LoginScreen } from "./Screens/LoginScreen";
import { PostsScreen } from "./Screens/PostsScreen";
import { CreatePostsScreen } from "./Screens/CreatePostsScreen";
import { ProfileScreen } from "./Screens/ProfileScreen";
import Grid from "./assets/images/grid.svg";
import User from "./assets/images/user.svg";
import Plus from "./assets/images/plus.svg";

const AuthStack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

export const useRoute = (isLogin) => {
  return isLogin ? (
    <BottomTab.Navigator screenOptions={{ tabBarShowLabel: false, tabBarStyle: { height: 83 } }}>
      <BottomTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Grid size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FF6C00",
                width: 70,
                height: 40,
                borderRadius: 20,
              }}
            >
              <Plus size={size} color={color} />
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <User size={size} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  ) : (
    <AuthStack.Navigator initialRouteName="Login">
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Registration"
        component={RegistrationScreen}
      ></AuthStack.Screen>
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={LoginScreen}
      ></AuthStack.Screen>
    </AuthStack.Navigator>
  );
};
