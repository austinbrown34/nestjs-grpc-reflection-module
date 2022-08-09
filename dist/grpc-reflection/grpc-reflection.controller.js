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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrpcReflectionController = void 0;
const rxjs_1 = require("rxjs");
const ts_case_convert_1 = require("ts-case-convert");
const grpc = require("@grpc/grpc-js");
const common_1 = require("@nestjs/common");
const reflection_1 = require("./proto/grpc/reflection/v1alpha/reflection");
const grpc_reflection_service_1 = require("./grpc-reflection.service");
const grpc_reflection_constants_1 = require("./grpc-reflection.constants");
let GrpcReflectionController = class GrpcReflectionController {
    constructor(grpcConfig, grpcReflectionService) {
        this.grpcConfig = grpcConfig;
        this.grpcReflectionService = grpcReflectionService;
    }
    serverReflectionInfo(request$) {
        const response$ = new rxjs_1.Subject();
        const onComplete = () => response$.complete();
        const onNext = (rawMsg) => {
            var _a, _b;
            const message = ((_a = this.grpcConfig.options.loader) === null || _a === void 0 ? void 0 : _a.keepCase)
                ? (0, ts_case_convert_1.objectToCamel)(rawMsg)
                : rawMsg;
            const response = {
                validHost: message.host,
                originalRequest: message,
                fileDescriptorResponse: undefined,
                allExtensionNumbersResponse: undefined,
                listServicesResponse: undefined,
                errorResponse: undefined,
            };
            try {
                if (message.listServices) {
                    response.listServicesResponse =
                        this.grpcReflectionService.listServices(message.listServices);
                }
                else if (message.fileContainingSymbol) {
                    response.fileDescriptorResponse =
                        this.grpcReflectionService.fileContainingSymbol(message.fileContainingSymbol);
                }
                else if (message.fileByFilename) {
                    response.fileDescriptorResponse =
                        this.grpcReflectionService.fileByFilename(message.fileByFilename);
                }
                else {
                    throw new grpc_reflection_service_1.ReflectionError(grpc.status.UNIMPLEMENTED, `Unimplemented method for request: ${message}`);
                }
            }
            catch (e) {
                if (e instanceof grpc_reflection_service_1.ReflectionError) {
                    response.errorResponse = {
                        errorCode: e.statusCode,
                        errorMessage: e.message,
                    };
                }
                else {
                    response.errorResponse = {
                        errorCode: grpc.status.UNKNOWN,
                        errorMessage: 'Failed to process gRPC reflection request: unknown error',
                    };
                }
            }
            if ((_b = this.grpcConfig.options.loader) === null || _b === void 0 ? void 0 : _b.keepCase) {
                const convertedResponse = (0, ts_case_convert_1.objectToSnake)(response);
                const fixedConvertedResponse = Object.assign(Object.assign({}, convertedResponse), { file_descriptor_response: convertedResponse.file_descriptor_response
                        ? Object.assign(Object.assign({}, convertedResponse.file_descriptor_response), { file_descriptor_proto: response.fileDescriptorResponse.fileDescriptorProto }) : convertedResponse.file_descriptor_response });
                response$.next(fixedConvertedResponse);
            }
            else {
                response$.next(response);
            }
        };
        request$.subscribe({
            next: onNext,
            complete: onComplete,
        });
        return response$.asObservable();
    }
};
GrpcReflectionController = __decorate([
    (0, common_1.Controller)(reflection_1.protobufPackage),
    (0, reflection_1.ServerReflectionControllerMethods)(),
    __param(0, (0, common_1.Inject)(grpc_reflection_constants_1.GRPC_CONFIG_PROVIDER_TOKEN)),
    __metadata("design:paramtypes", [Object, grpc_reflection_service_1.GrpcReflectionService])
], GrpcReflectionController);
exports.GrpcReflectionController = GrpcReflectionController;
//# sourceMappingURL=grpc-reflection.controller.js.map