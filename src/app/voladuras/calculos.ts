import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class Calculos {
    
    redondear(values: any[]) {
        let response = values.map(function(each_element){
            return Number(each_element.toFixed(2));
        });

        return response;
    }
    
    burden(form: FormGroup) {

        console.log(form);
        let r1 = form.get("diametroBarreno").value * 0.035;
        let r2 = 0;
        let r3 = 0;
        return this.redondear([ r1, r2, r3 ]);
    }


}