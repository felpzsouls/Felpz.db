const { readFileSync, writeFileSync, existsSync, mkdirSync, statSync } = require("fs");
class Database {
	constructor(path, options = { replacer: null, space: 2, split: "/" }) {
		if (typeof path === "object") {
			path = options.path;
			options = path;
			if (options.path) delete options.path;
		}
		this.options = options;
		this.path = String(path ? path : "db");
		this.obj = this._read(path);
		this.manager = manager(options.split);
	}
	get version() {
		return require("./package.json").version;
	}
	set(ref, value) {
		const data = this.manager.set(this.obj, ref, value);
		this._write();
		return data;
	}
	get(ref) {
		return ref === this.options.split ? this.obj : this.manager.get(this.obj, ref);
	}
	delete(ref) {
		let data = null;
		if (ref === this.options.split) return this.clear();
		else data = this.manager.delete(this.obj, ref);
		this._write();
		return data;
	}
	get stats() {
		return existsSync(this.path + ".json") ? statSync(this.path + ".json") : null;
	}
	get all() {
		return this.obj;
	}
	clear() {
		delete this.obj;
		this.obj = {};
		this._write();
		return {};
	}
	add(ref, value) {
		return this.set(ref, Number(this.get(ref) || 0) + Number(value));
	}
	subtract(ref, value) {
		return this.set(ref, Number(this.get(ref) || 0) - Number(value));
	}
	push(ref, ...values) {
		const arr = this.get(ref) || [];
		arr.push(...values);
		return this.set(ref, arr);
	}
	shift(ref) {
		const arr = this.get(ref) || [];
		arr.shift();
		return this.set(ref, arr);
	}
	pop(ref) {
		const arr = this.get(ref) || [];
		arr.pop();
		return this.set(ref, arr);
	}
	splice(ref, ...args) {
		const arr = this.get(ref) || [];
		arr.splice(...args);
		return this.set(ref, arr);
	}
	type(ref) {
		return typeof this.get(ref);
	}
	entries(ref) {
		return Object.entries(ref ? this.get(ref) : this.obj);
	}
	keys(ref) {
		return Object.keys(ref ? this.get(ref) : this.obj);
	}
	values(ref) {
		return Object.values(ref ? this.get(ref) : this.obj);
	}
	_read() {
		if (existsSync(this.path + ".json")) {
			const content = readFileSync(this.path + ".json", "utf8");
			if (!content) return {};
			else return JSON.parse(content);
		} else return {};
	}
	_write() {
		const parts = this.path.split("/");
		parts.pop();
		const length = parts.length,
			ref = parts.join("/");
		length && !existsSync(ref) && mkdirSync(ref, { recursive: true });
		return writeFileSync(this.path + ".json", JSON.stringify(this.obj, this.options.replacer, this.options.space));
	}
}
function manager(split) {
	return {
	  set: (o, k, v) => {
	 	try {
		  	k = String(k).split(split);
		  	let b = o;
		  	while (k.length > 1) {
		  		const a = k.shift();
		   		b = b[a] = b[a] || {};
		   	}
		  	b[k] = v;
		  	return o;
	  	} catch (e) {
	  		return undefined;
	  	}
	  },
  	get: (o, k) => {
	  	try {
		  	return String(k).split(split).reduce((a, b) => (a || {})[b], o);
	  	} catch (e) {
	  		return undefined;
	  	}
  	},
  	delete: (o, k) => {
		  try {
		  	k = String(k).split(split);
	  		let b = o;
		  	while (k.length > 1) {
		  		const a = k.shift();
		  		b = b[a] = b[a] || {};
		  	}
		  	delete b[k];
		  	return o;
	  	} catch (e) {
		  	return undefined;
	   	}
  	}
  };
}

module.exports = new Database()
