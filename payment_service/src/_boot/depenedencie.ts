import * as repositories from "../infrastructure/database/repositories";
import * as useCases from "../application/useCases";
import { IDependencies } from "../application/interface/IDependencie";

export const dependencie:IDependencies={
    repositories,
    useCases
}