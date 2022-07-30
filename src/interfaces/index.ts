export interface ITokenPayload {
  discord_id: string;
  iat: number;
  exp: number;
}

export interface IUser {
  discord_id: string;
  wl_wallet_address?: string;
  og_wallet_address?: string;
  username: string;
  discriminator: string;
  createdAt?: Date;
  whitelist?: boolean;
  og?: boolean;
}

export interface IUpdateUser {
  discord_id: string;
  wallet_address: string;
}
