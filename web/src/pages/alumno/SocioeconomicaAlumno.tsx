import { useState } from 'react';
import {
  Bus,
  Home,
  Briefcase,
  Users,
  Wifi,
  Award,
  Save,
  CheckCircle2,
} from 'lucide-react';

interface SocioeconomicaAlumnoProps {
  matricula: string;
}

const OPCIONES_OCUPACION = [
  '01. OBRERO',
  '02. TÉCNICO',
  '03. PROFESIONISTA',
  '04. EMPLEADO DE GOBIERNO',
  '05. JUBILADO',
  '06. HOGAR',
  '07. CAMPESINO',
  '08. OTRO',
  '09. DESEMPLEADO',
  '10. ESTUDIANTE',
  '11. NO LO SÉ',
];

const OPCIONES_SECTOR = [
  '1. GOBIERNO',
  '2. EMPRESA',
  '3. DESEMPLEADO',
  '4. JUBILADO',
  '5. HOGAR',
  '6. COMERCIO INFORMAL',
  '7. CAMPO',
  '8. NO LO SÉ',
];

const OPCIONES_ESCOLARIDAD = [
  '01. PRIMARIA INCOMPLETA',
  '02. PRIMARIA COMPLETA',
  '03. SECUNDARIA INCOMPLETA',
  '04. SECUNDARIA COMPLETA',
  '05. BACHILLERATO COMPLETO',
  '06. BACHILLERATO INCOMPLETO',
  '07. SUPERIOR INCOMPLETO',
  '08. SUPERIOR COMPLETO',
  '09. POSGRADO',
  '10. NO LO SÉ',
];

const OPCIONES_INGRESO = [
  '1. MENOS DE $1,500.00',
  '2. DE $1,500.00 A $3,000.00',
  '3. DE $3,000.00 A $4,500.00',
  '4. DE $4,500.00 A $6,000.00',
  '5. MAS DE $6,000.00',
  '6. NINGUNO',
];

export const SocioeconomicaAlumno = ({ matricula }: SocioeconomicaAlumnoProps) => {
  const storageKey = `tesco_socioeconomica_${matricula}`;
  const savedRaw = sessionStorage.getItem(storageKey);

  const [guardado, setGuardado] = useState(false);
  const [form, setForm] = useState(
    savedRaw
      ? JSON.parse(savedRaw)
      : {
          // 1. Traslado y Vivienda
          medioTransporte: '2. PESERO',
          tiempoTraslado: '2. ENTRE 30 Y 60 MIN',
          estadoCivil: '1. SOLTERO',
          conQuienVives: '1. PADRE Y/O MADRE',
          tipoVivienda: '1. PROPIA',
          // 2. Situación Laboral y Económica
          trabajaActualmente: 'No',
          tipoTrabajo: '4. NO TRABAJO',
          relacionEstudios: '4. NO TRABAJO',
          ingresoMensualAlumno: '6. NINGUNO',
          dependientesEconomicos: 'DE 1 A 3',
          quienSostiene: '1. PADRE Y/O MADRE',
          ingresoMensualFamiliar: '4. DE $4,500.00 A $6,000.00',
          // 3. Datos Familiares (Padre y Madre)
          padreOcupacion: '02. TÉCNICO',
          padreSector: '2. EMPRESA',
          padreEscolaridad: '05. BACHILLERATO COMPLETO',
          madreOcupacion: '06. HOGAR',
          madreSector: '5. HOGAR',
          madreEscolaridad: '04. SECUNDARIA COMPLETA',
          // 4. Bienes, Servicios y Financiamiento
          tieneComputadora: 'Si',
          tieneInternet: 'Si',
          tieneAutomovil: 'No',
          tieneAguaPotable: 'Si',
          tieneDrenaje: 'Si',
          tieneEnergiaElectrica: 'Si',
          tieneServicioMedico: 'Si',
          tipoFinanciamiento: 'No Recibo ningun financiamiento o apoyo',
        }
  );

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev: typeof form) => ({ ...prev, [name]: value }));
    setGuardado(false);
  };

  const handleToggleSiNo = (field: string, value: 'Si' | 'No') => {
    setForm((prev: typeof form) => ({ ...prev, [field]: value }));
    setGuardado(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem(storageKey, JSON.stringify(form));
    setGuardado(true);
  };

  const servicios = [
    { key: 'tieneComputadora', label: '¿Cuentas con computadora en casa?' },
    { key: 'tieneInternet', label: '¿Cuentas con acceso a Internet?' },
    { key: 'tieneAutomovil', label: '¿Tu familia cuenta con automóvil propio?' },
    { key: 'tieneAguaPotable', label: '¿La vivienda cuenta con agua potable?' },
    { key: 'tieneDrenaje', label: '¿La vivienda cuenta con drenaje?' },
    { key: 'tieneEnergiaElectrica', label: '¿La vivienda cuenta con energía eléctrica?' },
    { key: 'tieneServicioMedico', label: '¿Cuentas con servicio médico (IMSS/ISSSTE)?' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Cabecera */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
            CUESTIONARIO DE INFORMACIÓN SOCIOECONÓMICA
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Estudio estadístico institucional del TESCo • Matrícula{' '}
            <span className="font-mono font-bold text-emerald-700">{matricula}</span>
          </p>
        </div>

        {guardado && (
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold px-3.5 py-2 rounded-xl">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Cuestionario guardado</span>
          </div>
        )}
      </div>

      {/* SECCIÓN 1: Traslado, Estado Civil y Vivienda */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
          <Bus className="w-4 h-4 text-emerald-700" />
          <h3 className="text-sm font-bold text-slate-800 uppercase">
            1. Traslado, Estado Civil y Vivienda
          </h3>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Medio de transporte principal
            </label>
            <select
              name="medioTransporte"
              value={form.medioTransporte}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            >
              <option value="1. AUTOBUS">1. AUTOBÚS</option>
              <option value="2. PESERO">2. PESERO / COMBI</option>
              <option value="3. METRO">3. METRO / MEXIBÚS</option>
              <option value="4. AUTOMOVIL">4. AUTOMÓVIL</option>
              <option value="5. OTRO">5. OTRO</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tiempo de traslado al Tecnológico
            </label>
            <select
              name="tiempoTraslado"
              value={form.tiempoTraslado}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            >
              <option value="1. MENOS DE 30 MIN">1. MENOS DE 30 MIN</option>
              <option value="2. ENTRE 30 Y 60 MIN">2. ENTRE 30 Y 60 MIN</option>
              <option value="3. MAS DE 60 MIN">3. MÁS DE 60 MIN</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Estado Civil
            </label>
            <select
              name="estadoCivil"
              value={form.estadoCivil}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            >
              <option value="1. SOLTERO">1. SOLTERO(A)</option>
              <option value="2. CASADO">2. CASADO(A)</option>
              <option value="3. OTRO">3. OTRO</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Actualmente vives con
            </label>
            <select
              name="conQuienVives"
              value={form.conQuienVives}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            >
              <option value="1. PADRE Y/O MADRE">1. PADRE Y/O MADRE</option>
              <option value="2. CONYUGUE">2. CÓNYUGE</option>
              <option value="3. FAMILIARES">3. FAMILIARES</option>
              <option value="4. COMPAÑEROS">4. COMPAÑEROS</option>
              <option value="5. SOLO">5. SOLO</option>
              <option value="6. OTROS">6. OTROS</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-1 text-xs font-semibold text-slate-700 mb-1">
              <Home className="w-3.5 h-3.5 text-emerald-700" />
              <span>La vivienda que habitas es</span>
            </label>
            <select
              name="tipoVivienda"
              value={form.tipoVivienda}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            >
              <option value="1. PROPIA">1. PROPIA</option>
              <option value="2. RENTADA">2. RENTADA</option>
              <option value="3. PRESTADA">3. PRESTADA</option>
            </select>
          </div>
        </div>
      </div>

      {/* SECCIÓN 2: Situación Laboral y Económica */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-emerald-700" />
          <h3 className="text-sm font-bold text-slate-800 uppercase">
            2. Situación Laboral y Económica
          </h3>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              ¿Trabajas actualmente?
            </label>
            <select
              name="trabajaActualmente"
              value={form.trabajaActualmente}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            >
              <option value="No">No</option>
              <option value="Si">Sí</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tipo de empleo
            </label>
            <select
              name="tipoTrabajo"
              value={form.tipoTrabajo}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            >
              <option value="1. EVENTUAL">1. EVENTUAL</option>
              <option value="2. PERMANENTE">2. PERMANENTE</option>
              <option value="3. OTRO">3. OTRO</option>
              <option value="4. NO TRABAJO">4. NO TRABAJO</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Relación del trabajo con tus estudios
            </label>
            <select
              name="relacionEstudios"
              value={form.relacionEstudios}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            >
              <option value="1. MUCHO">1. MUCHO</option>
              <option value="2. POCO">2. POCO</option>
              <option value="3. NINGUNO">3. NINGUNO</option>
              <option value="4. NO TRABAJO">4. NO TRABAJO</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Ingreso mensual propio
            </label>
            <select
              name="ingresoMensualAlumno"
              value={form.ingresoMensualAlumno}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            >
              {OPCIONES_INGRESO.map((op) => (
                <option key={op} value={op}>
                  {op}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              ¿Quién sostiene tus estudios?
            </label>
            <select
              name="quienSostiene"
              value={form.quienSostiene}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            >
              <option value="1. PADRE Y/O MADRE">1. PADRE Y/O MADRE</option>
              <option value="2. CONYUGUE">2. CÓNYUGE</option>
              <option value="3. USTED MISMO">3. USTED MISMO</option>
              <option value="4. OTRO">4. OTRO</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Ingreso mensual familiar total
            </label>
            <select
              name="ingresoMensualFamiliar"
              value={form.ingresoMensualFamiliar}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            >
              {OPCIONES_INGRESO.map((op) => (
                <option key={op} value={op}>
                  {op}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Personas que dependen del ingreso familiar
            </label>
            <select
              name="dependientesEconomicos"
              value={form.dependientesEconomicos}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            >
              <option value="DE 1 A 3">DE 1 A 3</option>
              <option value="DE 4 A 6">DE 4 A 6</option>
              <option value="DE 7 A 10">DE 7 A 10</option>
              <option value="MAS DE 10">MÁS DE 10</option>
            </select>
          </div>
        </div>
      </div>

      {/* SECCIÓN 3: Datos Socioeducativos de Padre y Madre */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
          <Users className="w-4 h-4 text-emerald-700" />
          <h3 className="text-sm font-bold text-slate-800 uppercase">
            3. Datos de Padre y Madre
          </h3>
        </div>
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Columna Padre */}
          <div className="space-y-3 p-4 rounded-xl bg-slate-50/70 border border-slate-100">
            <h4 className="text-xs font-extrabold uppercase text-emerald-800">
              Información del Padre
            </h4>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ocupación
              </label>
              <select
                name="padreOcupacion"
                value={form.padreOcupacion}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl bg-white"
              >
                {OPCIONES_OCUPACION.map((op) => (
                  <option key={op} value={op}>
                    {op}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Sector donde labora
              </label>
              <select
                name="padreSector"
                value={form.padreSector}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl bg-white"
              >
                {OPCIONES_SECTOR.map((op) => (
                  <option key={op} value={op}>
                    {op}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Escolaridad máxima
              </label>
              <select
                name="padreEscolaridad"
                value={form.padreEscolaridad}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl bg-white"
              >
                {OPCIONES_ESCOLARIDAD.map((op) => (
                  <option key={op} value={op}>
                    {op}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Columna Madre */}
          <div className="space-y-3 p-4 rounded-xl bg-slate-50/70 border border-slate-100">
            <h4 className="text-xs font-extrabold uppercase text-emerald-800">
              Información de la Madre
            </h4>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ocupación
              </label>
              <select
                name="madreOcupacion"
                value={form.madreOcupacion}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl bg-white"
              >
                {OPCIONES_OCUPACION.map((op) => (
                  <option key={op} value={op}>
                    {op}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Sector donde labora
              </label>
              <select
                name="madreSector"
                value={form.madreSector}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl bg-white"
              >
                {OPCIONES_SECTOR.map((op) => (
                  <option key={op} value={op}>
                    {op}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Escolaridad máxima
              </label>
              <select
                name="madreEscolaridad"
                value={form.madreEscolaridad}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl bg-white"
              >
                {OPCIONES_ESCOLARIDAD.map((op) => (
                  <option key={op} value={op}>
                    {op}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN 4: Servicios en el Hogar y Financiamiento / Becas */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
          <Wifi className="w-4 h-4 text-emerald-700" />
          <h3 className="text-sm font-bold text-slate-800 uppercase">
            4. Servicios en el Hogar y Financiamiento
          </h3>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {servicios.map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/40"
              >
                <span className="text-xs sm:text-sm font-medium text-slate-700">
                  {item.label}
                </span>
                <div className="flex items-center gap-1.5 shrink-0">
                  {(['Si', 'No'] as const).map((opcion) => (
                    <button
                      key={opcion}
                      type="button"
                      onClick={() => handleToggleSiNo(item.key, opcion)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        form[item.key] === opcion
                          ? 'bg-emerald-700 text-white'
                          : 'bg-white text-slate-500 border border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {opcion === 'Si' ? 'Sí' : 'No'}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1.5">
              <Award className="w-4 h-4 text-emerald-700" />
              <span>Beca o Financiamiento Educativo</span>
            </label>
            <select
              name="tipoFinanciamiento"
              value={form.tipoFinanciamiento}
              onChange={handleChange}
              className="w-full sm:max-w-md px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            >
              <option value="No Recibo ningun financiamiento o apoyo">
                No recibo ningún financiamiento o apoyo
              </option>
              <option value="Organismo Publico Mexicano">
                Organismo Público Mexicano (Beca Benito Juárez / Jóvenes Escribiendo el Futuro)
              </option>
              <option value="Organismo Privado Mexicano">
                Organismo Privado Mexicano
              </option>
              <option value="Organismo Extranjero">
                Organismo Extranjero
              </option>
            </select>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm px-6 py-2.5 rounded-xl shadow-sm transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Actualizar Cuestionario Socioeconómico</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};