import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  ShieldAlert,
  UserPlus,
} from 'lucide-react';
import { sanitizeInput, isValidMatricula } from '../../utils/sanitize';
import type { RegistroAlumnoDTO } from '../../types/alumno';

const CARRERAS_TESCO = [
  'Ingeniería en Sistemas Computacionales',
  'Ingeniería en Tecnologías de la Información y Comunicaciones',
  'Ingeniería Industrial',
  'Ingeniería Electromecánica',
  'Ingeniería Mecatrónica',
  'Ingeniería Química',
  'Ingeniería Ambiental',
  'Ingeniería en Gestión Empresarial',
  'Licenciatura en Administración',
  'Contador Público',
];

export const RegistroAlumno = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegistroAlumnoDTO>({
    matricula: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    curp: '',
    correoInstitucional: '',
    telefono: '',
    carrera: CARRERAS_TESCO[0],
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [registrado, setRegistrado] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'curp' || name === 'matricula' ? value.toUpperCase() : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanData: RegistroAlumnoDTO = {
      ...formData,
      matricula: sanitizeInput(formData.matricula),
      nombre: sanitizeInput(formData.nombre),
      apellidoPaterno: sanitizeInput(formData.apellidoPaterno),
      apellidoMaterno: sanitizeInput(formData.apellidoMaterno),
      curp: sanitizeInput(formData.curp),
      correoInstitucional: sanitizeInput(formData.correoInstitucional).toLowerCase(),
      telefono: sanitizeInput(formData.telefono),
    };

    if (!isValidMatricula(cleanData.matricula)) {
      setError('La matrícula debe tener entre 6 y 13 caracteres alfanuméricos.');
      return;
    }

    const curpRegex = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[0-9A-Z]\d$/;
    if (!curpRegex.test(cleanData.curp)) {
      setError('El formato de la CURP no es válido (18 caracteres).');
      return;
    }

    if (cleanData.password.length < 6) {
      setError('Por seguridad, la contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (cleanData.password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    sessionStorage.setItem('tesco_demo_alumno', JSON.stringify(cleanData));

    setRegistrado(true);
    setTimeout(() => {
      navigate('/');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header compacto */}
      <header className="bg-emerald-950 text-white py-4 shadow-md">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1 rounded-lg shadow-xs shrink-0">
              <img
                src="/images/logos/logo-tesco.png"
                alt="Escudo TESCo"
                className="h-9 w-auto object-contain"
              />
            </div>
            <div>
              <h1 className="font-bold text-base sm:text-lg">
                Registro de Alumnos — Control Escolar TESCo
              </h1>
              <p className="text-xs text-emerald-300">Alta en el Sistema Institucional</p>
            </div>
          </div>
          <Link
            to="/"
            className="flex items-center gap-1.5 text-xs sm:text-sm text-emerald-200 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al inicio</span>
          </Link>
        </div>
      </header>

      {/* Formulario */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8">
          {registrado ? (
            <div className="py-12 text-center space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
              <h2 className="text-2xl font-bold text-slate-900">
                ¡Registro Completado con Éxito!
              </h2>
              <p className="text-slate-600 max-w-md mx-auto text-sm">
                Tus datos han sido validados. Redirigiendo al portal principal para que inicies
                sesión con tu matrícula <strong>{formData.matricula}</strong>...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-emerald-700" />
                  <span>Ficha de Registro Estudiantil</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Completa todos los campos oficiales. Esta información sincronizará tu perfil en
                  Web, Escritorio y App Móvil.
                </p>
              </div>

              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm p-3.5 rounded-xl">
                  <ShieldAlert className="w-5 h-5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Datos Académicos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Matrícula Institucional *
                  </label>
                  <input
                    type="text"
                    name="matricula"
                    maxLength={13}
                    required
                    value={formData.matricula}
                    onChange={handleChange}
                    placeholder="Ej. 202320034"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Carrera / Programa Educativo *
                  </label>
                  <select
                    name="carrera"
                    value={formData.carrera}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-white"
                  >
                    {CARRERAS_TESCO.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Datos Personales */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nombre(s) *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Apellido Paterno *
                  </label>
                  <input
                    type="text"
                    name="apellidoPaterno"
                    required
                    value={formData.apellidoPaterno}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Apellido Materno *
                  </label>
                  <input
                    type="text"
                    name="apellidoMaterno"
                    required
                    value={formData.apellidoMaterno}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Identificación y Contacto */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    CURP (18 caracteres) *
                  </label>
                  <input
                    type="text"
                    name="curp"
                    maxLength={18}
                    required
                    value={formData.curp}
                    onChange={handleChange}
                    placeholder="AAAA000000HDFXXX00"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    name="correoInstitucional"
                    required
                    value={formData.correoInstitucional}
                    onChange={handleChange}
                    placeholder="alumno@tesco.edu.mx"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Teléfono Celular *
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    maxLength={10}
                    required
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="5512345678"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Seguridad de Cuenta */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Contraseña (mínimo 6 caracteres) *
                  </label>
                  <input
                    type="password"
                    name="password"
                    maxLength={60}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Confirmar Contraseña *
                  </label>
                  <input
                    type="password"
                    maxLength={60}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <Link
                  to="/"
                  className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Cancelar
                </Link>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-sm font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl shadow-md transition-colors cursor-pointer"
                >
                  Completar Registro
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};