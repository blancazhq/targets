const init_state = {
  data: null,
  error: null
};

const SingleTargetReducer = (state=init_state, action)=>{
  let nextState;
  if(action.type==="completeGetSingleTarget"){
    nextState = Object.assign({}, state, {
      data: action.value
    })
  }else if(action.type==="getSingleTargetError"){
    nextState = Object.assign({}, state, {
      error: action.value
    })
  }else if(action.type === "completeChangeSingleStatus"){
    let data_copy = Object.assign({},state.data,{
      status: action.status
    })
    nextState = Object.assign({}, state, {
      data: data_copy
    })
  }else if(action.type === "completeDeleteSingleTarget"){
    nextState = Object.assign({}, state, {
      data: null
    })
  }else if(action.type === "deleteSingleTargetError"){
    nextState = Object.assign({}, state, {
      error: action.value
    })
  }else{
    nextState = state;
  }
  return nextState;
}

export default SingleTargetReducer;
