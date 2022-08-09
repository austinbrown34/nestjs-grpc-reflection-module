import * as grpc from '@grpc/grpc-js';
import { OnModuleInit } from '@nestjs/common';
import { GrpcOptions } from '@nestjs/microservices';
import { FileDescriptorResponse, ListServiceResponse } from './proto/grpc/reflection/v1alpha/reflection';
export declare class ReflectionError extends Error {
    readonly statusCode: grpc.status;
    readonly message: string;
    constructor(statusCode: grpc.status, message: string);
}
export declare class GrpcReflectionService implements OnModuleInit {
    private readonly grpcConfig;
    private readonly logger;
    private fileDescriptorSet;
    private packageDefinitions;
    constructor(grpcConfig: GrpcOptions);
    onModuleInit(): Promise<void>;
    listServices(listServices: string): ListServiceResponse;
    fileContainingSymbol(symbol: string): FileDescriptorResponse;
    fileByFilename(filename: string): FileDescriptorResponse;
}
