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
    const { device, onWriteToDevices } = this.props;
    return (
      <Container>
        <Header
          withBack
          render={
            <ButtonsContainer>
              <Button icon={require("../../images/reset.png")} text={"RESET"} />
              <Button icon={require("../../images/save.png")} text={"SAVE"} />
              <Button icon={require("../../images/play.png")} text={"RUN"} />
            </ButtonsContainer>
          }
        />
        <ScrollView>
          <Slider label={"GRIP"} />
          <Slider label={"WRIST BEND"} />
          <Slider label={"WRIST ROTATION"} />
          <Slider big label={"ELBOW"} />
          <Slider big label={"SHOULDER"} />
          <Slider big label={"BASE"} />
          <Slider label={"SPEED"} />
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
  onWriteToDevices: (id, data) => {
    dispatch(writeToDevice(id, data));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MixerScreen);
