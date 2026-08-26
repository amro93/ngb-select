const fs = require('fs');
const path = require('path');

// Read root package.json version
const rootPkgPath = path.join(__dirname, '..', 'package.json');
const rootPkg = JSON.parse(fs.readFileSync(rootPkgPath, 'utf-8'));
const version = rootPkg.version;

console.log(`Syncing version v${version} across library, docs and templates...`);

// 1. Sync projects/ngb-select/package.json
const libPkgPath = path.join(__dirname, '..', 'projects', 'ngb-select', 'package.json');
if (fs.existsSync(libPkgPath)) {
  const libPkg = JSON.parse(fs.readFileSync(libPkgPath, 'utf-8'));
  libPkg.version = version;
  fs.writeFileSync(libPkgPath, JSON.stringify(libPkg, null, 2) + '\n');
}

// 2. Sync src/version.ts
const versionTsPath = path.join(__dirname, '..', 'src', 'version.ts');
fs.writeFileSync(versionTsPath, `export const APP_VERSION = '${version}';\n`);

// 3. Sync src/lib/ngb-select.interface.ts
const syncVersionConst = (filePath) => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    content = content.replace(/export const NGB_SELECT_VERSION = '.*?';/, `export const NGB_SELECT_VERSION = '${version}';`);
    fs.writeFileSync(filePath, content);
  }
};

syncVersionConst(path.join(__dirname, '..', 'src', 'lib', 'ngb-select.interface.ts'));
syncVersionConst(path.join(__dirname, '..', 'projects', 'ngb-select', 'src', 'lib', 'ngb-select.interface.ts'));

console.log(`Successfully synced version v${version}!`);
