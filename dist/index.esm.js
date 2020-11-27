import { Buffer } from 'buffer';

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
        return obj instanceof Buffer;
    }
    serialize(obj) {
        return {
            __type: 'Bytes',
            base64: obj.toString('base64'),
        };
    }
    deserialize(obj) {
        if (obj.base64) {
            return Buffer.from(obj.base64, 'base64');
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

export { SafeJsonBuffer, SafeJsonDate, SafeJsonPluginBuffer, SafeJsonPluginDate };
