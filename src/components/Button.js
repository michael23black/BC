import React, { Component } from "react";
import { TouchableWithoutFeedback } from "react-native";
import styled, { css } from "styled-components";

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 50px;
  background-color: #ffffff;
`;
const Icon = styled.Image`
  height: 25px;
  width: 25px;
  margin: 5px;
`;
const ButtonText = styled.Text`
  font-family: "Averin";
  font-size: 15px;
  color: #000000;
`;

class Button extends Component {
  render() {
    const { icon, text, onPress } = this.props;
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <Container>
          {text && <ButtonText>{text}</ButtonText>}
          {icon && <Icon source={icon} />}
        </Container>
      </TouchableWithoutFeedback>
    );
  }
}
export default Button;
