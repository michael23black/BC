import React, { Component } from "react";
import { View } from "react-native";
import styled from "styled-components";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
`;
const Wrap = styled.Text`
  text-align-vertical: center;
  font-family: "Averin";
  font-size: 15px;
  color: #000000;
`;

class ControlContainerLabel extends Component {
  render() {
    const { label } = this.props;
    return (
      <Container>
        <Wrap>NODE</Wrap>
        <Wrap style={{ borderTopColor: "#000000", borderTopWidth: 2 }}>
          {label}
        </Wrap>
      </Container>
    );
  }
}
export default ControlContainerLabel;
