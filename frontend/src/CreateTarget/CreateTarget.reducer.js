const init_state = {
  createdtarget: false,
  editedtarget: false,
  error: null,
  contacts: [{
    name: null,
    phone: null,
    email: null,
    title: null,
    is_main: true
  }],
  quarterly: [
    {
      quarter: "first",
      net_sales: null,
      gross_profit: null,
      net_income: null
    },
    {
      quarter: "second",
      net_sales: null,
      gross_profit: null,
      net_income: null
    },
    {
      quarter: "third",
      net_sales: null,
      gross_profit: null,
      net_income: null
    },
    {
      quarter: "fourth",
      net_sales: null,
      gross_profit: null,
      net_income: null
    },
  ]
};

const CreateTargetReducer = (state=init_state, action)=>{
  let nextState;
  if(action.type==="initCreateTarget"){
    nextState = Object.assign({}, state, {
      createdtarget: false,
      editedtarget: false
    })
  }else if(action.type==="completeGetEditingTarget"){
    nextState = Object.assign({}, state, {
      name: action.value.name,
      description: action.value.description,
      lastYearGrossProfit: String(action.value.last_year_gross_profit),
      lastYearNetSales: String(action.value.last_year_net_sales),
      lastYearNetIncome: String(action.value.last_year_net_income),
      shareVolume: String(action.value.share_volume),
      contacts: action.value.contacts,
      quarterly: action.value.quarterly
    })
  }else if(action.type==="getEditingTargetError"){
    nextState = Object.assign({}, state, {
      error: action.value
    })
  }else if(action.type==="nameChange"){
    nextState = Object.assign({}, state, {
      name: action.value
    })
  }else if(action.type==="descriptionChange"){
    nextState = Object.assign({}, state, {
      description: action.value
    })
  }else if(action.type==="lastYearGrossProfitChange"){
    nextState = Object.assign({}, state, {
      lastYearGrossProfit: action.value
    })
  }else if(action.type==="lastYearNetSalesChange"){
    nextState = Object.assign({}, state, {
      lastYearNetSales: action.value
    })
  }else if(action.type==="lastYearNetIncomeChange"){
    nextState = Object.assign({}, state, {
      lastYearNetIncome: action.value
    })
  }else if(action.type==="shareVolumeChange"){
    nextState = Object.assign({}, state, {
      shareVolume: action.value
    })
  }else if(action.type==="contactnameChange"){
    let contacts_copy = state.contacts.map(contact=>contact)
    contacts_copy[action.idx].name = action.value
    nextState = Object.assign({}, state, {
      contacts: contacts_copy
    })
  }else if(action.type==="contactphoneChange"){
    let contacts_copy = state.contacts.map(contact=>contact)
    contacts_copy[action.idx].phone = action.value
    nextState = Object.assign({}, state, {
      contacts: contacts_copy
    })
  }else if(action.type==="contactemailChange"){
    let contacts_copy = state.contacts.map(contact=>contact)
    contacts_copy[action.idx].email = action.value
    nextState = Object.assign({}, state, {
      contacts: contacts_copy
    })
  }else if(action.type==="contacttitleChange"){
    let contacts_copy = state.contacts.map(contact=>contact)
    contacts_copy[action.idx].title = action.value
    nextState = Object.assign({}, state, {
      contacts: contacts_copy
    })
  }else if(action.type==="addContact"){
    let contacts_copy = state.contacts.map(contact=>contact)
    contacts_copy.push({
      name: null,
      phone: null,
      email: null,
      title: null,
      is_main: false
    })
    nextState = Object.assign({}, state, {
      contacts: contacts_copy
    })
  }else if(action.type==="quarterGrossProfitChange"){
    let quarterly_copy = state.quarterly.map(quarter=>quarter)
    quarterly_copy[action.idx].gross_profit = action.value
    nextState = Object.assign({}, state, {
      quarterly: quarterly_copy
    })
  }else if(action.type==="quarterNetSalesChange"){
    let quarterly_copy = state.quarterly.map(quarter=>quarter)
    quarterly_copy[action.idx].net_sales = action.value
    nextState = Object.assign({}, state, {
      quarterly: quarterly_copy
    })
  }else if(action.type==="quarterNetIncomeChange"){
    let quarterly_copy = state.quarterly.map(quarter=>quarter)
    quarterly_copy[action.idx].net_income = action.value
    nextState = Object.assign({}, state, {
      quarterly: quarterly_copy
    })
  }else if(action.type==="doneCreatingTarget"){
    nextState = Object.assign({}, state, {
      createdtarget: true,
      error: null,
      name: null,
      description: null,
      lastYearGrossProfit: null,
      lastYearNetSales: null,
      lastYearNetIncome: null,
      shareVolume: null,
      contacts: [{
        name: null,
        phone: null,
        email: null,
        title: null,
        is_main: true
      }],
      quarterly: [
        {
          quarter: "first",
          net_sales: null,
          gross_profit: null,
          net_income: null
        },
        {
          quarter: "second",
          net_sales: null,
          gross_profit: null,
          net_income: null
        },
        {
          quarter: "third",
          net_sales: null,
          gross_profit: null,
          net_income: null
        },
        {
          quarter: "fourth",
          net_sales: null,
          gross_profit: null,
          net_income: null
        },
      ]
    })
  }else if(action.type==="creatingTargetError"){
    nextState = Object.assign({}, state, {
      error: action.value
    })
  }else if(action.type==="doneEditingTarget"){
    nextState = Object.assign({}, state, {
      editedtarget: true,
      error: null,
      name: null,
      description: null,
      lastYearGrossProfit: null,
      lastYearNetSales: null,
      lastYearNetIncome: null,
      shareVolume: null,
      contacts: [{
        name: null,
        phone: null,
        email: null,
        title: null,
        is_main: true
      }],
      quarterly: [
        {
          quarter: "first",
          net_sales: null,
          gross_profit: null,
          net_income: null
        },
        {
          quarter: "second",
          net_sales: null,
          gross_profit: null,
          net_income: null
        },
        {
          quarter: "third",
          net_sales: null,
          gross_profit: null,
          net_income: null
        },
        {
          quarter: "fourth",
          net_sales: null,
          gross_profit: null,
          net_income: null
        },
      ]
    })
  }else if(action.type==="editingTargetError"){
    nextState = Object.assign({}, state, {
      error: action.value
    })
  }else if(action.type==="nameInvalid"){
    nextState = Object.assign({}, state, {
      error: "name cannot be empty"
    })
  }else if(action.type==="descriptionInvalid"){
    nextState = Object.assign({}, state, {
      error: "description cannot be empty"
    })
  }else if(action.type==="contactInvalid"){
    nextState = Object.assign({}, state, {
      error: "you haven't enter enough contacts, 1 required"
    })
  }else if(action.type==="toggleCreateTarget"){
    nextState = Object.assign({}, state, {
      createdtarget: !state.createdtarget
    })
  }else if(action.type==="toggleCreateTarget"){
    nextState = Object.assign({}, state, {
      editedtarget: !state.editedtarget
    })
  }else{
    nextState = Object.assign({}, state)
  }
  return nextState;
}

export default CreateTargetReducer;
