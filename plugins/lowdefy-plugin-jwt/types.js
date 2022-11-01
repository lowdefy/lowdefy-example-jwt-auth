/* eslint-disable import/namespace */

import * as providers from './auth/providers.js';
import * as callbacks from './auth/callbacks.js';

export default {
  auth: {
    providers: Object.keys(providers),
    callbacks: Object.keys(callbacks),
  },
};
