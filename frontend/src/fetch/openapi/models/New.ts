/* tslint:disable */
/* eslint-disable */
/**
 * toban API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * general response for posting new resource
 * @export
 * @interface New
 */
export interface New {
    /**
     * 
     * @type {number}
     * @memberof New
     */
    id: number;
}

export function NewFromJSON(json: any): New {
    return NewFromJSONTyped(json, false);
}

export function NewFromJSONTyped(json: any, ignoreDiscriminator: boolean): New {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
    };
}

export function NewToJSON(value?: New | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
    };
}

