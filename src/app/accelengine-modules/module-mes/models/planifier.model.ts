export class PlanifierModel {  

    nbr:number
    lot:number
    op:number

    constructor(datamodule: any = null) {
        if (datamodule != null) {
            // models : data
            this.nbr = datamodule.zzgantt_nbr ? datamodule.zzgantt_nbr : '';
            this.lot = datamodule.zzgantt_lot ? datamodule.zzgantt_lot : '';
            this.op = datamodule.zzgantt_op ? datamodule.zzgantt_op : '';
        }

    }
    static fromMany(datas: any) {
        let bobine = [];
        datas.forEach(data => {
            bobine.push(new PlanifierModel(data));
        });
        return bobine;
    }
}

