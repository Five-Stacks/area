import React from "react";
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
  View,
  Text,
} from "react-native";
import { globalColors, globalTextStyle } from "@/src/styles/global";

type ApiStateHandlerProps = {
  isLoading: boolean;
  error?: string | null;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const ApiStateHandler: React.FC<ApiStateHandlerProps> = ({
  isLoading,
  error,
  children,
  style,
}: ApiStateHandlerProps) => {
  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size={"large"} color={globalColors.blueText} />
      </View>
    );
  }
  if (error) {
    return (
      <View style={[styles.center, style]}>
        <Text style={[globalTextStyle.medium, styles.errorText]}>
          Error fetching data: {"\n"}
          {error}
        </Text>
      </View>
    );
  }

  // Return children as is if no error & is loaded
  return <>{children}</>;
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginHorizontal: 16,
  },
});

export default ApiStateHandler;
