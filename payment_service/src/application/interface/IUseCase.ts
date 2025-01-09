import { ICreatePaymentUseCase, ICreateSessionUseCase, IGetAllPaymentsUseCase, IGetPaymentsByUserId } from "../../domain/IUseCases";
import { IDependencies } from "./IDependencie";

  
  export interface IUseCases {
    createSessionUseCase: (dependencies: IDependencies) => ICreateSessionUseCase;
    createPaymentUseCase: (dependencies: IDependencies) => ICreatePaymentUseCase;
    getAllPaymentUseCase: (dependencies: IDependencies) => IGetAllPaymentsUseCase;
    getPaymentsUserIdUseCase:(dependencies: IDependencies) => IGetPaymentsByUserId;
  }
  