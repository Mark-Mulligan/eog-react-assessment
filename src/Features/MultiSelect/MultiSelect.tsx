import React, { useEffect, useState } from 'react';
import { Provider, createClient, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './metricsAvailableReducer';
import { IState } from '../../store';
import { FormControl, InputLabel, Select, Input, Chip, MenuItem } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const useStyles = makeStyles((theme) => ({
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
}));

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const query = `
{
  getMetrics
}
`;

const getMetricsAvailable = (state: IState) => {
  const { metricsAvailable } = state.metricsAvailable;
  return {
    metricsAvailable,
  };
};


export default () => {
  return (
    <Provider value={client}>
      <MultiSelect />
    </Provider>
  );
};

const MultiSelect = () => {
  const classes = useStyles();

  // Placeholder state for select.  Need to put in store
  const [selected, setSelected] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelected(event.target.value as string[]);
  };

  const dispatch = useDispatch();

  const { metricsAvailable } = useSelector(getMetricsAvailable);

  const [result] = useQuery({
    query
  });

  const { fetching, data, error } = result;

  useEffect(() => {
    if (error) {
      dispatch(actions.metricsApiErrorReceived({ error: error.message }));
      return;
    }

    if (!data) return;

    const { getMetrics } = data;
    console.log(data);
    dispatch(actions.metricsAvailable(getMetrics));

  }, [ data, error, dispatch]);

  if (fetching) return <LinearProgress />;

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel id="metric-select-label">Color</InputLabel>
      <Select
        required
        labelId="metric-select-label"
        id="metric-select"
        multiple
        value={selected}
        onChange={handleChange}
        input={<Input id="shoe-color-chip" />}
        renderValue={(selected) => (
          <div className={classes.chips}>
            {(selected as string[]).map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
          </div>
        )}
        MenuProps={MenuProps}
      >
        {metricsAvailable.map((metric) => (
          <MenuItem key={metric} value={metric}>
            {metric}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
};



