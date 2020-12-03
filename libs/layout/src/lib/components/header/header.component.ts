import { Component, OnInit, Input } from '@angular/core';
import { IUser } from '../../../../../models';

@Component({
  selector: 'star-buddy-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() authUser: IUser
  
  constructor() { }

}
