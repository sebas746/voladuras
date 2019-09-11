import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Repository } from './repository';
import { TipoExplosivo } from '../models/tipoExplosivo.model';
import { Calculos } from './calculos';
import { TipoDemolicionLopezJ } from '../models/tipoDemolicionLopezJ.model';

declare var $: any;

@Component({
    templateUrl: "estructurasEstebanL.component.html",
    selector: 'estructuras-EstebanL'
})

export class EstructurasEstebanLComponent implements OnInit {
    
    demolicionesForm: FormGroup;
    isSubmitted = false;
    
    constructor(private formBuilder: FormBuilder, private repo: Repository,
        private calculos: Calculos) { 
            
        }


    ngOnInit() {
       
    }
}