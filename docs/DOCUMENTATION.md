# IntelliJ IDEA Keybindings for VS Code - 技术文档

## 项目概述

IntelliJ IDEA Keybindings for VS Code 是一个Visual Studio Code扩展，它将IntelliJ IDEA的键盘快捷键映射移植到VS Code中。该扩展支持多种JetBrains产品，包括IntelliJ Ultimate、WebStorm、PyCharm、PHP Storm等。

### 主要特性

- 🔄 **完整的快捷键映射**: 支持IntelliJ IDEA的所有主要快捷键
- 🎯 **多平台支持**: 支持Windows、macOS和Linux
- 📦 **IntelliJ导入器**: 支持从IntelliJ XML配置文件导入自定义快捷键
- 🐪 **CamelHumps支持**: 支持驼峰命名法的单词导航
- 🔧 **高度可配置**: 支持禁用特定快捷键绑定

## 技术架构

### 项目结构

```
vscode-intellij-idea-keybindings/
├── src/                          # 源代码目录
│   ├── extension.ts              # 扩展主入口文件
│   ├── package-with-comment.json # 带注释的包配置文件
│   ├── importer/                 # IntelliJ导入器模块
│   │   ├── extension/           # 扩展相关功能
│   │   ├── generator/           # 代码生成器
│   │   ├── model/               # 数据模型
│   │   ├── parser/              # XML解析器
│   │   ├── reader/              # 文件读取器
│   │   ├── syntax-analyzer/     # 语法分析器
│   │   └── writer/              # 文件写入器
│   └── tool/                    # 开发工具
│       └── gene-keybind-markdown.js # 快捷键文档生成器
├── dist/                        # 编译输出目录
├── test/                        # 测试文件
├── images/                      # 图片资源
├── resource/                    # 资源文件
└── 配置文件
    ├── package.json             # 项目配置
    ├── tsconfig.json           # TypeScript配置
    ├── webpack.config.js       # Webpack配置
    └── .eslintrc.cjs           # ESLint配置
```

### 核心模块

#### 1. 扩展主模块 (`extension.ts`)
- 负责扩展的激活和初始化
- 注册命令和快捷键绑定
- 处理扩展的生命周期

#### 2. IntelliJ导入器模块 (`importer/`)
- **Parser**: 解析IntelliJ XML配置文件
- **Model**: 定义数据结构和类型
- **Generator**: 生成VS Code兼容的快捷键配置
- **Writer**: 将配置写入用户设置

#### 3. 工具模块 (`tool/`)
- 文档生成器：自动生成README中的快捷键表格

## 开发指南

### 环境要求

- Node.js 18+
- Visual Studio Code 1.94.0+
- TypeScript 5.8.3+

### 安装依赖

```bash
npm install
```

### 开发命令

```bash
# 编译项目
npm run compile

# 监听模式编译
npm run watch

# 生产环境打包
npm run package

# 代码检查
npm run lint

# 生成快捷键文档
npm run usage
```

### 开发流程

1. **修改快捷键配置**
   - 编辑 `src/package-with-comment.json` (注意：不是根目录的 `package.json`)
   - 运行 `npm run compile` 编译
   - 运行 `npm run usage` 生成文档
   - 将生成的Markdown内容粘贴到 `README.md`

2. **添加新功能**
   - 在 `src/` 目录下创建新模块
   - 更新 `package.json` 中的配置
   - 编写测试用例
   - 更新文档

### 快捷键配置格式

快捷键配置在 `package-with-comment.json` 中定义，格式如下：

```json
{
  "key": "ctrl+space",
  "command": "editor.action.triggerSuggest",
  "when": "editorHasCompletionItemProvider && textInputFocus && !editorReadonly"
}
```

## API文档

### 扩展API

#### 激活事件

```typescript
// 扩展激活时触发
export function activate(context: vscode.ExtensionContext) {
    // 注册命令
    context.subscriptions.push(
        vscode.commands.registerCommand('intellij.importKeyMapsSchema', importKeyMapsSchema)
    );
}
```

#### 主要命令

| 命令 | 描述 | 快捷键 |
|------|------|--------|
| `intellij.importKeyMapsSchema` | 导入IntelliJ快捷键配置 | 无 |
| `intellij.openInOppositeGroup` | 在相对组中打开文件 | 无 |

### 配置选项

#### 用户设置

```json
{
  "intellij-idea-keybindings.useCamelHumpsWords": true
}
```

**选项说明:**
- `useCamelHumpsWords`: 启用驼峰命名法单词导航模式

## 快捷键分类

### 编辑操作
- **代码补全**: `Ctrl+Space` (Windows/Linux) / `Cmd+Space` (macOS)
- **智能补全**: `Ctrl+Shift+Space`
- **完成语句**: `Ctrl+Shift+Enter`
- **快速文档**: `Ctrl+Q` / `F1`

### 导航操作
- **转到类**: `Ctrl+N`
- **转到文件**: `Ctrl+Shift+N`
- **转到符号**: `Ctrl+Alt+Shift+N`
- **转到行**: `Ctrl+G`

### 重构操作
- **重命名**: `Shift+F6`
- **提取方法**: `Ctrl+Alt+M`
- **提取变量**: `Ctrl+Alt+V`
- **内联**: `Ctrl+Alt+N`

### 调试操作
- **运行**: `Shift+F10`
- **调试**: `Shift+F9`
- **单步跳过**: `F8`
- **单步进入**: `F7`

## 测试

### 测试结构

```
test/
├── extension.test.ts    # 扩展功能测试
├── importer.test.ts     # 导入器测试
└── fixtures/           # 测试数据
```

### 运行测试

```bash
# 运行所有测试
npm test

# 运行特定测试文件
npm test -- extension.test.ts
```

## 构建和发布

### 构建流程

1. **开发构建**
   ```bash
   npm run compile
   ```

2. **生产构建**
   ```bash
   npm run package
   ```

3. **发布准备**
   ```bash
   npm run vscode:prepublish
   ```

### 发布检查清单

- [ ] 更新版本号 (`package.json`)
- [ ] 更新CHANGELOG.md
- [ ] 运行所有测试
- [ ] 检查代码质量 (`npm run lint`)
- [ ] 生成最新文档 (`npm run usage`)
- [ ] 构建生产版本
- [ ] 测试扩展功能

## 贡献指南

### 提交规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 格式：

```
feat: 添加新的快捷键支持
fix: 修复Windows平台下的快捷键冲突
docs: 更新README文档
style: 格式化代码
refactor: 重构导入器模块
test: 添加新的测试用例
```

### 代码规范

- 使用TypeScript编写所有代码
- 遵循ESLint配置
- 使用Prettier格式化代码
- 添加适当的注释和文档

### 提交PR流程

1. Fork项目仓库
2. 创建功能分支
3. 实现功能并添加测试
4. 运行测试和代码检查
5. 提交Pull Request
6. 等待代码审查

## 故障排除

### 常见问题

#### 1. 快捷键冲突

**问题**: 某些快捷键与VS Code默认快捷键冲突

**解决方案**:
- 在VS Code设置中禁用冲突的快捷键
- 使用 `File > Preferences > Keyboard Shortcuts` 查看冲突
- 右键点击冲突项选择 `Remove Keybinding`

#### 2. 导入器无法工作

**问题**: IntelliJ XML配置文件导入失败

**解决方案**:
- 检查XML文件格式是否正确
- 确保XML文件来自支持的IntelliJ版本
- 查看控制台错误信息

#### 3. CamelHumps模式不工作

**问题**: 驼峰命名法导航功能异常

**解决方案**:
- 检查设置 `intellij-idea-keybindings.useCamelHumpsWords` 是否启用
- 重启VS Code
- 检查是否有其他扩展冲突

### 调试技巧

1. **启用扩展日志**
   ```json
   {
     "intellij-idea-keybindings.debug": true
   }
   ```

2. **查看开发者工具**
   - 按 `Ctrl+Shift+I` (Windows/Linux) 或 `Cmd+Option+I` (macOS)
   - 查看Console标签页的错误信息

3. **重置快捷键设置**
   - 删除 `keybindings.json` 文件
   - 重新安装扩展

## 版本历史

### 当前版本: 1.7.5

**主要特性:**
- 支持VS Code 1.94.0+
- 完整的IntelliJ快捷键映射
- IntelliJ XML配置文件导入器
- CamelHumps单词导航支持

**已知问题:**
- 某些重构命令不支持
- 侧边栏控件不支持
- 数字键盘控制与数字键同时使用时存在冲突

## 许可证

本项目采用 [MIT许可证](LICENSE.md)。

## 联系方式

- **项目主页**: https://github.com/kasecato/vscode-intellij-idea-keybindings
- **问题反馈**: https://github.com/kasecato/vscode-intellij-idea-keybindings/issues
- **赞助支持**: https://github.com/sponsors/kasecato

---

*本文档最后更新于: 2024年*