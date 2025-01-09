import { IRepositories } from "./IRepositries";
import { IUseCases } from "./IUseCase";

export interface IDependencies{
    repositories:IRepositories,
    useCases:IUseCases
}