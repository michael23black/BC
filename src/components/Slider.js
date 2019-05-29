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
const LabelContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;
const Label = styled.Text`
  flex: 1;
  margin: 10px 10px 0 0;
  font-family: "Averin";
  font-size: 15px;
  color: #000000;
`;
const Icon = styled.Image`
  height: 25px;
  width: 25px;
  margin-horizontal: 10px;
`;

class MySlider extends Component {
  render() {
    const {
      inverse,
      value,
      leftIcon,
      rightIcon,
      label,
      onSlidingComplete
    } = this.props;
    return (
      <Container>
        {label && (
          <LabelContainer>
            {leftIcon && <Icon source={leftIcon} />}
            <Label>
              NODE {`\u25CF`} {label}
            </Label>
            {rightIcon && <Icon source={rightIcon} />}
          </LabelContainer>
        )}
        <Slider
          value={value}
          onSlidingComplete={value => onSlidingComplete(Math.abs(value))}
          minimumTrackTintColor={"#000000"}
          maximumTrackTintColor={"#cccccc"}
          minimumValue={inverse ? -100 : 0}
          maximumValue={inverse ? 0 : 100}
          thumbTintColor={"#000000"}
          style={{ marginHorizontal: 10 }}
        />
      </Container>
    );
  }
}

export default MySlider;
