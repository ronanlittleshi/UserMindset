#!/bin/bash

echo "🚀 抖小保 Demo 启动脚本"
echo "========================"

# 检查Node.js是否安装
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js"
    exit 1
fi

# 检查npm是否安装
if ! command -v npm &> /dev/null; then
    echo "❌ npm 未安装，请先安装 npm"
    exit 1
fi

# 检查node_modules是否存在
if [ ! -d "node_modules" ]; then
    echo "📦 首次启动，正在安装依赖..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ 依赖安装失败"
        exit 1
    fi
    echo "✅ 依赖安装完成"
fi

echo ""
echo "📋 启动说明："
echo "   1. 后端服务器将在 http://localhost:3001 运行"
echo "   2. 请在新终端中运行：python3 -m http.server 8080"
echo "   3. 然后在浏览器中打开：http://localhost:8080"
echo ""
echo "按 Ctrl+C 可以停止后端服务器"
echo ""
echo "🚀 正在启动后端服务器..."

npm start
