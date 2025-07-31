import { useRecoilValue } from "recoil"
import { jwtToken } from "../../atoms/JwtToken"
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

type privatee={
    children:ReactNode;
}
const Protected = ({children}:privatee) => {
  const data=useRecoilValue(jwtToken);

  return data?<>{children}</> :<Navigate to="/signin" replace/>;
};

export default Protected