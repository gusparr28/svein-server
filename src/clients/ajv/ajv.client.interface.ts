export interface IAjvClient {
  validateSchema(schema: Record<string, object>, data: unknown): boolean;
}
