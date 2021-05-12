import React, { useEffect } from 'react';
import { Provider, createClient, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
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

export default () => {
  return (
    <Provider value={client}>
      <OilChart />
    </Provider>
  );
};

const OilChart = () => {
  const [result] = useQuery({
    query
  });

  const { fetching, data, error } = result;
  console.log(result);

  useEffect(() => {
    if (error) {
      return;
    }

    if (!data) return;

    const { getWeatherForLocation } = data;

  }, [ data, error]);

  if (fetching) return <LinearProgress />;

  return (
    <div>
      <h1>{data.getLastKnownMeasurement.metric}</h1>
      <p>{data.getLastKnownMeasurement.value}</p>
    </div>
  )
};

  
