import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    display: 'inline-block'
  },
  pos: {
    marginBottom: 12,
  },
});

type CardProps = {
  title: string,
  metricReading: string
}

export default function SimpleCard({ title, metricReading }: CardProps) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
         {title}
        </Typography>
        <Typography variant="body2" component="p">
          {metricReading}
        </Typography>
      </CardContent>
    </Card>
  );
}