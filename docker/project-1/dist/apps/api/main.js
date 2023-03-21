/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");;

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiModule = void 0;
const common_1 = __webpack_require__(3);
const config_1 = __webpack_require__(4);
const serve_static_1 = __webpack_require__(5);
const nestjs_rmq_1 = __webpack_require__(6);
const api_controller_1 = __webpack_require__(7);
const rmq_config_1 = __webpack_require__(26);
const files_service_1 = __webpack_require__(20);
const app_root_path_1 = __webpack_require__(22);
const configService = new config_1.ConfigService();
let ApiModule = class ApiModule {
};
ApiModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            nestjs_rmq_1.RMQModule.forRoot(rmq_config_1.getRMQConfig(configService)),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: `${app_root_path_1.path}/uploads`,
                serveRoot: '/uploads'
            }),
        ],
        controllers: [api_controller_1.ApiController],
        providers: [files_service_1.FilesService],
    })
], ApiModule);
exports.ApiModule = ApiModule;


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/common");;

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/config");;

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/serve-static");;

/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("nestjs-rmq");;

/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiController = void 0;
const common_1 = __webpack_require__(3);
const platform_express_1 = __webpack_require__(8);
const converter_1 = __webpack_require__(9);
const nestjs_rmq_1 = __webpack_require__(6);
const files_service_1 = __webpack_require__(20);
const mfile_class_1 = __webpack_require__(24);
const payload_dto_1 = __webpack_require__(25);
let ApiController = class ApiController {
    constructor(filesService, rmqService) {
        this.filesService = filesService;
        this.rmqService = rmqService;
    }
    async uploadFile(file, params) {
        const saveFile = new mfile_class_1.MFile(file);
        if (!file.mimetype.includes('image')) {
            throw new common_1.BadRequestException('Неверный формат файла');
        }
        console.log({ width: Number(params.width), height: Number(params.height), quality: Number(params.quality), format: params.type });
        const res = await this.rmqService.send(converter_1.GenerateImages.Topic, {
            image: saveFile.buffer.toString('base64'),
            requirements: [
                { width: Number(params.width), height: Number(params.height), quality: Number(params.quality), format: params.type }
            ]
        });
        return this.filesService.saveFile(new mfile_class_1.MFile({
            originalname: file.originalname.split('.')[0] + '.' + params.type,
            buffer: Buffer.from(res.images[0].image)
        }));
    }
};
__decorate([
    common_1.Post('upload'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file')),
    __param(0, common_1.UploadedFile()), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof Express !== "undefined" && (_a = Express.Multer) !== void 0 && _a.File) === "function" ? _b : Object, typeof (_c = typeof payload_dto_1.PayloadDto !== "undefined" && payload_dto_1.PayloadDto) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], ApiController.prototype, "uploadFile", null);
ApiController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [typeof (_e = typeof files_service_1.FilesService !== "undefined" && files_service_1.FilesService) === "function" ? _e : Object, typeof (_f = typeof nestjs_rmq_1.RMQService !== "undefined" && nestjs_rmq_1.RMQService) === "function" ? _f : Object])
], ApiController);
exports.ApiController = ApiController;


/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");;

/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(10), exports);
__exportStar(__webpack_require__(11), exports);
__exportStar(__webpack_require__(14), exports);


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GenerateImages = void 0;
var GenerateImages;
(function (GenerateImages) {
    GenerateImages.Topic = 'image-processor.generateImages.rpc';
    class Request {
    }
    GenerateImages.Request = Request;
    class Response {
    }
    GenerateImages.Response = Response;
})(GenerateImages = exports.GenerateImages || (exports.GenerateImages = {}));


/***/ }),
/* 11 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(12), exports);
__exportStar(__webpack_require__(13), exports);


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImageType = void 0;
var ImageType;
(function (ImageType) {
    ImageType["Png"] = "png";
    ImageType["Jpg"] = "jpg";
    ImageType["Webp"] = "webp";
    ImageType["Unknown"] = "unknown";
})(ImageType = exports.ImageType || (exports.ImageType = {}));


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImageRotation = void 0;
var ImageRotation;
(function (ImageRotation) {
    ImageRotation[ImageRotation["Degree90"] = 90] = "Degree90";
    ImageRotation[ImageRotation["Degree180"] = 180] = "Degree180";
    ImageRotation[ImageRotation["Degree270"] = 270] = "Degree270";
})(ImageRotation = exports.ImageRotation || (exports.ImageRotation = {}));


/***/ }),
/* 14 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(15), exports);
__exportStar(__webpack_require__(17), exports);
__exportStar(__webpack_require__(18), exports);
__exportStar(__webpack_require__(19), exports);


/***/ }),
/* 15 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImageRequirement = void 0;
const enums_1 = __webpack_require__(11);
const class_validator_1 = __webpack_require__(16);
class ImageRequirement {
}
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], ImageRequirement.prototype, "width", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], ImageRequirement.prototype, "height", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], ImageRequirement.prototype, "quality", void 0);
__decorate([
    class_validator_1.IsEnum(enums_1.ImageType),
    __metadata("design:type", typeof (_a = typeof enums_1.ImageType !== "undefined" && enums_1.ImageType) === "function" ? _a : Object)
], ImageRequirement.prototype, "format", void 0);
exports.ImageRequirement = ImageRequirement;


/***/ }),
/* 16 */
/***/ ((module) => {

module.exports = require("class-validator");;

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImageResult = void 0;
const _1 = __webpack_require__(14);
class ImageResult extends _1.ImageRequirement {
}
exports.ImageResult = ImageResult;


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CropOptions = void 0;
class CropOptions {
}
exports.CropOptions = CropOptions;


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImageOptions = void 0;
class ImageOptions {
}
exports.ImageOptions = ImageOptions;


/***/ }),
/* 20 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FilesService = void 0;
const common_1 = __webpack_require__(3);
const date_fns_1 = __webpack_require__(21);
const app_root_path_1 = __webpack_require__(22);
const fs_extra_1 = __webpack_require__(23);
let FilesService = class FilesService {
    async saveFile(file) {
        const dateFolder = date_fns_1.format(new Date(), 'yyyy-MM-dd');
        const uploadFolder = `${app_root_path_1.path}/uploads/${dateFolder}`;
        await fs_extra_1.ensureDir(uploadFolder);
        await fs_extra_1.writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
        return { url: `/uploads/${dateFolder}/${file.originalname}`, name: file.originalname };
    }
};
FilesService = __decorate([
    common_1.Injectable()
], FilesService);
exports.FilesService = FilesService;


/***/ }),
/* 21 */
/***/ ((module) => {

module.exports = require("date-fns");;

/***/ }),
/* 22 */
/***/ ((module) => {

module.exports = require("app-root-path");;

/***/ }),
/* 23 */
/***/ ((module) => {

module.exports = require("fs-extra");;

/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MFile = void 0;
class MFile {
    constructor(file) {
        this.originalname = file.originalname;
        this.buffer = file.buffer;
    }
}
exports.MFile = MFile;


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PayloadDto = void 0;
class PayloadDto {
}
exports.PayloadDto = PayloadDto;


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRMQConfig = void 0;
const getRMQConfig = (configService) => ({
    exchangeName: configService.get('AMQP_EXCHANGE'),
    connections: [
        {
            login: configService.get('AMQP_USER'),
            password: configService.get('AMQP_PASSWORD'),
            host: configService.get('AMQP_HOSTNAME'),
        },
    ],
    serviceName: 'api'
});
exports.getRMQConfig = getRMQConfig;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const api_module_1 = __webpack_require__(2);
async function bootstrap() {
    const app = await core_1.NestFactory.create(api_module_1.ApiModule);
    app.enableCors();
    await app.listen(3000);
}
bootstrap();

})();

/******/ })()
;