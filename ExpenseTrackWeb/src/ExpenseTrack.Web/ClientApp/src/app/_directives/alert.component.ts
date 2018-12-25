import { Component, OnInit } from '@angular/core';

import { AlertService } from './../_services/alert.service';
import { AlertType } from './../_enums/alert.enum';

@Component({
  selector: 'alert',
  templateUrl: 'alert.component.html',
  styleUrls: ['alert.component.css']
})
export class AlertComponent implements OnInit {

  message: any;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.onMessage().subscribe(msg => {
      this.message = msg;
    })
  }

  isSuccess() {
    return this.message.type === AlertType.success;
  }

  isError() {
    return this.message.type === AlertType.error;
  }
}
