import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {CreditsComponent} from '../../components/credits/credits.component';
import {PageNotFoundComponent} from '../../components/page-not-found/page-not-found.component';

const routes: Route[] = [
  {path: '', component: CreditsComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
