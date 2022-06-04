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
  med: {},
  fcat: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        authToken: action.payload,
      };
    case 'UNIT':
      return {
        ...state,
        unit: action.payload,
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
    case 'ONEMED':
      return {
        ...state,
        med: action.payload,
      };
    case 'FCAT':
      return {
        ...state,
        fcat: action.payload,
      };
    default:
      return state;
  }
};
