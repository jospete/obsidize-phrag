import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';

@NgModule({
	bootstrap: [AppComponent],
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production
		})
	],
	providers: []
})
export class AppModule {
}
