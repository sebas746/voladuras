import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class Calculos {
    
    redondear(values: any[], decimales) {
        let response = values.map(function(each_element){
            return Number(each_element.toFixed(decimales));
        });

        return response;
    }
    
    burden(form: FormGroup) {
        let r1 = form.get("diametroBarreno").value * 0.035;
        let r2 = ((form.get("tipoExplosivo1").value.Densidad * 2 / form.get("tipoRoca").value.Densidad) + 1.8) * (form.get("diametroBarreno").value/25.4*0.3048);
        let r3 = 0.012*(2*form.get("tipoExplosivo1").value.Densidad / form.get("tipoRoca").value.Densidad + 1.5) *  form.get("diametroBarreno").value;
        return this.redondear([ r1, r2, r3 ], 2);
    }

    burdenCorregido(burden: any[], form: FormGroup) {
        let r1 = burden[0] * form.get("correcionFactoresGeo").value * form.get("correcionNumeroFilas").value * form.get("correccionEstGeologica").value;
        let r2 = burden[1] * form.get("correcionFactoresGeo").value * form.get("correcionNumeroFilas").value * form.get("correccionEstGeologica").value; 
        let r3 = burden[2] * form.get("correcionFactoresGeo").value * form.get("correcionNumeroFilas").value * form.get("correccionEstGeologica").value;
        return this.redondear([ r1, r2, r3 ], 2);
    }

    indiceRigidez(burdenC: any[], form: FormGroup) {
        let r1 = burdenC[0] * form.get("alturaBanco").value;
        let r2 = burdenC[1] * form.get("alturaBanco").value; 
        let r3 = burdenC[2] * form.get("alturaBanco").value;
        return this.redondear([ r1, r2, r3 ], 2);
    }

    espacimientoOptimo(burden: any[], form: FormGroup) {
        let r1 = 0.043 * form.get("diametroBarreno").value;
        let r2 = burden[1] * 1.15; 
        let r3 = (form.get("alturaBanco").value + 7 * burden[2]) / 8;
        return this.redondear([ r1, r2, r3 ], 2);
    }
}