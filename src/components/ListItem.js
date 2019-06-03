import React, { Component } from "react";
import { ActivityIndicator, TouchableWithoutFeedback } from "react-native";
import styled, { css } from "styled-components";

import { SCREEN_W } from "../styles";

const Container = styled.View`
  height: ${SCREEN_W / 2}px;
  width: ${SCREEN_W / 2}px;
`;
const Wrap = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: 10px 10px 0 10px;
  border: 1px solid #000000;
  border-radius: 5px;
  background-color: #ffffff;
  ${props =>
    props.index % 2 === 0
      ? css`
          margin-right: 5px;
        `
      : css`
          margin-left: 5px;
        `}
`;
const Icon = styled.Image`
  height: ${SCREEN_W / 4}px;
  width: ${SCREEN_W / 4}px;
`;
const Label = styled.Text`
  text-align: center;
  font-family: "Averin";
  font-size: 15px;
  color: black;
`;
const SpinerContainer = styled.View`
  position: absolute;
  align-items: center;
  justify-content: center;
  height: ${SCREEN_W / 2 - 10}px;
  width: ${SCREEN_W / 2 - 15}px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

class ListItem extends Component {
  static defaultProps = {
    isConnecting: false
  };
  constructor(props) {
    super(props);
    this.state = {
      needIndicator: false
    };
  }
  spinerCallback = status => {
    this.setState(state => ({
      needIndicator: status
    }));
  };
  render() {
    const { needIndicator } = this.state;
    const {
      id,
      icon,
      name,
      index,
      paired,
      connected,
      onPress,
      inProgress
    } = this.props;
    return (
      <Container>
        <TouchableWithoutFeedback
          disabled={inProgress}
          onPress={() => onPress(this.spinerCallback)}
        >
          <Wrap index={index}>
            {inProgress && needIndicator && (
              <SpinerContainer>
                <ActivityIndicator size={80} color={"#000000"} />
              </SpinerContainer>
            )}
            {icon ? (
              <Icon source={icon} />
            ) : (
              <Icon
                source={
                  connected
                    ? require("../images/device-connected.png")
                    : paired
                    ? require("../images/device-paired.png")
                    : require("../images/device-unpaired.png")
                }
              />
            )}
            {name && <Label>{name}</Label>}
            {id && <Label>{id}</Label>}
          </Wrap>
        </TouchableWithoutFeedback>
      </Container>
    );
  }
}

export default ListItem;
