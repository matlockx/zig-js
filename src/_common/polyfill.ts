import {Logger} from './logging';
//
// polyfill for promises.
import 'promise-polyfill/src/polyfill';
//
// and for local storage.
import 'localstorage-browser-polyfill';

const log = Logger.get('zig.polyfill');

export function objectAssignPolyfill() {
    // taken from
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill

    if (typeof Object.assign !== 'function') {
        log.debug('Using Object.assign polyfill');

        // Must be writable: true, enumerable: false, configurable: true
        Object.defineProperty(Object, 'assign', {
            writable: true,
            configurable: true,
            value: function assign(target: any, varArgs: any) { // .length of function is 2
                if (target == null) { // TypeError if undefined or null
                    throw new TypeError('Cannot convert undefined or null to object');
                }

                const to = Object(target);

                for (let index = 1; index < arguments.length; index++) {
                    const nextSource = arguments[index];

                    if (nextSource == null) {
                        continue;
                    }

                    for (const nextKey in nextSource) {
                        // Avoid bugs when hasOwnProperty is shadowed
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }

                return to;
            },
        });
    }
}
