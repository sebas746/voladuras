import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Repository } from './repository';
import { TipoExplosivo } from '../models/tipoExplosivo.model';
import { Calculos } from './calculos';

declare var $: any;

@Component({
    templateUrl: "estructurasGustaffson.component.html",
    selector: 'estructuras-Gustaffson'
})

export class EstructurasGustaffsonComponent implements OnInit {
    constructor(private formBuilder: FormBuilder, private repo: Repository,
        private calculos: Calculos) {}

        ngOnInit() {
        }
}