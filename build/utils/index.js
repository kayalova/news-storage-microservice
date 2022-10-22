"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareHashed = exports.hash = exports.formatDateToClickhouse = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
function formatDateToClickhouse(date) {
    const msDelimeter = date.indexOf('.');
    return date.replace('T', ' ').substring(0, msDelimeter);
}
exports.formatDateToClickhouse = formatDateToClickhouse;
async function hash(data) {
    return bcrypt_1.default.hash(data, 10);
}
exports.hash = hash;
async function compareHashed(compared, hashed) {
    return bcrypt_1.default.compare(compared, hashed);
}
exports.compareHashed = compareHashed;
//# sourceMappingURL=index.js.map