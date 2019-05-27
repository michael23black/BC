import React, { Component } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components";
import { connect } from "react-redux";

import { scanDevices, connectDevice } from "../../state/reducers/connection";

import Header from "../../components/Header";
import List from "../../components/List";
import ListItem from "../../components/ListItem";

import { BG_COLOR } from "../../styles";

const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  background-color: ${BG_COLOR};
`;

class ConnectionScreen extends Component {
  state = {};
  render() {
    const {
      devices,
      isScanning,
      isConnecting,
      onScanDevices,
      onConnectDevice
    } = this.props;
    return (
      <Container>
        <Header
          icon={require("../../images/search.png")}
          title={"SEARCH DEVICES"}
          onPress={onScanDevices}
          inProgress={isScanning || isConnecting}
        />
        <ScrollView>
          <List
            inProgress={isScanning}
            length={devices.length}
            defaultLabel={"NO DEVICES AVAILABLE"}
          >
            {devices.map((item, index) => (
              <ListItem
                onPress={() => onConnectDevice(item.id)}
                {...item}
                index={index}
                key={index}
              />
            ))}
          </List>
        </ScrollView>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  isScanning: state.connection.isScanning,
  isConnecting: state.connection.isConnecting,
  devices: state.connection.devices
});

const mapDispatchToProps = dispatch => ({
  onScanDevices: () => {
    dispatch(scanDevices());
  },
  onConnectDevice: id => {
    dispatch(connectDevice(id));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectionScreen);
