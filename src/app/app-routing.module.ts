import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CieloAbiertoComponent } from './voladuras/cieloAbierto.component';


const routes: Routes = [
  { path: "cieloAbierto", component: CieloAbiertoComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
