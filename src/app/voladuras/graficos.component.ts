import { Component } from '@angular/core';

@Component({
    selector: 'graficos',
    templateUrl: './graficos.component.html',
    styleUrls: ['./graficos.component.css']
})
export class GraficosComponent {
    name = 'Angular 5';

    drawRectable() {
        var canvas = <HTMLCanvasElement>document.getElementById('stage');
        if (canvas.getContext) {
            var ctx = canvas.getContext('2d');

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
            ctx.strokeStyle = "#1089ff";
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
            ctx.strokeText("Diám. Barreno", 485, 30);
            ctx.stroke();

            // lineas cota cargas
            ctx.beginPath();
            ctx.strokeStyle = "#202040";
            ctx.moveTo(550, 52);
            ctx.lineTo(420, 320);
            ctx.moveTo(540, 52);
            ctx.lineTo(560, 52);
            ctx.moveTo(503, 130);
            ctx.lineTo(523, 130);
            ctx.moveTo(464, 210);
            ctx.lineTo(484, 210);
            ctx.moveTo(410, 320);
            ctx.lineTo(430, 320);
            ctx.stroke();

            // //Altura del banco            
            ctx.beginPath();
            ctx.strokeStyle = "#202040";
            ctx.moveTo(0, 250);
            ctx.lineTo(30, 250);
            ctx.moveTo(0, 50);
            ctx.lineTo(30, 50);
            ctx.moveTo(15, 50);
            ctx.lineTo(15, 250);
            ctx.stroke();

            //Textos
            ctx.beginPath();
            ctx.strokeStyle = "#202040";
            ctx.font = "18px";
            ctx.strokeText("Altura Banco", 25, 140);

            //Taco
            ctx.beginPath();
            ctx.strokeStyle = "#202040";
            ctx.font = "18px";
            ctx.strokeText("Taco", 545, 90);

            //Carga de columna
            ctx.strokeText("Carga de Columna", 505, 180);

            //Carga de columna
            ctx.strokeText("Carga de Fondo", 455, 280);

            //Subbarrenacion
            ctx.beginPath();
            ctx.strokeStyle = "#202040";
            ctx.moveTo(15, 253);
            ctx.lineTo(15, 320);
            ctx.moveTo(0, 253);
            ctx.lineTo(30, 253);
            ctx.moveTo(0, 320);
            ctx.lineTo(30, 320);
            ctx.strokeText("Subbarrenación", 25, 290);
            ctx.stroke();

            // lineas cota barreno
            ctx.beginPath();
            ctx.strokeStyle = "#202040";
            ctx.moveTo(260, 45);
            ctx.lineTo(260, 35);
            ctx.moveTo(260, 40);
            ctx.lineTo(320, 40);
            ctx.moveTo(320, 45);
            ctx.lineTo(320, 35);
            ctx.strokeText("Burden", 275, 30);
            ctx.stroke();

            // longitud de barrenación
            ctx.beginPath();
            ctx.strokeStyle = "#202040";
            ctx.moveTo(290, 52);
            ctx.lineTo(160, 320);
            ctx.moveTo(280, 52);
            ctx.lineTo(300, 52);
            ctx.moveTo(150, 320);
            ctx.lineTo(170, 320);
            ctx.stroke();

            // Rotated rectangle
            ctx.beginPath();
            ctx.rotate(-63 * Math.PI / 180);
            ctx.fillStyle = "#202040";      
            ctx.font = "18px";
            ctx.strokeText("Longitud de Barrenación", -110, 275);

        }

    }

}
