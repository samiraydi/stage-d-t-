import { Data } from "@angular/router"

export class wrModel {
    nbr: string
    lot: string
    op: number
    part:string
    wkctr:string
    mch:string
    run:number
    setup:number
    move:number
    start:Date
    due:Data
    qty_ord:number
    qty_comp:number
    qty_rjct:number
    qty_rwrk:number
    dur:number
    Calendar:string

    constructor(datamodule: any = null) {
        if (datamodule != null) {
            this.nbr = datamodule.tt_wr_nbr ? datamodule.tt_wr_nbr : '';
            this.lot = datamodule.tt_wr_lot ? datamodule.tt_wr_lot : '';
            this.op = datamodule.tt_wr_op ? datamodule.tt_wr_op : '';
            this.part = datamodule.tt_wr_part ? datamodule.tt_wr_part : '';
            this.wkctr = datamodule.tt_wr_wkctr ? datamodule.tt_wr_wkctr : '';
            this.mch = datamodule.tt_wr_mch ? datamodule.tt_wr_mch : '';
            this.run = datamodule.tt_wr_run ? datamodule.tt_wr_run : '';
            this.setup = datamodule.tt_wr_setup ? datamodule.tt_wr_setup : '';
            this.move = datamodule.tt_wr_move ? datamodule.tt_wr_move : '';
            this.start = datamodule.tt_wr_start ? datamodule.tt_wr_start : '';
            this.due = datamodule.tt_wr_due ? datamodule.tt_wr_due : '';
            this.qty_ord = datamodule.tt_wr_qty_ord ? datamodule.tt_wr_qty_ord : '';
            this.qty_comp = datamodule.tt_wr_qty_comp ? datamodule.tt_wr_qty_comp : '';
            this.qty_rjct = datamodule.tt_wr_qty_rjct ? datamodule.tt_wr_qty_rjct : '';
            this.qty_rwrk = datamodule.tt_wr_qty_rwrk ? datamodule.tt_wr_qty_rwrk : '';
            this.dur = datamodule.tt_wr_dur ? datamodule.tt_wr_dur : '';
            this.Calendar = datamodule.tt_wr_calendar ? datamodule.tt_wr_calendar : '';
        }

    }
    static fromMany(datas: any) {
        let bobine = [];
        datas.forEach(data => {
            bobine.push(new wrModel(data));
        });
        return bobine;
    }
}

