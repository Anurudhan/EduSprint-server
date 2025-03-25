import { ICreateBannerUseCase } from "../../domain/IUseCases/ICreateBannerUseCase";
import { IDeleteBannerUseCase } from "../../domain/IUseCases/IDeleteBannerUseCase";
import { IGetActiveBannerUseCase } from "../../domain/IUseCases/IGetActiveBannerUseCase";
import { IGetAllInstructorsUseCase } from "../../domain/IUseCases/IGetAllInstructorsUseCase";
import {  IGetAllStudentsUsecase } from "../../domain/IUseCases/IGetAllStudentsUsecase";
import { IGetBannersUseCase } from "../../domain/IUseCases/IGetBannersUseCase";
import { IUpdateBannerUseCase } from "../../domain/IUseCases/IUpdateBannerUseCase";
import { IUpdateUserProfileUseCase } from "../../domain/IUseCases/IUpdateUserUseCase";
import { IDependencies } from "./IDependencies";

export interface IUseCases{
    getAllInstructorsUseCase: (dependencies: IDependencies) => IGetAllInstructorsUseCase
    getAllStudentsUsecase: (dependencies: IDependencies) => IGetAllStudentsUsecase;
    updateUserProfileUseCase:(dependencies: IDependencies) => IUpdateUserProfileUseCase;
    getBannersUseCase:(dependencies: IDependencies) => IGetBannersUseCase;
    createBannerUseCase:(dependencies: IDependencies) => ICreateBannerUseCase;
    updateBannerUseCase:(dependencies: IDependencies) => IUpdateBannerUseCase;
    deleteBannerUseCase:(dependencies: IDependencies) => IDeleteBannerUseCase;
    getActiveBannersUseCase:(dependencies:IDependencies) => IGetActiveBannerUseCase;
}