#!/usr/bin/env node

/**
 * 文档生成脚本
 * 用于自动更新和维护项目文档
 */

const fs = require('fs');
const path = require('path');

// 文档配置
const docsConfig = {
    version: '1.7.5',
    lastUpdated: new Date().toISOString().split('T')[0],
    docsDir: 'docs',
    files: [
        {
            name: 'USER_GUIDE.md',
            title: '用户指南',
            description: '详细的使用说明和配置指南'
        },
        {
            name: 'DEVELOPER_GUIDE.md',
            title: '开发者指南',
            description: '开发环境设置和贡献流程'
        },
        {
            name: 'API_REFERENCE.md',
            title: 'API参考文档',
            description: '完整的API文档'
        },
        {
            name: 'DOCUMENTATION.md',
            title: '技术文档',
            description: '项目架构和功能说明'
        }
    ]
};

/**
 * 更新文档中的版本信息
 */
function updateVersionInfo() {
    console.log('🔄 更新文档版本信息...');
    
    docsConfig.files.forEach(file => {
        const filePath = path.join(docsConfig.docsDir, file.name);
        
        if (fs.existsSync(filePath)) {
            let content = fs.readFileSync(filePath, 'utf8');
            
            // 更新版本信息
            content = content.replace(
                /\*.*版本.*\*/g,
                `*${file.title}版本: ${docsConfig.version}*`
            );
            
            // 更新最后更新日期
            content = content.replace(
                /\*最后更新.*\*/g,
                `*最后更新: ${docsConfig.lastUpdated}*`
            );
            
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ 已更新 ${file.name}`);
        }
    });
}

/**
 * 生成文档索引
 */
function generateDocsIndex() {
    console.log('📝 生成文档索引...');
    
    const indexPath = path.join(docsConfig.docsDir, 'README.md');
    let content = fs.readFileSync(indexPath, 'utf8');
    
    // 更新版本信息
    content = content.replace(
        /\*文档中心版本.*\*/g,
        `*文档中心版本: ${docsConfig.version}*`
    );
    
    content = content.replace(
        /\*最后更新.*\*/g,
        `*最后更新: ${docsConfig.lastUpdated}*`
    );
    
    fs.writeFileSync(indexPath, content, 'utf8');
    console.log('✅ 已更新文档索引');
}

/**
 * 验证文档完整性
 */
function validateDocs() {
    console.log('🔍 验证文档完整性...');
    
    let allValid = true;
    
    docsConfig.files.forEach(file => {
        const filePath = path.join(docsConfig.docsDir, file.name);
        
        if (!fs.existsSync(filePath)) {
            console.error(`❌ 缺少文档文件: ${file.name}`);
            allValid = false;
        } else {
            const content = fs.readFileSync(filePath, 'utf8');
            
            // 检查基本结构
            if (!content.includes('# ')) {
                console.error(`❌ 文档缺少标题: ${file.name}`);
                allValid = false;
            }
            
            if (!content.includes(docsConfig.version)) {
                console.warn(`⚠️  文档版本信息可能过时: ${file.name}`);
            }
        }
    });
    
    if (allValid) {
        console.log('✅ 所有文档验证通过');
    } else {
        console.error('❌ 文档验证失败');
        process.exit(1);
    }
}

/**
 * 生成文档统计信息
 */
function generateStats() {
    console.log('📊 生成文档统计信息...');
    
    let totalLines = 0;
    let totalFiles = 0;
    
    docsConfig.files.forEach(file => {
        const filePath = path.join(docsConfig.docsDir, file.name);
        
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            const lines = content.split('\n').length;
            totalLines += lines;
            totalFiles++;
            
            console.log(`📄 ${file.name}: ${lines} 行`);
        }
    });
    
    console.log(`📊 总计: ${totalFiles} 个文件, ${totalLines} 行`);
}

/**
 * 主函数
 */
function main() {
    console.log('🚀 开始生成文档...\n');
    
    try {
        // 确保docs目录存在
        if (!fs.existsSync(docsConfig.docsDir)) {
            fs.mkdirSync(docsConfig.docsDir, { recursive: true });
            console.log(`📁 创建目录: ${docsConfig.docsDir}`);
        }
        
        // 验证文档
        validateDocs();
        
        // 更新版本信息
        updateVersionInfo();
        
        // 生成文档索引
        generateDocsIndex();
        
        // 生成统计信息
        generateStats();
        
        console.log('\n🎉 文档生成完成！');
        console.log(`📚 文档版本: ${docsConfig.version}`);
        console.log(`📅 更新时间: ${docsConfig.lastUpdated}`);
        
    } catch (error) {
        console.error('❌ 文档生成失败:', error.message);
        process.exit(1);
    }
}

// 如果直接运行此脚本
if (require.main === module) {
    main();
}

module.exports = {
    updateVersionInfo,
    generateDocsIndex,
    validateDocs,
    generateStats,
    docsConfig
};