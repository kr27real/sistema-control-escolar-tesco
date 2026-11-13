import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  UserPlus,
  LogIn,
  ShieldAlert,
  Building2,
  BookOpen,
  Lock,
  User,
  X,
} from 'lucide-react';
import { sanitizeInput, isValidMatricula } from '../../utils/sanitize';

interface LandingPortalProps {
  onLoginSuccess: (matricula: string) => void;
}

export const LandingPortal = ({ onLoginSuccess }: LandingPortalProps) => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanUser = sanitizeInput(usuario).toUpperCase();

    if (!isValidMatricula(cleanUser)) {
      setError('Ingresa una matrícula válida (6 a 13 caracteres alfanuméricos).');
      return;
    }

    if (password.length < 6 || password.length > 60) {
      setError('La contraseña debe tener entre 6 y 60 caracteres.');
      return;
    }

    const savedAlumnoRaw = sessionStorage.getItem('tesco_demo_alumno');
    const savedAlumno = savedAlumnoRaw ? JSON.parse(savedAlumnoRaw) : null;

    const isDefaultDemo = cleanUser === '202320034' && password === 'alumno';
    const isRegisteredDemo =
      savedAlumno &&
      savedAlumno.matricula === cleanUser &&
      savedAlumno.password === password;

    if (!isDefaultDemo && !isRegisteredDemo) {
      setError('Matrícula o contraseña incorrecta. (Demo: 202320034 / alumno)');
      return;
    }

    onLoginSuccess(cleanUser);
    navigate('/alumno/inicio');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Cabecera Institucional */}
      <header className="bg-emerald-950 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="bg-white p-1.5 rounded-xl shadow-sm shrink-0">
              <img
                src="/images/logos/logo-tesco.png"
                alt="Escudo TESCo"
                className="h-11 w-auto object-contain"
              />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-emerald-300 font-semibold">
                Plataforma Institucional Nativa
              </span>
              <h1 className="text-lg sm:text-xl font-bold leading-tight">
                Sistema de Información de Control Escolar
              </h1>
            </div>
          </div>

          {/* Accesos secundarios (Docente / Admin como en XOOK original) */}
          <div className="flex items-center gap-3 text-xs">
            <span className="text-emerald-300 hidden md:inline">Otros accesos:</span>
            <button
              type="button"
              disabled
              title="Módulo Docente (Administrado en sistema externo)"
              className="px-3 py-1.5 rounded-lg bg-emerald-900/70 text-emerald-300/70 border border-emerald-800 cursor-not-allowed"
            >
              Docentes
            </button>
            <button
              type="button"
              disabled
              title="Cliente Administrativo WinUI 3"
              className="px-3 py-1.5 rounded-lg bg-emerald-900/70 text-emerald-300/70 border border-emerald-800 cursor-not-allowed"
            >
              Administrativos
            </button>
          </div>
        </div>
      </header>

      {/* Hero Principal enfocado al Alumno */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          {/* Columna Izquierda: Bienvenida y Acciones */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-semibold">
              <Building2 className="w-4 h-4" />
              <span>Tecnológico de Estudios Superiores de Coacalco (TESCo)</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Portal Integral de Registro y Gestión para{' '}
              <span className="text-emerald-700">Alumnos</span>
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Realiza tu registro escolar, consulta tu historial académico, descarga tu
              comprobante de inscripción y mantén actualizada tu información institucional desde
              cualquier dispositivo.
            </p>

            {/* Botones principales de acción */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => setShowLoginModal(true)}
                className="flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <LogIn className="w-5 h-5" />
                <span>Acceso Alumnos</span>
              </button>

              <Link
                to="/registro-alumno"
                className="flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-emerald-900 border-2 border-emerald-700 font-semibold px-6 py-3.5 rounded-xl transition-all"
              >
                <UserPlus className="w-5 h-5" />
                <span>Registrarme como Alumno</span>
              </Link>
            </div>
          </div>

          {/* Columna Derecha: Tarjeta Informativa */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="bg-emerald-50 p-3 rounded-xl text-emerald-700">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Trámites Disponibles</h3>
                  <p className="text-xs text-slate-500">Servicios escolares en línea</p>
                </div>
              </div>

              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span>
                    <strong>Registro de Nuevo Ingreso y Reinscripción:</strong> Alta digital de
                    expediente estudiantil con validación de matrícula.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span>
                    <strong>Consulta de Kárdex y Calificaciones:</strong> Visualización clara por
                    semestre y periodo escolar.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span>
                    <strong>Sincronización Multiplataforma:</strong> Datos conectados con el
                    sistema de Control Escolar y App Móvil.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Pie de página institucional */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <p className="text-slate-200 font-semibold">
              Departamento de Control Escolar — Tecnológico de Estudios Superiores de Coacalco
            </p>
            <p className="mt-1">
              Av. 16 de septiembre #54, C.P. 55700, Col. Cabecera Municipal, Coacalco de
              Berriozábal, Estado de México
            </p>
          </div>
          <div className="md:text-right">
            <p>Teléfonos: (55) 2159 4324, 2159 4325 y 2159 4468</p>
            <p className="text-emerald-400 mt-1">www.tecnologicodecoacalco.edu.mx</p>
          </div>
        </div>
      </footer>

      {/* Modal Modernizado de "Acceso Alumnos" */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200">
            <div className="bg-emerald-950 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-base">Acceso Alumnos</h3>
              </div>
              <button
                onClick={() => {
                  setShowLoginModal(false);
                  setError('');
                }}
                className="text-slate-300 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
                aria-label="Cerrar ventana"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleLoginSubmit} className="p-6 space-y-4">
              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-lg">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label
                  htmlFor="txtUser"
                  className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
                >
                  Usuario / Matrícula
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    id="txtUser"
                    type="text"
                    maxLength={13}
                    required
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    placeholder="Ej. 202320034"
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="txtPwd"
                  className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    id="txtPwd"
                    type="password"
                    maxLength={60}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowLoginModal(false);
                    setError('');
                  }}
                  className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-sm font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl shadow-sm transition-colors cursor-pointer"
                >
                  Entrar
                </button>
              </div>

              <div className="border-t border-slate-100 pt-3 text-center text-xs text-slate-500">
                ¿Aún no tienes cuenta en el sistema?{' '}
                <Link
                  to="/registro-alumno"
                  className="text-emerald-700 font-semibold hover:underline"
                >
                  Regístrate aquí
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};