import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPortal } from './pages/public/LandingPortal';
import { RegistroAlumno } from './pages/public/RegistroAlumno';
import { AlumnoLayout } from './components/layout/AlumnoLayout';
import { DashboardAlumno } from './pages/alumno/DashboardAlumno';
import { GeneralesAlumno } from './pages/alumno/GeneralesAlumno';
import { AcademicosAlumno } from './pages/alumno/AcademicosAlumno';
import { ProtectedRoute } from './routes/ProtectedRoute';

const PlaceholderTab = ({ titulo, descripcion }: { titulo: string; descripcion: string }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
    <h2 className="text-xl font-bold text-slate-900">{titulo}</h2>
    <p className="text-sm text-slate-500 mt-1">{descripcion}</p>
  </div>
);

export function App() {
  const [matriculaActiva, setMatriculaActiva] = useState<string | null>(null);

  const handleLoginSuccess = (matricula: string) => {
    setMatriculaActiva(matricula);
  };

  const handleLogout = () => {
    setMatriculaActiva(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas */}
        <Route
          path="/"
          element={<LandingPortal onLoginSuccess={handleLoginSuccess} />}
        />
        <Route path="/registro-alumno" element={<RegistroAlumno />} />

        {/* Rutas Protegidas exclusivas para ALUMNO */}
        <Route
          element={
            <ProtectedRoute
              isAuthenticated={Boolean(matriculaActiva)}
              userRole={matriculaActiva ? 'ALUMNO' : null}
              allowedRoles={['ALUMNO']}
            />
          }
        >
          <Route
            path="/alumno"
            element={
              <AlumnoLayout
                matricula={matriculaActiva || ''}
                onLogout={handleLogout}
              />
            }
          >
            <Route index element={<Navigate to="inicio" replace />} />
            <Route
              path="inicio"
              element={<DashboardAlumno matricula={matriculaActiva || ''} />}
            />
            <Route
              path="generales"
              element={<GeneralesAlumno matricula={matriculaActiva || ''} />}
            />
            <Route
              path="academicos"
              element={<AcademicosAlumno matricula={matriculaActiva || ''} />}
            />
            <Route
              path="semestre-actual"
              element={
                <PlaceholderTab
                  titulo="Semestre Actual"
                  descripcion="Horario de clases, docentes asignados y calificaciones parciales del periodo vigente."
                />
              }
            />
            <Route
              path="reinscripcion"
              element={
                <PlaceholderTab
                  titulo="Reinscripción y Carga Académica"
                  descripcion="Selección de materias, validación de adeudos y generación de línea de captura."
                />
              }
            />
            <Route
              path="titulacion"
              element={
                <PlaceholderTab
                  titulo="Seguimiento de Titulación y Residencias"
                  descripcion="Estatus de servicio social, residencias profesionales y requisitos de egreso."
                />
              }
            />
          </Route>
        </Route>

        {/* Cualquier ruta desconocida regresa al inicio */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;