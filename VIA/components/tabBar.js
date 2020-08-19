import React from "react";
import * as colorsProvider from './colorsProvider';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const tabWidth = windowWidth / 4;

const S = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 52,
    elevation: 2,
    alignItems: "center"
  },
  tabButton: { flex: 1 },
  spotLight: {
    width: tabWidth,
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  spotLightInner: {
    width: 48,
    height: 48,
    borderRadius: 24
  },
  scaler: { flex: 1, alignItems: "center", justifyContent: "center" }
});

const TabBar = props => {
  const {
    renderIcon,
    activeTintColor,
    inactiveTintColor,
    onTabPress,
    onTabLongPress,
    getAccessibilityLabel,
    navigation
  } = props;

  const { routes, index: activeRouteIndex } = navigation.state;

  return (
    <View >
      <View 
      style={{}}>
    
          <View  />
      </View>

      {routes.map((route, routeIndex) => {
        // const isRouteActive = routeIndex === activeRouteIndex;
        // const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;

        return (
          <TouchableOpacity
            key={routeIndex}
            style={S.tabButton}
            onPress={() => {
              onTabPress({ route });
            }}
            onLongPress={() => {
              onTabLongPress({ route });
            }}
            accessibilityLabel={getAccessibilityLabel({ route })}
          >
              {renderIcon({ route, focused: isRouteActive, tintColor })}

          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;