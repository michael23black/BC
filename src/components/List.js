import React, { Component, Fragment } from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components";

import { SCREEN_W } from "../styles";

const Container = styled.View`
  flex-flow: row wrap;
  width: ${SCREEN_W}px;
`;
const DefaultText = styled.Text`
  text-align: center;
  width: 100%;
  margin: 10px;
  font-family: "Averin";
  font-size: 20px;
  color: #cccccc;
`;
const AIContainer = styled.View`
  width: 100%;
  padding: 10px;
`;

class List extends Component {
  static defaultProps = {
    defaultLabel: ""
  };
  render() {
    const { length, defaultLabel, inProgress, children } = this.props;
    return (
      <Container>
        {inProgress ? (
          <AIContainer>
            <ActivityIndicator size={"large"} color={"#000000"} />
          </AIContainer>
        ) : length === 0 ? (
          <DefaultText>{defaultLabel}</DefaultText>
        ) : (
          children
        )}
      </Container>
    );
  }
}

export default List;
