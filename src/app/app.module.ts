import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { CharsetComponent } from './components/charset/charset.component';

@NgModule({
	bootstrap: [AppComponent],
	declarations: [AppComponent, CharsetComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		MatIconModule,
		CommonModule,
		FormsModule,
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production,
			registrationStrategy: 'registerWhenStable:30000'
		}),
	],
	providers: []
})
export class AppModule {
}
