import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-demo1',
  templateUrl: './demo1.component.html',
  styleUrls: ['./demo1.component.scss']
})
export class Demo1Component implements OnInit {
  data: any = {
	title: 'Quotations List',
	items: [
		{
			name: 'PC Phong Vu',
			cost: 50000000
		},
		{
			name: 'PC Phong Hue',
			cost: 40000000
		},
		{
			name: 'Keyborad Blue',
			cost: 500000
		}
	]
};
  constructor() {
  
  }

  ngOnInit() {
  }


}
