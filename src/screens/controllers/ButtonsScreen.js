import React, { Component } from "react";
import { ScrollView } from "react-native";
import { connect } from "react-redux";
import styled from "styled-components";

import Header from "../../components/Header";
import Button from "../../components/Button";
import ControlButton from "../../components/ControlButton";
import Slider from "../../components/Slider";
import ControlContainerLabel from "../../components/ControlContainerLabel";

import { BG_COLOR } from "../../styles";
import { ControlInterface } from "../../interfaces/interfaces";
import {
  writeToDevice,
  fastWriteToDevice
} from "../../state/reducers/controllers";

const Container = styled.View`
  flex: 1;
  background-color: ${BG_COLOR};
`;
const ButtonsContainer = styled.View`
  flex: 1;
  flex-direction: row;
`;
const ControlButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin: 5px 5px 0 5px;
  border: 1px solid #000000;
  border-radius: 5px;
  background-color: #ffffff;
`;
const DefaultText = styled.Text`
  text-align: center;
  width: 100%;
  margin: 10px;
  font-family: "Averin";
  font-size: 20px;
  color: #cccccc;
`;

class ButtonsScreen extends Component {
  componentWillUnmount() {
    this.props.onWriteToDevice(this.props.device, "INITIAL");
  }
  render() {
    const {
      device,
      savedPositions,
      onWriteToDevice,
      onFastWriteToDevice
    } = this.props;
    return (
      <Container>
        <Header
          withBack
          render={
            <ButtonsContainer>
              <Button
                onPress={() => onWriteToDevice(device, "RESET")}
                icon={require("../../images/reset.png")}
                text={"RESET"}
              />
              <Button
                onPress={() => onWriteToDevice(device, "SAVE")}
                icon={require("../../images/save.png")}
                text={"SAVE"}
              />
              <Button
                onPress={() => onWriteToDevice(device, "PAUSE")}
                icon={require("../../images/pause.png")}
                text={"PAUSE"}
              />
              <Button
                onPress={() => onWriteToDevice(device, "RUN")}
                icon={require("../../images/play.png")}
                text={"RUN"}
              />
            </ButtonsContainer>
          }
        />
        <ScrollView>
          {ControlInterface.map((item) => {
            return (
              <ControlButtonsContainer key={item.servoIndex}>
                <ControlButton
                  icon={item.leftIcon}
                  onPressIn={() =>
                    onFastWriteToDevice(device, `SF${item.servoIndex}${item.inverse? 1: 0}`)
                  }
                  onPressOut={() =>
                    onFastWriteToDevice(device, "STOP")
                  }
                />
                <ControlContainerLabel label={item.label} />
                <ControlButton
                  reverse
                  icon={item.rightIcon}
                  onPressIn={() =>
                    onFastWriteToDevice(device, `SF${item.servoIndex}${item.inverse? 0: 1}`)
                  }
                  onPressOut={() =>
                    onFastWriteToDevice(device, "STOP")
                  }
                />
              </ControlButtonsContainer>
            );
          })}
          <Slider
            value={33}
            leftIcon={require("../../images/fast.png")}
            rightIcon={require("../../images/slow.png")}
            onSlidingComplete={value =>
              onWriteToDevice(device, `SS${parseInt(value)}`)
            }
            label={"SPEED"}
          />
          <Slider
            value={50}
            leftIcon={require("../../images/angle-s.png")}
            rightIcon={require("../../images/angle-b.png")}
            onSlidingComplete={value =>
              onWriteToDevice(device, `SA${parseInt(value)}`)
            }
            label={"ANGLE"}
          />
          <DefaultText>SAVED POSITIONS: {savedPositions}</DefaultText>
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  device: state.connection.device,
  savedPositions: state.controllers.savedPositions
});
const mapDispatchToProps = dispatch => ({
  onWriteToDevice: (id, data) => {
    dispatch(writeToDevice(id, data));
  },
  onFastWriteToDevice: (id, data) => {
    dispatch(fastWriteToDevice(id, data));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonsScreen);
