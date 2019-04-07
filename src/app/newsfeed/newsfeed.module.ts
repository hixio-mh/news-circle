import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsfeedPage } from './newsfeed.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild([
      { path: '', component: NewsfeedPage, children: [
        { path: ':id', component: NewsfeedPage },
      ] },
    ])
  ],
  declarations: [NewsfeedPage],
  exports: []
})
export class NewsfeedPageModule {}
