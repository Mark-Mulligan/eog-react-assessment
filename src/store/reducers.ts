import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as oilReducer } from '../Features/Oil/reducer';
import { reducer as metricsReducer } from "../Features/MultiSelect/reducer";

export default {
  weather: weatherReducer,
  oilTemp: oilReducer,
  metrics: metricsReducer
};
