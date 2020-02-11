export class KetQuaChieuSinh{
    IdKQ: number;
    SoThutu:number;
    MaKQ: number;
    KQChieuSinh: string;
    MaMau: string;

    constructor(IdKQ: number, MaKQ: number, KQChieuSinh: string, MaMau: string,SoThutu:number) {
        this.IdKQ = IdKQ;
        this.MaKQ = MaKQ;
        this.KQChieuSinh = KQChieuSinh;
        this.MaMau = MaMau;
        this.SoThutu = SoThutu;
    }
}