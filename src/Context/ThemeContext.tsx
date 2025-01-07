import { createContext, useState } from "react";
import { ChildrenType } from "../Type/type";

type ThemeType = {
    dark: boolean
    setDark: React.Dispatch<React.SetStateAction<boolean>>
}

export const ThemeProvider = createContext<ThemeType |null>(null)

const ThemeContext = ({children}:ChildrenType) => {
    const [dark, setDark] = useState<boolean>(true)
    
    return (
        <ThemeProvider.Provider value={{setDark,dark}}>
            {children}
        </ThemeProvider.Provider>
    );
};

export default ThemeContext;