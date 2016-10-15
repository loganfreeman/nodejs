async linkSelfDependencies(pkg: Manifest, pkgLoc: string, targetBinLoc: string): Promise<void> {
  targetBinLoc = await fs.realpath(targetBinLoc);
  pkgLoc = await fs.realpath(pkgLoc);
  for (const [scriptName, scriptCmd] of entries(pkg.bin)) {
    const dest = path.join(targetBinLoc, scriptName);
    const src = path.join(pkgLoc, scriptCmd);
    if (!await fs.exists(src)) {
      // TODO maybe throw an error
      continue;
    }
    await linkBin(src, dest);
  }
}
