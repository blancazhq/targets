import React from "react";
import * as actions from "./Home.action";
import * as ReactRedux from "react-redux";
import {Link, IndexLink} from "react-router";


class Home extends React.Component{

  render(){
    return (
      <div id="home_wrapper">
        <h1>Online application for business data tracking and analysis</h1>
        <p>Optimizing your business decision</p>
        <Link to="/summary"><button>explore</button></Link>
      </div>
    )
  }
}

const HomeContainer = ReactRedux.connect(state=>state, actions)(Home)

export default HomeContainer;
