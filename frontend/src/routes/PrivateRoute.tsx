import { Navigate } from "react-router-dom";
import { Role } from "@/models/Role";
import { useAuth } from "@/hooks/useAuth";

interface PrivateRouteProps {
  roles: string[];
  element: JSX.Element;
}

const PrivateRoute = ({ roles, element }: PrivateRouteProps) => {
  const { user } = useAuth();

  if (!user || !roles.includes((user.user.role as unknown as Role).name)) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default PrivateRoute;
