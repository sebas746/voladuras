import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CieloAbiertoComponent } from './cieloAbierto.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home.component';
import { EstructurasEstebanLComponent } from './estructurasEstebanL.component';
import { EstructurasGustaffsonComponent } from './estructurasGustaffson.component';
import { EstructurasLopezJComponent } from './estructurasLopezJ.component';


@NgModule({
    declarations: 
    [
        CieloAbiertoComponent,
        HomeComponent,
        EstructurasEstebanLComponent,
        EstructurasGustaffsonComponent,
        EstructurasLopezJComponent
    ],
    imports: [
        BrowserModule, 
        RouterModule, 
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        HttpClientModule
    ],
    exports: []
})
export class VoladurasModule {}