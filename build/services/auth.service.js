"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const entities_1 = require("../entities");
const utils = __importStar(require("../utils"));
class AuthService {
    constructor(userService) {
        this.userService = userService;
    }
    async login(loginData) {
        const { email, password } = loginData;
        const user = await this.userService.getByEmail(email);
        if (!user) {
            throw new entities_1.ServiceError({
                location: 'AuthService.login',
                message: "User with such email doesn't exists"
            });
        }
        const areEqualPasswords = await utils.compareHashed(password, user.password);
        if (!areEqualPasswords) {
            throw new entities_1.ServiceError({
                location: 'AuthService.login',
                message: "Invalid password"
            });
        }
        return {
            key: email,
            value: `${Date.now()}-${email}`
        };
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map