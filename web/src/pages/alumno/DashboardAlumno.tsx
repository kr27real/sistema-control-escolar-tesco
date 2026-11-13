import {
  CheckCircle2,
  XCircle,
  BookOpenCheck,
  AlertTriangle,
  Award,
  TrendingUp,
  Bell,
  UserCircle2,
  Download,
} from 'lucide-react';

interface DashboardAlumnoProps {
  matricula: string;
}

export const DashboardAlumno = ({ matricula }: DashboardAlumnoProps) => {
  const savedAlumnoRaw = sessionStorage.getItem('tesco_demo_alumno');
  const savedAlumno = savedAlumnoRaw ? JSON.parse(savedAlumnoRaw) : null;
  const isCustom = savedAlumno && savedAlumno.matricula === matricula;

  const datos = isCustom
    ? {
        nombre: `${savedAlumno.apellidoPaterno} ${savedAlumno.apellidoMaterno} ${savedAlumno.nombre}`.toUpperCase(),
        carrera: savedAlumno.carrera.toUpperCase(),
        aprobadas: 0,
        reprobadas: 0,
        totalCursadas: 0,
        regular: 'Sí',
        creditos: 0,
        promedio: '0.00',
      }
    : {
        nombre: 'RAMIREZ SORIA KEVIN',
        carrera: 'INGENIERÍA EN SISTEMAS COMPUTACIONALES',
        aprobadas: 29,
        reprobadas: 2,
        totalCursadas: 31,
        regular: 'No',
        creditos: 138,
        promedio: '82.11',
      };

  return (
    <div className="space-y-6">
      {/* Encabezado Superior */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Resumen Académico • Matrícula {matricula}
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
            DATOS GENERALES
          </h2>
          <p className="text-sm text-slate-500">{datos.carrera}</p>
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Imprimir Ficha</span>
        </button>
      </div>

      {/* Bloque Principal: Ficha + Fotografía (Sustituye al recuadro roto de XOOK) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
        <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-6">
          {/* Lista de datos oficiales */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 flex-1 w-full text-sm">
            <div className="sm:col-span-2 border-b border-slate-100 pb-3">
              <p className="text-xs font-semibold text-slate-400 uppercase">Nombre</p>
              <p className="text-base font-bold text-slate-900 mt-0.5">{datos.nombre}</p>
            </div>

            <div className="sm:col-span-2 border-b border-slate-100 pb-3">
              <p className="text-xs font-semibold text-slate-400 uppercase">Carrera</p>
              <p className="font-semibold text-slate-800 mt-0.5">{datos.carrera}</p>
            </div>

            <div className="flex items-center justify-between sm:justify-start sm:gap-4 bg-slate-50 p-3 rounded-xl">
              <span className="text-slate-500 font-medium">Regular:</span>
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold ${
                  datos.regular === 'Sí'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {datos.regular === 'No' && <AlertTriangle className="w-3.5 h-3.5" />}
                {datos.regular}
              </span>
            </div>

            <div className="flex items-center justify-between sm:justify-start sm:gap-4 bg-slate-50 p-3 rounded-xl">
              <span className="text-slate-500 font-medium">Total Cursadas:</span>
              <span className="font-bold text-slate-900">{datos.totalCursadas}</span>
            </div>
          </div>

          {/* Fotografía del Alumno */}
          <div className="flex flex-col items-center self-center md:self-start shrink-0">
            <div className="w-32 h-36 rounded-2xl border-2 border-slate-200 bg-slate-100 flex flex-col items-center justify-center text-slate-400 overflow-hidden shadow-inner">
              <UserCircle2 className="w-16 h-16 text-slate-300" />
              <span className="text-[10px] font-semibold uppercase tracking-wider mt-1">
                Foto Alumno
              </span>
            </div>
            <span className="text-xs font-mono text-slate-500 mt-2">{matricula}</span>
          </div>
        </div>
      </div>

      {/* Indicadores Numéricos (Tarjetas KPI) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase">
            <span>Asignaturas Aprobadas</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-emerald-700 mt-2">{datos.aprobadas}</p>
          <p className="text-xs text-slate-400 mt-1">De {datos.totalCursadas} cursadas</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase">
            <span>Asignaturas Reprobadas</span>
            <XCircle className="w-4 h-4 text-red-500" />
          </div>
          <p className="text-3xl font-extrabold text-red-600 mt-2">{datos.reprobadas}</p>
          <p className="text-xs text-slate-400 mt-1">Pendientes por acreditar</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase">
            <span>Créditos Acumulados</span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">{datos.creditos}</p>
          <p className="text-xs text-slate-400 mt-1">Avance reticular</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase">
            <span>Promedio General</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">{datos.promedio}</p>
          <p className="text-xs text-slate-400 mt-1">Escala 0 a 100</p>
        </div>
      </div>

      {/* Sección Inferior: AVISOS PARTICULARES (Igual que en XOOK) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 bg-amber-50/80 border-b border-amber-100 flex items-center gap-2.5">
          <Bell className="w-5 h-5 text-amber-600" />
          <h3 className="font-bold text-slate-900 text-sm tracking-wide uppercase">
            Avisos Particulares
          </h3>
        </div>
        <div className="p-6 space-y-3 text-sm">
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <BookOpenCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-800">
                Proceso de Residencias Profesionales — Periodo 2026-2
              </p>
              <p className="text-slate-600 text-xs mt-1">
                Recuerda validar tus créditos acumulados ({datos.creditos}) y mantener actualizada
                tu ficha de datos en el módulo <strong>Generales</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};