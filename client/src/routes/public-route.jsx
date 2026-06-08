import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { authUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center gap-2">
            <Loader2 className="animate-spin" />
            Loading...
      </div>
    );
  }

  if (authUser) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default PublicRoute;
