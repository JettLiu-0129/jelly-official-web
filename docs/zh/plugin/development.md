# Jelly 插件 All-in-One 开发指南

> **版本**: 1.0.0  
> **最后更新**: 2025-12-13

## 概述

Jelly 插件系统允许第三方开发者通过 JavaScript 扩展应用功能。插件运行在沙盒化的 JavaScriptCore 环境中,可以实现翻译、TTS(文本转语音)和 LLM 等功能。

### 支持的插件类型

- **translate**: 翻译插件
- **tts**: 文本转语音插件
- **llm**: 大语言模型插件

### 插件文件结构

```
your-plugin/
├── info.json          # 插件清单(必需)
├── main.js            # 主入口文件(必需)
├── icon.png           # 插件图标(可选,推荐)
└── *.js               # 其他 JavaScript 模块(可选)
```

### 插件打包格式

- **开发模式**: 直接使用文件夹
- **发布模式**: 打包为 `.jellyplugin` 文件(实际上是 ZIP 压缩包)

## 示例项目

[Jelly 插件示例项目](https://github.com/Jellyfish-Studio/jelly-plugin-examples)

## 插件清单 (info.json)

`info.json` 是插件的元数据文件,定义了插件的基本信息和配置选项。

### 基本结构

```json
{
  "identifier": "com.example.my-plugin",
  "name": "My Plugin",
  "version": "1.0.0",
  "category": "translate",
  "summary": "A brief description of your plugin",
  "author": "Your Name <your.email@example.com>",
  "homepage": "https://github.com/yourusername/your-plugin",
  "icon": "icon.png",
  "options": []
}
```

### 字段说明

| 字段         | 类型   | 必需     | 说明                                                              |
| ------------ | ------ | -------- | ----------------------------------------------------------------- |
| `identifier` | String | ✅       | 插件唯一标识符,建议使用反向域名格式(如 `com.example.plugin-name`) |
| `name`       | String | ✅       | 插件显示名称                                                      |
| `version`    | String | ✅       | 插件版本号,建议遵循语义化版本(如 `1.0.0`)                         |
| `category`   | String | ✅       | 插件类型: `translate`、`tts` 或 `llm`                             |
| `summary`    | String | ✅       | 插件简介,简要描述插件功能                                         |
| `author`     | String | ✅       | 作者信息,格式: `Name <email>`                                     |
| `icon`       | String | 建议包含 | 图标文件名(相对于插件目录),推荐使用 PNG 格式                      |
| `homepage`   | String | ❌       | 插件主页 URL                                                      |
| `options`    | Array  | ❌       | 用户配置选项数组                                                  |

### 配置选项 (options)

插件可以定义用户可配置的选项,支持两种类型:

#### 1. 文本输入框 (text)

```json
{
  "identifier": "apiKey",
  "type": "text",
  "title": "API Key",
  "defaultValue": "",
  "desc": "Enter your API key",
  "required": true,
  "textConfig": {
    "type": "secure",
    "height": 21,
    "placeholderText": "sk-..."
  }
}
```

**textConfig 字段**:

- `type`: `"visible"`(明文) 或 `"secure"`(密文),默认 `"visible"`
- `height`: 输入框高度,默认 `21`
- `placeholderText`: 占位符文本

#### 2. 下拉菜单 (menu)

```json
{
  "identifier": "accent",
  "type": "menu",
  "title": "Accent",
  "defaultValue": "us",
  "desc": "Choose accent",
  "menuValues": [
    { "title": "US English", "value": "us" },
    { "title": "UK English", "value": "uk" }
  ]
}
```

**menuValues**: 选项数组,每个选项包含 `title`(显示文本) 和 `value`(实际值)

## JavaScript API

### 全局对象

Jelly 运行时为插件提供了以下全局对象:

#### `$option`

用户配置选项对象,键为 `info.json` 中定义的 `identifier`。

```javascript
// 访问用户配置
const apiKey = $option.apiKey;
const mode = $option.mode;
```

#### `$log`

日志输出对象,用于调试和错误追踪。

```javascript
$log.log("普通日志");
$log.info("信息日志");
$log.warn("警告日志");
$log.error("错误日志");
```

> **提示**: 日志会显示在 Jelly 的 JS 运行时控制台中，您可以打开“开发者设置”查看。

#### `$http`

HTTP 请求对象,用于发起网络请求。

##### 异步请求 (推荐)

```javascript
const response = await $http.request({
  method: "POST",
  url: "https://api.example.com/translate",
  header: {
    "Content-Type": "application/json",
  },
  body: {
    text: "Hello",
    target: "zh",
  },
});

if (response.error) {
  console.error("请求失败:", response.error);
} else {
  console.log("响应数据:", response.data);
}
```

##### 回调式请求

```javascript
$http.request({
  method: "GET",
  url: "https://api.example.com/data",
  handler: function (resp) {
    if (resp.error) {
      console.error("请求失败:", resp.error);
    } else {
      console.log("响应数据:", resp.data);
    }
  },
});
```

**请求参数**:

- `method`: HTTP 方法(`GET`、`POST`、`PUT`、`DELETE` 等)
- `url`: 请求 URL
- `header`: 请求头对象(可选)
- `body`: 请求体,可以是对象(自动序列化为 JSON)或字符串
- `handler`: 回调函数(可选,使用异步方式时不需要)

**响应对象**:

- `response`: HTTP 响应元数据(状态码等)
- `data`: 响应数据(自动解析 JSON)
- `error`: 错误对象(如果请求失败)

#### `$data`

数据处理工具对象。

```javascript
// Base64 编码
const base64 = $data.toBase64("Hello, World!");

// Base64 解码
const text = $data.fromBase64(base64);
```

#### `$env`

环境信息对象。

```javascript
console.log("Jelly 版本:", $env.version);
console.log("平台:", $env.platform); // "macOS"
```

#### `require()`

CommonJS 模块加载函数,用于加载其他 JavaScript 文件。

```javascript
// 加载相对路径模块
const utils = require("./utils.js");
const config = require("./config.js");

// 加载 npm 包(需要包含在插件目录中)
const CryptoJS = require("crypto-js");
```

> **注意**: Jelly 不支持复杂的路径解析，如果插件工程依赖较多，建议先使用 webpack、vite 等工具打包。

## 运行时环境

### 翻译插件 (translate)

翻译插件必须导出两个函数:

#### `supportLanguages()`

返回插件支持的语言列表。

```javascript
function supportLanguages() {
  return [
    "zh-Hans", // 简体中文
    "zh-Hant", // 繁体中文
    "en", // 英语
    "ja", // 日语
    "ko", // 韩语
    "fr", // 法语
    "de", // 德语
    "es", // 西班牙语
    "ru", // 俄语
    "ar", // 阿拉伯语
  ];
}

exports.supportLanguages = supportLanguages;
```

**语言代码**: 使用标准语言代码(参见附录)。

#### `translate(query, completion)`

执行翻译任务。

```javascript
function translate(query, completion) {
  (async () => {
    // 1. 获取查询参数
    const text = query.text; // 待翻译文本
    const from = query.detectFrom; // 源语言
    const to = query.detectTo; // 目标语言
    const textType = query.textType; // 文本类型: "word" | "sentence" | "paragraph"

    $log.info(`翻译: ${from} -> ${to}, 文本长度: ${text.length}`);

    // 2. 调用翻译 API
    const response = await $http.request({
      method: "POST",
      url: "https://api.example.com/translate",
      header: {
        "Content-Type": "application/json",
      },
      body: {
        text: text,
        source: from,
        target: to,
      },
    });

    if (response.error) {
      throw new Error("翻译失败: " + response.error.message);
    }

    // 3. 返回翻译结果
    completion({
      result: {
        from: from,
        to: to,
        text: response.data.translation, // 翻译文本
        dictData: null, // 词典数据(可选,用于单词翻译)
      },
    });
  })().catch((err) => {
    // 4. 错误处理
    $log.error("翻译异常:", err);
    completion({
      error: {
        type: "api",
        message: err.message || "翻译失败",
        addtion: err.stack,
      },
    });
  });
}

exports.translate = translate;
```

**query 参数**:
| 字段 | 类型 | 说明 |
|------|------|------|
| `text` | String | 待翻译文本(已规范化处理) |
| `originalText` | String | 原始未处理文本 |
| `detectFrom` | String | 源语言代码 |
| `detectTo` | String | 目标语言代码 |
| `textType` | String | 文本类型: `"word"`、`"sentence"` 或 `"paragraph"` |

**completion 参数**:

成功时:

```javascript
completion({
  result: {
    from: "en",
    to: "zh-Hans",
    text: "翻译结果文本", // 必需,翻译文本
    dictData: {
      // 可选,词典数据
      word: "hello",
      phonetics: [
        {
          type: "us",
          value: "həˈloʊ",
          tts: {
            type: "url",
            value: "https://example.com/audio.mp3",
          },
        },
      ],
      parts: [
        {
          part: "n.",
          means: ["问候", "招呼"],
        },
      ],
      exchanges: [
        {
          name: "复数",
          words: ["hellos"],
        },
      ],
      additions: [
        {
          name: "标签",
          value: "CET4/CET6",
        },
      ],
    },
  },
});
```

> **重要**: `text` 字段是**必需的**,用于显示翻译结果。`dictData` 是可选的,用于提供词典数据(音标、词性、释义等)。

失败时:

```javascript
completion({
  error: {
    type: "api", // 错误类型: "api" | "param" | "network" | "unknown"
    message: "错误信息",
    addtion: "附加信息",
  },
});
```

**词典数据结构 (dictData)**:
| 字段 | 类型 | 说明 |
|------|------|------|
| `word` | String | 单词 |
| `phonetics` | Array | 音标数组 |
| `phonetics[].type` | String | 音标类型: `"us"`(美音) 或 `"uk"`(英音) |
| `phonetics[].value` | String | 音标文本 |
| `phonetics[].tts` | Object | TTS 数据(可选) |
| `phonetics[].tts.type` | String | `"url"` 或 `"base64"` |
| `phonetics[].tts.value` | String | 音频 URL 或 Base64 数据 |
| `parts` | Array | 词性和释义数组 |
| `parts[].part` | String | 词性(如 `"n."`、`"v."`) |
| `parts[].means` | Array | 释义数组 |
| `exchanges` | Array | 词形变化数组 |
| `exchanges[].name` | String | 变化类型(如 `"复数"`、`"过去式"`) |
| `exchanges[].words` | Array | 变化形式数组 |
| `additions` | Array | 附加信息数组 |
| `additions[].name` | String | 信息名称 |
| `additions[].value` | String | 信息值 |

### TTS 插件 (tts)

TTS 插件必须导出一个函数:

#### `tts(query, completion)`

生成语音数据。

```javascript
function tts(query, completion) {
  (async () => {
    // 1. 获取查询参数
    const text = query.text; // 待转换文本
    const lang = query.lang; // 语言代码
    const textType = query.textType; // 文本类型

    $log.info(`TTS: ${lang}, 文本长度: ${text.length}`);

    // 2. 调用 TTS API
    const response = await $http.request({
      method: "POST",
      url: "https://api.example.com/tts",
      header: {
        "Content-Type": "application/json",
      },
      body: {
        text: text,
        lang: lang,
      },
    });

    if (response.error) {
      throw new Error("TTS 失败: " + response.error.message);
    }

    // 3. 返回音频数据(Base64 编码)
    completion({
      result: {
        type: "base64",
        value: response.data.audioBase64,
      },
    });
  })().catch((err) => {
    $log.error("TTS 异常:", err);
    completion({
      error: {
        type: "api",
        message: err.message || "TTS 失败",
      },
    });
  });
}

exports.tts = tts;
```

**query 参数**:
| 字段 | 类型 | 说明 |
|------|------|------|
| `text` | String | 待转换文本 |
| `lang` | String | 语言代码 |
| `textType` | String | 文本类型 |

**completion 参数**:

成功时:

```javascript
completion({
  result: {
    type: "base64", // 目前仅支持 "base64"
    value: "...", // Base64 编码的音频数据
  },
});
```

失败时:

```javascript
completion({
  error: {
    type: "api",
    message: "错误信息",
  },
});
```

> **注意**: 目前 Jelly 仅支持 `type: "base64"`,不支持 `type: "url"`。

## 最佳实践

### 1. 日志记录

合理使用日志有助于调试和问题追踪:

```javascript
// ✅ 推荐: 记录关键步骤
$log.info(`[翻译开始] ${query.detectFrom} -> ${query.detectTo}`);
$log.info(`[API 调用] URL: ${apiUrl}`);
$log.info(`[翻译完成] 结果长度: ${result.length}`);
```

### 2. 错误提示

提供清晰的错误信息:

```javascript
// ✅ 推荐: 明确的错误信息
completion({
  error: {
    type: "param",
    message: "API Key 未配置,请在插件设置中填写",
  },
});

// ❌ 避免: 模糊的错误信息
completion({
  error: {
    type: "unknown",
    message: "错误",
  },
});
```

## 附录

### 标准语言代码

| 语言     | 代码      | 语言     | 代码 |
| -------- | --------- | -------- | ---- |
| 简体中文 | `zh-Hans` | 英语     | `en` |
| 繁体中文 | `zh-Hant` | 波兰语   | `pl` |
| 日语     | `ja`      | 韩语     | `ko` |
| 法语     | `fr`      | 德语     | `de` |
| 西班牙语 | `es`      | 葡萄牙语 | `pt` |
| 意大利语 | `it`      | 俄语     | `ru` |
| 阿拉伯语 | `ar`      | 泰语     | `th` |
| 越南语   | `vi`      | 印尼语   | `id` |
| 荷兰语   | `nl`      | -        | -    |

### 常见问题

#### Q: 插件如何调试?

A: 在 Jelly 中启用"开发者模式"，在“开发者”设置页面点击"查看 JS 运行时日志"。

#### Q: 插件可以访问文件系统吗?

A: 不可以。插件运行在沙盒环境中，只能访问网络 API 和 Jelly 提供的全局对象。

#### Q: 插件可以使用 npm 包吗?

A: 可以，但需要自行处理构建，将依赖打包到产物文件中。

#### Q: 如何发布插件与其他人分享?

A:

1. 将您开发好的插件打包成 zip 文件
2. 重命名为.jellyplugin
3. 在 GitHub 上向[Jelly 官网](/plugin/market#在-github-上编辑此页)提交 PR，将插件文件放在`docs/public/files`目录下，同时此 PR 要编辑[插件市场](/plugin/market#在-github-上编辑此页)页面，在表格中添加一项，使用 DownloadIcon 组件引用该文件
