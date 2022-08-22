import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeedashboardComponent } from './employeedashboard/employeedashboard.component';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
{path:'', redirectTo:'home',pathMatch:'full' },
 {path:'employee',component:EmployeedashboardComponent},
  
  {path:'home',component:HomeComponent},
  {path:'view/:id',  component:ViewComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
