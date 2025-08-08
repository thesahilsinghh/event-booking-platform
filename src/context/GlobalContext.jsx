import { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    const value = { search, setSearch, loading, setLoading };

    return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};
