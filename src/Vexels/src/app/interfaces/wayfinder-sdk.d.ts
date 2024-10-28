/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/Coordinates": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": components["schemas"]["CoordinatesRequest"];
                    "text/json": components["schemas"]["CoordinatesRequest"];
                    "application/*+json": components["schemas"]["CoordinatesRequest"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["Coordinates"];
                        "application/json": components["schemas"]["Coordinates"];
                        "text/json": components["schemas"]["Coordinates"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        Coordinates: {
            point?: components["schemas"]["Point"];
            polyline?: components["schemas"]["Point"][] | null;
            location?: components["schemas"]["Point"];
            /** Format: double */
            offset?: number;
            /** Format: double */
            station?: number;
        };
        CoordinatesRequest: {
            point?: components["schemas"]["Point"];
            /** Format: binary */
            polylineFile?: string | null;
        };
        Point: {
            /** Format: double */
            x?: number;
            /** Format: double */
            y?: number;
            /** Format: double */
            readonly magnitude?: number;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
