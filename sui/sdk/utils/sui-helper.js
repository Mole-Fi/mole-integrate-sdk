"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INFINITY_U64 = exports.ReadingData = exports.Decoder = exports.ADDRESS_ZERO = void 0;

exports.getObjectAs = getObjectAs;

function getObjectAs(obj) {
    // TODO: check it
    const fields = obj.data.content.fields;
    return fields;
}
