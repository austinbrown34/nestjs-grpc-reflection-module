import { Observable } from 'rxjs';
import { GrpcOptions } from '@nestjs/microservices';
import { ServerReflectionController, ServerReflectionRequest, ServerReflectionResponse } from './proto/grpc/reflection/v1alpha/reflection';
import { GrpcReflectionService } from './grpc-reflection.service';
export declare class GrpcReflectionController implements ServerReflectionController {
    private readonly grpcConfig;
    private readonly grpcReflectionService;
    constructor(grpcConfig: GrpcOptions, grpcReflectionService: GrpcReflectionService);
    serverReflectionInfo(request$: Observable<ServerReflectionRequest>): Observable<ServerReflectionResponse>;
}
