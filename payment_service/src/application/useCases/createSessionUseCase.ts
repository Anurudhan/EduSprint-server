import { SessionEntity } from "../../domain/entities";
import { IDependencies } from "../interface/IDependencie";

export const createSessionUseCase = (dependencies: IDependencies) => {

    const {
        repositories: { createSession }
    } = dependencies;

    return {
        execute: async (data: SessionEntity) => {
            return await createSession(data);
        }
    }
};