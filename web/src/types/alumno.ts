export interface AlumnoProfile {
  matricula: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  curp: string;
  correoInstitucional: string;
  telefono: string;
  carrera: string;
  semestre: number;
  estatus: 'ACTIVO' | 'BAJA_TEMPORAL' | 'EGRESADO';
}

export interface RegistroAlumnoDTO {
  matricula: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  curp: string;
  correoInstitucional: string;
  telefono: string;
  carrera: string;
  password: string;
}