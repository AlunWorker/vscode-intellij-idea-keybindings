# 开发者指南

## 开发环境设置

### 系统要求

- **Node.js**: 18.0.0 或更高版本
- **Visual Studio Code**: 1.94.0 或更高版本
- **TypeScript**: 5.8.3 或更高版本
- **Git**: 用于版本控制

### 安装开发依赖

```bash
# 克隆仓库
git clone https://github.com/kasecato/vscode-intellij-idea-keybindings.git
cd vscode-intellij-idea-keybindings

# 安装依赖
npm install

# 验证安装
npm run compile
```

### 开发工具推荐

- **VS Code**: 主要开发环境
- **ESLint**: 代码质量检查
- **Prettier**: 代码格式化
- **TypeScript**: 类型检查

## 项目结构详解

### 核心文件

```
src/
├── extension.ts                    # 扩展主入口
├── package-with-comment.json      # 快捷键配置文件（重要！）
└── importer/                      # IntelliJ导入器模块
    ├── extension/                 # 扩展相关功能
    ├── generator/                 # 代码生成器
    ├── model/                     # 数据模型
    ├── parser/                    # XML解析器
    ├── reader/                    # 文件读取器
    ├── syntax-analyzer/           # 语法分析器
    └── writer/                    # 文件写入器
```

### 配置文件说明

#### `package.json`
- 扩展的基本信息和元数据
- 依赖项和脚本配置
- 发布配置

#### `package-with-comment.json`
- **重要**: 这是实际的快捷键配置文件
- 包含所有快捷键映射
- 支持注释和文档

#### `tsconfig.json`
- TypeScript编译配置
- 模块解析设置
- 类型检查选项

#### `webpack.config.js`
- 构建配置
- 模块打包设置
- 开发和生产环境配置

## 开发工作流

### 1. 修改快捷键配置

**重要提醒**: 始终编辑 `src/package-with-comment.json`，而不是根目录的 `package.json`。

```json
{
  "key": "ctrl+space",
  "command": "editor.action.triggerSuggest",
  "when": "editorHasCompletionItemProvider && textInputFocus && !editorReadonly",
  "comment": "Basic code completion"
}
```

### 2. 编译和测试

```bash
# 开发模式编译
npm run compile

# 监听模式（自动重新编译）
npm run watch

# 生产模式构建
npm run package

# 代码检查
npm run lint
```

### 3. 生成文档

```bash
# 生成快捷键文档
npm run usage

# 将生成的Markdown内容复制到README.md
```

### 4. 测试扩展

```bash
# 在VS Code中按F5启动调试
# 这会打开一个新的VS Code窗口，加载您的扩展
```

## 快捷键配置详解

### 配置格式

```json
{
  "key": "快捷键组合",
  "command": "VS Code命令",
  "when": "上下文条件",
  "mac": "macOS特定快捷键",
  "linux": "Linux特定快捷键",
  "win": "Windows特定快捷键",
  "comment": "说明注释"
}
```

### 快捷键语法

#### 修饰键
- `ctrl` / `cmd` (macOS)
- `alt` / `option` (macOS)
- `shift`
- `meta` (macOS)

#### 特殊键
- `space`, `tab`, `enter`, `escape`
- `f1` - `f12`
- `home`, `end`, `pageup`, `pagedown`
- `insert`, `delete`, `backspace`

#### 组合键示例
```json
{
  "key": "ctrl+shift+alt+n",
  "command": "workbench.action.quickOpen",
  "when": "!inQuickOpen"
}
```

### 上下文条件

```json
{
  "when": "editorTextFocus && !editorReadonly && !inQuickOpen"
}
```

常用上下文：
- `editorTextFocus`: 编辑器有焦点
- `editorReadonly`: 编辑器只读
- `inQuickOpen`: 在快速打开对话框中
- `terminalFocus`: 终端有焦点
- `filesExplorerFocus`: 文件浏览器有焦点

## 代码贡献指南

### 分支策略

1. **主分支**: `main` - 稳定版本
2. **开发分支**: `develop` - 开发版本
3. **功能分支**: `feature/功能名称`
4. **修复分支**: `fix/问题描述`

### 提交规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 格式：

```bash
# 新功能
git commit -m "feat: 添加新的快捷键支持"

# 修复bug
git commit -m "fix: 修复Windows平台下的快捷键冲突"

# 文档更新
git commit -m "docs: 更新README文档"

# 代码重构
git commit -m "refactor: 重构导入器模块"

# 测试相关
git commit -m "test: 添加新的测试用例"

# 构建相关
git commit -m "build: 更新webpack配置"
```

### Pull Request 流程

1. **Fork 仓库**
2. **创建功能分支**
   ```bash
   git checkout -b feature/new-keybinding
   ```
3. **实现功能**
   - 编写代码
   - 添加测试
   - 更新文档
4. **提交代码**
   ```bash
   git add .
   git commit -m "feat: 添加新的快捷键支持"
   git push origin feature/new-keybinding
   ```
5. **创建 Pull Request**
6. **代码审查**
7. **合并到主分支**

## 测试指南

### 单元测试

```bash
# 运行所有测试
npm test

# 运行特定测试文件
npm test -- extension.test.ts

# 监听模式
npm test -- --watch
```

### 集成测试

1. **手动测试**
   - 按F5启动调试
   - 测试新添加的快捷键
   - 验证功能正常

2. **自动化测试**
   - 编写端到端测试
   - 测试快捷键冲突
   - 测试导入功能

### 测试文件结构

```
test/
├── extension.test.ts      # 扩展功能测试
├── importer.test.ts       # 导入器测试
├── keybinding.test.ts     # 快捷键测试
└── fixtures/             # 测试数据
    ├── sample.xml        # 示例XML文件
    └── expected.json     # 期望结果
```

## 调试技巧

### VS Code 调试

1. **启动调试**
   - 按F5启动调试会话
   - 在新窗口中测试扩展

2. **断点调试**
   ```typescript
   // 在代码中添加断点
   debugger;
   ```

3. **日志输出**
   ```typescript
   console.log('调试信息');
   vscode.window.showInformationMessage('调试消息');
   ```

### 性能分析

```bash
# 分析构建性能
npm run package -- --profile

# 分析运行时性能
# 在VS Code开发者工具中查看性能面板
```

## 发布流程

### 版本管理

使用语义化版本控制：

- *开发者指南版本: 1.7.5*: 不兼容的API修改
- *开发者指南版本: 1.7.5*: 向下兼容的功能性新增
- **修订号**: 向下兼容的问题修正

### 发布检查清单

- [ ] 更新版本号 (`package.json`)
- [ ] 更新CHANGELOG.md
- [ ] 运行所有测试
- [ ] 代码质量检查
- [ ] 生成最新文档
- [ ] 构建生产版本
- [ ] 测试扩展功能
- [ ] 创建发布标签

### 发布命令

```bash
# 构建生产版本
npm run vscode:prepublish

# 创建发布包
vsce package

# 发布到市场
vsce publish
```

## 常见开发问题

### 快捷键不生效

**可能原因**:
1. 配置文件格式错误
2. 命令名称不正确
3. 上下文条件不匹配

**解决方案**:
```bash
# 检查配置文件语法
npm run lint

# 验证命令是否存在
# 在VS Code中按Ctrl+Shift+P查看所有命令
```

### 构建失败

**常见问题**:
1. TypeScript编译错误
2. 依赖项版本冲突
3. 配置文件错误

**解决方案**:
```bash
# 清理并重新安装依赖
rm -rf node_modules package-lock.json
npm install

# 检查TypeScript错误
npx tsc --noEmit

# 检查webpack配置
npm run compile -- --verbose
```

### 导入器问题

**调试步骤**:
1. 检查XML文件格式
2. 验证解析器逻辑
3. 测试生成器输出
4. 检查写入操作

```typescript
// 添加调试日志
console.log('XML内容:', xmlContent);
console.log('解析结果:', parsedData);
console.log('生成的快捷键:', keybindings);
```

## 性能优化

### 构建优化

1. **Webpack配置优化**
   ```javascript
   // 启用代码分割
   optimization: {
     splitChunks: {
       chunks: 'all'
     }
   }
   ```

2. **TypeScript优化**
   ```json
   {
     "compilerOptions": {
       "incremental": true,
       "skipLibCheck": true
     }
   }
   ```

### 运行时优化

1. **延迟加载**
   ```typescript
   // 只在需要时加载模块
   const module = await import('./heavy-module');
   ```

2. **缓存机制**
   ```typescript
   // 缓存解析结果
   const cache = new Map();
   if (cache.has(key)) {
     return cache.get(key);
   }
   ```

## 文档维护

### 文档更新流程

1. **代码变更时**
   - 更新相关注释
   - 修改API文档
   - 更新示例代码

2. **功能添加时**
   - 更新用户指南
   - 添加API文档
   - 更新README

3. **发布前**
   - 检查所有文档
   - 更新版本信息
   - 验证链接有效性

### 文档标准

- 使用清晰的标题结构
- 提供代码示例
- 包含错误处理说明
- 保持文档与代码同步

## 社区贡献

### 贡献类型

1. **代码贡献**
   - 新功能开发
   - Bug修复
   - 性能优化

2. **文档贡献**
   - 文档改进
   - 翻译工作
   - 示例代码

3. **测试贡献**
   - 测试用例编写
   - 自动化测试
   - 质量保证

### 获取帮助

- **GitHub Issues**: 报告问题和建议
- **GitHub Discussions**: 讨论和问答
- **Pull Requests**: 代码贡献
- **Wiki**: 详细文档

---

*开发者指南版本: 1.7.5*

*最后更新: 2025-08-02*