import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule, Routes } from '@angular/router';
import { MatDatepickerModule } from '@matheo/datepicker';
import { ThemeComponent } from '../shared/layout/theme/theme.component';
import { SharedModule } from '../shared/shared.module';
import { IndexComponent } from './components/index/index.component';
import { SunmoonComponent } from './components/sunmoon/sunmoon.component';

const routes: Routes = [
  {
    path: '',
    component: ThemeComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: IndexComponent,
      },
      {
        path: 'sunmoon',
        component: SunmoonComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    ClipboardModule,
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
    MatDatepickerModule,
    MatTooltipModule,
    SharedModule,
  ],
  declarations: [IndexComponent, SunmoonComponent],
})
export class LabModule {}
