import React from "react";

const UserContext = React.createContext({
  username: null,
  setUsername: () => {},
});

export default UserContext;
