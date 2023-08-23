import { createContext, useReducer } from 'react';

const INITIAL_STATE = {
    navbar: undefined,
};

export const NavbarContext = createContext(INITIAL_STATE);

const NavbarReducer = (state, action) => {
    switch (action.type) {
        case 'IS_USER':
            return action.payload;
        case 'RESET_IS_USER':
            return INITIAL_STATE;
        default:
            return state;
    }
};

export const NavbarContextProvider = ({ children }) => {
    const [state, dispatchNav] = useReducer(NavbarReducer, INITIAL_STATE);

    return <NavbarContext.Provider value={{ navbar: state.navbar, dispatchNav }}>{children}</NavbarContext.Provider>;
};
