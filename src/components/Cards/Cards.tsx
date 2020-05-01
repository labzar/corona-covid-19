import React, { ReactElement } from 'react';
import { Grid } from '@material-ui/core';
import styles from './Cards.module.css';
import { CardItem } from './Card';
import { useGetGeneralCovidData } from '../../hooks/useGetGeneralCovidData';

export const Cards = (): ReactElement => {
    const [confirmed, recovered, deaths, lastUpdate, loading] = useGetGeneralCovidData();
    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className={styles.container}>
            <Grid container spacing={3} justify="center">
                <CardItem
                    title="Infected"
                    discription="Number of active cases of COVID-19."
                    count={confirmed as number}
                    lastUpdate={new Date(lastUpdate as string).toDateString()}
                    style={styles.infected}
                />
                <CardItem
                    title="Recovered"
                    discription="Number of recoveries from COVID-19."
                    count={recovered as number}
                    lastUpdate={new Date(lastUpdate as string).toDateString()}
                    style={styles.recovered}
                />
                <CardItem
                    title="Deaths"
                    discription="Number of deaths caused by COVID-19."
                    count={deaths as number}
                    lastUpdate={new Date(lastUpdate as string).toDateString()}
                    style={styles.deaths}
                />
            </Grid>
        </div>
    );
};
