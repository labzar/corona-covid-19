import React, { ReactElement, useContext } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Chart.module.css';
import { AppContext } from '../../App';
import { covidUrl } from '../../api';
import { useFetch } from '../../socle/useFetch';
import { CovidDataType } from '../../hooks/useGetGeneralCovidData';

export const Chart = (): ReactElement => {
    const { state } = useContext(AppContext);
    const [covid19Data] = useFetch<CovidDataType>(`${covidUrl}/summary`);

    const barChart = state.country ? (
        <Bar
            data={{
                labels: ['Infected', 'Recovered', 'Deaths'],
                datasets: [
                    {
                        label: 'People',
                        backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                        data: [state.confirmed, state.recovered, state.deaths],
                    },
                ],
            }}
            options={{
                legend: { display: false },
                title: { display: true, text: `Current state in ${state.country}` },
            }}
        />
    ) : null;

    const lineChart = covid19Data ? (
        <Line
            data={{
                labels: covid19Data.Countries.map((country) => country.Date),
                datasets: [
                    {
                        data: covid19Data.Countries.map((data) => data.TotalConfirmed),
                        label: 'Infected',
                        borderColor: '#3333ff',
                        fill: true,
                    },
                    {
                        data: covid19Data.Countries.map((data) => data.TotalRecovered),
                        label: 'Recovered',
                        borderColor: 'rgba(37, 156, 37, 0.5)',
                        fill: true,
                    },
                    {
                        data: covid19Data.Countries.map((data) => data.TotalDeaths),
                        label: 'Deaths',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        fill: true,
                    },
                ],
            }}
        />
    ) : null;

    return <div className={styles.container}>{state.country ? barChart : lineChart}</div>;
};
