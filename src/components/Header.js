import React, { Component } from "react";
import { TouchableWithoutFeedback, ActivityIndicator } from "react-native";
import { withNavigation } from "react-navigation";
import styled from "styled-components";

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  height: 50px;
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: #000000;
  background-color: #ffffff;
`;
const Wrap = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;
const Title = styled.Text`
  font-family: "Averin";
  font-size: 15px;
  color: #000000;
`;
const Icon = styled.Image`
  height: 25px;
  width: 25px;
  margin: 12.5px;
`;

class Header extends Component {
  render() {
    const {
      withBack,
      title,
      icon,
      render,
      inProgress,
      onPress,
      navigation
    } = this.props;
    return (
      <Container>
        {withBack ? (
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Icon
              style={{ height: 40, width: 40 }}
              source={require("../images/back.png")}
            />
          </TouchableWithoutFeedback>
        ) : (
          <Icon source={require("../images/logo.png")} />
        )}
        {render ? (
          render
        ) : (
          <TouchableWithoutFeedback disabled={inProgress} onPress={onPress}>
            <Wrap>
              {title && <Title>{title}</Title>}
              {icon && <Icon source={icon} />}
            </Wrap>
          </TouchableWithoutFeedback>
        )}
      </Container>
    );
  }
}
export default withNavigation(Header);
