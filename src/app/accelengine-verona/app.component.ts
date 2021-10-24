import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

// Helpers
import { APP_CONFIG } from '@app/app.config';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    inputStyle = 'outlined';

    ripple: boolean;

    theme = 'blue';

    layout = 'blue';

    public menuMode = 'horizontal';

    constructor(
        private primengConfig: PrimeNGConfig,
        private translate: TranslateService) {
        translate.setDefaultLang(APP_CONFIG.app.defaultLanguage);
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.ripple = true;

        this.translate.get([
            "filter.startsWith", "filter.endsWith", "filter.contains", "filter.notContains", "filter.equals",
            "filter.notEquals", "filter.lt", "filter.lte", "filter.gt", "filter.gte", "filter.isNot", "filter.before", "filter.after",
            "filter.matchAll", "filter.matchAny", "filter.clear", "filter.addRule", "filter.apply", "filter.removeRule",
            "filter.noFilter"
        ]).subscribe((res) => {
            this.primengConfig.setTranslation({ startsWith: res["filter.startsWith"] });
            this.primengConfig.setTranslation({ endsWith: res["filter.endsWith"] });
            this.primengConfig.setTranslation({ contains: res["filter.contains"] });
            this.primengConfig.setTranslation({ notContains: res["filter.notContains"] });
            this.primengConfig.setTranslation({ equals: res["filter.equals"] });
            this.primengConfig.setTranslation({ notEquals: res["filter.notEquals"] });
            this.primengConfig.setTranslation({ lt: res["filter.lt"] });
            this.primengConfig.setTranslation({ lte: res["filter.lte"] });
            this.primengConfig.setTranslation({ gt: res["filter.gt"] });
            this.primengConfig.setTranslation({ gte: res["filter.gte"] });
            this.primengConfig.setTranslation({ isNot: res["filter.isNot"] });
            this.primengConfig.setTranslation({ before: res["filter.before"] });
            this.primengConfig.setTranslation({ after: res["filter.after"] });
            this.primengConfig.setTranslation({ matchAll: res["filter.matchAll"] });
            this.primengConfig.setTranslation({ matchAny: res["filter.matchAny"] });
            this.primengConfig.setTranslation({ clear: res["filter.clear"] });
            this.primengConfig.setTranslation({ addRule: res["filter.addRule"] });
            this.primengConfig.setTranslation({ apply: res["filter.apply"] });
            this.primengConfig.setTranslation({ removeRule: res["filter.removeRule"] });
            this.primengConfig.setTranslation({ noFilter: res["filter.noFilter"] });
        });
    }
}
