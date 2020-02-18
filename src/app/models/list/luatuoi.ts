export class LuaTuoi{
    Id: number;
    TenLuaTuoi: string;
    MaLuaTuoi: string;

    constructor(Id: number, MaLuaTuoi:string ,TenLuaTuoi: string){
        this.Id = Id;
        this.TenLuaTuoi = TenLuaTuoi;
        this.MaLuaTuoi = MaLuaTuoi;
    }
}