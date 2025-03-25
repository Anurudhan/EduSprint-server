

export interface IDeleteBannerUseCase {
    execute(bannerId:string): Promise <boolean>
}