import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: Socket;
  private messagesSubject = new Subject<any>();

  constructor() {
    this.socket = io(`http://${environment.websocketUrl}`);
    this.socket.on('message', (message) => {
      this.messagesSubject.next(message);
    });
  }

  send(message: any): void {
    this.socket.emit('message', message);
  }

  get messages$(): Observable<any> {
    return this.messagesSubject.asObservable();
  }
  get textInput$(): Observable<{
    field: string;
    value: string;
    idClinica: number;
  }> {
    return this.messagesSubject.asObservable();
  }
}
