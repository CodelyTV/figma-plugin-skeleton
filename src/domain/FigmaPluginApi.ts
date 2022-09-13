import { SupportedResponseTypes } from "../browser-commands/network-request/NetworkRequestCommand";

export type FigmaUser = {
  photoUrl: string;
  name: string;
};

export interface FigmaPluginApi {
  currentUser(): FigmaUser;

  notify(message: string): void;

  select(message: string): void;

  request<ResponseType extends SupportedResponseTypes>(
    url: string,
    responseType: ResponseType
  ): Promise<
    ResponseType extends "arraybuffer" ? ArrayBuffer : Record<string, unknown>
  >;
}
