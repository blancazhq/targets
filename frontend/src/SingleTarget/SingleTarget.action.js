import BASEURL from "../baseurl"
import $ from "jquery"

export const getSingleTarget = (id)=>{
  return (dispatch)=>{
    $.ajax({
      url: `${BASEURL}/api/target/${id}`,
      method: "get"
    })
    .then(data=>{
      let quarter_array = ["first", "second", "third", "fourth"];
      data.quarterly =  data.quarterly.sort((a, b)=>quarter_array.indexOf(a.quarter)-quarter_array.indexOf(b.quarter))
      dispatch({
        type: "completeGetSingleTarget",
        value: data
      })
    })
    .catch(err=>{
      let error = err.responseJSON || err.responseJSON.message && "there is an error"
      dispatch({
        type: "getSingleTargetError",
        value: error
      })
    })
  }
}

export const changeSingleStatus = (id, status)=>{
  return (dispatch) => {
    $.ajax({
      url: `${BASEURL}/api/changestatus`,
      method: "post",
      data: JSON.stringify({
        id: id,
        status: status
      }),
      contentType: "application/json"
    })
    .then((data)=>{
      if(data.id = id){
        dispatch({
          type: "completeChangeSingleStatus",
          status: status
        })
      }
    })
    .catch(err=>{
      let error = err.responseJSON || err.responseJSON.message && "there is an error"
      dispatch({
        type: "changeSingleStatusError",
        value: error
      })
    })
  }
}

export const deleteSingleTarget = (id)=>{
  return (dispatch) => {
    $.ajax({
      url: `${BASEURL}/api/target/${id}`,
      method: "delete",
      contentType: "application/json"
    })
    .then((data)=>{
      if(data.id = id){
        dispatch({
          type: "completeDeleteSingleTarget"
        })
      }
    })
    .catch(err=>{
      let error = err.responseJSON || err.responseJSON.message && "there is an error"
      dispatch({
        type: "deleteSingleTargetError",
        value: error
      })
    })
  }
}
