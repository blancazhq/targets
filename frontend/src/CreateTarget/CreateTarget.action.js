import $ from "jquery";
import { hashHistory } from "react-router";
import BASEURL from "../baseurl";

export function initCreateTarget(event){
  return {
    type: "initCreateTarget"
  }
}

export const getEditingTarget = (id)=>{
  return (dispatch)=>{
    $.ajax({
      url: `${BASEURL}/api/target/${id}`,
      method: "get"
    })
    .then(data=>{
      let quarter_array = ["first", "second", "third", "fourth"];
      data.quarterly =  data.quarterly.sort((a, b)=>quarter_array.indexOf(a.quarter)-quarter_array.indexOf(b.quarter))

      dispatch({
        type: "completeGetEditingTarget",
        value: data
      })
    })
    .catch(err=>{
      let error = err.responseJSON || err.responseJSON.message && "there is an error"
      dispatch({
        type: "getEditingTargetError",
        value: error
      })
    })
  }
}

export function nameChange(event){
  return {
    type: "nameChange",
    value: event.target.value
  }
}

export function descriptionChange(event){
  return {
    type: "descriptionChange",
    value: event.target.value
  }
}

export function lastYearGrossProfitChange(event){
  return {
    type: "lastYearGrossProfitChange",
    value: event.target.value
  }
}

export function lastYearNetSalesChange(event){
  return {
    type: "lastYearNetSalesChange",
    value: event.target.value
  }
}
export function lastYearNetIncomeChange(event){
  return {
    type: "lastYearNetIncomeChange",
    value: event.target.value
  }
}
export function shareVolumeChange(event){
  return {
    type: "shareVolumeChange",
    value: event.target.value
  }
}


export function contactnameChange(event, idx){
  return {
    type: "contactnameChange",
    value: event.target.value,
    idx: idx
  }
}

export function contactphoneChange(event, idx){
  return {
    type: "contactphoneChange",
    value: event.target.value,
    idx: idx
  }
}

export function contactemailChange(event, idx){
  return {
    type: "contactemailChange",
    value: event.target.value,
    idx: idx
  }
}

export function contacttitleChange(event, idx){
  return {
    type: "contacttitleChange",
    value: event.target.value,
    idx: idx
  }
}

export function addContact(){
  return {
    type: "addContact"
  }
}

export function quarterGrossProfitChange(event, idx){
  return {
    type: "quarterGrossProfitChange",
    value: event.target.value,
    idx: idx
  }
}

export function quarterNetSalesChange(event, idx){
  return {
    type: "quarterNetSalesChange",
    value: event.target.value,
    idx: idx
  }
}

export function quarterNetIncomeChange(event, idx){
  return {
    type: "quarterNetIncomeChange",
    value: event.target.value,
    idx: idx
  }
}


export function createTarget(data){
  return function(dispatch){
    let validator = (data)=>{
      let namevalidator = !!data.name;
      let descriptionvalidator = !!data.description;

      let contactvalidator = data.contacts.every((contact)=>contact.name !== null)

      return {
        namevalidator:namevalidator,
        descriptionvalidator:descriptionvalidator,
        contactvalidator:contactvalidator,
      }
    }

    if(!validator(data).namevalidator){
      dispatch({
        type: "nameInvalid"
      })
    }else if(!validator(data).descriptionvalidator){
      dispatch({
        type: "descriptionInvalid"
      })
    }else if(!validator(data).contactvalidator){
      dispatch({
        type: "contactInvalid"
      })
    }else{
      $.ajax({
        url: `${BASEURL}/api/createtarget`,
        method: "post",
        data: JSON.stringify(data),
        contentType: "application/json"
      })
      .then((data)=>{
        if(data === "done inserting"){
          dispatch({
            type: "doneCreatingTarget"
          })
        }
      })
      .catch((err)=>{
        let error = err.responseJSON && err.responseJSON.message || "there is an error"
        dispatch({
          type: "creatingTargetError",
          value: error
        })
      })
    }
  }
}

export function editTarget(id, data){
  return function(dispatch){
    let validator = (data)=>{
      let namevalidator = !!data.name;
      let descriptionvalidator = !!data.description;
      let contactvalidator = data.contacts.every((contact)=>contact.name !== null)

      return {
        namevalidator:namevalidator,
        descriptionvalidator:descriptionvalidator,
        contactvalidator:contactvalidator,
      }
    }

    if(!validator(data).namevalidator){
      dispatch({
        type: "nameInvalid"
      })
    }else if(!validator(data).descriptionvalidator){
      dispatch({
        type: "descriptionInvalid"
      })
    }else if(!validator(data).contactvalidator){
      dispatch({
        type: "contactInvalid"
      })
    }else{
      if(data.last_year_gross_profit === "null" || data.last_year_gross_profit === ""){
        data.last_year_gross_profit = null
      }

      if(data.last_year_net_sales === "null" || data.last_year_net_sales === ""){
        data.last_year_net_sales = null
      }

      if(data.last_year_net_income === "null" || data.last_year_net_income === ""){
        data.last_year_net_income = null
      }

      if(data.share_volume === "null" || data.share_volume === ""){
        data.share_volume = null
      }

      $.ajax({
        url: `${BASEURL}/api/target/${id}`,
        method: "put",
        data: JSON.stringify(data),
        contentType: "application/json"
      })
      .then((data)=>{
        if(data === "done editing"){
          dispatch({
            type: "doneEditingTarget"
          })
        }
      })
      .catch((err)=>{
        let error = err.responseJSON && err.responseJSON.message || "there is an error"
        dispatch({
          type: "editingTargetError",
          value: error
        })
      })
    }
  }
}

export function toggleCreateTarget(){
  return {
    type: "toggleCreateTarget"
  }
}

export function toggleEditTarget(){
  return {
    type: "toggleEditTarget"
  }
}
