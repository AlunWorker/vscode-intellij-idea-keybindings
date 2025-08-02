# 用户指南

## 快速开始

### 安装扩展

1. 打开 Visual Studio Code
2. 按 `Ctrl+Shift+X` (Windows/Linux) 或 `Cmd+Shift+X` (macOS) 打开扩展面板
3. 搜索 "IntelliJ IDEA Keybindings"
4. 点击安装按钮

或者通过命令行安装：

```bash
code --install-extension k--kato.intellij-idea-keybindings
```

### 首次使用

安装完成后，扩展会自动激活。您将立即获得 IntelliJ IDEA 的键盘快捷键体验。

## 基本配置

### 启用 CamelHumps 模式

如果您习惯使用 IntelliJ 的驼峰命名法单词导航，可以启用此功能：

1. 打开设置 (`Ctrl+,` 或 `Cmd+,`)
2. 搜索 "intellij-idea-keybindings.useCamelHumpsWords"
3. 勾选该选项

或者在 `settings.json` 中添加：

```json
{
    "intellij-idea-keybindings.useCamelHumpsWords": true
}
```

### 自定义快捷键

如果您想禁用某些快捷键绑定：

1. 打开键盘快捷键设置 (`Ctrl+K Ctrl+S` 或 `Cmd+K Cmd+S`)
2. 搜索 "IntelliJ IDEA Keybindings"
3. 找到要禁用的快捷键
4. 右键点击选择 "Remove Keybinding"

## 快捷键分类指南

### 编辑操作

#### 代码补全
- **基本补全**: `Ctrl+Space` (Windows/Linux) / `Cmd+Space` (macOS)
  - 显示所有可用的类、方法和变量
- **智能补全**: `Ctrl+Shift+Space`
  - 根据上下文过滤建议列表
- **完成语句**: `Ctrl+Shift+Enter`
  - 自动添加分号、括号等

#### 代码生成
- **生成代码**: `Alt+Insert` (Windows/Linux) / `Cmd+N` (macOS)
  - 生成 getter/setter、构造函数等
- **重写方法**: `Ctrl+O`
  - 显示可重写的方法列表
- **实现方法**: `Ctrl+I`
  - 显示需要实现的方法

#### 代码格式化
- **格式化代码**: `Ctrl+Alt+L` (Windows/Linux) / `Cmd+Alt+L` (macOS)
- **优化导入**: `Ctrl+Alt+O`
- **自动缩进**: `Ctrl+Alt+I`

### 导航操作

#### 文件导航
- **转到类**: `Ctrl+N`
- **转到文件**: `Ctrl+Shift+N`
- **转到符号**: `Ctrl+Alt+Shift+N`
- **转到行**: `Ctrl+G`

#### 编辑器导航
- **上一个标签页**: `Alt+Left` / `Shift+Cmd+[`
- **下一个标签页**: `Alt+Right` / `Shift+Cmd+]`
- **最近文件**: `Ctrl+E` / `Cmd+E`

#### 代码导航
- **转到声明**: `Ctrl+B` / `Cmd+B`
- **转到实现**: `Ctrl+Alt+B` / `Cmd+Alt+B`
- **查找用法**: `Alt+F7`

### 搜索和替换

#### 基本搜索
- **搜索**: `Ctrl+F` / `Cmd+F`
- **搜索下一个**: `F3` / `Cmd+G`
- **搜索上一个**: `Shift+F3` / `Cmd+Shift+G`
- **替换**: `Ctrl+R` / `Cmd+R`

#### 全局搜索
- **在文件中搜索**: `Ctrl+Shift+F` / `Cmd+Shift+F`
- **在文件中替换**: `Ctrl+Shift+R` / `Cmd+Shift+R`
- **搜索所有内容**: `Shift+Shift` (双击 Shift)

### 重构操作

#### 重命名
- **重命名**: `Shift+F6`
  - 重命名变量、方法、类等
  - 自动更新所有引用

#### 提取操作
- **提取方法**: `Ctrl+Alt+M` / `Cmd+Alt+M`
- **提取变量**: `Ctrl+Alt+V` / `Cmd+Alt+V`
- **提取字段**: `Ctrl+Alt+F` / `Cmd+Alt+F`
- **提取常量**: `Ctrl+Alt+C` / `Cmd+Alt+C`

### 调试操作

#### 运行和调试
- **运行**: `Shift+F10` / `Ctrl+R`
- **调试**: `Shift+F9` / `Ctrl+D`
- **停止**: `Ctrl+F2` / `Cmd+F2`

#### 调试控制
- **单步跳过**: `F8`
- **单步进入**: `F7`
- **单步跳出**: `Shift+F8`
- **运行到光标**: `Alt+F9`
- **继续执行**: `F9` / `Cmd+Alt+R`

#### 断点
- **切换断点**: `Ctrl+F8` / `Cmd+F8`
- **查看断点**: `Ctrl+Shift+F8` / `Cmd+Shift+F8`

## 高级功能

### IntelliJ 导入器

如果您有自定义的 IntelliJ 快捷键配置，可以导入到 VS Code：

1. 在 IntelliJ 中导出快捷键配置：
   - 打开 `File > Manage IDE Settings > Export Settings`
   - 选择 "Keymap" 选项
   - 导出为 XML 文件

2. 在 VS Code 中导入：
   - 按 `Ctrl+Shift+P` (Windows/Linux) 或 `Cmd+Shift+P` (macOS)
   - 输入 "Import IntelliJ Keybindings"
   - 选择该命令
   - 粘贴 XML 内容

### 快捷键冲突解决

如果遇到快捷键冲突：

1. **查看冲突**：
   - 打开键盘快捷键设置
   - 搜索冲突的快捷键
   - 查看哪些扩展在使用该快捷键

2. **解决冲突**：
   - 禁用不需要的快捷键
   - 重新映射快捷键
   - 调整快捷键优先级

### 自定义快捷键映射

您可以在 `keybindings.json` 中添加自定义映射：

```json
[
    {
        "key": "ctrl+shift+alt+n",
        "command": "workbench.action.quickOpen",
        "when": "!inQuickOpen"
    }
]
```

## 平台特定说明

### Windows

- 使用 `Ctrl` 作为主要修饰键
- 数字键盘快捷键可用
- 支持 Windows 特定的快捷键

### macOS

- 使用 `Cmd` 作为主要修饰键
- 支持 macOS 特定的快捷键组合
- 与系统快捷键集成良好

### Linux

- 使用 `Ctrl` 作为主要修饰键
- 支持 Linux 桌面环境的快捷键
- 兼容各种 Linux 发行版

## 常见问题解答

### Q: 某些快捷键不工作怎么办？

**A:** 可能的原因和解决方案：

1. **快捷键冲突**：
   - 检查是否有其他扩展使用相同快捷键
   - 在键盘快捷键设置中查看冲突

2. **上下文条件**：
   - 某些快捷键只在特定上下文中工作
   - 确保您在正确的编辑器或视图中

3. **平台差异**：
   - 某些快捷键在不同平台上可能不同
   - 检查平台特定的快捷键设置

### Q: 如何恢复默认快捷键？

**A:** 恢复方法：

1. **重置所有快捷键**：
   - 删除 `keybindings.json` 文件
   - 重新安装扩展

2. **重置特定快捷键**：
   - 在键盘快捷键设置中找到该快捷键
   - 点击重置按钮

### Q: CamelHumps 模式不工作？

**A:** 检查以下设置：

1. 确保在设置中启用了 `intellij-idea-keybindings.useCamelHumpsWords`
2. 重启 VS Code
3. 检查是否有其他扩展干扰

### Q: 导入的快捷键配置有问题？

**A:** 常见问题和解决方案：

1. **XML 格式错误**：
   - 确保 XML 文件格式正确
   - 检查是否包含有效的快捷键配置

2. *用户指南版本: 1.7.5*：
   - 确保 XML 文件来自支持的 IntelliJ 版本
   - 尝试使用较新版本的 IntelliJ 导出

3. **部分快捷键不支持**：
   - 某些 IntelliJ 特定功能在 VS Code 中不可用
   - 这些快捷键会被自动跳过

### Q: 如何报告问题或建议？

**A:** 反馈渠道：

1. **GitHub Issues**：
   - 访问项目 GitHub 页面
   - 创建新的 Issue
   - 提供详细的问题描述和重现步骤

2. **功能建议**：
   - 在 GitHub 上提出功能建议
   - 说明使用场景和预期效果

## 性能优化建议

### 减少快捷键冲突

1. **禁用不需要的扩展**：
   - 检查已安装的扩展
   - 禁用不常用的扩展

2. **优化快捷键设置**：
   - 避免使用过于复杂的快捷键组合
   - 保持快捷键设置简洁

### 提高响应速度

1. **定期清理缓存**：
   - 重启 VS Code
   - 清理扩展缓存

2. **监控性能**：
   - 使用 VS Code 的性能工具
   - 识别性能瓶颈

## 更新和维护

### 检查更新

1. **自动更新**：
   - VS Code 会自动检查扩展更新
   - 在扩展面板中查看更新状态

2. **手动更新**：
   - 在扩展面板中点击更新按钮
   - 或重新安装扩展

### 备份设置

建议定期备份您的快捷键设置：

1. **导出设置**：
   - 复制 `keybindings.json` 文件
   - 保存到安全位置

2. **同步设置**：
   - 使用 VS Code 的设置同步功能
   - 在多台设备间保持设置一致

---

*用户指南版本: 1.7.5*

*最后更新: 2025-08-02*