import { createSlice, PayloadAction } from 'redux-starter-kit';

export type metricsAvailable = {
  metricsAvailable: string[];
};

export type ApiErrorAction = {
  error: string;
};

const initialState = {
  metricsAvailable: [],
};

const slice = createSlice({
  name: 'metricsAvailable',
  initialState,
  reducers: {
    metricsAvailable: (state, action: PayloadAction<metricsAvailable>) => {
      console.log(action.payload)
      const metricsAvailable = action.payload;
      state.metricsAvailable = metricsAvailable as any;
    },
    metricsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;