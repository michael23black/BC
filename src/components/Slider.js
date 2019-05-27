import React, { Component } from "react";
import styled from "styled-components";
import Slider from "react-native-slider";

const Container = styled.View`
  justify-content: center;
  margin: 5px 5px 0 5px;
  border: 1px solid #000000;
  border-radius: 5px;
  background-color: #ffffff;
`;
const Label = styled.Text`
  margin: 10px 10px 0 10px;
  font-family: "Averin";
  font-size: 15px;
  color: #000000;
`;

class MixerScreen extends Component {
  render() {
    const { label, big, ...props } = this.props;
    return (
      <Container>
        {label && (
          <Label>
            NODE {`\u25CF`} {label}
          </Label>
        )}
        <Slider
          {...props}
          minimumTrackTintColor={"#000000"}
          maximumTrackTintColor={"#cccccc"}
          maximumValue={big ? 270 : 180}
          thumbTintColor={"#000000"}
          style={{ marginHorizontal: 10 }}
        />
      </Container>
    );
  }
}

export default MixerScreen;
