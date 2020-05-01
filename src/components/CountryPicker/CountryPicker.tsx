import React, { ReactElement, useContext } from 'react';
import { FormControl } from '@material-ui/core';
import { covidUrl } from '../../api';

import styles from './CountryPicker.module.css';
import { useFetch } from '../../socle/useFetch';
import { UPDATE_DATA } from '../../store/reducer';
import { AppContext } from '../../App';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

type CountrySelectType = {
    Country: string;
    Slug: string;
    ISO2: string;
}[];

export const CountryPicker = (): ReactElement => {
    const { dispatch } = useContext(AppContext);

    const [countriesData, loading] = useFetch<CountrySelectType[]>(`${covidUrl}/countries`);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    const handleCountryChange = async (country: any): Promise<void> => {
        dispatch({ type: UPDATE_DATA, payload: { country: country.ISO2 } });
    };

    return (
        <FormControl className={styles.formControl}>
            <Autocomplete
                onChange={(event: object, value: CountrySelectType | null): Promise<void> => handleCountryChange(value)}
                id="combo-box-demo"
                options={countriesData as CountrySelectType[]}
                getOptionLabel={(option: any): string => option.Country}
                renderInput={(params): ReactElement => (
                    <TextField {...params} label="Select country" variant="outlined" />
                )}
            />
        </FormControl>
    );
};
