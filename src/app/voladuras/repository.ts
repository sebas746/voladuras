import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { TipoExplosivo } from '../models/tipoExplosivo.model';

const tipoExplosivoUrl = "./assets/tipo_explosivos.json";

@Injectable({
    providedIn: 'root'
})
export class Repository {

    constructor(private http: HttpClient) {  
        this.getTipoExplosivos();      
    }
    

    getTipoExplosivos() {
        return this.http.get<TipoExplosivo[]>(tipoExplosivoUrl)
            .subscribe(
                response => {
                    this.tipo_explosivos = response; 
                  
                });
    }

    tipo_explosivos: TipoExplosivo[] = [];
}