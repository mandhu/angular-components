import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


// "ng-thaana": "^1.0.0",
//   "ngx-mat-select-search": "^3.2.0",
//   "ngx-mat-slide-panel": "1.0.0",
//   "ngx-thaana-input": "0.0.2",
