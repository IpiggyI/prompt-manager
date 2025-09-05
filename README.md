# 提示词管理工具 📝

一个功能完整的提示词管理工具，支持云端同步和简单身份验证，基于 Cloudflare Pages 部署。

## ✨ 特性

- 🚀 **一键部署**: GitHub 推送自动部署到 Cloudflare Pages
- ☁️ **云端同步**: 多设备数据同步，支持自动/手动同步
- 🔐 **简单认证**: 密码保护的云端访问
- 📱 **响应式设计**: 支持桌面和移动设备
- 🌙 **主题切换**: 支持深色/浅色主题
- 📋 **数据管理**: 提示词、网站书签、过滤规则管理
- 🔍 **智能搜索**: 支持标签、分类、内容搜索
- 📝 **Markdown支持**: 富文本编辑，渲染/源码双视图切换
- 📌 **备注功能**: 为每个提示词添加详细备注信息
- 💾 **数据备份**: 本地存储 + 云端备份双重保障

## 🚀 快速开始

### 1. Fork 并推送到 GitHub
```bash
git clone https://github.com/your-username/prompt-manager.git
cd prompt-manager
git remote set-url origin https://github.com/your-username/prompt-manager.git
git push -u origin main
```

### 2. 连接 Cloudflare Pages
1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 转到 **Pages** → **Create a project** → **Connect to Git**
3. 选择你的 `prompt-manager` 仓库
4. 使用默认构建设置完成创建

### 3. 配置 KV 存储和环境变量
在 Cloudflare Pages 项目设置中：
- **Environment variables**: 添加 `AUTH_PASSWORD = your-password`
- **KV namespace bindings**: 创建并绑定 `PROMPT_DATA` 和 `USER_AUTH`

### 4. 开始使用
访问你的 Cloudflare Pages 域名，点击 🔑 登录即可开始使用！

## 📖 详细部署指南

查看 [DEPLOYMENT.md](./DEPLOYMENT.md) 获取完整的部署步骤和配置说明。

## 🛠️ 技术栈

- **前端**: 纯HTML/CSS/JavaScript，响应式设计
- **后端**: Cloudflare Pages Functions
- **存储**: Cloudflare KV
- **部署**: GitHub + Cloudflare Pages 自动CI/CD
- **认证**: 简单的 Token 认证机制

## 📱 功能预览

- **提示词管理**: 创建、编辑、分类、标签管理，支持Markdown富文本和备注功能
- **网站书签**: URL收藏和分类整理
- **数据过滤**: 正则表达式过滤规则
- **云端同步**: 实时状态显示，一键同步
- **主题切换**: 深色/浅色主题随心切换
- **编辑器功能**: Markdown工具栏，渲染视图/源码视图无缝切换

## 🔐 安全性

- 密码保护的云端访问
- Token 认证，24小时自动过期
- HTTPS 强制加密传输
- CORS 跨域保护
- 数据本地备份机制

## 📝 开发说明

```bash
# 本地开发
npm install
npm run dev

# 查看部署状态
npm run whoami

# 设置密码
npm run secret:set
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

Copyright (c) 2025 YN

本项目源代码以非商业用途方式开放，任何个人或组织均可在以下条件下使用：
1. 允许自由复制、修改、再分发本代码。
2. 必须保留原作者署名和本声明。
3. 严禁将本代码及其衍生作品用于任何商业用途。

---

🎉 **享受高效的提示词管理体验！**