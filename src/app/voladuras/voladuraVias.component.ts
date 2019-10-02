import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Repository } from './repository';
import { TipoExplosivo } from '../models/tipoExplosivo.model';
import { Calculos } from './calculos';
import { TipoDemolicionLopezJ } from '../models/tipoDemolicionLopezJ.model';

declare var $: any;

@Component({
    templateUrl: "voladuraVias.component.html",
    selector: 'voladura-vias'
})

export class VoladuraViasComponent implements OnInit {
    formulario: FormGroup;
    isSubmitted = false;

    longitudBarreno: any[] = [0, 0, 0];
    burden: any[] = [0, 0, 0];
    cantidadExplosivoBarreno: any[] = [0, 0, 0];
    longitudExplosivoFondo: any[] = [0, 0, 0];
    concentracionLinealExplosivo: any[] = [0, 0, 0];
    retacado: any[] = [0, 0, 0];
    relacionSB: any[] = [0, 0, 0];
    sobreperforacion: any[] = [0, 0, 0];
    espaciamiento: any[] = [0, 0, 0];
    consumoEspecifico: any[] = [0, 0, 0];
    longitudExplosivo: any[] = [0, 0, 0];
    cargaTotalBarreno: any[] = [0, 0, 0];

    constructor(private formBuilder: FormBuilder, private repo: Repository,
        private calculos: Calculos) { }

    ngOnInit() {
        this.createForm();
        this.initTable();
    }

    get tipo_explosivos(): TipoExplosivo[] { return this.repo.tipo_explosivos; }
    get dureza_roca(): any[] { return this.repo.dureza_roca; }
    get form() { return this.formulario.controls; }

    createForm() {
        this.formulario = this.formBuilder.group({
            tipoExplosivo: ['', Validators.required],
            durezaRoca: ['', Validators.required],
            diametroBarreno: ['133.3', Validators.required],
            alturaBanco: ['8', Validators.required],
            anguloPerforacion: ['15', Validators.required]
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
        this.calcularValores();
        this.destroyTables();
        this.initTable();
        this.calcularValores();
    }

    destroyTables() {
        $('#tableResultados').DataTable().destroy();
        $('#tableResultadosPerforacion').DataTable().destroy();
    }

    calcularValores() {
        this.sobreperforacion = this.calculos.sobreperforacionVoladuraVias(this.formulario);
        this.retacado = this.calculos.retacado(this.formulario);
        this.relacionSB = this.calculos.relacionSB(this.formulario);
        this.longitudExplosivoFondo = this.calculos.longitudExplosivoFondo(this.formulario);
        this.longitudBarreno = this.calculos.longitudBarreno(this.sobreperforacion, this.formulario);
        this.consumoEspecifico = this.calculos.consumoEspecificoVoladuraVias(this.formulario);
        this.concentracionLinealExplosivo = this.calculos.concentracionLinealExplosivo(this.formulario);
        this.cantidadExplosivoBarreno = this.calculos.cargaExplosivoBarreno(this.concentracionLinealExplosivo[0], this.longitudExplosivoFondo[0]);
        this.burden = this.calculos.burdenVoladuraVias(this.consumoEspecifico[0], this.relacionSB[0], this.cantidadExplosivoBarreno[0], this.formulario);
        this.espaciamiento = this.calculos.espaciamiento(this.longitudBarreno[2], this.formulario);
        this.longitudExplosivo = this.calculos.longitudExplosivoVias(this.longitudBarreno, this.retacado);
        this.cargaTotalBarreno = this.calculos.cargaTotalBarrenoVias(this.longitudExplosivo, this.formulario);
    }
}