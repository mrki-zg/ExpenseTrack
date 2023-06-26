import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subject ,  Observable } from 'rxjs';

import { AlertType } from '../alert/_enums/alert.enum';

@Injectable()
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterNavigationChange: boolean;
  private clearMessageTimeout: any;

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
    this.startClearMessageTimer();
  }

  public error(message: string, keepAfterNavigationChange: boolean = false, errorObj: any = null) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: AlertType.error, message: message, errorObj: errorObj });
    this.startClearMessageTimer();
  }

  public onMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  private startClearMessageTimer() {
    if (this.keepAfterNavigationChange) {
      return;
    }

    if (this.clearMessageTimeout) {
      clearTimeout(this.clearMessageTimeout);
    }
    this.clearMessageTimeout = setTimeout(() => this.subject.next(null), 5000);
  }
}
