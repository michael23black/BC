import React, { Component } from "react";
import { TouchableWithoutFeedback } from "react-native";
import styled from "styled-components";

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100px;
  background-color: transparent;
`;
const Icon = styled.Image`
  height: 80px;
  width: 80px;
`;
const ButtonText = styled.Text`
  font-family: "Averin";
  font-size: 15px;
  color: #000000;
`;

class ControlButton extends Component {
  render() {
    const { icon, text, onPressIn, onPressOut, reverse } = this.props;
    return (
      <TouchableWithoutFeedback onPressIn={onPressIn} onPressOut={onPressOut}>
        {reverse ? (
          <Container>
            {text && <ButtonText>{text}</ButtonText>}
            {icon && <Icon source={icon} />}
          </Container>
        ) : (
          <Container>
            {icon && <Icon source={icon} />}
            {text && <ButtonText>{text}</ButtonText>}
          </Container>
        )}
      </TouchableWithoutFeedback>
    );
  }
}
export default ControlButton;
