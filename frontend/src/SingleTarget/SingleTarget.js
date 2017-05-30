import React from "react";
import * as actions1 from "./SingleTarget.action";
import * as actions2 from "../Targets/Targets.action";
import * as ReactRedux from "react-redux";
import {VictoryLine, VictoryChart, VictoryAxis,VictoryTheme, VictoryGroup} from 'victory';
import {Link, IndexLink} from "react-router";


class SingleTarget extends React.Component{
  componentDidMount(){
    this.props.getSingleTarget(this.props.params.id)
  }

  render(){
    let data = this.props.singletarget.data;
    let chartmode = this.props.targets.chartmode;

    return (
      <div id="single_target_wrapper">
        {data ? <div id="single_target_content_wrapper" className="cf">
          <div id="singletarget_info_div">
            <h1>{data.name}</h1>
            <p>status: {data.status}</p>
            <p>description: {data.description}</p>
            <p>last year net sales: {data.last_year_net_sales}</p>
            <p>last year gross profit: {data.last_year_gross_profit}</p>
            <p>last year net income: {data.last_year_net_income}</p>
            <p>share volume: {data.share_volume}</p>
            {data.contacts ? data.contacts.map((contact, idx)=><div className="singletarget_contact_unit_div">
              <p>contact {idx+1}: </p>
              <p>{contact.name}<span>{contact.is_main ? " (key contact)" : null}</span></p>
              <p>phone number: {contact.phone}</p>
              <p>email: {contact.email}</p>
              <p>title: {contact.title}</p>
              </div>
            ): null}

            <div id="singletarget_tool_div">
              <button onClick={()=>this.props.deleteSingleTarget(data.id)}>delete target</button>
              <Link to="/createtarget"><button onClick={()=>this.props.toggleEditTarget(data.id)}>edit target</button></Link>
            </div>

            <div id="singletarget_change_status_div">
              <button disabled = {data.status==="researching"} onClick={()=>this.props.changeSingleStatus(data.id,"researching")}>researching</button>
              <button disabled = {data.status==="pending approve"} onClick={()=>this.props.changeSingleStatus(data.id,"pending approval")}>pending approval</button>
              <button disabled = {data.status==="approved"} onClick={()=>this.props.changeSingleStatus(data.id,"approved")}>approve</button>
              <button disabled = {data.status==="declined"} onClick={()=>this.props.changeSingleStatus(data.id,"declined")}>decline</button>
            </div>
          </div>

          <div id="singletarget_chart_div">
            <div id="singletarget_chart_menu">
              <button onClick={()=>this.props.changeChartMode("net_sales")}>net sales</button>
              <button onClick={()=>this.props.changeChartMode("gross_profit")}>gross profit</button>
              <button onClick={()=>this.props.changeChartMode("net_income")}>net income</button>
            </div>
            <div id="singletarget_chart_content_div">
              {chartmode === "net_sales" ?
              <h2>last year&#39;s net sales</h2>
              : (chartmode === "gross_profit" ? <h2>last year&#39;s gross profit</h2> : <h2>last year&#39;s net income</h2>)}

              {data.quarterly ?
              <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
                <VictoryAxis
                tickValues={data.quarterly.map((quarter, idx)=>idx+1)}
                tickFormat={data.quarterly.map(quarter=>quarter.quarter)}
              />
                <VictoryAxis
                  dependentAxis
                  tickFormat={(x) => (`$${x / 1000}k`)}
                />
                <VictoryGroup>
                  {chartmode === "net_sales" ?
                  <VictoryLine
                  data={data.quarterly}
                  x="quarter"
                  y="net_sales"/>
                  : (chartmode === "gross_profit" ? <VictoryLine
                  data={data.quarterly}
                  x="quarter"
                  y="gross_profit"/> : <VictoryLine
                  data={data.quarterly}
                  x="quarter"
                  y="net_income"/>)}
                </VictoryGroup>
              </VictoryChart> : null}
            </div>
          </div>
        </div> : <p>this target does not exist or has been deleted</p>}
      </div>
    )
  }
}

const SingleTargetContainer = ReactRedux.connect(state=>state, Object.assign({}, actions1, actions2))(SingleTarget)

export default SingleTargetContainer;
