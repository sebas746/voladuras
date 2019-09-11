import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CieloAbiertoComponent } from './voladuras/cieloAbierto.component';
import { HomeComponent } from './voladuras/home.component';
import { EstructurasLopezJComponent } from './voladuras/estructurasLopezJ.component';
import { EstructurasGustaffsonComponent } from './voladuras/estructurasGustaffson.component';
import { EstructurasEstebanLComponent } from './voladuras/estructurasEstebanL.component';


const routes: Routes = [
  { path: "*", component: CieloAbiertoComponent },
  { path: "", component: HomeComponent },  
  { path: "EstructurasLopezJimeno", component: EstructurasLopezJComponent },  
  { path: "EstructurasGustaffson", component: EstructurasGustaffsonComponent },  
  { path: "EstructurasEstebanLanga", component: EstructurasEstebanLComponent },  
  { path: "cieloAbierto", component: CieloAbiertoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
