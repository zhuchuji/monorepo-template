---
name: README
---

# live-modules

Shared modules for live group's apps, including utils, ui components, business components.

## Development

```bash
yarn

yarn run dev
```

Start development with `yarn run dev`. You will see the docz serve on `http://localhost:9006`.

### How to add dependencies

To add dep package to the root of workspace:

```bash
yarn add -W package
```

To add external dep package to specific package

```bash
yarn workspace @live/package add external-package
# or
cd packages/package
yarn add external-package

# then add package in root workspace for development and packaging
yarn add -W external-package
```

### How to create new package

```bash
yarn run create
```

### How to prerelease for testing

On your feature/hotfix branch, run `yarn run release`.
We only allow to prerelease canary version for testing, and we set your branch name as dist tag such that others will not install packages under testing. They will install the latest stable package(the dist tag `latest`).
Notice that we transform any illegal charater([^a-za-z0-9]) in your branch name with underline '\_', therefore, you have to run `yarn add package@feature_add_one` to install the testing package if your branch name is `feature/add-one`.

### Production build

```bash
yarn run build
```

## Release

We only allow release public version on develop branch.

```bash
yarn run release
```
