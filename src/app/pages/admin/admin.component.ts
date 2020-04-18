import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: [
  ]
})
export class AdminComponent implements OnInit {

  @Input() empresas: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
