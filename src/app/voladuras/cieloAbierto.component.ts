import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Repository } from './repository';
import { TipoExplosivo } from '../models/tipoExplosivo.model';
import { Calculos } from './calculos';

declare var $: any;

@Component({
    templateUrl: "cieloAbierto.component.html"
})
export class CieloAbiertoComponent implements OnInit {
    cieloAbiertoForm: FormGroup;
    isSubmitted = false;
    explosivo1: TipoExplosivo;

    //Valores por defecto
    defExplosivo1: TipoExplosivo;

    burden: any[] = [0, 0, 0];
    burdenCorregido: any[] = [0, 0, 0];
    indiceRigidez: any[] = [0, 0, 0];
    espaciamientoOptimo: any[] = [0, 0, 0];
    tacoPromedio: any[] = [0, 0, 0];
    distribucionEnergia: any[] = [0, 0, 0];
    sobrePerforacion: any[] = [0, 0, 0];
    alturaVerticalBarreno: any[] = [0, 0, 0];
    alturaEfecBarreno: any[] = [0, 0, 0];
    verifDiametro: any[] = [0, 0, 0];
    longitudExplosivo: any[] = [0, 0, 0];
    areaBarreno: any[] = [0, 0, 0];
    densidadCargaEmulit: any[] = [0, 0, 0];
    pesoExplosivoPorBarreno: any[] = [0, 0, 0];
    energiaExplosiva: any[] = [0, 0, 0];
    volumenArrancado: any[] = [0, 0, 0];
    rendimientoArranque: any[] = [0, 0, 0];
    masaTiro: any[] = [0, 0, 0];
    factorPotencia1: any[] = [0, 0, 0];
    factorPotencia2: any[] = [0, 0, 0];
    factorPotencia3: any[] = [0, 0, 0];
    factorEnergia: any[] = [0, 0, 0];
    longitudCargaFondo: any[] = [0, 0, 0];
    concentracionCargaFondo: any[] = [0, 0, 0];
    cargaFondo: any[] = [0, 0, 0];
    longitudCargaColumna: any[] = [0, 0, 0];
    concentracionCargaColumna: any[] = [0, 0, 0];
    cargaColumna: any[] = [0, 0, 0];
    cargaBarreno: any[] = [0, 0, 0];
    consumoEspecifico: any[] = [0, 0, 0];

    constructor(private formBuilder: FormBuilder, private repo: Repository,
        private calculos: Calculos) {
                
    }



    ngOnInit() {
        this.defExplosivo1 = this.repo.tipo_explosivos[0];
        this.createForm();

        $('#tableResult').DataTable({
            "ordering": false,
            dom: 'Bfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ],
            "language": {
                "lengthMenu": "Display _MENU_ records per page",
                "zeroRecords": "No se han encontrado registros",
                "info": "Mostrando página _PAGE_ de _PAGES_",
                "infoEmpty": "No records available",
                "infoFiltered": "(filtered from _MAX_ total records)",
                "search": "Buscar:",
                "paginate": {
                    "first": "Primera",
                    "last": "Última",
                    "next": "Siguiente",
                    "previous": "Anterior"
                },

            }
        });
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
            anguloBarreno: [18, Validators.required],
            angulo2Barreno: [0.951, Validators.required],
            diametroBarreno: [101.6, Validators.required],
            alturaBanco: [11, Validators.required],
            duracionProyecto: [3, Validators.required],
            totalVoladuras: [1, Validators.required],
            longitudVia: [100, Validators.required],
            tamanoCantera: ['180 X 50 X10.8', Validators.required],
            volumenSuelto: [97200, Validators.required],
            volumenMovido: [200000, Validators.required],
            distanciaVivienda: [150, Validators.required],
            correcionFactoresGeo: [0.9, Validators.required],
            correcionNumeroFilas: [0.95, Validators.required],
            correccionEstGeologica: [1.10, Validators.required],
        });
    }

    submit() {

        this.burden = this.calculos.burden(this.cieloAbiertoForm);
        this.burdenCorregido = this.calculos.burdenCorregido(this.burden, this.cieloAbiertoForm);
        this.indiceRigidez = this.calculos.indiceRigidez(this.burdenCorregido, this.cieloAbiertoForm);
        this.espaciamientoOptimo = this.calculos.espacimientoOptimo(this.burden, this.cieloAbiertoForm);
        this.tacoPromedio = this.calculos.tacoPromedio(this.burden, this.burdenCorregido, this.cieloAbiertoForm);
        this.distribucionEnergia = this.calculos.distribucionEnergia(this.tacoPromedio, this.cieloAbiertoForm);
        this.sobrePerforacion = this.calculos.sobreperforacion(this.cieloAbiertoForm);
        this.alturaVerticalBarreno = this.calculos.alturaVerticalBarreno(this.sobrePerforacion, this.cieloAbiertoForm);
        this.alturaEfecBarreno = this.calculos.alturaEfectivaBarreno(this.sobrePerforacion, this.cieloAbiertoForm);
        this.verifDiametro = this.calculos.verificacionDiametro(this.burdenCorregido, this.cieloAbiertoForm);
        this.longitudExplosivo = this.calculos.longitudExplosivo(this.tacoPromedio, this.alturaEfecBarreno);
        this.areaBarreno = this.calculos.areaBarreno(this.cieloAbiertoForm);
        this.densidadCargaEmulit = this.calculos.densidadCargaEmulit(this.cieloAbiertoForm, this.areaBarreno);        
        this.volumenArrancado = this.calculos.volumenArrancado(this.burden, this.espaciamientoOptimo, this.burdenCorregido, this.cieloAbiertoForm);
        this.rendimientoArranque = this.calculos.rendimientoArranque(this.alturaVerticalBarreno, this.volumenArrancado);
        this.masaTiro = this.calculos.masaTiro(this.volumenArrancado, this.cieloAbiertoForm);
        this.longitudCargaFondo = this.calculos.longitudCargaFondo(this.cieloAbiertoForm);
        this.concentracionCargaFondo = this.calculos.concentracionCargaFondo(this.cieloAbiertoForm);
        this.cargaFondo = this.calculos.cargaFondo(this.longitudCargaFondo, this.concentracionCargaFondo);
        this.longitudCargaColumna = this.calculos.longitudCargaColumna(this.tacoPromedio, this.alturaVerticalBarreno, this.longitudCargaFondo);
        this.concentracionCargaColumna = this.calculos.concentracionCargaColumna(this.cieloAbiertoForm);
        this.cargaColumna = this.calculos.cargaColumna(this.longitudCargaColumna, this.concentracionCargaColumna);
        this.cargaBarreno = this.calculos.cargaBarreno(this.cargaColumna, this.cargaFondo);
        this.consumoEspecifico = this.calculos.consumoEspecifico(this.cargaBarreno, this.volumenArrancado);
        this.pesoExplosivoPorBarreno = this.calculos.pesoExplosivoPorBarreno(this.cargaBarreno, this.densidadCargaEmulit, this.longitudExplosivo);
        this.factorPotencia1 = this.calculos.factorPotencia1(this.volumenArrancado, this.pesoExplosivoPorBarreno);
        this.factorPotencia2 = this.calculos.factorPotencia2(this.masaTiro, this.pesoExplosivoPorBarreno);
        this.factorPotencia3 = this.calculos.factorPotencia3(this.masaTiro, this.pesoExplosivoPorBarreno);
        this.energiaExplosiva = this.calculos.energiaExplosiva(this.pesoExplosivoPorBarreno, this.cieloAbiertoForm);
        this.factorEnergia = this.calculos.factorEnergia(this.masaTiro, this.energiaExplosiva);

        this.isSubmitted = true;
        if (this.cieloAbiertoForm.invalid) {
            return;
        }
    }
}
