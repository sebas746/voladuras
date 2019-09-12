import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoExplosivo } from '../models/tipoExplosivo.model';
import { TipoDemolicionLopezJ } from '../models/tipoDemolicionLopezJ.model';

const tipoExplosivoUrl = "./assets/tipo_explosivos.json";
const tipoRocasUrl = "./assets/tipo_rocas.json";
const tipoDemolicionLopezJUrl = "./assets/tipo_demolicion_lopez_j.json";
const tipoDemolicionGustaffsonUrl = "./assets/tipo_demolicion_gustaffson.json";
const durezaRocaUrl = "./assets/dureza_roca.json";

@Injectable({
    providedIn: 'root'
})
export class Repository {

    constructor(private http: HttpClient) {
        this.getTipoExplosivos();
        this.getTipoRocas();
        this.getTipoDemolicionLopezJ();
        this.getTipoDemolicionGustaffson();
        this.getTipoDurezaRoca();
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

    getTipoDemolicionGustaffson() {
        return this.http.get<any[]>(tipoDemolicionGustaffsonUrl)
            .subscribe(
                response => {
                    this.tipo_demolicion_Gustaffson = response;
                });
    }

    getTipoDurezaRoca() {
        return this.http.get<any[]>(durezaRocaUrl)
            .subscribe(
                response => {
                    this.dureza_roca = response;
                });
    }

    tipo_explosivos: TipoExplosivo[] = [];
    tipo_rocas: any[] = [];
    tipo_demolicion_LopezJ: TipoDemolicionLopezJ[] = [];
    tipo_demolicion_Gustaffson: any[] = [];
    dureza_roca: any[] = [];
}