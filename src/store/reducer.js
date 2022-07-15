import { ACTIONS } from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.AUTH:
      return {
        ...state,
        auth: action.payload,
      };
    case ACTIONS.NOTIFY:
      return {
        ...state,
        notify: action.payload,
      };
    default:
      return state;
  }
};
