declare module "potrace" {
  export function trace(
    file: string,
    options: { color?: string },
    callback: (error: Error | null, svg: string) => void,
  ): void;
}

declare module "oauth" {
  export class OAuth {
    constructor(
      requestUrl: string,
      accessUrl: string,
      consumerKey: string,
      consumerSecret: string,
      version: string,
      authorizeCallback: string | null,
      signatureMethod: string,
    );

    get(
      url: string,
      oauthToken: string | null,
      oauthTokenSecret: string | null,
      callback: (error: Error | null, data: string, response?: unknown) => void,
    ): void;
  }
}

declare module "mini-svg-data-uri" {
  function miniSvgDataUri(svg: string): string;
  namespace miniSvgDataUri {
    function toSrcset(svg: string): string;
  }
  export default miniSvgDataUri;
}

declare module "bing-translate-api" {
  export interface TranslateResult {
    translation: string;
  }

  export function translate(
    text: string,
    from: string,
    to: string,
    raw?: boolean,
  ): Promise<TranslateResult>;
}
