import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Repository } from './repository';
import { TipoExplosivo } from '../models/tipoExplosivo.model';
import { Calculos } from './calculos';

@Component({
    templateUrl: "cieloAbierto.component.html"
})
export class CieloAbiertoComponent implements OnInit {
    cieloAbiertoForm: FormGroup;
    isSubmitted = false;
    explosivo1: any = {};

    burden: any[] = [0 , 0, 0];
    burdenCorregido: any[] = [0 , 0, 0];
    indiceRigidez: any[] = [0 , 0, 0];
    espaciamientoOptimo: any[] = [0 , 0, 0];
    
    constructor(private formBuilder: FormBuilder, private repo: Repository,
                private calculos: Calculos) {
    }

    ngOnInit() {       
        this.createForm();   
    }

    get tipo_explosivos(): TipoExplosivo[] {
        
        return this.repo.tipo_explosivos;
    }

    get tipo_rocas(): TipoExplosivo[] {
        
        return this.repo.tipo_rocas;
    }

    get form() { return this.cieloAbiertoForm.controls; }

    createForm() {
        this.cieloAbiertoForm = this.formBuilder.group({
            tipoExplosivo1: ['', Validators.required],
            tipoExplosivo2: ['', Validators.required],
            tipoRoca: ['', Validators.required],
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
        
        this.burden =  this.calculos.burden(this.cieloAbiertoForm);
        this.burdenCorregido = this.calculos.burdenCorregido(this.burden, this.cieloAbiertoForm);
        this.indiceRigidez = this.calculos.indiceRigidez(this.burdenCorregido, this.cieloAbiertoForm);
        this.espaciamientoOptimo = this.calculos.espacimientoOptimo(this.burden, this.cieloAbiertoForm);

        this.isSubmitted = true;
        if (this.cieloAbiertoForm.invalid) {
            return;
        }
    }
}
