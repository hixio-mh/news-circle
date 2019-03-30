import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ArticlePage } from './newsfeed/newsfeed.article';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'newsfeed', loadChildren: './newsfeed/newsfeed.module#NewsfeedPageModule' },
  { path: 'invitation', loadChildren: './invitation/invitation.module#InvitationPageModule' },
  { path: 'message', loadChildren: './message/message.module#MessagePageModule' },
  //On routes in Ionic 4 - https://angularfirebase.com/lessons/ionic-4-routing-and-navigation-guide/s
  { path: 'tabs/tab1/article', component: ArticlePage },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'group', loadChildren: './group/group.module#GroupPageModule' },
  { path: 'group/:id', loadChildren: './group-member/group-member.module#GroupMemberPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
