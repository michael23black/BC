import React, { Component } from "react";
import { TouchableWithoutFeedback } from "react-native";
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
  margin: 10px;
  border: 1px solid #000000;
  border-radius: 5px;
  background-color: #ffffff;
  ${props =>
    props.index > 1
      ? css`
          margin-top: 0;
        `
      : css`
          margin-top: 10px;
        `}
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
  font-family: "Averin";
  font-size: 15px;
  color: black;
`;

class ListItem extends Component {
  render() {
    const { id, icon, name, index, paired, connected, onPress } = this.props;
    return (
      <Container>
        <TouchableWithoutFeedback onPress={onPress}>
          <Wrap index={index}>
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
