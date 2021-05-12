import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as oilReducer } from '../Features/Oil/reducer';

export default {
  weather: weatherReducer,
  oilTemp: oilReducer
};
