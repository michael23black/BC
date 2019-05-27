import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import Header from "../../components/Header";
import List from "../../components/List";

import { BG_COLOR } from "../../styles";

const Container = styled.View`
  flex: 1;
  background-color: ${BG_COLOR};
`;

class JoystickScreen extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <Container>
        <Header withBack/>
      </Container>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(JoystickScreen);
