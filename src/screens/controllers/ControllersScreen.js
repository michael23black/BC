import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import Header from "../../components/Header";
import List from "../../components/List";
import ListItem from "../../components/ListItem";

import { BG_COLOR } from "../../styles";

const Container = styled.View`
  flex: 1;
  background-color: ${BG_COLOR};
`;

class ControllersScreen extends Component {
  render() {
    const { controllers, navigation } = this.props;
    return (
      <Container>
        <Header />
        <List
          length={controllers.length}
          defaultLabel={"NO CONTROLLERS AVAILABLE"}
          onPress={() => navigation.navigate()}
        >
          {controllers.map((item, index) => (
            <ListItem
              onPress={() => navigation.navigate(item.screen)}
              {...item}
              index={index}
              key={index}
            />
          ))}
        </List>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isWriting: state.controllers.isWriting,
  controllers: state.controllers.controllers
});

export default connect(mapStateToProps)(ControllersScreen);
