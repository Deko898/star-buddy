import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './containers/layout/layout.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material/src/lib/material.module';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule],
  declarations: [LayoutComponent, HeaderComponent],
  exports: [LayoutComponent]
})
export class LayoutModule { }
