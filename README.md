# vscode扩展
  selint
  prettier
  volar
  stylelint
# vscode配置
  {
    "[vue]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[html]": {
      "editor.defaultFormatter": "vscode.html-language-features"
    },
    "[css]": {
      "editor.defaultFormatter": "michelemelluso.code-beautifier"
    },
    "[less]": {
      "editor.defaultFormatter": "michelemelluso.code-beautifier"
    },
    "[javascript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[jsonc]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[json]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "explorer.confirmDragAndDrop": false, //控制资源管理器是否应在通过拖放移动文件或文件夹时要求确认。
    "editor.tabSize": 2, //1tab=2空格
    "editor.maxTokenizationLineLength": 50000, //一行超过多少文字时停止解析
    "editor.mouseWheelZoom": true, //按住CTRL滚动 缩放文字大小
    "settingsSync.ignoredExtensions": ["vscjava.vscode-java-pack"],
    "diffEditor.diffAlgorithm": "experimental",
    "workbench.editorAssociations": {
      "*.dll": "default"
    },
    "editor.unicodeHighlight.invisibleCharacters": false,
    "cssrem.rootFontSize": 14,
    "editor.accessibilitySupport": "on",
    "git.confirmSync": false,
    "workbench.editor.splitInGroupLayout": "vertical",
    "remote.SSH.showLoginTerminal": true,
    "remote.SSH.remotePlatform": {
      "192.168.1.10": "linux",
      "10.15.15.168": "linux"
    },
    "docker.contexts.label": "DockerEndpoint",
    "docker.contexts.description": [],
    "settingsSync.ignoredSettings": ["-docker.dockerPath"],
    "docker.enableDockerComposeLanguageService": false,
    "docker.commands.attach": "${config:docker.dockerPath} exec -it ${containerId} ${shellCommand}",
    "cssrem.wxss": true,
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true,
      "source.fixAll.stylelint": true,
      "eslint.autoFixOnSave": true
    },
    "eslint.format.enable": true,
    "eslint.validate": ["javascript", "javascriptreact", "vue", "typescript"],
    "editor.minimap.side": "left",
    "volar.codeLens.scriptSetupTools": true,
    "volar.codeLens.pugTools": true,
    "volar.preview.transparentGrid": true,
    "volar.autoCompleteRefs": true,
    "html.format.wrapAttributes": "aligned-multiple",
    "editor.minimap.showSlider": "always",
    "window.commandCenter": true,
    "files.autoSave": "afterDelay", //控制具有未保存更改的编辑器的 自动保存。
    "files.autoSaveDelay": 2000, //控制自动保存具有未保存更改的编辑器之前的延迟(以毫秒为单位)。只有当 #files.autoSave# 设置为 afterDelay 时才适用。
    "volar.doctor.checkVueTsc": true,
    "git.pullBeforeCheckout": true,
    "js/ts.implicitProjectConfig.strictNullChecks": false,
    "eslint.codeActionsOnSave.rules": null,
    "stylelint.validate": ["css", "less", "scss", "vue"]
  }

# win强制删除非空目录
  rd/s/q <dir>

# 成功运行的node版本
  16.18.0
# 启动项目报错
  错误 "?." | "." 相关错误 请注意node版本