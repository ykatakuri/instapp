import { Injectable } from '@angular/core';
import {
  getToken,
  MessagePayload,
  Messaging,
  onMessage,
} from '@angular/fire/messaging';
import { EMPTY, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationsServiceService {
  public message$: Observable<any> = EMPTY;
  constructor(private messaging: Messaging) {
    this.init();
  }
  private async init() {
    try {
      const serviceWorkerRegistration = await navigator.serviceWorker.register(
        'firebase-messaging-sw.js',
        { type: 'module', scope: '__' }
      );
      const token = await getToken(this.messaging, {
        serviceWorkerRegistration,
        vapidKey: environment.publicVAPID,
      });
      console.log('TOKEN : ', { token });
      this.message$ = new Observable((sub) =>
        onMessage(this.messaging, (payload) => sub.next(payload))
      ).pipe(tap((payload) => this.createNotification(payload)));
      this.message$.subscribe();
    } catch (error) {
      console.log(error);
    }
  }
  public async generateNotification(
    title: string,
    body: string
  ): Promise<void> {
    try {
      const registration = await navigator.serviceWorker.ready;
      registration.showNotification(title, { body });
    } catch (error) {
      console.log('ERROR NOTIFICATION : ', error);
    }
  }
  private async createNotification(payload: MessagePayload): Promise<void> {
    try {
      const registration = await navigator.serviceWorker.ready;
      if (payload.notification && payload.notification.title) {
        registration.showNotification(payload.notification.title, {
          ...payload.notification,
        });
      }
    } catch (error) {
      console.log('ERROR NOTIFICATION : ', error);
    }
  }
}
