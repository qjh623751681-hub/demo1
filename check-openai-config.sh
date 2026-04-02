#!/bin/bash

echo "🔍 检查OpenAI API配置..."

# 检查.env文件
if [ ! -f ".env" ]; then
  echo "❌ .env 文件不存在"
  exit 1
fi

echo "✅ .env 文件存在"

# 检查API密钥配置
if grep -q "OPENAI_API_KEY" .env; then
  API_KEY=$(grep "OPENAI_API_KEY" .env | cut -d '=' -f2)
  if [ ${#API_KEY} -gt 40 ]; then
    echo "✅ API密钥已配置"
    echo "   密钥长度: ${#API_KEY} 字符"
    if [[ $API_KEY == sk-* ]]; then
      echo "   密钥格式: 正确"
    else
      echo "   ⚠️  密钥格式: 可能不正确（应该以sk-开头）"
    fi
  else
    echo "❌ API密钥长度不足"
  fi
else
  echo "❌ .env 文件中未找到 OPENAI_API_KEY 配置"
  exit 1
fi

# 检查必要的文件
echo ""
echo "📁 检查必要文件..."

FILES=(
  "src/services/openai.ts"
  "src/components/OpenAIChat.tsx"
  "src/pages/AIAssistant.tsx"
)

for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "✅ $file"
  else
    echo "❌ $file 不存在"
  fi
done

echo ""
echo "✅ 所有检查完成！"
echo ""
echo "🚀 现在可以："
echo "   1. 启动开发服务器: npm run dev"
echo "   2. 访问工作台: http://localhost:5173/demo1/"
echo "   3. 点击'AI助手'按钮开始对话"
echo ""
