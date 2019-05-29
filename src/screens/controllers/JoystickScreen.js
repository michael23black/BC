import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import Header from "../../components/Header";
import Button from "../../components/Button";

import { BG_COLOR } from "../../styles";
import { writeToDevice } from "../../state/reducers/controllers";

const Container = styled.View`
  flex: 1;
  background-color: ${BG_COLOR};
`;
const ButtonsContainer = styled.View`
  flex: 1;
  flex-direction: row;
`;

class JoystickScreen extends Component {
  componentWillUnmount() {
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
                onPress={() => onWriteToDevice(device, "RUN")}
                icon={require("../../images/play.png")}
                text={"RUN"}
              />
            </ButtonsContainer>
          }
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
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
)(JoystickScreen);
