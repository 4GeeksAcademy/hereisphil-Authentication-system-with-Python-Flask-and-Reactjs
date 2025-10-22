export const initialStore = () => {
  return {
    API_BASE_URL: import.meta.env.VITE_BACKEND_URL,
    token: undefined,
    message: null,
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "authenticate":
      return {
        ...store,
        token: action.payload,
      };
    case "set_hello":
      return {
        ...store,
        message: action.payload,
      };
    default:
      throw Error("Unknown action.");
  }
}
