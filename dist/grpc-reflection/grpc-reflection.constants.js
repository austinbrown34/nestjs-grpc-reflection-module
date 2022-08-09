"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GRPC_CONFIG_PROVIDER_TOKEN = exports.REFLECTION_PACKAGE = exports.REFLECTION_PROTO = void 0;
const path_1 = require("path");
const reflection_1 = require("./proto/grpc/reflection/v1alpha/reflection");
exports.REFLECTION_PROTO = (0, path_1.join)(__dirname, './proto/grpc/reflection/v1alpha/reflection.proto');
exports.REFLECTION_PACKAGE = reflection_1.protobufPackage;
exports.GRPC_CONFIG_PROVIDER_TOKEN = 'GRPC_CONFIG_OPTIONS';
//# sourceMappingURL=grpc-reflection.constants.js.map