import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CieloAbiertoComponent } from './cieloAbierto.component';

@NgModule({
    declarations: 
    [
        CieloAbiertoComponent        
    ],
    imports: [
        BrowserModule, 
        RouterModule, 
        FormsModule,
        ReactiveFormsModule
    ],
    exports: []
})
export class VoladurasModule {}