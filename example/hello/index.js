const _ = require('lodash');

exports.handler = async (event, context) => {
	console.log('Loaded lodash', _.VERSION);
	return 'done';
}