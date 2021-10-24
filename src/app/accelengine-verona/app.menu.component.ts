import { Component, OnInit } from '@angular/core';
import { each } from 'lodash';

// Models
import { Account } from '@core/models/account.model';
import { Menu } from '@core/models/menu.model';

// Component
import { AppMainComponent } from './app.main.component';

// Services
import { StorageService } from '@core/services/storage.service';
import { MainMenuService } from '@core/services/mainmenu.service';

// Helpers
import { APP_CONFIG } from '@app/app.config';

// data
import *  as  datas from '../../assets/data.json';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    styleUrls: ['./app.menu.component.scss'],
})
export class AppMenuComponent implements OnInit {

    public account: Account;
    public mainMenus: Menu[] = [];

    // filtred
    public searchMenu: string;
    public filtredMenus: any[] = [];

    constructor(
        public app: AppMainComponent,
        private storageService: StorageService,
        private mainMenuService: MainMenuService) {
    }

    ngOnInit() {

        this.account = this.storageService.getCurentAccount();
        if (APP_CONFIG.QADBackend) {
            if (datas.menus) {
                this.mainMenus = datas.menus.datas as Menu[];
            }
            this.filtredMenus = this.creatMenus(this.mainMenus);
            
        } else {
            this.mainMenuService.getMainMenu().subscribe(result => {
                if (result) {
                    this.mainMenus = result.datas;
                    this.filtredMenus = this.creatMenus(this.mainMenus);
                }
            });
        }
    }

    creatMenus(menus: Menu[]) {
        let model: any = [];
        menus.forEach(menu => {
            let m: any = this.creatMenu(menu);
            model.push(m);
        });
        return model;
    }

    creatMenu(menu: Menu): any {
        let items;
        if (menu.menus) {
            items = this.creatMenus(menu.menus);
            return { label: menu.label, icon: menu.icon, routerLink: [menu.url], items: items }
        }
        return { label: menu.label, icon: menu.icon, routerLink: [menu.url] }
    }

    onFilterChanged() {
        if (this.searchMenu.length > 0) {
            this.filtredMenus = [];
            this.filter(this.searchMenu.toLowerCase(), this.mainMenus);
        } else {
            this.filtredMenus = this.creatMenus(this.mainMenus);
        }
    }

    filter(searchMenu: string, menus: Menu[]) {
        const self = this;
        each(menus, (menu: Menu) => {
            if (menu.menus == null) {
                if (menu.code.toLowerCase().includes(searchMenu) || menu.label.toLowerCase().includes(searchMenu)) {
                    self.filtredMenus.push(self.creatMenu(menu));
                }
            } else {
                self.filter(searchMenu, menu.menus);
            }
        });
    }

}
