"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReflectionToGrpcConfig = exports.REFLECTION_PROTO = exports.REFLECTION_PACKAGE = exports.GrpcReflectionModule = void 0;
var grpc_reflection_module_1 = require("./grpc-reflection.module");
Object.defineProperty(exports, "GrpcReflectionModule", { enumerable: true, get: function () { return grpc_reflection_module_1.GrpcReflectionModule; } });
var grpc_reflection_constants_1 = require("./grpc-reflection.constants");
Object.defineProperty(exports, "REFLECTION_PACKAGE", { enumerable: true, get: function () { return grpc_reflection_constants_1.REFLECTION_PACKAGE; } });
Object.defineProperty(exports, "REFLECTION_PROTO", { enumerable: true, get: function () { return grpc_reflection_constants_1.REFLECTION_PROTO; } });
var utils_1 = require("./utils");
Object.defineProperty(exports, "addReflectionToGrpcConfig", { enumerable: true, get: function () { return utils_1.addReflectionToGrpcConfig; } });
//# sourceMappingURL=index.js.map