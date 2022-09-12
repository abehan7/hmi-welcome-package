import { IUser } from ".";

export interface CheckWalletProps {
  message: string;
  status: boolean;
  data: IUser | null;
}
