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

class MixerScreen extends Component {
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
                onPress={() => onWriteToDevice(device, "RUN")}
                icon={require("../../images/play.png")}
                text={"RUN"}
              />
            </ButtonsContainer>
          }
        />
        <ScrollView>
          <Slider
            onSlidingComplete={value =>
              onWriteToDevice(device, `S6${parseInt(value)}`)
            }
            label={"GRIP"}
          />
          <Slider
            onSlidingComplete={value =>
              onWriteToDevice(device, `S5${parseInt(value)}`)
            }
            label={"WRIST BEND"}
          />
          <Slider
            onSlidingComplete={value =>
              onWriteToDevice(device, `S4${parseInt(value)}`)
            }
            label={"WRIST ROTATION"}
          />
          <Slider
            onSlidingComplete={value =>
              onWriteToDevice(device, `S3${parseInt(value)}`)
            }
            label={"ELBOW"}
          />
          <Slider
            onSlidingComplete={value =>
              onWriteToDevice(device, `S2${parseInt(value)}`)
            }
            label={"SHOULDER"}
          />
          <Slider
            onSlidingComplete={value =>
              onWriteToDevice(device, `S1${parseInt(value)}`)
            }
            label={"BASE"}
          />
          <Slider
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
