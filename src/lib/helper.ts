const helpers = {
  storage: {
    getFromLocalStorage: (key: string): string | null => {
      if (typeof window !== "undefined") {
        return window.localStorage.getItem(key);
      }
      return null;
    },
    getFromSessionStorage: (key: string): string | null => {
      if (typeof sessionStorage !== "undefined") {
        return sessionStorage.getItem(key);
      }
      return null;
    },
  },
};

export default helpers;
