import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { TipoExplosivo } from '../models/tipoExplosivo.model';

const tipoExplosivoUrl = "./assets/tipo_explosivos.json";
const tipoRocasUrl = "./assets/tipo_rocas.json";

@Injectable({
    providedIn: 'root'
})
export class Repository {

    constructor(private http: HttpClient) {  
        this.getTipoExplosivos();
        this.getTipoRocas();      
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

    tipo_explosivos: TipoExplosivo[] = [];
    tipo_rocas: any[] = [];
}