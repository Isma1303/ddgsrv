import { JwtPayload } from "jsonwebtoken";

export interface TokenPayload extends JwtPayload {
  user_id: number;
  role_id: number;
  role_cd?: string;
  department_id?: number;
  is_leader?: boolean;
}
