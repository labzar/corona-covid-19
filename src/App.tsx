import React, { ReactElement, Dispatch } from 'react';
import { Cards, Chart, CountryPicker } from './components';
import style from './App.module.css';
import { reducer, initialState } from './store/reducer';

export type AppStateType = {
    confirmed: number;
    recovered: number;
    deaths: number;
    lastUpdate: string;
    country: string;
};

export const AppContext = React.createContext<{ state: AppStateType; dispatch: Dispatch<any> }>({
    state: initialState,
    dispatch: () => void 0,
});

const App = (): ReactElement => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            <div className={style.container}>
                <Cards />
                <CountryPicker />
                <Chart />
                <div className={style.developper}>
                    Developped by <a href={'https://github.com/labzar/corona-covid-19'}>Othmane LABZAR</a>
                </div>
            </div>
        </AppContext.Provider>
    );
};

export default App;
