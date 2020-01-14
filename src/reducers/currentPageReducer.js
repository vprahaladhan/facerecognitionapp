const initialState = {
  currentPage: "signin"
};

export const currentPageReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case "SET_CURRENT_PAGE":
      return {...state, currentPage: action.data};
    default:
      return state;
  }
};
