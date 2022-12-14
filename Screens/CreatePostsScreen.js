import React, { useState, useEffect, useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  Alert,
  Keyboard,
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import ArrowLeft from "../assets/images/arrowLeft.svg";
import DownloadPhoto from "../assets/images/downloadPhoto.svg";
import Location from "../assets/images/location.svg";

export const CreatePostsScreen = () => {
  const [fontsLoaded] = useFonts({
    Roboto: require("../assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("../assets/fonts/Roboto-Medium.ttf"),
    RobotoBold: require("../assets/fonts/Roboto-Bold.ttf"),
  });

  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );
  const [isFocusedTitle, setIsFocusedTitle] = useState(false);
  const [isFocusedLocation, setIsFocusedLocation] = useState(false);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");

  const [isDisabled, setIsDisabled] = useState(true);

  const titleHandler = (title) => setTitle(title);
  const locationHandler = (location) => setLocation(location);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setWindowWidth(width);
    };
    const dimensionsHandler = Dimensions.addEventListener("change", onChange);

    return () => dimensionsHandler.remove();
  }, []);

  useEffect(() => {
    (title && location) ? setIsDisabled(false) : setIsDisabled(true)
  }, [title, location]);

  const onPublish = () => {
    if (!title.trim() || !location.trim()) {
      Alert.alert(`All fields must be completed!`);
      return;
    }
    Alert.alert(`Post successfully created!`);
    console.log(title, location);
    setTitle("");
    setLocation("");
    Keyboard.dismiss();
  };

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
              Create post
            </Text>
            <TouchableOpacity style={styles.arrowLeftButton}>
              <ArrowLeft />
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View style={{ ...styles.section, width: windowWidth }}>
              <View
                style={{ ...styles.contentBlock, width: windowWidth - 16 * 2 }}
              >
                <TouchableOpacity>
                  <DownloadPhoto />
                </TouchableOpacity>
              </View>
              <View style={{ width: "100%", alignItems: "flex-start" }}>
                <Text style={styles.text}>Download photo</Text>
              </View>
              <View style={{ width: windowWidth - 16 * 2 }}>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: isFocusedTitle ? "#FF6C00" : "#E8E8E8",
                    fontFamily: "Roboto",
                  }}
                  onFocus={() => setIsFocusedTitle(true)}
                  onBlur={() => setIsFocusedTitle(false)}
                  value={title}
                  placeholder="Title..."
                  cursorColor={"#BDBDBD"}
                  placeholderTextColor={"#BDBDBD"}
                  onChangeText={titleHandler}
                ></TextInput>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: isFocusedLocation ? "#FF6C00" : "#E8E8E8",
                    paddingLeft: 26,
                    fontFamily: "Roboto",
                  }}
                  onFocus={() => setIsFocusedLocation(true)}
                  onBlur={() => setIsFocusedLocation(false)}
                  value={location}
                  textContentType={"location"}
                  placeholder="Location"
                  cursorColor={"#BDBDBD"}
                  placeholderTextColor={"#BDBDBD"}
                  onChangeText={locationHandler}
                ></TextInput>
                <Location style={styles.locationIcon} />
              </View>
              <TouchableOpacity
                style={{ ...styles.button, width: windowWidth - 16 * 2, backgroundColor: isDisabled ? "#F6F6F6" : '#FF6C00'}}
                onPress={onPublish}
                disabled={isDisabled}
              >
                <Text style={{ ...styles.textButton, color: isDisabled ? "#BDBDBD" : '#FFFFFF', fontFamily: "Roboto" }}>
                  Publish
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
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
    justifyContent: "flex-end",
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
  arrowLeftButton: {
    position: "absolute",
    top: 53,
    left: 16,
    width: 25,
    height: 25,
  },
  section: {
    flex: 1,
    alignItems: "center",
    marginTop: 32,
    paddingHorizontal: 16,
  },
  contentBlock: {
    alignItems: "center",
    justifyContent: "center",
    height: 240,
    backgroundColor: "#F6F6F6",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
  },
  text: {
    marginTop: 8,
    marginBottom: 16,
    color: "#BDBDBD",
    fontSize: 16,
    lineHeight: 19,
  },
  input: {
    marginTop: 16,
    paddingTop: 0,
    paddingBottom: 0,
    height: 56,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  locationIcon: {
    position: "absolute",
    bottom: 16,
  },
  button: {
    height: 51,
    marginTop: 27,
    paddingVertical: 16,
    
    borderRadius: 100,
  },
  textButton: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#BDBDBD",
  },
});
