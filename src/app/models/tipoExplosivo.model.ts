export class TipoExplosivo {
    constructor(
        public idTipoExplosivo: number,
        public nombre?: string,
        public diametro?: number,
        public peso?: number,
        public descripcion?: string,
        public precioUnitario?: number,
        public densidad?: number,
        public energiaExplosiva?: number,
        public parametroExplosivo?: number
    ) {}

}