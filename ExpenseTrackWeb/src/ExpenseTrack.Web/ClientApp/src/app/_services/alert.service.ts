import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { AlertType } from '../_enums/alert.enum';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterNavigationChange: boolean;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          this.keepAfterNavigationChange = false; // keep only for one navigation
        } else {
          this.subject.next();
        }
      }
    })
  }

  public success(message: string, keepAfterNavigationChange: boolean = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: AlertType.success, message: message });
  }

  public error(message: string, keepAfterNavigationChange: boolean = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: AlertType.error, message: message });
  }

  public onMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
