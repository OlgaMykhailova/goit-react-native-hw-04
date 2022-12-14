import React, { useState, useEffect, useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Logout from "../assets/images/logout.svg";

export const PostsScreen = () => {
  const [fontsLoaded] = useFonts({
    Roboto: require("../assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("../assets/fonts/Roboto-Medium.ttf"),
    RobotoBold: require("../assets/fonts/Roboto-Bold.ttf"),
  });

  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setWindowWidth(width);
    };
    const dimensionsHandler = Dimensions.addEventListener("change", onChange);

    return () => dimensionsHandler.remove();
  }, []);

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayout = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      onLayout={onLayout}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback>
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <Text style={{ ...styles.title, fontFamily: "RobotoBold" }}>
              Posts
            </Text>
            <TouchableOpacity style={styles.logoutButton}>
              <Logout />
            </TouchableOpacity>
          </View>
          <View style={{ ...styles.section, width: windowWidth - 16 * 2 }}>
            <View style={styles.userSection}>
              <Image
                style={styles.avatarImage}
                source={require("../assets/images/userAvatar.jpg")}
              />
              <View style={styles.userInfo}>
                <Text style={{...styles.textUserName, fontFamily: "RobotoBold"}}>Natali Romanova</Text>
                <Text style={{...styles.textUserEmail, fontFamily: "Roboto"}}>email@example.com</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
   justifyContent: 'flex-end',
    height: 88,
    elevation: 1,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.3,
    shadowRadius: 27.18,
  },
  title: {
    marginBottom: 11,
    fontSize: 17,
    lineHeight: 22,
    color: "#212121",
    textAlign: "center",
  },
  logoutButton: {
    position: "absolute",
    top: 53,
    right: 16,
    width: 25,
    height: 25,
  },
  section: {
    flex: 1,
    paddingLeft: 16,
    marginTop: 32,
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 16,
    resizeMode: "cover",
  },
  userInfo: {
    marginLeft: 8,
  },
  textUserName: {
    color: "#212121",
    fontSize: 13,
    lineHeight: 15,
  },
  textUserEmail: {
    color: "#212121",
    opacity: 0.8,
    fontSize: 11,
    lineHeight: 13,
  }
});
