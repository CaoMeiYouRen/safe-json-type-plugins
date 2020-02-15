# safe-json-type-plugins

本包为[safe-json-type](https://github.com/CaoMeiYouRen/safe-json-type)的插件，实现了Date、Buffer等对象的转换。

### 使用

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

    