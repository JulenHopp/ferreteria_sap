import { User } from "../../services/api/user.service";
import { FlexBox } from "@ui5/webcomponents-react";
import MetricCard from "./MetricCard";

interface UsersAnalyticsProps {
  data: User[];
}

export default function UsersAnalytics({ data }: UsersAnalyticsProps) {
  // Calculate metrics
  const totalUsers = data.length;
  const adminUsers = data.filter(user => user.ROL === 'Admin').length;
  const regularUsers = data.filter(user => user.ROL !== 'Admin').length;
  
  const roles = [...new Set(data.map(user => user.ROL))];
  const avgUsersPerRole = (totalUsers / roles.length).toFixed(1);

  return (
    <div style={{ width: "100%"}}>
      <FlexBox direction="Row" gap="1rem" justifyContent="SpaceAround">
        <MetricCard 
          label="Total de usuarios" 
          value={totalUsers.toString()} 
        />
        <MetricCard 
          label="Usuarios Admin" 
          value={adminUsers.toString()} 
        />
        <MetricCard 
          label="Usuarios Regulares" 
          value={regularUsers.toString()} 
        />
        <MetricCard 
          label="Promedio de usuarios por rol" 
          value={avgUsersPerRole} 
        />
      </FlexBox>
    </div>
  );
}
