import { AEAuditingEntity } from 'accelengine-lib';

export class Bobine extends AEAuditingEntity {

    of: string;
    idBobine: string;
    statut: string;
    article: string;
    description: string;
    um: string;
    grammage: number;
    diametre: number;
    laize: number;
    poidsMoyen: number;
    metrage: number;
    nbDevidoir: number;


    constructor(bobine: any = null) {
        super();
        if (bobine != null) {
            this.of = bobine.optt_wo_nbr ? bobine.optt_wo_nbr : '';
            this.idBobine = bobine.optt_wo_lot ? bobine.optt_wo_lot : '';
            this.statut = bobine.optt_wo_status ? bobine.optt_wo_status : '';
            this.article = bobine.optt_wo_part ? bobine.optt_wo_part : '';
            this.description = bobine.optt_wo_desc ? bobine.optt_wo_desc : '';
            this.um = bobine.optt_wo_um ? bobine.optt_wo_um : '';
            this.grammage = bobine.optt_grammage ? bobine.optt_grammage : 0;
            this.diametre = bobine.optt_diam ? bobine.optt_diam : 0;
            this.laize = bobine.optt_laize ? bobine.optt_laize : 0;
            this.poidsMoyen = bobine.optt_poid_moy ? bobine.optt_poid_moy : 0;
            this.nbDevidoir = bobine.optt_nb_dev ? bobine.optt_nb_dev : 0;
        }

    }
    static fromMany(datas: any) {
        let bobine = [];
        datas.forEach(data => {
            bobine.push(new Bobine(data));
        });
        return bobine;
    }
}