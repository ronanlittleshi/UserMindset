const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // 托管当前目录的静态文件

const API_KEY = process.env.API_KEY;
const API_URL = 'https://ark.cn-beijing.volces.com/api/v3/chat/completions';

const SYSTEM_PROMPT = "你是抖小保，抖音的智能助手！你可以回答各种类型的问题：\n\n【重要业务说明】\n我们是【非闭环广告服务】，业务形态特点：\n- 广告主在平台投放广告\n- 用户看了广告后进行消费\n- 消费不一定是在平台内完成的\n- 不是传统的电商或团购业务模式\n- 回答时要注意结合这个业务形态\n\n1. 平台保障相关：帮助用户解决消费纠纷、售后问题，引导用户通过正确的渠道解决问题\n2. 生活相关：可以回答天气、日常问题、生活建议等生活化问题\n3. 广告相关：可以回答关于广告、抖音广告、广告记录等相关问题\n4. 其他问题：友好地回答用户的各种问题\n\n当用户询问广告记录或转化记录时，引导：抖音APP → 左上角'☰' → 找到'我的转化记录'\n\n当用户询问客服或联系客服时，引导：抖音APP → 左上角'☰' → 找到'我的转化记录' → 点进去，再找到需要联系客服的那个广告记录或订单，点击'联系客服'\n\n重要：当用户说找不到、没找到、看不到、没看到等表示找不到的意思时，结合上下文：\n- 如果之前用户问过广告记录、转化记录、订单记录、找记录、留资等问题，回复：别担心！我直接带您去查看广告记录页面。<br><br><button class=\"jump-button\" onclick=\"openConvertRecordPage()\">点击查看广告记录</button>\n- 如果之前用户问过客服、联系客服、找客服、售后等问题，回复：别担心！我直接带您去客服页面。<br><br><button class=\"jump-button\" onclick=\"openCustomerServicePage()\">点击联系客服</button>\n\n保持回复简洁、友好、有帮助，用轻松自然的语气和用户交流！";

let conversationHistory = [];

// 预设商家推荐内容
const RECOMMEND_MERCHANTS = [
    {
        name: "东方自然美学工作室",
        rating: 4.9,
        service: "自然风格摄影服务",
        description: "专注于户外自然场景摄影，口碑极佳，履约率99%",
        tag: "履约高"
    },
    {
        name: "阳光咖啡生活馆",
        rating: 4.8,
        service: "精品咖啡体验",
        description: "精选世界各地咖啡豆，提供舒适的环境和优质服务",
        tag: "口碑好"
    },
    {
        name: "美好花艺设计",
        rating: 4.9,
        service: "花艺定制与配送",
        description: "新鲜花材，专业设计，准时配送，好评如潮",
        tag: "评价优"
    }
];

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        const q = message.toLowerCase();
        
        // 检查是否是推荐相关的问题
        const isRecommend = q.includes('推荐') || q.includes('同类型') || 
                           q.includes('其他') && (q.includes('推广') || q.includes('商家') || q.includes('服务'));
        
        if (isRecommend) {
            let recommendHtml = '好的！为您推荐几家履约和评价都很好的商家：<br><br>';
            RECOMMEND_MERCHANTS.forEach((merchant, index) => {
                recommendHtml += `<div style="padding: 12px; background: #f5f5f5; border-radius: 8px; margin-bottom: 10px;">
                    <div style="font-weight: bold; font-size: 16px;">${merchant.name} <span style="color: #ff6b35;">⭐${merchant.rating}</span> <span style="background: #e8f5e9; color: #4caf50; padding: 2px 8px; border-radius: 4px; font-size: 12px;">${merchant.tag}</span></div>
                    <div style="color: #666; margin-top: 4px;">${merchant.service}</div>
                    <div style="color: #888; margin-top: 2px; font-size: 13px;">${merchant.description}</div>
                </div>`;
            });
            recommendHtml += '<br>这些商家都是平台上口碑好、履约率高的优质商家哦！';
            
            conversationHistory.push({ role: 'user', content: message });
            conversationHistory.push({ role: 'assistant', content: '好的！为您推荐几家履约和评价都很好的商家...' });
            res.json({ message: recommendHtml });
            return;
        }
        
        // 先检查是否是"找不到"相关的问题
        const isNotFound = q.includes('找不到') || q.includes('没找到') || 
                          q.includes('看不到') || q.includes('没看到') || 
                          q.includes('不') && (q.includes('找') || q.includes('见'));
        
        if (isNotFound && conversationHistory.length > 0) {
            // 查找历史对话，看之前用户问的是什么（只看用户消息，不看助手消息）
            let lastQuestionType = null;
            for (let i = conversationHistory.length - 1; i >= 0; i--) {
                if (conversationHistory[i].role === 'user') {
                    const msg = conversationHistory[i].content.toLowerCase();
                    if (msg.includes('广告记录') || msg.includes('转化记录') || 
                        msg.includes('订单记录') || msg.includes('找记录') || 
                        msg.includes('查看记录') || msg.includes('留资')) {
                        lastQuestionType = 'ad_record';
                        break;
                    } else if (msg.includes('客服') || msg.includes('联系客服') || 
                              msg.includes('找客服') || msg.includes('售后')) {
                        lastQuestionType = 'customer_service';
                        break;
                    }
                }
            }
            
            if (lastQuestionType === 'ad_record') {
                conversationHistory.push({ role: 'user', content: message });
                conversationHistory.push({ role: 'assistant', content: '别担心！我直接带您去查看广告记录页面。' });
                res.json({ message: '别担心！我直接带您去查看广告记录页面。<br><br><button class="jump-button" onclick="openConvertRecordPage()">点击查看广告记录</button>' });
                return;
            } else if (lastQuestionType === 'customer_service') {
                conversationHistory.push({ role: 'user', content: message });
                conversationHistory.push({ role: 'assistant', content: '别担心！我直接带您去客服页面。' });
                res.json({ message: '别担心！我直接带您去客服页面。<br><br><button class="jump-button" onclick="openCustomerServicePage()">点击联系客服</button>' });
                return;
            }
        }
        
        // 正常流程，调用API
        conversationHistory.push({ role: 'user', content: message });
        
        const requestMessages = [
            { role: 'system', content: SYSTEM_PROMPT },
            ...conversationHistory
        ];
        
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: 'doubao-seed-2-0-lite-260215', // 豆包模型
                messages: requestMessages,
                max_tokens: 1000,
                temperature: 0.7
            })
        });
        
        const data = await response.json();
        console.log('API Response:', data); // 打印完整响应
        
        if (data.choices && data.choices[0] && data.choices[0].message) {
            // OpenAI 格式
            const assistantMessage = data.choices[0].message.content;
            conversationHistory.push({ role: 'assistant', content: assistantMessage });
            res.json({ message: assistantMessage });
        } else if (data.content && data.content[0] && data.content[0].text) {
            // Anthropic 格式
            const assistantMessage = data.content[0].text;
            conversationHistory.push({ role: 'assistant', content: assistantMessage });
            res.json({ message: assistantMessage });
        } else if (data.message) {
            // 直接返回 message 字段
            conversationHistory.push({ role: 'assistant', content: data.message });
            res.json({ message: data.message });
        } else if (data.error) {
            console.error('API Error:', data.error);
            res.status(500).json({ error: data.error.message || data.error || 'API error' });
        } else {
            console.error('Unexpected response format:', data);
            res.status(500).json({ error: 'Invalid response format' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/reset', (req, res) => {
    conversationHistory = [];
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});