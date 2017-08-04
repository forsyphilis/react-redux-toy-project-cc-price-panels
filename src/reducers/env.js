/**
 * Created by forsyphilis on 2017. 7. 5..
 */
import env from '../config/env.json';

const initialState = {
  ...env
};

export default function environment(state = initialState, action) {
  switch (action.type) {
    default : {
      return state;
    }
  }
}
