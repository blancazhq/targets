import React from "react";
import * as actions from "./Targets.action"
import * as ReactRedux from "react-redux";
import {VictoryBar, VictoryChart,VictoryAxis,VictoryTheme, VictoryGroup} from 'victory';
import {Link, IndexLink} from "react-router";


class Targets extends React.Component{
  componentDidMount(){
    this.props.getTargets()
  }

  render(){
    let data = this.props.targets.data;
    let listmode = this.props.targets.listmode;
    let chartmode = this.props.targets.chartmode;

    return (
      <div id="targets_wrapper">
        <div id="list_div">
          <div id="list_menu">
            <button onClick={()=>this.props.changeMode("all")}>all</button>
            <button onClick={()=>this.props.changeMode("researching")}>researching</button>
            <button onClick={()=>this.props.changeMode("pending approval")}>pending approve</button>
            <button onClick={()=>this.props.changeMode("approved")}>approved</button>
            <button onClick={()=>this.props.changeMode("declined")}>declined</button>
          </div>
          <div id="list_content_div">
            {data ?
            data.map((target, idx)=>{if(target.status===listmode || listmode === "all"){
              return (
                <div className="list_content_unit_div">
                  <p>name: {target.name}</p>
                  <p>status: {target.status}</p>
                  {target.show_content ?
                    <p>description: {target.description}</p>
                  : null}
                  <div className="tool_div">
                    <button onClick={()=>this.props.toggleContent(idx)}>{target.show_content ? "hide description" : "show description"}</button>
                    <Link to={"/target/"+target.id}><button>show detail</button></Link>
                    <button onClick={()=>this.props.deleteTarget(target.id, idx)}>delete target</button>
                    <Link to="/createtarget"><button onClick={()=>this.props.toggleEditTarget(target.id)}>edit target</button></Link>
                  </div>
                  <div className="change_status_div">
                    <button disabled = {target.status==="researching"} onClick={()=>this.props.changeStatus(target.id,"researching",idx)}>researching</button>
                    <button disabled = {target.status==="pending approve"} onClick={()=>this.props.changeStatus(target.id,"pending approval",idx)}>pending approval</button>
                    <button disabled = {target.status==="approved"} onClick={()=>this.props.changeStatus(target.id,"approved",idx)}>approved</button>
                    <button disabled = {target.status==="declined"} onClick={()=>this.props.changeStatus(target.id,"declined",idx)}>declined</button>
                  </div>
                </div>
              )
            }})
            : <p>We&#39;re sorry there are currently no targets yet.</p>}
          </div>
        </div>
        <div id="chart_div">
          <div id="chart_menu">
            <button onClick={()=>this.props.changeChartMode("net_sales")}>net sales</button>
            <button onClick={()=>this.props.changeChartMode("gross_profit")}>gross profit</button>
            <button onClick={()=>this.props.changeChartMode("net_income")}>net income</button>
          </div>
          <div id="chart_content_div">
            {chartmode === "net_sales" ?
            <h2>last year&#39;s net sales</h2>
            : (chartmode === "gross_profit" ? <h2>last year&#39;s gross profit</h2> : <h2>last year&#39;s net income</h2>)}

            {data ?
            <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
            <VictoryAxis
            tickValues={data.filter((target)=>listmode==="all" ? true : target.status === listmode).map((target, idx)=>idx+1)}
            tickFormat={data.filter((target)=>listmode==="all" ? true : target.status === listmode).map(target=>target.name)}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={(x) => (`$${x / 1000}k`)}
            />
            <VictoryGroup>
              {chartmode === "net_sales" ?
              <VictoryBar
              data={data.filter((target)=>listmode==="all" ? true : target.status === listmode)}
              x="name"
              y="last_year_net_sales"/>
              : (chartmode === "gross_profit" ? <VictoryBar
              data={data.filter((target)=>listmode==="all" ? true : target.status === listmode)}
              x="name"
              y="last_year_gross_profit"/> : <VictoryBar
              data={data.filter((target)=>listmode==="all" ? true : target.status === listmode)}
              x="name"
              y="last_year_net_income"/>)}
            </VictoryGroup>
            </VictoryChart> : null}
          </div>
        </div>
      </div>
    )
  }
}

const TargetsContainer = ReactRedux.connect(state=>state, actions)(Targets)

export default TargetsContainer;
