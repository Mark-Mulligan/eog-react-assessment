import React, { useEffect } from 'react';
import { Provider, createClient, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { IState } from '../../store';

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

const getOilTemp = (state: IState) => {
  const { at, metric, unit, value } = state.oilTemp;
  return {
    at,
    metric,
    unit,
    value
  };
};

export default () => {
  return (
    <Provider value={client}>
      <OilChart />
    </Provider>
  );
};

const OilChart = () => {
  const dispatch = useDispatch();

  const { at, metric, unit, value } = useSelector(getOilTemp);

  const [result] = useQuery({
    query
  });

  const { fetching, data, error } = result;
  //console.log(result);

  useEffect(() => {
    if (error) {
      dispatch(actions.metricsApiErrorReceived({ error: error.message }));
      return;
    }

    if (!data) return;

    const { getLastKnownMeasurement } = data;
    console.log(getLastKnownMeasurement);
    dispatch(actions.currentOilTempRecevied(getLastKnownMeasurement));

  }, [ data, error, dispatch]);

  if (fetching) return <LinearProgress />;

  return (
    <div>
      <h1>{data.getLastKnownMeasurement.metric}</h1>
      <p>{data.getLastKnownMeasurement.value}</p>
    </div>
  )
};

  
