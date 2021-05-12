import { createSlice, PayloadAction } from 'redux-starter-kit';

export type CurrentOilTemp = {
  at: number;
  metric: string;
  unit: string;
  value: number;
};

export type ApiErrorAction = {
  error: string;
};

const initialState = {
  at: 0,
  metric: '',
  unit: '',
  value: 0
};

const slice = createSlice({
  name: 'oilTemp',
  initialState,
  reducers: {
    currentOilTempRecevied: (state, action: PayloadAction<CurrentOilTemp>) => {
      const { at, metric, unit, value } = action.payload;
      state.at = at;
      state.metric = metric;
      state.unit = unit;
      state.value = value;
    },
    metricsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;