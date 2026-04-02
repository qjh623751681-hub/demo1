import React from 'react';
import OpenAIChat from '../components/OpenAIChat';

export default function AIAssistantPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI 助手</h1>
          <p className="text-gray-600">基于 OpenAI GPT-4o-mini 的智能对话助手</p>
        </div>
        
        <OpenAIChat />
        
        <div className="mt-6 bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">使用说明</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• API密钥已配置在 <code className="bg-gray-100 px-2 py-1 rounded">.env</code> 文件中</li>
            <li>• 使用模型：GPT-4o-mini（成本更低，响应更快）</li>
            <li>• 支持多轮对话，自动保存上下文</li>
            <li>• 按 Enter 发送消息，Shift + Enter 换行</li>
          </ul>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">💡 提示</h4>
            <p className="text-sm text-blue-800">
              如果遇到错误，请检查 API 密钥是否正确配置。你可以在项目的
              <code className="bg-blue-100 px-2 py-1 rounded">.env</code> 文件中查看或修改密钥。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
