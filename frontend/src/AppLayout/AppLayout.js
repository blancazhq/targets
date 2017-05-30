import React from "react";
import * as actions from "../Targets/Targets.action";
import * as ReactRedux from "react-redux";
import {Link, IndexLink} from "react-router";


class AppLayout extends React.Component{

  render(){
    return (
      <div id="applayout_wrapper" >
        <div id="main_nav" className="cf">
          <Link to="/" id="home_logo_link"><h1 id="home_logo">Targets</h1></Link>
          <ul>
            <Link className="main_nav_li_link" to="/summary"><li>summary</li></Link>
            <Link className="main_nav_li_link" to="/createtarget"><li onClick={this.props.startCreateTarget}>create target</li></Link>
          </ul>
        </div>

        <div id="applayout_children_wrapper">
          {this.props.children}
        </div>
      </div>
    )
  }
}

const AppLayoutContainer = ReactRedux.connect(state=>state, actions)(AppLayout)

export default AppLayoutContainer;
