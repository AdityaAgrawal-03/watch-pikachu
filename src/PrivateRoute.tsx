import { Navigate, Route } from "react-router";
import { useAuth } from "./context/AuthContext/AuthContext";

type PrivateRouteProps = {
  path: string;
  element: JSX.Element;
};

export function PrivateRoute({ path, ...props }: PrivateRouteProps) {
  const { token } = useAuth();

  return (
    <>
      {token ? (
        <Route path={path} {...props} />
      ) : (
        <Navigate to="/login" replace={true} state={{ from: path }} />
      )}
    </>
  );
}
