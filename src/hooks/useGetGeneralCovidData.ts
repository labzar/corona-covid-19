import { UPDATE_DATA } from './../store/reducer';
import { AppContext } from './../App';
import { useContext, useEffect } from 'react';
import { covidUrl } from './../api/index';
import { useFetch } from '../socle/useFetch';

export type Country = {
    Country: string;
    CountryCode: string;
    Slug: string;
    NewConfirmed: number;
    TotalConfirmed: number;
    NewDeaths: number;
    TotalDeaths: number;
    NewRecovered: number;
    TotalRecovered: number;
    Date: string;
};

export type CovidDataType = {
    Global: { TotalConfirmed: number; TotalRecovered: number; TotalDeaths: number };
    Countries: Country[];
    Date: string;
    country: string;
};

export const useGetGeneralCovidData = () => {
    const { state, dispatch } = useContext(AppContext);

    const [covid19Data, loading] = useFetch<CovidDataType>(`${covidUrl}/summary`);
    const covidDataByCountry = covid19Data?.Countries.find((country) => country.CountryCode === state.country);

    const data = {
        confirmed: state.country
            ? covidDataByCountry!.TotalConfirmed
            : covid19Data
            ? covid19Data!.Global.TotalConfirmed
            : 0,
        recovered: state.country
            ? covidDataByCountry!.TotalRecovered
            : covid19Data
            ? covid19Data!.Global.TotalRecovered
            : 0,
        deaths: state.country ? covidDataByCountry!.TotalDeaths : covid19Data ? covid19Data!.Global.TotalDeaths : 0,
        lastUpdate: state.country ? covidDataByCountry!.Date : covid19Data ? covid19Data!.Date : '',
    };

    useEffect(() => {
        dispatch({ type: UPDATE_DATA, payload: data });
    }, [state.country]);

    return [data.confirmed, data.recovered, data.deaths, data.lastUpdate, loading];
};
