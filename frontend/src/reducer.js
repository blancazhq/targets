import HomeReducer from "./Home/Home.reducer"
import AppLayoutReducer from "./AppLayout/AppLayout.reducer"
import TargetsReducer from "./Targets/Targets.reducer"
import SingleTargetReducer from "./SingleTarget/SingleTarget.reducer"
import CreateTargetReducer from "./CreateTarget/CreateTarget.reducer"
import * as Redux from "redux";

const reducer = Redux.combineReducers({
  home: HomeReducer,
  applayout: AppLayoutReducer,
  targets: TargetsReducer,
  singletarget: SingleTargetReducer,
  createtarget: CreateTargetReducer
})

export default reducer;
