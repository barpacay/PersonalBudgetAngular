import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutComponent } from './about/about.component';
import { P404Component } from './p404/p404.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {
    path:'',
    component:HomepageComponent,
    pathMatch:'full'
  },
  {
    path:'about',
    component:AboutComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'**',
    component:P404Component
  },
  {
    path:'**',
    component:BreadcrumbsComponent
  },
  {
    path:'**',
    component:ContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
