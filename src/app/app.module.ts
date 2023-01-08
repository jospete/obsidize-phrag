import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
	bootstrap: [AppComponent],
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: !isDevMode(),
			// Register the ServiceWorker as soon as the application is stable
			// or after 3 seconds (whichever comes first).
			registrationStrategy: 'registerWhenStable:3000'
		})
	],
	providers: []
})
export class AppModule {
}
