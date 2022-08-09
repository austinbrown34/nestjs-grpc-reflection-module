"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GrpcReflectionModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrpcReflectionModule = void 0;
const common_1 = require("@nestjs/common");
const grpc_reflection_controller_1 = require("./grpc-reflection.controller");
const grpc_reflection_constants_1 = require("./grpc-reflection.constants");
const grpc_reflection_service_1 = require("./grpc-reflection.service");
let GrpcReflectionModule = GrpcReflectionModule_1 = class GrpcReflectionModule {
    static register(grpcOptions) {
        return {
            module: GrpcReflectionModule_1,
            controllers: [grpc_reflection_controller_1.GrpcReflectionController],
            providers: [
                grpc_reflection_service_1.GrpcReflectionService,
                {
                    provide: grpc_reflection_constants_1.GRPC_CONFIG_PROVIDER_TOKEN,
                    useValue: grpcOptions,
                },
            ],
        };
    }
};
GrpcReflectionModule = GrpcReflectionModule_1 = __decorate([
    (0, common_1.Module)({})
], GrpcReflectionModule);
exports.GrpcReflectionModule = GrpcReflectionModule;
//# sourceMappingURL=grpc-reflection.module.js.map