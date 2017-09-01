import Immutable from 'immutable';
import actions from '../../actions';
import reducer from '../stations';
import * as selectors from '../stations';

describe('stations', () => {
  describe('reducer', () => {
    it('adds a station to the store on ADD_STATION', () => {
      const state = new Immutable.Map;
      const action = actions.addStation({
        id: 'Medborgarplatsen',
        x: 10,
        y: 40,
      });
      const newState = reducer(state, action);

      expect(newState.toJS()).toEqual({
        'Medborgarplatsen': {
          id: 'Medborgarplatsen',
          x: 10,
          y: 40,
        }
      });
    });
  });

  describe('selectors', () => {
    it('stations() returns an array of stations', () => {
      const state = Immutable.fromJS({
        'Station 1': {},
        'Station 2': {},
      });
      const output = selectors.stations(state);
      expect(output.toJS()).toEqual([{}, {}]);
    });

    it('station() returns a single station', () => {
      const state = Immutable.fromJS({
        'Station 1': {id: 'Station 1'},
        'Station 2': {id: 'Station 2'},
      });
      const output = selectors.station(state, 'Station 1');
      expect(output.toJS()).toEqual({ id: 'Station 1' });
    });
  });
});
