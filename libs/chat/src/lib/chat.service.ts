import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { LocalStorage } from '../../../utils/src/lib/local-storage/local-storage';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends Socket {

  constructor() {
    // const token = LocalStorage.testSessionStorage('test_token');
    super({
      url: 'http://localhost:4000/chat-room',
      options: {
        query: {
          roomId: '1fa41132-e262-4725-be04-14e2e32705c9',
          userId: 'cba6bdea-671a-4f1d-a480-e6fada3d1f89'
        }
      }
    });
  }
}
