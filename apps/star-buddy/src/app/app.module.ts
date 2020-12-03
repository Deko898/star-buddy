import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import {
  AuthModule,
  authRoutes,
} from '../../../../libs/auth/src/lib/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '../../../../libs/layout/src/lib/layout.module';
import { AuthGuard } from '../../../../libs/auth/src';
import { ChatModule } from '../../../../libs/chat/src/lib/chat.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        { path: '', pathMatch: 'full', redirectTo: 'feed' },   // added
        { path: 'auth', children: authRoutes },
        {
          path: 'feed',
          loadChildren: () =>
            import('../../../../libs/feed/src').then((module) => module.FeedModule),
          canActivate: [AuthGuard]
        },
      ],
      { initialNavigation: 'enabled' }
    ),
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot(),
    AuthModule,
    ChatModule,
    BrowserAnimationsModule,
    LayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
