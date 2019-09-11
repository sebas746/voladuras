import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { TipoExplosivo } from '../models/tipoExplosivo.model';
import { TipoDemolicionLopezJ } from '../models/tipoDemolicionLopezJ.model';

const tipoExplosivoUrl = "./assets/tipo_explosivos.json";
const tipoRocasUrl = "./assets/tipo_rocas.json";
const tipoDemolicionLopezJUrl = "./assets/tipo_demolicion_lopez_j.json";

@Injectable({
    providedIn: 'root'
})
export class Repository {

    constructor(private http: HttpClient) {  
        this.getTipoExplosivos();
        this.getTipoRocas();      
        this.getTipoDemolicionLopezJ();
       
    }
    

    getTipoExplosivos() {
        return this.http.get<TipoExplosivo[]>(tipoExplosivoUrl)
            .subscribe(
                response => {
                    this.tipo_explosivos = response; 
                });
    }

    getTipoRocas() {
        return this.http.get<any[]>(tipoRocasUrl)
            .subscribe(
                response => {
                    this.tipo_rocas = response; 
                });
    }

    getTipoDemolicionLopezJ() {
        return this.http.get<TipoDemolicionLopezJ[]>(tipoDemolicionLopezJUrl)
            .subscribe(
                response => {                    
                    this.tipo_demolicion_LopezJ = response;                     
                });
    }

    tipo_explosivos: TipoExplosivo[] = [];
    tipo_rocas: any[] = [];
    tipo_demolicion_LopezJ: TipoDemolicionLopezJ[] = [];
}