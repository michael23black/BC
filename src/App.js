import React, { Component } from "react";
import { Easing } from "react-native";
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import { Provider } from "react-redux";
import styled, { css } from "styled-components";

import store from "./store";

import ControllersScreen from "./screens/controllers/ControllersScreen";
import MixerScreen from "./screens/controllers/MixerScreen";
import JoystickScreen from "./screens/controllers/JoystickScreen";
import ConnectionScreen from "./screens/connection/ConnectionScreen";

import { BR_DARK_COLOR } from "./styles";

const Container = styled.View`
  flex: 1;
`;
const IconContainer = styled.View`
  align-items: center;
  justify-content: center;
`;
const Icon = styled.Image`
  height: 25px;
  width: 25px;
`;
const IconText = styled.Text`
  font-family: "Avenir";
  font-size: 15px;
  color: #cccccc;
  ${props =>
    props.focused &&
    css`
      color: #000000;
    `}
`;

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 200,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: true
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;
      const { index } = scene;
      const { initWidth } = layout;

      const translateX = position.interpolate({
        inputRange: [index - 1, index],
        outputRange: [initWidth, 0]
      });
      return { transform: [{ translateX }] };
    }
  };
};

const ControllersStack = createStackNavigator(
  {
    ControllersScreen: ControllersScreen,
    MixerScreen: MixerScreen,
    JoystickScreen: JoystickScreen
  },
  {
    initialRouteName: "ControllersScreen",
    defaultNavigationOptions: {
      header: null
    },
    navigationOptions: ({ navigation }) => {
      let tabBarVisible = true;
      if (navigation.state.index > 0) {
        tabBarVisible = false;
      }
      return {
        tabBarVisible
      };
    },
    transitionConfig
  }
);
const ConnectionStack = createStackNavigator(
  {
    ConnectionScreen: ConnectionScreen
  },
  {
    initialRouteName: "ConnectionScreen",
    defaultNavigationOptions: {
      header: null
    },
    navigationOptions: ({ navigation }) => {
      let tabBarVisible = true;
      if (navigation.state.index > 0) {
        tabBarVisible = false;
      }
      return {
        tabBarVisible
      };
    },
    transitionConfig
  }
);
const RootStack = createBottomTabNavigator(
  {
    ControllersStack: ControllersStack,
    ConnectionStack: ConnectionStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        return routeName === "ControllersStack" ? (
          <IconContainer>
            <Icon
              source={
                focused
                  ? require("./images/controller-active.png")
                  : require("./images/controller-inactive.png")
              }
            />
            <IconText focused={focused}>CONTROLLERS</IconText>
          </IconContainer>
        ) : routeName === "ConnectionStack" ? (
          <IconContainer>
            <Icon
              source={
                focused
                  ? require("./images/connection-active.png")
                  : require("./images/connection-inactive.png")
              }
            />
            <IconText focused={focused}>CONNECTION</IconText>
          </IconContainer>
        ) : null;
      }
    }),
    tabBarOptions: {
      showLabel: false,
      style: {
        height: 50,
        borderTopWidth: 1,
        borderTopColor: BR_DARK_COLOR
      }
    }
  }
);
const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <AppContainer />
        </Container>
      </Provider>
    );
  }
}
