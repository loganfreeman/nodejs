export function normalizeOS(body: string): string {
  return body.replace(/\r\n/g, '\n');
}
