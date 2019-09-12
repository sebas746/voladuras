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

    consumoEspecificoExplosivo = 0;
    volumenTeoricoVolar = 0;
    cantidadExplosivoTeoricoPilar = 0;
    noFilasBarrenoPilar = 0;
    totalLineasPisosIguales = 0;
    totalLineasPisosDiferentes = 0;
    noBarrenoFila = 0;
    noBarrenosPilar = 0;
    totalBarrenosPisosIguales = 0;
    totalBarrenosPisosDiferentes = 0;
    totalBarrenosCargados = 0;
    cantidadExplosivoBarreno = 0;
    totalExplosivoPisosIguales = 0;
    totalExplosivoPisosDiferentes = 0;
    totalExplosivosEdificio = 0;
    totalCartuchosEdificio = 0;
    noBarrenosPorFila = 0;
    alturaOcupadaBarrenos = 0;

    longitudCarga = 0;
    longitudRetardo = 0;
    longitudSobreperforacion = 0;
    longitudPerforacion = 0;
    
    constructor(private formBuilder: FormBuilder, private repo: Repository,
        private calculos: Calculos) { 
            
        }


    ngOnInit() {
        this.createForm();
        this.initTable();
    }

    get tipo_explosivos(): TipoExplosivo[] { return this.repo.tipo_explosivos; }
    get form() { return this.demolicionesForm.controls; }

    createForm() {
        this.demolicionesForm = this.formBuilder.group({
            tipoExplosivo: ['', Validators.required],
            tipoDemolicion: ['', Validators.required],
            totalPisosEdificio: ['5', Validators.required],
            totalPisosConExplosivos: ['3', Validators.required],
            totalPisosConCargasIguales: ['2', Validators.required],
            totalPilaresConCargasIguales: ['24', Validators.required],
            totalPisosConCargasDiferentes: ['1', Validators.required],
            totalPilaresConCargasDiferentes: ['16', Validators.required],
            anchoPilar: ['0.4', Validators.required],
            fondoPilar: ['0.6', Validators.required],
            alturaCortePropuesta: ['4', Validators.required],
            maximoBarrenosConexionados: ['3', Validators.required],
            espaciamientoBarreno: ['0.7', Validators.required],
            geometria: ['1', Validators.required],
            RMRRoca: ['90', Validators.required],
            espaciamientoDiscontinuidad: ['1', Validators.required],
            buzamientoDiscontinuidad: ['80', Validators.required],
            rumboDiscontinuidad: ['0', Validators.required],
            tamanoBloqueDiscontinuidad: ['0.3', Validators.required],
            longitudCarga: ['9.56', Validators.required],
            indiceEstabilidad: ['7.18', Validators.required],
            RWSExplosivo: ['100', Validators.required],
            espaciamiento: ['0.7', Validators.required],
            numeroFilasBarrenoPilar: ['1', Validators.required]
        });
    }

    initTable() {       
        $('#tableResultadosPerforacion').DataTable({
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

        $('#tableResultados').DataTable({
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

    submit() {
        this.volumenTeoricoVolar = this.calculos.volumenTeoricoVolar(this.demolicionesForm);
        this.totalLineasPisosIguales = this.calculos.totalLineasPisosIgualesEstebanL(this.demolicionesForm);
        this.totalLineasPisosDiferentes = this.calculos.totalLineasPisosDiferentesEstebanL(this.demolicionesForm);
        this.noBarrenoFila = this.calculos.noBarrenoFilaEstebanL(this.demolicionesForm);        
        this.noBarrenosPorFila = this.calculos.noBarrenosPorFilaEstebanL(this.demolicionesForm);
        this.noBarrenosPilar = this.calculos.noBarrenosPilarGustaffson(this.noBarrenoFila, this.noBarrenosPorFila);
        this.totalBarrenosPisosIguales = this.calculos.totalBarrenosPisosIguales(this.noBarrenosPilar, this.totalLineasPisosIguales);
        this.totalBarrenosPisosDiferentes = this.calculos.totalBarrenosPisosIguales(this.noBarrenosPilar, this.totalLineasPisosDiferentes); 
        this.totalBarrenosCargados = this.calculos.totalBarrenosCargados(this.totalBarrenosPisosIguales, this.totalBarrenosPisosDiferentes);
        this.cantidadExplosivoTeoricoPilar = this.calculos.cantidadExplosivoTeoricoPilar(this.noBarrenosPilar, this.demolicionesForm);
        this.cantidadExplosivoBarreno = this.calculos.cantidadExplosivoBarreno(this.cantidadExplosivoTeoricoPilar, this.noBarrenosPilar);
        this.totalExplosivoPisosIguales = this.calculos.totalExplosivoPisosIguales(this.cantidadExplosivoBarreno, this.totalBarrenosPisosIguales, this.demolicionesForm);
        this.totalExplosivoPisosDiferentes = this.calculos.totalExplosivoPisosDiferentes(this.cantidadExplosivoBarreno, this.totalBarrenosPisosDiferentes, this.demolicionesForm);
        this.totalExplosivosEdificio = this.calculos.totalExplosivosEdificio(this.totalExplosivoPisosIguales, this.totalExplosivoPisosDiferentes);
        this.consumoEspecificoExplosivo = this.calculos.consumoEspecificoExplosivo(this.volumenTeoricoVolar, this.noBarrenosPilar, this.demolicionesForm);
        this.totalCartuchosEdificio = this.calculos.totalCartuchosEdificio(this.totalBarrenosPisosIguales, this.totalBarrenosPisosDiferentes, this.demolicionesForm);
        this.longitudPerforacion = this.calculos.longitudPerforacion(this.demolicionesForm);
        this.longitudSobreperforacion = this.calculos.longitudSobreperforacion(this.longitudPerforacion);
        this.longitudRetardo = this.calculos.longitudRetardo(this.longitudPerforacion);
        this.longitudCarga = this.calculos.longitudCarga(this.longitudPerforacion);
        this.alturaOcupadaBarrenos = this.calculos.alturaOcupadaBarrenos(this.demolicionesForm);
    }
}