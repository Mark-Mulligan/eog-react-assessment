import React, { useEffect } from 'react';
import { Provider, createClient, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../store';
import MetricCard from "../../components/MetricCard";

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const getMetricsSelected = (state: IState) => {
  const { metricsSelected } = state.metrics;
  return {
    metricsSelected
  };
};

export default () => {
  return (
    <Provider value={client}>
      <MetricCardContainer />
    </Provider>
  );
};

const MetricCardContainer = () => {
  const { metricsSelected } = useSelector(getMetricsSelected);

  useEffect(() => {
    console.log(metricsSelected);
  }, [metricsSelected]);

  return (
    <div className="container mt-5 mb-5">
      {metricsSelected.length > 0 && metricsSelected.map(metric => {
        return <MetricCard key={metric} title={metric} metricReading="250 F" />
      })}
    </div>
  );
};

