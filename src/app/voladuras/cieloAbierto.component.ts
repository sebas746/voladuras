import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Repository } from './repository';
import { TipoExplosivo } from '../models/tipoExplosivo.model';
import { Calculos } from './calculos';
import { Color, Label } from 'ng2-charts';
import { ChartOptions, ChartDataSets } from 'chart.js';
import { ToastrService } from 'ngx-toastr';


declare var $: any;

@Component({
    templateUrl: "cieloAbierto.component.html",
    selector: 'app-cielo-abierto'
})
export class CieloAbiertoComponent implements OnInit {
    cieloAbiertoForm: FormGroup;
    isSubmitted = false;
    explosivo1: TipoExplosivo;



    //Valores por defecto
    defExplosivo1: TipoExplosivo;  
    burden: number[] = [0, 0, 0];
    burdenCorregido: number[] = [0, 0, 0];
    indiceRigidez: number[] = [0, 0, 0];
    espaciamientoOptimo: number[] = [0, 0, 0];
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
    burdenPrecorte: any[] = [0, 0, 0];
    longitudCargaPrecorte: any[] = [0, 0, 0];
    diametroExplosivoPrecorte: any[] = [0, 0, 0];
    totalBarrenosPrecorte: any[] = [0, 0, 0];
    distanciaCorteProduccion: any[] = [0, 0, 0];
    volumenSuelto: any[] = [0, 0, 0];
    cargaMetroLinealPrecorte: any[] = [0, 0, 0];
    cargaBarrenoPrecorte: any[] = [0, 0, 0];
    numeroBarrenosPrecorte: any[] = [0, 0, 0];
    numeroVoladurasPrecorte: any[] = [0, 0, 0];
    perforacionPorVoladuraPrecorte: any[] = [0, 0, 0];
    totalPerforacionPrecorte: any[] = [0, 0, 0];
    cordonDetonantePrecorte: any[] = [0, 0, 0];
    horasPerforacionPorVoladuraPrecorte: any[] = [0, 0, 0];
    totalDiasPerforacionPrecorte: any[] = [0, 0, 0];
    espaciamientoPrecorte: any[] = [0, 0, 0];
    cantidadExplosivosBarrenoPrecorte: any[] = [0, 0, 0];
    totalExplosivosPrecorte: any[] = [0, 0, 0];
    moduloYoung: any[] = [0, 0, 0];
    factorPotenciaPeso: any[] = [0, 0, 0];
    factorPotenciaVolumen: any[] = [0, 0, 0];
    pesoExplosivo: any[] = [0, 0, 0];
    resistenciaExplosivo: any[] = [0, 0, 0];
    tamanoPromedioMaterial: any[] = [0, 0, 0];
    exponenteUniformidad: any[] = [0, 0, 0];
    tamanoCaracteristico: any[] = [0, 0, 0];
    porcentajeSobreTamano: any[] = [0, 0, 0];
    porcentajeEnRango: any[] = [0, 0, 0];
    porcentajeSubtamanos: any[] = [0, 0, 0];
    autor = "López Jimeno";
    numeroFilas: number[] = [0, 0, 0];
    numeroBarrenosPorFila: number[] = [0, 0, 0];
    numeroBarrenosTotales: number[] = [0, 0, 0];
    cargaTotalVoladura: number[] = [0, 0, 0];
    volumenTotalVoladura: number[] = [0, 0, 0];
    factorCarga: number[] = [0, 0, 0];
    cargaMaximaPorRetardo: number[] = [0, 0, 0];
    velocidadPicoParticula: number[] = [0, 0, 0];
    tamanoTamiz: Label[] = [
        '0.00',
        '0.05',
        '0.10',
        '0.15',
        '0.20',
        '0.25',
        '0.30',
        '0.35',
        '0.40',
        '0.45',
        '0.50',
        '0.55',
        '0.60',
        '0.65',
        '0.70',
        '0.75',
        '0.80',
        '0.85',
        '0.90',
        '0.95',
        '1.00',
        '1.05',
        '1.10'
    ];

    resultadoTamiz: number[];

    options = {
        scales: {
            yAxes: [{
                position: 'right',
                ticks: {
                    beginAtZero: true,
                    callback: function (value, index, values) {
                        return value + '%';
                    }
                }
            }]
        }
    };

    public lineChartData: ChartDataSets[] = [
        { data: [], label: 'Tamizado' },
    ];
    public lineChartLabels: Label[] = this.tamanoTamiz;
    public lineChartOptions: (ChartOptions) = {
        responsive: true,
        scales: {
            yAxes: [{
                position: 'left',
                scaleLabel: {
                    display: true,
                    labelString: 'Porcentaje que pasa (%)'

                },
                ticks: {
                    beginAtZero: true,
                    callback: function (value, index, values) {
                        return value + '%';
                    }
                }
            }],
            xAxes: [{

                scaleLabel: {
                    display: true,
                    labelString: 'Tamaño (m)'
                }
            }]
        }
    };
    public lineChartColors: Color[] = [
        {
            borderColor: 'black',
            backgroundColor: '#900505',
        },
    ];
    public lineChartLegend = true;
    public lineChartType = 'line';
    public lineChartPlugins = [];

    constructor(private formBuilder: FormBuilder, private repo: Repository,
        private calculos: Calculos, private toast: ToastrService) { 
            
        }

    ngOnInit() {
        this.defExplosivo1 = this.repo.tipo_explosivos[0];
        this.createForm();
        this.initTable();
    }

    showSuccess(){
        this.toast.success("El Formulario ha sido calculado exitosamente", "Éxito");
    }

    showError(){
        this.toast.error("Por favor diligencia todos los campos obligatorios.", "Error");
    }

    initTable() {
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

        $('#tableResultPrecorte').DataTable({          
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

        $('#tableKuzRamResult').DataTable({
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

    get tipo_explosivos(): TipoExplosivo[] { return this.repo.tipo_explosivos; }

    get tipo_rocas(): TipoExplosivo[] { return this.repo.tipo_rocas; }

    get form() { return this.cieloAbiertoForm.controls; }

    createForm() {
        this.cieloAbiertoForm = this.formBuilder.group({
            tipoExplosivo1: ['', Validators.required],
            tipoExplosivo2: ['', Validators.required],
            tipoRoca: ['', Validators.required],
            anguloBarreno: ['18', Validators.required],
            angulo2Barreno: ['0.95', Validators.required],
            diametroBarreno: ['101.6', Validators.required],
            alturaBanco: ['10.8', Validators.required],
            duracionProyecto: ['2', Validators.required],
            totalVoladuras: ['2', Validators.required],
            longitudVia: ['0', Validators.required],
            largoCantera: ['180', Validators.required],
            anchoCantera: ['10.8', Validators.required],
            fondoCantera: ['50', Validators.required],
            volumenMovido: ['200000', Validators.required],
            distanciaVivienda: ['150', Validators.required],
            distanciaReducida: ['24.5', Validators.required],
            correcionFactoresGeo: ['0.95', Validators.required],
            correcionNumeroFilas: ['0.9', Validators.required],
            correccionEstGeologica: ['1.1', Validators.required],
            constanciaRelacionadaPropRoca: ['500', Validators.required],
            esPrecorte: ['SI', Validators.required],            
            diametroBarrenoPrecorte: ['101.6'],
            tipoExplosivoPrecorte: [''],
            cantidadExplosivoPrecorte: ['4'],
            geometria: ['1', Validators.required],
            RMRRoca: ['80', Validators.required],
            espaciamientoDiscontinuidad: ['1', Validators.required],
            buzamientoDiscontinuidad: ['80', Validators.required],
            rumboDiscontinuidad: ['0', Validators.required],
            tamanoBloqueDiscontinuidad: ['0.4', Validators.required],
            longitudCarga: ['0', Validators.required],
            indiceEstabilidad: ['5.98', Validators.required],
            RWSExplosivo: ['100', Validators.required],
            fragmentacionSobreTamano: ['0.3', Validators.required],
            fragmentacionOptimo: ['0.2', Validators.required],
            fragmentacionSubtamano: ['0.01', Validators.required],
            autorGraficos: ['0'],            
        });
    }

    cambioPrecorte(value) {
        if (value == 'SI') {
            this.cieloAbiertoForm.get("tipoExplosivoPrecorte").setValidators([Validators.required]);
            this.cieloAbiertoForm.get("diametroBarrenoPrecorte").setValidators([Validators.required]);
            this.cieloAbiertoForm.get("cantidadExplosivoPrecorte").setValidators([Validators.required]);
        }
        else {
            this.cieloAbiertoForm.get("tipoExplosivoPrecorte").clearValidators()
            this.cieloAbiertoForm.get("tipoExplosivoPrecorte").setValue('');
            this.cieloAbiertoForm.get("diametroBarrenoPrecorte").clearValidators();
            this.cieloAbiertoForm.get("diametroBarrenoPrecorte").setValue('');
            this.cieloAbiertoForm.get("cantidadExplosivoPrecorte").clearValidators();
            this.cieloAbiertoForm.get("cantidadExplosivoPrecorte").setValue('');
        }
    }

    submit() {
        this.isSubmitted = true;
        if (this.cieloAbiertoForm.invalid) {
            this.showError();
            // console.log(this.cieloAbiertoForm);
            return;
        }

        this.showSuccess();        
        this.calcularValores();
        this.drawGraphic(0);
        
        this.destroyTables();
        this.initTable();
        this.calcularValores();
    }

    calcularValores() {
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
        this.volumenSuelto = this.calculos.volumenSuelto(this.cieloAbiertoForm);
        this.porcentajeEnRango = this.calculos.porcentajeEnRango(this.porcentajeSobreTamano, this.porcentajeSubtamanos);
        this.numeroFilas = this.calculos.numeroFilas(this.burden, this.cieloAbiertoForm);
        this.numeroBarrenosPorFila = this.calculos.numeroBarrenosPorFila(this.espaciamientoOptimo, this.cieloAbiertoForm);
        this.numeroBarrenosTotales = this.calculos.numeroBarrenosTotales(this.numeroFilas, this.numeroBarrenosPorFila);
        this.cargaTotalVoladura = this.calculos.cargaTotalVoladura(this.cargaBarreno, this.numeroBarrenosTotales);
        this.volumenTotalVoladura = this.calculos.volumenTotalVoladura(this.burden, this.espaciamientoOptimo, this.numeroBarrenosTotales, this.cieloAbiertoForm);
        this.factorCarga = this.calculos.factorCarga(this.cargaTotalVoladura, this.volumenTotalVoladura);
        this.cargaMaximaPorRetardo = this.calculos.cargaMaximaPorRetardo(this.cieloAbiertoForm);
        this.velocidadPicoParticula = this.calculos.velocidadPicoParticula(this.cargaMaximaPorRetardo, this.cieloAbiertoForm);

        //Si hay precorte
        if (this.cieloAbiertoForm.get("esPrecorte").value == "SI") {
            this.burdenPrecorte = this.calculos.burdenPrecorte(this.burden);
            this.espaciamientoPrecorte = this.calculos.espaciamientoPrecorte(this.cieloAbiertoForm);
            this.longitudCargaPrecorte = this.alturaVerticalBarreno;
            this.diametroExplosivoPrecorte = this.calculos.diametroExplosivoPrecorte(this.cieloAbiertoForm);
            this.cargaMetroLinealPrecorte = this.calculos.cargaMetroLinealPrecorte(this.cieloAbiertoForm);
            this.cantidadExplosivosBarrenoPrecorte = this.calculos.cantidadExplosivosBarrenoPrecorte(this.cieloAbiertoForm, this.longitudCargaPrecorte);
            this.totalExplosivosPrecorte = this.calculos.totalExplosivosPrecorte(this.cantidadExplosivosBarrenoPrecorte, this.numeroBarrenosPrecorte);
            this.cargaBarrenoPrecorte = this.calculos.cargaBarrenoPrecorte(this.longitudCargaPrecorte, this.cargaMetroLinealPrecorte);
            this.numeroBarrenosPrecorte = this.calculos.numeroBarrenosPrecorte(this.cieloAbiertoForm, this.espaciamientoPrecorte);
            this.numeroVoladurasPrecorte = this.calculos.numeroVoladurasPrecorte(this.cieloAbiertoForm);
            this.totalBarrenosPrecorte = this.calculos.totalBarrenosPrecorte(this.numeroBarrenosPrecorte, this.numeroVoladurasPrecorte);
            this.perforacionPorVoladuraPrecorte = this.calculos.perforacionPorVoladuraPrecorte(this.numeroBarrenosPrecorte, this.cieloAbiertoForm);
            this.totalPerforacionPrecorte = this.calculos.totalPerforacionPrecorte(this.totalBarrenosPrecorte, this.cieloAbiertoForm);
            this.cordonDetonantePrecorte = this.calculos.cordonDetonantePrecorte(this.totalBarrenosPrecorte, this.espaciamientoPrecorte, this.cieloAbiertoForm);
            this.horasPerforacionPorVoladuraPrecorte = this.calculos.horasPerforacionPorVoladuraPrecorte(this.perforacionPorVoladuraPrecorte);
            this.totalDiasPerforacionPrecorte = this.calculos.totalDiasPerforacionPrecorte(this.horasPerforacionPorVoladuraPrecorte);
        }

        this.moduloYoung = this.calculos.moduloYoung(this.cieloAbiertoForm);
        this.factorPotenciaVolumen = this.calculos.factorPotenciaVolumen(this.burden, this.espaciamientoOptimo, this.cieloAbiertoForm);
        this.factorPotenciaPeso = this.calculos.factorPotenciaPeso(this.factorPotenciaVolumen, this.cieloAbiertoForm);
        this.pesoExplosivo = this.calculos.pesoExplosivo(this.cieloAbiertoForm);
        this.resistenciaExplosivo = this.calculos.resistenciaExplosivo(this.cieloAbiertoForm);
        this.tamanoPromedioMaterial = this.calculos.tamanoPromedioMaterial(this.factorPotenciaVolumen, this.pesoExplosivo, this.cieloAbiertoForm);
        this.exponenteUniformidad = this.calculos.exponenteUniformidad(this.burden, this.espaciamientoOptimo, this.cieloAbiertoForm);
        this.tamanoCaracteristico = this.calculos.tamanoCaracteristico(this.exponenteUniformidad, this.tamanoPromedioMaterial);
        this.porcentajeSobreTamano = this.calculos.porcentajeSobreTamano(this.exponenteUniformidad, this.tamanoCaracteristico, this.cieloAbiertoForm);
        this.porcentajeSubtamanos = this.calculos.porcentajeSubtamanos(this.exponenteUniformidad, this.tamanoCaracteristico, this.cieloAbiertoForm);

        this.resultadoTamiz = this.calculos.resultadoTamizado(this.exponenteUniformidad[0], this.tamanoCaracteristico[0]);
        this.lineChartData = [
            { data: this.resultadoTamiz, label: 'Tamizado para autor: ' + this.autor },
        ];
    }

    destroyTables() {
        $('#tableResult').DataTable().destroy();
        $('#tableResultPrecorte').DataTable().destroy();
        $('#tableKuzRamResult').DataTable().destroy();
    }

    drawGraphic(idAutor) {
        var canvas = <HTMLCanvasElement>document.getElementById('stage');
        if (canvas.getContext) {
            var ctx = canvas.getContext('2d');

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.rotate(0);

            // Dibujo del talud
            ctx.beginPath();
            ctx.strokeStyle = "#c70d3a";
            ctx.lineTo(60, 250);
            ctx.lineTo(160, 250);
            ctx.moveTo(160, 250);
            ctx.lineTo(260, 50);
            ctx.lineTo(660, 50);
            ctx.stroke();

            //Dibujo barrenos
            //barreno 1
            ctx.beginPath();
            ctx.strokeStyle = "#1089ff";
            ctx.moveTo(310, 50);
            ctx.lineTo(180, 320);
            ctx.moveTo(330, 50);
            ctx.lineTo(200, 320);
            ctx.moveTo(200, 320);
            ctx.lineTo(180, 320);
            ctx.stroke();

            //barreno 2
            ctx.beginPath();
            ctx.strokeStyle = "#1089ff";
            ctx.moveTo(410, 50);
            ctx.lineTo(280, 320);
            ctx.moveTo(430, 50);
            ctx.lineTo(300, 320);
            ctx.moveTo(280, 320);
            ctx.lineTo(300, 320);
            ctx.stroke();

            // barreno 3
            ctx.beginPath();
            ctx.strokeStyle = "#69F66C";
            ctx.moveTo(510, 50);
            ctx.lineTo(380, 320);
            ctx.moveTo(530, 50);
            ctx.lineTo(400, 320);
            ctx.moveTo(380, 320);
            ctx.lineTo(400, 320);
            ctx.stroke();

            // lineas cota barreno
            ctx.beginPath();
            ctx.strokeStyle = "#202040";
            ctx.moveTo(510, 45);
            ctx.lineTo(510, 35);
            ctx.moveTo(530, 45);
            ctx.lineTo(530, 35);
            ctx.moveTo(530, 40);
            ctx.lineTo(510, 40);

            ctx.stroke();

            // lineas cota cargas
            ctx.beginPath();
            ctx.fillStyle = "#202040";
            ctx.moveTo(550, 52);
            ctx.lineTo(420, 320);
            ctx.moveTo(540, 52);
            ctx.lineTo(560, 52);
            ctx.moveTo(513, 110);
            ctx.lineTo(533, 110);
            ctx.moveTo(474, 190);
            ctx.lineTo(494, 190);
            ctx.moveTo(443, 250);
            ctx.lineTo(463, 250);
            ctx.moveTo(410, 320);
            ctx.lineTo(430, 320);
            ctx.stroke();

            // //Altura del banco            
            ctx.beginPath();
            ctx.moveTo(0, 250);
            ctx.lineTo(30, 250);
            ctx.moveTo(0, 50);
            ctx.lineTo(30, 50);
            ctx.moveTo(15, 50);
            ctx.lineTo(15, 250);
            ctx.stroke();

            //Textos            
            ctx.strokeStyle = "#202040";
            ctx.font = "9px Verdana";
            ctx.fillText("Altura Banco = " + this.cieloAbiertoForm.get("alturaBanco").value + "m", 25, 140);
            ctx.fillText("Diám. Barreno = " + this.cieloAbiertoForm.get("diametroBarreno").value + "mm", 485, 30);
            ctx.fillText("Taco = " + this.tacoPromedio[idAutor] + "m", 545, 90);
            ctx.fillText("Carga de Columna = " + this.cargaColumna[idAutor] + "Kg", 510, 150);
            ctx.fillText("Longitud Carga de Columna = " + this.longitudCargaColumna[idAutor] + "m", 510, 165);
            ctx.fillText("Carga de Fondo = " + this.cargaFondo[idAutor] + "Kg", 475, 220);
            ctx.fillText("Longitud Carga de Fondo = " + this.longitudCargaFondo[idAutor] + "m", 475, 235);
            ctx.fillText("Sobreperforación = " + this.sobrePerforacion[idAutor] + "m", 445, 290);
            // ctx.fillText("Subbarrenación = " + this.sobrePerforacion[idAutor] + "m", 25, 290);
            ctx.fillText("Burden = " + this.burden[idAutor] + "m", 275, 30);

            // Rotated rectangle
            let longitudBarreno =  Number.parseFloat(this.tacoPromedio[idAutor] + this.longitudCargaColumna[idAutor] + this.longitudCargaFondo[idAutor] + this.sobrePerforacion[idAutor]).toFixed(3);
            ctx.beginPath();
            ctx.rotate(-63 * Math.PI / 180);
            ctx.fillStyle = "#202040";
            ctx.font = "9px Verdana";
            ctx.fillText("Longitud de Barrenación = " + longitudBarreno + "m", -110, 275);

            // Reset transformation matrix to the identity matrix
            ctx.resetTransform();

            //Subbarrenacion
            // ctx.beginPath();
            // ctx.fillStyle = "#202040";
            // ctx.moveTo(15, 253);
            // ctx.lineTo(15, 320);
            // ctx.moveTo(0, 253);
            // ctx.lineTo(30, 253);
            // ctx.moveTo(0, 320);
            // ctx.lineTo(30, 320);           
            // ctx.stroke();

            // lineas cota barreno
            ctx.beginPath();
            ctx.fillStyle = "#202040";
            ctx.moveTo(260, 45);
            ctx.lineTo(260, 35);
            ctx.moveTo(260, 40);
            ctx.lineTo(320, 40);
            ctx.moveTo(320, 45);
            ctx.lineTo(320, 35);
            ctx.stroke();

            // longitud de barrenación
            ctx.beginPath();
            ctx.fillStyle = "#202040";
            ctx.moveTo(290, 52);
            ctx.lineTo(160, 320);
            ctx.moveTo(280, 52);
            ctx.lineTo(300, 52);
            ctx.moveTo(150, 320);
            ctx.lineTo(170, 320);
            ctx.stroke();

            //Taco
            ctx.beginPath();
            ctx.fillStyle = "#202040";
            ctx.font = "20px Arial";
            ctx.fillText("Autor - " + this.autor, 200, 360);
            ctx.resetTransform();
        }

    }

    cambioAutorGraficos(idAutor: number) {
        if (idAutor == 2) { this.autor = "Konya"; }
        if (idAutor == 1) { this.autor = "Rodgers"; }
        if (idAutor == 0) { this.autor = "López Jimeno"; }

        this.drawGraphic(idAutor);
        this.resultadoTamiz = this.calculos.resultadoTamizado(this.exponenteUniformidad[idAutor], this.tamanoCaracteristico[idAutor]);
        this.lineChartData = [
            { data: this.resultadoTamiz, label: 'Tamizado para autor: ' + this.autor },
        ];
    }
}
