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
import { VoladuraViasComponent } from './voladuraVias.component';
import { GraficosComponent } from './graficos.component';
import { ChartsModule } from 'ng2-charts';
import { GoogleChartsModule } from 'angular-google-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
    declarations:
        [
            CieloAbiertoComponent,
            HomeComponent,
            EstructurasEstebanLComponent,
            EstructurasGustaffsonComponent,
            EstructurasLopezJComponent,
            VoladuraViasComponent,
            GraficosComponent
        ],
    imports: [
        BrowserModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        HttpClientModule,
        ChartsModule,
        GoogleChartsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            timeOut: 2000,
            positionClass: 'toast-top-right'
        })
    ],
    exports: []
})
export class VoladurasModule { }