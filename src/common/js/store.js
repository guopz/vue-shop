export function saveToLocal (id, key, val) {
	let seller = window.localStorage.__seller__;
	if (!seller) {
		seller = {};
		seller[id] = {};
	} else {
		seller = JSON.parse(seller);
		if (!seller[id]) {
			seller[id] = {};
		}
	}
	seller[id][key] = val;
	window.localStorage.__seller__ = JSON.stringify(seller);
	console.log('leave - saveToLocal');
};

export function saveFromLocal (id, key, def) {
	let seller = window.localStorage.__seller__;
	if (!seller) {
		return def;
	}
	seller = JSON.parse(seller)[id];
	if (!seller) {
		return def;
	}
	let ret = seller[key];
	console.log('leave - saveFromLocal - '+ ret);
	return ret || def;
};
