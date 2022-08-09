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
var GrpcReflectionService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrpcReflectionService = exports.ReflectionError = void 0;
const descriptor_pb_1 = require("google-protobuf/google/protobuf/descriptor_pb");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const common_1 = require("@nestjs/common");
const grpc_reflection_constants_1 = require("./grpc-reflection.constants");
class ReflectionError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.ReflectionError = ReflectionError;
const isMessageDefinition = (def) => {
    return def.format === 'Protocol Buffer 3 DescriptorProto';
};
const isEnumDefinition = (def) => {
    return def.format === 'Protocol Buffer 3 EnumDescriptorProto';
};
const findSymbol = (symbolToFind, pkg) => {
    const symbol = Object.entries(pkg).find(([name, _def]) => name === symbolToFind);
    return symbol ? symbol[1] : null;
};
let GrpcReflectionService = GrpcReflectionService_1 = class GrpcReflectionService {
    constructor(grpcConfig) {
        this.grpcConfig = grpcConfig;
        this.logger = new common_1.Logger(GrpcReflectionService_1.name);
        this.fileDescriptorSet = new descriptor_pb_1.FileDescriptorSet();
    }
    async onModuleInit() {
        const { protoPath, loader } = this.grpcConfig.options;
        const protoFiles = Array.isArray(protoPath) ? protoPath : [protoPath];
        this.packageDefinitions = await Promise.all(protoFiles.map((file) => protoLoader.load(file, loader)));
        this.packageDefinitions.map((packageDefinition) => {
            Object.values(packageDefinition).forEach(({ fileDescriptorProtos }) => {
                if (Array.isArray(fileDescriptorProtos)) {
                    fileDescriptorProtos.forEach((bin) => {
                        const proto = descriptor_pb_1.FileDescriptorProto.deserializeBinary(bin);
                        const isFileInSet = this.fileDescriptorSet
                            .getFileList()
                            .map((f) => f.getName())
                            .includes(proto.getName());
                        if (!isFileInSet) {
                            this.fileDescriptorSet.addFile(proto);
                        }
                    });
                }
            });
        });
    }
    listServices(listServices) {
        this.logger.debug(`listServices called with filter ${listServices}`);
        const services = this.fileDescriptorSet
            .getFileList()
            .map((file) => file
            .getServiceList()
            .map((service) => `${file.getPackage()}.${service.getName()}`))
            .flat();
        this.logger.debug(`listServices found services: ${services.join(', ')}`);
        return { service: services.map((service) => ({ name: service })) };
    }
    fileContainingSymbol(symbol) {
        this.logger.debug(`fileContainingSymbol called for symbol ${symbol}`);
        const definition = this.packageDefinitions
            .map((pkg) => findSymbol(symbol, pkg))
            .flat()
            .find((result) => !!result);
        if (!definition) {
            this.logger.error(`fileContainingSymbol failed to find symbol ${symbol}`);
            throw new ReflectionError(grpc.status.NOT_FOUND, `Symbol not found: ${symbol}`);
        }
        if (isMessageDefinition(definition) || isEnumDefinition(definition)) {
            const fileNames = definition.fileDescriptorProtos.map((f) => descriptor_pb_1.FileDescriptorProto.deserializeBinary(f).getName());
            this.logger.debug(`fileContainingSymbol found files: ${fileNames.join(', ')}`);
            return { fileDescriptorProto: definition.fileDescriptorProtos };
        }
        const fileDescriptorProtos = Object.entries(definition)
            .map(([, method]) => [
            ...method.requestType.fileDescriptorProtos,
            ...method.responseType.fileDescriptorProtos,
        ].map((bin) => descriptor_pb_1.FileDescriptorProto.deserializeBinary(bin)))
            .flat();
        const dedupedFileDescriptorProtos = Object.values(fileDescriptorProtos.reduce((acc, proto) => (Object.assign(Object.assign({}, acc), { [proto.getName()]: proto })), {}));
        this.logger.debug(`fileContainingSymbol found files: ${dedupedFileDescriptorProtos.map((f) => f.getName())}`);
        return {
            fileDescriptorProto: dedupedFileDescriptorProtos.map((f) => f.serializeBinary()),
        };
    }
    fileByFilename(filename) {
        this.logger.debug(`fileByFilename called with filename ${filename}`);
        const fileDescriptorProtos = this.fileDescriptorSet
            .getFileList()
            .filter((file) => file.getName() === filename);
        if (fileDescriptorProtos.length === 0) {
            throw new ReflectionError(grpc.status.NOT_FOUND, `Proto file not found: ${filename}`);
        }
        return {
            fileDescriptorProto: fileDescriptorProtos.map((f) => f.serializeBinary()),
        };
    }
};
GrpcReflectionService = GrpcReflectionService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(grpc_reflection_constants_1.GRPC_CONFIG_PROVIDER_TOKEN)),
    __metadata("design:paramtypes", [Object])
], GrpcReflectionService);
exports.GrpcReflectionService = GrpcReflectionService;
//# sourceMappingURL=grpc-reflection.service.js.map