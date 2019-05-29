import React, { Component } from "react";
import { ScrollView } from "react-native";
import { connect } from "react-redux";
import styled from "styled-components";

import { writeToDevice } from "../../state/reducers/controllers";

import Header from "../../components/Header";
import Button from "../../components/Button";
import Slider from "../../components/Slider";

import { BG_COLOR } from "../../styles";

const Container = styled.View`
  flex: 1;
  background-color: ${BG_COLOR};
`;
const ButtonsContainer = styled.View`
  flex: 1;
  flex-direction: row;
`;

// TODO: реализовать чтобы последнее движение в RUN заканчивалось первом положении по умолчанию
// TODO: реализовать одновременный переход во всех сервах
// TODO: реализовать сброс всех всех положений параллельно во всех сервах
// TODO: реализовать управление через джойстики

class MixerScreen extends Component {
  componentWillUnmount(){
    this.props.onWriteToDevice(this.props.device, "INITIAL");
  }
  render() {
    const { device, onWriteToDevice } = this.props;
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
          <Slider
            value={57}
            leftIcon={require("../../images/hand-close.png")}
            rightIcon={require("../../images/hand-open.png")}
            onSlidingComplete={value =>
              onWriteToDevice(device, `S6${parseInt(value)}`)
            }
            label={"GRIP"}
          />
          <Slider
            inverse
            value={-20}
            leftIcon={require("../../images/w-top.png")}
            rightIcon={require("../../images/w-bottom.png")}
            onSlidingComplete={value =>
              onWriteToDevice(device, `S5${parseInt(value)}`)
            }
            label={"WRIST BEND"}
          />
          <Slider
            value={46}
            leftIcon={require("../../images/rotation-left.png")}
            rightIcon={require("../../images/rotation-right.png")}
            onSlidingComplete={value =>
              onWriteToDevice(device, `S4${parseInt(value)}`)
            }
            label={"WRIST ROTATION"}
          />
          <Slider
            value={72}
            leftIcon={require("../../images/e-top.png")}
            rightIcon={require("../../images/e-bottom.png")}
            onSlidingComplete={value =>
              onWriteToDevice(device, `S3${parseInt(value)}`)
            }
            label={"ELBOW"}
          />
          <Slider
            inverse
            value={-88}
            leftIcon={require("../../images/s-top.png")}
            rightIcon={require("../../images/s-bottom.png")}
            onSlidingComplete={value =>
              onWriteToDevice(device, `S2${parseInt(value)}`)
            }
            label={"SHOULDER"}
          />
          <Slider
            inverse
            value={-47}
            leftIcon={require("../../images/rotation-left.png")}
            rightIcon={require("../../images/rotation-right.png")}
            onSlidingComplete={value =>
              onWriteToDevice(device, `S1${parseInt(value)}`)
            }
            label={"BASE"}
          />
          <Slider
            value={33}
            leftIcon={require("../../images/fast.png")}
            rightIcon={require("../../images/slow.png")}
            onSlidingComplete={value =>
              onWriteToDevice(device, `SS${parseInt(value)}`)
            }
            label={"SPEED"}
          />
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isWriting: state.controllers.isWriting,
  device: state.connection.device
});
const mapDispatchToProps = dispatch => ({
  onWriteToDevice: (id, data) => {
    dispatch(writeToDevice(id, data));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MixerScreen);
