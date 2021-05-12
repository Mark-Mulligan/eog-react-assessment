import { createSlice, PayloadAction } from 'redux-starter-kit';

export type CurrentOilTemp = {
  temperature: number;
  time: number;
  unit: string;
};

export type ApiErrorAction = {
  error: string;
};

const initialState = {
  temperature: 0,
  time: 0,
  unit: '',
};

const slice = createSlice({
  name: 'oilTemp',
  initialState,
  reducers: {
    currentOilTempRecevied: (state, action: PayloadAction<CurrentOilTemp>) => {
      const { temperature, time, unit } = action.payload;
      state.temperature = temperature;
      state.time = time;
      state.unit = unit;
    },
    weatherApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;