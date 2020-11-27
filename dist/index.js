'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var buffer = require('buffer');

class SafeJsonBuffer {
    constructor() {
        this.__type = 'Bytes';
    }
}
class SafeJsonPluginBuffer {
    constructor() {
        this.type = 'Bytes';
    }
    condition(obj) {
        return obj instanceof buffer.Buffer;
    }
    serialize(obj) {
        return {
            __type: 'Bytes',
            base64: obj.toString('base64'),
        };
    }
    deserialize(obj) {
        if (obj.base64) {
            return buffer.Buffer.from(obj.base64, 'base64');
        }
        return obj;
    }
}

class SafeJsonDate {
    constructor() {
        this.__type = 'Date';
    }
}
class SafeJsonPluginDate {
    constructor() {
        this.type = 'Date';
    }
    condition(obj) {
        return obj instanceof Date;
    }
    serialize(obj) {
        return {
            __type: 'Date',
            iso: obj.toISOString(),
        };
    }
    deserialize(obj) {
        if (obj.iso) {
            return new Date(obj.iso);
        }
        return obj;
    }
}

exports.SafeJsonBuffer = SafeJsonBuffer;
exports.SafeJsonDate = SafeJsonDate;
exports.SafeJsonPluginBuffer = SafeJsonPluginBuffer;
exports.SafeJsonPluginDate = SafeJsonPluginDate;
