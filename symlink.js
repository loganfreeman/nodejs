const fsSymlink: (
  target: string,
  path: string,
  type?: 'dir' | 'file' | 'junction'
) => Promise<void> = promisify(fs.symlink);

export async function symlink(src: string, dest: string): Promise<void> {
  try {
    const stats = await lstat(dest);

    if (stats.isSymbolicLink() && await exists(dest)) {
      const resolved = await realpath(dest);
      if (resolved === src) {
        return;
      }
    }

    await unlink(dest);
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err;
    }
  }

  try {
    if (process.platform === 'win32') {
      // use directory junctions if possible on win32, this requires absolute paths
      await fsSymlink(src, dest, 'junction');
    } else {
      // use relative paths otherwise which will be retained if the directory is moved
      const relative = path.relative(path.dirname(dest), src);
      await fsSymlink(relative, dest);
    }
  } catch (err) {
    if (err.code === 'EEXIST') {
      // race condition
      await symlink(src, dest);
    } else {
      throw err;
    }
  }
}
