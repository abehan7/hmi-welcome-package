export interface IDecodedDiscordToken {
  accent_color: string | null;
  avatar: string | null;
  avatar_decoration: string | null;
  banner: string | null;
  banner_color: string | null;
  discriminator: string;
  flags: number;
  id: string;
  locale: string;
  mfa_enabled: boolean;
  public_flags: number;
  username: string;
}
