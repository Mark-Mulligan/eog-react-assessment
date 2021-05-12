import React, { useEffect } from 'react';
import { Provider, createClient, useQuery } from 'urql';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const query = `
{
  getLastKnownMeasurement(metricName: "oilTemp") {
    value
    at
    metric
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

  return (
    <div>
      <h1>Oil Chart</h1>
    </div>
  )
}
