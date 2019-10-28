import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

const tamices: number[] = [
    0,
    0.05,
    0.10,
    0.15,
    0.20,
    0.25,
    0.30,
    0.35,
    0.40,
    0.45,
    0.50,
    0.55,
    0.60,
    0.65,
    0.70,
    0.75,
    0.80,
    0.85,
    0.90,
    0.95,
    1.00,
    1.05,
    1.10
];

@Injectable({
    providedIn: 'root'
})
export class Calculos {

    resultadoTamiz: number[] = [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ];

    redondear(values: any[], decimales) {

        let response = values.map(function (element) {           
            return Number(Number.parseFloat(element).toFixed(decimales));
        });

        return response;
    }

    degrees_to_radians(degrees) {
        var pi = Math.PI;
        return degrees * (pi / 180);
    }

    burden(form: FormGroup) {
        let r1 = form.get("diametroBarreno").value * 0.035;
        let r2 = ((form.get("tipoExplosivo1").value.Densidad * 2 / form.get("tipoRoca").value.Densidad) + 1.8) * (form.get("diametroBarreno").value / 25.4 * 0.3048);
        let r3 = 0.012 * (2 * form.get("tipoExplosivo1").value.Densidad / form.get("tipoRoca").value.Densidad + 1.5) * form.get("diametroBarreno").value;
        return this.redondear([r1, r2, r3], 2);
    }

    burdenCorregido(burden: any[], form: FormGroup) {
        let r1 = burden[0] * form.get("correcionFactoresGeo").value * form.get("correcionNumeroFilas").value * form.get("correccionEstGeologica").value;
        let r2 = burden[1] * form.get("correcionFactoresGeo").value * form.get("correcionNumeroFilas").value * form.get("correccionEstGeologica").value;
        let r3 = burden[2] * form.get("correcionFactoresGeo").value * form.get("correcionNumeroFilas").value * form.get("correccionEstGeologica").value;
        return this.redondear([r1, r2, r3], 2);
    }

    indiceRigidez(burdenC: any[], form: FormGroup) {
        let r1 = form.get("alturaBanco").value / burdenC[0];
        let r2 = form.get("alturaBanco").value / burdenC[1];
        let r3 = form.get("alturaBanco").value / burdenC[2];
        return this.redondear([r1, r2, r3], 2);
    }

    espacimientoOptimo(burden: any[], form: FormGroup) {
        let r1 = 0.043 * form.get("diametroBarreno").value;
        let r2 = burden[1] * 1.15;
        let r3 = (form.get("alturaBanco").value + 7 * burden[2]) / 8;
        return this.redondear([r1, r2, r3], 2);
    }

    tacoPromedio(burden: any[], burdenC: any[], form: FormGroup) {
        let r1 = form.get("diametroBarreno").value * 0.032;
        let r2 = burden[1] * 0.7;
        let r3 = burdenC[2] * 0.7;
        return this.redondear([r1, r2, r3], 2);
    }

    distribucionEnergia(tacoP: any[], form: FormGroup) {
        let r1 = (1 - (tacoP[0] / form.get("alturaBanco").value)) * 100;
        let r2 = (1 - (tacoP[1] / form.get("alturaBanco").value)) * 100;
        let r3 = (form.get("alturaBanco").value - tacoP[2]) / form.get("alturaBanco").value * 100;
        return this.redondear([r1, r2, r3], 2);
    }

    sobreperforacion(form: FormGroup) {
        let r1 = 0.012 * form.get("diametroBarreno").value;
        let r2 = 0.012 * form.get("diametroBarreno").value;
        let r3 = 0.012 * form.get("diametroBarreno").value;
        return this.redondear([r1, r2, r3], 2);
    }

    alturaVerticalBarreno(sobrePerfo: any[], form: FormGroup) {
        let r1 = (form.get("alturaBanco").value / form.get("angulo2Barreno").value) + (1 - (20 / 100) * sobrePerfo[0]);
        let r2 = form.get("alturaBanco").value + sobrePerfo[1];
        let r3 = form.get("alturaBanco").value + sobrePerfo[2];
        console.log([r1, r2, r3]);
        return this.redondear([r1, r2, r3], 2);
    }

    alturaEfectivaBarreno(sobrePerfo: any[], form: FormGroup) {
        let r1 = form.get("alturaBanco").value + sobrePerfo[0] / Math.cos(this.degrees_to_radians(form.get("angulo2Barreno").value));
        let r2 = form.get("alturaBanco").value + sobrePerfo[1] / Math.cos(this.degrees_to_radians(form.get("angulo2Barreno").value));
        let r3 = form.get("alturaBanco").value + sobrePerfo[2] / Math.cos(this.degrees_to_radians(form.get("angulo2Barreno").value));
        return this.redondear([r1, r2, r3], 2);
    }

    verificacionDiametro(burdenC: any[], form: FormGroup) {
        let r1 = 0;
        let r2 = 0;
        let r3 = burdenC[2] / (0.012 * (2 * form.get("tipoExplosivo1").value.Densidad / form.get("tipoRoca").value.Densidad + 1.5));
        return this.redondear([r1, r2, r3], 2);
    }

    longitudExplosivo(tacoP: any[], alturaEfectivaBarreno: any[]) {
        let r1 = alturaEfectivaBarreno[0] - tacoP[0];
        let r2 = alturaEfectivaBarreno[1] - tacoP[1];
        let r3 = alturaEfectivaBarreno[2] - tacoP[2];
        return this.redondear([r1, r2, r3], 2);
    }

    areaBarreno(form: FormGroup) {
        let r1 = form.get("diametroBarreno").value / 1000 * form.get("diametroBarreno").value / 1000 * Math.PI / 4;
        let r2 = form.get("diametroBarreno").value / 1000 * form.get("diametroBarreno").value / 1000 * Math.PI / 4;
        let r3 = form.get("diametroBarreno").value / 1000 * form.get("diametroBarreno").value / 1000 * Math.PI / 4;
        return this.redondear([r1, r2, r3], 4);
    }

    densidadCargaEmulit(form: FormGroup, areaBarreno: any[]) {
        let r1 = 0.0031415 * form.get("tipoExplosivo1").value.Densidad * form.get("diametroBarreno").value * form.get("diametroBarreno").value / 4;
        let r2 = 0.0031415 * form.get("tipoExplosivo1").value.Densidad * form.get("diametroBarreno").value * form.get("diametroBarreno").value / 4;
        let r3 = form.get("tipoExplosivo1").value.Densidad * 0.001 * 100 * 100 * 100 * areaBarreno[2];
        return this.redondear([r1, r2, r3], 2);
    }

    volumenArrancado(burden: any[], espacimientoOptimo: any[], burdenC: any[], form: FormGroup) {
        let r1 = burden[0] * espacimientoOptimo[0] * form.get("alturaBanco").value / form.get("angulo2Barreno").value;
        let r2 = form.get("alturaBanco").value * burdenC[1] * espacimientoOptimo[1];
        let r3 = form.get("alturaBanco").value * burdenC[2] * espacimientoOptimo[2];
        return this.redondear([r1, r2, r3], 2);
    }

    rendimientoArranque(alturaVerticalBarreno: any[], volumenArrancado: any[]) {
        let r1 = volumenArrancado[0] / alturaVerticalBarreno[0];
        let r2 = 0;
        let r3 = 0;
        return this.redondear([r1, r2, r3], 2);
    }

    masaTiro(volumenArrancado: any[], form: FormGroup) {
        let r1 = volumenArrancado[0] * form.get("tipoRoca").value.Densidad;
        let r2 = volumenArrancado[1] * form.get("tipoRoca").value.Densidad;
        let r3 = volumenArrancado[2] * form.get("tipoRoca").value.Densidad;
        return this.redondear([r1, r2, r3], 2);
    }

    longitudCargaFondo(form: FormGroup) {
        let r1 = 0.04 * form.get("diametroBarreno").value;
        let r2 = 0.04 * form.get("diametroBarreno").value;
        let r3 = 0.04 * form.get("diametroBarreno").value;
        return this.redondear([r1, r2, r3], 2);
    }

    concentracionCargaFondo(form: FormGroup) {
        let r1 = form.get("diametroBarreno").value * form.get("diametroBarreno").value * 0.0031416 / 4 * form.get("tipoExplosivo2").value.Densidad;
        let r2 = form.get("diametroBarreno").value * form.get("diametroBarreno").value * 0.0031416 / 4 * form.get("tipoExplosivo2").value.Densidad;
        let r3 = form.get("diametroBarreno").value * form.get("diametroBarreno").value * 0.0031416 / 4 * form.get("tipoExplosivo2").value.Densidad;
        return this.redondear([r1, r2, r3], 2);
    }

    cargaFondo(longitudCargaFondo: any[], concentracionCargaFondo: any[]) {
        let r1 = longitudCargaFondo[0] * concentracionCargaFondo[0];
        let r2 = longitudCargaFondo[1] * concentracionCargaFondo[1];
        let r3 = longitudCargaFondo[2] * concentracionCargaFondo[2];
        return this.redondear([r1, r2, r3], 2);
    }

    longitudCargaColumna(tacoPromedio: any[], alturaVerticalBarreno: any[], longitudCargaFondo: any[]) {
        let r1 = alturaVerticalBarreno[0] - tacoPromedio[0] - longitudCargaFondo[0];
        let r2 = alturaVerticalBarreno[1] - tacoPromedio[1] - longitudCargaFondo[1];
        let r3 = alturaVerticalBarreno[2] - tacoPromedio[2] - longitudCargaFondo[2];
        return this.redondear([r1, r2, r3], 2);
    }

    concentracionCargaColumna(form: FormGroup) {
        let r1 = form.get("diametroBarreno").value * form.get("diametroBarreno").value * 0.0031416 / 4 * form.get("tipoExplosivo1").value.Densidad;
        let r2 = form.get("diametroBarreno").value * form.get("diametroBarreno").value * 0.0031416 / 4 * form.get("tipoExplosivo1").value.Densidad;
        let r3 = form.get("diametroBarreno").value * form.get("diametroBarreno").value * 0.0031416 / 4 * form.get("tipoExplosivo1").value.Densidad;
        return this.redondear([r1, r2, r3], 2);
    }

    cargaColumna(longitudCargaColumna: any[], concentracionCargaColumna: any[]) {
        let r1 = longitudCargaColumna[0] * concentracionCargaColumna[0];
        let r2 = longitudCargaColumna[1] * concentracionCargaColumna[1];
        let r3 = longitudCargaColumna[2] * concentracionCargaColumna[2];
        return this.redondear([r1, r2, r3], 2);
    }

    cargaBarreno(cargaColumna: any[], cargaFondo: any[]) {
        let r1 = cargaColumna[0] + cargaFondo[0];
        let r2 = cargaColumna[1] + cargaFondo[1];
        let r3 = cargaColumna[2] + cargaFondo[2];
        return this.redondear([r1, r2, r3], 2);
    }

    consumoEspecifico(cargaBarreno: any[], volumenArrancado: any[]) {
        let r1 = cargaBarreno[0] / volumenArrancado[0];
        let r2 = cargaBarreno[1] / volumenArrancado[1];
        let r3 = cargaBarreno[2] / volumenArrancado[2];
        return this.redondear([r1, r2, r3], 2);
    }

    pesoExplosivoPorBarreno(cargaBarreno: any[], densidadCargaEmulit: any[], longitudExplosivo: any[]) {
        let r1 = cargaBarreno[0];
        let r2 = densidadCargaEmulit[1] * longitudExplosivo[1];
        let r3 = densidadCargaEmulit[2] * longitudExplosivo[2];
        return this.redondear([r1, r2, r3], 2);
    }

    factorPotencia1(volumenArrancado: any[], pesoExplosivoPorBarreno: any[]) {
        let r1 = pesoExplosivoPorBarreno[0] / volumenArrancado[0];
        let r2 = pesoExplosivoPorBarreno[1] / volumenArrancado[1];
        let r3 = pesoExplosivoPorBarreno[2] / volumenArrancado[2];
        return this.redondear([r1, r2, r3], 2);
    }

    factorPotencia2(masaTiro: any[], pesoExplosivoPorBarreno: any[]) {
        let r1 = pesoExplosivoPorBarreno[0] / masaTiro[0];
        let r2 = pesoExplosivoPorBarreno[1] / masaTiro[1];
        let r3 = pesoExplosivoPorBarreno[2] / masaTiro[2];
        return this.redondear([r1, r2, r3], 2);
    }

    factorPotencia3(masaTiro: any[], pesoExplosivoPorBarreno: any[]) {
        let r1 = masaTiro[0] / pesoExplosivoPorBarreno[0];
        let r2 = masaTiro[1] / pesoExplosivoPorBarreno[1];
        let r3 = masaTiro[2] / pesoExplosivoPorBarreno[2];
        return this.redondear([r1, r2, r3], 2);
    }

    energiaExplosiva(pesoExplosivoPorBarreno: any[], form: FormGroup) {
        let r1 = pesoExplosivoPorBarreno[0] * form.get("tipoExplosivo1").value.EnergiaExplosiva / 1000;
        let r2 = pesoExplosivoPorBarreno[1] * form.get("tipoExplosivo1").value.EnergiaExplosiva / 1000;
        let r3 = pesoExplosivoPorBarreno[2] * form.get("tipoExplosivo1").value.EnergiaExplosiva / 1000;
        return this.redondear([r1, r2, r3], 2);
    }

    factorEnergia(masaTiro: any[], energiaExplosiva: any[]) {
        let r1 = energiaExplosiva[0] * 1000 / masaTiro[0];
        let r2 = energiaExplosiva[1] * 1000 / masaTiro[1];
        let r3 = energiaExplosiva[2] * 1000 / masaTiro[2];
        return this.redondear([r1, r2, r3], 2);
    }

    volumenSuelto(form: FormGroup) {
        let r1 = form.get("largoCantera").value * form.get("anchoCantera").value * form.get("fondoCantera").value;
        let r2 = r1;
        let r3 = r1;
        return this.redondear([r1, r2, r3], 2);
    }

    numeroFilas(burden: any[], form: FormGroup): number[] {
        let r1 = form.get("fondoCantera").value / burden[0];
        let r2 = form.get("fondoCantera").value / burden[1];
        let r3 = form.get("fondoCantera").value / burden[2];
        console.log([r1, r2, r3]);
        return this.redondear([r1, r2, r3], 3);
    }

    numeroBarrenosPorFila(espacimientoOptimo: any[], form: FormGroup): number[] {
        let r1 = form.get("largoCantera").value / espacimientoOptimo[0];
        let r2 = form.get("largoCantera").value / espacimientoOptimo[1];
        let r3 = form.get("largoCantera").value / espacimientoOptimo[2];
        console.log([r1, r2, r3]);
        return this.redondear([r1, r2, r3], 3);
    }

    numeroBarrenosTotales(numeroFilas: number[], numeroBarrenosPorFila: number[]): number[] {
        // console.log(this.numeroFilas);
        // console.log(this.numeroBarrenosTotales);
        let r1 = numeroFilas[0] * numeroBarrenosPorFila[0];
        let r2 = numeroFilas[1] * numeroBarrenosPorFila[1];
        let r3 = numeroFilas[2] * numeroBarrenosPorFila[2];
        return this.redondear([r1, r2, r3], 2);
    }

    cargaTotalVoladura(cargaBarreno: any[], numeroBarrenosTotales: any[]) {
        let r1 = cargaBarreno[0] * numeroBarrenosTotales[0];
        let r2 = cargaBarreno[1] * numeroBarrenosTotales[1];
        let r3 = cargaBarreno[2] * numeroBarrenosTotales[2];
        return this.redondear([r1, r2, r3], 2);
    }

    volumenTotalVoladura(burden: any[], espacimientoOptimo: any[], numeroBarrenosTotales: any[], form: FormGroup) {
        let r1 = burden[0] * espacimientoOptimo[0] * numeroBarrenosTotales[0] * form.get("alturaBanco").value;
        let r2 = burden[1] * espacimientoOptimo[1] * numeroBarrenosTotales[1] * form.get("alturaBanco").value;
        let r3 = burden[2] * espacimientoOptimo[2] * numeroBarrenosTotales[2] * form.get("alturaBanco").value;
        return this.redondear([r1, r2, r3], 2);
    }

    factorCarga(cargaTotalVoladura: any[], volumenTotalVoladura: any[]) {
        let r1 = cargaTotalVoladura[0] / volumenTotalVoladura[0];
        let r2 = cargaTotalVoladura[1] / volumenTotalVoladura[1];
        let r3 = cargaTotalVoladura[2] / volumenTotalVoladura[2];
        return this.redondear([r1, r2, r3], 2);
    }

    cargaMaximaPorRetardo(form: FormGroup) {
        let r1 = Math.pow(form.get("distanciaVivienda").value / form.get("distanciaReducida").value, 2);
        let r2 = r1;
        let r3 = r1
        return this.redondear([r1, r2, r3], 2);
    }

    velocidadPicoParticula(cargaMaximaPorRetardo: any[], form: FormGroup) {
        let b = -1.6;

        let r1 = form.get("constanciaRelacionadaPropRoca").value * Math.pow(form.get("distanciaVivienda").value / Math.pow(cargaMaximaPorRetardo[0], 0.5), b);
        let r2 = form.get("constanciaRelacionadaPropRoca").value * Math.pow(form.get("distanciaVivienda").value / Math.pow(cargaMaximaPorRetardo[1], 0.5), b);
        let r3 = form.get("constanciaRelacionadaPropRoca").value * Math.pow(form.get("distanciaVivienda").value / Math.pow(cargaMaximaPorRetardo[2], 0.5), b);
        return this.redondear([r1, r2, r3], 2);
    }

    burdenPrecorte(burden: any[]) {
        let r1 = burden[0] / 2;
        let r2 = burden[1] / 2;
        let r3 = burden[2] / 2;
        return this.redondear([r1, r2, r3], 2);
    }

    espaciamientoPrecorte(form: FormGroup) {
        let r1 = 5 / 100 * Math.pow(form.get("diametroBarrenoPrecorte").value, 2 /3);
        let r2 = 5 / 100 * Math.pow(form.get("diametroBarrenoPrecorte").value, 2 /3);
        let r3 = 5 / 100 * Math.pow(form.get("diametroBarrenoPrecorte").value, 2 /3);
        return this.redondear([r1, r2, r3], 2);
    }

    longitudCargaPrecorte(form: FormGroup) {
        let r1 = form.get("alturaBanco").value - form.get("tacoDecidido").value;
        let r2 = r1;
        let r3 = r1;
        return this.redondear([r1, r2, r3], 2);
    }

    diametroExplosivoPrecorte(form: FormGroup) {
        let r1 = Math.sqrt(8 / (5 * Math.PI * 1.2)) * (Math.pow(form.get("diametroBarreno").value, 5 / 6));
        let r2 = r1;
        let r3 = r1;
        return this.redondear([r1, r2, r3], 2);
    }

    cargaMetroLinealPrecorte(form: FormGroup) {
        let r1 = 1 / 125 * form.get("diametroBarreno").value;
        let r2 = r1;
        let r3 = r1;
        return this.redondear([r1, r2, r3], 2);
    }

    cantidadExplosivosBarrenoPrecorte(form: FormGroup, longitudCargaPrecorte:any[]) {
        let r1 = form.get("tipoExplosivoPrecorte").value.Peso * form.get("cantidadExplosivoPrecorte").value * longitudCargaPrecorte[0] / 1000;
        let r2 = r1;
        let r3 = r1;
        return this.redondear([r1, r2, r3], 2);
    }

    totalExplosivosPrecorte(cantidadExplosivosBarrenoPrecorte:any[], numeroBarrenosPrecorte:any[]) {
        let r1 = cantidadExplosivosBarrenoPrecorte[0] * numeroBarrenosPrecorte[0];
        let r2 = r1;
        let r3 = r1;
        return this.redondear([r1, r2, r3], 2);
    }

    cargaBarrenoPrecorte(longitudCargaPrecorte: any[], cargaMetroLinealPrecorte: any[]) {
        let r1 = longitudCargaPrecorte[0] * cargaMetroLinealPrecorte[0];
        let r2 = longitudCargaPrecorte[1] * cargaMetroLinealPrecorte[1];
        let r3 = longitudCargaPrecorte[2] * cargaMetroLinealPrecorte[2];
        return this.redondear([r1, r2, r3], 2);
    }

    numeroBarrenosPrecorte(form: FormGroup, espaciamientoPrecorte: any[]) {
        let r1 = form.get("largoCantera").value / espaciamientoPrecorte[0];
        let r2 = r1;
        let r3 = r1;
        return this.redondear([r1, r2, r3], 0);
    }

    numeroVoladurasPrecorte(form: FormGroup) {
        let r1 = form.get("totalVoladuras").value * form.get("duracionProyecto").value / 2;
        let r2 = r1;
        let r3 = r1;
        return this.redondear([r1, r2, r3], 2);
    }

    totalBarrenosPrecorte(numeroBarrenosPrecorte: any[], numeroVoladurasPrecorte: any[]) {
        let r1 = numeroBarrenosPrecorte[0] * numeroVoladurasPrecorte[0];
        let r2 = numeroBarrenosPrecorte[1] * numeroVoladurasPrecorte[1];
        let r3 = numeroBarrenosPrecorte[2] * numeroVoladurasPrecorte[2];
        return this.redondear([r1, r2, r3], 2);
    }

    perforacionPorVoladuraPrecorte(numeroBarrenosPrecorte: any[], form: FormGroup) {
        let r1 = numeroBarrenosPrecorte[0] * form.get("alturaBanco").value;
        let r2 = numeroBarrenosPrecorte[1] * form.get("alturaBanco").value;
        let r3 = numeroBarrenosPrecorte[2] * form.get("alturaBanco").value;
        return this.redondear([r1, r2, r3], 2);
    }

    totalPerforacionPrecorte(totalBarrenosPrecorte: any[], form: FormGroup) {
        let r1 = totalBarrenosPrecorte[0] * form.get("alturaBanco").value;
        let r2 = totalBarrenosPrecorte[0] * form.get("alturaBanco").value;
        let r3 = totalBarrenosPrecorte[0] * form.get("alturaBanco").value;
        return this.redondear([r1, r2, r3], 2);
    }

    cordonDetonantePrecorte(totalBarrenosPrecorte: any[], espaciamientoPrecorte: any[], form: FormGroup) {
        let r1 = (totalBarrenosPrecorte[0] * form.get("alturaBanco").value + espaciamientoPrecorte[0] * totalBarrenosPrecorte[0]);
        let r2 = r1;
        let r3 = r1;
        return this.redondear([r1, r2, r3], 0);
    }

    horasPerforacionPorVoladuraPrecorte(perforacionPorVoladuraPrecorte: any[]) {
        let r1 = perforacionPorVoladuraPrecorte[0] / 12;
        let r2 = perforacionPorVoladuraPrecorte[1] / 12;
        let r3 = perforacionPorVoladuraPrecorte[2] / 12;
        return this.redondear([r1, r2, r3], 0);
    }

    totalDiasPerforacionPrecorte(horasPerforacionPorVoladuraPrecorte: any[]) {
        let r1 = horasPerforacionPorVoladuraPrecorte[0] / 8;
        let r2 = horasPerforacionPorVoladuraPrecorte[1] / 8;
        let r3 = horasPerforacionPorVoladuraPrecorte[2] / 8;
        return this.redondear([r1, r2, r3], 2);
    }

    moduloYoung(form: FormGroup) {
        let r1 = 2 * form.get("RMRRoca").value - 100;
        let r2 = r1;
        let r3 = r1;
        return this.redondear([r1, r2, r3], 0);
    }

    factorPotenciaVolumen(burden: any[], espacimientoOptimo: any[], form: FormGroup) {
        let r1 = 1000 * Math.PI * Math.pow(form.get("diametroBarreno").value / 1000 / 2, 2) * form.get("longitudCarga").value * form.get("tipoExplosivo1").value.Densidad / (burden[0] * espacimientoOptimo[0] * form.get("alturaBanco").value);
        let r2 = 1000 * Math.PI * Math.pow(form.get("diametroBarreno").value / 1000 / 2, 2) * form.get("longitudCarga").value * form.get("tipoExplosivo1").value.Densidad / (burden[1] * espacimientoOptimo[1] * form.get("alturaBanco").value);
        let r3 = 1000 * Math.PI * Math.pow(form.get("diametroBarreno").value / 1000 / 2, 2) * form.get("longitudCarga").value * form.get("tipoExplosivo1").value.Densidad / (burden[2] * espacimientoOptimo[2] * form.get("alturaBanco").value);
        return this.redondear([r1, r2, r3], 2);
    }

    factorPotenciaPeso(factorPotenciaVolumen: any[], form: FormGroup) {
        let r1 = factorPotenciaVolumen[0] / form.get("tipoRoca").value.Densidad;
        let r2 = factorPotenciaVolumen[1] / form.get("tipoRoca").value.Densidad;
        let r3 = factorPotenciaVolumen[2] / form.get("tipoRoca").value.Densidad;
        return this.redondear([r1, r2, r3], 2);
    }

    pesoExplosivo(form: FormGroup) {
        let r1 = 1000 * Math.PI * Math.pow(form.get("diametroBarreno").value / 1000 / 2, 2) * form.get("tipoExplosivo1").value.Densidad * form.get("longitudCarga").value;
        let r2 = 1000 * Math.PI * Math.pow(form.get("diametroBarreno").value / 1000 / 2, 2) * form.get("tipoExplosivo1").value.Densidad * form.get("longitudCarga").value;
        let r3 = 1000 * Math.PI * Math.pow(form.get("diametroBarreno").value / 1000 / 2, 2) * form.get("tipoExplosivo1").value.Densidad * form.get("longitudCarga").value;
        return this.redondear([r1, r2, r3], 2);
    }

    porcentajeSobreTamano(exponenteUniformidad: any[], tamanoCaracteristico: any[], form: FormGroup) {
        let r1 = (Math.exp(-((Math.pow(form.get("fragmentacionSobreTamano").value / tamanoCaracteristico[0], exponenteUniformidad[0])))) * 100);
        let r2 = (Math.exp(-((Math.pow(form.get("fragmentacionSobreTamano").value / tamanoCaracteristico[1], exponenteUniformidad[1])))) * 100);
        let r3 = (Math.exp(-((Math.pow(form.get("fragmentacionSobreTamano").value / tamanoCaracteristico[2], exponenteUniformidad[2])))) * 100);
        return this.redondear([r1, r2, r3], 2);
    }

    porcentajeSubtamanos(exponenteUniformidad: any[], tamanoCaracteristico: any[], form: FormGroup) {
        let r1 = 100 - (Math.exp(-((Math.pow(form.get("fragmentacionSubtamano").value / tamanoCaracteristico[0], exponenteUniformidad[0])))) * 100);
        let r2 = 100 - (Math.exp(-((Math.pow(form.get("fragmentacionSubtamano").value / tamanoCaracteristico[1], exponenteUniformidad[1])))) * 100);
        let r3 = 100 - (Math.exp(-((Math.pow(form.get("fragmentacionSubtamano").value / tamanoCaracteristico[2], exponenteUniformidad[2])))) * 100);
        return this.redondear([r1, r2, r3], 2);
    }

    porcentajeEnRango(porcentajeSobreTamano: any[], porcentajeSubtamanos: any[]) {
        let r1 = 100 - porcentajeSobreTamano[0] - porcentajeSubtamanos[0];
        let r2 = 100 - porcentajeSobreTamano[1] - porcentajeSubtamanos[1];
        let r3 = 100 - porcentajeSobreTamano[2] - porcentajeSubtamanos[2];
        return this.redondear([r1, r2, r3], 2);
    }

    resistenciaExplosivo(form: FormGroup) {
        let r1 = form.get("RWSExplosivo").value / 100;
        let r2 = r1;
        let r3 = r1;
        return this.redondear([r1, r2, r3], 0);
    }

    tamanoPromedioMaterial(factorPotenciaVolumen: any[], pesoExplosivo: any[], form: FormGroup) {
        let r1 = form.get("indiceEstabilidad").value * Math.pow(factorPotenciaVolumen[0], -0.8) * Math.pow(pesoExplosivo[0], 0.16667) * Math.pow(115 / 100, 19 / 30);
        let r2 = form.get("indiceEstabilidad").value * Math.pow(factorPotenciaVolumen[1], -0.8) * Math.pow(pesoExplosivo[1], 0.16667) * Math.pow(115 / 100, 19 / 30);
        let r3 = form.get("indiceEstabilidad").value * Math.pow(factorPotenciaVolumen[2], -0.8) * Math.pow(pesoExplosivo[2], 0.16667) * Math.pow(115 / 100, 19 / 30);
        return this.redondear([r1, r2, r3], 0);
    }

    exponenteUniformidad(burden: any[], espacimientoOptimo: any[], form: FormGroup) {
        let r1 = (2.2 - 14 * (burden[0] / form.get("diametroBarreno").value)) * Math.pow(0.5 * (1 + (espacimientoOptimo[0] / burden[0])), 0.5) * (1 - (form.get("angulo2Barreno").value / burden[0])) * (0.1 + Math.pow(1, 0.1)) * (form.get("longitudCarga").value / form.get("alturaBanco").value) * form.get("geometria").value;
        let r2 = (2.2 - 14 * (burden[1] / form.get("diametroBarreno").value)) * Math.pow(0.5 * (1 + (espacimientoOptimo[1] / burden[1])), 0.5) * (1 - (form.get("angulo2Barreno").value / burden[1])) * (0.1 + Math.pow(1, 0.1)) * (form.get("longitudCarga").value / form.get("alturaBanco").value) * form.get("geometria").value;
        let r3 = (2.2 - 14 * (burden[2] / form.get("diametroBarreno").value)) * Math.pow(0.5 * (1 + (espacimientoOptimo[2] / burden[2])), 0.5) * (1 - (form.get("angulo2Barreno").value / burden[2])) * (0.1 + Math.pow(1, 0.1)) * (form.get("longitudCarga").value / form.get("alturaBanco").value) * form.get("geometria").value;
        return this.redondear([r1, r2, r3], 3);
    }

    tamanoCaracteristico(exponenteUniformidad: any[], tamanoPromedioMaterial: any[]) {
        let r1 = (tamanoPromedioMaterial[0] / 100) / Math.pow(0.693, 1 / exponenteUniformidad[0]);
        let r2 = (tamanoPromedioMaterial[1] / 100) / Math.pow(0.693, 1 / exponenteUniformidad[1]);
        let r3 = (tamanoPromedioMaterial[2] / 100) / Math.pow(0.693, 1 / exponenteUniformidad[2]);
        return this.redondear([r1, r2, r3], 3);
    }


    resultadoTamizado(exponenteUniformidad: number, tamanoCaracteristico: number) {
        for(let i = 0; i < tamices.length; i++) {
            this.resultadoTamiz[i] = (1 - Math.exp(-(Math.pow(tamices[i] / tamanoCaracteristico, exponenteUniformidad))))*100;
        }

        return this.redondear(this.resultadoTamiz, 1);
    }


    //Demolición estructuras
    volumenTeoricoVolar(form: FormGroup) {
        let r1 = form.get("anchoPilar").value * form.get("fondoPilar").value * form.get("alturaCortePropuesta").value;
        r1 = Number(r1.toFixed(4));
        return r1;
    }

    totalLineasPisosIguales(form: FormGroup) {
        let r1 = form.get("totalPilaresConCargasIguales").value * form.get("tipoDemolicion").value.FilasBarreno;
        r1 = Number(r1.toFixed(0));
        return r1;
    }

    totalLineasPisosDiferentes(form: FormGroup) {
        let r1 = form.get("totalPilaresConCargasDiferentes").value * form.get("tipoDemolicion").value.FilasBarreno;
        r1 = Number(r1.toFixed(0));
        return r1;
    }

    totalLineasPisosIgualesGustafsson(form: FormGroup) {
        let r1 = form.get("totalPilaresConCargasIguales").value * form.get("tipoDemolicion").value.NoHilerasBarreno;
        r1 = Number(r1.toFixed(0));
        return r1;
    }

    totalLineasPisosDiferentesGustafsson(form: FormGroup) {
        let r1 = form.get("totalPilaresConCargasDiferentes").value * form.get("tipoDemolicion").value.NoHilerasBarreno;
        r1 = Number(r1.toFixed(0));
        return r1;
    }

    totalLineasPisosIgualesEstebanL(form: FormGroup) {
        let r1 = form.get("totalPilaresConCargasIguales").value * form.get("numeroFilasBarrenoPilar").value;

        return r1;
    }

    totalLineasPisosDiferentesEstebanL(form: FormGroup) {
        let r1 = form.get("totalPilaresConCargasDiferentes").value * form.get("numeroFilasBarrenoPilar").value;

        return r1;
    }

    noBarrenoFila(form: FormGroup) {
        let r1 = form.get("alturaCortePropuesta").value / form.get("tipoDemolicion").value.Espaciamiento;
        r1 = Number(r1.toFixed(0));
        return r1;
    }

    noBarrenoFilaGustaffson(form: FormGroup) {
        let r1 = form.get("tipoDemolicion").value.NoHilerasBarreno;

        return r1;
    }

    noBarrenoFilaEstebanL(form: FormGroup) {
        let r1 = form.get("numeroFilasBarrenoPilar").value;
        return r1;
    }

    noBarrenosPorFila(form: FormGroup) {
        let r1 = form.get("alturaCortePropuesta").value / form.get("tipoDemolicion").value.Espaciamiento;
        r1 = Number(r1.toFixed(0));
        return r1;
    }

    noBarrenosPilar(noBarrenoFila: number, form: FormGroup) {
        let r1 = noBarrenoFila * form.get("tipoDemolicion").value.FilasBarreno;
        r1 = Number(r1.toFixed(0));
        return r1;
    }

    noBarrenosPorFilaEstebanL(form: FormGroup) {
        let r1 = form.get("alturaCortePropuesta").value / form.get("espaciamiento").value;
        r1 = Number(r1.toFixed(0));
        return r1;
    }

    noBarrenosPilarEstebanL(noBarrenoFila: number, form: FormGroup) {
        let r1 = noBarrenoFila * form.get("numeroFilasBarrenoPilar").value;
        r1 = Number(r1.toFixed(0));
        return r1;
    }

    noBarrenosPilarGustaffson(noBarrenoFila: number, noBarrenosPorFila: number) {
        let r1 = noBarrenoFila * noBarrenosPorFila;
        r1 = Number(r1.toFixed(0));
        return r1;
    }

    totalBarrenosPisosIguales(noBarrenosPilar: number, totalLineasPisosIguales: number) {
        let r1 = noBarrenosPilar * totalLineasPisosIguales;
        r1 = Number(r1.toFixed(0));
        return r1;
    }

    totalBarrenosPisosDiferentes(noBarrenosPilar: number, totalLineasPisosIguales: number) {
        let r1 = noBarrenosPilar * totalLineasPisosIguales;
        r1 = Number(r1.toFixed(0));
        return r1;
    }

    totalBarrenosCargados(totalBarrenosPisosIguales: number, totalBarrenosPisosDiferentes: number) {
        let r1 = totalBarrenosPisosIguales + totalBarrenosPisosDiferentes;
        r1 = Number(r1.toFixed(0));
        return r1;
    }

    cantidadExplosivoTeoricoPilar(noBarrenosPilar: number, form: FormGroup) {
        let r1 = noBarrenosPilar * form.get("tipoExplosivo").value.Peso / 1000;
        r1 = Number(r1.toFixed(3));
        return r1;
    }

    cantidadExplosivoBarreno(cantidadExplosivoTeoricoPilar: number, noBarrenosPilar: number) {
        let r1 = cantidadExplosivoTeoricoPilar / noBarrenosPilar;
        r1 = Number(r1.toFixed(3));
        return r1;
    }

    totalExplosivoPisosIguales(cantidadExplosivoBarreno: number, totalBarrenosPisosIguales: number, form: FormGroup) {
        let r1 = cantidadExplosivoBarreno * totalBarrenosPisosIguales * form.get("totalPisosConCargasIguales").value;
        r1 = Number(r1.toFixed(3));
        return r1;
    }

    totalExplosivoPisosDiferentes(cantidadExplosivoBarreno: number, totalBarrenosPisosDiferentes: number, form: FormGroup) {
        let r1 = cantidadExplosivoBarreno * totalBarrenosPisosDiferentes * form.get("totalPisosConCargasDiferentes").value;
        r1 = Number(r1.toFixed(3));
        return r1;
    }

    totalExplosivosEdificio(totalExplosivoPisosIguales: number, totalExplosivoPisosDiferentes: number) {
        let r1 = totalExplosivoPisosIguales + totalExplosivoPisosDiferentes;
        r1 = Number(r1.toFixed(3));
        return r1;
    }

    consumoEspecificoExplosivo(volumenTeoricoVolar: number, noBarrenosPilar: number, form: FormGroup) {
        let r1 = volumenTeoricoVolar / (noBarrenosPilar * form.get("tipoExplosivo").value.Peso / 1000);
        r1 = Number(r1.toFixed(2));
        return r1;
    }

    totalCartuchosEdificio(totalBarrenosPisosIguales: number, totalBarrenosPisosDiferentes: number, form: FormGroup) {
        let r1 = (totalBarrenosPisosIguales * form.get("totalPisosConCargasIguales").value) + (totalBarrenosPisosDiferentes * form.get("totalPisosConCargasDiferentes").value);
        r1 = Number(r1.toFixed(2));
        return r1;
    }

    longitudPerforacion(form: FormGroup) {
        let r1 = form.get("fondoPilar").value * 0.75;
        r1 = Number(r1.toFixed(2));
        return r1;
    }

    longitudSobreperforacion(longitudPerforacion: number) {
        let r1 = longitudPerforacion * 0.1;
        r1 = Number(r1.toFixed(2));
        return r1;
    }

    longitudRetardo(longitudPerforacion: number) {
        let r1 = longitudPerforacion * 0.3;
        r1 = Number(r1.toFixed(2));
        return r1;
    }

    longitudCarga(longitudPerforacion: number) {
        let r1 = longitudPerforacion * 0.6;
        r1 = Number(r1.toFixed(2));
        return r1;
    }

    alturaOcupadaBarrenos(form: FormGroup) {
        let r1 = form.get("alturaCortePropuesta").value - form.get("anchoPilar").value;
        r1 = Number(r1.toFixed(2));
        return r1;
    }

    /****************VOLADURA EN VÍAS */
    sobreperforacionVoladuraVias(form: FormGroup) {
        let r1 = form.get("diametroBarreno").value * form.get("durezaRoca").value.ParametroSobreperforacion / 1000;
        let r2 = r1;
        let r3 = r1;
        return this.redondear([r1, r2, r3], 1);
    }

    retacado(form: FormGroup) {
        let r1 = form.get("diametroBarreno").value * form.get("durezaRoca").value.ParametroRetacado / 1000;
        let r2 = r1;
        let r3 = r1;
        return this.redondear([r1, r2, r3], 1);
    }

    relacionSB(form: FormGroup) {
        let r1 = form.get("durezaRoca").value.ParametroRelacion;
        let r2 = r1;
        let r3 = r1;
        return [r1, r2, r3];
    }

    longitudExplosivoFondo(form: FormGroup) {
        let r1 = form.get("diametroBarreno").value * form.get("durezaRoca").value.ValorDureza / 1000;
        let r2 = r1;
        let r3 = r1;
        return this.redondear([r1, r2, r3], 1);
    }

    longitudBarreno(sobrePerforacion: any[], form: FormGroup) {
        let r1 = (form.get("alturaBanco").value / Math.cos(form.get("anguloPerforacion").value * Math.PI / 180)) + 1 - (form.get("anguloPerforacion").value / 100) * sobrePerforacion[0];
        let r2 = r1;
        let r3 = r1;
        return this.redondear([r1, r2, r3], 1);
    }

    consumoEspecificoVoladuraVias(form: FormGroup) {
        let r1 = form.get("durezaRoca").value.ParametroConsumoEsp;
        let r2 = r1;
        let r3 = r1;
        return [r1, r2, r3];
    }

    concentracionLinealExplosivo(form: FormGroup) {
        let r1 = 0.078539 * form.get("tipoExplosivo").value.ParametroExplosivo * form.get("diametroBarreno").value * form.get("diametroBarreno").value / 100;
        let r2 = r1;
        let r3 = r1;
        return this.redondear([r1, r2, r3], 1);
    }

    cargaExplosivoBarreno(concentracionLinealExplosivo: number, longitudExplosivoFondo: number) {
        let r1 = concentracionLinealExplosivo * longitudExplosivoFondo;
        let r2 = r1;
        let r3 = r1;
        return this.redondear([r1, r2, r3], 1);
    }

    burdenVoladuraVias(consumoEspecificoExplosivo: number, relacionSB: number, cargaExplosivoBarreno: number, form: FormGroup) {
        let r1 = Math.pow((cargaExplosivoBarreno / (relacionSB * (form.get("alturaBanco").value / Math.cos(form.get("anguloPerforacion").value)) * consumoEspecificoExplosivo) * -1), 0.5);
        let r2 = r1;
        let r3 = form.get("durezaRoca").value.ParametroBurden * form.get("diametroBarreno").value / 1000;
        return this.redondear([r1, r2, r3], 1);
    }

    espaciamiento(longitudBarreno: number, form: FormGroup) {
        let r1 = form.get("durezaRoca").value.ParametroEspaciamiento * form.get("diametroBarreno").value / 1000;
        let r2 = r1;
        let r3 = 3 * Math.pow(form.get("diametroBarreno").value / 1000 * longitudBarreno, 0.5);
        return this.redondear([r1, r2, r3], 1);
    }

    longitudExplosivoVias(longitudBarreno: number[], retacado: number[]) {
        let r1 = longitudBarreno[0] - retacado[0];
        let r2 = longitudBarreno[1] - retacado[1];
        let r3 = longitudBarreno[2] - retacado[2];
        return this.redondear([r1, r2, r3], 1);
    }

    cargaTotalBarrenoVias(longitudExplosivoVias: number[], form: FormGroup) {
        let r1 = longitudExplosivoVias[0] * (0.0031415 * form.get("tipoExplosivo").value.Densidad * Math.pow(form.get("diametroBarreno").value / 2, 2));
        let r2 = longitudExplosivoVias[1] * (0.0031415 * form.get("tipoExplosivo").value.Densidad * Math.pow(form.get("diametroBarreno").value / 2, 2));
        let r3 = longitudExplosivoVias[2] * (0.0031415 * form.get("tipoExplosivo").value.Densidad * Math.pow(form.get("diametroBarreno").value / 2, 2));
        return this.redondear([r1, r2, r3], 1);
    }
}