# OpenClaw Academy

一个同时支持 Web 和 App 的企业培训应用骨架，用于带同事理解 `LLM -> Agent -> OpenClaw` 的核心概念、演示路径和基础测验。

## 技术方案

- Expo SDK 55
- React Native
- React Native Web

这套方案使用单代码库同时覆盖：

- Web 培训页面
- Android App
- iOS App

## 当前已实现

- 企业培训首页和课程总览
- `LLM / Agent / OpenClaw` 三阶段学习路径
- 面向不同角色的培训切换
- 三段式互动演示内容
- OpenClaw 运行闭环说明
- 随堂测验交互

## 本地启动

```bash
npm install
npm run web
```

如果要启动 App 端开发：

```bash
npm run start
```

然后根据 Expo CLI 提示打开 Android、iOS 或 Web。

## 后续建议

- 接公司 Logo、课程封面和品牌色
- 接内部知识库或培训题库
- 增加登录、学习进度、考试成绩和后台管理
- 接真实 OpenClaw demo 或录屏素材
