# 抖小保 Demo 文件清单

## 📁 完整文件列表

### 📄 核心代码文件（必须）
- `index.html` - 主页面（完整功能版，接入AI）
- `index-offline.html` - 离线版本（纯前端，无需后端）
- `server.js` - Node.js后端服务器
- `package.json` - 项目配置和依赖
- `.env` - 环境变量配置（包含API密钥）

### 🖼️ 资源文件（必须）
- `抖小保.png` - 抖小保头像图片
- `Feed刷广告.mp4` - 背景视频（约10-20MB）
- `转化记录列表页.png` - 转化记录页面截图
- `客服页面.jpg` - 客服页面截图
- `feed广告图.jpg` - 备用广告图片

### 📖 文档文件
- `README.md` - 使用说明文档（必读！）
- `FILES.md` - 本文档，文件清单说明

### 🛠️ 辅助文件
- `start.sh` - 快速启动脚本（Mac/Linux）
- `package-lock.json` - npm依赖锁定文件

## 🎯 快速分享指南

### 方法一：完整分享（推荐）
分享整个文件夹，包含所有文件。接收者：
1. 解压到本地
2. 安装Node.js（如果没有）
3. 运行 `npm install`
4. 运行 `npm start` 启动后端
5. 另一个终端运行 `python3 -m http.server 8080`
6. 浏览器访问 `http://localhost:8080`

### 方法二：离线版本分享
只分享这些文件，接收者无需后端：
- `index-offline.html`
- `抖小保.png`
- `Feed刷广告.mp4`
- `转化记录列表页.png`
- `客服页面.jpg`
- `feed广告图.jpg`

接收者：
1. 解压到本地
2. 运行 `python3 -m http.server 8080`
3. 浏览器访问 `http://localhost:8080/index-offline.html`

### 方法三：仅分享核心
如果视频太大，可以替换为其他视频或图片：
- 保留所有代码文件
- 替换 `Feed刷广告.mp4` 为其他视频
- 修改 `index.html` 中视频的时间区间配置

## ⚠️ 注意事项

1. **API密钥安全**：`.env` 文件包含API密钥，分享前注意：
   - 如果是演示用途，可以保留
   - 如果是正式密钥，分享前请移除或替换
   - 离线版本不需要 `.env` 文件

2. **文件大小**：`Feed刷广告.mp4` 可能较大，分享前可压缩

3. **浏览器兼容性**：确保接收者使用现代浏览器（Chrome、Safari、Edge）

## 🔧 快速检查清单

分享前确认：
- [ ] 所有资源文件齐全
- [ ] `README.md` 在根目录
- [ ] 测试过可以正常运行
- [ ] 处理了API密钥（如需要）
- [ ] 没有多余的临时文件

## 📞 分享后支持

分享时附上：
```
抖小保 Demo 使用说明：

1. 安装Node.js（官网下载）
2. 打开终端，进入项目目录
3. 运行：npm install
4. 运行：npm start（后端）
5. 新开终端：python3 -m http.server 8080（前端）
6. 浏览器打开：http://localhost:8080

详细说明见 README.md
```
