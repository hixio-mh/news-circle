import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GroupPage } from './group.page';
import { GroupModalComponent } from './group-modal/group-modal.component';
import { CreateModalComponent } from './create-modal/create-modal.component';

const routes: Routes = [
  {
    path: '',
    component: GroupPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GroupPage, GroupModalComponent, CreateModalComponent],
  exports: [GroupModalComponent, CreateModalComponent]
})
export class GroupPageModule {}
