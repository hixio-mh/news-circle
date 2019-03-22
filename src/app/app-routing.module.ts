import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ArticlePage } from './newsfeed/newsfeed.article';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  //On routes in Ionic 4 - https://angularfirebase.com/lessons/ionic-4-routing-and-navigation-guide/s
  { path: 'tabs/tab1/newsfeed/article', component: ArticlePage },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
