# 提示词管理工具 - GitHub + Cloudflare Pages 部署指南

这是一个完整的提示词管理工具，支持云端同步和简单的身份验证机制。

## 🚀 GitHub 一键部署

### 推荐方式：GitHub + Cloudflare Pages 集成

这是最简单、最推荐的部署方式，支持自动CI/CD。

#### 步骤 1: 准备 GitHub 仓库
```bash
# 1. 将代码推送到 GitHub
git init
git add .
git commit -m "Initial commit: 提示词管理工具"
git branch -M main
git remote add origin https://github.com/your-username/prompt-manager.git
git push -u origin main
```

#### 步骤 2: 连接 Cloudflare Pages
1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 转到 **Pages** 部分
3. 点击 **Create a project**
4. 选择 **Connect to Git**
5. 选择你的 GitHub 仓库 `prompt-manager`
6. 配置构建设置：
   - **Framework preset**: `None`
   - **Build command**: 留空（不需要构建步骤）
   - **Build output directory**: `.` (当前目录)
   - **Root directory**: 留空（使用根目录）

#### 步骤 3: 配置环境变量和KV存储
在 Cloudflare Pages 项目设置中：

1. **环境变量设置**:
   - 转到 **Settings** → **Environment variables**
   - 添加：
     ```
     AUTH_PASSWORD = your-secure-password-123
     ENVIRONMENT = production
     ```

2. **KV Namespace 绑定**:
   - 转到 **Settings** → **Functions**
   - 在 **KV namespace bindings** 中添加：
     ```
     PROMPT_DATA → 创建新的KV命名空间
     USER_AUTH → 创建新的KV命名空间
     ```

#### 步骤 4: 启用自动部署
- GitHub推送到 `main` 分支时自动触发部署
- 预览分支推送时自动创建预览环境
- 支持回滚到之前的部署版本

## 🔧 功能特性

### ✅ 已实现的功能

1. **本地数据管理**
   - 提示词管理（增删改查、分类、标签）
   - 网站书签管理
   - 数据过滤和搜索

2. **云端同步**
   - 自动/手动数据同步到 Cloudflare KV
   - 多设备数据同步
   - 数据备份和恢复

3. **简单身份验证**
   - 密码保护的云端访问
   - Token 认证机制
   - 会话管理

4. **用户界面**
   - 响应式设计
   - 深色/浅色主题
   - 同步状态指示器
   - 直观的同步按钮

### 🔐 安全特性

- 密码验证登录
- Token 过期机制 (24小时)
- HTTPS 强制加密
- CORS 保护
- 数据本地备份

## 📱 使用方法

### 首次使用

1. 访问部署后的网址
2. 点击右上角的 🔑 按钮登录
3. 输入设置的密码
4. 登录成功后，数据会自动同步到云端

### 同步操作

- **☁️ 同步到云端**: 将本地数据上传到云端
- **⬇️ 从云端加载**: 从云端下载数据到本地
- **🚪 退出登录**: 注销当前会话

### 自动同步

- 登录后，每次数据修改会在 2 秒后自动同步
- 每 5 分钟进行一次定期同步
- 页面关闭前会尝试最后一次同步

## 🛠️ 管理和维护

### 修改认证密码
在 Cloudflare Pages 仪表板中：
1. 转到项目的 **Settings** → **Environment variables**
2. 编辑 `AUTH_PASSWORD` 变量
3. 保存后重新部署

### 查看存储的数据
1. 在 Cloudflare Dashboard 中转到 **Workers & Pages** → **KV**
2. 选择对应的 KV 命名空间查看数据
3. 可以直接在界面中编辑或删除数据

### 自定义域名
1. 在 Cloudflare Pages 仪表板中选择项目
2. 转到 **Custom domains** 选项卡  
3. 点击 **Set up a domain**
4. 输入你的域名并验证

### 监控和分析
- **Analytics**: 查看访问统计
- **Functions**: 监控API调用情况
- **Real-time logs**: 实时查看应用日志

## 🐛 故障排除

### 常见问题

1. **部署失败：wrangler.toml 错误**
   - 问题已修复：移除了 wrangler.toml 文件
   - Cloudflare Pages 使用自己的配置系统，不需要 wrangler.toml

2. **Functions 不工作**
   - 确认 KV 命名空间绑定正确
   - 检查环境变量 `AUTH_PASSWORD` 是否设置
   - 查看 Cloudflare Pages 的 Functions 日志

3. **同步失败**
   - 在浏览器开发者工具中查看网络请求
   - 确认登录状态和 Token 有效性
   - 检查 API 端点响应

4. **访问问题**
   - 确认部署成功完成
   - 检查 Pages 项目的自定义域名设置
   - 使用提供的 `.pages.dev` 域名进行测试

### 调试和日志
- **Pages Dashboard**: 查看部署状态和构建日志
- **Functions**: 在 Pages 项目中查看 Functions 调用日志  
- **Browser DevTools**: 使用网络面板查看API请求状态
- **GitHub Actions**: 查看自动部署的详细日志

## 📦 项目结构

```
prompt-manager/
├── .github/workflows/
│   └── deploy.yml           # GitHub Actions 自动部署
├── functions/               # Cloudflare Pages Functions
│   ├── _middleware.js       # CORS 中间件
│   └── api/
│       ├── auth/
│       │   ├── login.js     # 登录API
│       │   └── verify.js    # Token验证API
│       └── data/
│           ├── sync.js      # 数据同步API
│           └── load.js      # 数据加载API
├── prompt-manager.html      # 主应用文件
├── index.html               # 入口页面
├── package.json             # 项目配置
├── wrangler.toml            # Cloudflare Pages 配置
├── .env.example             # 环境变量示例
├── .gitignore               # Git 忽略文件
└── DEPLOYMENT.md            # 部署文档
```

## 🔄 更新应用

### 自动部署
推送代码到 GitHub，自动触发部署：
```bash
git add .
git commit -m "Update: 添加新功能"
git push origin main
```

### 手动触发部署
1. 在 GitHub 仓库中转到 **Actions** 选项卡
2. 选择 **Deploy to Cloudflare Pages** 工作流
3. 点击 **Run workflow**

## 🎯 下一步优化建议

1. **自定义域名**: 绑定你的专属域名
2. **SSL证书**: Cloudflare 自动提供免费SSL
3. **CDN加速**: 全球节点提供快速访问
4. **监控告警**: 设置状态监控和邮件提醒
5. **数据备份**: 定期导出KV数据做备份

---

🎉 **现在你可以将代码推送到 GitHub，享受一键部署到 Cloudflare Pages 的便利！**