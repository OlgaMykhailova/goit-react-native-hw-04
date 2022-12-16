import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./useRoute";
import { CommentsScreen } from "./Screens/CommentsScreen";

export default function App() {
  const routing = useRoute(true);

    // return <CommentsScreen></CommentsScreen>
  return (
    <NavigationContainer>{routing}</NavigationContainer>
  );
}
