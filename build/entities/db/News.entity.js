"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsEntity = void 0;
const typeorm_1 = require("typeorm");
const User_entity_1 = require("./User.entity");
let NewsEntity = class NewsEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], NewsEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 255,
    }),
    __metadata("design:type", String)
], NewsEntity.prototype, "header", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], NewsEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.UserEntity),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", User_entity_1.UserEntity)
], NewsEntity.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "created_at",
        readonly: true,
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: true,
    }),
    __metadata("design:type", Date)
], NewsEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "updated_at",
        // readonly: true,
        type: 'timestamp',
        nullable: true,
    }),
    __metadata("design:type", Date)
], NewsEntity.prototype, "updatedAt", void 0);
NewsEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "news" })
], NewsEntity);
exports.NewsEntity = NewsEntity;
//# sourceMappingURL=News.entity.js.map