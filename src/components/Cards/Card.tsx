import React, { ReactElement } from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';
import styles from './Cards.module.css';
import cx from 'classnames';
import { ClassValue } from 'classnames/types';

export const CardItem = ({
    title,
    discription,
    count,
    lastUpdate,
    style,
}: {
    title: string;
    discription: string;
    count: number;
    lastUpdate: string;
    style: ClassValue;
}): ReactElement => {
    return (
        <Grid item xs={12} md={3} component={Card} className={cx(styles.card, style)}>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="h5" component="h2">
                    <CountUp start={0} end={count} duration={2.75} separator="," />
                </Typography>
                <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                <Typography variant="body2" component="p">
                    {discription}
                </Typography>
            </CardContent>
        </Grid>
    );
};
