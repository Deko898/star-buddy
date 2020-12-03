import { Component } from '@angular/core';
import { AuthFacade, LoginSuccess } from '../../../../libs/auth/src';
import { IUser } from '../../../../libs/models';

// used here for test 
import { ChatService } from '../../../../libs/chat/src/lib/chat.service';

@Component({
  selector: 'star-buddy-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private _authFacade: AuthFacade,
    private chat: ChatService
  ) {

    const user: IUser = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this._authFacade.dispatch(new LoginSuccess(user))
    }

    this.getConnection().subscribe(data => console.log(data, 'CONN'))
    this.receiveChat().subscribe(data => console.log(data, 'recive message from SERVER'))
    this.chat.fromEvent('messages').subscribe(messages => console.log('recived messages on room join', messages))
  }

  sendMsgToServer(content) {
    this.chat.emit('msgToServer', { content, userId: 'db881f13-9f16-47d7-ab58-dcfeca6d64ff', roomId: '3d0e1dfd-125b-4574-88ee-fd40990db5a7' });
  }

  receiveChat() {
    return this.chat.fromEvent('msgToClient');
  }

  getConnection() {
    return this.chat.fromEvent('connectedToRoom');
  }

  joinRoom(roomId: string) {
    this.chat.emit('joinRoom', { roomId, userId: 'db881f13-9f16-47d7-ab58-dcfeca6d64ff' });
  }
}
