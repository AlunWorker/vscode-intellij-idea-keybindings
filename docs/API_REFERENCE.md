# API 参考文档

## 概述

本文档详细描述了 IntelliJ IDEA Keybindings for VS Code 扩展的所有API接口、类和方法。

## 核心模块

### Extension Module

#### `activate(context: vscode.ExtensionContext)`

扩展的激活函数，在扩展启动时调用。

**参数:**
- `context: vscode.ExtensionContext` - VS Code扩展上下文

**返回值:** `void`

**示例:**
```typescript
export function activate(context: vscode.ExtensionContext) {
    // 注册命令
    context.subscriptions.push(
        vscode.commands.registerCommand('intellij.importKeyMapsSchema', importKeyMapsSchema)
    );
}
```

#### `deactivate()`

扩展的停用函数，在扩展关闭时调用。

**返回值:** `void`

### Importer Module

#### Parser 子模块

##### `parseKeymapXml(xmlContent: string): KeymapData`

解析IntelliJ XML配置文件。

**参数:**
- `xmlContent: string` - XML文件内容

**返回值:** `KeymapData` - 解析后的快捷键数据

**类型定义:**
```typescript
interface KeymapData {
    actions: Action[];
    keymaps: Keymap[];
    version: string;
}

interface Action {
    id: string;
    name: string;
    description?: string;
}

interface Keymap {
    action: string;
    key: string;
    modifiers?: string[];
    when?: string;
}
```

#### Generator 子模块

##### `generateVSCodeKeybindings(keymapData: KeymapData): VSCodeKeybinding[]`

将IntelliJ快捷键数据转换为VS Code格式。

**参数:**
- `keymapData: KeymapData` - IntelliJ快捷键数据

**返回值:** `VSCodeKeybinding[]` - VS Code格式的快捷键数组

**类型定义:**
```typescript
interface VSCodeKeybinding {
    key: string;
    command: string;
    when?: string;
    mac?: string;
    linux?: string;
    win?: string;
}
```

#### Writer 子模块

##### `writeKeybindings(keybindings: VSCodeKeybinding[]): Promise<void>`

将快捷键配置写入用户设置。

**参数:**
- `keybindings: VSCodeKeybinding[]` - VS Code快捷键配置

**返回值:** `Promise<void>`

**示例:**
```typescript
await writeKeybindings([
    {
        key: "ctrl+space",
        command: "editor.action.triggerSuggest",
        when: "editorHasCompletionItemProvider && textInputFocus && !editorReadonly"
    }
]);
```

### Model 子模块

#### 数据模型定义

```typescript
// 基础快捷键模型
interface BaseKeybinding {
    key: string;
    command: string;
    when?: string;
}

// 平台特定快捷键
interface PlatformKeybinding extends BaseKeybinding {
    mac?: string;
    linux?: string;
    win?: string;
}

// 快捷键分类
enum KeybindingCategory {
    EDITING = "editing",
    NAVIGATION = "navigation",
    REFACTORING = "refactoring",
    DEBUGGING = "debugging",
    SEARCH = "search",
    GENERAL = "general"
}

// 快捷键信息
interface KeybindingInfo {
    category: KeybindingCategory;
    description: string;
    supported: boolean;
    platforms: string[];
}
```

## 命令API

### 注册的命令

#### `intellij.importKeyMapsSchema`

导入IntelliJ XML快捷键配置文件。

**参数:** 无

**返回值:** `Promise<void>`

**使用示例:**
```typescript
// 通过命令面板调用
vscode.commands.executeCommand('intellij.importKeyMapsSchema');
```

#### `intellij.openInOppositeGroup`

在相对编辑器组中打开文件。

**参数:** 无

**返回值:** `Promise<void>`

**快捷键:** 无（通过上下文菜单调用）

### 命令注册

```typescript
// 注册导入命令
context.subscriptions.push(
    vscode.commands.registerCommand('intellij.importKeyMapsSchema', async () => {
        try {
            await importKeyMapsSchema();
            vscode.window.showInformationMessage('快捷键导入成功！');
        } catch (error) {
            vscode.window.showErrorMessage(`导入失败: ${error.message}`);
        }
    })
);
```

## 配置API

### 用户设置

#### `intellij-idea-keybindings.useCamelHumpsWords`

控制是否启用驼峰命名法单词导航。

**类型:** `boolean`

**默认值:** `false`

**配置示例:**
```json
{
    "intellij-idea-keybindings.useCamelHumpsWords": true
}
```

### 配置贡献

```json
{
    "contributes": {
        "configuration": {
            "type": "object",
            "title": "IntelliJ IDEA Keybindings",
            "properties": {
                "intellij-idea-keybindings.useCamelHumpsWords": {
                    "type": "boolean",
                    "default": false,
                    "description": "Use \"CamelHumps\" words"
                }
            }
        }
    }
}
```

## 工具API

### 文档生成器

#### `generateKeybindingsMarkdown(): string`

生成快捷键文档的Markdown格式。

**返回值:** `string` - Markdown格式的文档

**使用示例:**
```javascript
const markdown = generateKeybindingsMarkdown();
console.log(markdown);
```

### 快捷键验证器

#### `validateKeybinding(keybinding: VSCodeKeybinding): ValidationResult`

验证快捷键配置的有效性。

**参数:**
- `keybinding: VSCodeKeybinding` - 要验证的快捷键配置

**返回值:** `ValidationResult`

**类型定义:**
```typescript
interface ValidationResult {
    isValid: boolean;
    errors: string[];
    warnings: string[];
}
```

## 事件API

### 扩展事件

#### `onDidChangeConfiguration`

当用户设置发生变化时触发。

**事件类型:** `vscode.ConfigurationChangeEvent`

**示例:**
```typescript
vscode.workspace.onDidChangeConfiguration((event) => {
    if (event.affectsConfiguration('intellij-idea-keybindings.useCamelHumpsWords')) {
        // 重新加载CamelHumps配置
        reloadCamelHumpsConfiguration();
    }
});
```

## 错误处理

### 错误类型

```typescript
// 自定义错误类
class IntelliJKeybindingError extends Error {
    constructor(message: string, public code: string) {
        super(message);
        this.name = 'IntelliJKeybindingError';
    }
}

// 错误代码枚举
enum ErrorCode {
    INVALID_XML = 'INVALID_XML',
    UNSUPPORTED_VERSION = 'UNSUPPORTED_VERSION',
    KEYBINDING_CONFLICT = 'KEYBINDING_CONFLICT',
    WRITE_FAILED = 'WRITE_FAILED'
}
```

### 错误处理示例

```typescript
try {
    await importKeyMapsSchema();
} catch (error) {
    if (error instanceof IntelliJKeybindingError) {
        switch (error.code) {
            case ErrorCode.INVALID_XML:
                vscode.window.showErrorMessage('XML文件格式无效');
                break;
            case ErrorCode.KEYBINDING_CONFLICT:
                vscode.window.showWarningMessage('检测到快捷键冲突');
                break;
            default:
                vscode.window.showErrorMessage(`导入失败: ${error.message}`);
        }
    }
}
```

## 类型定义

### 完整类型定义

```typescript
// 快捷键平台
type Platform = 'windows' | 'mac' | 'linux';

// 修饰键
type Modifier = 'ctrl' | 'alt' | 'shift' | 'cmd' | 'meta';

// 快捷键组合
interface KeyCombination {
    key: string;
    modifiers: Modifier[];
    platform?: Platform;
}

// 快捷键映射
interface KeybindingMapping {
    intellij: string;
    vscode: string;
    platforms: Platform[];
    category: KeybindingCategory;
}

// 导入结果
interface ImportResult {
    success: boolean;
    importedCount: number;
    conflicts: KeybindingConflict[];
    errors: string[];
}

// 快捷键冲突
interface KeybindingConflict {
    key: string;
    existingCommand: string;
    newCommand: string;
    resolution?: 'skip' | 'replace' | 'rename';
}
```

## 实用工具函数

### 平台检测

```typescript
/**
 * 检测当前操作系统平台
 */
function getCurrentPlatform(): Platform {
    return process.platform === 'win32' ? 'windows' :
           process.platform === 'darwin' ? 'mac' : 'linux';
}

/**
 * 检查快捷键是否适用于当前平台
 */
function isKeybindingForPlatform(keybinding: VSCodeKeybinding): boolean {
    const platform = getCurrentPlatform();
    return !keybinding[platform] || keybinding[platform] === keybinding.key;
}
```

### 快捷键格式化

```typescript
/**
 * 格式化快捷键显示
 */
function formatKeybinding(keybinding: VSCodeKeybinding): string {
    const platform = getCurrentPlatform();
    const key = keybinding[platform] || keybinding.key;
    return key.replace(/\+/g, ' + ');
}

/**
 * 解析快捷键字符串
 */
function parseKeybinding(keyString: string): KeyCombination {
    const parts = keyString.split('+');
    const key = parts.pop()!;
    const modifiers = parts as Modifier[];
    return { key, modifiers };
}
```

## 测试API

### 测试工具函数

```typescript
/**
 * 创建测试用的快捷键配置
 */
function createTestKeybinding(
    key: string,
    command: string,
    when?: string
): VSCodeKeybinding {
    return { key, command, when };
}

/**
 * 验证快捷键配置
 */
function validateKeybindingConfig(
    keybindings: VSCodeKeybinding[]
): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    for (const kb of keybindings) {
        if (!kb.key || !kb.command) {
            errors.push(`Invalid keybinding: ${JSON.stringify(kb)}`);
        }
    }
    
    return {
        isValid: errors.length === 0,
        errors,
        warnings
    };
}
```

## 性能优化

### 缓存机制

```typescript
// 快捷键缓存
class KeybindingCache {
    private cache = new Map<string, VSCodeKeybinding>();
    
    set(key: string, keybinding: VSCodeKeybinding): void {
        this.cache.set(key, keybinding);
    }
    
    get(key: string): VSCodeKeybinding | undefined {
        return this.cache.get(key);
    }
    
    clear(): void {
        this.cache.clear();
    }
}
```

### 延迟加载

```typescript
/**
 * 延迟加载快捷键配置
 */
async function loadKeybindingsLazy(): Promise<VSCodeKeybinding[]> {
    // 只在需要时加载配置
    if (!keybindingCache) {
        keybindingCache = await loadKeybindingsFromFile();
    }
    return keybindingCache;
}
```

---

*API参考文档版本: 1.7.5*