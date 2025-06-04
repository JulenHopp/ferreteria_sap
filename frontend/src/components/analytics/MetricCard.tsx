import { Card, Text, CardHeader, FlexBox, Title } from '@ui5/webcomponents-react';

interface MetricCardProps {
  label: string;
  value: string;
}

export default function MetricCard({ label, value }: MetricCardProps) {
  return (
    <Card
  header={
    <CardHeader
        titleText={label}
    />
}
  style={{
    width: '250px',
  }}
>
    <FlexBox
         alignItems='Center'
        style={{padding: '1rem'}}
    >
        <Title size='H3'>
            {value}
        </Title>
    </FlexBox>
</Card>
  );
}
