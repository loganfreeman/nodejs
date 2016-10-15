export async function find(filename: string, dir: string): Promise<string | false> {
  const parts = dir.split(path.sep);

  while (parts.length) {
    const loc = parts.concat(filename).join(path.sep);

    if (await exists(loc)) {
      return loc;
    } else {
      parts.pop();
    }
  }

  return false;
}
