export const normalize = function (rawData, ...columns) {
	let data = rawData;
	if (rawData[0].dataValues) {
		data = extractDataValues(rawData);
	}
	if (columns.length === 0) return data;
	columns = columns[0];

	const valuesToExtract = [];
	columns.forEach((column) => recursion(valuesToExtract, column));
	data.map((el) => extractDataObj(valuesToExtract, el));
	return data;
};

const extractDataObj = function (valuesToExtract, el) {
	valuesToExtract.forEach((val) => {
		const { value, path } = val;
		el[value] = path.reduce((acc, cur) => {
			if (acc === '') {
				return el[cur];
			}
			return acc[cur];
		}, '');
	});
	return el;
};

export const normalizeOne = function (rawObj, ...columns) {
	let obj = rawObj;
	if (rawObj.dataValues) {
		obj = rawObj.dataValues;
	}
	if (columns.length === 0) return obj;
	columns = columns[0];

	const valuesToExtract = [];
	columns.forEach((column) => recursion(valuesToExtract, column));
	return extractDataObj(valuesToExtract, obj);
};

const extractDataValues = function (rawData) {
	return rawData.map((el) => el.dataValues);
};

const recursion = function (result, object, ...prevRound) {
	for (const [key, value] of Object.entries(object)) {
		prevRound.push(key);
		value.forEach((val) => {
			if (typeof val === 'object' && val !== null) {
				return recursion(result, val, ...prevRound);
			}
			result.push({
				value: val,
				path: [...prevRound, val].join('.dataValues.').split('.'),
			});
		});
	}
};

export const delExtra = function (rawData, keys) {
	return rawData.map((el) => deleteKeys(el, keys));
};

export const deleteKeys = function (el, keys) {
	keys.forEach((key) => {
		delete el[key];
	});
	return el;
};
