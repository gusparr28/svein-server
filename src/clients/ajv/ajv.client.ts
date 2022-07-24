import Ajv from 'ajv';
import addFormats from 'ajv-formats';

export class AjvClient {
  private ajv: Ajv;

  constructor() {
    this.ajv = addFormats(new Ajv({}), [
      'date-time',
      'time',
      'date',
      'email',
      'hostname',
      'ipv4',
      'ipv6',
      'uri',
      'uri-reference',
      'uuid',
      'uri-template',
      'json-pointer',
      'relative-json-pointer',
      'regex',
    ]);
  }

  public validateSchema(schema: Record<string, object>, data: unknown): boolean {
    return this.ajv.validate(schema, data);
  }
}
