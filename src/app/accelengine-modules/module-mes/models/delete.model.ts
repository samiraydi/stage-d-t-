export class DeleteModel {
    
    nbr:number
    lot:number
    op:number
    
    

    constructor(datamodule: any = null) {
        if (datamodule != null) {
            
            this.nbr = datamodule.zzgantt_nbr ? datamodule.zzgantt_nbr : '';
            this.lot = datamodule.zzgantt_lot ? datamodule.zzgantt_lot : '';
            this.op = datamodule.zzgantt_op ? datamodule.zzgantt_op : '';
            
        }

    }
    static fromMany(datas: any) {
        let bobine = [];
        datas.forEach(data => {
            bobine.push(new DeleteModel(data));
        });
        return bobine;
    }
}

