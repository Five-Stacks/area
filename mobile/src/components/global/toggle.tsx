import { globalColors } from "@/src/styles/global";
import React, { useState, useRef, useEffect } from "react";
import { TouchableWithoutFeedback, Animated, StyleSheet } from "react-native";

type ToggleProps = {
  value?: boolean;
  width?: number;
  onValueChange?: (newValue: boolean) => void;
};

const Toggle: React.FC<ToggleProps> = ({
  value = false,
  onValueChange,
  width = 80,
}) => {
  const [isOn, setIsOn] = useState(value);
  const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

  // Animate whenever value changes
  useEffect(() => {
    Animated.timing(anim, {
      toValue: isOn ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isOn, anim]);

  const toggle = () => {
    const newValue = !isOn;
    setIsOn(newValue);
    onValueChange?.(newValue);
  };

  // Interpolations
  const backgroundColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [globalColors.buttonOff, globalColors.buttonOn],
  });

  const circlePosition = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, width - 30], // left padding values
  });

  return (
    <TouchableWithoutFeedback onPress={toggle}>
      <Animated.View
        style={[styles.track, { backgroundColor }, { width: width }]}
      >
        <Animated.View
          style={[
            styles.thumb,
            { transform: [{ translateX: circlePosition }] },
          ]}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  track: {
    height: 30,
    borderRadius: 15,
    padding: 2,
    justifyContent: "center",
  },
  thumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#fff",
    elevation: 2,
  },
});

export default Toggle;
