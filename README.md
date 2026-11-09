<div align="center">
  <img src="src-tauri/icons/mark.svg" alt="Fly Island logo" width="96" height="96">

  <h1>Fly Island</h1>

  <p><a href="README.en.md">English</a> · 中文</p>

  <p>一款 Windows / macOS 桌面效率工具，在屏幕顶部集中管理待办、剪贴板、音乐、AI 状态（Mac MVP 已移除翻译与 QQ 邮箱）。</p>

  <p>
    <a href="https://island.flyliu.org/">在线预览</a>
    ·
    <a href="https://github.com/flyl1u/fly-island/releases/latest">下载 Release</a>
    ·
    <a href="https://github.com/flyl1u/fly-island/issues">反馈 Issue</a>
    ·
    <a href="#用户交流群">用户交流群</a>
  </p>

  <p>
    <img alt="Version" src="https://img.shields.io/github/v/release/flyl1u/fly-island?label=version">
    <img alt="Platform" src="https://img.shields.io/badge/platform-Windows%20%7C%20macOS-0078D4">
    <img alt="Tauri" src="https://img.shields.io/badge/Tauri-2-24C8DB">
    <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB">
  </p>
</div>

## 这是什么

一款 Windows 优先的灵动岛。集成微信、QQ、邮箱通知，剪贴板历史、快捷翻译、Codex状态灯、媒体控制、每日待办等功能

fly-island 以轻量、无边框、始终置顶的悬浮岛形式运行，它会在需要时展开，用完后回到紧凑状态，减少为了获取一条信息而切换窗口的次数。

## 为什么做它

日常工作或学习过程中，我经常需要在某软件写下 Todo List，为了隔绝噪音，我会打开音乐软件并把音量调到合适的临界点，工作和学习又经常需要借助翻译网站，同时还会反复复制和粘贴代码，与此同时难以避免的是接收不同群聊、好友发送的消息

在这些界面之间来回切换，不仅会降低效率，也容易让人分心，因此我开始思考：能不能把这些高频功能集成到一个足够轻量的地方？

我想到了iPhone的灵动岛，它把消息通知、计时器、媒体控制等信息集中到一个小岛上，缩短了我们获取信息的路程。于是，fly-island 诞生了

## 功能

fly-island 想解决的核心问题，是工作和学习过程中频繁的窗口切换。

fly-island 把分散在不同窗口中的高频操作放到一个可折叠、可展开的悬浮岛里：

- **图文剪贴板历史**：记录复制过的文本和图片，搜索内容或备注、收藏常用项、添加备注、删除记录，并一键复制回剪贴板。历史数量、图片记录和全局唤出快捷键均可设置。
- **QQ 与微信（Windows）**：在消息页切换 QQ / 微信提醒；macOS 上隐藏并 stub。
- **AI 状态灯**：通过 Codex 和 Claude Code 生命周期钩子显示任务运行、完成或需要关注的状态，可在设置中安装或修复钩子。
- **待办、每日笔记与归档**：管理当天任务、标记完成、设置当前任务；记录每日笔记并浏览历史归档。可选择自动结转未完成任务，将任务和笔记保存为 Markdown。
- **音乐与系统音频**：通过 Windows 媒体会话切换上一首、播放/暂停和下一首，并用动态波形显示音频活动。
- **外观与启动设置**：切换经典或液态玻璃外观、系统或像素字体，调整大小、透明度、颜色和顶部距离；保存最多 6 个自定义样式预设、控制标题显示和开机自启动。

待办、剪贴板和应用设置保存在本机。微信提醒只表示微信请求了任务栏关注，不读取聊天正文、发送人或准确未读数。QQ 通知只保留在本次运行的内存中；QQ 邮箱后台仅同步邮件头，正文按需读取且只保留在内存，不下载附件、不加载远程图片，也不会改变邮件已读状态。

## 使用说明

展开岛屿即可切换待办、音乐、剪贴板和消息页面；设置按钮打开带分类侧栏的独立窗口。新用户默认使用经典外观，岛屿名称隐藏，任务文字为白色；设置中的样式预设可保存和恢复个性化布局。

### 功能设置

- **QQ 和微信提醒**：首次默认开启。QQ 需要 Windows 通知访问权限，且 QQ 已登录并启用系统通知；微信需要电脑版保持登录并发出任务栏提醒。两个来源可分别在「设置 → 通知」或消息页面关闭。参见 [QQ 通知说明](docs/qq-notification-compatibility.md)和[微信提醒说明](docs/wechat-reminder-compatibility.md)。

- **AI 状态灯**：在「设置 → AI Agent 状态灯」选择「安装/修复」，然后重启 Codex 或运行 Claude Code 的终端。Codex 首次使用钩子时按提示信任配置。详见 [AI Agent 状态灯说明](docs/agent-status-hooks.md)。

- **剪贴板历史**：可在设置中关闭记录、调整图片捕获和历史数量，并录制唤出快捷键。历史记录保存在本机应用数据目录。

### 技术栈

- Tauri 2：Windows 桌面应用外壳和原生能力
- React 19 + TypeScript：前端界面和交互
- Rust：窗口、快捷键、剪贴板、媒体和文件等桌面能力
- pnpm：依赖安装与项目脚本

## 用户交流群

欢迎加入 **fly-island 用户交流群**，交流使用体验、反馈问题和分享建议。使用微信扫描下方二维码即可入群。

<p align="center">
  <img src="docs/assets/wechat-community.jpg" alt="fly-island 微信用户交流群二维码" width="360">
</p>

二维码有有效期，当前图片标注为 **11 月 11 日前有效**；若已失效，可通过 [Issue](https://github.com/flyl1u/fly-island/issues) 反馈以便更新。


## macOS（本 fork 的 MVP）

本仓库是面向 **Windows + macOS** 的 fork。macOS 构建通过 GitHub Actions 的 `macos-latest` 产出 `.app` / `.dmg` 产物（见 `.github/workflows/macos-package.yml`）。

### 已从产品中移除

- DeepSeek 快捷翻译（UI、热键、Rust 命令、文档）
- QQ 邮箱 / IMAP（协议层、凭据、UI、文档）

### macOS 上暂不可用 / stub

- QQ 系统通知监听、微信任务栏闪烁提醒（Windows 实现保留在 `#[cfg(windows)]`）
- 完整媒体会话控制（Mac 返回空状态；面板可打开）
- 全局剪贴板热键（Mac 使用轮询捕获历史；热键后续再接）
- Apple 公证 / Developer ID 签名：首版产物为 **未签名 / ad-hoc**。公证需要仓库 Secrets（如证书、Apple ID、Team ID），缺失时不阻塞打包任务。

### 在 Mac 上本地构建

需要 macOS 11+、Node.js、pnpm、Rust、Xcode CLT。

```bash
pnpm install
pnpm tauri dev
# 或
pnpm tauri build --bundles app,dmg
```

未签名的 `.app` 可能需要在「系统设置 → 隐私与安全性」中允许打开。


## 开发与构建

### 从源码构建

需要 Windows 10/11、Node.js、pnpm、Rust、Visual Studio C++ Build Tools 和 WebView2 Runtime。

```powershell
git clone https://github.com/flyl1u/fly-island.git
cd fly-island
pnpm install
pnpm tauri dev
```

运行统一检查：

```powershell
pnpm check
```

### 构建 Release

```powershell
pnpm tauri build
```

构建完成后，安装包位于：

- `src-tauri/target/release/bundle/nsis/fly-island_版本号_x64-setup.exe`
- `src-tauri/target/release/bundle/msi/fly-island_版本号_x64_en-US.msi`

也可以直接从 [GitHub Releases](https://github.com/flyl1u/fly-island/releases/latest) 下载 Windows x64 安装包。

应用内更新（检查更新、签名与 `latest.json` 发布流程）见 [docs/updater.md](docs/updater.md)。

## 贡献致谢

感谢 [@TixXin](https://github.com/TixXin) 在 [PR #36](https://github.com/flyl1u/fly-island/pull/36) 中提出的模块化架构方案与实现。本地重构在当前主线上适配并复用了其中部分代码，来源与验证记录见[改造说明](docs/architecture/local-refactor.md)。

## 开源协议

本项目采用 [MIT 协议](LICENSE)。

第三方依赖和内置资源仍遵循各自的许可证。内置字体的许可信息见[字体说明](src/assets/fonts/README.md)。

## Star History

<a href="https://www.star-history.com/?repos=flyl1u%2Ffly-island&type=date&legend=top-left">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=flyl1u/fly-island&type=date&theme=dark&legend=top-left" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=flyl1u/fly-island&type=date&theme=light&legend=top-left" />
    <img alt="Star History Chart" src="https://api.star-history.com/chart?repos=flyl1u/fly-island&type=date&theme=light&legend=top-left" />
  </picture>
</a>
