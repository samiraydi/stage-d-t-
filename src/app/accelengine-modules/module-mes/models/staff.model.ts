
export class StaffModel {

    key: number
    label:string


    constructor(datamodule: any = null) {
        if (datamodule != null) {
            this.key = datamodule.tt_staff_key ? datamodule.tt_staff_key : '';
            this.label = datamodule.tt_staff_label ? datamodule.tt_staff_label : '';
        }

    }
    static fromMany(datas: any) {
        let bobine = [];
        datas.forEach(data => {
            bobine.push(new StaffModel(data));
        });
        return bobine;
    }
}

