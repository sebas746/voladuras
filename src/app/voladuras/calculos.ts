import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class Calculos {

    redondear(values: any[], decimales) {
        let response = values.map(function (each_element) {
            return Number(each_element.toFixed(decimales));
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
}