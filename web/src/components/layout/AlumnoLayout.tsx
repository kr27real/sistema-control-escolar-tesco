import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  Home,
  User,
  BookOpen,
  Calendar,
  RefreshCw,
  Award,
  LogOut,
  ShieldCheck,
} from 'lucide-react';

interface AlumnoLayoutProps {
  alumnoNombre?: string;
  matricula?: string;
  onLogout: () => void;
}

export const AlumnoLayout = ({
  alumnoNombre = 'RAMIREZ SORIA KEVIN',
  matricula = '202320034',
  onLogout,
}: AlumnoLayoutProps) => {
  const navigate = useNavigate();

  const handleSalir = () => {
    onLogout();
    navigate('/');
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
      isActive
        ? 'bg-emerald-700 text-white shadow-sm'
        : 'text-emerald-100 hover:bg-emerald-800/70 hover:text-white'
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Cabecera Institucional */}
      <header className="bg-emerald-950 text-white shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3 gap-3 border-b border-emerald-800/70">
            <div className="flex items-center gap-3">
              <div className="bg-white p-1 rounded-lg shadow-xs shrink-0">
                <img
                  src="/images/logos/logo-tesco.png"
                  alt="Escudo TESCo"
                  className="h-9 w-auto object-contain"
                />
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-bold tracking-tight leading-tight">
                  Sistema de Información de Control Escolar
                </h1>
                <p className="text-xs text-emerald-300">
                  Tecnológico de Estudios Superiores de Coacalco (TESCo)
                </p>
              </div>
            </div>

            {/* Datos de sesión activa */}
            <div className="flex items-center justify-between md:justify-end gap-4 text-xs sm:text-sm">
              <div className="text-left md:text-right">
                <p className="font-semibold text-white">{alumnoNombre}</p>
                <p className="text-emerald-300 font-mono">Matrícula: {matricula}</p>
              </div>
              <button
                onClick={handleSalir}
                className="flex items-center gap-1.5 bg-red-600/90 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                title="Cerrar sesión segura"
              >
                <LogOut className="w-4 h-4" />
                <span>Salir</span>
              </button>
            </div>
          </div>

          {/* Las 6 pestañas oficiales del menú de alumno */}
          <nav className="flex items-center gap-1.5 py-2.5 overflow-x-auto">
            <NavLink to="/alumno/inicio" className={navLinkClass}>
              <Home className="w-4 h-4" />
              <span>Inicio</span>
            </NavLink>
            <NavLink to="/alumno/generales" className={navLinkClass}>
              <User className="w-4 h-4" />
              <span>Generales</span>
            </NavLink>
            <NavLink to="/alumno/academicos" className={navLinkClass}>
              <BookOpen className="w-4 h-4" />
              <span>Académicos</span>
            </NavLink>
            <NavLink to="/alumno/semestre-actual" className={navLinkClass}>
              <Calendar className="w-4 h-4" />
              <span>Semestre Actual</span>
            </NavLink>
            <NavLink to="/alumno/reinscripcion" className={navLinkClass}>
              <RefreshCw className="w-4 h-4" />
              <span>Reinscripción</span>
            </NavLink>
            <NavLink to="/alumno/titulacion" className={navLinkClass}>
              <Award className="w-4 h-4" />
              <span>Titulación</span>
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Área de Contenido */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            Av. 16 de Septiembre #54, Col. Cabecera Municipal, Coacalco de Berriozábal, Edo. de Méx.
          </p>
          <p className="flex items-center gap-1 text-emerald-700 font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>Conexión Segura — Control Escolar TESCo</span>
          </p>
        </div>
      </footer>
    </div>
  );
};