export class DatasModel {
    id: number
    text: string
    start_date: Date
    duration: number
    progress: number
    owner_id: string
    priority: number
    parent: number
    type: string
    nbr:string
    part:string
    lot:string
    op:string
    calendar_id:string

    constructor(datamodule: any = null) {
        if (datamodule != null) {
            // models : data
            this.id = datamodule.tt_gantt_id ? datamodule.tt_gantt_id : '';
            this.nbr = datamodule.tt_gantt_nbr ? datamodule.tt_gantt_nbr : '';
            this.lot = datamodule.tt_gantt_lot ? datamodule.tt_gantt_lot : '';
            this.op = datamodule.tt_gantt_op ? datamodule.tt_gantt_op : '';
            this.owner_id = datamodule.tt_gantt_owner_id ? datamodule.tt_gantt_owner_id : 0;
            this.text = datamodule.tt_gantt_desc ? datamodule.tt_gantt_desc : '';
            this.start_date = datamodule.tt_gantt_start ? datamodule.tt_gantt_start : '';
            this.duration = datamodule.tt_gantt_dur ? datamodule.tt_gantt_dur : '';
            this.progress = datamodule.tt_gantt_progress ? datamodule.tt_gantt_progress : '';
            this.calendar_id = datamodule.tt_gantt_calendar ? datamodule.tt_gantt_calendar : '';
            // this.priority = datamodule.tt_gantt_priority ? datamodule.tt_gantt_priority : '';
            this.parent = datamodule.tt_gantt_parent ? datamodule.tt_gantt_parent : '';
            this.type = datamodule.tt_gantt_type ? datamodule.tt_gantt_type : '';
        }

    }
    static fromMany(datas: any) {
        let bobine = [];
        datas.forEach(data => {
            bobine.push(new DatasModel(data));
        });
        return bobine;
    }
}

