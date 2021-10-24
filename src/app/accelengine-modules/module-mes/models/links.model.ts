export class LinksModel {
    id: number
    source: number
    target: number
    type: number


    constructor(datamodule: any = null) {
        if (datamodule != null) {
            // models : links
            this.id = datamodule.tt_link_id ? datamodule.tt_link_id : '';
            this.source = datamodule.tt_link_source ? datamodule.tt_link_source : '';
            this.target = datamodule.tt_link_target ? datamodule.tt_link_target : '';
            this.type = datamodule.tt_link_type ? datamodule.tt_link_type : '0';
        }

    }
    static fromMany(datas: any) {
        let bobine = [];
        datas.forEach(data => {
            bobine.push(new LinksModel(data));
        });
        return bobine;
    }
}

