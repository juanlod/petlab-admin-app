// src/app/services/websocket.service.ts

import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: WebSocket;
  private messagesSubject = new Subject<any>();

  constructor() {
    this.socket = new WebSocket(`ws://${environment.apiUrl}`);
    this.socket.onmessage = (message) => this.messagesSubject.next(message.data);
  }

  send(message: any): void {
    this.socket.send(JSON.stringify(message));
  }

  get messages$(): Observable<any> {
    return this.messagesSubject.asObservable();
  }
}
