# Monorepo template

A monorepo project template for components and utils.

Before developing package in this repo, make sure you understand the following clearly:

- The repository only contains rendering components and utils, which is all I need.
- There isn't any environment, e.g. backend api, client webview etc.

### Getting Started

Initialize project with `yarn`.

```bash
yarn
```

#### Workflow

1. Checkout feature/hotfix branch from master.
2. Develop your package.
3. Prelease beta package for testing on your branch.
4. Merge back to master and release stable version.

### Development

```bash
yarn run dev
```

Dev server runs at http://localhost:6006/ and it will automatically open the browser for development.

#### How to create package

```bash
yarn run create
```

#### How to add/remove dependencies

```bash
# add dependencies at root
yarn add -W packageName

# remove dependencies at root
yarn remove -W packageName

# add dependencies for specific package
cd packages/packageDir
yarn add packageName

# remove dependencies for specific package
cd packages/packageDir
yarn remove packageName
```

#### Tools

- react: component
- styled-components: styles
- storybook: doc & preview
- webpack: bundler
- jest: test

### Testing

When developing on feature/hotfix branch(we are not allow to develop on trunk master), we prerelease alpha package with dist-tag `next` to npm registry.

Then publish your package

```bash
# on feature/hotfix branch
yarn run release
```

Anyone who use the beta package should install it with tag `next` or the specific beta version, otherwise you will get the latest stable version.

```bash
# install with tag next
yarn add packageName@next

# or with specific beta version
yarn add packageName@1.0.0-beta.1
```

### Production

To release stable package, you should create merge request to merge code back to trunk master, and then release stable version.

```bash
# on master branch
yarn run release
```

### FAQ

#### How to request data from server or invoke js api ?

No, you can't. We don't integrate any environment, so you have to pass the function down via props, which is a kind of IOC(invasion of control).

#### Why there are messy declaration files under "dist" folder?

Because we use source files to build artifact package, there are files in other packages which are outside of "src" folder. Tsc(typescript compiler) will emit declaration files with folder "packageName/src", for detail see: https://stackoverflow.com/questions/52121725/maintain-src-folder-structure-when-building-to-dist-folder-with-typescript-3 and https://github.com/Microsoft/TypeScript/wiki/FAQ#why-does---outdir-moves-output-after-adding-a-new-file.

The simple solution is add "types": "dist/packageName/src" to "package.json"
