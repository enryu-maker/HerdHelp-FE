const initialState = {
  authToken: null,
  unit: null,
  userData: {},
  status: [],
  cat: [],
  tags: [],
  herds: [],
  finance: [],
  alerts: [],
  animal: {},
  parent: {},
  parentmed: {},
  med: {},
  fcat: [],
  overView: [],
  gender: [],
  baby: [],
  subscribed: false,
  appVersion: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        authToken: action.payload,
      };
    case 'CLEANP':
      return {
        ...state,
        parent: action.payload,
      };
    case 'PREMIUM':
      return {
        ...state,
        subscribed: action.payload,
      };
    case 'UNIT':
      return {
        ...state,
        unit: action.payload,
      };
    case 'BABY':
      return {
        ...state,
        baby: action.payload,
      };
    case 'GENDER':
      return {
        ...state,
        gender: action.payload,
      };
    case 'CLEAN':
      return {
        ...state,
        animal: action.payload,
      };
    case 'HERDS':
      return {
        ...state,
        herds: action.payload,
      };
    case 'LOGOUT':
      return {
        authToken: null,
      };
    case 'STATUS':
      return {
        ...state,
        status: action.payload,
      };
    case 'TAGS':
      return {
        ...state,
        tags: action.payload,
      };
    case 'USER':
      return {
        ...state,
        userData: action.payload,
      };
    case 'OVERVIEW':
      return {
        ...state,
        overView: action.payload,
      };
    case 'CATEGORY':
      return {
        ...state,
        cat: action.payload,
      };
    case 'FINANCE':
      return {
        ...state,
        finance: action.payload,
      };
    case 'ALERTS':
      return {
        ...state,
        alerts: action.payload,
      };
    case 'ONEANIMAL':
      return {
        ...state,
        animal: action.payload,
      };
    case 'PARENT':
      return {
        ...state,
        parent: action.payload,
      };
    case 'ONEMED':
      return {
        ...state,
        med: action.payload,
      };
    case 'ONEMEDP':
      return {
        ...state,
        parentmed: action.payload,
      };
    case 'FCAT':
      return {
        ...state,
        fcat: action.payload,
      };
    case 'VERSION':
      return {
        ...state,
        appVersion: action.payload,
      };
    default:
      return state;
  }
};
