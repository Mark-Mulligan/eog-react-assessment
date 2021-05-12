import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as oilReducer } from '../Features/Oil/reducer';
import { reducer as metricsAvailableReducer } from "../Features/MultiSelect/metricsAvailableReducer";

export default {
  weather: weatherReducer,
  oilTemp: oilReducer,
  metricsAvailable: metricsAvailableReducer
};
