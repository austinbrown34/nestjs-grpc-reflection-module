"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReflectionToGrpcConfig = void 0;
const grpc_reflection_constants_1 = require("./grpc-reflection.constants");
const addReflectionToGrpcConfig = (config) => {
    const protoPath = Array.isArray(config.options.protoPath)
        ? config.options.protoPath
        : [config.options.protoPath];
    const pkg = Array.isArray(config.options.package)
        ? config.options.package
        : [config.options.package];
    return Object.assign(Object.assign({}, config), { options: Object.assign(Object.assign({}, config.options), { protoPath: [...protoPath, grpc_reflection_constants_1.REFLECTION_PROTO], package: [...pkg, grpc_reflection_constants_1.REFLECTION_PACKAGE] }) });
};
exports.addReflectionToGrpcConfig = addReflectionToGrpcConfig;
//# sourceMappingURL=utils.js.map