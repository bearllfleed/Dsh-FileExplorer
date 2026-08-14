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
        ".fe-tree{flex:1;overflow:auto;padding:6px 0}",
        ".fe-tree::-webkit-scrollbar{width:10px}.fe-tree::-webkit-scrollbar-thumb{background:var(--dsw-alias-scrollbar-bg-l2,rgba(255,255,255,.08));border-radius:8px}",
        ".fe-node-row{display:flex;align-items:center;gap:6px;height:24px;padding-right:8px;margin:0 4px;cursor:pointer;user-select:none;font-size:12.5px;color:var(--dsw-alias-label-secondary,#c7c9d1);white-space:nowrap;border-radius:6px}",
        ".fe-node-row:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.06));color:var(--dsw-alias-label-primary,#e6e8ee)}",
        ".fe-file.fe-open{color:var(--dsw-alias-state-business-primary,#4aa3ff)}",
        ".fe-caret{width:12px;flex:none;text-align:center;font-size:9px;color:var(--dsw-alias-label-tertiary,#8b93a5);transition:transform .12s}",
        ".fe-caret-open{transform:rotate(90deg)}",
        ".fe-caret-spacer{visibility:hidden}",
        ".fe-icon{flex:none}",
        ".fe-name{overflow:hidden;text-overflow:ellipsis}",
        ".fe-loading{height:22px;line-height:22px;font-size:12px;color:var(--dsw-alias-label-tertiary,#8b93a5)}",
        ".fe-empty{padding:20px;font-size:12.5px;color:var(--dsw-alias-label-tertiary,#8b93a5)}",
        // file view (editor area)
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
        "body[data-fe-file-active] .wSkVaW_header{padding:6px 20px 0}"
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
    function extLabel(name) {
      var e = extOf(name);
      return e ? e.toUpperCase().slice(0, 3) : "";
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
      var parts = String(base || "/").split(/[\\/]/).filter(function (x) { return x !== ""; });
      var segs = String(rel || "").split(/[\\/]/);
      for (var i = 0; i < segs.length; i++) {
        var seg = segs[i];
        if (seg === "" || seg === ".") continue;
        if (seg === "..") { parts.pop(); continue; }
        parts.push(seg);
      }
      return "/" + parts.join("/");
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
        "editor.tooLarge": "文件过大（{size}），暂不支持编辑",
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
        "confirm.cancel": "取消"
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
        "editor.tooLarge": "File too large ({size}), editing disabled",
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
        "confirm.cancel": "Cancel"
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
        if (!res.ok) return { ok: false, error: "http-" + res.status };
        return await res.json();
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
      var d = "M1.5 3.5A1.5 1.5 0 0 1 3 2h3.3a1.5 1.5 0 0 1 1.06.44L8.5 3.5h4A1.5 1.5 0 0 1 14 5v7A1.5 1.5 0 0 1 12.5 13.5H3A1.5 1.5 0 0 1 1.5 12z";
      return jsx("svg", { className: "fe-icon", width: props.size || 14, height: props.size || 14, viewBox: "0 0 16 16", "aria-hidden": true, children: jsx("path", { d: d, fill: "#d9a640" }) });
    }
    function FileIcon(props) {
      var label = extLabel(props.name);
      var color = colorFor(props.name);
      return jsxs("svg", {
        className: "fe-icon",
        width: props.size || 14,
        height: props.size || 14,
        viewBox: "0 0 16 16",
        "aria-hidden": true,
        children: [
          jsx("path", { d: "M4 1.5h6l4 4v8.25A1.25 1.25 0 0 1 12.75 15h-8.5A1.25 1.25 0 0 1 3 13.75V2.75A1.25 1.25 0 0 1 4 1.5z", fill: color }),
          jsx("path", { d: "M10 1.5V5h3.5", fill: "none", stroke: "rgba(0,0,0,0.28)", strokeWidth: 1 }),
          label ? jsx("text", { x: 8, y: 11, textAnchor: "middle", fontSize: 4.6, fontWeight: 700, fill: "#fff", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", children: label }) : null
        ]
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

    // ---- tree -----------------------------------------------------------
    function FileRow(props) {
      return jsxs(
        "div",
        {
          className: "fe-node-row fe-file" + (props.open ? " fe-open" : ""),
          style: { paddingLeft: 8 + props.depth * 12 },
          onClick: function () { props.openFile(props.path, props.name); },
          title: props.path,
          children: [
            jsx("span", { className: "fe-caret fe-caret-spacer", children: "" }),
            jsx(FileIcon, { name: props.name, size: 14 }),
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
      var children = [];
      if (isOpen && listing && listing.ok) {
        var d, f;
        for (d of listing.dirs || []) {
          children.push(jsx(DirNode, { path: d.path, name: d.name, depth: props.depth + 1, expanded: props.expanded, cache: props.cache, toggle: props.toggle, openFile: props.openFile, openPaths: props.openPaths }, d.path));
        }
        for (f of listing.files || []) {
          children.push(jsx(FileRow, { path: f.path, name: f.name, depth: props.depth + 1, openFile: props.openFile, open: props.openPaths.has(f.path) }, f.path));
        }
      }
      return jsxs(
        "div",
        {
          className: "fe-node",
          children: [
            jsxs("div", {
              className: "fe-node-row fe-dir",
              style: { paddingLeft: 8 + props.depth * 12 },
              onClick: function () { props.toggle(props.path); },
              title: props.path,
              children: [
                jsx("span", { className: "fe-caret" + (isOpen ? " fe-caret-open" : ""), children: "▸" }),
                jsx(FolderIcon, { size: 14 }),
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

      return jsx("div", {
        className: "fe-tree",
        children: jsx(DirNode, { path: props.root, name: basename(props.root) || props.root, depth: 0, expanded: expanded, cache: cache, toggle: toggle, openFile: props.openFile, openPaths: openPaths }, props.root)
      });
    }

    // ---- code editor ----------------------------------------------------
    function CodeEditor(props) {
      var taRef = useRef(null);
      var preRef = useRef(null);
      var deferred = useDeferredValue(props.value);
      var tokens = useMemo(function () { return tokenize(deferred, props.lang); }, [deferred, props.lang]);

      var onScroll = useCallback(function (e) {
        if (preRef.current) {
          preRef.current.scrollTop = e.target.scrollTop;
          preRef.current.scrollLeft = e.target.scrollLeft;
        }
      }, []);

      var onKeyDown = useCallback(function (e) {
        if ((e.ctrlKey || e.metaKey) && (e.key === "s" || e.key === "S")) {
          e.preventDefault();
          props.onSave();
          return;
        }
        if (e.key === "Tab") {
          e.preventDefault();
          var ta = e.target;
          var s = ta.selectionStart;
          var en = ta.selectionEnd;
          var next = props.value.slice(0, s) + "  " + props.value.slice(en);
          props.onChange(next);
          requestAnimationFrame(function () {
            ta.selectionStart = ta.selectionEnd = s + 2;
          });
        }
      }, [props]);

      var code = tokens.map(function (t, i) {
        return t[1] ? jsx("span", { className: "tok-" + t[1], children: t[0] }, i) : t[0];
      });

      return jsxs("div", {
        className: "fe-editor-wrap",
        children: [
          jsx("pre", { ref: preRef, className: "fe-editor-pre", "aria-hidden": true, children: jsx("code", { className: "fe-editor-code", children: [code, "\n"] }) }),
          jsx("textarea", {
            ref: taRef,
            className: "fe-editor-ta",
            value: props.value,
            wrap: "off",
            spellCheck: false,
            autoCorrect: "off",
            autoCapitalize: "off",
            onChange: function (e) { props.onChange(e.target.value); },
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

      var views = [{ id: "files", label: t("activity.files"), icon: ExplorerIcon }];

      return jsxs(Fragment, {
        children: [
          jsx("div", {
            className: "fe-activity",
            children: views.map(function (v) {
              return jsx("button", {
                className: "fe-activity-btn" + (viewId === v.id ? " fe-active" : ""),
                title: v.label,
                onClick: function () { setViewId(viewId === v.id ? null : v.id); },
                children: jsx(v.icon, {})
              }, v.id);
            })
          }),
          jsxs("div", {
            className: "fe-sidebar" + (viewId ? "" : " fe-sidebar-closed"),
            children: [
              jsx("div", { className: "fe-sidebar-resize", onPointerDown: onResizeStart }),
              jsxs("div", {
                className: "fe-sidebar-header",
                children: [
                  jsx("span", { className: "fe-sidebar-title", children: showSettings ? t("sidebar.settings") : t("sidebar.explorer") }),
                  jsx("span", { className: "fe-sidebar-header-spacer" }),
                  jsx("button", {
                    className: "fe-settings-btn",
                    title: t("search.title"),
                    onClick: props.openSearch,
                    children: jsx(SearchIcon, {})
                  }),
                  jsx("button", {
                    className: "fe-settings-btn" + (showSettings ? " fe-settings-btn-active" : ""),
                    title: t("settings.autoSaveTip"),
                    onClick: function () { setShowSettings(!showSettings); },
                    children: jsx(GearIcon, {})
                  })
                ]
              }),
              showSettings
                ? jsx(SettingsPanel, { editor: props.editor })
                : (root
                    ? jsx(FileTree, { root: root, editor: props.editor, openFile: props.openFile }, root)
                    : jsx("div", { className: "fe-empty", children: t("sidebar.empty") }))
            ]
          }),
          jsx(TabContextMenu, { menu: props.menu, editor: props.editor, actions: props.actions }),
          jsx(ConfirmDialog, { confirm: props.confirm }),
          jsx(QuickOpenPalette, { store: props.quickOpen, openFile: props.openFile })
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
      var state = { open: false, message: "", buttons: [] };
      var listeners = new Set();
      function notify() { listeners.forEach(function (fn) { fn(); }); }
      return {
        getSnapshot: function () { return state; },
        subscribe: function (fn) { listeners.add(fn); return function () { listeners.delete(fn); }; },
        open: function (opts) { state = { open: true, message: opts.message, buttons: opts.buttons }; notify(); },
        close: function () { state = { open: false, message: "", buttons: [] }; notify(); }
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

    function SearchIcon() {
      return jsx("svg", {
        width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
        strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true,
        children: jsxs(Fragment, { children: [
          jsx("circle", { cx: 11, cy: 11, r: 7 }),
          jsx("line", { x1: 21, y1: 21, x2: 16.5, y2: 16.5 })
        ] })
      });
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
            st.loading
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
            jsx("div", { className: "fe-confirm-title", children: t("confirm.title") }),
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

      function openFile(path, name) {
        if (tabDisposers.has(path)) {
          switchView("file:" + path);
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
        switchView("file:" + path);
      }

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
        for (var i = 0; i < snap.order.length; i++) {
          var pp = snap.order[i];
          var dd = snap.docs[pp];
          if (dd && dd.pinned) pinnedSet[pp] = true;
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

      // Ctrl/Cmd+P — quick open (VS Code style)
      ctx.effect(function () {
        function onKey(e) {
          if ((e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey && (e.key === "p" || e.key === "P")) {
            e.preventDefault();
            e.stopPropagation();
            openQuickOpen();
          }
        }
        document.addEventListener("keydown", onKey, true);
        return function () { document.removeEventListener("keydown", onKey, true); };
      }, "file-explorer: quick open shortcut");

      // right activity bar + sidebar (always available)
      slots.inject("shell.overlay", function () {
        return slots.register(
          { name: "shell.overlay", id: "file-explorer", order: 0 },
          function Panel(props) {
            return jsx(WorkspaceSidebar, {
              useSessions: props.useSessions,
              useWorkspaces: props.useWorkspaces,
              editor: editor,
              openFile: openFile,
              menu: menu,
              confirm: confirm,
              quickOpen: quickOpen,
              openSearch: openQuickOpen,
              actions: actions
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
