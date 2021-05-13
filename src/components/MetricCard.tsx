import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useQuery } from 'urql';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    display: 'inline-block'
  },
  pos: {
    marginBottom: 12,
  },
});

const query = `
{
  getLastKnownMeasurement(metricName: "oilTemp") {
  	metric
    value
    unit
    at
  }
}
`;

type CardProps = {
  title: string,
  metricReading: string
}

export default function MetricCard({ title, metricReading }: CardProps) {
  const classes = useStyles();

  const [result] = useQuery({
    query,
  });

  const { fetching, data, error } = result;

  useEffect(() => {
    if (error) {
      return;
    }

    if (!data) return;

    console.log('oil data', data);
  }, [data, error]);

  if (fetching) return <LinearProgress />;

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