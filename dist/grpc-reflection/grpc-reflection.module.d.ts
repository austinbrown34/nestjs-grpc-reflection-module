import { DynamicModule } from '@nestjs/common';
import { GrpcOptions } from '@nestjs/microservices';
export declare class GrpcReflectionModule {
    static register(grpcOptions: GrpcOptions): DynamicModule;
}
