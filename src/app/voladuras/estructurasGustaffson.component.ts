import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Repository } from './repository';
import { TipoExplosivo } from '../models/tipoExplosivo.model';
import { Calculos } from './calculos';
import { TipoDemolicionLopezJ } from '../models/tipoDemolicionLopezJ.model';

declare var $: any;

@Component({
    templateUrl: "estructurasGustaffson.component.html",
    selector: 'estructuras-Gustaffson'
})

export class EstructurasGustaffsonComponent implements OnInit {
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

    longitudCarga = 0;
    longitudRetardo = 0;
    longitudSobreperforacion = 0;
    longitudPerforacion = 0;

    //Google charts init
    title = 'Vibraciones';
    type = 'LineChart';
    data: any[] = [
        [10, null, null, null, 59, null, null],
        [48, null, null, null, null, 2.5, null],
        [190, null, null, null, null, null, 0.05],
        [1, -10, -100, 0, null, null, null],
        [2.2, 0.01, null, null, null, null, null],
        [4.4, 0.05, 0.01, null, null, null, null],
        [1000, 7000, 900, null, null, null, null],

    ];
    columnNames = ["Distancia (m)", "Linea 1", "Linea 2", "Punto", "Est. Preliminar", "Med. Control", "Proy. Tipo Vibra."];
    options = {
        hAxis: {
            title: 'Distancia (m)',
            scaleType: 'log',
            ticks: [1, 10, 100, 1000]
        },
        vAxis: {
            title: 'Carga del Explosivo (Kg)',
            scaleType: 'log',
            ticks: [0.01, 0.1, 1, 10, 100, 1000, 10000]
        },
        crosshair: {
            color: '#000000',
            trigger: 'selection'
        },

        series: {
            2: { lineDashStyle: [14, 2, 7, 2], pointShape: 'circle', pointSize: 5, type: 'line' },
            3: { pointShape: 'circle', pointSize: 5, type: 'scatter', color: '#000080' },
            4: { pointShape: 'circle', pointSize: 5, type: 'scatter', color: '#00FF00' },
            5: { pointShape: 'circle', pointSize: 5, type: 'scatter', color: '#b44' }
        },
       
    };
    width = 970;
    height = 700;

    constructor(private formBuilder: FormBuilder, private repo: Repository,
        private calculos: Calculos) { }

    ngOnInit() {
        this.createForm();
        this.initTable();
    }

    get tipo_explosivos(): TipoExplosivo[] { return this.repo.tipo_explosivos; }
    get tipo_demolicion(): any[] { return this.repo.tipo_demolicion_Gustaffson; }
    get form() { return this.demolicionesForm.controls; }

    createForm() {
        this.demolicionesForm = this.formBuilder.group({
            tipoExplosivo: ['', Validators.required],
            tipoDemolicion: ['', Validators.required],
            totalPisosEdificio: ['', Validators.required],
            totalPisosConExplosivos: ['', Validators.required],
            totalPisosConCargasIguales: ['', Validators.required],
            totalPilaresConCargasIguales: ['', Validators.required],
            totalPisosConCargasDiferentes: ['', Validators.required],
            totalPilaresConCargasDiferentes: ['', Validators.required],
            anchoPilar: ['', Validators.required],
            fondoPilar: ['', Validators.required],
            alturaCortePropuesta: ['', Validators.required],
            maximoBarrenosConexionados: ['', Validators.required],
            espaciamientoBarreno: ['', Validators.required],
            geometria: ['', Validators.required],
            RMRRoca: ['', Validators.required],
            espaciamientoDiscontinuidad: ['', Validators.required],
            buzamientoDiscontinuidad: ['', Validators.required],
            rumboDiscontinuidad: ['', Validators.required],
            tamanoBloqueDiscontinuidad: ['', Validators.required],
            longitudCarga: ['', Validators.required],
            indiceEstabilidad: ['', Validators.required],
            RWSExplosivo: ['', Validators.required]
            distanciaMasCercana: ['', Validators.required]
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
        this.drawGraphic();
        this.calcularValores();
        this.destroyTables();
        this.initTable();
        this.calcularValores();
        this.crearGraficoVibraciones();
    }

    crearGraficoVibraciones() {
        let distanciaVivienda: number = parseInt(this.demolicionesForm.get('distanciaMasCercana').value);
        let totalExplosivo: number = this.totalExplosivosEdificio;
        // console.log('vivienda: ' + distanciaVivienda);
        this.data = [
            [10, null, null, null, 59, null, null],
            [48, null, null, null, null, 2.5, null],
            [190, null, null, null, null, null, 0.05],
            [1, -10, -100, totalExplosivo, null, null, null],
            [distanciaVivienda, -10, -100, totalExplosivo, null, null, null],
            [distanciaVivienda, -10, -100, 0.01, null, null, null],
            [2.2, 0.01, null, null, null, null, null],
            [4.4, 0.05, 0.01, null, null, null, null],
            [1000, 7000, 900, null, null, null, null],
        ];

        this.columnNames[3] = "Distancia = " + distanciaVivienda + "m Carga = " + totalExplosivo + "kg";

    }

    calcularValores() {
        this.volumenTeoricoVolar = this.calculos.volumenTeoricoVolar(this.demolicionesForm);
        this.totalLineasPisosIguales = this.calculos.totalLineasPisosIgualesGustafsson(this.demolicionesForm);
        this.totalLineasPisosDiferentes = this.calculos.totalLineasPisosDiferentesGustafsson(this.demolicionesForm);
        this.noBarrenoFila = this.calculos.noBarrenoFilaGustaffson(this.demolicionesForm);        
        this.noBarrenosPorFila = this.calculos.noBarrenosPorFila(this.demolicionesForm);
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
    }

    destroyTables() {
        $('#tableResultados').DataTable().destroy();
        $('#tableResultadosPerforacion').DataTable().destroy();
    }

    drawGraphic() {
        var canvas = <HTMLCanvasElement>document.getElementById('stage');
        if (canvas.getContext) {
            var ctx = canvas.getContext('2d');

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.rotate(0);

            // Dibujo vista frontal columna
            ctx.beginPath();
            ctx.strokeStyle = "#1089ff";
            ctx.rect(70, 60, 90, 400);
            ctx.moveTo(125, 210);
            ctx.arc(115, 210, 10, 0, 2 * Math.PI);
            ctx.moveTo(125, 280);
            ctx.arc(115, 280, 10, 0, 2 * Math.PI);
            ctx.stroke();

            //Dibujo vista lateral columna
            ctx.beginPath();
            ctx.strokeStyle = "#1089ff";
            ctx.rect(210, 60, 180, 400);
            ctx.stroke();

            //Dibujo vista superior columna
            ctx.beginPath();
            ctx.strokeStyle = "#1089ff";
            ctx.rect(470, 380, 180, 80);
            ctx.stroke();

            // Explosivos en vista lateral
            ctx.beginPath();
            ctx.fillStyle = "#F6775C";
            ctx.fillRect(210, 200, 30, 20);
            ctx.fillRect(210, 270, 30, 20);
            ctx.stroke();

            // Explosivos en vista lateral
            ctx.beginPath();
            ctx.fillStyle = "#B8F12D";
            ctx.fillRect(240, 200, 30, 20);
            ctx.fillRect(240, 270, 30, 20);
            ctx.stroke();

            // Explosivos en vista lateral
            ctx.beginPath();
            ctx.fillStyle = "#2D68F1";
            ctx.fillRect(270, 200, 30, 20);
            ctx.fillRect(270, 270, 30, 20);
            ctx.stroke();

            // Explosivos en vista superior
            ctx.beginPath();
            ctx.fillStyle = "#F6775C";
            ctx.fillRect(470, 410, 30, 20);
            ctx.fillStyle = "#B8F12D";
            ctx.fillRect(500, 410, 30, 20);
            ctx.fillStyle = "#2D68F1";
            ctx.fillRect(530, 410, 30, 20);
            ctx.stroke();

            // Convenciones
            ctx.beginPath();
            ctx.fillStyle = "#F6775C";
            ctx.fillRect(635, 55, 30, 20);
            ctx.fillStyle = "#B8F12D";
            ctx.fillRect(635, 85, 30, 20);
            ctx.fillStyle = "#2D68F1";
            ctx.fillRect(635, 115, 30, 20);          
            ctx.stroke();

            // lineas cota barreno
            ctx.beginPath();
            ctx.fillStyle = "#000001";
            ctx.moveTo(210, 45);
            ctx.lineTo(210, 35);
            ctx.moveTo(210, 40);
            ctx.lineTo(390, 40);
            ctx.moveTo(390, 45);
            ctx.lineTo(390, 35);
            ctx.stroke();

            ctx.beginPath();
            ctx.fillStyle = "#000001";
            ctx.moveTo(70, 45);
            ctx.lineTo(70, 35);
            ctx.moveTo(70, 40);
            ctx.lineTo(160, 40);
            ctx.moveTo(160, 45);
            ctx.lineTo(160, 35);
            ctx.stroke();

            ctx.beginPath();
            ctx.fillStyle = "#000001";
            ctx.moveTo(55, 60);
            ctx.lineTo(55, 460);
            ctx.moveTo(50, 460);
            ctx.lineTo(60, 460);
            ctx.moveTo(50, 60);
            ctx.lineTo(60, 60);
            ctx.stroke();

            ctx.beginPath();
            ctx.fillStyle = "#000001";
            ctx.moveTo(105, 185);
            ctx.lineTo(125, 185);
            ctx.moveTo(105, 180);
            ctx.lineTo(105, 190);
            ctx.moveTo(125, 180);
            ctx.lineTo(125, 190);
            ctx.stroke();

            // cotas diametro barreno
            ctx.beginPath();
            ctx.fillStyle = "#000001";
            ctx.moveTo(470, 370);
            ctx.lineTo(650, 370);
            ctx.moveTo(470, 365);
            ctx.lineTo(470, 375);
            ctx.moveTo(650, 365);
            ctx.lineTo(650, 375);
            ctx.stroke();

            // cotas total perforación
            ctx.beginPath();
            ctx.fillStyle = "#000001";
            ctx.moveTo(212, 190);
            ctx.lineTo(300, 190);
            ctx.moveTo(212, 185);
            ctx.lineTo(212, 195);
            ctx.moveTo(300, 185);
            ctx.lineTo(300, 195);
            ctx.stroke();

            // cotas taco
            ctx.beginPath();
            ctx.fillStyle = "#000001";
            ctx.moveTo(212, 300);
            ctx.lineTo(240, 300);
            ctx.moveTo(212, 295);
            ctx.lineTo(212, 305);
            ctx.moveTo(240, 295);
            ctx.lineTo(240, 305);
            ctx.moveTo(270, 300);
            ctx.lineTo(300, 300);
            ctx.moveTo(270, 295);
            ctx.lineTo(270, 305);
            ctx.moveTo(300, 295);
            ctx.lineTo(300, 305);
            ctx.moveTo(240, 260);
            ctx.lineTo(270, 260);
            ctx.moveTo(240, 255);
            ctx.lineTo(240, 265);
            ctx.moveTo(270, 255);
            ctx.lineTo(270, 265);
            ctx.stroke();

            //Cota espaciamiento
            ctx.beginPath();
            ctx.moveTo(95, 210);
            ctx.lineTo(95, 280);
            ctx.moveTo(90, 210);
            ctx.lineTo(100, 210);
            ctx.moveTo(90, 280);
            ctx.lineTo(100, 280);
            ctx.fillStyle = "#000001";
            ctx.stroke();

            //Cota vista superior
            ctx.beginPath();
            ctx.moveTo(460, 380);
            ctx.lineTo(460, 460);
            ctx.moveTo(455, 380);
            ctx.lineTo(465, 380);
            ctx.moveTo(455, 460);
            ctx.lineTo(465, 460);
            ctx.fillStyle = "#000001";
            ctx.stroke();

            ctx.beginPath();
            ctx.font = "bold 14px Verdana";
            ctx.fillStyle = "#000001";
            ctx.fillText("Vista Frontal", 70, 490);
            ctx.fillText("Vista Lateral", 250, 490);
            ctx.fillText("Vista Superior", 500, 490);
            ctx.font = "12px Verdana";
            ctx.fillText("Fondo Pilar = " + this.demolicionesForm.get("fondoPilar").value + "m", 240, 30);
            ctx.fillText("Fondo Pilar = " + this.demolicionesForm.get("fondoPilar").value + "m", 490, 360);
            ctx.fillText("Ancho Pilar = " + this.demolicionesForm.get("anchoPilar").value + "m", 60, 30);
            ctx.font = "11px Verdana";
            ctx.fillText("D = " + this.demolicionesForm.get("anchoPilar").value + "m", 90, 170);
            ctx.font = "12px Verdana";
            ctx.fillText("Taco", 450, 70);
            ctx.fillText(this.longitudCarga + "m", 242, 250);
            ctx.fillText("Longitud de Carga", 450, 100);
            ctx.fillText(this.longitudSobreperforacion + "m", 275, 315);
            ctx.fillText("Longitud de Sobreperforación", 450, 130);
            ctx.fillText(this.longitudRetardo + "m", 212, 315);            
            ctx.fillText("Total = " + this.longitudPerforacion + "m", 212, 180);
            // Reset transformation matrix to the identity matrix
            ctx.resetTransform();

            ctx.beginPath();
            ctx.rotate(-90 * Math.PI / 180);
            ctx.fillStyle = "#000001";
            ctx.font = "14px Verdana";
            ctx.fillText("Altura de Corte = " + this.demolicionesForm.get("alturaCortePropuesta").value + "m", -320, 45);
            ctx.font = "12px Verdana";
            ctx.fillText("Ancho Pilar = " + this.demolicionesForm.get("anchoPilar").value + "m", -470, 450);
            ctx.font = "12px Verdana";
            ctx.fillText("E = " + this.demolicionesForm.get("espaciamientoBarreno").value + "m", -275, 85);

        }
    }
}