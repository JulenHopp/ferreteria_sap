import { FlexBox, Text, Icon } from '@ui5/webcomponents-react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: string;
}

interface StatsCardsProps {
  precision: string;
  totalHistorial: number;
  sugerenciasAceptadas: number;
}

const STYLES = {
  container: {
    gap: '1.5rem',
    marginBottom: '2rem',
    width: '100%',
    justifyContent: 'space-between'
  },
  card: {
    flex: '1',
    maxWidth: '400px',
    background: 'white',
    borderRadius: '0.75rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    padding: '1.5rem',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out'
  },
  iconContainer: {
    gap: '0.5rem',
    marginBottom: '1rem'
  },
  icon: {
    fontSize: '1.25rem',
    color: 'var(--sapInformative)'
  },
  title: {
    fontSize: '0.875rem',
    color: 'var(--sapInformative)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    fontWeight: '500'
  },
  value: {
    fontSize: '2.25rem',
    fontWeight: '300',
    color: 'var(--sapNeutralColor)',
    margin: '0',
    lineHeight: '1'
  }
} as const;

const StatsCard = ({ title, value, icon }: StatsCardProps) => (
  <div style={STYLES.card}>
    <FlexBox alignItems="Center" style={STYLES.iconContainer}>
      <Icon name={icon} style={STYLES.icon} />
      <Text style={STYLES.title}>{title}</Text>
    </FlexBox>
    <Text style={STYLES.value}>{value}</Text>
  </div>
);

export default function StatsCards({ precision, totalHistorial, sugerenciasAceptadas }: StatsCardsProps) {
  return (
    <FlexBox style={STYLES.container}>
      <StatsCard 
        title="Precisión de predicción" 
        value={`${precision}%`}
        icon="chart-table-view"
      />
      <StatsCard 
        title="Total historial" 
        value={totalHistorial.toString()}
        icon="history"
      />
      <StatsCard 
        title="Sugerencias aceptadas" 
        value={sugerenciasAceptadas.toString()}
        icon="accept"
      />
    </FlexBox>
  );
} 