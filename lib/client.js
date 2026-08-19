window.__ModuleLoader__.load({
  id: "dsh-plugin-file-explorer",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });

    var React = require("react");
    var useState = React.useState,
      useEffect = React.useEffect,
      useLayoutEffect = React.useLayoutEffect,
      useMemo = React.useMemo,
      useCallback = React.useCallback,
      useRef = React.useRef,
      useDeferredValue = React.useDeferredValue,
      useSyncExternalStore = React.useSyncExternalStore;
    var jsxRuntime = require("react/jsx-runtime");
    var jsx = jsxRuntime.jsx,
      jsxs = jsxRuntime.jsxs,
      Fragment = jsxRuntime.Fragment;

    // ---- styles ---------------------------------------------------------
    (function () {
      var tagId = "dsh-plugin-file-explorer";
      if (document.querySelector('style[data-plugin-css="' + tagId + '"]') !== null) return;
      var css = [
        // right activity bar
        ".fe-activity{position:fixed;top:0;right:0;bottom:0;z-index:1000;width:44px;display:flex;flex-direction:column;align-items:center;padding:6px 0;gap:2px;background:var(--dsw-specific-sidebar-fill,#17181c);border-left:1px solid var(--dsw-alias-border-l1,rgba(255,255,255,.1));pointer-events:auto;color:var(--dsw-alias-label-tertiary,#8b93a5)}",
        ".fe-activity-btn{width:36px;height:36px;display:flex;align-items:center;justify-content:center;border:none;background:transparent;color:var(--dsw-alias-label-tertiary,#8b93a5);border-radius:8px;cursor:pointer;position:relative}",
        ".fe-activity-btn:hover{color:var(--dsw-alias-label-primary,#e6e8ee)}",
        ".fe-activity-btn.fe-active{color:var(--dsw-alias-label-primary,#e6e8ee)}",
        ".fe-activity-btn.fe-active::before{content:\"\";position:absolute;left:-7px;top:8px;bottom:8px;width:2px;border-radius:2px;background:var(--dsw-alias-state-business-primary,#4aa3ff)}",
        // right sidebar panel
        ".fe-sidebar{position:fixed;top:0;right:44px;bottom:0;z-index:999;width:var(--fe-sidebar-width,280px);display:flex;flex-direction:column;background:var(--dsw-specific-sidebar-fill,#17181c);border-left:1px solid var(--dsw-alias-border-l1,rgba(255,255,255,.1));pointer-events:auto;color:var(--dsw-alias-label-primary,#e6e8ee);transform:translateX(0);transition:transform .22s cubic-bezier(.2,.8,.3,1),visibility 0s linear 0s}",
        ".fe-sidebar-closed{transform:translateX(100%);visibility:hidden;pointer-events:none;transition:transform .22s cubic-bezier(.2,.8,.3,1),visibility 0s linear .22s}",
        ".fe-sidebar-resize{position:absolute;left:-4px;top:0;bottom:0;width:8px;cursor:col-resize;z-index:11;touch-action:none}",
        ".fe-sidebar-resize::after{content:\"\";position:absolute;left:3px;top:0;bottom:0;width:2px;background:transparent;transition:background .12s}",
        ".fe-sidebar-resize:hover::after{background:var(--dsw-alias-border-l2,rgba(255,255,255,.14))}",
        ".fe-sidebar-header{height:40px;flex:none;display:flex;align-items:center;padding:0 12px;font-size:12px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:var(--dsw-alias-label-secondary,#c7c9d1);border-bottom:1px solid var(--dsw-alias-separator-primary,rgba(255,255,255,.07))}",
        // tree
        ".fe-tree{flex:1;min-height:0;overflow:auto;padding:6px 0}",
        ".fe-tree::-webkit-scrollbar{width:10px}.fe-tree::-webkit-scrollbar-thumb{background:var(--dsw-alias-scrollbar-bg-l2,rgba(255,255,255,.08));border-radius:8px}",
        ".fe-node-row{display:flex;align-items:center;gap:6px;height:24px;padding-right:8px;margin:0 4px;cursor:pointer;user-select:none;font-size:12.5px;color:var(--dsw-alias-label-secondary,#c7c9d1);white-space:nowrap;border-radius:6px}",
        ".fe-node-row:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.06));color:var(--dsw-alias-label-primary,#e6e8ee)}",
        ".fe-node-row.fe-drop-target{background:color-mix(in srgb, var(--dsw-alias-state-business-primary,#4aa3ff) 22%, transparent)}",
        ".fe-node-row.fe-drop-target .fe-name{color:var(--dsw-alias-state-business-primary,#4aa3ff)}",
        ".fe-file.fe-open{color:var(--dsw-alias-state-business-primary,#4aa3ff)}",
        ".fe-node-row.fe-selected{background:color-mix(in srgb, var(--dsw-alias-state-business-primary,#4aa3ff) 14%, transparent);color:var(--dsw-alias-label-primary,#e6e8ee)}",
        ".fe-node-row.fe-selected.fe-drop-target{background:color-mix(in srgb, var(--dsw-alias-state-business-primary,#4aa3ff) 26%, transparent)}",
        ".fe-node-row.fe-selected .fe-name{color:var(--dsw-alias-label-primary,#e6e8ee)}",
        ".fe-caret{width:12px;height:12px;flex:none;color:var(--dsw-alias-label-tertiary,#8b93a5);transition:transform .12s}",
        ".fe-node-row:hover .fe-caret{color:var(--dsw-alias-label-primary,#e6e8ee)}",
        ".fe-caret-open{transform:rotate(90deg)}",
        ".fe-caret-spacer{visibility:hidden}",
        ".fe-icon{flex:none}",
        ".fe-folder-icon{color:var(--dsw-alias-state-business-primary,#4aa3ff)}",
        ".fe-name{overflow:hidden;text-overflow:ellipsis}",
        ".fe-loading{height:22px;line-height:22px;font-size:12px;color:var(--dsw-alias-label-tertiary,#8b93a5)}",
        ".fe-empty{padding:20px;font-size:12.5px;color:var(--dsw-alias-label-tertiary,#8b93a5)}",
        // file view (editor area)
        // standalone editor overlay shown in a blank (message-less) session,
        // where the conversation view ring isn't mounted; mirrors the center
        // column's padding-right so it sits beside the rail/sidebar.
        ".fe-standalone{position:fixed;top:0;left:0;bottom:0;right:44px;z-index:900;display:flex;flex-direction:column;overflow:hidden;background:var(--dsw-alias-bg-base,#141519)}",
        "body[data-fe-sidebar=\"open\"] .fe-standalone{right:calc(44px + var(--fe-sidebar-width,280px))}",
        ".fe-editor{width:100%;min-height:0;flex:1 1 0%;display:flex;flex-direction:column;overflow:hidden;background:var(--dsw-alias-bg-base,#141519);color:var(--dsw-alias-label-primary,#e6e8ee)}",
        ".fe-file-bar{flex:none;display:flex;align-items:center;gap:8px;height:36px;padding:0 8px 0 12px;background:var(--dsw-alias-bg-module-platform,#17181c);border-bottom:1px solid var(--dsw-alias-separator-primary,rgba(255,255,255,.07))}",
        ".fe-file-bar-name{font-size:12.5px;color:var(--dsw-alias-label-primary,#e6e8ee);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
        ".fe-file-bar-dirty{flex:none;font-size:9px;color:var(--dsw-alias-state-warn-primary,#e5c07b)}",
        ".fe-file-bar-spacer{flex:1}",
        ".fe-file-bar-close{flex:none;width:22px;height:22px;display:flex;align-items:center;justify-content:center;border:none;background:transparent;color:var(--dsw-alias-label-tertiary,#8b93a5);border-radius:4px;cursor:pointer;font-size:16px;line-height:1}",
        ".fe-file-bar-close:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.1));color:var(--dsw-alias-label-primary,#e6e8ee)}",
        // code editor overlay
        ".fe-editor-wrap{position:relative;flex:1;min-height:0;overflow:hidden}",
        ".fe-editor-pre,.fe-editor-ta{margin:0;position:absolute;inset:0;padding:14px 16px;font-family:var(--fe-editor-font,ui-monospace,SFMono-Regular,Menlo,Consolas,monospace);font-size:12.5px;line-height:1.6;white-space:pre;tab-size:2;overflow-wrap:normal}",
        ".fe-editor-pre{overflow:hidden;pointer-events:none;background:var(--dsw-alias-markdown-code-block,#15161a)}",
        ".fe-editor-code{font:inherit}",
        ".fe-editor-ta{overflow:auto;background:transparent;color:transparent;caret-color:var(--dsw-alias-label-primary,#e6e8ee);border:none;outline:none;resize:none;white-space:pre}",
        ".fe-editor-ta::-webkit-scrollbar{width:12px;height:12px}.fe-editor-ta::-webkit-scrollbar-thumb{background:var(--dsw-alias-scrollbar-bg-l2,rgba(255,255,255,.08));border-radius:8px}",
        ".fe-statusbar{flex:none;display:flex;align-items:center;gap:14px;height:24px;padding:0 12px;font-size:11px;color:var(--dsw-alias-label-tertiary,#8b93a5);background:var(--dsw-alias-bg-base,#141519);border-top:1px solid var(--dsw-alias-separator-primary,rgba(255,255,255,.07))}",
        ".fe-statusbar .fe-spacer{flex:1}",
        ".fe-statusbar .fe-dirty{color:var(--dsw-alias-state-warn-primary,#e5c07b)}",
        ".fe-editor-empty{flex:1;display:flex;align-items:center;justify-content:center;padding:24px;font-size:12.5px;color:var(--dsw-alias-label-tertiary,#8b93a5)}",
        ".fe-error{color:var(--dsw-alias-state-error-primary,#f4717d)}",
        ".fe-editor-img{max-width:100%;max-height:100%;object-fit:contain;padding:16px}",
        // token colors
        ".tok-cmt{color:#6a737d;font-style:italic}",
        ".tok-str{color:#98c379}",
        ".tok-num{color:#d19a66}",
        ".tok-kw{color:#c678dd}",
        ".tok-fn{color:#61afef}",
        ".tok-op{color:#abb2bf}",
        ".tok-tag{color:#e06c75}",
        ".tok-attr{color:#e5c07b}",
        ".tok-prop{color:#61afef}",
        ".tok-mh{color:#61afef;font-weight:700}",
        ".tok-mb{color:#e5c07b}",
        ".tok-mcode{color:#98c379}",
        ".tok-mlink{color:#61afef}",
        // markdown viewer / editor
        ".fe-md{flex:1;min-height:0;display:flex;flex-direction:column;overflow:hidden}",
        ".fe-md-toolbar{flex:none;display:flex;align-items:center;gap:4px;height:36px;padding:0 8px;background:var(--dsw-alias-bg-module-platform,#17181c);border-bottom:1px solid var(--dsw-alias-separator-primary,rgba(255,255,255,.07))}",
        ".fe-md-toolbar-btn{height:26px;padding:0 10px;border:none;border-radius:6px;background:transparent;color:var(--dsw-alias-label-tertiary,#8b93a5);font-size:12px;cursor:pointer}",
        ".fe-md-toolbar-btn:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.08));color:var(--dsw-alias-label-primary,#e6e8ee)}",
        ".fe-md-toolbar-btn-active{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.08));color:var(--dsw-alias-state-business-primary,#4aa3ff)}",
        ".fe-md-scroll{flex:1;min-height:0;overflow:auto}",
        ".fe-md-scroll::-webkit-scrollbar{width:12px}.fe-md-scroll::-webkit-scrollbar-thumb{background:var(--dsw-alias-scrollbar-bg-l2,rgba(255,255,255,.08));border-radius:8px}",
        ".fe-md-body{max-width:820px;margin:0 auto;padding:28px 36px 60px;color:var(--dsw-alias-label-primary,#e6e8ee);font-size:14px;line-height:1.75}",
        ".fe-md-body .fe-md-h{font-weight:600;line-height:1.3;margin:1.5em 0 .6em;color:var(--dsw-alias-label-primary,#e6e8ee)}",
        ".fe-md-body .fe-md-h1{font-size:1.9em;border-bottom:1px solid var(--dsw-alias-separator-primary,rgba(255,255,255,.08));padding-bottom:.3em}",
        ".fe-md-body .fe-md-h2{font-size:1.5em;border-bottom:1px solid var(--dsw-alias-separator-primary,rgba(255,255,255,.08));padding-bottom:.3em}",
        ".fe-md-body .fe-md-h3{font-size:1.25em}",
        ".fe-md-body .fe-md-h4{font-size:1.1em}",
        ".fe-md-body .fe-md-h5{font-size:1em}",
        ".fe-md-body .fe-md-h6{font-size:.95em;color:var(--dsw-alias-label-secondary,#c7c9d1)}",
        ".fe-md-body p{margin:.7em 0}",
        ".fe-md-strong{font-weight:600}",
        ".fe-md-em{font-style:italic}",
        ".fe-md-del{text-decoration:line-through;opacity:.7}",
        ".fe-md-code{font-family:var(--fe-editor-font,ui-monospace,SFMono-Regular,Menlo,Consolas,monospace);font-size:.88em;background:var(--dsw-alias-markdown-code-block,#15161a);border:1px solid var(--dsw-alias-border-l1,rgba(255,255,255,.06));border-radius:4px;padding:1px 5px;color:var(--dsw-alias-label-primary,#e6e8ee)}",
        ".fe-md-a{color:var(--dsw-alias-state-business-primary,#4aa3ff);text-decoration:none}",
        ".fe-md-a:hover{text-decoration:underline}",
        ".fe-md-img{max-width:100%;border-radius:8px}",
        ".fe-md-blockquote{margin:.7em 0;padding:2px 16px;border-left:3px solid var(--dsw-alias-state-business-primary,#4aa3ff);color:var(--dsw-alias-label-secondary,#c7c9d1);background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.03));border-radius:0 6px 6px 0}",
        ".fe-md-body ul,.fe-md-body ol{margin:.6em 0;padding-left:1.6em}",
        ".fe-md-body li{margin:.25em 0}",
        ".fe-md-task{list-style:none;margin-left:-1.2em}",
        ".fe-md-task input{margin-right:6px;accent-color:var(--dsw-alias-state-business-primary,#4aa3ff);pointer-events:none}",
        ".fe-md-pre-wrap{position:relative;margin:.8em 0}",
        ".fe-md-pre-lang{position:absolute;top:8px;right:12px;font-family:var(--fe-editor-font,ui-monospace,SFMono-Regular,Menlo,Consolas,monospace);font-size:11px;color:var(--dsw-alias-label-tertiary,#8b93a5);user-select:none}",
        ".fe-md-pre{margin:0;padding:14px 16px;overflow:auto;background:var(--dsw-alias-markdown-code-block,#15161a);border:1px solid var(--dsw-alias-border-l1,rgba(255,255,255,.06));border-radius:8px;font-family:var(--fe-editor-font,ui-monospace,SFMono-Regular,Menlo,Consolas,monospace);font-size:12.5px;line-height:1.6}",
        ".fe-md-pre code{font:inherit}",
        ".fe-md-pre::-webkit-scrollbar{height:10px;width:10px}.fe-md-pre::-webkit-scrollbar-thumb{background:var(--dsw-alias-scrollbar-bg-l2,rgba(255,255,255,.08));border-radius:8px}",
        ".fe-md-table-wrap{overflow-x:auto;margin:.8em 0}",
        ".fe-md-table{border-collapse:collapse;width:100%;font-size:13px}",
        ".fe-md-table th,.fe-md-table td{border:1px solid var(--dsw-alias-border-l1,rgba(255,255,255,.1));padding:6px 12px;text-align:left}",
        ".fe-md-table th{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.05));font-weight:600}",
        ".fe-md-table tr:nth-child(2n) td{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.02))}",
        ".fe-md-hr{border:none;border-top:1px solid var(--dsw-alias-separator-primary,rgba(255,255,255,.1));margin:1.5em 0}",
        ".fe-md-split{flex:1;min-height:0;display:flex;align-items:stretch;overflow:hidden}",
        ".fe-md-split-pane{flex:1 1 0%;position:relative;min-width:0;display:flex;flex-direction:column;overflow:hidden}",
        ".fe-md-divider{flex:none;width:1px;background:var(--dsw-alias-separator-primary,rgba(255,255,255,.1));cursor:col-resize;position:relative}",
        ".fe-md-divider::after{content:\"\";position:absolute;left:-3px;top:0;bottom:0;width:7px}",
        // markdown floating outline (hover-to-expand)
        ".fe-md-read{position:relative;flex:1;min-height:0;display:flex}",
        ".fe-md-outline{position:fixed;right:52px;top:50%;transform:translateY(-50%);z-index:6;display:flex;flex-direction:column;align-items:flex-end;transition:right .22s cubic-bezier(.2,.8,.3,1)}",
        "body[data-fe-sidebar=\"open\"] .fe-md-outline{right:calc(44px + var(--fe-sidebar-width,280px) + 8px)}",
        "body[data-fe-resizing] .fe-md-outline{transition:none}",
        ".fe-md-outline-rail{display:flex;flex-direction:column;align-items:center;gap:4px;padding:8px 6px;border-radius:10px;max-height:46vh;overflow:hidden}",
        ".fe-md-outline-rail:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.06))}",
        ".fe-md-outline-dot{flex:none;width:10px;height:3px;border-radius:2px;background:var(--dsw-alias-label-tertiary,#8b93a5);transition:background .15s ease,width .15s ease}",
        ".fe-md-outline-dot-active{width:14px;background:var(--dsw-alias-state-business-primary,#4aa3ff)}",
        ".fe-md-outline-pop{display:none;position:absolute;right:100%;top:50%;transform:translateY(-50%);width:280px;max-height:min(60vh,420px);flex-direction:column;background:var(--dsw-alias-bg-module-platform,#17181c);border:1px solid var(--dsw-alias-border-l1,rgba(255,255,255,.1));border-radius:12px;box-shadow:0 16px 48px rgba(0,0,0,.45);overflow:hidden}",
        ".fe-md-outline:hover .fe-md-outline-pop{display:flex}",
        ".fe-md-outline-title{flex:none;padding:12px 14px 8px;font-size:12px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:var(--dsw-alias-label-secondary,#c7c9d1)}",
        ".fe-md-outline-list{flex:1 1 auto;min-height:0;overflow:auto;padding:0 8px 10px}",
        ".fe-md-outline-list::-webkit-scrollbar{width:8px}.fe-md-outline-list::-webkit-scrollbar-thumb{background:var(--dsw-alias-scrollbar-bg-l2,rgba(255,255,255,.08));border-radius:8px}",
        ".fe-md-outline-item{display:block;width:100%;text-align:left;border:none;background:transparent;color:var(--dsw-alias-label-secondary,#c7c9d1);font-size:12.5px;line-height:1.4;padding:5px 10px;border-radius:6px;cursor:pointer;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
        ".fe-md-outline-item:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.08));color:var(--dsw-alias-label-primary,#e6e8ee)}",
        ".fe-md-outline-item-active{background:var(--dsw-alias-state-business-primary,#4aa3ff);color:var(--dsw-alias-label-primary-inverted,#fff)}",
        ".fe-md-outline-item-active:hover{background:var(--dsw-alias-state-business-primary,#4aa3ff);color:var(--dsw-alias-label-primary-inverted,#fff)}",
        // quick open palette
        ".fe-qo-overlay{position:fixed;inset:0;z-index:1200;display:flex;align-items:flex-start;justify-content:center;padding-top:12vh;background:rgba(0,0,0,.35)}",
        ".fe-qo{width:min(640px,calc(100vw - 48px));max-height:60vh;display:flex;flex-direction:column;background:var(--dsw-alias-bg-module-platform,#17181c);border:1px solid var(--dsw-alias-border-l1,rgba(255,255,255,.1));border-radius:12px;box-shadow:0 24px 64px rgba(0,0,0,.5);overflow:hidden}",
        ".fe-qo-input{flex:none;border:none;outline:none;background:transparent;color:var(--dsw-alias-label-primary,#e6e8ee);font-size:14px;padding:14px 16px;border-bottom:1px solid var(--dsw-alias-border-l1,rgba(255,255,255,.08))}",
        ".fe-qo-input::placeholder{color:var(--dsw-alias-label-tertiary,#8b93a5)}",
        ".fe-qo-list{flex:1;min-height:0;overflow:auto;padding:6px}",
        ".fe-qo-list::-webkit-scrollbar{width:10px}.fe-qo-list::-webkit-scrollbar-thumb{background:var(--dsw-alias-scrollbar-bg-l2,rgba(255,255,255,.08));border-radius:8px}",
        ".fe-qo-item{display:flex;align-items:center;gap:10px;width:100%;text-align:left;border:none;background:transparent;color:var(--dsw-alias-label-primary,#e6e8ee);font-size:13px;padding:8px 10px;border-radius:8px;cursor:pointer;overflow:hidden}",
        ".fe-qo-item .fe-icon{flex:none}",
        ".fe-qo-name{flex:none;max-width:50%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
        ".fe-qo-rel{flex:1;color:var(--dsw-alias-label-tertiary,#8b93a5);font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;direction:rtl;text-align:left}",
        ".fe-qo-item-sel,.fe-qo-item:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.08))}",
        ".fe-qo-empty{padding:18px 16px;color:var(--dsw-alias-label-tertiary,#8b93a5);font-size:13px}",
        // center column adapts to the right rail / sidebar (AppFrame uses grid tracks)
        "body[data-fe-sidebar=\"rail\"] .pI_x6G_centerCol{padding-right:44px}",
        "body[data-fe-sidebar=\"open\"] .pI_x6G_centerCol{padding-right:calc(44px + var(--fe-sidebar-width,280px))}",
        "body[data-fe-sidebar]:not([data-fe-resizing]) .pI_x6G_centerCol{transition:padding-right .22s cubic-bezier(.2,.8,.3,1)}",
        // hover close button injected into the header file tabs
        ".wSkVaW_tab:has(.fe-tab-close-inject){padding-right:16px}",
        ".fe-tab-close-inject{position:absolute;top:0;right:0;width:16px;height:16px;display:flex;align-items:center;justify-content:center;font-size:14px;line-height:1;color:var(--dsw-alias-label-tertiary,#8b93a5);border-radius:4px;opacity:0;pointer-events:none;transition:opacity .1s;user-select:none}",
        ".wSkVaW_tab:hover .fe-tab-close-inject{opacity:1;pointer-events:auto}",
        ".fe-tab-close-inject:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.1));color:var(--dsw-alias-label-primary,#e6e8ee)}",
        // scrollable tab strip (many files open)
        ".wSkVaW_tabs{overflow-x:auto;overflow-y:hidden;flex-wrap:nowrap;scrollbar-width:thin;scrollbar-color:var(--dsw-alias-scrollbar-bg-l2,rgba(255,255,255,.08)) transparent;padding-bottom:6px}",
        ".wSkVaW_tabs::-webkit-scrollbar{height:4px}",
        ".wSkVaW_tabs::-webkit-scrollbar-thumb{background:var(--dsw-alias-scrollbar-bg-l2,rgba(255,255,255,.08));border-radius:4px}",
        ".wSkVaW_tabs::-webkit-scrollbar-track{background:transparent}",
        ".wSkVaW_tab{flex:0 0 auto;white-space:nowrap}",
        // pin indicator on header tabs
        ".fe-tab-pin-inject{display:inline-block;margin-right:4px;font-size:8px;line-height:1;color:var(--dsw-alias-label-tertiary,#8b93a5)}",
        ".fe-tab-dirty-inject{position:absolute;top:0;right:0;width:16px;height:16px;display:flex;align-items:center;justify-content:center;font-size:9px;line-height:1;color:var(--dsw-alias-state-warn-primary,#e5c07b);pointer-events:none;transition:opacity .1s;user-select:none}",
        // on hover the × slides in over the dot (VS Code behavior)
        ".wSkVaW_tab:hover .fe-tab-dirty-inject{opacity:0}",
        // right-click context menu
        ".fe-context-menu{position:fixed;z-index:10000;min-width:168px;padding:4px;background:var(--dsw-alias-bg-module-platform,#1c1d22);border:1px solid var(--dsw-alias-border-l1,rgba(255,255,255,.1));border-radius:10px;box-shadow:0 8px 28px rgba(0,0,0,.4);display:flex;flex-direction:column;gap:2px}",
        ".fe-menu-item{display:block;width:100%;text-align:left;border:none;background:transparent;color:var(--dsw-alias-label-primary,#e6e8ee);font-size:12.5px;line-height:1;padding:7px 10px;border-radius:6px;cursor:pointer}",
        ".fe-menu-item:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.08))}",
        ".fe-menu-item:disabled,.fe-menu-item-disabled{color:var(--dsw-alias-label-tertiary,#8b93a5);cursor:default;background:transparent}",
        ".fe-menu-item-danger{color:var(--dsw-alias-state-error-primary,#f4717d)}",
        ".fe-menu-item-danger:hover{background:color-mix(in srgb, var(--dsw-alias-state-error-primary,#f4717d) 18%, transparent)}",
        ".fe-menu-sep{height:1px;margin:3px 6px;background:var(--dsw-alias-separator-primary,rgba(255,255,255,.07))}",
        // confirm dialog
        ".fe-confirm-overlay{position:fixed;inset:0;z-index:11000;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center}",
        ".fe-confirm{width:min(400px,calc(100vw - 48px));padding:20px;background:var(--dsw-alias-bg-module-platform,#1c1d22);border:1px solid var(--dsw-alias-border-l1,rgba(255,255,255,.1));border-radius:14px;box-shadow:0 16px 48px rgba(0,0,0,.5)}",
        ".fe-confirm-title{font-size:14px;font-weight:600;color:var(--dsw-alias-label-primary,#e6e8ee);margin-bottom:8px}",
        ".fe-confirm-msg{font-size:13px;line-height:1.5;color:var(--dsw-alias-label-secondary,#c7c9d1);margin-bottom:20px;word-break:break-all}",
        ".fe-confirm-actions{display:flex;justify-content:flex-end;gap:8px}",
        ".fe-confirm-btn{height:34px;padding:0 16px;border:none;border-radius:17px;font-size:13px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;transition:background-color .12s ease,color .12s ease;color:var(--dsw-alias-label-primary,#e6e8ee);background:var(--dsw-alias-button-floating-fill,var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.08)))}",
        ".fe-confirm-btn:hover{background:var(--dsw-alias-button-floating-hover,rgba(255,255,255,.14))}",
        ".fe-confirm-primary{background:var(--dsw-alias-button-primary-fill,#4aa3ff);color:var(--dsw-alias-label-primary-inverted,#fff)}",
        ".fe-confirm-primary:hover{background:var(--dsw-alias-button-primary-hover,#3d8fe0)}",
        ".fe-confirm-danger{background:transparent;color:var(--dsw-alias-state-error-primary,#f4717d)}",
        ".fe-confirm-danger:hover{background:var(--dsw-alias-interactive-bg-hover-danger,rgba(242,90,90,.15));color:var(--dsw-alias-state-error-primary,#f4717d)}",
        ".fe-confirm-ghost{background:transparent;color:var(--dsw-alias-label-secondary,#c7c9d1)}",
        ".fe-confirm-ghost:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.08))}",
        // prompt (name input) dialog
        ".fe-prompt-overlay{position:fixed;inset:0;z-index:11001;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center}",
        ".fe-prompt{width:min(400px,calc(100vw - 48px));padding:20px;background:var(--dsw-alias-bg-module-platform,#1c1d22);border:1px solid var(--dsw-alias-border-l1,rgba(255,255,255,.1));border-radius:14px;box-shadow:0 16px 48px rgba(0,0,0,.5)}",
        ".fe-prompt-title{font-size:14px;font-weight:600;color:var(--dsw-alias-label-primary,#e6e8ee);margin-bottom:12px}",
        ".fe-prompt-input{width:100%;box-sizing:border-box;padding:8px 10px;font-size:13px;background:var(--dsw-alias-bg-base,#141519);border:1px solid var(--dsw-alias-border-l1,rgba(255,255,255,.1));border-radius:8px;color:var(--dsw-alias-label-primary,#e6e8ee);outline:none}",
        ".fe-prompt-input:focus{border-color:var(--dsw-alias-state-business-primary,#4aa3ff)}",
        ".fe-prompt-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:16px}",
        ".fe-prompt-btn{height:34px;padding:0 16px;border:none;border-radius:17px;font-size:13px;cursor:pointer;color:var(--dsw-alias-label-primary,#e6e8ee);background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.08))}",
        ".fe-prompt-btn:hover{background:var(--dsw-alias-button-floating-hover,rgba(255,255,255,.14))}",
        ".fe-prompt-btn-primary{background:var(--dsw-alias-button-primary-fill,#4aa3ff);color:var(--dsw-alias-label-primary-inverted,#fff)}",
        ".fe-prompt-btn-primary:hover{background:var(--dsw-alias-button-primary-hover,#3d8fe0)}",
        // sidebar header + settings
        ".fe-sidebar-title{font-size:12px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:var(--dsw-alias-label-secondary,#c7c9d1);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
        ".fe-sidebar-header-spacer{flex:1}",
        ".fe-settings-btn{flex:none;width:24px;height:24px;display:flex;align-items:center;justify-content:center;border:none;background:transparent;color:var(--dsw-alias-label-tertiary,#8b93a5);border-radius:6px;cursor:pointer}",
        ".fe-settings-btn:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.08));color:var(--dsw-alias-label-primary,#e6e8ee)}",
        ".fe-settings-btn-active{color:var(--dsw-alias-state-business-primary,#4aa3ff)}",
        ".fe-settings{flex:1;overflow:auto;padding:12px}",
        ".fe-settings-title{font-size:12px;color:var(--dsw-alias-label-secondary,#c7c9d1);margin-bottom:10px}",
        ".fe-settings-option{display:flex;align-items:center;gap:8px;padding:6px 4px;font-size:12.5px;color:var(--dsw-alias-label-primary,#e6e8ee);cursor:pointer}",
        ".fe-settings-option input{margin:0}",
        ".fe-settings-delay{display:flex;align-items:center;gap:8px;padding:8px 4px;font-size:12px;color:var(--dsw-alias-label-secondary,#c7c9d1)}",
        ".fe-settings-delay input{width:88px;background:var(--dsw-alias-bg-base,#141519);border:1px solid var(--dsw-alias-border-l1,rgba(255,255,255,.1));border-radius:6px;color:var(--dsw-alias-label-primary,#e6e8ee);padding:5px 8px;font-size:12px}",
        ".fe-settings-title-gap{margin-top:18px}",
        ".fe-settings-font{display:flex;flex-direction:column;gap:6px;padding:4px 0}",
        ".fe-settings-font input{width:100%;background:var(--dsw-alias-bg-base,#141519);border:1px solid var(--dsw-alias-border-l1,rgba(255,255,255,.1));border-radius:6px;color:var(--dsw-alias-label-primary,#e6e8ee);padding:6px 8px;font-size:12px}",
        // clean file view: drop title row + composer, keep the tab strip
        "body[data-fe-file-active] .wSkVaW_titleRow{display:none!important}",
        "body[data-fe-file-active] [data-composer-seat]{display:none!important}",
        "body[data-fe-file-active] .wSkVaW_header{padding:6px 20px 0}",
        // external file drop (Finder / Explorer → tree)
        ".fe-node-row.fe-ext-drop-target{outline:1px dashed var(--dsw-alias-state-business-primary,#4aa3ff);outline-offset:-1px;background:color-mix(in srgb, var(--dsw-alias-state-business-primary,#4aa3ff) 14%, transparent)}",
        ".fe-sidebar.fe-ext-drop{background:color-mix(in srgb, var(--dsw-alias-state-business-primary,#4aa3ff) 7%, transparent)}",
        // upload progress toast
        ".fe-upload-toast{position:fixed;right:calc(44px + var(--fe-sidebar-width,280px) + 16px);bottom:20px;z-index:12000;min-width:260px;max-width:min(420px,calc(100vw - 48px));padding:12px 14px;background:var(--dsw-alias-bg-module-platform,#1c1d22);border:1px solid var(--dsw-alias-border-l1,rgba(255,255,255,.1));border-radius:12px;box-shadow:0 16px 48px rgba(0,0,0,.45)}",
        "body[data-fe-sidebar=\"rail\"] .fe-upload-toast{right:60px}",
        ".fe-upload-title{font-size:12.5px;font-weight:600;color:var(--dsw-alias-label-primary,#e6e8ee);margin-bottom:6px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
        ".fe-upload-bar{height:4px;border-radius:2px;background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.08));overflow:hidden;margin-bottom:6px}",
        ".fe-upload-bar-fill{height:100%;border-radius:2px;background:var(--dsw-alias-state-business-primary,#4aa3ff);transition:width .15s ease}",
        ".fe-upload-status{font-size:11.5px;color:var(--dsw-alias-label-tertiary,#8b93a5);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
        ".fe-upload-status .fe-upload-fail{color:var(--dsw-alias-state-error-primary,#f4717d)}",
        // editor find bar (⌘F)
        ".fe-find{position:absolute;top:0;left:0;right:0;z-index:6;display:flex;flex-direction:column;gap:4px;padding:5px 8px;background:var(--dsw-alias-bg-module-platform,#1c1d22);border-bottom:1px solid var(--dsw-alias-border-l1,rgba(255,255,255,.08))}",
        ".fe-find-row{display:flex;align-items:center;gap:6px}",
        ".fe-editor-wrap-find .fe-editor-pre,.fe-editor-wrap-find .fe-editor-ta{top:35px}",
        ".fe-editor-wrap-replace .fe-editor-pre,.fe-editor-wrap-replace .fe-editor-ta{top:64px}",
        ".fe-find-input{flex:1;min-width:0;border:1px solid var(--dsw-alias-border-l2,rgba(255,255,255,.14));border-radius:6px;background:var(--dsw-alias-bg-base,#141519);color:var(--dsw-alias-label-primary,#e6e8ee);font:inherit;font-size:12px;padding:4px 8px;outline:none}",
        ".fe-find-input:focus{border-color:var(--dsw-alias-state-business-primary,#4aa3ff)}",
        ".fe-find-count{flex:none;font-size:11px;color:var(--dsw-alias-label-tertiary,#8b93a5);min-width:34px;text-align:right;font-variant-numeric:tabular-nums}",
        ".fe-find-btn{flex:none;width:22px;height:22px;display:inline-flex;align-items:center;justify-content:center;border:none;border-radius:5px;background:transparent;color:var(--dsw-alias-label-tertiary,#8b93a5);cursor:pointer;font-size:12px;padding:0}",
        ".fe-find-btn:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.08));color:var(--dsw-alias-label-primary,#e6e8ee)}",
        ".fe-find-mark{background:color-mix(in srgb,var(--dsw-alias-state-business-primary,#4aa3ff) 38%,transparent);color:inherit;border-radius:2px}",
        ".fe-find-mark-cur{background:color-mix(in srgb,var(--dsw-alias-state-business-primary,#4aa3ff) 58%,transparent);outline:1px solid color-mix(in srgb,var(--dsw-alias-state-business-primary,#4aa3ff) 80%,transparent)}",
        // global search view
        ".fe-gsearch{flex:1;min-height:0;display:flex;flex-direction:column;overflow:hidden}",
        ".fe-gsearch-input-row{flex:none;display:flex;align-items:center;gap:3px;padding:8px 10px;border-bottom:1px solid var(--dsw-alias-separator-primary,rgba(255,255,255,.07))}",
        ".fe-gsearch-input{flex:1;min-width:0;border:1px solid var(--dsw-alias-border-l2,rgba(255,255,255,.14));border-radius:7px;background:var(--dsw-alias-bg-base,#141519);color:var(--dsw-alias-label-primary,#e6e8ee);font:inherit;font-size:12.5px;padding:5px 8px;outline:none}",
        ".fe-gsearch-input:focus{border-color:var(--dsw-alias-state-business-primary,#4aa3ff)}",
        ".fe-gsearch-opt{flex:none;min-width:24px;height:24px;padding:0 4px;display:inline-flex;align-items:center;justify-content:center;border:1px solid transparent;border-radius:5px;background:transparent;color:var(--dsw-alias-label-tertiary,#8b93a5);cursor:pointer;font-size:11px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace}",
        ".fe-gsearch-opt:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.08))}",
        ".fe-gsearch-opt-on{color:var(--dsw-alias-state-business-primary,#4aa3ff);border-color:color-mix(in srgb,var(--dsw-alias-state-business-primary,#4aa3ff) 45%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-business-primary,#4aa3ff) 14%,transparent)}",
        ".fe-gsearch-summary{flex:none;display:flex;gap:8px;padding:6px 12px;font-size:11.5px;color:var(--dsw-alias-label-tertiary,#8b93a5);border-bottom:1px solid var(--dsw-alias-separator-primary,rgba(255,255,255,.07))}",
        ".fe-gsearch-trunc{color:var(--dsw-alias-state-warn-primary,#e5c07b)}",
        ".fe-gsearch-list{flex:1;min-height:0;overflow:auto;padding:4px 0}",
        ".fe-gsearch-list::-webkit-scrollbar{width:10px}.fe-gsearch-list::-webkit-scrollbar-thumb{background:var(--dsw-alias-scrollbar-bg-l2,rgba(255,255,255,.08));border-radius:8px}",
        ".fe-gsearch-empty{flex:1;display:flex;align-items:center;justify-content:center;padding:20px;text-align:center;font-size:12.5px;color:var(--dsw-alias-label-tertiary,#8b93a5)}",
        ".fe-gsearch-file-head{display:flex;align-items:center;gap:5px;width:100%;border:none;background:transparent;color:var(--dsw-alias-label-primary,#e6e8ee);font:inherit;font-size:12.5px;padding:4px 8px;cursor:pointer;text-align:left;border-radius:6px;margin:0 4px;width:calc(100% - 8px)}",
        ".fe-gsearch-file-head:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.06))}",
        ".fe-gsearch-file-name{flex:none;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
        ".fe-gsearch-file-rel{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:11px;color:var(--dsw-alias-label-tertiary,#8b93a5)}",
        ".fe-gsearch-file-count{flex:none;font-size:10.5px;padding:0 6px;border-radius:8px;background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.1));color:var(--dsw-alias-label-tertiary,#8b93a5)}",
        ".fe-gsearch-match{display:flex;align-items:baseline;gap:8px;width:calc(100% - 8px);margin:0 4px;border:none;background:transparent;color:var(--dsw-alias-label-secondary,#c7c9d1);font:inherit;font-size:12px;padding:3px 8px 3px 28px;cursor:pointer;text-align:left;border-radius:6px}",
        ".fe-gsearch-match:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.06));color:var(--dsw-alias-label-primary,#e6e8ee)}",
        ".fe-gsearch-ln{flex:none;min-width:30px;text-align:right;font-size:11px;color:var(--dsw-alias-label-tertiary,#8b93a5);font-variant-numeric:tabular-nums}",
        ".fe-gsearch-text{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:var(--fe-editor-font,ui-monospace,SFMono-Regular,Menlo,monospace);font-size:11.5px}",
        ".fe-gsearch-mark{background:color-mix(in srgb,var(--dsw-alias-state-business-primary,#4aa3ff) 32%,transparent);color:inherit;border-radius:2px;padding:0 1px}"
      ].join("\n");
      var tag = document.createElement("style");
      tag.dataset.plugin = tagId;
      tag.dataset.pluginCss = tagId;
      tag.textContent = css;
      document.head.appendChild(tag);
    })();

    // ---- helpers --------------------------------------------------------
    function basename(p) {
      if (!p) return "";
      var parts = String(p).replace(/[\\/]+$/, "").split(/[\\/]/);
      return parts[parts.length - 1] || p;
    }
    function formatSize(n) {
      if (n == null) return "";
      if (n < 1024) return n + " B";
      if (n < 1024 * 1024) return (n / 1024).toFixed(1) + " KB";
      return (n / 1024 / 1024).toFixed(1) + " MB";
    }
    function extOf(name) {
      var i = name.lastIndexOf(".");
      return i <= 0 || i === name.length - 1 ? "" : name.slice(i + 1).toLowerCase();
    }
    var EXT_LABEL = {
      js: "JS", jsx: "JS", mjs: "JS", cjs: "JS",
      ts: "TS", tsx: "TS",
      py: "PY", rb: "RB", go: "GO", rs: "RS",
      java: "JV", kt: "KT", swift: "SW", c: "C", h: "H",
      cpp: "C+", cc: "C+", cs: "C#", php: "PHP", sql: "SQL",
      sh: "SH", bash: "SH", vue: "VUE", svelte: "SV",
      html: "HTML", htm: "HTM", xml: "XML",
      css: "CSS", scss: "SCS", less: "LES",
      json: "{}", jsonc: "{}", json5: "{}",
      yaml: "YML", yml: "YML", toml: "TML",
      md: "MD", markdown: "MD", mdx: "MDX",
      txt: "TXT", pdf: "PDF", doc: "DOC",
      png: "PNG", jpg: "JPG", jpeg: "JPG", gif: "GIF", webp: "WEB", svg: "SVG",
      zip: "ZIP", gz: "GZ", tar: "TAR", rar: "RAR"
    };
    function extLabel(name) {
      var e = extOf(name);
      if (!e) return "";
      return EXT_LABEL[e] || e.toUpperCase().slice(0, 3);
    }
    var IMG_EXT = ["png", "jpg", "jpeg", "gif", "webp", "svg", "ico", "bmp", "avif"];
    function isImageName(name) {
      return IMG_EXT.indexOf(extOf(name)) !== -1;
    }
    function colorFor(name) {
      var e = extOf(name);
      var CODE = "js jsx mjs cjs ts tsx mts cts py rb go rs java kt c h cpp cc hpp cs swift php sql vue svelte astro sol sh bash zsh fish ps1".split(" ");
      var MARKUP = "html htm xml".split(" ");
      var STYLE = "css scss sass less".split(" ");
      var DATA = "json jsonc json5 yaml yml toml ini cfg conf env properties plist".split(" ");
      var DOC = "md markdown mdx rst txt org pdf doc docx".split(" ");
      var ARCHIVE = "zip gz tar 7z rar bz2 xz".split(" ");
      if (e === "lock" || name === "package-lock.json" || name === "yarn.lock" || name === "pnpm-lock.yaml") return "#8b93a5";
      if (CODE.indexOf(e) !== -1) return "#f1c40f";
      if (MARKUP.indexOf(e) !== -1) return "#e07b39";
      if (STYLE.indexOf(e) !== -1) return "#c678dd";
      if (DATA.indexOf(e) !== -1) return "#e6b84d";
      if (DOC.indexOf(e) !== -1) return "#4aa3ff";
      if (IMG_EXT.indexOf(e) !== -1) return "#56b6c2";
      if (ARCHIVE.indexOf(e) !== -1) return "#b08968";
      if (e === "" && name.startsWith(".")) return "#9aa3b2";
      return "#8b93a5";
    }
    function langFor(name) {
      var e = extOf(name);
      if (e === "json" || e === "jsonc" || e === "json5") return "json";
      if (e === "css" || e === "scss" || e === "less") return "css";
      if (e === "html" || e === "htm" || e === "xml" || e === "vue" || e === "svelte") return "html";
      if (e === "md" || e === "markdown" || e === "mdx") return "markdown";
      if (e === "py") return "python";
      if (e === "sh" || e === "bash" || e === "zsh" || e === "fish" || e === "rb") return "python";
      if (e === "yml" || e === "yaml" || e === "toml") return "yaml";
      if (e === "js" || e === "jsx" || e === "mjs" || e === "cjs" || e === "ts" || e === "tsx" || e === "mts" || e === "cts" || e === "go" || e === "rs" || e === "java" || e === "kt" || e === "c" || e === "h" || e === "cpp" || e === "cc" || e === "cs" || e === "swift" || e === "php" || e === "sql") return "javascript";
      return "text";
    }

    function isMarkdownName(name) {
      var e = extOf(name);
      return e === "md" || e === "markdown";
    }
    function dirnameOf(p) {
      var s = String(p || "").replace(/[\\/]+$/, "");
      var i = Math.max(s.lastIndexOf("/"), s.lastIndexOf("\\"));
      return i <= 0 ? "/" : s.slice(0, i);
    }
    function joinFsPath(base, rel) {
      var s = String(base || "");
      var winDrive = /^[A-Za-z]:/.test(s) ? s.slice(0, 2) : "";
      var body = winDrive ? s.slice(2) : s;
      var sep = s.indexOf("\\") !== -1 ? "\\" : "/";
      var parts = body.split(/[\\/]/).filter(function (x) { return x !== ""; });
      var segs = String(rel || "").split(/[\\/]/);
      for (var i = 0; i < segs.length; i++) {
        var seg = segs[i];
        if (seg === "" || seg === ".") continue;
        if (seg === "..") { parts.pop(); continue; }
        parts.push(seg);
      }
      return winDrive + sep + parts.join(sep);
    }
    function isPathWithin(child, parent) {
      if (child === parent) return true;
      return child.slice(0, parent.length + 1) === parent + "/" || child.slice(0, parent.length + 1) === parent + "\\";
    }
    function resolveImageSrc(url, docPath) {
      if (!url) return url;
      if (/^[a-z][a-z0-9+.-]*:/i.test(url)) return url;
      if (url.charAt(0) === "/") return rawUrl(url);
      return rawUrl(joinFsPath(dirnameOf(docPath), url));
    }

    function listUrl(p) { return "/plugin/file-explorer/list?path=" + encodeURIComponent(p); }
    function readUrl(p) { return "/plugin/file-explorer/read?path=" + encodeURIComponent(p); }
    function rawUrl(p) { return "/plugin/file-explorer/raw?path=" + encodeURIComponent(p); }
    function writeUrl() { return "/plugin/file-explorer/write"; }
    function filesUrl(p) { return "/plugin/file-explorer/files?path=" + encodeURIComponent(p); }
    function searchUrl(p, q, opts) {
      return "/plugin/file-explorer/search?path=" + encodeURIComponent(p) +
        "&q=" + encodeURIComponent(q) +
        (opts && opts.case ? "&case=1" : "") +
        (opts && opts.word ? "&word=1" : "") +
        (opts && opts.regex ? "&regex=1" : "");
    }
    function createUrl() { return "/plugin/file-explorer/create"; }
    function renameUrl() { return "/plugin/file-explorer/rename"; }
    function deleteUrl() { return "/plugin/file-explorer/delete"; }
    function moveUrl() { return "/plugin/file-explorer/move"; }
    function uploadUrl(p) { return "/plugin/file-explorer/upload?path=" + encodeURIComponent(p); }
    function resolveUploadUrl() { return "/plugin/file-explorer/resolve-upload"; }

    // ---- i18n (locale service: zh / en) --------------------------------
    var FE_I18N = {
      zh: {
        "activity.files": "文件",
        "sidebar.explorer": "资源管理器",
        "sidebar.settings": "设置",
        "sidebar.empty": "暂无可用的工作区",
        "search.title": "搜索文件",
        "search.placeholder": "搜索文件（按名称模糊匹配）",
        "search.empty": "无匹配文件",
        "search.loading": "正在索引文件…",
        "activity.search": "搜索",
        "gsearch.placeholder": "全局搜索文件内容",
        "gsearch.case": "区分大小写",
        "gsearch.word": "全字匹配",
        "gsearch.regex": "使用正则表达式",
        "gsearch.searching": "搜索中…",
        "gsearch.none": "无结果",
        "gsearch.results": "{count} 个结果，{files} 个文件",
        "gsearch.truncated": "结果过多，已截断",
        "gsearch.badRegex": "无效的正则表达式",
        "gsearch.hint": "输入以搜索（Enter 立即搜索）",
        "find.placeholder": "查找",
        "find.replacePlaceholder": "替换",
        "find.replace": "替换",
        "find.replaceAll": "全部替换",
        "find.prev": "上一个匹配 (Shift+Enter)",
        "find.next": "下一个匹配 (Enter)",
        "find.close": "关闭 (Esc)",
        "find.toggleReplace": "展开/收起替换",
        "find.none": "无结果",
        "qo.gotoLine": "跳转到第 {n} 行",
        "settings.autoSaveTip": "自动保存设置",
        "settings.title": "自动保存",
        "settings.off": "关闭",
        "settings.delay": "延迟保存",
        "settings.blur": "失焦保存",
        "settings.delayLabel": "延迟",
        "settings.ms": "毫秒",
        "settings.font": "编辑器字体",
        "settings.fontPlaceholder": "如 JetBrains Mono, Menlo, monospace",
        "editor.loading": "加载中…",
        "editor.readError": "无法读取该文件（{error}）",
        "editor.binary": "二进制文件 · {size}（不可编辑）",
        "editor.tooLarge": "文件过大（{size}），暂不支持预览",
        "editor.tooLargeReadonly": "文件过大（{size}），仅可阅读预览",
        "editor.lines": "{n} 行",
        "editor.saved": "已保存",
        "editor.dirty": "● 未保存",
        "editor.saveHint": "⌘/Ctrl+S 保存",
        "editor.close": "关闭",
        "editor.pinned": "已固定",
        "md.read": "阅读",
        "md.edit": "编辑",
        "md.split": "分屏",
        "md.outline": "大纲",
        "menu.close": "关闭",
        "menu.closeOthers": "关闭其他",
        "menu.closeRight": "关闭右侧标签页",
        "menu.closeSaved": "关闭已保存",
        "menu.closeAll": "全部关闭",
        "menu.copyPath": "复制路径",
        "menu.pin": "固定",
        "menu.unpin": "取消固定",
        "confirm.title": "未保存的更改",
        "confirm.dirtyOne": "「{name}」有未保存的更改",
        "confirm.dirtyMany": "{n} 个文件有未保存的更改",
        "confirm.saveClose": "保存并关闭",
        "confirm.discard": "不保存",
        "confirm.cancel": "取消",
        "menu.newFile": "新建文件",
        "menu.newFolder": "新建文件夹",
        "menu.rename": "重命名",
        "menu.delete": "删除",
        "prompt.newFile": "新建文件",
        "prompt.newFolder": "新建文件夹",
        "prompt.rename": "重命名",
        "prompt.namePlaceholder": "输入名称",
        "prompt.ok": "确定",
        "prompt.cancel": "取消",
        "confirm.deleteOne": "确定删除「{name}」吗？此操作不可撤销。",
        "confirm.deleteDir": "确定删除文件夹「{name}」及其全部内容吗？此操作不可撤销。",
        "confirm.delete": "删除",
        "error.generic": "操作失败：{error}",
        "error.moveIntoDescendant": "不能将文件夹移动到它自身或其子文件夹内",
        "upload.importing": "正在导入 {done}/{total}：{name}",
        "upload.done": "已导入 {n} 个文件",
        "upload.failed": "{n} 个失败",
        "upload.none": "未检测到可导入的文件",
        "batch.movePartial": "移动完成：成功 {moved} 项，{failed} 项失败",
        "error.targetNotDir": "目标不是有效的文件夹"
      },
      en: {
        "activity.files": "Explorer",
        "sidebar.explorer": "Explorer",
        "sidebar.settings": "Settings",
        "sidebar.empty": "No workspace available",
        "search.title": "Search files",
        "search.placeholder": "Search files by name (fuzzy)",
        "search.empty": "No matching files",
        "search.loading": "Indexing files…",
        "activity.search": "Search",
        "gsearch.placeholder": "Search in all files",
        "gsearch.case": "Match Case",
        "gsearch.word": "Match Whole Word",
        "gsearch.regex": "Use Regular Expression",
        "gsearch.searching": "Searching…",
        "gsearch.none": "No results",
        "gsearch.results": "{count} results in {files} files",
        "gsearch.truncated": "Too many results, truncated",
        "gsearch.badRegex": "Invalid regular expression",
        "gsearch.hint": "Type to search (Enter to search now)",
        "find.placeholder": "Find",
        "find.replacePlaceholder": "Replace",
        "find.replace": "Replace",
        "find.replaceAll": "Replace All",
        "find.prev": "Previous match (Shift+Enter)",
        "find.next": "Next match (Enter)",
        "find.close": "Close (Esc)",
        "find.toggleReplace": "Toggle replace",
        "find.none": "No results",
        "qo.gotoLine": "Go to line {n}",
        "settings.autoSaveTip": "Auto save settings",
        "settings.title": "Auto Save",
        "settings.off": "Off",
        "settings.delay": "After delay",
        "settings.blur": "On focus lost",
        "settings.delayLabel": "Delay",
        "settings.ms": "ms",
        "settings.font": "Editor font family",
        "settings.fontPlaceholder": "e.g. JetBrains Mono, Menlo, monospace",
        "editor.loading": "Loading…",
        "editor.readError": "Cannot read file ({error})",
        "editor.binary": "Binary file · {size} (not editable)",
        "editor.tooLarge": "File too large ({size}), preview not supported",
        "editor.tooLargeReadonly": "File too large ({size}), read-only preview",
        "editor.lines": "{n} lines",
        "editor.saved": "Saved",
        "editor.dirty": "● Unsaved",
        "editor.saveHint": "⌘/Ctrl+S to save",
        "editor.close": "Close",
        "editor.pinned": "Pinned",
        "md.read": "Read",
        "md.edit": "Edit",
        "md.split": "Split",
        "md.outline": "Outline",
        "menu.close": "Close",
        "menu.closeOthers": "Close Others",
        "menu.closeRight": "Close to the Right",
        "menu.closeSaved": "Close Saved",
        "menu.closeAll": "Close All",
        "menu.copyPath": "Copy Path",
        "menu.pin": "Pin",
        "menu.unpin": "Unpin",
        "confirm.title": "Unsaved changes",
        "confirm.dirtyOne": "\"{name}\" has unsaved changes",
        "confirm.dirtyMany": "{n} files have unsaved changes",
        "confirm.saveClose": "Save & Close",
        "confirm.discard": "Don't Save",
        "confirm.cancel": "Cancel",
        "menu.newFile": "New File",
        "menu.newFolder": "New Folder",
        "menu.rename": "Rename",
        "menu.delete": "Delete",
        "prompt.newFile": "New File",
        "prompt.newFolder": "New Folder",
        "prompt.rename": "Rename",
        "prompt.namePlaceholder": "Enter a name",
        "prompt.ok": "OK",
        "prompt.cancel": "Cancel",
        "confirm.deleteOne": "Delete \"{name}\"? This cannot be undone.",
        "confirm.deleteDir": "Delete folder \"{name}\" and all its contents? This cannot be undone.",
        "confirm.delete": "Delete",
        "error.generic": "Operation failed: {error}",
        "error.moveIntoDescendant": "Cannot move a folder into itself or its own subfolder",
        "upload.importing": "Importing {done}/{total}: {name}",
        "upload.done": "Imported {n} file(s)",
        "upload.failed": "{n} failed",
        "upload.none": "No importable files detected",
        "batch.movePartial": "Move finished: {moved} succeeded, {failed} failed",
        "error.targetNotDir": "Target is not a valid folder"
      }
    };
    var _locale = null;
    var _localeHooks = null;
    var _t = function (key, params) { return key; };
    function t(key, params) { return _t(key, params); }
    function useLocale() {
      if (_locale && !_localeHooks) {
        _localeHooks = {
          subscribe: _locale.subscribe.bind(_locale),
          getSnapshot: _locale.getSnapshot.bind(_locale)
        };
      }
      if (!_localeHooks) return "zh";
      return useSyncExternalStore(_localeHooks.subscribe, _localeHooks.getSnapshot, _localeHooks.getSnapshot).active;
    }

    async function fetchJson(url) {
      try {
        var res = await fetch(url);
        if (!res.ok) return { ok: false, error: "http-" + res.status };
        return await res.json();
      } catch (err) {
        return { ok: false, error: "network" };
      }
    }
    async function postJson(url, body) {
      try {
        var res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });
        var data = null;
        try { data = await res.json(); } catch (err) { /* non-JSON body */ }
        if (!res.ok) return { ok: false, error: (data && data.error) || "http-" + res.status };
        return data;
      } catch (err) {
        return { ok: false, error: "network" };
      }
    }

    // ---- syntax highlighting -------------------------------------------
    function scan(code, re, classes) {
      var tokens = [];
      var last = 0;
      var m;
      re.lastIndex = 0;
      while ((m = re.exec(code)) !== null) {
        if (m.index > last) tokens.push([code.slice(last, m.index), ""]);
        var cls = "";
        for (var g = 1; g < classes.length; g++) {
          if (m[g] !== undefined) {
            cls = classes[g];
            break;
          }
        }
        tokens.push([m[0], cls]);
        last = m.index + m[0].length;
        if (m[0].length === 0) re.lastIndex = last + 1;
      }
      if (last < code.length) tokens.push([code.slice(last), ""]);
      return tokens;
    }

    var JS_KW = "const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|class|extends|implements|import|export|from|as|async|await|try|catch|finally|throw|typeof|instanceof|in|of|this|super|delete|void|yield|default|static|get|set|public|private|protected|readonly|enum|interface|type|namespace|declare|keyof|infer|satisfies|unknown|any|true|false|null|undefined|NaN|Infinity";
    var JS_RE = new RegExp(
      [
        "(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)",
        "('(?:[^'\\\\\\n]|\\\\.)*'|\"(?:[^\"\\\\\\n]|\\\\.)*\"|`(?:[^`\\\\]|\\\\.)*`)",
        "(\\b\\d[\\w.]*\\b)",
        "(\\b(?:" + JS_KW + ")\\b)",
        "([A-Za-z_$][\\w$]*(?=\\s*\\())",
        "(=>|===|!==|==|!=|<=|>=|\\+\\+|--|&&|\\|\\||\\?\\?|\\.\\.\\.|[+\\-*/%=<>!&|^?:~]+)"
      ].join("|"),
      "gm"
    );
    var JS_CLASSES = ["", "cmt", "str", "num", "kw", "fn", "op"];

    var PY_KW = "def|class|if|elif|else|for|while|import|from|as|return|yield|try|except|finally|raise|with|lambda|pass|break|continue|global|nonlocal|del|assert|in|is|not|and|or|None|True|False|self|then|fi|done|echo|local|export|function|case|esac|print";
    var PY_RE = new RegExp(
      [
        "(#[^\\n]*)",
        "('(?:[^'\\\\\\n]|\\\\.)*'|\"(?:[^\"\\\\\\n]|\\\\.)*\")",
        "(\\b\\d[\\w.]*\\b)",
        "(\\b(?:" + PY_KW + ")\\b)",
        "([A-Za-z_][\\w]*(?=\\s*\\())",
        "(==|!=|<=|>=|\\+\\+|--|[+\\-*/%=<>!&|^~:]+)"
      ].join("|"),
      "gm"
    );

    var JSON_RE = new RegExp(
      [
        "(\"(?:[^\"\\\\]|\\\\.)*\")(?=\\s*:)",
        "(\"(?:[^\"\\\\]|\\\\.)*\")",
        "(\\b-?\\d[\\w.+-]*\\b)",
        "(\\btrue\\b|\\bfalse\\b|\\bnull\\b)",
        "([{}\\[\\],:])"
      ].join("|"),
      "gm"
    );
    var JSON_CLASSES = ["", "prop", "str", "num", "kw", "op"];

    var CSS_RE = new RegExp(
      [
        "(\\/\\*[\\s\\S]*?\\*\\/)",
        "(\"(?:[^\"\\\\]|\\\\.)*\"|'(?:[^'\\\\]|\\\\.)*')",
        "(#[0-9a-fA-F]{3,8}\\b)",
        "(@[A-Za-z-]+)",
        "([A-Za-z-]+)(?=\\s*:)",
        "(\\b\\d[\\w.%+-]*\\b)",
        "([{}:;,>+~()\\[\\]])"
      ].join("|"),
      "gm"
    );
    var CSS_CLASSES = ["", "cmt", "str", "num", "kw", "prop", "num", "op"];

    var HTML_RE = new RegExp(
      [
        "(<!--[\\s\\S]*?-->)",
        "(<\\/[A-Za-z][\\w-]*>|<[A-Za-z][\\w-]*)",
        "(>|\\/>)",
        "([A-Za-z_:][\\w:.-]*)(?==)",
        "(\"[^\"]*\"|'[^']*')",
        "(&[A-Za-z]+;|&#\\d+;)"
      ].join("|"),
      "gm"
    );
    var HTML_CLASSES = ["", "cmt", "tag", "tag", "attr", "str", "num"];

    var YAML_RE = new RegExp(
      [
        "(#[^\\n]*)",
        "([A-Za-z0-9_.-]+)(?=\\s*:)",
        "('(?:[^'\\\\\\n]|\\\\.)*'|\"(?:[^\"\\\\\\n]|\\\\.)*\")",
        "(\\b-?\\d[\\w.]*\\b)",
        "(\\btrue\\b|\\bfalse\\b|\\bnull\\b|\\byes\\b|\\bno\\b|\\bon\\b|\\boff\\b)",
        "(^|\\s)(-\\s|\\?)"
      ].join("|"),
      "gm"
    );
    var YAML_CLASSES = ["", "cmt", "prop", "str", "num", "kw", "op"];

    var MD_RE = /(`[^`\n]+`|\*\*[^*\n]+\*\*|__[^_\n]+__|\[[^\]\n]*\]\([^)\n]*\)|^#{1,6}[ \t].*)/gm;
    var MD_CLASSES = ["", "mcode", "mb", "mb", "mlink", "mh"];

    function tokenize(code, lang) {
      if (!code) return [];
      if (lang === "json") return scan(code, JSON_RE, JSON_CLASSES);
      if (lang === "css") return scan(code, CSS_RE, CSS_CLASSES);
      if (lang === "html") return scan(code, HTML_RE, HTML_CLASSES);
      if (lang === "python") return scan(code, PY_RE, JS_CLASSES);
      if (lang === "yaml") return scan(code, YAML_RE, YAML_CLASSES);
      if (lang === "markdown") return scan(code, MD_RE, MD_CLASSES);
      if (lang === "text") return [[code, ""]];
      return scan(code, JS_RE, JS_CLASSES);
    }

    // ---- markdown renderer ---------------------------------------------
    var MD_INLINE_RE = /(`[^`\n]+`|\*\*[^*\n]+\*\*|__[^_\n]+__|~~[^~\n]+~~|!\[[^\]\n]*\]\([^)\s]+(?:\s+["'][^"']*["'])?\)|\[[^\]\n]*\]\([^)\s]+(?:\s+["'][^"']*["'])?\)|\*[^*\n]+\*|_[^_\n]+_)/g;

    function mdIsHr(line) {
      var t = line.trim();
      if (t.length < 3) return false;
      var c = t.charAt(0);
      if (c !== "-" && c !== "*" && c !== "_") return false;
      var count = 0;
      for (var i = 0; i < t.length; i++) {
        var ch = t.charAt(i);
        if (ch === c) { count++; continue; }
        if (ch === " " || ch === "\t") continue;
        return false;
      }
      return count >= 3;
    }

    function mdIsBlockStart(line) {
      if (/^\s*$/.test(line)) return true;
      if (/^\s{0,3}#{1,6}\s/.test(line)) return true;
      if (/^\s{0,3}(```+|~~~+)/.test(line)) return true;
      if (/^\s{0,3}>/.test(line)) return true;
      if (/^\s{0,3}[-*+]\s+/.test(line)) return true;
      if (/^\s{0,3}\d+[.)]\s+/.test(line)) return true;
      if (mdIsHr(line)) return true;
      return false;
    }

    function mdInlineToken(tok, docPath) {
      var c0 = tok.charAt(0);
      if (c0 === "`") return jsx("code", { className: "fe-md-code", children: tok.slice(1, -1) });
      if (tok.slice(0, 2) === "**" || tok.slice(0, 2) === "__") return jsx("strong", { className: "fe-md-strong", children: tok.slice(2, -2) });
      if (tok.slice(0, 2) === "~~") return jsx("del", { className: "fe-md-del", children: tok.slice(2, -2) });
      if (c0 === "!") {
        var im = tok.match(/^!\[([^\]\n]*)\]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)$/);
        return jsx("img", { className: "fe-md-img", src: resolveImageSrc(im ? im[2] : "", docPath), alt: im ? im[1] : "" });
      }
      if (c0 === "[") {
        var lm = tok.match(/^\[([^\]\n]*)\]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)$/);
        var href = lm ? lm[2] : "";
        var ext = /^https?:/i.test(href);
        return jsx("a", { className: "fe-md-a", href: href, target: ext ? "_blank" : undefined, rel: ext ? "noopener noreferrer" : undefined, children: lm ? lm[1] : tok });
      }
      return jsx("em", { className: "fe-md-em", children: tok.slice(1, -1) });
    }

    function mdParseInline(text, docPath) {
      var s = String(text == null ? "" : text).replace(/\n/g, " ");
      var out = [];
      var last = 0;
      var m;
      MD_INLINE_RE.lastIndex = 0;
      while ((m = MD_INLINE_RE.exec(s)) !== null) {
        if (m.index > last) out.push(s.slice(last, m.index));
        out.push(mdInlineToken(m[0], docPath));
        last = m.index + m[0].length;
      }
      if (last < s.length) out.push(s.slice(last));
      return out;
    }

    function mdNormLang(lang) {
      if (!lang) return "text";
      if (lang === "py") return "python";
      if (lang === "rb" || lang === "sh" || lang === "bash" || lang === "zsh" || lang === "shell") return "python";
      if (lang === "yml") return "yaml";
      if (lang === "md" || lang === "markdown") return "markdown";
      return lang;
    }

    function mdRenderCode(b, idx) {
      var tokens = tokenize(b.code, mdNormLang(b.lang));
      var code = tokens.map(function (t, i) {
        return t[1] ? jsx("span", { className: "tok-" + t[1], children: t[0] }, i) : t[0];
      });
      return jsxs("div", {
        className: "fe-md-pre-wrap",
        children: [
          b.lang ? jsx("div", { className: "fe-md-pre-lang", children: b.lang }) : null,
          jsx("pre", { className: "fe-md-pre", children: jsx("code", { children: [code, "\n"] }) })
        ]
      }, idx);
    }

    function mdSplitTableRow(line) {
      var s = line.trim();
      if (s.charAt(0) === "|") s = s.slice(1);
      if (s.charAt(s.length - 1) === "|") s = s.slice(0, -1);
      return s.split("|").map(function (c) { return c.trim(); });
    }

    function mdRenderTable(b, idx, docPath) {
      var head = b.head.map(function (c, i) { return jsx("th", { children: mdParseInline(c, docPath) }, i); });
      var rows = b.rows.map(function (r, ri) {
        var cells = r.map(function (c, ci) { return jsx("td", { children: mdParseInline(c, docPath) }, ci); });
        return jsx("tr", { children: cells }, ri);
      });
      return jsx("div", {
        className: "fe-md-table-wrap",
        children: jsx("table", {
          className: "fe-md-table",
          children: [
            jsx("thead", { children: jsx("tr", { children: head }) }),
            jsx("tbody", { children: rows })
          ]
        })
      }, idx);
    }

    function mdRenderListTree(nodes, docPath) {
      if (!nodes.length) return null;
      var tag = nodes[0].item.ordered ? "ol" : "ul";
      var children = nodes.map(function (node, i) {
        var it = node.item;
        var content = it.text;
        if (it.extra && it.extra.length) content += "\n" + it.extra.join("\n");
        var inner = [];
        if (it.task !== null) inner.push(jsx("input", { type: "checkbox", checked: it.checked, readOnly: true }, "cb"));
        inner.push(mdParseInline(content, docPath));
        if (node.children.length) inner.push(mdRenderListTree(node.children, docPath));
        return jsx("li", { className: it.task !== null ? "fe-md-task" : undefined, children: inner }, i);
      });
      return jsx(tag, { children: children });
    }

    function mdRenderList(items, docPath) {
      var root = [];
      var stack = [{ indent: -1, children: root }];
      for (var k = 0; k < items.length; k++) {
        var it = items[k];
        var node = { item: it, children: [] };
        while (stack.length > 1 && stack[stack.length - 1].indent >= it.indent) stack.pop();
        stack[stack.length - 1].children.push(node);
        stack.push({ indent: it.indent, children: node.children });
      }
      return mdRenderListTree(root, docPath);
    }

    function mdStripInline(text) {
      return String(text == null ? "" : text)
        .replace(/!?\[([^\]\n]*)\]\([^)\n]*\)/g, "$1")
        .replace(/[`*_~]/g, "")
        .trim();
    }

    function mdRenderBlock(b, idx, docPath) {
      if (b.type === "heading") {
        var level = b.level > 6 ? 6 : b.level;
        return jsx("h" + level, { id: b.id, className: "fe-md-h fe-md-h" + level, children: mdParseInline(b.text, docPath) }, idx);
      }
      if (b.type === "paragraph") return jsx("p", { className: "fe-md-p", children: mdParseInline(b.text, docPath) }, idx);
      if (b.type === "hr") return jsx("hr", { className: "fe-md-hr" }, idx);
      if (b.type === "code") return mdRenderCode(b, idx);
      if (b.type === "table") return mdRenderTable(b, idx, docPath);
      if (b.type === "list") return mdRenderList(b.items, docPath);
      return null;
    }

    function mdRenderBlocks(blocks, docPath) {
      return blocks.map(function (b, idx) {
        if (b.type === "quote") {
          return jsx("blockquote", { className: "fe-md-blockquote", children: mdRenderBlocks(b.blocks, docPath) }, idx);
        }
        return mdRenderBlock(b, idx, docPath);
      });
    }

    function mdParse(source, ctx) {
      var c = ctx || { h: 0, headings: [] };
      var lines = String(source == null ? "" : source).replace(/\r\n?/g, "\n").split("\n");
      var blocks = [];
      var i = 0;
      while (i < lines.length) {
        var line = lines[i];
        // fenced code block
        var fence = line.match(/^\s{0,3}(```+|~~~+)\s*([\w+#.-]*)\s*$/);
        if (fence) {
          var marker = fence[1];
          var lang = fence[2] || "";
          var codeLines = [];
          i++;
          while (i < lines.length) {
            var cl = lines[i];
            var close = cl.match(/^\s{0,3}(```+|~~~+)\s*$/);
            if (close && close[1].charAt(0) === marker.charAt(0) && close[1].length >= marker.length) { i++; break; }
            codeLines.push(cl);
            i++;
          }
          blocks.push({ type: "code", lang: lang, code: codeLines.join("\n") });
          continue;
        }
        // heading
        var h = line.match(/^\s{0,3}(#{1,6})\s+(.*)$/);
        if (h) {
          var hid = "fe-md-h" + (c.h++);
          c.headings.push({ level: h[1].length, text: mdStripInline(h[2]), id: hid });
          blocks.push({ type: "heading", level: h[1].length, text: h[2], id: hid });
          i++;
          continue;
        }
        // horizontal rule
        if (mdIsHr(line)) {
          blocks.push({ type: "hr" });
          i++;
          continue;
        }
        // blockquote
        if (/^\s{0,3}>/.test(line)) {
          var ql = [];
          while (i < lines.length && /^\s{0,3}>\s?/.test(lines[i])) {
            ql.push(lines[i].replace(/^\s{0,3}>\s?/, ""));
            i++;
          }
          blocks.push({ type: "quote", blocks: mdParse(ql.join("\n"), c) });
          continue;
        }
        // table
        if (/\|/.test(line) && i + 1 < lines.length && /^\s*\|?[\s:|-]+\|[\s:|-]*$/.test(lines[i + 1])) {
          var headCells = mdSplitTableRow(line);
          i += 2;
          var rows = [];
          while (i < lines.length && lines[i].trim() !== "" && /\|/.test(lines[i])) {
            rows.push(mdSplitTableRow(lines[i]));
            i++;
          }
          blocks.push({ type: "table", head: headCells, rows: rows });
          continue;
        }
        // list
        var lm0 = line.match(/^(\s*)([-*+]|\d+[.)])\s+(.*)$/);
        if (lm0) {
          var items = [];
          while (i < lines.length) {
            var li = lines[i];
            if (li.trim() === "") break;
            var m = li.match(/^(\s*)([-*+]|\d+[.)])\s+(.*)$/);
            if (m) {
              var indent = m[1].replace(/\t/g, "  ").length;
              var task = m[3].match(/^\[([ xX])\]\s+(.*)$/);
              items.push({
                indent: indent,
                ordered: /^\d/.test(m[2]),
                task: task ? task[1].toLowerCase() : null,
                checked: task ? task[1].toLowerCase() === "x" : false,
                text: task ? task[2] : m[3],
                extra: null
              });
              i++;
              continue;
            }
            if (/^\s+/.test(li)) {
              if (items.length) {
                var lastIt = items[items.length - 1];
                lastIt.extra = (lastIt.extra || []).concat([li]);
              }
              i++;
              continue;
            }
            break;
          }
          blocks.push({ type: "list", items: items });
          continue;
        }
        // blank line
        if (line.trim() === "") { i++; continue; }
        // paragraph
        var pl = [];
        while (i < lines.length && !mdIsBlockStart(lines[i])) {
          pl.push(lines[i]);
          i++;
        }
        if (pl.length) blocks.push({ type: "paragraph", text: pl.join("\n") });
      }
      return blocks;
    }

    function renderMarkdown(source, docPath) {
      var ctx = { h: 0, headings: [] };
      var blocks = mdParse(source, ctx);
      return { elements: mdRenderBlocks(blocks, docPath), headings: ctx.headings };
    }

    // ---- icons ----------------------------------------------------------
    function FolderIcon(props) {
      return jsx("svg", {
        className: "fe-icon fe-folder-icon",
        width: props.size || 14,
        height: props.size || 14,
        viewBox: "0 0 16 16",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.3,
        strokeLinejoin: "round",
        "aria-hidden": true,
        children: jsx("path", { d: "M1.5 4.5A1.5 1.5 0 0 1 3 3h3.1c.4 0 .78.16 1.06.44L8.4 4.5h4.6A1.5 1.5 0 0 1 14.5 6v6A1.5 1.5 0 0 1 13 13.5H3A1.5 1.5 0 0 1 1.5 12z" })
      });
    }
    function FileIcon(props) {
      var label = extLabel(props.name);
      var color = colorFor(props.name);
      var fontSize = label.length >= 4 ? 7.5 : label.length === 3 ? 9.5 : 12.0;
      if (!label) {
        return jsxs("svg", {
          className: "fe-icon",
          width: props.size || 14,
          height: props.size || 14,
          viewBox: "0 0 16 16",
          fill: "none",
          "aria-hidden": true,
          children: [
            jsx("path", {
              d: "M4.5 1.5h4.9L13 4.6v8.4A1.5 1.5 0 0 1 11.5 14.5h-7A1.5 1.5 0 0 1 3 13V3A1.5 1.5 0 0 1 4.5 1.5z",
              stroke: color,
              strokeWidth: 1.1,
              strokeLinejoin: "round"
            }),
            jsx("path", { d: "M9.5 1.5V5H13", stroke: color, strokeWidth: 1.1, strokeLinejoin: "round" })
          ]
        });
      }
      return jsxs("svg", {
        className: "fe-icon",
        width: props.size || 14,
        height: props.size || 14,
        viewBox: "0 0 16 16",
        "aria-hidden": true,
        children: [
          jsx("text", { x: 8, y: 8, textAnchor: "middle", dominantBaseline: "central", fontSize: fontSize, fontWeight: 700, fill: color, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", children: label })
        ]
      });
    }
    function CaretIcon(props) {
      return jsx("svg", {
        className: "fe-caret" + (props.open ? " fe-caret-open" : ""),
        width: 12,
        height: 12,
        viewBox: "0 0 16 16",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.8,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": true,
        children: jsx("path", { d: "M6 3.5L11 8l-5 4.5" })
      });
    }
    function ExplorerIcon() {
      return jsx("svg", {
        width: 20,
        height: 20,
        viewBox: "0 0 16 16",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.25,
        strokeLinejoin: "round",
        strokeLinecap: "round",
        "aria-hidden": true,
        children: jsx("path", { d: "M2 3.5h3.4l1.6 2h5.5a1 1 0 0 1 1 1V12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1z" })
      });
    }

    // ---- editor store ---------------------------------------------------
    function loadSettings() {
      var s = { mode: "off", delay: 1000, fontFamily: "" };
      try {
        var raw = localStorage.getItem("dsh-plugin-file-explorer.autosave");
        if (raw) {
          var parsed = JSON.parse(raw);
          if (parsed && (parsed.mode === "off" || parsed.mode === "delay" || parsed.mode === "blur")) {
            s.mode = parsed.mode;
            s.delay = typeof parsed.delay === "number" ? parsed.delay : 1000;
          }
        }
      } catch (err) {}
      try {
        var f = localStorage.getItem("dsh-plugin-file-explorer.font");
        if (f) s.fontFamily = f;
      } catch (err) {}
      return s;
    }

    function createEditorStore() {
      var state = { docs: {}, order: [], settings: loadSettings() };
      var listeners = new Set();
      var timers = {};
      function notify() {
        listeners.forEach(function (fn) { fn(); });
      }
      function set(updater) {
        state = updater(state);
        notify();
      }
      function setDoc(path, patch) {
        set(function (s) {
          var docs = Object.assign({}, s.docs);
          if (docs[path]) docs[path] = Object.assign({}, docs[path], patch);
          return { docs: docs, order: s.order, settings: s.settings };
        });
      }
      function isDirtyDoc(doc) {
        return !!doc && doc.phase === "done" && !doc.binary && doc.content !== doc.savedContent;
      }
      function clearTimer(path) {
        if (timers[path]) {
          clearTimeout(timers[path]);
          delete timers[path];
        }
      }
      function saveNow(path) {
        var doc = state.docs[path];
        if (!doc) return Promise.resolve(false);
        var content = doc.content;
        return postJson(writeUrl(), { path: path, content: content }).then(function (r) {
          if (r && r.ok) {
            setDoc(path, { savedContent: content });
            return true;
          }
          return false;
        });
      }
      function saveIfDirty(path) {
        if (!isDirtyDoc(state.docs[path])) return Promise.resolve(true);
        return saveNow(path);
      }
      return {
        getSnapshot: function () { return state; },
        subscribe: function (fn) { listeners.add(fn); return function () { listeners.delete(fn); }; },
        open: function (path, name) {
          if (state.docs[path]) return;
          var doc = { path: path, name: name, lang: langFor(name), phase: "loading", content: "", savedContent: "", error: null, binary: false, size: 0, truncated: false, pinned: false };
          set(function (s) {
            var docs = Object.assign({}, s.docs);
            docs[path] = doc;
            var order = s.order.indexOf(path) === -1 ? s.order.concat([path]) : s.order;
            return { docs: docs, order: order, settings: s.settings };
          });
          fetchJson(readUrl(path)).then(function (r) {
            if (!r || r.ok === false) {
              setDoc(path, { phase: "error", error: (r && r.error) || "read-failed" });
              return;
            }
            var binary = !!r.binary;
            var content = binary ? "" : (r.content || "");
            setDoc(path, { phase: "done", content: content, savedContent: content, binary: binary, size: r.size, truncated: !!r.truncated });
          });
        },
        close: function (path) {
          clearTimer(path);
          set(function (s) {
            var docs = Object.assign({}, s.docs);
            delete docs[path];
            var order = s.order.filter(function (p) { return p !== path; });
            return { docs: docs, order: order, settings: s.settings };
          });
        },
        update: function (path, content) {
          setDoc(path, { content: content });
          clearTimer(path);
          if (state.settings.mode === "delay" && isDirtyDoc(state.docs[path])) {
            var delay = state.settings.delay;
            timers[path] = setTimeout(function () {
              delete timers[path];
              saveIfDirty(path);
            }, delay);
          }
        },
        save: saveNow,
        saveIfDirty: saveIfDirty,
        isDirty: function (path) { return isDirtyDoc(state.docs[path]); },
        getName: function (path) { return state.docs[path] ? state.docs[path].name : path; },
        togglePin: function (path) {
          var d = state.docs[path];
          if (!d) return;
          setDoc(path, { pinned: !d.pinned });
        },
        renameDoc: function (fromPath, toPath, newName) {
          set(function (s) {
            var docs = Object.assign({}, s.docs);
            var doc = docs[fromPath];
            if (doc) {
              var nm = newName || basename(toPath);
              delete docs[fromPath];
              docs[toPath] = Object.assign({}, doc, { path: toPath, name: nm, lang: langFor(nm) });
            }
            var order = s.order.map(function (p) { return p === fromPath ? toPath : p; });
            return { docs: docs, order: order, settings: s.settings };
          });
        },
        // One-shot "scroll this line/column into view and place the caret"
        // request for a doc (search-result jumps, go-to-line). CodeEditor
        // consumes it via the `reveal` prop; seq retriggers on repeat jumps.
        reveal: function (path, line, col) {
          setDoc(path, { reveal: { line: Math.max(1, line | 0), col: Math.max(1, col | 0), seq: Date.now() + Math.random() } });
        },
        closeUnder: function (prefix) {
          set(function (s) {
            var docs = Object.assign({}, s.docs);
            var order = [];
            for (var i = 0; i < s.order.length; i++) {
              var p = s.order[i];
              if (isPathWithin(p, prefix)) {
                clearTimer(p);
                delete docs[p];
              } else {
                order.push(p);
              }
            }
            return { docs: docs, order: order, settings: s.settings };
          });
        },
        getSettings: function () { return state.settings; },
        setAutoSave: function (mode, delay) {
          var cur = state.settings;
          var next = { mode: mode, delay: delay == null ? 1000 : delay, fontFamily: cur.fontFamily };
          set(function (s) { return { docs: s.docs, order: s.order, settings: next }; });
          try {
            localStorage.setItem("dsh-plugin-file-explorer.autosave", JSON.stringify({ mode: next.mode, delay: next.delay }));
          } catch (err) {}
          if (mode !== "delay") {
            for (var k in timers) clearTimeout(timers[k]);
            timers = {};
          }
        },
        setFontFamily: function (font) {
          var cur = state.settings;
          var next = { mode: cur.mode, delay: cur.delay, fontFamily: font == null ? "" : font };
          set(function (s) { return { docs: s.docs, order: s.order, settings: next }; });
          try {
            localStorage.setItem("dsh-plugin-file-explorer.font", next.fontFamily);
          } catch (err) {}
        }
      };
    }
    function useEditor(store) {
      return useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
    }

    // Minimal external store holding the single "file shown in a blank
    // session" — used to render an editor overlay while the conversation view
    // ring is not mounted (blank session, no message sent yet).
    function createStandaloneStore() {
      var state = { active: null }; // { path, name } | null
      var listeners = new Set();
      return {
        getSnapshot: function () { return state.active; },
        subscribe: function (fn) { listeners.add(fn); return function () { listeners.delete(fn); }; },
        set: function (active) { state.active = active; listeners.forEach(function (fn) { fn(); }); }
      };
    }

    // ---- tree -----------------------------------------------------------
    function FileRow(props) {
      var selected = props.selection && props.selection.has(props.path);
      return jsxs(
        "div",
        {
          className: "fe-node-row fe-file" + (props.open ? " fe-open" : "") + (selected ? " fe-selected" : ""),
          style: { paddingLeft: 8 + props.depth * 12 },
          draggable: true,
          onClick: function (e) {
            if (props.selection && (e.ctrlKey || e.metaKey)) {
              e.preventDefault();
              e.stopPropagation();
              props.selection.toggle(props.path);
              return;
            }
            if (props.selection) props.selection.clear();
            props.openFile(props.path, props.name);
          },
          onDragStart: function (e) {
            var group = props.selection && props.selection.has(props.path) ? props.selection.toArray() : null;
            props.dragStart(props.path, "file", props.name, e, group, props.selection ? props.selection.clear : null);
          },
          onDragEnd: function () { props.dragEnd(); },
          onContextMenu: function (e) {
            e.preventDefault();
            e.stopPropagation();
            props.treeMenu.open({ path: props.path, kind: "file", name: props.name, x: e.clientX, y: e.clientY });
          },
          title: props.path,
          children: [
            jsx("span", { className: "fe-caret fe-caret-spacer", children: "" }),
            jsx(FileIcon, { name: props.name, size: 16 }),
            jsx("span", { className: "fe-name", children: props.name })
          ]
        },
        props.path
      );
    }

    function DirNode(props) {
      var isOpen = props.expanded.has(props.path);
      var listing = props.cache.get(props.path);
      var isLoading = listing && listing.loading;
      var selected = props.selection && props.selection.has(props.path);
      var dragOverState = useState(false);
      var dragOver = dragOverState[0];
      var setDragOver = dragOverState[1];
      var extDragOverState = useState(false);
      var extDragOver = extDragOverState[0];
      var setExtDragOver = extDragOverState[1];
      var children = [];
      if (isOpen && listing && listing.ok) {
        var d, f;
        for (d of listing.dirs || []) {
          children.push(jsx(DirNode, { path: d.path, name: d.name, depth: props.depth + 1, expanded: props.expanded, cache: props.cache, toggle: props.toggle, openFile: props.openFile, openPaths: props.openPaths, treeMenu: props.treeMenu, selection: props.selection, dragStart: props.dragStart, dragEnd: props.dragEnd, isDragging: props.isDragging, dropOnDir: props.dropOnDir, importDataTransfer: props.importDataTransfer }, d.path));
        }
        for (f of listing.files || []) {
          children.push(jsx(FileRow, { path: f.path, name: f.name, depth: props.depth + 1, openFile: props.openFile, open: props.openPaths.has(f.path), treeMenu: props.treeMenu, selection: props.selection, dragStart: props.dragStart, dragEnd: props.dragEnd }, f.path));
        }
      }
      return jsxs(
        "div",
        {
          className: "fe-node",
          children: [
            jsxs("div", {
              className: "fe-node-row fe-dir" + (selected ? " fe-selected" : "") + (dragOver ? " fe-drop-target" : "") + (extDragOver ? " fe-ext-drop-target" : ""),
              style: { paddingLeft: 8 + props.depth * 12 },
              draggable: true,
              onClick: function (e) {
                if (props.selection && (e.ctrlKey || e.metaKey)) {
                  e.preventDefault();
                  e.stopPropagation();
                  props.selection.toggle(props.path);
                  return;
                }
                if (props.selection) props.selection.clear();
                props.toggle(props.path);
              },
              onDragStart: function (e) {
                var group = props.selection && props.selection.has(props.path) ? props.selection.toArray() : null;
                props.dragStart(props.path, "dir", props.name, e, group, props.selection ? props.selection.clear : null);
              },
              onDragEnd: function () { props.dragEnd(); setDragOver(false); },
              onDragOver: function (e) {
                if (props.isDragging()) {
                  e.preventDefault();
                  e.stopPropagation();
                  try { e.dataTransfer.dropEffect = "move"; } catch (err) {}
                  setDragOver(true);
                  return;
                }
                if (externalDragHasFiles(e)) {
                  e.preventDefault();
                  e.stopPropagation();
                  try { e.dataTransfer.dropEffect = "copy"; } catch (err) {}
                  setExtDragOver(true);
                }
              },
              onDragLeave: function (e) {
                if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget)) return;
                setDragOver(false);
                setExtDragOver(false);
              },
              onDrop: function (e) {
                if (props.isDragging()) {
                  e.preventDefault();
                  e.stopPropagation();
                  setDragOver(false);
                  props.dropOnDir(props.path);
                  return;
                }
                if (externalDragHasFiles(e)) {
                  e.preventDefault();
                  e.stopPropagation();
                  setExtDragOver(false);
                  props.importDataTransfer(e.dataTransfer, props.path);
                }
              },
              onContextMenu: function (e) {
                e.preventDefault();
                e.stopPropagation();
                props.treeMenu.open({ path: props.path, kind: "dir", name: props.name, x: e.clientX, y: e.clientY });
              },
              title: props.path,
              children: [
                jsx(CaretIcon, { open: isOpen }),
                jsx(FolderIcon, { size: 16 }),
                jsx("span", { className: "fe-name", children: props.name })
              ]
            }),
            children,
            isOpen && isLoading ? jsx("div", { className: "fe-loading", style: { paddingLeft: 8 + (props.depth + 1) * 12 }, children: "…" }) : null
          ]
        },
        props.path
      );
    }

    function FileTree(props) {
      var expandedState = useState(function () { return new Set([props.root]); });
      var expanded = expandedState[0];
      var setExpanded = expandedState[1];
      var cacheState = useState(function () { return new Map(); });
      var cache = cacheState[0];
      var setCache = cacheState[1];

      var loadDir = useCallback(function (dirPath) {
        setCache(function (prev) {
          var cur = prev.get(dirPath);
          if (cur && (cur.loading || cur.ok)) return prev;
          var next = new Map(prev);
          next.set(dirPath, { loading: true });
          fetchJson(listUrl(dirPath)).then(function (r) {
            setCache(function (prev2) {
              var m = new Map(prev2);
              m.set(dirPath, r);
              return m;
            });
          });
          return next;
        });
      }, []);

      useEffect(function () {
        if (props.root) loadDir(props.root);
      }, [props.root, loadDir]);

      var expandedRef = useRef(expanded);
      expandedRef.current = expanded;
      var reloadToken = props.reloadToken || 0;
      useEffect(function () {
        if (!reloadToken) return;
        setCache(function () { return new Map(); });
        var exps = Array.from(expandedRef.current);
        for (var i = 0; i < exps.length; i++) loadDir(exps[i]);
      }, [reloadToken, loadDir]);

      var toggle = useCallback(function (dirPath) {
        setExpanded(function (prev) {
          var next = new Set(prev);
          if (next.has(dirPath)) next.delete(dirPath);
          else {
            next.add(dirPath);
            loadDir(dirPath);
          }
          return next;
        });
      }, [loadDir]);

      var openList = useEditor(props.editor);
      var openPaths = useMemo(function () {
        return new Set(openList.order);
      }, [openList]);

      // ---- batch selection -------------------------------------------
      var selectState = useState(function () { return new Set(); });
      var selection = selectState[0];
      var setSelection = selectState[1];
      var selectionApi = useMemo(function () {
        return {
          has: function (p) { return selection.has(p); },
          toArray: function () { return Array.from(selection); },
          toggle: function (p) {
            setSelection(function (prev) {
              var next = new Set(prev);
              if (next.has(p)) next.delete(p);
              else next.add(p);
              return next;
            });
          },
          clear: function () { setSelection(function (prev) { return prev.size ? new Set() : prev; }); }
        };
      }, [selection]);

      return jsx("div", {
        className: "fe-tree",
        onContextMenu: function (e) {
          if (!props.treeMenu) return;
          if (e.target !== e.currentTarget) return;
          e.preventDefault();
          props.treeMenu.open({ path: props.root, kind: "root", name: basename(props.root) || props.root, x: e.clientX, y: e.clientY });
        },
        onMouseDown: function (e) {
          if (e.target === e.currentTarget && selection.size) selectionApi.clear();
        },
        onDragOver: function (e) {
          if (e.target !== e.currentTarget) return;
          if (props.isDragging()) {
            e.preventDefault();
            try { e.dataTransfer.dropEffect = "move"; } catch (err) {}
            return;
          }
          if (externalDragHasFiles(e)) {
            e.preventDefault();
            try { e.dataTransfer.dropEffect = "copy"; } catch (err) {}
          }
        },
        onDrop: function (e) {
          if (e.target !== e.currentTarget) return;
          if (props.isDragging()) {
            e.preventDefault();
            props.dropOnDir(props.root);
            return;
          }
          if (externalDragHasFiles(e)) {
            e.preventDefault();
            props.importDataTransfer(e.dataTransfer, props.root);
          }
        },
        children: jsx(DirNode, { path: props.root, name: basename(props.root) || props.root, depth: 0, expanded: expanded, cache: cache, toggle: toggle, openFile: props.openFile, openPaths: openPaths, treeMenu: props.treeMenu, selection: selectionApi, dragStart: props.dragStart, dragEnd: props.dragEnd, isDragging: props.isDragging, dropOnDir: props.dropOnDir, importDataTransfer: props.importDataTransfer }, props.root)
      });
    }

    // ---- external file import (OS clipboard / Finder drag) --------------
    function externalDragHasFiles(e) {
      try {
        var dt = e.dataTransfer;
        if (!dt || !dt.types) return false;
        for (var i = 0; i < dt.types.length; i++) {
          if (dt.types[i] === "Files") return true;
        }
      } catch (err) { /* ignore */ }
      return false;
    }

    // Walk a dropped FileSystemEntry tree into [{name, relPath, file}] pairs.
    function collectEntryFiles(entry, prefix, out) {
      return new Promise(function (resolve) {
        if (entry.isFile) {
          entry.file(function (file) {
            var rel = prefix ? prefix + "/" + file.name : file.name;
            out.push({ name: file.name, relPath: rel, file: file });
            resolve();
          }, function () { resolve(); });
          return;
        }
        if (entry.isDirectory) {
          var reader = entry.createReader();
          var subPrefix = prefix ? prefix + "/" + entry.name : entry.name;
          var all = [];
          function readBatch() {
            reader.readEntries(function (ents) {
              if (!ents || ents.length === 0) {
                var chain = Promise.resolve();
                all.forEach(function (sub) {
                  chain = chain.then(function () { return collectEntryFiles(sub, subPrefix, out); });
                });
                chain.then(resolve, resolve);
                return;
              }
              all = all.concat(Array.prototype.slice.call(ents));
              readBatch();
            }, function () { resolve(); });
          }
          readBatch();
          return;
        }
        resolve();
      });
    }

    // Extract every file we can from a clipboard/drag DataTransfer.
    function collectTransferFiles(dt) {
      return new Promise(function (resolve) {
        var out = [];
        var entries = [];
        if (dt && dt.items) {
          for (var i = 0; i < dt.items.length; i++) {
            var item = dt.items[i];
            if (item.kind !== "file") continue;
            var entry = null;
            try {
              entry = typeof item.webkitGetAsEntry === "function" ? item.webkitGetAsEntry() : null;
            } catch (err) { entry = null; }
            if (entry) {
              entries.push(entry);
            } else {
              var f = null;
              try { f = item.getAsFile(); } catch (err) { f = null; }
              if (f && out.every(function (x) { return x.file !== f; })) {
                out.push({ name: f.name, relPath: f.name, file: f });
              }
            }
          }
        }
        if (!entries.length) {
          if (dt && dt.files && dt.files.length) {
            for (var j = 0; j < dt.files.length; j++) {
              var df = dt.files[j];
              if (out.every(function (x) { return x.file !== df; })) {
                out.push({ name: df.name, relPath: df.name, file: df });
              }
            }
          }
          resolve(out);
          return;
        }
        var chain = Promise.resolve();
        entries.forEach(function (entry) {
          chain = chain.then(function () { return collectEntryFiles(entry, "", out); });
        });
        chain.then(function () { resolve(out); }, function () { resolve(out); });
      });
    }

    function postBlob(url, blob) {
      return fetch(url, { method: "POST", body: blob }).then(function (res) {
        return res.json().then(function (data) {
          if (!res.ok) return { ok: false, error: (data && data.error) || "http-" + res.status };
          return data;
        }, function () {
          return { ok: false, error: "http-" + res.status };
        });
      }, function () {
        return { ok: false, error: "network" };
      });
    }

    // ---- upload toast store ----------------------------------------------
    function createUploadStore() {
      var state = { active: false, done: 0, total: 0, current: "", failed: 0, finished: false };
      var listeners = new Set();
      var hideTimer = null;
      function notify() { listeners.forEach(function (fn) { fn(); }); }
      function set(patch) { state = Object.assign({}, state, patch); notify(); }
      return {
        getSnapshot: function () { return state; },
        subscribe: function (fn) { listeners.add(fn); return function () { listeners.delete(fn); }; },
        begin: function (total) {
          if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
          set({ active: true, done: 0, total: total, current: "", failed: 0, finished: false });
        },
        step: function (done, current, failed) {
          set({ done: done, current: current || "", failed: failed || 0 });
        },
        finish: function (okCount, failCount) {
          set({ done: state.total, failed: failCount, finished: true, current: "" });
          hideTimer = setTimeout(function () {
            hideTimer = null;
            set({ active: false });
          }, okCount > 0 ? 3200 : 5200);
        },
        fail: function () {
          set({ finished: true, failed: state.total || 1, current: "" });
          hideTimer = setTimeout(function () {
            hideTimer = null;
            set({ active: false });
          }, 5200);
        }
      };
    }

    function UploadToast(props) {
      var st = useSyncExternalStore(props.store.subscribe, props.store.getSnapshot, props.store.getSnapshot);
      useLocale();
      if (!st.active) return null;
      var pct = st.total > 0 ? Math.round((st.done / st.total) * 100) : 0;
      var status;
      if (!st.finished) {
        status = t("upload.importing", { done: st.done, total: st.total, name: st.current });
      } else {
        var okCount = st.total - st.failed;
        status = t("upload.done", { n: okCount }) + (st.failed > 0 ? " · " + t("upload.failed", { n: st.failed }) : "");
      }
      return jsxs("div", {
        className: "fe-upload-toast",
        role: "status",
        children: [
          jsx("div", { className: "fe-upload-title", children: st.current || "…" }),
          jsx("div", { className: "fe-upload-bar", children: jsx("div", { className: "fe-upload-bar-fill", style: { width: pct + "%" } }) }),
          jsx("div", { className: "fe-upload-status", children: status })
        ]
      });
    }

    // ---- code editor ----------------------------------------------------
    // ---- per-file undo/redo history ---------------------------------------
    // A controlled React textarea loses the browser's native undo stack, so
    // keep one snapshot history per file path. Edits within UNDO_GROUP_MS
    // collapse into a single stop, like VS Code's typing-burst grouping.
    var UNDO_LIMIT = 100;
    var UNDO_GROUP_MS = 400;
    var undoHistories = {};
    function historyFor(path) {
      var h = undoHistories[path];
      if (!h) h = undoHistories[path] = { undo: [], redo: [], lastPush: 0 };
      return h;
    }

    // ---- textarea editing helpers (VS Code-style keybindings) ------------
    // All helpers take the textarea's (value, selStart, selEnd) and return the
    // next { value, s, e }; the caller applies it via onChange + caret restore.
    function taState(ta) { return { value: ta.value, s: ta.selectionStart, e: ta.selectionEnd }; }

    // offset of the first column of `line` (1-based) in `value`
    function offsetOfLine(value, line) {
      var off = 0, cur = 1;
      while (cur < line) {
        var nl = value.indexOf("\n", off);
        if (nl === -1) return value.length;
        off = nl + 1;
        cur++;
      }
      return off;
    }
    function lineOfOffset(value, off) {
      var line = 1;
      for (var i = 0; i < off && i < value.length; i++) if (value[i] === "\n") line++;
      return line;
    }
    function lineStartOf(value, off) { var p = value.lastIndexOf("\n", Math.max(0, off - 1)); return p === -1 ? 0 : p + 1; }
    function lineEndOf(value, off) { var p = value.indexOf("\n", off); return p === -1 ? value.length : p; }
    // [start, end) covering every line the selection touches (whole lines)
    function selLineRange(st) {
      var a = lineStartOf(st.value, st.s);
      var b = lineEndOf(st.value, st.e);
      return [a, b];
    }

    function taIndent(st, outdent) {
      var r = selLineRange(st), a = r[0], b = r[1];
      var block = st.value.slice(a, b);
      var lines = block.split("\n");
      if (!outdent) {
        var nb = lines.map(function (l) { return "  " + l; }).join("\n");
        return { value: st.value.slice(0, a) + nb + st.value.slice(b), s: st.s + 2, e: st.e + (nb.length - block.length) };
      }
      var removedFirst = 0, removedTotal = 0;
      var out = lines.map(function (l, i) {
        var n = 0;
        if (l.slice(0, 2) === "  ") n = 2;
        else if (l[0] === " " || l[0] === "\t") n = 1;
        if (i === 0) removedFirst = n;
        removedTotal += n;
        return l.slice(n);
      }).join("\n");
      return { value: st.value.slice(0, a) + out + st.value.slice(b), s: Math.max(a, st.s - removedFirst), e: Math.max(a, st.e - removedTotal) };
    }

    function taDeleteLine(st) {
      var a = lineStartOf(st.value, st.s);
      var endNl = st.value.indexOf("\n", a);
      var b = endNl === -1 ? st.value.length : endNl + 1;
      // deleting the last line also removes the preceding newline
      if (endNl === -1 && a > 0) a = a - 1;
      var next = st.value.slice(0, a) + st.value.slice(b);
      var caret = Math.min(a, next.length);
      return { value: next, s: caret, e: caret };
    }

    function taMoveLines(st, dir) {
      var r = selLineRange(st), a = r[0], b = r[1];
      var block = st.value.slice(a, b);
      if (dir < 0) {
        if (a === 0) return null;
        var prevA = lineStartOf(st.value, a - 1);
        var prev = st.value.slice(prevA, a - 1);
        var moved = block + "\n" + prev;
        var next = st.value.slice(0, prevA) + moved + st.value.slice(b);
        var delta = prevA - a;
        return { value: next, s: st.s + delta, e: st.e + delta };
      }
      if (b >= st.value.length) return null;
      var nextEnd = lineEndOf(st.value, b + 1);
      var nextLine = st.value.slice(b + 1, nextEnd);
      var moved2 = nextLine + "\n" + block;
      var next2 = st.value.slice(0, a) + moved2 + st.value.slice(nextEnd);
      var delta2 = nextLine.length + 1;
      return { value: next2, s: st.s + delta2, e: st.e + delta2 };
    }

    function taDuplicateLines(st, dir) {
      var r = selLineRange(st), a = r[0], b = r[1];
      var block = st.value.slice(a, b);
      if (dir < 0) {
        var next = st.value.slice(0, a) + block + "\n" + block + st.value.slice(b);
        return { value: next, s: st.s, e: st.e };
      }
      var next2 = st.value.slice(0, b) + "\n" + block + st.value.slice(b);
      var delta = block.length + 1;
      return { value: next2, s: st.s + delta, e: st.e + delta };
    }

    function taInsertLine(st, above) {
      var a = lineStartOf(st.value, st.s);
      var b = lineEndOf(st.value, st.s);
      if (above) {
        var next = st.value.slice(0, a) + "\n" + st.value.slice(a);
        return { value: next, s: a, e: a };
      }
      var next2 = st.value.slice(0, b) + "\n" + st.value.slice(b);
      var caret = b + 1;
      return { value: next2, s: caret, e: caret };
    }

    var COMMENT_TOKEN = {
      js: "//", jsx: "//", mjs: "//", cjs: "//", ts: "//", tsx: "//", mts: "//", cts: "//",
      jsonc: "//", java: "//", kt: "//", c: "//", h: "//", cpp: "//", hpp: "//", cc: "//",
      cs: "//", swift: "//", go: "//", rs: "//", php: "//", scala: "//", sol: "//",
      css: "/*", scss: "//", sass: "//", less: "//",
      py: "#", sh: "#", bash: "#", zsh: "#", fish: "#", yaml: "#", yml: "#",
      toml: "#", ini: "#", cfg: "#", conf: "#", rb: "#", pl: "#", r: "#",
      sql: "--", lua: "--"
    };
    function taToggleComment(st, lang) {
      var token = COMMENT_TOKEN[lang] || "//";
      var r = selLineRange(st), a = r[0], b = r[1];
      var lines = st.value.slice(a, b).split("\n");
      var nonEmpty = lines.filter(function (l) { return l.trim() !== ""; });
      if (!nonEmpty.length) return null;
      var isBlock = token === "/*";
      var allCommented = nonEmpty.every(function (l) {
        var tr = l.trimStart();
        return isBlock ? (tr.indexOf("/*") === 0) : (tr.indexOf(token) === 0);
      });
      var out = lines.map(function (l) {
        if (l.trim() === "") return l;
        var indent = l.match(/^\s*/)[0];
        var rest = l.slice(indent.length);
        if (allCommented) {
          if (isBlock) {
            var t1 = rest.indexOf("/*") === 0 ? rest.slice(2) : rest;
            if (t1[0] === " ") t1 = t1.slice(1);
            return indent + (/\*\/\s*$/.test(t1) ? t1.replace(/\s?\*\/\s*$/, "") : t1);
          }
          var t2 = rest.indexOf(token) === 0 ? rest.slice(token.length) : rest;
          if (t2[0] === " ") t2 = t2.slice(1);
          return indent + t2;
        }
        return isBlock ? indent + "/* " + rest + " */" : indent + token + " " + rest;
      }).join("\n");
      var next = st.value.slice(0, a) + out + st.value.slice(b);
      return { value: next, s: a, e: a + out.length };
    }

    function taSelectLine(st) {
      var a = lineStartOf(st.value, st.s);
      var b = lineEndOf(st.value, st.s);
      return { value: st.value, s: a, e: b };
    }

    function taSelectWordOrNext(st) {
      var word = st.value.slice(st.s, st.e);
      if (st.s === st.e) {
        // select the word around the caret
        var re = /[A-Za-z0-9_]/;
        var a = st.s, b = st.s;
        while (a > 0 && re.test(st.value[a - 1])) a--;
        while (b < st.value.length && re.test(st.value[b])) b++;
        if (a === b) return null;
        return { value: st.value, s: a, e: b };
      }
      if (!word) return null;
      // ⌘D again: jump the selection to the next occurrence of the selection
      var idx = st.value.indexOf(word, st.e);
      if (idx === -1) idx = st.value.indexOf(word); // wrap around
      if (idx === -1 || idx === st.s) return null;
      return { value: st.value, s: idx, e: idx + word.length };
    }

    function findMatches(value, query) {
      if (!query) return [];
      var out = [];
      var lower = value.toLowerCase();
      var q = query.toLowerCase();
      var i = 0;
      while (out.length < 999) {
        var idx = lower.indexOf(q, i);
        if (idx === -1) break;
        out.push(idx);
        i = idx + Math.max(1, q.length);
      }
      return out;
    }

    function CodeEditor(props) {
      var taRef = useRef(null);
      var preRef = useRef(null);
      var findRef = useRef(null);
      var deferred = useDeferredValue(props.value);
      var tokens = useMemo(function () { return tokenize(deferred, props.lang); }, [deferred, props.lang]);

      var findState = useState({ open: false, query: "", replace: "", idx: -1, showReplace: false });
      var find = findState[0];
      var setFind = findState[1];
      var replaceRef = useRef(null);

      // caret tracked continuously so history snapshots restore sensibly
      var selRef = useRef({ s: 0, e: 0 });

      var matches = useMemo(function () {
        // computed against `deferred` so match offsets always line up with
        // the tokenized render below
        return find.open ? findMatches(deferred, find.query) : [];
      }, [find.open, find.query, deferred]);

      var onScroll = useCallback(function (e) {
        if (preRef.current) {
          preRef.current.scrollTop = e.target.scrollTop;
          preRef.current.scrollLeft = e.target.scrollLeft;
        }
      }, []);

      // snapshot the CURRENT value before an edit replaces it
      function pushHistory() {
        if (!props.path) return;
        var h = historyFor(props.path);
        var now = Date.now();
        if (now - h.lastPush < UNDO_GROUP_MS) { h.lastPush = now; return; } // extend burst
        h.lastPush = now;
        h.undo.push({ value: props.value, s: selRef.current.s, e: selRef.current.e });
        if (h.undo.length > UNDO_LIMIT) h.undo.shift();
        h.redo = [];
      }

      function restoreCaret(s, e) {
        var ta = taRef.current;
        requestAnimationFrame(function () {
          if (!ta) return;
          ta.selectionStart = s;
          ta.selectionEnd = e;
        });
      }

      function undo() {
        if (!props.path) return;
        var h = historyFor(props.path);
        if (!h.undo.length) return;
        var ta = taRef.current;
        h.redo.push({ value: props.value, s: ta ? ta.selectionStart : 0, e: ta ? ta.selectionEnd : 0 });
        var prev = h.undo.pop();
        h.lastPush = 0; // an undo is always its own stop
        props.onChange(prev.value);
        restoreCaret(prev.s, prev.e);
      }

      function redo() {
        if (!props.path) return;
        var h = historyFor(props.path);
        if (!h.redo.length) return;
        var ta = taRef.current;
        h.undo.push({ value: props.value, s: ta ? ta.selectionStart : 0, e: ta ? ta.selectionEnd : 0 });
        var next = h.redo.pop();
        h.lastPush = 0;
        props.onChange(next.value);
        restoreCaret(next.s, next.e);
      }

      function applyNext(next) {
        if (!next) return;
        pushHistory();
        props.onChange(next.value);
        restoreCaret(next.s, next.e);
      }

      function jumpToOffset(off, len, focusEditor) {
        var ta = taRef.current;
        if (!ta) return;
        if (focusEditor) ta.focus();
        ta.selectionStart = off;
        ta.selectionEnd = off + (len || 0);
        var cs = window.getComputedStyle(ta);
        var lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.6 || 20;
        var line = lineOfOffset(ta.value, off);
        ta.scrollTop = Math.max(0, (line - 1) * lh - ta.clientHeight / 3);
      }

      function openFind(withReplace) {
        var ta = taRef.current;
        var seed = find.query;
        if (ta && ta.selectionStart !== ta.selectionEnd) {
          var sel = ta.value.slice(ta.selectionStart, ta.selectionEnd);
          if (sel && sel.indexOf("\n") === -1) seed = sel;
        }
        setFind({
          open: true,
          query: seed,
          replace: find.replace,
          idx: -1,
          showReplace: withReplace != null ? !!withReplace : find.showReplace
        });
        requestAnimationFrame(function () {
          if (findRef.current) { findRef.current.focus(); findRef.current.select(); }
        });
      }

      function closeFind() {
        setFind({ open: false, query: find.query, replace: find.replace, idx: -1, showReplace: find.showReplace });
        if (taRef.current) taRef.current.focus();
      }

      function findStep(dir, q) {
        var query = q != null ? q : find.query;
        var list = findMatches(props.value, query);
        if (!list.length) { setFind(Object.assign({}, find, { query: query, idx: -1 })); return; }
        var cur = find.idx;
        // anchor at the caret on first step
        if (cur === -1 && taRef.current) {
          var caret = taRef.current.selectionStart;
          cur = -1;
          for (var i = 0; i < list.length; i++) {
            if (list[i] >= caret) { cur = dir > 0 ? i - 1 : i; break; }
          }
          if (cur === -1 && dir < 0) cur = list.length;
        }
        var nextIdx = cur === -1
          ? (dir > 0 ? 0 : list.length - 1)
          : (cur + dir + list.length) % list.length;
        setFind(Object.assign({}, find, { query: query, idx: nextIdx }));
        jumpToOffset(list[nextIdx], query.length);
      }

      // Replace the currently highlighted match, then move to the next one.
      function replaceCurrent() {
        if (!find.query) return;
        var ta = taRef.current;
        if (!ta) return;
        var s = ta.selectionStart, e = ta.selectionEnd;
        // VS Code parity: if the caret isn't sitting on a match, the first
        // click only jumps to one — the NEXT click replaces it.
        var onMatch = ta.value.slice(s, e).toLowerCase() === find.query.toLowerCase();
        if (!onMatch) { findStep(1); return; }
        pushHistory();
        var next = ta.value.slice(0, s) + find.replace + ta.value.slice(e);
        var caretAfter = s + find.replace.length;
        props.onChange(next);
        restoreCaret(caretAfter, caretAfter);
        // recompute matches against the new value and highlight the one that
        // now sits at/after the caret
        var list = findMatches(next, find.query);
        if (!list.length) { setFind(Object.assign({}, find, { idx: -1 })); return; }
        var ni = 0;
        for (var i = 0; i < list.length; i++) {
          if (list[i] >= caretAfter) { ni = i; break; }
          ni = i;
        }
        setFind(Object.assign({}, find, { idx: ni }));
        requestAnimationFrame(function () {
          var ta2 = taRef.current;
          if (!ta2) return;
          ta2.selectionStart = list[ni];
          ta2.selectionEnd = list[ni] + find.query.length;
        });
      }

      function replaceAll() {
        if (!find.query) return;
        var list = findMatches(props.value, find.query);
        if (!list.length) return;
        pushHistory();
        var lower = props.value.toLowerCase();
        var q = find.query.toLowerCase();
        var out = "";
        var pos = 0;
        for (var i = 0; i < list.length; i++) {
          out += props.value.slice(pos, list[i]) + find.replace;
          pos = list[i] + q.length;
        }
        out += props.value.slice(pos);
        props.onChange(out);
        var end = out.length;
        restoreCaret(end, end);
        setFind(Object.assign({}, find, { idx: -1 }));
      }

      // One-shot reveal requests (global-search jumps / go-to-line). Re-runs
      // when seq changes, so repeated jumps to the same line still fire.
      useEffect(function () {
        if (!props.reveal) return;
        var ta = taRef.current;
        if (!ta) return;
        var off = offsetOfLine(ta.value, props.reveal.line) + (props.reveal.col - 1);
        jumpToOffset(Math.min(off, ta.value.length), 0, true);
      }, [props.reveal && props.reveal.seq]);

      var onKeyDown = useCallback(function (e) {
        var mod = e.ctrlKey || e.metaKey;
        if (mod && (e.key === "z" || e.key === "Z") && !e.altKey) {
          // ⌘Z undo / ⇧⌘Z redo (VS Code); the native stack is unreliable in a
          // controlled textarea, so this drives the per-file history instead
          e.preventDefault();
          if (e.shiftKey) redo(); else undo();
          return;
        }
        if (mod && (e.key === "y" || e.key === "Y") && !e.shiftKey && !e.altKey) {
          // Ctrl+Y — redo (Windows convention)
          e.preventDefault();
          redo();
          return;
        }
        if (mod && (e.key === "s" || e.key === "S") && !e.altKey) {
          e.preventDefault();
          props.onSave();
          return;
        }
        if (mod && (e.key === "f" || e.key === "F") && !e.shiftKey) {
          e.preventDefault();
          openFind(e.altKey ? true : undefined); // ⌥⌘F — VS Code "replace"
          return;
        }
        if (mod && (e.key === "h" || e.key === "H") && !e.shiftKey && !e.altKey) {
          // ⌘H — replace (may be browser-reserved outside Electron; ⌥⌘F always works)
          e.preventDefault();
          openFind(true);
          return;
        }
        if (mod && (e.key === "g" || e.key === "G") && !e.altKey) {
          // VS Code: ⌘G find next / ⇧⌘G find previous (uses the find query)
          e.preventDefault();
          if (!find.open) { openFind(); return; }
          findStep(e.shiftKey ? -1 : 1);
          return;
        }
        if (mod && (e.key === "d" || e.key === "D") && !e.shiftKey && !e.altKey) {
          e.preventDefault();
          applyNext(taSelectWordOrNext(taState(e.target)));
          return;
        }
        if (mod && e.key === "/" && !e.shiftKey && !e.altKey) {
          e.preventDefault();
          applyNext(taToggleComment(taState(e.target), props.lang));
          return;
        }
        if (mod && (e.key === "l" || e.key === "L") && !e.shiftKey && !e.altKey) {
          e.preventDefault();
          applyNext(taSelectLine(taState(e.target)));
          return;
        }
        if (mod && e.key === "]" && !e.shiftKey && !e.altKey) {
          e.preventDefault();
          applyNext(taIndent(taState(e.target), false));
          return;
        }
        if (mod && e.key === "[" && !e.shiftKey && !e.altKey) {
          e.preventDefault();
          applyNext(taIndent(taState(e.target), true));
          return;
        }
        if (mod && e.shiftKey && (e.key === "k" || e.key === "K") && !e.altKey) {
          e.preventDefault();
          applyNext(taDeleteLine(taState(e.target)));
          return;
        }
        if (mod && e.key === "Enter" && !e.altKey) {
          e.preventDefault();
          applyNext(taInsertLine(taState(e.target), e.shiftKey));
          return;
        }
        if (e.altKey && !mod && (e.key === "ArrowUp" || e.key === "ArrowDown")) {
          e.preventDefault();
          var dir = e.key === "ArrowUp" ? -1 : 1;
          if (e.shiftKey) applyNext(taDuplicateLines(taState(e.target), dir));
          else applyNext(taMoveLines(taState(e.target), dir));
          return;
        }
        if (e.key === "Tab") {
          e.preventDefault();
          applyNext(taIndent(taState(e.target), e.shiftKey));
          return;
        }
        if (e.key === "Escape" && find.open) {
          e.preventDefault();
          closeFind();
          return;
        }
      }, [props, find]);

      function onFindKey(e) {
        if (e.key === "Enter") { e.preventDefault(); findStep(e.shiftKey ? -1 : 1, e.target.value); }
        else if (e.key === "Escape") { e.preventDefault(); closeFind(); }
      }

      function onReplaceKey(e) {
        if (e.key === "Enter") {
          e.preventDefault();
          if ((e.ctrlKey || e.metaKey) && e.altKey) replaceAll();
          else replaceCurrent();
        }
        else if (e.key === "Escape") { e.preventDefault(); closeFind(); }
      }

      // Render tokens, wrapping every find match in a <mark> so the highlight
      // is the matched TEXT itself — no coordinate math, always exact.
      var code;
      if (!matches.length) {
        code = tokens.map(function (t, i) {
          return t[1] ? jsx("span", { className: "tok-" + t[1], children: t[0] }, i) : t[0];
        });
      } else {
        var qlen = find.query.length;
        var pos = 0;
        var mi = 0;
        code = tokens.map(function (tk, ti) {
          var text = tk[0];
          var cls = tk[1];
          var start = pos;
          var end = pos + text.length;
          pos = end;
          while (mi < matches.length && matches[mi] + qlen <= start) mi++;
          var segs = [];
          var mj = mi;
          while (mj < matches.length && matches[mj] < end) {
            segs.push([Math.max(matches[mj], start) - start, Math.min(matches[mj] + qlen, end) - start, mj]);
            mj++;
          }
          if (!segs.length) {
            return cls ? jsx("span", { className: "tok-" + cls, children: text }, ti) : text;
          }
          var children = [];
          var p = 0;
          segs.forEach(function (sg, si) {
            if (sg[0] > p) children.push(text.slice(p, sg[0]));
            children.push(jsx("mark", {
              className: "fe-find-mark" + (sg[2] === find.idx ? " fe-find-mark-cur" : ""),
              children: text.slice(sg[0], sg[1])
            }, si));
            p = sg[1];
          });
          if (p < text.length) children.push(text.slice(p));
          return jsx("span", { className: cls ? "tok-" + cls : undefined, children: children }, ti);
        });
      }

      return jsxs("div", {
        className: "fe-editor-wrap" + (find.open ? (find.showReplace ? " fe-editor-wrap-replace" : " fe-editor-wrap-find") : ""),
        children: [
          find.open ? jsxs("div", {
            className: "fe-find",
            children: [
              jsxs("div", {
                className: "fe-find-row",
                children: [
                  jsx("button", {
                    className: "fe-find-btn",
                    title: t("find.toggleReplace"),
                    onClick: function () {
                      setFind(Object.assign({}, find, { showReplace: !find.showReplace }));
                      if (!find.showReplace) {
                        requestAnimationFrame(function () {
                          if (replaceRef.current) replaceRef.current.focus();
                        });
                      }
                    },
                    children: jsx(CaretIcon, { open: find.showReplace })
                  }),
                  jsx("input", {
                    ref: findRef,
                    className: "fe-find-input",
                    value: find.query,
                    placeholder: t("find.placeholder"),
                    spellCheck: false,
                    onChange: function (e) {
                      var q = e.target.value;
                      setFind(Object.assign({}, find, { query: q, idx: -1 }));
                      var list = findMatches(props.value, q);
                      // scroll to the first match WITHOUT moving focus out of
                      // the find box (this used to steal focus every keystroke)
                      if (list.length) {
                        setFind(Object.assign({}, find, { query: q, idx: 0 }));
                        jumpToOffset(list[0], q.length, false);
                      }
                    },
                    onKeyDown: onFindKey
                  }),
                  jsx("span", {
                    className: "fe-find-count",
                    children: find.query && matches.length === 0 ? t("find.none") : (matches.length ? ((find.idx >= 0 ? find.idx + 1 : 1) + "/" + matches.length) : "")
                  }),
                  jsx("button", { className: "fe-find-btn", title: t("find.prev"), "aria-label": t("find.prev"), onClick: function () { findStep(-1); }, children: "↑" }),
                  jsx("button", { className: "fe-find-btn", title: t("find.next"), "aria-label": t("find.next"), onClick: function () { findStep(1); }, children: "↓" }),
                  jsx("button", { className: "fe-find-btn", title: t("find.close"), "aria-label": t("find.close"), onClick: closeFind, children: "×" })
                ]
              }),
              find.showReplace ? jsxs("div", {
                className: "fe-find-row",
                children: [
                  jsx("span", { className: "fe-find-btn", style: { visibility: "hidden" }, children: " " }),
                  jsx("input", {
                    ref: replaceRef,
                    className: "fe-find-input",
                    value: find.replace,
                    placeholder: t("find.replacePlaceholder"),
                    spellCheck: false,
                    onChange: function (e) { setFind(Object.assign({}, find, { replace: e.target.value })); },
                    onKeyDown: onReplaceKey
                  }),
                  jsx("button", { className: "fe-find-btn", style: { width: "auto", padding: "0 6px" }, title: t("find.replace"), onClick: replaceCurrent, children: t("find.replace") }),
                  jsx("button", { className: "fe-find-btn", style: { width: "auto", padding: "0 6px" }, title: t("find.replaceAll"), onClick: replaceAll, children: t("find.replaceAll") })
                ]
              }) : null
            ]
          }) : null,
          jsx("pre", { ref: preRef, className: "fe-editor-pre", "aria-hidden": true, children: jsx("code", { className: "fe-editor-code", children: [code, "\n"] }) }),
          jsx("textarea", {
            ref: taRef,
            className: "fe-editor-ta",
            value: props.value,
            wrap: "off",
            spellCheck: false,
            autoCorrect: "off",
            autoCapitalize: "off",
            onChange: function (e) { pushHistory(); props.onChange(e.target.value); },
            onSelect: function (e) { selRef.current = { s: e.target.selectionStart, e: e.target.selectionEnd }; },
            onScroll: onScroll,
            onKeyDown: onKeyDown,
            onBlur: props.onBlur
          })
        ]
      });
    }

    // ---- markdown view (read / edit / split) ---------------------------
    function mdToolbarBtn(id, label, mode, set) {
      return jsx("button", {
        className: "fe-md-toolbar-btn" + (mode === id ? " fe-md-toolbar-btn-active" : ""),
        onClick: function () { set(id); },
        children: label
      }, id);
    }

    function scrollToHeading(id) {
      var el = document.getElementById(id);
      if (el) {
        try { el.scrollIntoView({ behavior: "smooth", block: "start" }); } catch (err) { el.scrollIntoView(); }
      }
    }

    function computeActiveHeading(headings) {
      var activeId = null;
      var threshold = 120;
      for (var i = 0; i < headings.length; i++) {
        var el = document.getElementById(headings[i].id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= threshold) {
          activeId = headings[i].id;
        } else {
          break;
        }
      }
      return activeId;
    }

    function MdOutline(props) {
      var headings = props.headings || [];
      var activeState = useState(null);
      var activeId = activeState[0];
      var setActiveId = activeState[1];

      useEffect(function () {
        if (headings.length === 0) return;
        var raf = 0;
        function update() {
          raf = 0;
          setActiveId(computeActiveHeading(headings));
        }
        function onScroll() {
          if (!raf) raf = requestAnimationFrame(update);
        }
        document.addEventListener("scroll", onScroll, true);
        window.addEventListener("scroll", onScroll);
        window.addEventListener("resize", onScroll);
        update();
        return function () {
          document.removeEventListener("scroll", onScroll, true);
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onScroll);
          if (raf) cancelAnimationFrame(raf);
        };
      }, [headings]);

      if (headings.length === 0) return null;
      return jsxs("div", {
        className: "fe-md-outline",
        children: [
          jsxs("div", {
            className: "fe-md-outline-rail",
            children: headings.map(function (h) {
              return jsx("span", {
                className: "fe-md-outline-dot" + (h.id === activeId ? " fe-md-outline-dot-active" : "")
              }, h.id);
            })
          }),
          jsxs("div", {
            className: "fe-md-outline-pop",
            children: [
              jsx("div", { className: "fe-md-outline-title", children: t("md.outline") }),
              jsxs("div", {
                className: "fe-md-outline-list",
                children: headings.map(function (h) {
                  return jsx("button", {
                    className: "fe-md-outline-item" + (h.id === activeId ? " fe-md-outline-item-active" : ""),
                    style: { paddingLeft: 10 + (h.level - 1) * 12 },
                    onClick: function () { scrollToHeading(h.id); },
                    children: h.text
                  }, h.id);
                })
              })
            ]
          })
        ]
      });
    }

    function MarkdownView(props) {
      var doc = props.doc;
      useLocale();
      var modeState = useState(function () {
        try {
          var m = localStorage.getItem("dsh-plugin-file-explorer.mdmode");
          return m === "edit" || m === "split" || m === "read" ? m : "read";
        } catch (err) { return "read"; }
      });
      var mode = modeState[0];
      var setMode = modeState[1];
      var setModePersist = useCallback(function (m) {
        setMode(m);
        try { localStorage.setItem("dsh-plugin-file-explorer.mdmode", m); } catch (err) {}
      }, []);

      var fracState = useState(0.5);
      var frac = fracState[0];
      var setFrac = fracState[1];

      var onDividerDown = useCallback(function (e) {
        e.preventDefault();
        var wrap = e.currentTarget.parentNode;
        function onMove(ev) {
          var rect = wrap.getBoundingClientRect();
          var f = (ev.clientX - rect.left) / Math.max(1, rect.width);
          setFrac(Math.max(0.2, Math.min(0.8, f)));
        }
        function onUp() {
          window.removeEventListener("pointermove", onMove);
          window.removeEventListener("pointerup", onUp);
          document.body.style.cursor = "";
        }
        document.body.style.cursor = "col-resize";
        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", onUp);
      }, [frac]);

      var deferred = useDeferredValue(doc.content);
      var rendered = useMemo(function () {
        return renderMarkdown(deferred, doc.path);
      }, [deferred, doc.path]);
      var preview = jsx("div", { className: "fe-md-body", children: rendered.elements });
      var outline = jsx(MdOutline, { headings: rendered.headings });

      var editor = doc.truncated
        ? jsx("div", { className: "fe-editor-empty", children: t("editor.tooLargeReadonly", { size: formatSize(doc.size) }) })
        : jsx(CodeEditor, {
            value: doc.content,
            lang: "markdown",
            path: doc.path,
            reveal: doc.reveal,
            onChange: function (v) { props.store.update(doc.path, v); },
            onSave: function () { props.store.save(doc.path); },
            onBlur: props.settings && props.settings.mode === "blur" ? function () { props.store.saveIfDirty(doc.path); } : undefined
          });

      var body;
      if (mode === "edit") {
        body = editor;
      } else if (mode === "split") {
        body = jsxs("div", {
          className: "fe-md-split",
          children: [
            jsx("div", { className: "fe-md-split-pane", style: { flexGrow: frac }, children: editor }),
            jsx("div", { className: "fe-md-divider", onPointerDown: onDividerDown }),
            jsx("div", { className: "fe-md-split-pane", style: { flexGrow: 1 - frac }, children: jsx("div", { className: "fe-md-scroll", children: preview }) })
          ]
        });
      } else {
        body = jsxs("div", {
          className: "fe-md-read",
          children: [
            jsx("div", { className: "fe-md-scroll", children: preview }),
            outline
          ]
        });
      }

      return jsxs("div", {
        className: "fe-md",
        children: [
          jsxs("div", {
            className: "fe-md-toolbar",
            children: [
              mdToolbarBtn("read", t("md.read"), mode, setModePersist),
              mdToolbarBtn("edit", t("md.edit"), mode, setModePersist),
              mdToolbarBtn("split", t("md.split"), mode, setModePersist)
            ]
          }),
          body
        ]
      });
    }

    // ---- file view (one per open file, mounted when that tab is active) --
    function FileBody(props) {
      var doc = props.doc;
      if (!doc) return jsx("div", { className: "fe-editor-empty", children: t("editor.loading") });
      if (doc.phase === "loading") return jsx("div", { className: "fe-editor-empty", children: t("editor.loading") });
      if (doc.phase === "error") return jsx("div", { className: "fe-editor-empty fe-error", children: t("editor.readError", { error: doc.error }) });
      if (doc.binary) {
        if (isImageName(doc.name)) return jsx("img", { className: "fe-editor-img", src: rawUrl(doc.path), alt: doc.name });
        return jsx("div", { className: "fe-editor-empty", children: t("editor.binary", { size: formatSize(doc.size) }) });
      }
      if (isMarkdownName(doc.name)) {
        return jsx(MarkdownView, { doc: doc, store: props.store, settings: props.settings });
      }
      if (doc.truncated) return jsx("div", { className: "fe-editor-empty", children: t("editor.tooLarge", { size: formatSize(doc.size) }) });
      return jsx(CodeEditor, {
        value: doc.content,
        lang: doc.lang,
        path: doc.path,
        reveal: doc.reveal,
        onChange: function (v) { props.store.update(doc.path, v); },
        onSave: function () { props.store.save(doc.path); },
        onBlur: props.settings && props.settings.mode === "blur" ? function () { props.store.saveIfDirty(doc.path); } : undefined
      });
    }

    function FileStatusBar(props) {
      var doc = props.doc;
      if (!doc) return null;
      var dirty = doc.phase === "done" && doc.content !== doc.savedContent;
      return jsxs("div", {
        className: "fe-statusbar",
        children: [
          jsx("span", { children: doc.lang }),
          jsx("span", { children: doc.binary ? formatSize(doc.size) : (doc.content ? t("editor.lines", { n: doc.content.split("\n").length }) : "") }),
          jsx("span", { className: "fe-spacer" }),
          dirty ? jsx("span", { className: "fe-dirty", children: t("editor.dirty") }) : jsx("span", { children: t("editor.saved") }),
          jsx("span", { children: t("editor.saveHint") })
        ]
      });
    }

    function FileView(props) {
      var state = useEditor(props.editor);
      var doc = state.docs[props.filePath];
      var dirty = doc && doc.phase === "done" && doc.content !== doc.savedContent;
      useLocale();
      var fontStyle = state.settings && state.settings.fontFamily
        ? { "--fe-editor-font": state.settings.fontFamily }
        : undefined;

      useLayoutEffect(function () {
        document.body.setAttribute("data-fe-file-active", "1");
        return function () {
          document.body.removeAttribute("data-fe-file-active");
        };
      }, []);

      return jsxs("div", {
        className: "fe-editor",
        style: fontStyle,
        children: [
          jsxs("div", {
            className: "fe-file-bar",
            children: [
              jsx(FileIcon, { name: props.fileName, size: 14 }),
              jsx("span", { className: "fe-file-bar-name", title: props.filePath, children: props.fileName }),
              dirty ? jsx("span", { className: "fe-file-bar-dirty", children: "●" }) : null,
              jsx("span", { className: "fe-file-bar-spacer" }),
              jsx("button", { className: "fe-file-bar-close", title: t("editor.close"), onClick: props.onClose, children: "×" })
            ]
          }),
          jsx(FileBody, { doc: doc, store: props.editor, settings: state.settings }),
          jsx(FileStatusBar, { doc: doc })
        ]
      });
    }

    // Renders the editor as a fixed overlay while the session is blank (no
    // message sent yet), because the conversation view ring isn't mounted in
    // that state. Once the session engages (first message), it hands the file
    // back to the view ring via switchView and clears itself.
    function BlankFileOverlay(props) {
      var active = useSyncExternalStore(props.standalone.subscribe, props.standalone.getSnapshot, props.standalone.getSnapshot);
      var currentId = props.useSessions(function (s) { return s.current; });
      var byId = props.useSessions(function (s) { return s.byId; });

      var blank = true;
      if (currentId != null && byId && byId[currentId]) {
        blank = byId[currentId].blank === true;
      }

      var sameSession = !!active && String(active.sessionId) === String(currentId);

      useLayoutEffect(function () {
        if (!active) return;
        if (!sameSession) {
          // Switched to another session — drop the stale overlay without
          // forcing the file onto the new session's view ring.
          props.standalone.set(null);
          return;
        }
        if (!blank) {
          // This same session just engaged (first message sent): hand the
          // file back to the now-mounted view ring and clear the overlay.
          props.switchView("file:" + active.path);
          props.standalone.set(null);
        }
      }, [blank, active, sameSession, props]);

      if (!sameSession || !blank || !active) return null;

      return jsx("div", {
        className: "fe-standalone",
        children: jsx(FileView, {
          editor: props.editor,
          filePath: active.path,
          fileName: active.name,
          onClose: function () {
            props.standalone.set(null);
            props.closeFile(active.path);
          }
        })
      });
    }

    // ---- right activity bar + sidebar ----------------------------------
    function WorkspaceSidebar(props) {
      var viewState = useState("files");
      var viewId = viewState[0];
      var setViewId = viewState[1];
      var widthState = useState(280);
      var sidebarWidth = widthState[0];
      var setSidebarWidth = widthState[1];
      var settingsState = useState(false);
      var showSettings = settingsState[0];
      var setShowSettings = settingsState[1];
      var extDropState = useState(false);
      var extDropActive = extDropState[0];
      var setExtDropActive = extDropState[1];
      useLocale();

      var onResizeStart = useCallback(function (e) {
        e.preventDefault();
        var startX = e.clientX;
        var startW = sidebarWidth;
        function onMove(ev) {
          var w = startW - (ev.clientX - startX);
          w = Math.max(200, Math.min(560, Math.round(w)));
          setSidebarWidth(w);
        }
        function onUp() {
          window.removeEventListener("pointermove", onMove);
          window.removeEventListener("pointerup", onUp);
          document.body.style.cursor = "";
          delete document.body.dataset.feResizing;
        }
        document.body.style.cursor = "col-resize";
        document.body.dataset.feResizing = "1";
        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", onUp);
      }, [sidebarWidth]);

      var currentId = props.useSessions(function (s) { return s.current; });
      var byId = props.useSessions(function (s) { return s.byId; });
      var items = props.useWorkspaces(function (s) { return s.items; });
      var recentId = props.useWorkspaces(function (s) { return s.recentWorkspaceId; });

      var root = useMemo(function () {
        var c = currentId && byId ? byId[currentId] : undefined;
        if (c && c.cwd) return c.cwd;
        var recent = items ? items.find(function (w) { return w.workspaceId === recentId; }) : undefined;
        if (recent && recent.path) return recent.path;
        if (items && items[0] && items[0].path) return items[0].path;
        return null;
      }, [currentId, byId, items, recentId]);

      useLayoutEffect(function () {
        document.body.dataset.feSidebar = viewId ? "open" : "rail";
        document.body.style.setProperty("--fe-sidebar-width", sidebarWidth + "px");
        return function () {
          delete document.body.dataset.feSidebar;
          document.body.style.removeProperty("--fe-sidebar-width");
        };
      }, [viewId, sidebarWidth]);

      // Shared activity rail: <body data-activity> is the single source of
      // truth for which 44px rail panel is open ("files" | "git" | "").  Both
      // plugins write it on click and watch it via MutationObserver, so only
      // one sidebar can be open at a time (VS Code left-rail feel).
      function setActivity(sig) {
        if (document.body.dataset.activity !== sig) document.body.dataset.activity = sig;
      }
      useLayoutEffect(function () {
        setActivity(viewId ? "files" : "");
      }, []);
      useLayoutEffect(function () {
        function onSignal() {
          var sig = document.body.dataset.activity;
          setViewId(function (cur) {
            var next = sig === "files";
            return next ? (cur === null ? "files" : cur) : (cur === null ? cur : null);
          });
        }
        onSignal();
        var mo = new MutationObserver(function (muts) {
          for (var i = 0; i < muts.length; i++) {
            if (muts[i].type === "attributes" && muts[i].attributeName === "data-activity") {
              onSignal();
              break;
            }
          }
        });
        mo.observe(document.body, { attributes: true, attributeFilter: ["data-activity"] });
        return function () { mo.disconnect(); };
      }, []);

      // ⌘⇧F / global "open search" requests land here (dispatched by the
      // keyboard shortcut in apply)
      useEffect(function () {
        function onOpenSearch() {
          setViewId("search");
          setActivity("files");
        }
        document.addEventListener("fe:open-search", onOpenSearch);
        return function () { document.removeEventListener("fe:open-search", onOpenSearch); };
      }, []);

      var views = [
        { id: "files", label: t("activity.files"), icon: ExplorerIcon },
        { id: "search", label: t("activity.search"), icon: RailSearchIcon }
      ];
      var treeState = useSyncExternalStore(props.tree.subscribe, props.tree.getSnapshot, props.tree.getSnapshot);
      var reloadToken = treeState.reloadToken;

      return jsxs(Fragment, {
        children: [
          jsx("div", {
            className: "fe-activity",
            children: views.map(function (v) {
              return jsx("button", {
                className: "fe-activity-btn" + (viewId === v.id ? " fe-active" : ""),
                title: v.label,
                onClick: function () {
                  setViewId(viewId === v.id ? null : v.id);
                  setActivity(viewId === v.id ? "" : "files");
                },
                children: jsx(v.icon, {})
              }, v.id);
            })
          }),
          jsxs("div", {
            className: "fe-sidebar" + (viewId ? "" : " fe-sidebar-closed") + (extDropActive ? " fe-ext-drop" : ""),
            onDragOver: function (e) {
              if (!root || !externalDragHasFiles(e)) return;
              e.preventDefault();
              try { e.dataTransfer.dropEffect = "copy"; } catch (err) {}
              setExtDropActive(true);
            },
            onDragLeave: function (e) {
              if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget)) return;
              setExtDropActive(false);
            },
            onDrop: function (e) {
              setExtDropActive(false);
              if (!root || !externalDragHasFiles(e)) return;
              e.preventDefault();
              props.importDataTransfer(e.dataTransfer, root);
            },
            children: [
              jsx("div", { className: "fe-sidebar-resize", onPointerDown: onResizeStart }),
              jsxs("div", {
                className: "fe-sidebar-header",
                children: [
                  jsx("span", {
                    className: "fe-sidebar-title",
                    children: viewId === "search" ? t("activity.search") : (showSettings ? t("sidebar.settings") : t("sidebar.explorer"))
                  }),
                  jsx("span", { className: "fe-sidebar-header-spacer" }),
                  viewId !== "search" && jsx("button", {
                    className: "fe-settings-btn",
                    title: t("search.title"),
                    onClick: props.openSearch,
                    children: jsx(SearchIcon, {})
                  }),
                  viewId !== "search" && jsx("button", {
                    className: "fe-settings-btn" + (showSettings ? " fe-settings-btn-active" : ""),
                    title: t("settings.autoSaveTip"),
                    onClick: function () { setShowSettings(!showSettings); },
                    children: jsx(GearIcon, {})
                  })
                ]
              }),
              viewId === "search"
                ? jsx(SearchPanel, { store: props.gsearch, root: root, openMatch: props.openMatch, active: viewId === "search" })
                : showSettings
                  ? jsx(SettingsPanel, { editor: props.editor })
                  : (root
                      ? jsx(FileTree, { root: root, editor: props.editor, openFile: props.openFile, treeMenu: props.treeMenu, reloadToken: reloadToken, dragStart: props.dragStart, dragEnd: props.dragEnd, isDragging: props.isDragging, dropOnDir: props.dropOnDir, importDataTransfer: props.importDataTransfer }, root)
                      : jsx("div", { className: "fe-empty", children: t("sidebar.empty") }))
            ]
          }),
          jsx(UploadToast, { store: props.uploads }),
          jsx(TabContextMenu, { menu: props.menu, editor: props.editor, actions: props.actions }),
          jsx(TreeContextMenu, { treeMenu: props.treeMenu, fsOps: props.fsOps }),
          jsx(ConfirmDialog, { confirm: props.confirm }),
          jsx(PromptDialog, { prompt: props.prompt }),
          jsx(QuickOpenPalette, { store: props.quickOpen, openFile: props.openFile, gotoLine: props.gotoLine })
        ]
      });
    }

    // ---- tab context menu / confirm / settings -------------------------
    function createMenuStore() {
      var state = { open: false, path: null, x: 0, y: 0 };
      var listeners = new Set();
      function notify() { listeners.forEach(function (fn) { fn(); }); }
      return {
        getSnapshot: function () { return state; },
        subscribe: function (fn) { listeners.add(fn); return function () { listeners.delete(fn); }; },
        open: function (path, x, y) { state = { open: true, path: path, x: x, y: y }; notify(); },
        close: function () { state = { open: false, path: null, x: 0, y: 0 }; notify(); }
      };
    }

    function createConfirmStore() {
      var state = { open: false, title: "", message: "", buttons: [] };
      var listeners = new Set();
      function notify() { listeners.forEach(function (fn) { fn(); }); }
      return {
        getSnapshot: function () { return state; },
        subscribe: function (fn) { listeners.add(fn); return function () { listeners.delete(fn); }; },
        open: function (opts) { state = { open: true, title: opts.title || "", message: opts.message, buttons: opts.buttons }; notify(); },
        close: function () { state = { open: false, title: "", message: "", buttons: [] }; notify(); }
      };
    }

    function createTreeMenuStore() {
      var state = { open: false, x: 0, y: 0, path: null, kind: "file", name: "" };
      var listeners = new Set();
      function notify() { listeners.forEach(function (fn) { fn(); }); }
      return {
        getSnapshot: function () { return state; },
        subscribe: function (fn) { listeners.add(fn); return function () { listeners.delete(fn); }; },
        open: function (opts) { state = { open: true, x: opts.x, y: opts.y, path: opts.path, kind: opts.kind, name: opts.name }; notify(); },
        close: function () { state = { open: false, x: 0, y: 0, path: null, kind: "file", name: "" }; notify(); }
      };
    }

    function createPromptStore() {
      var state = { open: false, title: "", value: "", placeholder: "", onSubmit: null };
      var listeners = new Set();
      function notify() { listeners.forEach(function (fn) { fn(); }); }
      return {
        getSnapshot: function () { return state; },
        subscribe: function (fn) { listeners.add(fn); return function () { listeners.delete(fn); }; },
        open: function (opts) { state = { open: true, title: opts.title, value: opts.value || "", placeholder: opts.placeholder || "", onSubmit: opts.onSubmit }; notify(); },
        close: function () { state = { open: false, title: "", value: "", placeholder: "", onSubmit: null }; notify(); }
      };
    }

    function createTreeStore() {
      var state = { reloadToken: 0 };
      var listeners = new Set();
      function notify() { listeners.forEach(function (fn) { fn(); }); }
      return {
        getSnapshot: function () { return state; },
        subscribe: function (fn) { listeners.add(fn); return function () { listeners.delete(fn); }; },
        reload: function () { state = { reloadToken: state.reloadToken + 1 }; notify(); }
      };
    }

    function GearIcon() {
      var lines = [[4, 21, 4, 14], [4, 10, 4, 3], [12, 21, 12, 12], [12, 8, 12, 3], [20, 21, 20, 16], [20, 12, 20, 3], [1, 14, 7, 14], [9, 8, 15, 8], [17, 16, 23, 16]];
      return jsx("svg", {
        width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
        strokeWidth: 2, strokeLinecap: "round", "aria-hidden": true,
        children: lines.map(function (l, i) { return jsx("line", { x1: l[0], y1: l[1], x2: l[2], y2: l[3] }, i); })
      });
    }

    function dirtyOf(doc) {
      return !!doc && doc.phase === "done" && !doc.binary && doc.content !== doc.savedContent;
    }

    function SearchIcon(props) {
      var size = (props && props.size) || 14;
      return jsx("svg", {
        width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
        strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true,
        children: jsxs(Fragment, { children: [
          jsx("circle", { cx: 11, cy: 11, r: 7 }),
          jsx("line", { x1: 21, y1: 21, x2: 16.5, y2: 16.5 })
        ] })
      });
    }
    // Rail variant: match ExplorerIcon's 20px so both activity buttons read
    // at the same visual weight.
    function RailSearchIcon() {
      return jsx(SearchIcon, { size: 20 });
    }

    function fuzzyScore(q, s) {
      q = q.toLowerCase();
      s = s.toLowerCase();
      var score = 0;
      var qi = 0;
      var last = -2;
      for (var i = 0; i < s.length && qi < q.length; i++) {
        if (s[i] === q[qi]) {
          score += (i === last + 1 ? 6 : 1);
          if (i === 0 || "/-_. ".indexOf(s[i - 1]) !== -1) score += 4;
          last = i;
          qi++;
        }
      }
      return qi === q.length ? score : -1;
    }

    function createQuickOpenStore() {
      var state = { open: false, query: "", files: [], loading: false, truncated: false };
      var listeners = new Set();
      function notify() { listeners.forEach(function (fn) { fn(); }); }
      function set(patch) { state = Object.assign({}, state, patch); notify(); }
      return {
        getSnapshot: function () { return state; },
        subscribe: function (fn) { listeners.add(fn); return function () { listeners.delete(fn); }; },
        open: function () { set({ open: true, query: "", files: [], loading: true, truncated: false }); },
        close: function () { set({ open: false }); },
        setQuery: function (q) { set({ query: q }); },
        setFiles: function (files, truncated) { set({ files: files || [], loading: false, truncated: !!truncated }); }
      };
    }

    function QuickOpenPalette(props) {
      var st = useSyncExternalStore(props.store.subscribe, props.store.getSnapshot, props.store.getSnapshot);
      var inputRef = useRef(null);
      var listRef = useRef(null);
      var selState = useState(0);
      var selRaw = selState[0];
      var setSel = selState[1];

      // ":<n>" — VS Code go-to-line: works on the currently open file
      var gotoLine = /^:(\d+)$/.test(st.query.trim()) ? parseInt(st.query.trim().slice(1), 10) : 0;

      useLayoutEffect(function () {
        if (!st.open) return;
        setSel(0);
        var el = inputRef.current;
        if (el) { el.focus(); el.select(); }
      }, [st.open]);

      var results = useMemo(function () {
        var q = st.query.trim();
        var files = st.files;
        if (!q) return files.slice(0, 200);
        var ql = q.toLowerCase();
        var scored = [];
        for (var i = 0; i < files.length; i++) {
          var f = files[i];
          var sc = fuzzyScore(q, f.name);
          if (sc < 0) sc = fuzzyScore(q, f.rel);
          if (sc >= 0) scored.push({ f: f, s: sc });
        }
        scored.sort(function (a, b) {
          var an = a.f.name.toLowerCase();
          var bn = b.f.name.toLowerCase();
          if (an === ql) return -1;
          if (bn === ql) return 1;
          if (b.s !== a.s) return b.s - a.s;
          var al = a.f.rel.length, bl = b.f.rel.length;
          if (al !== bl) return al - bl;
          return a.f.rel.localeCompare(b.f.rel);
        });
        return scored.slice(0, 100).map(function (x) { return x.f; });
      }, [st.query, st.files]);

      if (!st.open) return null;

      var sel = Math.min(selRaw, Math.max(0, results.length - 1));

      function scrollSel() {
        var list = listRef.current;
        if (!list) return;
        var items = list.querySelectorAll(".fe-qo-item");
        var cur = items[sel];
        if (cur && cur.scrollIntoView) { try { cur.scrollIntoView({ block: "nearest" }); } catch (err) { cur.scrollIntoView(); } }
      }

      function pick(f) {
        props.store.close();
        props.openFile(f.path, f.name);
      }

      function onKeyDown(e) {
        if (e.key === "Escape") { props.store.close(); }
        else if (gotoLine && e.key === "Enter") {
          e.preventDefault();
          props.store.close();
          if (props.gotoLine) props.gotoLine(gotoLine);
        }
        else if (e.key === "ArrowDown") { e.preventDefault(); setSel(Math.min(sel + 1, results.length - 1)); }
        else if (e.key === "ArrowUp") { e.preventDefault(); setSel(Math.max(sel - 1, 0)); }
        else if (e.key === "Enter") {
          e.preventDefault();
          var f = results[sel];
          if (f) pick(f);
        }
      }

      return jsx("div", {
        className: "fe-qo-overlay",
        onMouseDown: function (e) { if (e.target === e.currentTarget) props.store.close(); },
        children: jsxs("div", {
          className: "fe-qo",
          children: [
            jsx("input", {
              ref: inputRef,
              className: "fe-qo-input",
              placeholder: t("search.placeholder"),
              value: st.query,
              spellCheck: false,
              autoComplete: "off",
              onChange: function (e) { props.store.setQuery(e.target.value); setSel(0); },
              onKeyDown: onKeyDown
            }),
            gotoLine
              ? jsxs("button", {
                  className: "fe-qo-item fe-qo-item-sel",
                  onClick: function () { props.store.close(); if (props.gotoLine) props.gotoLine(gotoLine); },
                  children: [
                    jsx("span", { className: "fe-qo-name", children: t("qo.gotoLine", { n: gotoLine }) })
                  ]
                })
              : st.loading
              ? jsx("div", { className: "fe-qo-empty", children: t("search.loading") })
              : results.length === 0
                ? jsx("div", { className: "fe-qo-empty", children: t("search.empty") })
                : jsxs("div", {
                    className: "fe-qo-list",
                    ref: listRef,
                    children: results.map(function (f, i) {
                      return jsxs("button", {
                        className: "fe-qo-item" + (i === sel ? " fe-qo-item-sel" : ""),
                        onMouseEnter: function () { setSel(i); },
                        onClick: function () { pick(f); },
                        children: [
                          jsx(FileIcon, { name: f.name, size: 14 }),
                          jsx("span", { className: "fe-qo-name", children: f.name }),
                          jsx("span", { className: "fe-qo-rel", children: f.rel })
                        ]
                      }, f.path);
                    })
                  })
          ]
        })
      });
    }

    // ---- global content search (VS Code-style search view) ---------------
    function createSearchStore() {
      var state = {
        query: "", case: false, word: false, regex: false,
        results: [], filesCount: 0, matchCount: 0,
        searching: false, searched: false, truncated: false, error: null
      };
      var listeners = new Set();
      var seq = 0;
      function notify() { listeners.forEach(function (fn) { fn(); }); }
      function set(patch) { state = Object.assign({}, state, patch); notify(); }
      return {
        getSnapshot: function () { return state; },
        subscribe: function (fn) { listeners.add(fn); return function () { listeners.delete(fn); }; },
        setQuery: function (q) { set({ query: q }); },
        toggle: function (key) {
          var patch = {};
          patch[key] = !state[key];
          set(patch);
        },
        // seq-guarded: stale responses (slower earlier queries) are dropped
        search: function (root) {
          var q = state.query;
          if (!root || !q.trim()) {
            set({ results: [], filesCount: 0, matchCount: 0, searching: false, searched: false, truncated: false, error: null });
            return;
          }
          var my = ++seq;
          set({ searching: true, error: null });
          fetchJson(searchUrl(root, q, { case: state.case, word: state.word, regex: state.regex })).then(function (r) {
            if (my !== seq) return;
            if (!r || !r.ok) {
              set({ searching: false, searched: true, results: [], filesCount: 0, matchCount: 0, truncated: false, error: (r && r.error) || "search-failed" });
              return;
            }
            var results = r.results || [];
            var matches = 0;
            results.forEach(function (f) { matches += f.matches.length; });
            set({ searching: false, searched: true, results: results, filesCount: results.length, matchCount: matches, truncated: !!r.truncated, error: null });
          }, function () {
            if (my !== seq) return;
            set({ searching: false, searched: true, results: [], filesCount: 0, matchCount: 0, truncated: false, error: "search-failed" });
          });
        }
      };
    }

    // Render one result line with the matched ranges highlighted
    function highlightRanges(text, ranges) {
      if (!ranges || !ranges.length) return text;
      var out = [];
      var pos = 0;
      for (var i = 0; i < ranges.length; i++) {
        var a = ranges[i][0], b = ranges[i][1];
        if (a > pos) out.push(text.slice(pos, a));
        out.push(jsx("mark", { className: "fe-gsearch-mark", children: text.slice(a, b) }, i));
        pos = b;
      }
      if (pos < text.length) out.push(text.slice(pos));
      return out;
    }

    function SearchPanel(props) {
      var st = useSyncExternalStore(props.store.subscribe, props.store.getSnapshot, props.store.getSnapshot);
      var inputRef = useRef(null);
      var collapsedState = useState({});
      var collapsed = collapsedState[0];
      var setCollapsed = collapsedState[1];
      useLocale();

      // focus the input whenever the search view is (re)opened
      useEffect(function () {
        if (props.active && inputRef.current) inputRef.current.focus();
      }, [props.active]);

      // debounced search-as-you-type (VS Code behavior); Enter searches now
      var runSearch = props.store.search;
      useEffect(function () {
        if (!st.query.trim()) { runSearch(props.root); return; }
        var timer = setTimeout(function () { runSearch(props.root); }, 300);
        return function () { clearTimeout(timer); };
      }, [st.query, st.case, st.word, st.regex, props.root]);

      function toggleFile(p) {
        var next = Object.assign({}, collapsed);
        next[p] = !next[p];
        setCollapsed(next);
      }

      function optionBtn(key, label, title) {
        return jsx("button", {
          type: "button",
          className: "fe-gsearch-opt" + (st[key] ? " fe-gsearch-opt-on" : ""),
          title: title,
          "aria-label": title,
          onClick: function () { props.store.toggle(key); },
          children: label
        }, key);
      }

      var body = null;
      if (st.searching && !st.searched) {
        body = jsx("div", { className: "fe-gsearch-empty", children: t("gsearch.searching") });
      } else if (!st.query.trim()) {
        body = jsx("div", { className: "fe-gsearch-empty", children: t("gsearch.hint") });
      } else if (st.error) {
        body = jsx("div", { className: "fe-gsearch-empty fe-error", children: st.error === "bad-regex" ? t("gsearch.badRegex") : t("error.generic", { error: st.error }) });
      } else if (st.searched && st.results.length === 0) {
        body = jsx("div", { className: "fe-gsearch-empty", children: t("gsearch.none") });
      } else if (st.results.length > 0) {
        body = jsxs(Fragment, {
          children: [
            jsxs("div", {
              className: "fe-gsearch-summary",
              children: [
                jsx("span", { children: t("gsearch.results", { count: st.matchCount, files: st.filesCount }) }),
                st.truncated ? jsx("span", { className: "fe-gsearch-trunc", children: t("gsearch.truncated") }) : null,
                st.searching ? jsx("span", { children: "…" }) : null
              ]
            }),
            jsx("div", {
              className: "fe-gsearch-list",
              children: st.results.map(function (f) {
                var isCollapsed = !!collapsed[f.path];
                return jsxs("div", {
                  className: "fe-gsearch-file",
                  children: [
                    jsxs("button", {
                      type: "button",
                      className: "fe-gsearch-file-head",
                      onClick: function () { toggleFile(f.path); },
                      children: [
                        jsx(CaretIcon, { open: !isCollapsed }),
                        jsx(FileIcon, { name: f.name, size: 14 }),
                        jsx("span", { className: "fe-gsearch-file-name", children: f.name }),
                        jsx("span", { className: "fe-gsearch-file-rel", title: f.rel, children: dirnameOf(f.rel) }),
                        jsx("span", { className: "fe-gsearch-file-count", children: f.matches.length })
                      ]
                    }),
                    isCollapsed ? null : f.matches.map(function (m, i) {
                      return jsxs("button", {
                        type: "button",
                        className: "fe-gsearch-match",
                        title: f.rel + ":" + m.line,
                        onClick: function () {
                          var col = m.ranges && m.ranges[0] ? m.ranges[0][0] + 1 : 1;
                          props.openMatch(f.path, f.name, m.line, col);
                        },
                        children: [
                          jsx("span", { className: "fe-gsearch-ln", children: m.line }),
                          jsx("span", { className: "fe-gsearch-text", children: highlightRanges(m.text, m.ranges) })
                        ]
                      }, f.path + ":" + m.line + ":" + i);
                    })
                  ]
                }, f.path);
              })
            })
          ]
        });
      }

      return jsxs("div", {
        className: "fe-gsearch",
        children: [
          jsxs("div", {
            className: "fe-gsearch-input-row",
            children: [
              jsx("input", {
                ref: inputRef,
                className: "fe-gsearch-input",
                value: st.query,
                placeholder: t("gsearch.placeholder"),
                spellCheck: false,
                autoComplete: "off",
                onChange: function (e) { props.store.setQuery(e.target.value); },
                onKeyDown: function (e) {
                  if (e.key === "Enter") { e.preventDefault(); props.store.search(props.root); }
                }
              }),
              optionBtn("case", "Aa", t("gsearch.case")),
              optionBtn("word", "ab", t("gsearch.word")),
              optionBtn("regex", ".*", t("gsearch.regex"))
            ]
          }),
          body
        ]
      });
    }

    function TabContextMenu(props) {
      var menu = props.menu;
      var menuState = useSyncExternalStore(menu.subscribe, menu.getSnapshot, menu.getSnapshot);
      var editorState = useEditor(props.editor);
      var open = menuState.open;

      useLayoutEffect(function () {
        if (!open) return;
        function onDown(e) {
          var el = document.querySelector(".fe-context-menu");
          if (el && el.contains(e.target)) return;
          menu.close();
        }
        function onKey(e) { if (e.key === "Escape") menu.close(); }
        document.addEventListener("mousedown", onDown, true);
        document.addEventListener("keydown", onKey, true);
        return function () {
          document.removeEventListener("mousedown", onDown, true);
          document.removeEventListener("keydown", onKey, true);
        };
      }, [open, menu]);

      if (!open) return null;

      var path = menuState.path;
      var docs = editorState.docs;
      var order = editorState.order;
      var doc = docs[path];
      var idx = order.indexOf(path);
      var pinned = doc ? !!doc.pinned : false;

      var list = order.map(function (p) { return docs[p]; }).filter(Boolean);
      function othersDisabled() { return !list.some(function (d, i) { return i !== idx && !d.pinned; }); }
      function rightDisabled() { return !list.some(function (d, i) { return i > idx && !d.pinned; }); }
      function savedDisabled() { return !list.some(function (d) { return !d.pinned && !dirtyOf(d); }); }
      function allDisabled() { return !list.some(function (d) { return !d.pinned; }); }

      function item(label, run, disabled, danger) {
        return jsx("button", {
          className: "fe-menu-item" + (disabled ? " fe-menu-item-disabled" : "") + (danger ? " fe-menu-item-danger" : ""),
          disabled: !!disabled,
          onClick: function () {
            if (disabled) return;
            menu.close();
            run();
          },
          children: label
        }, label);
      }

      var x = Math.max(8, Math.min(menuState.x, window.innerWidth - 200));
      var y = Math.max(8, Math.min(menuState.y, window.innerHeight - 320));

      return jsxs("div", {
        className: "fe-context-menu",
        style: { left: x, top: y },
        onContextMenu: function (e) { e.preventDefault(); },
        children: [
          item(t("menu.close"), function () { props.actions.closeFile(path); }),
          item(t("menu.closeOthers"), function () { props.actions.closeOthers(path); }, othersDisabled()),
          item(t("menu.closeRight"), function () { props.actions.closeRight(path); }, rightDisabled()),
          item(t("menu.closeSaved"), function () { props.actions.closeSaved(); }, savedDisabled()),
          item(t("menu.closeAll"), function () { props.actions.closeAll(); }, allDisabled()),
          jsx("div", { className: "fe-menu-sep" }),
          item(t("menu.copyPath"), function () { props.actions.copyPath(path); }),
          jsx("div", { className: "fe-menu-sep" }),
          item(pinned ? t("menu.unpin") : t("menu.pin"), function () { props.actions.togglePin(path); })
        ]
      });
    }

    function TreeContextMenu(props) {
      var menu = props.treeMenu;
      var st = useSyncExternalStore(menu.subscribe, menu.getSnapshot, menu.getSnapshot);
      var open = st.open;

      useLayoutEffect(function () {
        if (!open) return;
        function onDown(e) {
          var el = document.querySelector(".fe-context-menu");
          if (el && el.contains(e.target)) return;
          menu.close();
        }
        function onKey(e) { if (e.key === "Escape") menu.close(); }
        document.addEventListener("mousedown", onDown, true);
        document.addEventListener("keydown", onKey, true);
        return function () {
          document.removeEventListener("mousedown", onDown, true);
          document.removeEventListener("keydown", onKey, true);
        };
      }, [open, menu]);

      if (!open) return null;

      function item(label, run, danger) {
        return jsx("button", {
          className: "fe-menu-item" + (danger ? " fe-menu-item-danger" : ""),
          onClick: function () { menu.close(); run(); },
          children: label
        }, label);
      }

      var path = st.path;
      var kind = st.kind;
      var name = st.name;
      var x = Math.max(8, Math.min(st.x, window.innerWidth - 200));
      var y = Math.max(8, Math.min(st.y, window.innerHeight - 320));

      var items = [];
      if (kind === "dir" || kind === "root") {
        items.push(item(t("menu.newFile"), function () { props.fsOps.newFile(path); }));
        items.push(item(t("menu.newFolder"), function () { props.fsOps.newFolder(path); }));
        items.push(jsx("div", { className: "fe-menu-sep" }, "sep-new"));
      }
      if (kind === "dir" || kind === "file") {
        items.push(item(t("menu.rename"), function () { props.fsOps.rename(path, kind, name); }));
        items.push(item(t("menu.delete"), function () { props.fsOps.remove(path, kind, name); }, true));
        items.push(jsx("div", { className: "fe-menu-sep" }, "sep-path"));
        items.push(item(t("menu.copyPath"), function () { props.fsOps.copyPath(path); }));
      }

      return jsxs("div", {
        className: "fe-context-menu",
        style: { left: x, top: y },
        onContextMenu: function (e) { e.preventDefault(); },
        children: items
      });
    }

    function ConfirmDialog(props) {
      var confirm = props.confirm;
      var st = useSyncExternalStore(confirm.subscribe, confirm.getSnapshot, confirm.getSnapshot);
      if (!st.open) return null;
      return jsx("div", {
        className: "fe-confirm-overlay",
        onMouseDown: function (e) { if (e.target === e.currentTarget) confirm.close(); },
        children: jsxs("div", {
          className: "fe-confirm",
          children: [
            jsx("div", { className: "fe-confirm-title", children: st.title || t("confirm.title") }),
            jsx("div", { className: "fe-confirm-msg", children: st.message }),
            jsxs("div", {
              className: "fe-confirm-actions",
              children: st.buttons.map(function (b, i) {
                return jsx("button", {
                  className: "fe-confirm-btn" + (b.kind ? " fe-confirm-" + b.kind : ""),
                  onClick: function () { confirm.close(); b.run(); },
                  children: b.label
                }, i);
              })
            })
          ]
        })
      });
    }

    function PromptDialog(props) {
      var prompt = props.prompt;
      var st = useSyncExternalStore(prompt.subscribe, prompt.getSnapshot, prompt.getSnapshot);
      var inputRef = useRef(null);
      var valueState = useState(st.value);
      var value = valueState[0];
      var setValue = valueState[1];

      useLayoutEffect(function () {
        if (!st.open) return;
        setValue(st.value);
        var el = inputRef.current;
        if (el) {
          el.focus();
          try { el.select(); } catch (err) {}
        }
      }, [st.open, st.value]);

      if (!st.open) return null;

      function submit() {
        var v = value.trim();
        var fn = st.onSubmit;
        prompt.close();
        if (v && fn) fn(v);
      }

      return jsx("div", {
        className: "fe-prompt-overlay",
        onMouseDown: function (e) { if (e.target === e.currentTarget) prompt.close(); },
        children: jsxs("div", {
          className: "fe-prompt",
          children: [
            jsx("div", { className: "fe-prompt-title", children: st.title }),
            jsx("input", {
              ref: inputRef,
              className: "fe-prompt-input",
              value: value,
              placeholder: st.placeholder,
              spellCheck: false,
              autoComplete: "off",
              onChange: function (e) { setValue(e.target.value); },
              onKeyDown: function (e) {
                if (e.key === "Enter") { e.preventDefault(); submit(); }
                else if (e.key === "Escape") { e.preventDefault(); prompt.close(); }
              }
            }),
            jsxs("div", {
              className: "fe-prompt-actions",
              children: [
                jsx("button", { className: "fe-prompt-btn", onClick: function () { prompt.close(); }, children: t("prompt.cancel") }),
                jsx("button", { className: "fe-prompt-btn fe-prompt-btn-primary", onClick: submit, children: t("prompt.ok") })
              ]
            })
          ]
        })
      });
    }

    function SettingsPanel(props) {
      var st = useEditor(props.editor);
      var s = st.settings;
      var modes = [
        { id: "off", label: t("settings.off") },
        { id: "delay", label: t("settings.delay") },
        { id: "blur", label: t("settings.blur") }
      ];
      return jsxs("div", {
        className: "fe-settings",
        children: [
          jsx("div", { className: "fe-settings-title", children: t("settings.title") }),
          modes.map(function (m) {
            return jsx("label", {
              className: "fe-settings-option",
              children: [
                jsx("input", {
                  type: "radio",
                  name: "fe-autosave",
                  checked: s.mode === m.id,
                  onChange: function () { if (s.mode !== m.id) props.editor.setAutoSave(m.id, s.delay); }
                }),
                jsx("span", { children: m.label })
              ]
            }, m.id);
          }),
          s.mode === "delay"
            ? jsxs("div", {
                className: "fe-settings-delay",
                children: [
                  jsx("span", { children: t("settings.delayLabel") }),
                  jsx("input", {
                    type: "number",
                    min: 200,
                    step: 100,
                    value: s.delay,
                    onChange: function (e) {
                      var v = parseInt(e.target.value, 10);
                      if (v && v >= 200) props.editor.setAutoSave("delay", v);
                    }
                  }),
                  jsx("span", { children: t("settings.ms") })
                ]
              })
            : null,
          jsx("div", { className: "fe-settings-title fe-settings-title-gap", children: t("settings.font") }),
          jsxs("div", {
            className: "fe-settings-font",
            children: [
              jsx("input", {
                type: "text",
                value: s.fontFamily || "",
                placeholder: t("settings.fontPlaceholder"),
                spellCheck: false,
                onChange: function (e) { props.editor.setFontFamily(e.target.value); }
              })
            ]
          })
        ]
      });
    }

    // ---- plugin body ----------------------------------------------------
    var inject = ["slots", "workspaces", "sessions", "locale"];

    function apply(ctx) {
      var slots = ctx.slots;
      var sessions = ctx.sessions;
      var workspaces = ctx.workspaces;
      var locale = ctx.locale;
      if (locale && typeof locale.register === "function" && typeof locale.bind === "function") {
        try {
          locale.register("file-explorer", FE_I18N);
        } catch (err) { /* namespace may already be registered on re-apply */ }
        _locale = locale;
        _t = locale.bind("file-explorer");
      }
      var editor = createEditorStore();
      var quickOpen = createQuickOpenStore();
      var gsearch = createSearchStore();
      var standalone = createStandaloneStore();
      var tabDisposers = new Map();
      var viewSeq = 0;
      var openOrder = []; // [{path, name}] in open order

      function currentRoot() {
        try {
          var snap = sessions.list.getSnapshot();
          var c = snap && snap.current != null && snap.byId ? snap.byId[snap.current] : undefined;
          if (c && c.cwd) return c.cwd;
        } catch (err) {}
        try {
          if (workspaces && workspaces.list) {
            var w = workspaces.list.getSnapshot();
            var items = w && w.items;
            if (items && items.length) {
              var recent = items.find(function (x) { return x.workspaceId === w.recentWorkspaceId; });
              if (recent && recent.path) return recent.path;
              if (items[0].path) return items[0].path;
            }
          }
        } catch (err) {}
        return null;
      }

      function openQuickOpen() {
        var root = currentRoot();
        quickOpen.open();
        if (!root) {
          quickOpen.setFiles([], false);
          return;
        }
        fetchJson(filesUrl(root)).then(function (r) {
          if (r && r.ok) quickOpen.setFiles(r.files || [], !!r.truncated);
          else quickOpen.setFiles([], false);
        });
      }

      function currentSessionId() {
        try {
          var snap = sessions.list.getSnapshot();
          return snap && snap.current;
        } catch (err) {
          return undefined;
        }
      }

      // A session is "blank" when it has no message yet — the conversation view
      // ring is not mounted, so switchView has nowhere to render. The hero state
      // (no current session at all) is treated the same.
      function isBlankSession() {
        var sessionId = currentSessionId();
        if (sessionId == null) return true;
        try {
          var snap = sessions.list.getSnapshot();
          var s = snap && snap.byId ? snap.byId[sessionId] : undefined;
          return !s || s.blank === true;
        } catch (err) {
          return false;
        }
      }

      // Switch the active conversation.view by reaching the chat store instance
      // (the conversation plugin keeps its view-selection state private).
      function switchView(viewId) {
        var sessionId = currentSessionId();
        if (sessionId == null) return;
        try {
          var entries = slots.entries("conversation.view");
          for (var i = 0; i < entries.length; i++) {
            var e = entries[i];
            if (e.options && e.options.id === "chat" && e.store) {
              var inst = slots.resolveStore(e.store, sessionId);
              if (inst && inst.actions && inst.actions.setView) {
                inst.actions.setView(viewId);
              }
              return;
            }
          }
        } catch (err) { /* swallow */ }
      }

      var menu = createMenuStore();
      var confirm = createConfirmStore();
      var treeMenu = createTreeMenuStore();
      var prompt = createPromptStore();
      var tree = createTreeStore();

      function currentView() {
        var sessionId = currentSessionId();
        if (sessionId == null) return null;
        try {
          var entries = slots.entries("conversation.view");
          for (var i = 0; i < entries.length; i++) {
            var e = entries[i];
            if (e.options && e.options.id === "chat" && e.store) {
              var inst = slots.resolveStore(e.store, sessionId);
              if (inst && inst.getSnapshot) {
                var snap = inst.getSnapshot();
                return snap ? snap.view : null;
              }
            }
          }
        } catch (err) { /* swallow */ }
        return null;
      }

      function forceClose(path) {
        var d = tabDisposers.get(path);
        if (d) {
          d();
          tabDisposers.delete(path);
        }
        editor.close(path);
        openOrder = openOrder.filter(function (o) { return o.path !== path; });
      }

      function closeFile(path) {
        if (editor.isDirty(path)) {
          confirm.open({
            message: t("confirm.dirtyOne", { name: editor.getName(path) }),
            buttons: [
              { label: t("confirm.cancel"), kind: "ghost", run: function () {} },
              { label: t("confirm.discard"), kind: "danger", run: function () { forceClose(path); } },
              { label: t("confirm.saveClose"), kind: "primary", run: function () { editor.save(path).then(function () { forceClose(path); }); } }
            ]
          });
          return;
        }
        forceClose(path);
      }

      function closeMany(paths) {
        if (paths.length === 0) return;
        var dirty = paths.filter(function (p) { return editor.isDirty(p); });
        if (dirty.length === 0) {
          paths.forEach(forceClose);
          return;
        }
        confirm.open({
          message: t("confirm.dirtyMany", { n: dirty.length }),
          buttons: [
            { label: t("confirm.cancel"), kind: "ghost", run: function () {} },
            { label: t("confirm.discard"), kind: "danger", run: function () { paths.forEach(forceClose); } },
            { label: t("confirm.saveClose"), kind: "primary", run: function () { Promise.all(dirty.map(function (p) { return editor.save(p); })).then(function () { paths.forEach(forceClose); }); } }
          ]
        });
      }

      function closablePaths(opts) {
        var snap = editor.getSnapshot();
        var order = snap.order;
        var idx = opts.exclude ? order.indexOf(opts.exclude) : -1;
        var out = [];
        for (var i = 0; i < order.length; i++) {
          var p = order[i];
          var doc = snap.docs[p];
          if (!doc) continue;
          if (doc.pinned) continue;
          if (opts.exclude && p === opts.exclude) continue;
          if (opts.rightOf && idx >= 0 && i <= idx) continue;
          if (opts.savedOnly && dirtyOf(doc)) continue;
          out.push(p);
        }
        return out;
      }

      var actions = {
        closeFile: closeFile,
        closeOthers: function (path) { closeMany(closablePaths({ exclude: path })); },
        closeRight: function (path) { closeMany(closablePaths({ exclude: path, rightOf: true })); },
        closeSaved: function () { closeMany(closablePaths({ savedOnly: true })); },
        closeAll: function () { closeMany(closablePaths({})); },
        copyPath: function (path) {
          try { navigator.clipboard.writeText(path); } catch (err) {}
        },
        togglePin: function (path) {
          editor.togglePin(path);
          scheduleInject();
        }
      };

      function openFile(path, name, opts) {
        if (tabDisposers.has(path)) {
          if (isBlankSession()) {
            standalone.set({ path: path, name: editor.getName(path) || name, sessionId: currentSessionId() });
          } else {
            switchView("file:" + path);
          }
          if (opts && opts.line) editor.reveal(path, opts.line, opts.col || 1);
          return;
        }
        editor.open(path, name);
        var seq = viewSeq++;
        var d = slots.inject("conversation.view", function () {
          return slots.register(
            {
              name: "conversation.view",
              id: "file:" + path,
              order: 200 + seq,
              label: name,
              inject: function () {
                return {
                  editor: editor,
                  filePath: path,
                  fileName: name,
                  onClose: function () { closeFile(path); }
                };
              }
            },
            FileView
          );
        });
        tabDisposers.set(path, d);
        openOrder.push({ path: path, name: name });
        if (isBlankSession()) {
          standalone.set({ path: path, name: name, sessionId: currentSessionId() });
        } else {
          switchView("file:" + path);
        }
        if (opts && opts.line) editor.reveal(path, opts.line, opts.col || 1);
      }

      // Click a global-search match: open the file and jump to the match line.
      function openMatch(path, name, line, col) {
        openFile(path, name, { line: line, col: col });
      }

      // ⌃G / quick-open ":" — go to a line in the file currently in view
      function gotoLineCurrent(n) {
        var cv = currentView();
        if (cv && cv.indexOf("file:") === 0) {
          editor.reveal(cv.slice(5), n, 1);
        }
      }

      // ---- open chat-referenced files in the explorer ---------------------
      function isLikelyAbsoluteFsPath(p) {
        if (typeof p !== "string" || p === "") return false;
        if (p.charAt(0) === "/") return true;                    // posix
        if (/^[A-Za-z]:[\\/]/.test(p)) return true;              // windows drive (checked before scheme)
        if (p.indexOf("\\\\") === 0) return true;                // windows UNC
        if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(p)) return false;   // url / data: / blob:
        return false;
      }

      // Resolve a chat-referenced path against the current session cwd and
      // confirm it is one the explorer may open (existing file inside an
      // allowed root) before taking over the click.
      function resolveChatFile(rawPath) {
        if (typeof rawPath !== "string") return null;
        var p = rawPath.trim();
        if (p === "") return null;
        var abs = isLikelyAbsoluteFsPath(p) ? p : (function () {
          var root = currentRoot();
          return root ? joinFsPath(root, p) : null;
        })();
        if (!abs) return null;
        return fetchJson(readUrl(abs)).then(function (res) {
          if (res && res.ok && res.path) return { path: res.path };
          return null;
        }, function () { return null; });
      }

      // Capture-phase click interceptor: reroute "open this file" gestures in
      // the chat (produced-file chips, markdown file mentions, tool-card file
      // links) into the explorer's own editor tab instead of the OS/browser.
      // Anything that does not cleanly resolve to an openable file is left to
      // the default handler untouched.
      ctx.effect(function () {
        function candidateFrom(target) {
          if (!target || typeof target.closest !== "function") return null;
          // 1. Produced-files chips carry the full path on `title`.
          var chip = target.closest('[data-produced-files-row] button[title]');
          if (chip) {
            var t1 = chip.getAttribute("title");
            if (t1 && t1 !== ".") return t1;
            return null; // "show in folder" chip -> leave to native handler
          }
          // 2. Markdown file mention buttons (aria-label carries the path).
          var mention = target.closest("button[aria-label]");
          if (mention) {
            var label = mention.getAttribute("aria-label");
            if (label && isLikelyAbsoluteFsPath(label)) return label;
          }
          // 3. Tool-card file link: its text is the file path as displayed,
          //    relativized to the session cwd (a root-level file collapses to
          //    a bare name with no separator, e.g. `PRD.md`). The element only
          //    renders when the tool row names a single openable file, so
          //    non-empty single-line text is enough — no path-shape guard.
          var link = target.closest("button[class*='fileLink' i]");
          if (link) {
            var txt = (link.textContent || "").trim();
            if (txt !== "" && txt.indexOf("\n") === -1) {
              return txt;
            }
          }
          return null;
        }
        function onClick(e) {
          if (e.defaultPrevented || e.button !== 0) return;
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
          var raw = candidateFrom(e.target);
          if (!raw) return;
          resolveChatFile(raw).then(function (resolved) {
            if (!resolved) return; // let the original gesture stand
            openFile(resolved.path, basename(resolved.path));
          });
          // We cannot know synchronously whether the path resolves, so we
          // always suppress the native open and only re-open natively on the
          // (rare) failure path via a no-op: resolution failure simply leaves
          // the click without effect rather than spawning a browser window.
          e.preventDefault();
          e.stopPropagation();
        }
        document.addEventListener("click", onClick, true);
        return function () { document.removeEventListener("click", onClick, true); };
      }, "file-explorer: open chat files in explorer");

      // Open files requested by other plugins (e.g. the git SCM panel's "open
      // file" action dispatches `dsh:open-file`) in this explorer's editor tab.
      ctx.effect(function () {
        function onOpenFile(e) {
          var d = e.detail || {};
          if (!d || typeof d.path !== "string" || d.path === "") return;
          resolveChatFile(d.path).then(function (resolved) {
            if (!resolved) return;
            openFile(resolved.path, d.name || basename(resolved.path));
          });
        }
        document.addEventListener("dsh:open-file", onOpenFile);
        return function () { document.removeEventListener("dsh:open-file", onOpenFile); };
      }, "file-explorer: open files on request");

      function showError(message) {
        confirm.open({
          title: t("confirm.title"),
          message: message,
          buttons: [{ label: t("confirm.cancel"), kind: "ghost", run: function () {} }]
        });
      }

      function remapOpenPaths(fromPath, toPath) {
        var snap = editor.getSnapshot();
        var remaps = [];
        for (var i = 0; i < snap.order.length; i++) {
          var p = snap.order[i];
          var rel;
          if (p === fromPath) rel = "";
          else if (isPathWithin(p, fromPath)) rel = p.slice(fromPath.length);
          else continue;
          remaps.push({ from: p, to: toPath + rel, name: basename(toPath + rel) });
        }
        remaps.forEach(function (m) {
          var d = tabDisposers.get(m.from);
          if (d) {
            d();
            tabDisposers.delete(m.from);
          }
          editor.renameDoc(m.from, m.to, m.name);
          var seq = viewSeq++;
          var nd = slots.inject("conversation.view", function () {
            return slots.register(
              {
                name: "conversation.view",
                id: "file:" + m.to,
                order: 200 + seq,
                label: m.name,
                inject: function () {
                  return {
                    editor: editor,
                    filePath: m.to,
                    fileName: m.name,
                    onClose: function () { closeFile(m.to); }
                  };
                }
              },
              FileView
            );
          });
          tabDisposers.set(m.to, nd);
        });
        openOrder = openOrder.map(function (o) {
          if (o.path === fromPath) return { path: toPath, name: basename(toPath) };
          if (isPathWithin(o.path, fromPath)) {
            var np = toPath + o.path.slice(fromPath.length);
            return { path: np, name: basename(np) };
          }
          return o;
        });
        scheduleInject();
        var cv = currentView();
        for (var k = 0; k < remaps.length; k++) {
          if (cv === "file:" + remaps[k].from) {
            switchView("file:" + remaps[k].to);
            break;
          }
        }
      }

      function deleteOpenPathsUnder(path) {
        var snap = editor.getSnapshot();
        var toClose = [];
        for (var i = 0; i < snap.order.length; i++) {
          var p = snap.order[i];
          if (isPathWithin(p, path)) toClose.push(p);
        }
        for (var j = 0; j < toClose.length; j++) forceClose(toClose[j]);
      }

      function doRename(fromPath, toPath) {
        if (fromPath === toPath) return Promise.resolve(true);
        return postJson(renameUrl(), { from: fromPath, to: toPath }).then(function (r) {
          if (r && r.ok) {
            tree.reload();
            remapOpenPaths(r.from, r.to);
            return true;
          }
          showError(t("error.generic", { error: (r && r.error) || "rename-failed" }));
          return false;
        });
      }

      var dragSource = null;
      function dragStart(path, kind, name, e, group, cleared) {
        dragSource = { path: path, kind: kind, name: name, group: group && group.length > 1 ? group.slice() : null, cleared: cleared };
        try {
          e.dataTransfer.effectAllowed = "move";
          e.dataTransfer.setData("application/x-fe-path", path);
          e.dataTransfer.setData("text/plain", path);
        } catch (err) { /* ignore */ }
      }
      function dragEnd() {
        dragSource = null;
      }
      function isDragging() {
        return dragSource != null;
      }
      function dropOnDir(targetDirPath) {
        var src = dragSource;
        dragSource = null;
        if (!src) return;
        if (src.path === targetDirPath) return;
        if (src.kind === "dir" && isPathWithin(targetDirPath, src.path)) {
          showError(t("error.moveIntoDescendant"));
          return;
        }
        // Multi-selection drag → move the whole group into the target folder.
        if (src.group) {
          var moving = src.group.slice();
          // Reject when any selected dir is an ancestor of the target folder.
          for (var gi = 0; gi < moving.length; gi++) {
            var gp = moving[gi];
            if (isPathWithin(targetDirPath, gp)) {
              showError(t("error.moveIntoDescendant"));
              return;
            }
          }
          runBatchMove(moving, targetDirPath, src.cleared);
          return;
        }
        var toPath = joinFsPath(targetDirPath, src.name);
        if (toPath === src.path) return;
        doRename(src.path, toPath);
      }

      // ---- batch select: move / delete ---------------------------------
      function runBatchMove(items, target, cleared) {
        postJson(moveUrl(), { dir: target, items: items }).then(function (r) {
          if (!r) return;
          var res = r.results || [];
          var moved = 0;
          for (var i = 0; i < res.length; i++) {
            if (res[i] && res[i].ok) { moved++; remapOpenPaths(res[i].from, res[i].to); }
          }
          if (cleared && res.length) cleared();
          if (!r.ok && r.error === "denied") { showError(t("error.generic", { error: "denied" })); return; }
          if (!r.ok && r.error === "not-dir") { showError(t("error.targetNotDir")); return; }
          if (res.length) tree.reload();
          // Full success is silent — the reloaded tree shows the result.
          if (moved < items.length) showError(t("batch.movePartial", { moved: moved, failed: items.length - moved }));
        });
      }

      // ---- import from OS clipboard / external drag -----------------------
      var uploads = createUploadStore();
      var importRunning = false;

      function importDataTransfer(dt, dirPath) {
        if (!dt || !dirPath || importRunning) return;
        importRunning = true;
        collectTransferFiles(dt).then(function (items) {
          if (!items.length) {
            importRunning = false;
            showError(t("upload.none"));
            return;
          }
          var names = [];
          var seen = {};
          for (var i = 0; i < items.length; i++) {
            var rel = items[i].relPath;
            if (seen[rel]) continue;
            seen[rel] = true;
            names.push(rel);
          }
          postJson(resolveUploadUrl(), { dir: dirPath, names: names }).then(function (plan) {
            if (!plan || !plan.ok) {
              importRunning = false;
              showError(t("error.generic", { error: (plan && plan.error) || "resolve-failed" }));
              return;
            }
            var byRel = {};
            var results = plan.results || [];
            for (var j = 0; j < results.length; j++) {
              if (results[j] && results[j].ok) byRel[results[j].name] = results[j].path;
            }
            var queue = [];
            for (var k = 0; k < items.length; k++) {
              var target = byRel[items[k].relPath];
              if (target) queue.push({ file: items[k].file, target: target, rel: items[k].relPath });
            }
            if (!queue.length) {
              importRunning = false;
              showError(t("upload.none"));
              return;
            }
            uploads.begin(queue.length);
            var done = 0;
            var failed = 0;
            var firstOkPath = null;
            function step() {
              if (done >= queue.length) {
                importRunning = false;
                tree.reload();
                uploads.finish(queue.length - failed, failed);
                if (failed > 0) {
                  showError(t("upload.failed", { n: failed }));
                } else if (queue.length === 1 && firstOkPath) {
                  openFile(firstOkPath, basename(firstOkPath));
                }
                return;
              }
              var job = queue[done];
              uploads.step(done, job.rel, failed);
              postBlob(uploadUrl(job.target), job.file).then(function (r) {
                if (r && r.ok) {
                  if (!firstOkPath) firstOkPath = r.path || job.target;
                } else {
                  failed++;
                }
                done++;
                step();
              });
            }
            step();
          });
        });
      }

      // Paste files copied in Finder / Explorer (⌘V / Ctrl+V). Skips inputs
      // and textareas — the in-app editors handle their own paste events.
      ctx.effect(function () {
        function onPaste(e) {
          var el = e.target;
          if (el && el.closest && el.closest("input, textarea, [contenteditable=true], [contenteditable=\"\"]")) return;
          var cd = e.clipboardData;
          if (!cd) return;
          var hasFiles = false;
          try {
            if (cd.files && cd.files.length > 0) hasFiles = true;
            else if (cd.items) {
              for (var i = 0; i < cd.items.length; i++) {
                if (cd.items[i].kind === "file") { hasFiles = true; break; }
              }
            }
          } catch (err) { hasFiles = false; }
          if (!hasFiles) return;
          var dir = currentRoot();
          if (!dir) return;
          e.preventDefault();
          importDataTransfer(cd, dir);
        }
        document.addEventListener("paste", onPaste, true);
        return function () { document.removeEventListener("paste", onPaste, true); };
      }, "file-explorer: paste files from OS clipboard");

      var fsOps = {
        newFile: function (dirPath) {
          prompt.open({
            title: t("prompt.newFile"),
            placeholder: t("prompt.namePlaceholder"),
            onSubmit: function (name) {
              var target = joinFsPath(dirPath, name);
              postJson(createUrl(), { path: target, kind: "file" }).then(function (r) {
                if (r && r.ok) {
                  tree.reload();
                  openFile(r.path, basename(r.path));
                } else {
                  showError(t("error.generic", { error: (r && r.error) || "create-failed" }));
                }
              });
            }
          });
        },
        newFolder: function (dirPath) {
          prompt.open({
            title: t("prompt.newFolder"),
            placeholder: t("prompt.namePlaceholder"),
            onSubmit: function (name) {
              var target = joinFsPath(dirPath, name);
              postJson(createUrl(), { path: target, kind: "dir" }).then(function (r) {
                if (r && r.ok) tree.reload();
                else showError(t("error.generic", { error: (r && r.error) || "create-failed" }));
              });
            }
          });
        },
        rename: function (path, kind, name) {
          prompt.open({
            title: t("prompt.rename"),
            value: name,
            placeholder: t("prompt.namePlaceholder"),
            onSubmit: function (newName) {
              if (newName === name) return;
              doRename(path, joinFsPath(dirnameOf(path), newName));
            }
          });
        },
        remove: function (path, kind, name) {
          confirm.open({
            title: t("confirm.delete"),
            message: kind === "dir" ? t("confirm.deleteDir", { name: name }) : t("confirm.deleteOne", { name: name }),
            buttons: [
              { label: t("confirm.cancel"), kind: "ghost", run: function () {} },
              {
                label: t("confirm.delete"), kind: "danger", run: function () {
                  postJson(deleteUrl(), { path: path }).then(function (r) {
                    if (r && r.ok) {
                      deleteOpenPathsUnder(path);
                      tree.reload();
                    } else {
                      showError(t("error.generic", { error: (r && r.error) || "delete-failed" }));
                    }
                  });
                }
              }
            ]
          });
        },
        copyPath: function (path) {
          try { navigator.clipboard.writeText(path); } catch (err) {}
        }
      };

      // Decorate the header's file tabs: hover-close "×", right-click menu, pin dot.
      function decorateTabs() {
        var tabsRoot = document.querySelector(".wSkVaW_tabs");
        if (!tabsRoot) return;
        var buttons = Array.prototype.slice.call(tabsRoot.querySelectorAll('[role="tab"]'));
        var byName = {};
        for (var i = 0; i < openOrder.length; i++) {
          byName[openOrder[i].name] = openOrder[i].path;
        }
        var snap = editor.getSnapshot();
        var pinnedSet = {};
        var dirtySet = {};
        for (var i = 0; i < snap.order.length; i++) {
          var pp = snap.order[i];
          var dd = snap.docs[pp];
          if (dd && dd.pinned) pinnedSet[pp] = true;
          if (dd && dirtyOf(dd)) dirtySet[pp] = true;
        }

        buttons.forEach(function (btn) {
          var name = btn.dataset.feName;
          if (name === undefined) {
            name = (btn.textContent || "").trim();
            btn.dataset.feName = name;
          }
          var path = byName[name];
          if (!path) {
            var staleClose = btn.querySelector(".fe-tab-close-inject");
            if (staleClose) staleClose.remove();
            var stalePin = btn.querySelector(".fe-tab-pin-inject");
            if (stalePin) stalePin.remove();
            var staleDirty = btn.querySelector(".fe-tab-dirty-inject");
            if (staleDirty) staleDirty.remove();
            delete btn.dataset.feName;
            delete btn.dataset.fePath;
            btn.__feCtx = false;
            return;
          }

          // close button
          var close = btn.querySelector(".fe-tab-close-inject");
          if (!close) {
            close = document.createElement("span");
            close.className = "fe-tab-close-inject";
            close.textContent = "×";
            close.title = t("editor.close");
            close.addEventListener("click", function (e) {
              e.stopPropagation();
              e.preventDefault();
              closeFile(path);
            });
            btn.appendChild(close);
          }
          btn.dataset.fePath = path;

          // right-click context menu
          if (!btn.__feCtx) {
            btn.__feCtx = true;
            btn.addEventListener("contextmenu", function (e) {
              e.preventDefault();
              e.stopPropagation();
              menu.open(path, e.clientX, e.clientY);
            });
          }

          // pin indicator
          var pin = btn.querySelector(".fe-tab-pin-inject");
          if (pinnedSet[path] && !pin) {
            pin = document.createElement("span");
            pin.className = "fe-tab-pin-inject";
            pin.textContent = "●";
            pin.title = t("editor.pinned");
            btn.insertBefore(pin, btn.firstChild);
          } else if (!pinnedSet[path] && pin) {
            pin.remove();
          }

          // unsaved-changes dot (VS Code: dot sits where the × appears on hover)
          var dirty = btn.querySelector(".fe-tab-dirty-inject");
          if (dirtySet[path] && !dirty) {
            dirty = document.createElement("span");
            dirty.className = "fe-tab-dirty-inject";
            dirty.textContent = "●";
            dirty.title = t("editor.dirty");
            btn.appendChild(dirty);
          } else if (!dirtySet[path] && dirty) {
            dirty.remove();
          }
        });
      }

      var injectScheduled = false;
      function scheduleInject() {
        if (injectScheduled) return;
        injectScheduled = true;
        requestAnimationFrame(function () {
          injectScheduled = false;
          decorateTabs();
        });
      }
      ctx.effect(function () {
        if (!document.body) return;
        var observer = new MutationObserver(function () { scheduleInject(); });
        observer.observe(document.body, { childList: true, subtree: true });
        return function () { observer.disconnect(); };
      }, "file-explorer: header tab close injection");

      // Typing changes dirty state without touching the tab bar's DOM, so the
      // dot wouldn't repaint on its own — redecorate on every editor change.
      ctx.effect(function () {
        return editor.subscribe(function () { scheduleInject(); });
      }, "file-explorer: header tab dirty dot");

      // VS Code-style keyboard shortcuts (global, capture phase)
      ctx.effect(function () {
        function onKey(e) {
          var mod = e.ctrlKey || e.metaKey;
          if (mod && !e.shiftKey && !e.altKey && (e.key === "p" || e.key === "P")) {
            // ⌘P — quick open
            e.preventDefault();
            e.stopPropagation();
            openQuickOpen();
            return;
          }
          if (mod && e.shiftKey && (e.key === "f" || e.key === "F")) {
            // ⌘⇧F — global search view
            e.preventDefault();
            e.stopPropagation();
            document.dispatchEvent(new CustomEvent("fe:open-search"));
            return;
          }
          if (mod && !e.shiftKey && !e.altKey && (e.key === "s" || e.key === "S")) {
            // ⌘S — save the file currently in view (when focus is outside the
            // editor's textarea; inside, CodeEditor handles it itself)
            var t = e.target;
            if (t && t.closest && t.closest(".fe-editor-ta, .fe-find-input")) return;
            var cv = currentView();
            if (cv && cv.indexOf("file:") === 0) {
              e.preventDefault();
              e.stopPropagation();
              editor.saveIfDirty(cv.slice(5));
            }
            return;
          }
          if (e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey && (e.key === "g" || e.key === "G")) {
            // ⌃G — go to line (quick-open in ":" mode)
            e.preventDefault();
            e.stopPropagation();
            quickOpen.open();
            quickOpen.setQuery(":");
            var root = currentRoot();
            if (!root) { quickOpen.setFiles([], false); return; }
            fetchJson(filesUrl(root)).then(function (r) {
              if (r && r.ok) quickOpen.setFiles(r.files || [], !!r.truncated);
              else quickOpen.setFiles([], false);
            });
            return;
          }
        }
        document.addEventListener("keydown", onKey, true);
        return function () { document.removeEventListener("keydown", onKey, true); };
      }, "file-explorer: vscode shortcuts");

      // right activity bar + sidebar (always available)
      slots.inject("shell.overlay", function () {
        return slots.register(
          { name: "shell.overlay", id: "file-explorer", order: 0 },
          function Panel(props) {
            return jsxs(Fragment, {
              children: [
                jsx(WorkspaceSidebar, {
                  useSessions: props.useSessions,
                  useWorkspaces: props.useWorkspaces,
                  editor: editor,
                  openFile: openFile,
                  menu: menu,
                  confirm: confirm,
                  quickOpen: quickOpen,
                  openSearch: openQuickOpen,
                  gsearch: gsearch,
                  openMatch: openMatch,
                  gotoLine: gotoLineCurrent,
                  actions: actions,
                  treeMenu: treeMenu,
                  prompt: prompt,
                  tree: tree,
                  fsOps: fsOps,
                  dragStart: dragStart,
                  dragEnd: dragEnd,
                  isDragging: isDragging,
                  dropOnDir: dropOnDir,
                  importDataTransfer: importDataTransfer,
                  uploads: uploads
                }),
                jsx(BlankFileOverlay, {
                  useSessions: props.useSessions,
                  editor: editor,
                  standalone: standalone,
                  switchView: switchView,
                  closeFile: closeFile
                })
              ]
            });
          }
        );
      });
    }

    exports.apply = apply;
    exports.inject = inject;
    return module.exports;
  }
});
