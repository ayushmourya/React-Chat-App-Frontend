import { useState, useEffect } from "react";

export function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // check for token in local storage
    const token = localStorage.getItem("token");
    if (token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []);

  return authenticated;
}
