import React from "react";
import * as actions from "./CreateTarget.action";
import * as ReactRedux from "react-redux";
import {Link, IndexLink} from "react-router";

class CreateTarget extends React.Component{
  componentDidMount(){
    if(this.props.targets.editingid){
      this.props.getEditingTarget(this.props.targets.editingid);
    }
    this.props.initCreateTarget();
  }

  render(){
    let data = {
      name: this.props.createtarget.name,
      description: this.props.createtarget.description,
      last_year_gross_profit: this.props.createtarget.lastYearGrossProfit,
      last_year_net_sales: this.props.createtarget.lastYearNetSales,
      share_volume: this.props.createtarget.shareVolume,
      last_year_net_income: this.props.createtarget.lastYearNetIncome,
      contacts: this.props.createtarget.contacts,
      quarterly: this.props.createtarget.quarterly
    }

    let error = this.props.createtarget.error;

    return (
      <div>
        {!this.props.createtarget.createdtarget ? (!this.props.createtarget.editedtarget ? <div id="create_target_wrapper">

          <h2>create a target</h2>
          <label>name <span>(required)</span></label><input className={error==="name cannot be empty" ? "create_target_invalid" :null} type="text" value={data.name} onChange={this.props.nameChange}/>

          <label>description <span>(required)</span></label><input className={error==="description cannot be empty" ? "create_target_invalid" :null} type="text" value={data.description} onChange={this.props.descriptionChange}/>

          <label>last year&#39;s gross profit</label><input type="number" min="0" step="10000" value={data.last_year_gross_profit} onChange={this.props.lastYearGrossProfitChange}/>

          <label>last year&#39;s net sales</label><input type="number" min="0" step="10000" value={data.last_year_net_sales} onChange={this.props.lastYearNetSalesChange}/>

          <label>last year&#39;s gross profit</label><input type="number" min="0" step="10000" value={data.last_year_net_income} onChange={this.props.lastYearNetIncomeChange}/>

          <label>share volume</label><input type="number" min="0" step="10000" value={data.share_volume} onChange={this.props.shareVolumeChange}/>

          <label>contacts <span>(required at least 1)</span> </label>

          {data.contacts.map((contact, idx)=>
            <div>
            <h4>contact {idx+1}: <span>{idx === 0? "(main contact)" : null}</span></h4>

            <label>name <span>(required)</span></label>
            <input className={error==="you haven't enter enough contacts, 1 required" ? "create_target_invalid" :null} type="text" value={contact.name} onChange={(event)=>this.props.contactnameChange(event, idx)}/>

            <label>phone</label>
            <input type="text" value={contact.phone} onChange={(event)=>this.props.contactphoneChange(event, idx)}/>

            <label>email</label>
            <input type="text" value={contact.email} onChange={(event)=>this.props.contactemailChange(event, idx)}/>

            <label>title</label>
            <input type="text" value={contact.title} onChange={(event)=>this.props.contacttitleChange(event, idx)}/>

            </div>
          )}

          <button onClick={this.props.addContact}>add a contact</button>

          {data.quarterly.map((quarter, idx)=>
            <div>
            <h4>{quarter.quarter} quarter financial information: </h4>

            <label>quarter gross profit</label>
            <input type="number" min="0" step="10000" value={quarter.gross_profit} onChange={(event)=>this.props.quarterGrossProfitChange(event, idx)}/>

            <label>quarter net sales</label>
            <input type="number" min="0" step="10000" value={quarter.net_sales} onChange={(event)=>this.props.quarterNetSalesChange(event, idx)}/>

            <label>quarter net income</label>
            <input type="number" min="0" step="10000" value={quarter.net_income} onChange={(event)=>this.props.quarterNetIncomeChange(event, idx)}/>

            </div>
          )}

          <p id="create_target_error">{this.props.createtarget.error}</p>

          <button id="create_target_button" onClick={()=> this.props.targets.editingid ?  this.props.editTarget(this.props.targets.editingid, data): this.props.createTarget(data)}>{this.props.targets.editingid ? "edit target" : "create target"}</button>

        </div>
        : <div id="edit_target_complete">
          <p>Thank you for editing this target</p>
          <Link to={"/target/"+this.props.targets.editingid}><button onClick={this.props.toggleEditTarget}>check the target</button></Link>
        </div>)
        : <div id="create_target_complete">
            <p>Thank you for creating this target</p>
            <button onClick={this.props.toggleCreateTarget}>create another target</button>
        </div>}
      </div>
    )
  }
}

const CreateTargetContainer = ReactRedux.connect(state=>state, actions)(CreateTarget)

export default CreateTargetContainer;
