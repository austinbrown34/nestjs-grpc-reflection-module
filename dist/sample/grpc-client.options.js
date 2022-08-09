"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.grpcClientOptions = void 0;
const microservices_1 = require("@nestjs/microservices");
const path_1 = require("path");
const utils_1 = require("../grpc-reflection/utils");
exports.grpcClientOptions = (0, utils_1.addReflectionToGrpcConfig)({
    transport: microservices_1.Transport.GRPC,
    options: {
        package: 'sample',
        protoPath: (0, path_1.join)(__dirname, './proto/sample.proto'),
        loader: {
            oneofs: true,
            includeDirs: [(0, path_1.join)(__dirname, './proto/vendor/')],
        },
    },
});
//# sourceMappingURL=grpc-client.options.js.map