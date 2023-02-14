import * as calculate from './lib/calculate';
import * as save from './lib/save';
import * as fetch from './lib/fetch';
import * as remove from './lib/remove';

export default {
	...calculate,
	...save,
	...fetch,
	...remove,
};
