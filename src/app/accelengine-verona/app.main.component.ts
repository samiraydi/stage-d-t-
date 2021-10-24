import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

// Component
import { AppComponent } from './app.component';

// Services
import { MenuService } from './app.menu.service';
import { ThemeHelperService } from '@core/utilities/theme.helper.service';

// Helpers
import { APP_CONFIG } from '@app/app.config';
import { LoadingService } from '@app/accelengine-core/services/loading.service';

@Component({
    selector: 'app-main',
    templateUrl: './app.main.component.html'
})
export class AppMainComponent {
    public menuMode = 'horizontal';

    public menuActive = false;

    public topbarMenuActive = false;

    activeTopbarItem: Element;

    menuClick: boolean;

    menuButtonClick: boolean;

    topbarMenuButtonClick: boolean;

    menuHoverActive: boolean;

    configActive: boolean;

    configClick: boolean;

    public loading: boolean;

    constructor(
        private menuService: MenuService,
        private primengConfig: PrimeNGConfig,
        public app: AppComponent,
        private themeHelperService: ThemeHelperService,
        private loadingService: LoadingService) {
        this.app.menuMode = APP_CONFIG.theme.menuMode;
        this.themeHelperService.changeLayout(APP_CONFIG.theme.layout);
        this.themeHelperService.changeTheme(APP_CONFIG.theme.theme);

        this.loadingService.isLoading.subscribe(loading => {
            this.loading = loading;
        });
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }

    onMenuButtonClick(event: Event) {
        this.menuButtonClick = true;
        this.menuActive = !this.menuActive;
        event.preventDefault();
    }

    onTopbarMenuButtonClick(event: Event) {
        this.topbarMenuButtonClick = true;
        this.topbarMenuActive = !this.topbarMenuActive;
        event.preventDefault();
    }

    onTopbarItemClick(event: Event, item: Element) {
        this.topbarMenuButtonClick = true;

        if (this.activeTopbarItem === item) {
            this.activeTopbarItem = null;
        } else {
            this.activeTopbarItem = item;
        }
        event.preventDefault();
    }

    onTopbarSubItemClick(event) {
        event.preventDefault();
    }

    onLayoutClick() {
        if (!this.menuButtonClick && !this.menuClick) {
            if (this.app.menuMode === 'horizontal') {
                this.menuService.reset();
            }

            if (this.isMobile() || this.app.menuMode === 'overlay' || this.app.menuMode === 'popup') {
                this.menuActive = false;
            }

            this.menuHoverActive = false;
        }

        if (!this.topbarMenuButtonClick) {
            this.activeTopbarItem = null;
            this.topbarMenuActive = false;
        }

        if (this.configActive && !this.configClick) {
            this.configActive = false;
        }

        this.configClick = false;
        this.menuButtonClick = false;
        this.menuClick = false;
        this.topbarMenuButtonClick = false;
    }

    onRippleChange(event) {
        this.app.ripple = event.checked;
    }

    onConfigClick(event) {
        this.configClick = true;
    }

    onMenuClick() {
        this.menuClick = true;
    }

    isMobile() {
        return window.innerWidth < 1025;
    }

    isHorizontal() {
        return this.app.menuMode === 'horizontal';
    }

    isTablet() {
        const width = window.innerWidth;
        return width <= 1024 && width > 640;
    }
}
