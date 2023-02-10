import * as calculate from './lib/calculate';
import * as fetch from './lib/fetch';
import * as remove from './lib/remove';
import * as save from './lib/save';

export default {
    ...calculate,
    ...fetch,
    ...remove,
    ...save,
};
