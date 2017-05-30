const init_state = {
  data: null,
  viewmode: "general",
  listmode: "all",
  chartmode: "net_income",
  chartidx: null,
  error: null,
  editingid: null
};

const TargetsReducer = (state=init_state, action)=>{
  let nextState
  if(action.type === "completeGetTargets"){
    nextState = Object.assign({}, state, {
      data: action.value
    })
  }else if(action.type === "getTargetsError"){
    nextState = Object.assign({}, state, {
      error: action.value
    })
  }else if(action.type === "changeMode"){
    nextState = Object.assign({}, state, {
      listmode: action.mode
    })
  }else if(action.type === "changeChartMode"){
    nextState = Object.assign({}, state, {
      chartmode: action.mode
    })
  }else if(action.type === "toggleContent"){
    let data_copy = state.data.map(target=>target)
    data_copy[action.idx].show_content = !data_copy[action.idx].show_content
    nextState = Object.assign({}, state, {
      data: data_copy
    })
  }else if(action.type === "completeChangeStatus"){
    let data_copy = state.data.map(target=>target)
    data_copy[action.idx].status = action.status
    nextState = Object.assign({}, state, {
      data: data_copy
    })
  }else if(action.type === "changeStatusError"){
    nextState = Object.assign({}, state, {
      error: action.value
    })
  }else if(action.type === "completeDeleteTarget"){
    let data_copy = state.data.map(target=>target)
    data_copy.splice(action.idx, 1)
    nextState = Object.assign({}, state, {
      data: data_copy
    })
  }else if(action.type === "deleteTargetError"){
    nextState = Object.assign({}, state, {
      error: action.value
    })
  }else if(action.type === "toggleEditTarget"){
    nextState = Object.assign({}, state, {
      editingid: action.id
    })
  }else if(action.type === "startCreateTarget"){
    nextState = Object.assign({}, state, {
      editingid: null
    })
  }else{
    nextState = state;
  }
  return nextState;
}

export default TargetsReducer;
