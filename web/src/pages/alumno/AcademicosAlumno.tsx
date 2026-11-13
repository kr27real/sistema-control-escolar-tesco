import { useState } from 'react';
import { Printer, Filter, BookOpen, Search } from 'lucide-react';

interface AcademicosAlumnoProps {
  matricula: string;
}

interface MateriaHistorial {
  clave: string;
  creditos: number;
  nombre: string;
  calificacion: string;
  estatus: 'A' | 'NA' | 'CU';
  tipoEval: string;
  noActa: string;
  grupo: string;
  periodo: string;
  pagina: 1 | 2;
}

const HISTORIAL_202320034: MateriaHistorial[] = [
  // --- PÁGINA 1 ---
  { clave: 'ACA-0907', creditos: 4, nombre: 'TALLER DE ETICA', calificacion: '90', estatus: 'A', tipoEval: 'ORDINARIO', noActa: '2023205310793111', grupo: '3111', periodo: '23-24/1', pagina: 1 },
  { clave: 'ACC-0906', creditos: 4, nombre: 'FUNDAMENTOS DE INVESTIGACION', calificacion: '98', estatus: 'A', tipoEval: 'ORDINARIO', noActa: '2023205310753111', grupo: '3111', periodo: '23-24/1', pagina: 1 },
  { clave: 'ACF-0901', creditos: 5, nombre: 'CALCULO DIFERENCIAL', calificacion: '88', estatus: 'A', tipoEval: 'ORDINARIO', noActa: '2023205310743111', grupo: '3111', periodo: '23-24/1', pagina: 1 },
  { clave: 'AED-1285', creditos: 5, nombre: 'FUNDAMENTOS DE PROGRAMACION', calificacion: '98', estatus: 'A', tipoEval: 'ORDINARIO', noActa: '2023205310763111', grupo: '3111', periodo: '23-24/1', pagina: 1 },
  { clave: 'AEF-1041', creditos: 5, nombre: 'MATEMATICAS DISCRETAS', calificacion: '87', estatus: 'A', tipoEval: 'ORDINARIO', noActa: '2023205310773111', grupo: '3111', periodo: '23-24/1', pagina: 1 },
  { clave: 'CC4_02', creditos: 0, nombre: 'Curso Cocurricular 1', calificacion: '80', estatus: 'A', tipoEval: 'CURSO COCURRICULAR', noActa: '2023224310803111', grupo: '3111', periodo: '23-24/1', pagina: 1 },
  { clave: 'CT39', creditos: 1, nombre: 'ACTIVIDADES COMPLEMENTARIAS (TUTORIA 1)', calificacion: '90', estatus: 'A', tipoEval: 'ACTIVIDADES COMPLEMENTARIAS', noActa: '2023217310733111', grupo: '3111', periodo: '23-24/1', pagina: 1 },
  { clave: 'SCH-1024', creditos: 4, nombre: 'TALLER DE ADMINISTRACION', calificacion: '95', estatus: 'A', tipoEval: 'ORDINARIO', noActa: '2023205310783111', grupo: '3111', periodo: '23-24/1', pagina: 1 },
  { clave: 'ACF-0902', creditos: 0, nombre: 'CALCULO INTEGRAL', calificacion: 'NA', estatus: 'NA', tipoEval: 'ORDINARIO', noActa: '2024105320833211', grupo: '3211', periodo: '23-24/2', pagina: 1 },
  { clave: 'ACF-0903', creditos: 5, nombre: 'ALGEBRA LINEAL', calificacion: '82', estatus: 'A', tipoEval: 'ORDINARIO', noActa: '2024105320823211', grupo: '3211', periodo: '23-24/2', pagina: 1 },
  { clave: 'AEC-1008', creditos: 4, nombre: 'CONTABILIDAD FINANCIERA', calificacion: '78', estatus: 'A', tipoEval: 'ORDINARIO', noActa: '2024105320843211', grupo: '3211', periodo: '23-24/2', pagina: 1 },
  { clave: 'AEC-1058', creditos: 4, nombre: 'QUIMICA', calificacion: '85', estatus: 'A', tipoEval: 'ORDINARIO', noActa: '2024105320873211', grupo: '3211', periodo: '23-24/2', pagina: 1 },
  { clave: 'AED-1286', creditos: 5, nombre: 'PROGRAMACION ORIENTADA A OBJETOS', calificacion: '83', estatus: 'A', tipoEval: 'ORDINARIO', noActa: '2024105320863211', grupo: '3211', periodo: '23-24/2', pagina: 1 },
  { clave: 'AEF-1052', creditos: 0, nombre: 'PROBABILIDAD Y ESTADISTICA', calificacion: 'NA', estatus: 'NA', tipoEval: 'ORDINARIO', noActa: '2024105320853211', grupo: '3211', periodo: '23-24/2', pagina: 1 },
  { clave: 'CC16_02', creditos: 0, nombre: 'Curso Cocurricular 2', calificacion: '73', estatus: 'A', tipoEval: 'CURSO COCURRICULAR', noActa: '2024124320883211', grupo: '3211', periodo: '23-24/2', pagina: 1 },
  { clave: 'CT57', creditos: 1, nombre: 'ACTIVIDADES COMPLEMENTARIAS (TUTORIA 2)', calificacion: '80', estatus: 'A', tipoEval: 'ACTIVIDADES COMPLEMENTARIAS', noActa: '2024117320813211', grupo: '3211', periodo: '23-24/2', pagina: 1 },
  { clave: 'AC50_3', creditos: 1, nombre: 'ACTIVIDADES COMPLEMENTARIAS (TALENTO EMPRENDEDOR)', calificacion: '90', estatus: 'A', tipoEval: 'ACTIVIDADES COMPLEMENTARIAS', noActa: '20242171330253311', grupo: '53311', periodo: '24-25/1', pagina: 1 },
  { clave: 'ACF-0902', creditos: 5, nombre: 'CALCULO INTEGRAL', calificacion: '76', estatus: 'A', tipoEval: 'ORDINARIO', noActa: '2024205320833221', grupo: '3221', periodo: '24-25/1', pagina: 1 },
  { clave: 'AED-1026', creditos: 5, nombre: 'ESTRUCTURA DE DATOS', calificacion: '87', estatus: 'A', tipoEval: 'ORDINARIO', noActa: '2024205330923311', grupo: '3311', periodo: '24-25/1', pagina: 1 },
  { clave: 'AEF-1052', creditos: 5, nombre: 'PROBABILIDAD Y ESTADISTICA', calificacion: '95', estatus: 'A', tipoEval: 'ORDINARIO', noActa: '2024205320853221', grupo: '3221', periodo: '24-25/1', pagina: 1 },
  { clave: 'SCC-1005', creditos: 4, nombre: 'CULTURA EMPRESARIAL', calificacion: '90', estatus: 'A', tipoEval: 'ORDINARIO', noActa: '2024205330903311', grupo: '3311', periodo: '24-25/1', pagina: 1 },
  { clave: 'SCC-1013', creditos: 4, nombre: 'INVESTIGACION DE OPERACIONES', calificacion: '72', estatus: 'A', tipoEval: 'ORDINARIO', noActa: '2024205330893311', grupo: '3311', periodo: '24-25/1', pagina: 1 },
  { clave: 'SCD-1027', creditos: 0, nombre: 'TOPICOS AVANZADOS DE PROGRAMACION', calificacion: 'NA', estatus: 'NA', tipoEval: 'ORDINARIO', noActa: '2024205330913311', grupo: '3311', periodo: '24-25/1', pagina: 1 },
  { clave: 'SCF-1006', creditos: 5, nombre: 'FISICA GENERAL', calificacion: '92', estatus: 'A', tipoEval: 'ORDINARIO', noActa: '2024205330933311', grupo: '3311', periodo: '24-25/1', pagina: 1 },
  { clave: 'AC74', creditos: 1, nombre: 'ACTIVIDADES COMPLEMENTARIAS (HABILIDADES BLANDAS I)', calificacion: '80', estatus: 'A', tipoEval: 'ACTIVIDADES COMPLEMENTARIAS', noActa: '2025117340943411', grupo: '3411', periodo: '24-25/2', pagina: 1 },
  { clave: 'ACF-0904', creditos: 0, nombre: 'CALCULO VECTORIAL', calificacion: 'NA', estatus: 'NA', tipoEval: 'ORDINARIO', noActa: '2025105330953321', grupo: '3321', periodo: '24-25/2', pagina: 1 },
  { clave: 'AEC-1034', creditos: 4, nombre: 'FUNDAMENTOS DE TELECOMUNICACIONES', calificacion: '77', estatus: 'A', tipoEval: 'ORDINARIO', noActa: '2025105340963411', grupo: '3411', periodo: '24-25/2', pagina: 1 },
  { clave: 'AEF-1031', creditos: 0, nombre: 'FUNDAMENTOS DE BASES DE DATOS', calificacion: 'NA', estatus: 'NA', tipoEval: 'ORDINARIO', noActa: '2025105340973411', grupo: '3411', periodo: '24-25/2', pagina: 1 },
  { clave: 'CC40_02', creditos: 0, nombre: 'Curso Cocurricular 4', calificacion: '70', estatus: 'A', tipoEval: 'CURSO COCURRICULAR', noActa: '2025124340986411', grupo: '6411', periodo: '24-25/2', pagina: 1 },
  { clave: 'SCC-1010', creditos: 4, nombre: 'GRAFICACION', calificacion: '90', estatus: 'A', tipoEval: 'ORDINARIO', noActa: '2025105340993411', grupo: '3411', periodo: '24-25/2', pagina: 1 },
  { clave: 'SCC-1017', creditos: 4, nombre: 'METODOS NUMERICOS', calificacion: '92', estatus: 'A', tipoEval: 'ORDINARIO', noActa: '2025105341003411', grupo: '3411', periodo: '24-25/2', pagina: 1 },
  { clave: 'SCD-1018', creditos: 5, nombre: 'PRINCIPIOS ELECTRICOS Y APLICACIONES DIGITALES', calificacion: '91', estatus: 'A', tipoEval: 'ORDINARIO', noActa: '2025105341013411', grupo: '3411', periodo: '24-25/2', pagina: 1 },
  { clave: 'SCD-1027', creditos: 0, nombre: 'TOPICOS AVANZADOS DE PROGRAMACION', calificacion: 'NA', estatus: 'NA', tipoEval: 'ORDINARIO', noActa: '2025105331023321', grupo: '3321', periodo: '24-25/2', pagina: 1 },
  { clave: 'ACF-0904', creditos: 5, nombre: 'CALCULO VECTORIAL', calificacion: '94', estatus: 'A', tipoEval: 'ORDINARIO', noActa: '2025205331033311', grupo: '3311', periodo: '25-26/1', pagina: 1 },
  { clave: 'AEF-1031', creditos: 5, nombre: 'FUNDAMENTOS DE BASES DE DATOS', calificacion: '93', estatus: 'A', tipoEval: 'ORDINARIO', noActa: '2025205341043421', grupo: '3421', periodo: '25-26/1', pagina: 1 },
  { clave: 'SCD-1022', creditos: 5, nombre: 'SIMULACION', calificacion: '100', estatus: 'A', tipoEval: 'ORDINARIO', noActa: '2025205351053511', grupo: '3511', periodo: '25-26/1', pagina: 1 },
  { clave: 'SCD-1027', creditos: 5, nombre: 'TOPICOS AVANZADOS DE PROGRAMACION', calificacion: '94', estatus: 'A', tipoEval: 'ORDINARIO', noActa: '2025205331063311', grupo: '3311', periodo: '25-26/1', pagina: 1 },
  { clave: 'AC61', creditos: 1, nombre: 'ACTIVIDADES COMPLEMENTARIAS (INVESTIGACION Y DESARROLLO TECNOLOGICO 2)', calificacion: '80', estatus: 'A', tipoEval: 'ACTIVIDADES COMPLEMENTARIAS', noActa: '2026117351073521', grupo: '3521', periodo: '25-26/2', pagina: 1 },
  { clave: 'ACF-0905', creditos: 0, nombre: 'ECUACIONES DIFERENCIALES', calificacion: 'NA', estatus: 'NA', tipoEval: 'ORDINARIO', noActa: '2026105341083412', grupo: '3412', periodo: '25-26/2', pagina: 1 },
  { clave: 'AEB-1055', creditos: 5, nombre: 'PROGRAMACION WEB', calificacion: '88', estatus: 'A', tipoEval: 'ORDINARIO', noActa: '2026105351093521', grupo: '3521', periodo: '25-26/2', pagina: 1 },

  // --- PÁGINA 2 ---
  { clave: 'AEC-1061', creditos: 4, nombre: 'SISTEMAS OPERATIVOS', calificacion: '83', estatus: 'A', tipoEval: 'ORDINARIO', noActa: '2026105351103521', grupo: '3521', periodo: '25-26/2', pagina: 2 },
  { clave: 'CC52_02', creditos: 0, nombre: 'Curso Cocurricular 5', calificacion: 'NA', estatus: 'NA', tipoEval: 'CURSO COCURRICULAR', noActa: '2026124351112521', grupo: '2521', periodo: '25-26/2', pagina: 2 },
  { clave: 'SCA-1025', creditos: 4, nombre: 'TALLER DE BASES DE DATOS', calificacion: '81', estatus: 'A', tipoEval: 'ORDINARIO', noActa: '2026105351123521', grupo: '3521', periodo: '25-26/2', pagina: 2 },
  { clave: 'SCC-1007', creditos: 0, nombre: 'FUNDAMENTOS DE INGENIERIA DE SOFTWARE', calificacion: 'NA', estatus: 'NA', tipoEval: 'ORDINARIO', noActa: '2026105361133611', grupo: '3611', periodo: '25-26/2', pagina: 2 },
  { clave: 'SCD-1003', creditos: 5, nombre: 'ARQUITECTURA DE COMPUTADORAS', calificacion: '75', estatus: 'A', tipoEval: 'ORDINARIO', noActa: '2026105351143521', grupo: '3521', periodo: '25-26/2', pagina: 2 },
  { clave: 'SCD-1021', creditos: 5, nombre: 'REDES DE COMPUTADORAS', calificacion: '82', estatus: 'A', tipoEval: 'ORDINARIO', noActa: '2026105351153521', grupo: '3521', periodo: '25-26/2', pagina: 2 },
  { clave: 'ACA-0909', creditos: 4, nombre: 'TALLER DE INVESTIGACION I', calificacion: 'CU', estatus: 'CU', tipoEval: 'ORDINARIO', noActa: '2026205361163621', grupo: '3621', periodo: '26-27/1', pagina: 2 },
  { clave: 'ACD-0908', creditos: 5, nombre: 'DESARROLLO SUSTENTABLE', calificacion: 'CU', estatus: 'CU', tipoEval: 'ORDINARIO', noActa: '2026205351173512', grupo: '3512', periodo: '26-27/1', pagina: 2 },
  { clave: 'ACF-0905', creditos: 5, nombre: 'ECUACIONES DIFERENCIALES', calificacion: 'CU', estatus: 'CU', tipoEval: 'ORDINARIO', noActa: '2026205341183421', grupo: '3421', periodo: '26-27/1', pagina: 2 },
  { clave: 'AT-001', creditos: 0, nombre: 'ACOMPAÑAMIENTO TUTORIAL', calificacion: 'CU', estatus: 'CU', tipoEval: 'ORDINARIO', noActa: '2026217361193621', grupo: '3621', periodo: '26-27/1', pagina: 2 },
  { clave: 'SCA-1026', creditos: 4, nombre: 'TALLER DE SISTEMAS OPERATIVOS', calificacion: 'CU', estatus: 'CU', tipoEval: 'ORDINARIO', noActa: '2026205361203621', grupo: '3621', periodo: '26-27/1', pagina: 2 },
  { clave: 'SCC-1014', creditos: 4, nombre: 'LENGUAJES DE INTERFAZ', calificacion: 'CU', estatus: 'CU', tipoEval: 'ORDINARIO', noActa: '2026205361213621', grupo: '3621', periodo: '26-27/1', pagina: 2 },
  { clave: 'SCD-1004', creditos: 5, nombre: 'CONMUTACION Y ENRUTAMIENTO DE REDES DE DATOS', calificacion: 'CU', estatus: 'CU', tipoEval: 'ORDINARIO', noActa: '2026205361223621', grupo: '3621', periodo: '26-27/1', pagina: 2 },
  { clave: 'SCD-1015', creditos: 5, nombre: 'LENGUAJES Y AUTOMATAS I', calificacion: 'CU', estatus: 'CU', tipoEval: 'ORDINARIO', noActa: '2026205361233621', grupo: '3621', periodo: '26-27/1', pagina: 2 },
  { clave: 'SS-001', creditos: 0, nombre: 'SERVICIO SOCIAL', calificacion: 'CU', estatus: 'CU', tipoEval: 'ORDINARIO', noActa: '2026217361243621', grupo: '3621', periodo: '26-27/1', pagina: 2 },
];

export const AcademicosAlumno = ({ matricula }: AcademicosAlumnoProps) => {
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstatus, setFiltroEstatus] = useState<'TODOS' | 'A' | 'NA' | 'CU'>('TODOS');
  const [paginaImpresion, setPaginaImpresion] = useState<'TODAS' | 1 | 2>('TODAS');

  const materias = matricula === '202320034' ? HISTORIAL_202320034 : [];

  const materiasFiltradas = materias.filter((m) => {
    const coincideTexto =
      m.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      m.clave.toLowerCase().includes(busqueda.toLowerCase()) ||
      m.periodo.toLowerCase().includes(busqueda.toLowerCase());

    const coincideEstatus = filtroEstatus === 'TODOS' || m.estatus === filtroEstatus;
    const coincidePagina = paginaImpresion === 'TODAS' || m.pagina === paginaImpresion;

    return coincideTexto && coincideEstatus && coincidePagina;
  });

  const handleImprimirPagina = (pagina: 1 | 2 | 'TODAS') => {
    setPaginaImpresion(pagina);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  return (
    <div className="space-y-6">
      {/* Submenú activo (Historial Académico) */}
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-700 text-white shadow-sm">
          <BookOpen className="w-4 h-4" />
          <span>Historial Académico</span>
        </span>
      </div>

      {/* Encabezado y Controles de Vista Previa de Impresión (Igual que XOOK) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">
              HISTORIAL ACADÉMICO
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Vista Previa de Impresión • Matrícula{' '}
              <span className="font-mono font-bold text-slate-700">{matricula}</span>
            </p>
          </div>

          {/* Botones oficiales de XOOK: Imprimir Página 1 / Imprimir Página 2 */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => handleImprimirPagina(1)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-700" />
              <span>Imprimir Página 1</span>
            </button>

            <button
              type="button"
              onClick={() => handleImprimirPagina(2)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-700" />
              <span>Imprimir Página 2</span>
            </button>

            {paginaImpresion !== 'TODAS' && (
              <button
                type="button"
                onClick={() => setPaginaImpresion('TODAS')}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-emerald-700 hover:bg-emerald-50 cursor-pointer"
              >
                Ver todas
              </button>
            )}
          </div>
        </div>

        {/* Filtros rápidos */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por asignatura, clave o periodo (ej. 26-27/1)..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <Filter className="w-4 h-4 text-slate-400 mr-1" />
            {(['TODOS', 'A', 'NA', 'CU'] as const).map((est) => (
              <button
                key={est}
                type="button"
                onClick={() => setFiltroEstatus(est)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                  filtroEstatus === est
                    ? 'bg-emerald-700 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {est === 'TODOS'
                  ? 'Todas'
                  : est === 'A'
                  ? 'Aprobadas (A)'
                  : est === 'NA'
                  ? 'No Acreditadas (NA)'
                  : 'Cursando (CU)'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabla Oficial de Historial Académico */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-700 text-white uppercase tracking-wider">
                <th className="py-3 px-3 font-bold">Clave</th>
                <th className="py-3 px-2 font-bold text-center">Cred.</th>
                <th className="py-3 px-3 font-bold">Nombre de la Asignatura</th>
                <th className="py-3 px-2 font-bold text-center">Calif.</th>
                <th className="py-3 px-2 font-bold text-center">Estatus</th>
                <th className="py-3 px-3 font-bold">Tipo Eval.</th>
                <th className="py-3 px-3 font-bold">No. Acta</th>
                <th className="py-3 px-2 font-bold text-center">Grupo</th>
                <th className="py-3 px-3 font-bold text-center">Periodo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {materiasFiltradas.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-500">
                    No se encontraron asignaturas con ese criterio.
                  </td>
                </tr>
              ) : (
                materiasFiltradas.map((m, idx) => (
                  <tr
                    key={`${m.clave}-${m.periodo}-${idx}`}
                    className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/80'}
                  >
                    <td className="py-2.5 px-3 font-mono font-semibold text-slate-700 whitespace-nowrap">
                      {m.clave}
                    </td>
                    <td className="py-2.5 px-2 text-center font-medium text-slate-700">
                      {m.creditos}
                    </td>
                    <td className="py-2.5 px-3 font-medium text-slate-900">
                      {m.nombre}
                    </td>
                    <td className="py-2.5 px-2 text-center font-bold">
                      <span
                        className={
                          m.estatus === 'NA'
                            ? 'text-red-600'
                            : m.estatus === 'CU'
                            ? 'text-blue-700'
                            : 'text-slate-900'
                        }
                      >
                        {m.calificacion}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded font-bold text-[11px] ${
                          m.estatus === 'A'
                            ? 'bg-emerald-100 text-emerald-800'
                            : m.estatus === 'NA'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {m.estatus}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 whitespace-nowrap">
                      {m.tipoEval}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-500 whitespace-nowrap">
                      {m.noActa}
                    </td>
                    <td className="py-2.5 px-2 text-center font-mono text-slate-700">
                      {m.grupo}
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono font-semibold text-slate-700 whitespace-nowrap">
                      {m.periodo}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Este documento es únicamente de carácter informativo y no tiene validez oficial.
          </span>
          <span>
            Mostrando <strong>{materiasFiltradas.length}</strong> registros
          </span>
        </div>
      </div>
    </div>
  );
};