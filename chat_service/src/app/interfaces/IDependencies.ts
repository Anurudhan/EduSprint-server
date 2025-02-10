
import { IRepository } from "./IRepository";
import { IUsecase } from "./IUsecase";

export interface IDependencies{
    usecases:IUsecase;
    repository:IRepository;
}