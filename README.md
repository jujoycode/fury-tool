<img width="100px" height="60px" align="right" alt="Fury Logo" src="https://github.com/jujoycode/fury-tool/blob/master/assets/fury_logo2.jpeg?raw=true" title="fury" />

# Fury

> Fury is a versatile tool that helps developers streamline various tasks.

- It supports make it easier to create node projects that fit different frameworks
- Make it easier to use `git`
- Many other convenience features ⭐️
  
  
> **Note:**  Requires Git version 2.28.0 or higher.

## Installation

```bash
# npm
npm install -g fury-tool

# yarn
yarn global add fury-tool

# pnpm
pnpm install -g fury-tool
```

## Usage

```bash
# When you want create new project with Fury
$ fury

# When you want Manage git with Fury
$ fury -g # or fury --git

# When you want to migrate DB [Next (0.1.5)]
$ fury -m # or fury --migration

# When you want to view more information
$ fury -h # or fury --help

# When you want to view version information
$ fury -v # or fury --version
```

## Document

- [To be continue...](https://github.com/jujoycode/fury-tool/wiki)

## Authors

- \_jujooycode - Project initial and development

## Version History
- ✨ 0.1.4 - `the latest version update notification feature`

  - ➕ [update-notifier@7.1.0](https://www.npmjs.com/package/update-notifier)

- ✨ 0.1.3 - `makes easier to use git`

  - Set up easier init and remote repository
  - Commit changes with gitmoji
  - Receive changes from remote repository with one click
  - Merge current and target branches easily
  - Easy branch management
    - replacement other branch
    - create new from target branch
    - rename target branch
    - delete target branch

- 🐛 0.1.2 - [Issue#4](https://github.com/jujoycode/fury-tool/issues/4)

- ✨ 0.1.1 - `can create project`
  - Supported Templates
    - javascript
    - typescript
  - Optional
    - git
    - prettier

## License

This project is licensed under the [GPLv3] License
