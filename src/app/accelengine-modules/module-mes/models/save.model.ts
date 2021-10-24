export class SaveModel {
    
    text: string
    owner_id: number
    start_date: Date
    duration: number

    nbr:number
    lot:number
    op:number
    
    

    constructor(datamodule: any = null) {
        if (datamodule != null) {
            // models : data
            this.text = datamodule.tt_gantt_desc ? datamodule.tt_gantt_desc : '';
            this.owner_id = datamodule.tt_gantt_owner_id ? datamodule.tt_gantt_owner_id : 0;
            this.start_date = datamodule.tt_gantt_start ? datamodule.tt_gantt_start : '';
            this.duration = datamodule.tt_gantt_dur ? datamodule.tt_gantt_dur : '';
            
            this.nbr = datamodule.tt_gantt_nbr ? datamodule.tt_gantt_nbr : '';
            this.lot = datamodule.tt_gantt_lot ? datamodule.tt_gantt_lot : '';
            this.op = datamodule.tt_gantt_op ? datamodule.tt_gantt_op : '';
            
        }

    }
    static fromMany(datas: any) {
        let bobine = [];
        datas.forEach(data => {
            bobine.push(new SaveModel(data));
        });
        return bobine;
    }
}

