export async function linkBin(src: string, dest: string): Promise<void> {
  if (process.platform === 'win32') {
    await cmdShim(src, dest);
  } else {
    await fs.mkdirp(path.dirname(dest));
    await fs.symlink(src, dest);
    await fs.chmod(dest, '755');
  }
}
