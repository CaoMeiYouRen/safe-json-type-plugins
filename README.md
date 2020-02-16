<h1 align="center">safe-json-type-plugins </h1>
<p>
  <a href="https://www.npmjs.com/package/safe-json-type-plugins" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/safe-json-type-plugins.svg">
  </a>
  <img src="https://img.shields.io/badge/node-%3E%3D12-blue.svg" />
  <a href="https://github.com/CaoMeiYouRen/safe-json-type-plugins#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/CaoMeiYouRen/safe-json-type-plugins/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/CaoMeiYouRen/safe-json-type-plugins/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/CaoMeiYouRen/safe-json-type-plugins" />
  </a>
</p>


> safe-json-type的插件，内置了Date、Buffer等对象的转换插件

### 🏠 [主页](https://github.com/CaoMeiYouRen/safe-json-type-plugins)


## 环境要求

- node >=12 注：本项目在node12环境下开发完成，低版本兼容性请自行测试

## 安装

```sh
yarn install
```

## 使用

1.  在模块化工程中使用

    1.  如果是后端项目，可以直接引入

        ```js
        import { SafeJsonPluginDate, SafeJsonPluginBuffer, SafeJsonPlugin, SafeJson } from 'safe-json-type-plugins'
        ```

    2.  如果是前端项目，且不需要Buffer对象，可仅引入```safe-json-type-plugins/dist/browser```，即

        ```js
        import { SafeJsonPluginDate ,SafeJsonPlugin, SafeJson } from 'safe-json-type-plugins/dist/browser'
        ```

2.  前端通过script标签引用

    推荐使用压缩后的版本browser.min.js，移除了所有依赖

    ```js
    SafeJsonTypePlugins.SafeJsonPluginDate //Date转换插件。注意前一个SafeJsonTypePlugins是命名空间，如果觉得不方便可以解构后使用
    const {SafeJsonPluginDate ,SafeJsonPlugin, SafeJson} = SafeJsonTypePlugins
    ```

## 测试

```sh
yarn run test
```

## 作者


👤 **CaoMeiYouRen**
* Website: https://blog.cmyr.ltd/
* GitHub: [@CaoMeiYouRen](https://github.com/CaoMeiYouRen)

## 🤝贡献

欢迎Contributions, issues and feature!<br />请查看 [issues page](https://github.com/CaoMeiYouRen/safe-json-type-plugins/issues). 您还可以查看[contributing guide](https://github.com/CaoMeiYouRen/safe-json-type-plugins/blob/master/CONTRIBUTING.md).

## 支持

如果觉得这个项目有用的话请给一颗⭐️，非常感谢

## 📝 License

Copyright © 2020 [CaoMeiYouRen](https://github.com/CaoMeiYouRen).<br />
This project is [MIT](https://github.com/CaoMeiYouRen/safe-json-type-plugins/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
