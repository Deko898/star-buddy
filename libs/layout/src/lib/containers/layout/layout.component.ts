import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthFacade } from '../../../../../auth/src';
import { IUser } from '../../../../../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit {
  user$: Observable<IUser> = this._authFacade.user$;

  constructor(private _authFacade: AuthFacade) { }

  ngOnInit(): void {

  }

}
