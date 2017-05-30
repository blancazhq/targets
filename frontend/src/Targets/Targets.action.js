import BASEURL from "../baseurl"
import $ from "jquery"

export const getTargets = ()=>{
  return (dispatch)=>{
    $.ajax({
      url: `${BASEURL}/api/targets`,
      method: "get"
    })
    .then(data=>{
      data.forEach((target)=>{
        target.show_content = false;
      })
      dispatch({
        type: "completeGetTargets",
        value: data
      })
    })
    .catch(err=>{
      let error = err.responseJSON || err.responseJSON.message && "there is an error"
      dispatch({
        type: "getTargetsError",
        value: error
      })
    })
  }
}

export const changeMode = (mode)=>({
  type: "changeMode",
  mode: mode
})

export const changeChartMode = (mode)=>({
  type: "changeChartMode",
  mode: mode
})

export const toggleContent = (idx)=>({
  type: "toggleContent",
  idx: idx
})

export const changeStatus = (id, status, idx)=>{
  return (dispatch) => {
    console.log(id, status, idx)
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
          type: "completeChangeStatus",
          idx: idx,
          status: status
        })
      }
    })
    .catch(err=>{
      let error = err.responseJSON || err.responseJSON.message && "there is an error"
      dispatch({
        type: "changeStatusError",
        value: error
      })
    })
  }
}

export const deleteTarget = (id, idx)=>{
  return (dispatch) => {
    $.ajax({
      url: `${BASEURL}/api/target/${id}`,
      method: "delete",
      contentType: "application/json"
    })
    .then((data)=>{
      if(data.id = id){
        dispatch({
          type: "completeDeleteTarget",
          idx: idx,
        })
      }
    })
    .catch(err=>{
      let error = err.responseJSON || err.responseJSON.message && "there is an error"
      dispatch({
        type: "deleteTargetError",
        value: error
      })
    })
  }
}

export const toggleEditTarget = (id) => ({
  type: "toggleEditTarget",
  id: id
})

export const startCreateTarget = () => ({
  type: "startCreateTarget"
})
