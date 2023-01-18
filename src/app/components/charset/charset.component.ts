import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-charset',
	templateUrl: './charset.component.html',
	styleUrls: ['./charset.component.css']
})
export class CharsetComponent {
	@Input() chars: string[] = [];
}
