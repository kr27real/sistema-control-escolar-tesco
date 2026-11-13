import { useState } from 'react';
import {
  User,
  Briefcase,
  GraduationCap,
  Save,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  ShieldAlert,
  School,
} from 'lucide-react';
import { sanitizeInput } from '../../utils/sanitize';
import { SocioeconomicaAlumno } from './SocioeconomicaAlumno';

interface GeneralesAlumnoProps {
  matricula: string;
}

type SubTabGenerales = 'personal' | 'socioeconomica' | 'bachillerato';

export const GeneralesAlumno = ({ matricula }: GeneralesAlumnoProps) => {
  const [subTab, setSubTab] = useState<SubTabGenerales>('personal');
  const [guardadoPersonal, setGuardadoPersonal] = useState(false);
  const [guardadoBachillerato, setGuardadoBachillerato] = useState(false);
  const [error, setError] = useState('');

  // --- 1. ESTADO DE INFORMACIÓN PERSONAL ---
  const storageKeyPersonal = `tesco_generales_${matricula}`;
  const savedPersonalRaw = sessionStorage.getItem(storageKeyPersonal);
  const initialPersonal = savedPersonalRaw
    ? JSON.parse(savedPersonalRaw)
    : {
        nombreCompleto: 'RAMIREZ SORIA KEVIN',
        curp: 'RASK010218HDFMRVA0',
        sexo: 'Masculino',
        fechaNacimiento: '2001-02-18',
        email: 'jerrysoria32@gmail.com',
        telefonoCasa: '5539889485',
        telefonoTrabajo: '',
        telefonoCelular: '5548166341',
        entidad: 'MEXICO',
        municipio: 'TULTITLAN',
        colonia: 'San Mateo Cuautepec',
        calle: 'NIÑOS HEROES SAN MATEO CUAUTEPEC 1',
        noExterior: '25',
        noInterior: '',
        calle1: 'Vicente Guerrero',
        calle2: 'Morelos',
        referencias:
          'Hay una pared color blanco, un local de Herbalife, poste de madera y puerta verde.',
      };

  const [formPersonal, setFormPersonal] = useState(initialPersonal);

  // --- 2. ESTADO DE INFORMACIÓN BACHILLERATO ---
  const storageKeyBachillerato = `tesco_bachillerato_${matricula}`;
  const savedBachilleratoRaw = sessionStorage.getItem(storageKeyBachillerato);
  const initialBachillerato = savedBachilleratoRaw
    ? JSON.parse(savedBachilleratoRaw)
    : {
        escuelaProcedencia: 'CECyTEM Plantel Tultitlán',
        tipoInstitucion: 'Pública Estatal',
        entidadBachillerato: 'MEXICO',
        municipioBachillerato: 'TULTITLAN',
        areaEspecialidad: 'Físico - Matemático / Técnico en Programación',
        anioEgreso: '2019',
        promedioBachillerato: '8.7',
      };

  const [formBachillerato, setFormBachillerato] = useState(initialBachillerato);

  // Manejadores Información Personal
  const handleChangePersonal = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormPersonal((prev: typeof initialPersonal) => ({
      ...prev,
      [name]: name === 'curp' ? value.toUpperCase() : value,
    }));
    setGuardadoPersonal(false);
  };

  const handleGuardarPersonal = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanForm = {
      ...formPersonal,
      curp: sanitizeInput(formPersonal.curp),
      email: sanitizeInput(formPersonal.email).toLowerCase(),
      telefonoCasa: sanitizeInput(formPersonal.telefonoCasa),
      telefonoTrabajo: sanitizeInput(formPersonal.telefonoTrabajo),
      telefonoCelular: sanitizeInput(formPersonal.telefonoCelular),
      entidad: sanitizeInput(formPersonal.entidad),
      municipio: sanitizeInput(formPersonal.municipio),
      colonia: sanitizeInput(formPersonal.colonia),
      calle: sanitizeInput(formPersonal.calle),
      noExterior: sanitizeInput(formPersonal.noExterior),
      noInterior: sanitizeInput(formPersonal.noInterior),
      calle1: sanitizeInput(formPersonal.calle1),
      calle2: sanitizeInput(formPersonal.calle2),
      referencias: sanitizeInput(formPersonal.referencias),
    };

    if (cleanForm.curp.length !== 18) {
      setError('La CURP debe contener exactamente 18 caracteres.');
      return;
    }

    if (!cleanForm.email.includes('@')) {
      setError('Ingresa un correo electrónico válido.');
      return;
    }

    sessionStorage.setItem(storageKeyPersonal, JSON.stringify(cleanForm));
    setFormPersonal(cleanForm);
    setGuardadoPersonal(true);
  };

  // Manejadores Información Bachillerato
  const handleChangeBachillerato = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormBachillerato((prev: typeof initialBachillerato) => ({
      ...prev,
      [name]: value,
    }));
    setGuardadoBachillerato(false);
  };

  const handleGuardarBachillerato = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanBach = {
      ...formBachillerato,
      escuelaProcedencia: sanitizeInput(formBachillerato.escuelaProcedencia),
      municipioBachillerato: sanitizeInput(formBachillerato.municipioBachillerato),
      areaEspecialidad: sanitizeInput(formBachillerato.areaEspecialidad),
      anioEgreso: sanitizeInput(formBachillerato.anioEgreso),
      promedioBachillerato: sanitizeInput(formBachillerato.promedioBachillerato),
    };
    sessionStorage.setItem(storageKeyBachillerato, JSON.stringify(cleanBach));
    setFormBachillerato(cleanBach);
    setGuardadoBachillerato(true);
  };

  const subTabClass = (tab: SubTabGenerales) =>
    `flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
      subTab === tab
        ? 'bg-emerald-700 text-white shadow-sm'
        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
    }`;

  return (
    <div className="space-y-6">
      {/* Submenú de Generales */}
      <div className="flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={() => setSubTab('personal')}
          className={subTabClass('personal')}
        >
          <User className="w-4 h-4" />
          <span>Información Personal</span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab('socioeconomica')}
          className={subTabClass('socioeconomica')}
        >
          <Briefcase className="w-4 h-4" />
          <span>Información Socioeconómica</span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab('bachillerato')}
          className={subTabClass('bachillerato')}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Información Bachillerato</span>
        </button>
      </div>

      {/* =========================================================
          SUBMENÚ 1: INFORMACIÓN PERSONAL
         ========================================================= */}
      {subTab === 'personal' && (
        <form onSubmit={handleGuardarPersonal} className="space-y-6">
          {/* Bloque 1: Identificación y Contacto */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">
                  INFORMACIÓN PERSONAL
                </h2>
                <p className="text-xs text-slate-500">
                  Verifica y mantén actualizados tus datos oficiales de contacto
                </p>
              </div>
              <div className="text-xs font-mono bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-lg border border-emerald-200">
                Matrícula: <strong>{matricula}</strong>
              </div>
            </div>

            <div className="p-6 space-y-5">
              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-xs p-3.5 rounded-xl">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {guardadoPersonal && (
                <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3.5 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>Información actualizada correctamente en tu expediente digital.</span>
                </div>
              )}

              {/* Nombre de solo lectura */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <span className="text-[11px] font-bold uppercase text-slate-400 block">
                  Nombre del Alumno
                </span>
                <span className="text-sm sm:text-base font-bold text-slate-900">
                  {formPersonal.nombreCompleto}
                </span>
              </div>

              {/* CURP, Sexo, Fecha Nacimiento */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    CURP
                  </label>
                  <input
                    type="text"
                    name="curp"
                    maxLength={18}
                    value={formPersonal.curp}
                    onChange={handleChangePersonal}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Sexo
                  </label>
                  <select
                    name="sexo"
                    value={formPersonal.sexo}
                    onChange={handleChangePersonal}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  >
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Fecha de Nacimiento
                  </label>
                  <input
                    type="date"
                    name="fechaNacimiento"
                    value={formPersonal.fechaNacimiento}
                    onChange={handleChangePersonal}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Correo y Teléfonos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-slate-100">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1">
                    <Mail className="w-3.5 h-3.5 text-emerald-700" />
                    <span>E-Mail</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formPersonal.email}
                    onChange={handleChangePersonal}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>Teléfono Casa</span>
                  </label>
                  <input
                    type="tel"
                    name="telefonoCasa"
                    maxLength={10}
                    value={formPersonal.telefonoCasa}
                    onChange={handleChangePersonal}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>Teléfono Trabajo</span>
                  </label>
                  <input
                    type="tel"
                    name="telefonoTrabajo"
                    maxLength={10}
                    value={formPersonal.telefonoTrabajo}
                    onChange={handleChangePersonal}
                    placeholder="Opcional"
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1">
                    <Phone className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Teléfono Celular</span>
                  </label>
                  <input
                    type="tel"
                    name="telefonoCelular"
                    maxLength={10}
                    value={formPersonal.telefonoCelular}
                    onChange={handleChangePersonal}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bloque 2: DOMICILIO + Croquis Dinámico */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-700" />
              <h3 className="text-base font-extrabold text-slate-900">DOMICILIO</h3>
            </div>

            <div className="p-6 space-y-5">
              {/* Entidad, Municipio, Colonia */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Entidad
                  </label>
                  <select
                    name="entidad"
                    value={formPersonal.entidad}
                    onChange={handleChangePersonal}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  >
                    <option value="MEXICO">MÉXICO</option>
                    <option value="CIUDAD DE MEXICO">CIUDAD DE MÉXICO</option>
                    <option value="HIDALGO">HIDALGO</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Municipio o Delegación
                  </label>
                  <input
                    type="text"
                    name="municipio"
                    value={formPersonal.municipio}
                    onChange={handleChangePersonal}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Colonia
                  </label>
                  <input
                    type="text"
                    name="colonia"
                    value={formPersonal.colonia}
                    onChange={handleChangePersonal}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Calles + Croquis Visual Interactivo */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-2">
                <div className="lg:col-span-7 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mi Calle
                    </label>
                    <input
                      type="text"
                      name="calle"
                      value={formPersonal.calle}
                      onChange={handleChangePersonal}
                      className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        No. Exterior (Núm, Mz y/o Lt)
                      </label>
                      <input
                        type="text"
                        name="noExterior"
                        value={formPersonal.noExterior}
                        onChange={handleChangePersonal}
                        className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        No. Interior
                      </label>
                      <input
                        type="text"
                        name="noInterior"
                        value={formPersonal.noInterior}
                        onChange={handleChangePersonal}
                        placeholder="Opcional"
                        className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Entre Calle 1
                      </label>
                      <input
                        type="text"
                        name="calle1"
                        value={formPersonal.calle1}
                        onChange={handleChangePersonal}
                        className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Y Calle 2
                      </label>
                      <input
                        type="text"
                        name="calle2"
                        value={formPersonal.calle2}
                        onChange={handleChangePersonal}
                        className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Croquis Dinámico en Tiempo Real */}
                <div className="lg:col-span-5 bg-slate-100 rounded-2xl p-4 border border-slate-200">
                  <p className="text-[11px] font-bold text-slate-500 uppercase text-center mb-2">
                    Croquis de Ubicación en Tiempo Real
                  </p>
                  <div className="relative h-48 bg-slate-200 rounded-xl overflow-hidden grid grid-cols-3 grid-rows-3 gap-2 p-2 text-[10px] font-semibold">
                    <div className="bg-emerald-800/15 rounded-lg border border-emerald-800/20" />
                    <div className="bg-emerald-800/15 rounded-lg border border-emerald-800/20" />
                    <div className="bg-emerald-800/15 rounded-lg border border-emerald-800/20" />

                    <div className="flex items-center justify-center bg-white rounded-md px-1 text-center text-slate-700 shadow-2xs truncate">
                      {formPersonal.calle1 || 'Calle 1'}
                    </div>
                    <div className="flex items-center justify-center bg-emerald-700 text-white rounded-md px-1.5 text-center shadow-sm truncate">
                      {formPersonal.calle || 'Mi Calle'}
                    </div>
                    <div className="flex items-center justify-center bg-white rounded-md px-1 text-center text-slate-700 shadow-2xs truncate">
                      {formPersonal.calle2 || 'Calle 2'}
                    </div>

                    <div className="bg-emerald-800/15 rounded-lg border border-emerald-800/20" />
                    <div className="bg-emerald-800/15 rounded-lg border border-emerald-800/20" />
                    <div className="bg-emerald-800/15 rounded-lg border border-emerald-800/20" />
                  </div>
                </div>
              </div>

              {/* Referencias */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Referencias de Ubicación
                </label>
                <p className="text-[11px] text-slate-400 mb-1.5">
                  Si tu domicilio no tiene número oficial, escribe alguna referencia cercana
                  (tienda, fachada, poste, etc.).
                </p>
                <textarea
                  name="referencias"
                  rows={2}
                  value={formPersonal.referencias}
                  onChange={handleChangePersonal}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              {/* Botón Actualizar Información */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
                <span className="text-xs text-slate-500">
                  Haz clic en el botón para guardar los cambios en tu expediente.
                </span>
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm px-6 py-2.5 rounded-xl shadow-sm transition-colors cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Actualizar Información</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* =========================================================
          SUBMENÚ 2: INFORMACIÓN SOCIOECONÓMICA
         ========================================================= */}
      {subTab === 'socioeconomica' && (
        <SocioeconomicaAlumno matricula={matricula} />
      )}

      {/* =========================================================
          SUBMENÚ 3: INFORMACIÓN BACHILLERATO
         ========================================================= */}
      {subTab === 'bachillerato' && (
        <form
          onSubmit={handleGuardarBachillerato}
          className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden"
        >
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
            <School className="w-5 h-5 text-emerald-700" />
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">
                INFORMACIÓN DE BACHILLERATO
              </h2>
              <p className="text-xs text-slate-500">
                Antecedentes académicos de educación media superior
              </p>
            </div>
          </div>

          <div className="p-6 space-y-5">
            {guardadoBachillerato && (
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3.5 rounded-xl">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>Información de bachillerato actualizada correctamente.</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Escuela de Procedencia
                </label>
                <input
                  type="text"
                  name="escuelaProcedencia"
                  value={formBachillerato.escuelaProcedencia}
                  onChange={handleChangeBachillerato}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Régimen / Tipo de Institución
                </label>
                <select
                  name="tipoInstitucion"
                  value={formBachillerato.tipoInstitucion}
                  onChange={handleChangeBachillerato}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                >
                  <option value="Pública Estatal">Pública Estatal (CECyTEM / COBAEM / CBT)</option>
                  <option value="Pública Federal">Pública Federal (DGETI / CETis / CBTis)</option>
                  <option value="UNAM / IPN">UNAM (ENP / CCH) / IPN (CECyT)</option>
                  <option value="Privada">Institución Privada</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Entidad Federativa
                </label>
                <select
                  name="entidadBachillerato"
                  value={formBachillerato.entidadBachillerato}
                  onChange={handleChangeBachillerato}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                >
                  <option value="MEXICO">MÉXICO</option>
                  <option value="CIUDAD DE MEXICO">CIUDAD DE MÉXICO</option>
                  <option value="HIDALGO">HIDALGO</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Municipio o Alcaldía
                </label>
                <input
                  type="text"
                  name="municipioBachillerato"
                  value={formBachillerato.municipioBachillerato}
                  onChange={handleChangeBachillerato}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Área / Especialidad
                </label>
                <input
                  type="text"
                  name="areaEspecialidad"
                  value={formBachillerato.areaEspecialidad}
                  onChange={handleChangeBachillerato}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Año de Egreso
                </label>
                <input
                  type="number"
                  name="anioEgreso"
                  min={1990}
                  max={2026}
                  value={formBachillerato.anioEgreso}
                  onChange={handleChangeBachillerato}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Promedio General Certificado
                </label>
                <input
                  type="number"
                  step="0.1"
                  min={6.0}
                  max={10.0}
                  name="promedioBachillerato"
                  value={formBachillerato.promedioBachillerato}
                  onChange={handleChangeBachillerato}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm px-6 py-2.5 rounded-xl shadow-sm transition-colors cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Guardar Información de Bachillerato</span>
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};