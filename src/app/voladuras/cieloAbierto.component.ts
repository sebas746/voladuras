import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    templateUrl: "cieloAbierto.component.html"
})
export class CieloAbiertoComponent implements OnInit {
    cieloAbiertoForm: FormGroup;
    isSubmitted = false;

    defaultBindingsList = [
        { value: 1, label: 'Vilnius' },
        { value: 2, label: 'Kaunas' },
        { value: 3, label: 'Pavilnys'}
    ];

    selectedCity = null;

    constructor(private formBuilder: FormBuilder) {
        
    }

    ngOnInit() {
        this.createForm();
    }

    get formControls() { return this.cieloAbiertoForm.controls; }

    createForm() {
        this.cieloAbiertoForm = this.formBuilder.group({
            tipoExplosivo1: ['', Validators.required],
            anguloBarreno: ['', Validators.required],
            angulo2Barreno: ['', Validators.required],
            diametroBarreno: ['', Validators.required],
            alturaBanco: ['', Validators.required],
            duracionProyecto: ['', Validators.required],
            totalVoladuras: ['', Validators.required],
            longitudVia: ['', Validators.required],
            tamanoCantera: ['', Validators.required],
            volumenSuelto: ['', Validators.required],
            volumenMovido: ['', Validators.required],
            distanciaVivienda: ['', Validators.required],
            correcionFactoresGeo: ['', Validators.required],
            correcionNumeroFilas: ['', Validators.required],
            correccionEstGeologica: ['', Validators.required],
        });
    }

    submit() {
        this.isSubmitted = true;
        if (this.cieloAbiertoForm.invalid) {
            return;
        }
    }
}
