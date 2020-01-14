const initialState = {
  searchText: ""
};

export const searchTextReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case "SET_SEARCH_TEXT":
      return {...state, searchText: action.data};
    default:
      return state;
  }
};
