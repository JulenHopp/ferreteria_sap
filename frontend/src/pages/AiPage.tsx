import { useState } from 'react';
import { FlexBox } from '@ui5/webcomponents-react';
import "@ui5/webcomponents-icons/dist/chart-table-view.js";
import "@ui5/webcomponents-icons/dist/history.js";
import "@ui5/webcomponents-icons/dist/accept.js";

import StatsCards from '../components/aicomponents/StatsCards';
import SugerenciasTable, { Sugerencia } from '../components/aicomponents/SugerenciasTable';
import HistorialTable, { HistorialSugerencia } from '../components/aicomponents/HistorialTable';

const STYLES = {
  container: {
    width: '100%',
    padding: '1.5rem',
    gap: '1.5rem',
    maxWidth: '1600px',
    margin: '0 auto'
  }
} as const;

export default function AiPage() {
  const [sugerencias, setSugerencias] = useState<Sugerencia[]>([]);
  const [historial, setHistorial] = useState<HistorialSugerencia[]>([]);

  const totalHistorial = historial.length;
  const sugerenciasAceptadas = historial.filter(item => item.estado === 'Aceptado').length;
  const porcentajeEfectividad = totalHistorial > 0 
    ? ((sugerenciasAceptadas / totalHistorial) * 100).toFixed(1)
    : '0.0';

  const handleAceptar = async (sugerencia: Sugerencia) => {
    try {
      // TODO: Implementar llamada al backend
      setSugerencias(prev => prev.filter(s => s.id !== sugerencia.id));
      const nuevaEntradaHistorial: HistorialSugerencia = {
        ...sugerencia,
        fecha: new Date().toISOString().split('T')[0],
        estado: 'Aceptado'
      };
      setHistorial(prev => [nuevaEntradaHistorial, ...prev]);
    } catch (error) {
      console.error('Error al aceptar sugerencia:', error);
    }
  };

  const handleRechazar = async (sugerencia: Sugerencia) => {
    try {
      // TODO: Implementar llamada al backend
      setSugerencias(prev => prev.filter(s => s.id !== sugerencia.id));
      const nuevaEntradaHistorial: HistorialSugerencia = {
        ...sugerencia,
        fecha: new Date().toISOString().split('T')[0],
        estado: 'Rechazado'
      };
      setHistorial(prev => [nuevaEntradaHistorial, ...prev]);
    } catch (error) {
      console.error('Error al rechazar sugerencia:', error);
    }
  };

  const handleEditar = async (sugerencia: Sugerencia) => {
    try {
      // TODO: Implementar llamada al backend
      console.log('Editando sugerencia:', sugerencia);
    } catch (error) {
      console.error('Error al editar sugerencia:', error);
    }
  };

  return (
    <FlexBox direction="Column" style={STYLES.container}>
      <StatsCards 
        precision={porcentajeEfectividad}
        totalHistorial={totalHistorial}
        sugerenciasAceptadas={sugerenciasAceptadas}
      />

      <SugerenciasTable
        sugerencias={sugerencias}
        onAceptar={handleAceptar}
        onRechazar={handleRechazar}
        onEditar={handleEditar}
      />

      <HistorialTable
        historial={historial}
      />
    </FlexBox>
  );
} 