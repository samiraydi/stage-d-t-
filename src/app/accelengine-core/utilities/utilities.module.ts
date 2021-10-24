import { NgModule, ModuleWithProviders } from "@angular/core";
import { ThemeHelperService } from './theme.helper.service';

@NgModule()
export class UtilitiesModule {
  static forRoot(): ModuleWithProviders<{}> {
    return {
      ngModule: UtilitiesModule,

      providers: [
        ThemeHelperService,
      ]
    };
  }
}