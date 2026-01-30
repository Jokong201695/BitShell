import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, Shield, Download, Code, Image as ImageIcon, 
  Type, Palette, Layers, AlertTriangle, CheckCircle, 
  Cpu, Hash, Coffee, Trash2, FileImage, Globe, 
  Github, Layout, Eye, Lock, FileCode, Menu, ChevronRight, X,
  Zap, Server, Smartphone, MapPin, Calendar, Search, 
  Box, Circle, Square, Command, Activity, Upload, RefreshCw,
  BookOpen, Clock, Tag, ArrowLeft, Info, Check, XCircle,
  Copy, Settings, Monitor, Share2, Map as MapIcon, Languages, Home,
  // === 新增的酷炫图标 ===
  Bot, Bug, Cloud, Database, Flame, Gamepad2, Ghost, 
  Infinity, Network, Puzzle, Rocket, Sparkles, Fingerprint, 
  Anchor, Aperture, Feather, Radio
} from 'lucide-react';

// ==========================================
// 0. 国际化字典 (I18N)
// ==========================================
const I18N = {
  zh: {
    brandDesc: "专注于 Logo 生成和图片隐私保护。",
    nav: {
      home: "首页",
      logoTools: "开发者 Logo 工具",
      privacyTools: "图片隐私清洗工具",
      resources: "资源中心"
    },
    home: {
      heroTitle: "BitShell",
      heroDesc: "从极客风格的 Logo 设计，到彻底的图片隐私清洗。BitShell 为开发者和注重隐私的用户提供纯前端、无服务器的安全工具。",
      btnLogo: "开始设计 Logo",
      btnPrivacy: "清理图片隐私",
      feature1Title: "极客 Logo 生成",
      feature1Desc: "专为 GitHub Readme 和开源项目设计。支持终端风、极简风，SVG 矢量导出。",
      feature2Title: "隐私彻底清洗",
      feature2Desc: "不仅是删除 EXIF。我们支持检测 GPS 泄露风险，并从像素级重绘以确保绝对安全。",
      trust: "纯前端运行 • 无数据上传 • 开源友好"
    },
    privacy: {
      uploadTitle: "上传图片，检测隐私信息",
      uploadDesc: "支持拖拽上传 • JPG / PNG / WebP",
      uploadTrust: "图片将在本地处理，不会上传服务器",
      uploadHeic: "注：HEIC 图片请先转换为 JPG 再处理",
      scanning: "正在检测图片中的隐私信息…",
      scanningDesc: "分析位置数据、设备指纹和时间戳",
      riskFound: "发现潜在隐私风险",
      riskFoundDesc: "图片中包含可能泄露隐私的元数据信息",
      noRisk: "未检测到隐私信息",
      noRiskDesc: "图片中未发现 GPS 或设备等敏感元数据",
      itemGps: "GPS 位置信息",
      itemTime: "拍摄时间",
      itemDevice: "拍摄设备型号",
      itemSoftware: "软件/编辑信息",
      found: "已发现",
      notFound: "未发现",
      riskTip: "位置信息和设备信息可能在公开分享图片时被第三方读取，用于推断你的活动地点或设备信息。",
      cleanBtn: "一键清除隐私信息",
      cleanBtnSafe: "强制处理 (无风险)",
      confirmTitle: "清除后元数据将无法恢复，是否继续？",
      confirmYes: "确认继续清理",
      confirmNo: "取消",
      cleaning: "正在清理图片中的隐私信息…",
      cleaningDesc: "通过重绘像素物理移除元数据，不会影响画质",
      finishTitle: "隐私信息已成功清除",
      finishDesc: "图片中的 GPS、拍摄时间、设备等元数据已被移除。",
      download: "下载已清理图片",
      next: "处理下一张",
      finishTip: "建议使用清理后的图片进行分享，避免使用原始文件。",
      errFormat: "不支持的图片格式。仅支持 JPG, PNG, WebP。",
      errClean: "图片处理失败，请重试或尝试更换图片格式。"
    },
    blog: {
      readTime: "分钟阅读",
      back: "返回文章列表",
      readMore: "阅读全文"
    }
  },
  en: {
    brandDesc: "Focused on Logo generation and image privacy.",
    nav: {
      home: "Home",
      logoTools: "Logo Tools",
      privacyTools: "Privacy Tools",
      resources: "Resources"
    },
    home: {
      heroTitle: "The Developer's",
      heroDesc: "From geek-style Logo design to thorough image privacy scrubbing. BitShell provides client-side, serverless secure tools for developers.",
      btnLogo: "Create Logo",
      btnPrivacy: "Scrub Privacy",
      feature1Title: "Geek Logo Maker",
      feature1Desc: "Designed for GitHub Readme & Open Source. Terminal style, minimal style, SVG export.",
      feature2Title: "Privacy Scrubber",
      feature2Desc: "More than just removing EXIF. We detect GPS leaks and redraw pixels for absolute safety.",
      trust: "Client-side Only • No Upload • Open Source Friendly"
    },
    privacy: {
      uploadTitle: "Upload Image to Scan",
      uploadDesc: "Drag & Drop • JPG / PNG / WebP",
      uploadTrust: "Processed locally, no server upload",
      uploadHeic: "Note: Please convert HEIC to JPG first",
      scanning: "Detecting privacy info...",
      scanningDesc: "Analyzing location, device fingerprint, and timestamps",
      riskFound: "Privacy Risk Found",
      riskFoundDesc: "Image contains metadata that may leak privacy",
      noRisk: "No Privacy Info Detected",
      noRiskDesc: "No GPS or device metadata found in this image",
      itemGps: "GPS Location",
      itemTime: "Capture Time",
      itemDevice: "Device Model",
      itemSoftware: "Software Info",
      found: "Found",
      notFound: "Not Found",
      riskTip: "Location and device data can be read by third parties when shared publicly.",
      cleanBtn: "One-click Remove Privacy Info",
      cleanBtnSafe: "Process Anyway (Safe)",
      confirmTitle: "Metadata cannot be recovered. Continue?",
      confirmYes: "Continue",
      confirmNo: "Cancel",
      cleaning: "Cleaning privacy info...",
      cleaningDesc: "Physically scrubbing metadata via pixel redrawing",
      finishTitle: "Privacy Info Removed",
      finishDesc: "GPS, time, and device metadata have been stripped.",
      download: "Download Clean Image",
      next: "Process Next",
      finishTip: "Recommended to share the cleaned image instead of the original.",
      errFormat: "Unsupported format. Only JPG, PNG, WebP supported.",
      errClean: "Failed to load image for cleaning. File might be corrupted or unsupported."
    },
    blog: {
      readTime: "min read",
      back: "Back to List",
      readMore: "Read Full"
    }
  }
};

// ==========================================
// 1. 数据源：SEO 配置
// ==========================================
const SEO_DATA = {
  brand: {
    name: "BitShell",
  },
  tools: {
    developer_logo_generator: {
      category: "logoTools", // Matches I18N key
      icon: Terminal,
      pages: [
        { path: 'developer-logo-generator', title: "Developer Logo Generator", titleZh: "开发者 Logo 生成器" },
        { path: 'github-logo-generator', title: "GitHub Logo Generator", titleZh: "GitHub Logo 生成器" },
        { path: 'open-source-logo-generator', title: "Open Source Logo Maker", titleZh: "开源项目 Logo 制作" },
        { path: 'minimal-tech-logo', title: "Minimal Tech Logo", titleZh: "极简科技 Logo" }
      ]
    },
    image_privacy_protection: {
      category: "privacyTools", // Matches I18N key
      icon: Shield,
      pages: [
        { path: 'image-privacy-protection', title: "Privacy Protection Suite", titleZh: "隐私保护套件" },
        { path: 'exif-remover', title: "EXIF Data Remover", titleZh: "EXIF 数据移除器" },
        { path: 'remove-image-gps', title: "Remove Image GPS", titleZh: "移除图片 GPS" },
        { path: 'image-privacy-check', title: "Privacy Risk Checker", titleZh: "隐私风险检测" }
      ]
    }
  },
  resources: {
    blog: {
      category: "resources", // Matches I18N key
      icon: FileCode,
      pages: [
        { path: 'blog', title: "Tech & Privacy Blog", titleZh: "技术与隐私博客" }
      ],
      posts: [
        {
          id: 1,
          title: "GitHub 项目需要 Logo 吗？",
          desc: "一个好的 Logo 能让你的开源项目在 GitHub Trending 中脱颖而出。本文分析了 Top 100 开源项目的 Logo 设计趋势，以及为什么视觉识别对开发者同样重要。",
          date: "2026-03-20",
          readTime: 5,
          tags: ["GitHub", "开源运营", "设计"],
          content: `
            <h3>为什么你的 README 需要一张“脸”？</h3>
            <p>当我们浏览 GitHub Trending 时，第一眼看到的往往不是代码质量，而是项目的图标和 README 的排版。一个专业的 Logo 传达出的信息是：<strong>“这个项目是维护良好的，作者是认真的。”</strong></p>
            <h3>极客风格的设计趋势</h3>
            <p>对于开发者工具而言，不需要复杂的图形。目前流行的趋势包括：</p>
            <ul>
              <li><strong>终端风格：</strong> 使用 >_ 或 $ 符号，强调 CLI 属性。</li>
              <li><strong>极简几何：</strong> 使用简单的圆角矩形和单色背景，适应 Dark Mode。</li>
              <li><strong>首字母缩写：</strong> 类似 JS, TS 的处理方式，高辨识度。</li>
            </ul>
            <p>BitShell 的 Logo 生成器正是基于这些原则设计的。</p>
          `
        },
        {
          id: 2,
          title: "图片 EXIF 是什么？",
          desc: "照片元数据（Metadata）不仅记录了光圈快门，还可能记录了你的精确 GPS 坐标。深入了解 EXIF 的技术原理，以及它在数字取证中的应用。",
          date: "2026-03-15",
          readTime: 8,
          tags: ["科普", "EXIF", "数据安全"],
          content: `
            <h3>隐藏在像素背后的数据</h3>
            <p>Exchangeable Image File Format (EXIF) 是专门为数码相机的照片设定的文件格式。它记录了拍摄时的各种参数，包括：</p>
            <ul>
              <li><strong>拍摄设备：</strong> iPhone 15 Pro Max, Canon EOS R5...</li>
              <li><strong>拍摄参数：</strong> 光圈 F2.8, 快门 1/1000s, ISO 100...</li>
              <li><strong>地理位置：</strong> 纬度 37.7749° N, 经度 122.4194° W</li>
            </ul>
            <h3>它为何危险？</h3>
            <p>当你发送原图给陌生人，或者上传到未自动清洗 EXIF 的论坛时，任何人都可以通过“属性”查看这照片是在哪里拍的，精确度甚至能到具体的楼栋。</p>
          `
        },
        {
          id: 3,
          title: "为什么发图前要删除元数据？",
          desc: "通过一张原图，黑客可以定位你家住在哪里。社交媒体虽然会压缩图片，但通过 AirDrop、原图发送或网盘分享的文件依然存在巨大风险。",
          date: "2026-03-10",
          readTime: 4,
          tags: ["安全指南", "隐私保护"],
          content: `
            <h3>社交媒体是安全的吗？</h3>
            <p>微信朋友圈、Instagram 和 Twitter 通常会在上传时自动抹除 EXIF 信息以保护用户。但是，以下场景是<strong>高危区</strong>：</p>
            <ul>
              <li>微信/Telegram 发送“原图”</li>
              <li>通过邮件发送附件</li>
              <li>上传到网盘或个人博客</li>
            </ul>
            <h3>如何保护自己</h3>
            <p>使用 BitShell 的<strong>EXIF 清除工具</strong>，它在你的浏览器本地运行，不上传服务器，能瞬间移除所有敏感信息。</p>
          `
        }
      ]
    }
  }
};

// ==========================================
// 2. 基础组件：BrandIcon, LandingPage
// ==========================================
const BrandIcon = () => {
  const [imgError, setImgError] = useState(false);
  const userLogoPath = "./logo.jpg"; 

  if (!imgError) {
    return (
      <div className="w-8 h-8 rounded-lg shadow-lg overflow-hidden bg-white flex items-center justify-center">
        <img 
          src={userLogoPath} 
          alt="BitShell Logo" 
          className="w-full h-full object-contain"
          onError={() => setImgError(true)} 
        />
      </div>
    );
  }
  return (
    <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-1.5 rounded-lg shadow-lg">
      <Terminal size={20} />
    </div>
  );
};

const LandingPage = ({ onNavigate, lang }) => {
  const t = I18N[lang].home;

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] animate-fade-in px-4">
      <div className="mb-10 relative group cursor-default flex justify-center">
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative">
          <img 
            src="./logo.jpg" 
            alt="BitShell" 
            className="h-42 md:h-52 w-auto object-contain rounded-xl shadow-2xl"
            onError={(e) => {e.target.style.display='none';}} 
          />
          <Terminal size={64} className="text-white hidden" /> 
        </div>
      </div>

      
      <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-12 text-center leading-relaxed">
        {t.heroDesc}
      </p>
      
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-5 w-full max-w-lg">
        <button 
          onClick={() => onNavigate('developer-logo-generator')}
          className="flex-1 group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-900/20 transition-all hover:-translate-y-1"
        >
          <div className="flex items-center justify-center gap-3">
            <Terminal className="group-hover:scale-110 transition-transform" />
            {t.btnLogo}
          </div>
        </button>
        
        <button 
          onClick={() => onNavigate('image-privacy-protection')}
          className="flex-1 group relative px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 text-white rounded-xl font-bold text-lg transition-all hover:-translate-y-1"
        >
          <div className="flex items-center justify-center gap-3">
            <Shield className="group-hover:scale-110 transition-transform text-green-500" />
            {t.btnPrivacy}
          </div>
        </button>
      </div>

      {/* Trust Badges */}
      <div className="mt-16 pt-8 border-t border-slate-800/50 flex flex-col items-center">
        <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-6">{t.trust}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl text-left">
          <div onClick={() => onNavigate('developer-logo-generator')} className="bg-slate-800/50 p-6 rounded-xl border border-slate-800 hover:border-blue-500/30 transition-colors cursor-pointer">
            <div className="flex items-center gap-3 mb-2 text-blue-400 font-bold">
              <Zap size={18}/> {t.feature1Title}
            </div>
            <p className="text-sm text-slate-400">{t.feature1Desc}</p>
          </div>
          <div onClick={() => onNavigate('image-privacy-protection')} className="bg-slate-800/50 p-6 rounded-xl border border-slate-800 hover:border-green-500/30 transition-colors cursor-pointer">
            <div className="flex items-center gap-3 mb-2 text-green-400 font-bold">
              <Lock size={18}/> {t.feature2Title}
            </div>
            <p className="text-sm text-slate-400">{t.feature2Desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. 功能组件：Logo Generator
// ==========================================

const LogoGeneratorEngine = ({ pageConfig, lang }) => {
  const PRESETS = {
    minimal: { icon: 'code', bgType: 'solid', bgColor: '#0f172a', fgColor: '#e2e8f0', shape: 'rounded', label: 'Minimal / 极简' },
    terminal: { icon: 'terminal', bgType: 'solid', bgColor: '#1e1e1e', fgColor: '#22c55e', shape: 'square', label: 'Terminal / 终端' },
    geometric: { icon: 'box', bgType: 'gradient-1', bgColor: '#2563eb', fgColor: '#ffffff', shape: 'circle', label: 'Geometric / 几何' },
    hacker: { icon: 'hash', bgType: 'solid', bgColor: '#000000', fgColor: '#00ff00', shape: 'square', label: 'Hacker / 极客' },
  };

  const gradients = {
    'gradient-1': { start: '#2563eb', end: '#9333ea' }, 
    'gradient-2': { start: '#ea580c', end: '#eab308' }, 
    'gradient-3': { start: '#059669', end: '#34d399' }, 
    'gradient-dark': { start: '#0f172a', end: '#334155' }, 
  };

  const iconLibrary = [
    // === 基础/终端 ===
    { key: 'terminal', icon: Terminal }, 
    { key: 'code', icon: Code },
    { key: 'command', icon: Command },
    { key: 'hash', icon: Hash },
    
    // === 开发/代码 ===
    { key: 'github', icon: Github }, 
    { key: 'git', icon: Zap },
    { key: 'bug', icon: Bug },          // 新增：Bug
    { key: 'puzzle', icon: Puzzle },    // 新增：插件/拼图
    { key: 'box', icon: Box },          // 修复：之前几何预设用了 box 但这里没定义

    // === 架构/云端 ===
    { key: 'cpu', icon: Cpu }, 
    { key: 'server', icon: Server }, 
    { key: 'database', icon: Database }, // 新增：数据库
    { key: 'cloud', icon: Cloud },       // 新增：云服务
    { key: 'network', icon: Network },   // 新增：网络/节点
    { key: 'globe', icon: Globe },
    
    // === 极客/生活 ===
    { key: 'coffee', icon: Coffee },
    { key: 'game', icon: Gamepad2 },     // 新增：游戏手柄
    { key: 'rocket', icon: Rocket },     // 新增：发布/火箭
    { key: 'bot', icon: Bot },           // 新增：机器人/AI
    { key: 'radio', icon: Radio },       // 新增：信号/广播

    // === 抽象/艺术 ===
    { key: 'activity', icon: Activity },
    { key: 'layers', icon: Layers },     // 新增：图层/全栈
    { key: 'sparkles', icon: Sparkles }, // 新增：AI/魔法
    { key: 'infinity', icon: Infinity }, // 新增：DevOps/无限
    { key: 'feather', icon: Feather },   // 新增：轻量级
    { key: 'aperture', icon: Aperture }, // 新增：光圈/科技

    // === 安全/隐私 ===
    { key: 'lock', icon: Lock }, 
    { key: 'shield', icon: Shield },
    { key: 'ghost', icon: Ghost },       // 新增：幽灵/隐私
    { key: 'fingerprint', icon: Fingerprint }, // 新增：指纹/ID
    { key: 'anchor', icon: Anchor },     // 新增：锚点/Hook
  ];

  const [step, setStep] = useState(1);
  const [projectName, setProjectName] = useState('');
  const [projectType, setProjectType] = useState('');
  const [iconKey, setIconKey] = useState('terminal');
  const [customIcon, setCustomIcon] = useState(null); 
  const [shape, setShape] = useState('rounded'); 
  const [bgType, setBgType] = useState('solid');
  const [bgColor, setBgColor] = useState('#1e1e1e');
  const [fgColor, setFgColor] = useState('#4ade80');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [exportFormat, setExportFormat] = useState('png');
  const [previewMode, setPreviewMode] = useState('card'); 
  const fileInputRef = useRef(null);

  useEffect(() => {
    setStep(1);
    setProjectName(''); 
    setCustomIcon(null);

    if (pageConfig.path === 'github-logo-generator') {
      setIconKey('git');
      setBgType('gradient-dark');
      setFgColor('#ffffff');
      setShape('circle');
      setPreviewMode('readme');
    } else if (pageConfig.path === 'minimal-tech-logo') {
      setIconKey('code');
      setBgType('solid');
      setBgColor('#000000');
      setFgColor('#ffffff');
      setShape('square');
      setPreviewMode('card');
    } else if (pageConfig.path === 'open-source-logo-generator') {
      setIconKey('globe');
      setBgType('gradient-1');
      setFgColor('#ffffff');
      setShape('rounded');
      setPreviewMode('card');
    } else {
      setIconKey('terminal');
      setBgType('solid');
      setBgColor('#1e1e1e');
      setFgColor('#4ade80');
      setShape('rounded');
      setPreviewMode('card');
    }
  }, [pageConfig.path]);

  const handlePresetSelect = (key) => {
    const p = PRESETS[key];
    setIconKey(p.icon);
    setBgType(p.bgType);
    setBgColor(p.bgColor);
    setFgColor(p.fgColor);
    setShape(p.shape);
    setStep(3); 
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setCustomIcon(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const getIconComponent = (key, props) => {
    // 修复：使用 SVG 原生的 image 标签，确保导出图片时图标可见
    if (customIcon) {
      return (
        <image 
          href={customIcon} 
          width={props.size} 
          height={props.size} 
          preserveAspectRatio="xMidYMid meet"
        />
      );
    }
    const found = iconLibrary.find(i => i.key === key);
    const IconComp = found ? found.icon : Terminal;
    return <IconComp {...props} />;
  };

  const copyReadmeCode = () => {
    const safeProjectName = projectName.replace(/"/g, '&quot;');
    const fileNameSlug = projectName.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'logo';
    const code = `<p align="center">\n  <img src="./${fileNameSlug}-logo.svg" width="150" alt="${safeProjectName} Logo" />\n</p>`;
    
    const textarea = document.createElement('textarea');
    textarea.value = code;
    textarea.style.position = 'fixed'; 
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      alert(lang === 'zh' ? "README 代码已复制！" : "README code copied!");
    } catch (err) {
      alert("Error copying code.");
    }
    document.body.removeChild(textarea);
  };

  const handleDownload = () => {
    const svg = document.getElementById('preview-svg');
    if (!svg) return;
    const filename = `${projectName.toLowerCase().replace(/\s+/g, '-') || 'logo'}-logo`;

    if (exportFormat === 'svg') {
      const svgData = new XMLSerializer().serializeToString(svg);
      const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${filename}.svg`;
      link.click();
    } else {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      img.onload = () => {
        canvas.width = 1024; canvas.height = 1024;
        ctx.drawImage(img, 0, 0, 1024, 1024);
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `${filename}.png`;
        link.click();
        URL.revokeObjectURL(url);
      };
      img.src = url;
    }
  };

  // Step 1: Input
  if (step === 1) {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in mt-12">
        <div className="text-center mb-10">
           <div className="inline-flex items-center justify-center p-3 bg-blue-600/20 rounded-xl mb-4 text-blue-400">
             {pageConfig.path.includes('github') ? <Github size={32} /> : 
              pageConfig.path.includes('minimal') ? <Code size={32} /> :
              pageConfig.path.includes('open-source') ? <Globe size={32} /> :
              <Terminal size={32} />}
           </div>
           <h2 className="text-3xl font-bold text-white mb-2">{lang === 'zh' ? pageConfig.titleZh : pageConfig.title}</h2>
           <p className="text-slate-400">{lang === 'zh' ? "两步完成。简单、专业、极客风。" : "Two steps. Simple, Professional, Geeky."}</p>
        </div>

        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-xl">
           <div className="mb-6">
             <label className="block text-sm font-bold text-slate-300 mb-2">{lang === 'zh' ? "项目名称 (Project Name)" : "Project Name"} <span className="text-red-400">*</span></label>
             <input 
               type="text" 
               value={projectName}
               onChange={(e) => setProjectName(e.target.value.slice(0, 12))}
               placeholder="例如: BitShell, lib-auth"
               className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-4 text-xl text-white font-mono focus:border-blue-500 outline-none transition-all placeholder:text-slate-600"
               autoFocus
             />
           </div>
           <button 
             disabled={!projectName.trim()}
             onClick={() => setStep(2)}
             className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${projectName.trim() ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20' : 'bg-slate-700 text-slate-500 cursor-not-allowed'}`}
           >
             {lang === 'zh' ? "下一步：选择风格" : "Next: Choose Style"} <ChevronRight />
           </button>
        </div>
      </div>
    );
  }

  // Step 2: Style
  if (step === 2) {
    return (
      <div className="max-w-4xl mx-auto animate-fade-in mt-8">
        <button onClick={() => setStep(1)} className="flex items-center gap-1 text-slate-500 hover:text-white mb-6 transition-colors">
          <ArrowLeft size={16} /> {lang === 'zh' ? "返回修改名称" : "Back"}
        </button>
        <h2 className="text-2xl font-bold text-white mb-6 text-center">{lang === 'zh' ? "选择一个预设风格" : "Choose a Preset Style"}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(PRESETS).map(([key, p]) => (
            <div key={key} onClick={() => handlePresetSelect(key)} className="bg-slate-800 p-6 rounded-xl border border-slate-700 cursor-pointer hover:border-blue-500 hover:bg-slate-750 transition-all group relative overflow-hidden">
               <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                 <div className="bg-blue-600 text-white p-1 rounded-full"><Check size={16}/></div>
               </div>
               <div className="flex items-center gap-4">
                 <div className="w-16 h-16 rounded-lg flex items-center justify-center shadow-inner" style={{ background: p.bgType === 'solid' ? p.bgColor : `linear-gradient(135deg, ${gradients[p.bgType]?.start}, ${gradients[p.bgType]?.end})` }}>
                    <div style={{ color: p.fgColor }}>{getIconComponent(p.icon, { size: 24 })}</div>
                 </div>
                 <div>
                   <h3 className="text-white font-bold text-lg">{p.label}</h3>
                 </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Step 3: Workspace
  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 animate-fade-in pb-12">
      <div className="xl:col-span-4 flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-2">
           <button onClick={() => setStep(2)} className="p-2 rounded hover:bg-slate-800 text-slate-400 hover:text-white"><ArrowLeft size={18}/></button>
           <h2 className="text-xl font-bold text-white">{lang === 'zh' ? "配置与微调" : "Configuration"}</h2>
        </div>
        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
           <div className="mb-4">
             <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">{lang === 'zh' ? "项目名称" : "Name"}</label>
             <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value.toUpperCase().slice(0, 10))} className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-white font-mono"/>
           </div>
           
           <div className="grid grid-cols-6 gap-2 mb-3">
               {iconLibrary.map((item) => (
                 <button key={item.key} onClick={() => {setIconKey(item.key); setCustomIcon(null);}} className={`p-2 rounded-lg border flex justify-center items-center transition-all ${!customIcon && iconKey === item.key ? 'border-blue-500 bg-blue-500/20 text-blue-400' : 'border-slate-700 bg-slate-900 text-slate-400 hover:bg-slate-750'}`}><item.icon size={18} /></button>
               ))}
           </div>
           <div onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 cursor-pointer text-xs text-slate-400 hover:text-blue-400 transition-colors border border-dashed border-slate-700 rounded p-2 justify-center hover:border-blue-500/50">
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
              <Upload size={14} /> <span>{customIcon ? (lang === 'zh' ? '更换自定义图标' : 'Change Icon') : (lang === 'zh' ? '上传 SVG / PNG' : 'Upload SVG/PNG')}</span>
           </div>
        </div>

        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
           <button onClick={() => setShowAdvanced(!showAdvanced)} className="w-full flex items-center justify-between p-4 text-sm font-bold text-slate-300 hover:bg-slate-750">
             <span className="flex items-center gap-2"><Settings size={16}/> {lang === 'zh' ? "高级设置 (可选)" : "Advanced"}</span>
             <ChevronRight size={16} className={`transition-transform ${showAdvanced ? 'rotate-90' : ''}`}/>
           </button>
           {showAdvanced && (
             <div className="p-5 pt-0 border-t border-slate-700/50 space-y-5 animate-fade-in">
                <div className="mt-4">
                  <label className="text-xs text-slate-500 mb-2 block">{lang === 'zh' ? "图标形状" : "Shape"}</label>
                  <div className="flex gap-2">
                    {[{ id: 'square', label: lang === 'zh'?'正方形':'Square' }, { id: 'rounded', label: lang === 'zh'?'圆角':'Rounded' }, { id: 'circle', label: lang === 'zh'?'圆形':'Circle' }].map(s => (
                      <button key={s.id} onClick={() => setShape(s.id)} className={`flex-1 py-1.5 text-xs rounded border capitalize ${shape === s.id ? 'border-blue-500 bg-blue-500/10 text-white' : 'border-slate-700 bg-slate-900 text-slate-400'}`}>{s.label}</button>
                    ))}
                  </div>
                </div>
                <div>
                   <label className="text-xs text-slate-500 mb-2 block">{lang === 'zh' ? "背景风格" : "Background"}</label>
                   <div className="flex gap-2">
                      <button onClick={() => setBgType('solid')} className={`w-6 h-6 rounded-full border-2 ${bgType === 'solid' ? 'border-white' : 'border-slate-600 bg-slate-900'}`} />
                      {Object.keys(gradients).map(g => (
                        <button key={g} onClick={() => setBgType(g)} className={`w-6 h-6 rounded-full border-2 ${bgType === g ? 'border-white' : 'border-transparent'}`} style={{background: `linear-gradient(135deg, ${gradients[g].start}, ${gradients[g].end})`}} />
                      ))}
                   </div>
                   {bgType === 'solid' && <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-full h-8 mt-2 bg-transparent rounded cursor-pointer" />}
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-2 block">{lang === 'zh' ? "前景颜色" : "Foreground"}</label>
                  <input type="color" value={fgColor} onChange={e => setFgColor(e.target.value)} className="w-full h-8 bg-transparent rounded cursor-pointer" />
                </div>
             </div>
           )}
        </div>

        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
           <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">{lang === 'zh' ? "导出资源" : "Export"}</h3>
           <div className="flex gap-2 mb-3">
             <button onClick={() => setExportFormat('svg')} className={`flex-1 py-2 rounded text-sm font-medium border ${exportFormat === 'svg' ? 'bg-blue-600 border-blue-500 text-white' : 'border-slate-600 text-slate-400'}`}>SVG</button>
             <button onClick={() => setExportFormat('png')} className={`flex-1 py-2 rounded text-sm font-medium border ${exportFormat === 'png' ? 'bg-blue-600 border-blue-500 text-white' : 'border-slate-600 text-slate-400'}`}>PNG</button>
           </div>
           <button onClick={handleDownload} className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2">
             <Download size={18} /> {lang === 'zh' ? "下载文件" : "Download"}
           </button>
           <button onClick={copyReadmeCode} className="w-full mt-2 bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 py-2 rounded-lg flex items-center justify-center gap-2 text-sm">
             <Copy size={16} /> {lang === 'zh' ? "复制 README 用法" : "Copy README Code"}
           </button>
        </div>
      </div>
      {/* 预览区域 */}
      <div className="xl:col-span-8 flex flex-col bg-slate-900 rounded-xl border border-slate-800 overflow-hidden relative min-h-[600px]">
         <div className="flex border-b border-slate-800 bg-slate-900/50 backdrop-blur">
            <button onClick={() => setPreviewMode('card')} className={`px-6 py-4 text-sm font-medium flex items-center gap-2 ${previewMode === 'card' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-500'}`}><Monitor size={16}/> {lang === 'zh' ? "核心预览" : "Preview"}</button>
            <button onClick={() => setPreviewMode('readme')} className={`px-6 py-4 text-sm font-medium flex items-center gap-2 ${previewMode === 'readme' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-500'}`}><Github size={16}/> {lang === 'zh' ? "README 模拟" : "README Sim"}</button>
         </div>
         <div className="flex-1 flex items-center justify-center p-8 bg-grid-pattern relative overflow-hidden">
             {previewMode === 'card' ? (
               <div className="relative group shadow-2xl transition-all duration-300 hover:scale-105">
                  {/* 修复：确保 SVG 结构纯净，便于导出 */}
                  <svg id="preview-svg" width="400" height="400" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="rounded-xl shadow-2xl">
                    <defs>{Object.keys(gradients).map(g => (<linearGradient key={g} id={`gradient`} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor={gradients[g].start} /><stop offset="100%" stopColor={gradients[g].end} /></linearGradient>))}</defs>
                    <rect width="512" height="512" fill={bgType === 'solid' ? bgColor : `url(#gradient)`} rx={shape === 'circle' ? 256 : (shape === 'rounded' ? 96 : 0)} />
                    
                    {/* 坐标系原点移到中心 (256, 256) */}
                    <g transform="translate(256, 256)">
                        {/* 如果有项目名称，图标向上偏移 40px */}
                        <g transform={`translate(0, ${projectName ? -40 : 0})`}>
                           {/* 核心修复：移除 foreignObject，使用 translate(-80, -80) 将 160px 的图标居中 */}
                           <g transform="translate(-80, -80)">
                              {getIconComponent(iconKey, { size: 160, color: fgColor, strokeWidth: 2 })}
                           </g>
                        </g>
                        {projectName && <text y="140" textAnchor="middle" fill={fgColor} fontFamily="monospace" fontWeight="bold" fontSize="64">{projectName}</text>}
                    </g>
                  </svg>
               </div>
            ) : (
               <div className="w-full max-w-2xl bg-[#0d1117] border border-[#30363d] rounded-xl overflow-hidden shadow-2xl">
                  {/* Fake README Browser ... */}
                  <div className="bg-[#161b22] border-b border-[#30363d] p-3 flex items-center gap-2"><div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div><div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div></div></div>
                  <div className="p-8 font-sans text-[#c9d1d9] flex justify-center">
                      {/* 修复：README 模式下也添加 id="preview-svg"，以防用户在此模式点击下载 */}
                      <svg id="preview-svg" width="150" height="150" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                         <defs>{Object.keys(gradients).map(g => (<linearGradient key={g} id={`readme-gradient`} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor={gradients[g].start} /><stop offset="100%" stopColor={gradients[g].end} /></linearGradient>))}</defs>
                         <rect width="512" height="512" fill={bgType === 'solid' ? bgColor : `url(#readme-gradient)`} rx={shape === 'circle' ? 256 : (shape === 'rounded' ? 96 : 0)} />
                         <g transform="translate(256, 256)">
                            <g transform={`translate(0, ${projectName ? -40 : 0})`}>
                               {/* 核心修复：同上，纯 SVG 定位 */}
                               <g transform="translate(-80, -80)">
                                  {getIconComponent(iconKey, { size: 160, color: fgColor, strokeWidth: 2 })}
                               </g>
                             </g>
                             {projectName && <text y="140" textAnchor="middle" fill={fgColor} fontFamily="monospace" fontWeight="bold" fontSize="64">{projectName}</text>}
                          </g>
                       </svg>
                   </div>
                </div>
            )}
         </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. 组件：隐私保护核心 (PrivacyEngine)
// ==========================================
const PrivacyEngine = ({ pageConfig, lang }) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [step, setStep] = useState('upload'); 
  const [cleanedUrl, setCleanedUrl] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [hasRisk, setHasRisk] = useState(false); 
  const [riskDetails, setRiskDetails] = useState({ gps: false, time: false, device: false, software: false });
  const [exifData, setExifData] = useState(null);
  const [errorModal, setErrorModal] = useState(null); // { title, content }

  // FIX: isChecker logic - STRICT check for 'image-privacy-check' only
  const isChecker = pageConfig.path === 'image-privacy-check';
  const t = I18N[lang].privacy;

  // Load exifr library
  useEffect(() => {
    if (!window.exifr) {
      const script = document.createElement('script');
      script.src = "https://cdn.jsdelivr.net/npm/exifr@7.1.3/dist/full.umd.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleFile = async (e) => {
    if (e.target.files[0]) {
       const selectedFile = e.target.files[0];
       
       // HEIC Check
       const isHeic = selectedFile.name.toLowerCase().endsWith('.heic') || selectedFile.type === 'image/heic' || selectedFile.type === 'image/heif';
       if (isHeic) {
           setErrorModal({
               title: lang === 'zh' ? "暂不支持 HEIC 图片" : "HEIC Not Supported",
               content: lang === 'zh' 
                   ? "检测到您上传的是 HEIC 格式图片（iPhone 默认照片格式）。\n当前版本暂不支持该格式的处理。\n请先将图片转换为 JPG 或 PNG 后再上传。"
                   : "HEIC format detected (iPhone default).\nCurrent version does not support this format.\nPlease convert to JPG or PNG before uploading."
           });
           e.target.value = ''; // Reset input
           return;
       }

       if (selectedFile.size > 50 * 1024 * 1024) { alert(lang === 'zh' ? "文件过大 (超过 50MB)" : "File too large (>50MB)"); return; }
       setFile(selectedFile);
       setPreviewUrl(URL.createObjectURL(selectedFile));
       setStep('scanning');
       
       let attempts = 0;
       while (!window.exifr && attempts < 10) { await new Promise(r => setTimeout(r, 200)); attempts++; }
       if(!window.exifr) { setStep('upload'); return; }

       try {
         const output = await window.exifr.parse(selectedFile, { tiff: true, xmp: true, gps: true, ifd0: true, exif: true, pick: ['latitude', 'longitude', 'DateTimeOriginal', 'CreateDate', 'Make', 'Model', 'Software', 'ModifyDate', 'CreatorTool'] });
         if (output) {
           const lat = output.latitude; const lng = output.longitude;
           const hasGps = lat !== undefined && lng !== undefined;
           
           const risks = {
             gps: hasGps,
             time: !!(output.DateTimeOriginal || output.CreateDate),
             device: !!(output.Make || output.Model),
             software: !!(output.Software || output.CreatorTool)
           };

           setRiskDetails(risks);
           const foundRisk = risks.gps || risks.time || risks.device || risks.software;
           setHasRisk(foundRisk);
           
           if(foundRisk) {
             const gpsStr = hasGps ? `${lat.toFixed(6)}, ${lng.toFixed(6)}` : t.notFound;
             
             const make = output.Make || "";
             const model = output.Model || "";
             const deviceStr = (make + " " + model).trim() || t.notFound;
             
             let timeStr = t.notFound;
             const dateObj = output.DateTimeOriginal || output.CreateDate;
             if (dateObj) timeStr = dateObj instanceof Date ? dateObj.toLocaleString() : String(dateObj);
             
             const softStr = output.Software || output.CreatorTool || t.notFound;

             setExifData({ gps: gpsStr, device: deviceStr, time: timeStr, software: softStr });
           }
         } else {
             setHasRisk(false);
             setRiskDetails({ gps: false, time: false, device: false, software: false });
         }
       } catch (e) { console.warn(e); setHasRisk(false); }
       setTimeout(() => setStep('analysis'), 800);
    }
  };

  const executeClean = () => {
    setShowConfirm(false);
    setStep('cleaning');

    // Give UI a moment to update
    setTimeout(() => {
        // Attempt 1: FileReader to DataURL (most compatible way to load local images for canvas)
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const img = new Image();
            
            img.onload = () => {
                try {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0); 
                    
                    canvas.toBlob((blob) => {
                        if (blob) {
                            if (cleanedUrl) URL.revokeObjectURL(cleanedUrl);
                            setCleanedUrl(URL.createObjectURL(blob));
                            setStep('finish');
                        } else {
                            throw new Error("Canvas export failed");
                        }
                    }, 'image/jpeg', 0.95);
                } catch (err) {
                    console.error("Canvas error:", err);
                    alert(t.errClean);
                    setStep('analysis');
                }
            };

            img.onerror = (err) => {
                console.error("Image load error:", err);
                alert(t.errClean);
                setStep('analysis');
            };

            img.src = e.target.result; // Data URL
        };

        reader.onerror = (err) => {
            console.error("FileReader error:", err);
            alert(t.errClean);
            setStep('analysis');
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            alert(t.errClean);
            setStep('analysis');
        }
    }, 100);
  };

  if (step === 'upload') {
    return (
      <div className="max-w-4xl mx-auto animate-fade-in text-center mt-12">
        <h2 className="text-3xl font-bold text-white mb-3 flex justify-center items-center gap-2"><Shield size={32} className="text-blue-500" /> {lang === 'zh' ? pageConfig.titleZh : pageConfig.title}</h2>
        <div className="border-2 border-dashed border-slate-700 bg-slate-800/50 rounded-2xl p-16 mt-8 relative">
           <input type="file" accept="image/jpeg, image/png, image/webp" onChange={handleFile} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
           <Upload className="w-16 h-16 text-slate-500 mx-auto mb-4" />
           <p className="text-xl font-bold text-white">{t.uploadTitle}</p>
           <p className="text-slate-500 mt-2">{t.uploadDesc}</p>
           <div className="flex flex-col gap-2 items-center mt-6">
             <div className="inline-flex items-center gap-2 bg-slate-900/80 border border-slate-700 px-4 py-2 rounded-full text-xs text-slate-400"><Lock size={12} className="text-green-400" /> {t.uploadTrust}</div>
             <p className="text-[10px] text-slate-600">{t.uploadHeic}</p>
          </div>
        </div>

        {/* Error Modal */}
        {errorModal && (
             <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
               <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-md w-full shadow-2xl relative">
                 <button onClick={() => setErrorModal(null)} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X size={20} /></button>
                 <div className="flex flex-col items-center text-center">
                   <div className="w-12 h-12 bg-orange-500/20 text-orange-500 rounded-full flex items-center justify-center mb-4"><AlertTriangle size={24} /></div>
                   <h3 className="text-xl font-bold text-white mb-2">{errorModal.title}</h3>
                   <p className="text-slate-400 mb-6 leading-relaxed whitespace-pre-wrap">{errorModal.content}</p>
                   <button onClick={() => setErrorModal(null)} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold transition-colors">{lang === 'zh' ? '知道了' : 'Got it'}</button>
                 </div>
               </div>
             </div>
        )}
      </div>
    );
  }
  
  if (step === 'scanning') {
    return (
      <div className="max-w-2xl mx-auto bg-slate-800 rounded-2xl p-12 text-center border border-slate-700 animate-fade-in mt-12">
        <div className="flex justify-center mb-6"><RefreshCw className="animate-spin text-blue-500" size={48} /></div>
        <h3 className="text-xl font-bold text-white">{t.scanning}</h3>
        <p className="text-slate-500 mt-2 text-sm">{t.scanningDesc}</p>
      </div>
    );
  }

  if (step === 'analysis') {
      return (
          <div className="max-w-4xl mx-auto animate-fade-in grid md:grid-cols-2 gap-8 mt-12 items-start">
             <div className="bg-slate-800 p-4 rounded-xl relative">
               <img src={previewUrl} className="w-full rounded" />
               {hasRisk && <div className="absolute top-6 left-6 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg"><AlertTriangle size={12}/> {lang==='zh'?"隐私风险":"RISK DETECTED"}</div>}
             </div>
             
             <div className="space-y-6">
                <div className={`p-5 rounded-xl border flex gap-4 ${hasRisk ? 'bg-orange-500/10 border-orange-500/20' : 'bg-green-500/10 border-green-500/20'}`}>
                   <div className={`p-2 rounded-lg h-fit ${hasRisk ? 'bg-orange-500/20 text-orange-500' : 'bg-green-500/20 text-green-500'}`}>
                     {hasRisk ? <AlertTriangle size={24}/> : <CheckCircle size={24}/>}
                   </div>
                   <div>
                     <h4 className={`font-bold text-lg ${hasRisk ? 'text-orange-400' : 'text-green-400'}`}>{hasRisk ? t.riskFound : t.noRisk}</h4>
                     <p className={`text-sm mt-1 ${hasRisk ? 'text-orange-300/70' : 'text-green-300/70'}`}>{hasRisk ? t.riskFoundDesc : t.noRiskDesc}</p>
                   </div>
                </div>

                <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                   <div className="px-5 py-3 border-b border-slate-700/50 text-xs font-bold text-slate-400 uppercase tracking-wider">{lang==='zh'?"检测详情":"DETAILS"}</div>
                   <div className="divide-y divide-slate-700/50">
                     <div className="p-4 flex justify-between items-center">
                        <span className="text-slate-300 flex items-center gap-3"><MapIcon size={18} className="text-slate-500"/> {t.itemGps}</span> 
                        <span>
                            {hasRisk && riskDetails.gps ? 
                                // FIX 1: Only show detailed value if isChecker is true
                                (isChecker ? 
                                    <span className="text-orange-400 text-sm font-medium font-mono text-right block max-w-[150px] truncate" title={exifData?.gps}>{exifData?.gps}</span> : 
                                    <span className="text-orange-400 flex items-center gap-1 font-bold text-sm"><Check size={14}/> {t.found}</span>
                                ) : <span className="text-slate-500 text-sm">{t.notFound}</span>
                            }
                        </span>
                     </div>
                     <div className="p-4 flex justify-between items-center">
                        <span className="text-slate-300 flex items-center gap-3"><Clock size={18} className="text-slate-500"/> {t.itemTime}</span> 
                        <span>
                            {hasRisk && riskDetails.time ? 
                                (isChecker ? 
                                    <span className="text-orange-400 text-sm font-medium font-mono text-right block max-w-[150px] truncate" title={exifData?.time}>{exifData?.time}</span> : 
                                    <span className="text-orange-400 flex items-center gap-1 font-bold text-sm"><Check size={14}/> {t.found}</span>
                                ) : <span className="text-slate-500 text-sm">{t.notFound}</span>
                            }
                        </span>
                     </div>
                     <div className="p-4 flex justify-between items-center">
                        <span className="text-slate-300 flex items-center gap-3"><Smartphone size={18} className="text-slate-500"/> {t.itemDevice}</span> 
                        <span>
                            {hasRisk && riskDetails.device ? 
                                (isChecker ? 
                                    <span className="text-orange-400 text-sm font-medium font-mono text-right block max-w-[150px] truncate" title={exifData?.device}>{exifData?.device}</span> : 
                                    <span className="text-orange-400 flex items-center gap-1 font-bold text-sm"><Check size={14}/> {t.found}</span>
                                ) : <span className="text-slate-500 text-sm">{t.notFound}</span>
                            }
                        </span>
                     </div>
                     
                     {/* 修改：移除 isChecker 判断，让所有工具都显示软件信息 */}
                     <div className="p-4 flex justify-between items-center">
                        <span className="text-slate-300 flex items-center gap-3"><Code size={18} className="text-slate-500"/> {t.itemSoftware}</span>
                        <span>
                            {hasRisk && riskDetails.software ? 
                                <span className="text-orange-400 text-sm font-medium font-mono text-right block max-w-[150px] truncate" title={exifData?.software}>{exifData?.software}</span> : 
                                <span className="text-slate-500 text-sm">{t.notFound}</span>
                            }
                        </span>
                     </div>

                   </div>
                </div>

                {hasRisk && <p className="text-xs text-slate-500 leading-relaxed flex gap-2"><Info size={14} className="shrink-0 mt-0.5"/> {t.riskTip}</p>}

                <div className="pt-2">
                  {!showConfirm ? (
                    <button onClick={() => hasRisk ? setShowConfirm(true) : executeClean()} className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg transition-all ${hasRisk ? 'bg-orange-600 hover:bg-orange-500 text-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'}`}>
                      {hasRisk ? <Lock size={20}/> : <RefreshCw size={20}/>} {hasRisk ? t.cleanBtn : t.cleanBtnSafe}
                    </button>
                  ) : (
                    <div className="bg-slate-800 border border-orange-500/30 rounded-xl p-4 animate-fade-in">
                      <p className="text-orange-300 text-sm mb-4 text-center font-medium">{t.confirmTitle}</p>
                      <div className="flex gap-3">
                        <button onClick={() => setShowConfirm(false)} className="flex-1 py-2 rounded-lg border border-slate-600 text-slate-400 hover:bg-slate-700 text-sm">{t.confirmNo}</button>
                        <button onClick={executeClean} className="flex-1 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm">{t.confirmYes}</button>
                      </div>
                    </div>
                  )}
                  {!hasRisk && !showConfirm && <button onClick={() => setStep('upload')} className="w-full mt-3 py-2 text-sm text-slate-500 hover:text-slate-300">{t.confirmNo}</button>}
                </div>
             </div>
          </div>
      )
  }

  if (step === 'cleaning') {
    return (
      <div className="max-w-2xl mx-auto bg-slate-800 rounded-2xl p-12 text-center border border-slate-700 animate-fade-in mt-12">
        <div className="flex justify-center mb-6"><RefreshCw className="animate-spin text-green-500" size={48} /></div>
        <h3 className="text-xl font-bold text-white">{t.cleaning}</h3>
        <p className="text-slate-500 mt-2 text-sm">{t.cleaningDesc}</p>
      </div>
    );
  }

  if (step === 'finish') {
      return (
          <div className="max-w-md mx-auto text-center mt-12 bg-slate-800 p-10 rounded-2xl border border-green-500/20 animate-fade-in">
             <div className="inline-flex p-4 rounded-full bg-green-500/10 mb-6 ring-1 ring-green-500/30"><CheckCircle className="w-12 h-12 text-green-500"/></div>
             <h3 className="text-2xl text-white font-bold mb-2">{t.finishTitle}</h3>
             <p className="text-slate-400 mb-8 text-sm">{t.finishDesc}</p>
             <div className="space-y-3">
               <a href={cleanedUrl} download={`safe_${file.name.replace(/\.[^/.]+$/, "")}.jpg`} className="w-full bg-green-600 hover:bg-green-500 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-900/20 transition-all hover:-translate-y-0.5"><Download size={20}/> {t.download}</a>
               <button onClick={() => setStep('upload')} className="w-full py-3.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors flex items-center justify-center gap-2"><RefreshCw size={18}/> {t.next}</button>
             </div>
             <div className="mt-6 pt-6 border-t border-slate-700/50"><p className="text-xs text-slate-500">{t.finishTip}</p></div>
          </div>
      )
  }

  return <div className="text-center mt-20 text-slate-500">Loading...</div>;
};

// ==========================================
// 5. 组件：博客引擎 (BlogEngine)
// ==========================================
const BlogEngine = ({ pageConfig, lang }) => {
  const [activePost, setActivePost] = useState(null);
  const posts = SEO_DATA.resources.blog.posts;
  const t = I18N[lang].blog;

  if (activePost) {
    return (
      <div className="max-w-3xl mx-auto animate-fade-in mt-12">
        <button 
          onClick={() => setActivePost(null)}
          className="flex items-center gap-2 text-blue-400 hover:text-white mb-6 text-sm font-medium transition-colors"
        >
          <ArrowLeft size={16} /> {t.back}
        </button>
        
        <article className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-8 md:p-12">
          <header className="mb-8 border-b border-slate-700/50 pb-8">
            <div className="flex gap-2 mb-4">
              {activePost.tags.map(tag => (
                <span key={tag} className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded-full border border-blue-500/20">
                  #{tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">{activePost.title}</h1>
            <div className="flex items-center gap-4 text-slate-400 text-sm">
              <span className="flex items-center gap-1"><Calendar size={14}/> {activePost.date}</span>
              <span className="flex items-center gap-1"><Clock size={14}/> {activePost.readTime} {t.readTime}</span>
            </div>
          </header>
          
          <div 
            className="prose prose-invert max-w-none text-slate-300 prose-headings:text-white prose-strong:text-white prose-a:text-blue-400"
            dangerouslySetInnerHTML={{ __html: activePost.content }}
          />
        </article>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto animate-fade-in mt-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4 flex justify-center items-center gap-2">
           <BookOpen size={32} className="text-blue-400" />
           {lang === 'zh' ? pageConfig.titleZh : pageConfig.title}
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <div 
            key={post.id}
            onClick={() => setActivePost(post)}
            className="bg-slate-800 rounded-xl border border-slate-700 p-6 cursor-pointer group hover:border-blue-500/50 hover:bg-slate-800/80 transition-all hover:-translate-y-1 hover:shadow-xl flex flex-col"
          >
            <div className="flex gap-2 mb-4">
              {post.tags.slice(0, 2).map(tag => (
                <span key={tag} className="text-xs bg-slate-900 text-slate-400 px-2 py-1 rounded border border-slate-700">
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-slate-400 text-sm mb-4 line-clamp-3 leading-relaxed flex-grow">
              {post.desc}
            </p>
            <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-700/50 pt-4 mt-auto">
              <span className="flex items-center gap-1"><Calendar size={12}/> {post.date}</span>
              <span className="flex items-center gap-1 text-blue-400 group-hover:underline">{t.readMore} <ChevronRight size={12}/></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 6. 主程序：App
// ==========================================
export default function App() {
  useEffect(() => {
    const targetDomain = 'bs.kksm.qzz.io'; 
    if (window.location.hostname.includes('pages.dev')) {
      window.location.replace(`https://${targetDomain}${window.location.pathname}${window.location.search}`);
    }
  }, []);

  const [currentPath, setCurrentPath] = useState('home'); 
  const [lang, setLang] = useState('zh'); 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getCurrentPageConfig = () => {
    const allPages = [
        ...SEO_DATA.tools.developer_logo_generator.pages.map(p => ({...p, category: 'logoTools'})),
        ...SEO_DATA.tools.image_privacy_protection.pages.map(p => ({...p, category: 'privacyTools'})),
        ...SEO_DATA.resources.blog.pages.map(p => ({...p, category: 'resources'}))
    ];
    return allPages.find(p => p.path === currentPath);
  };

  const pageConfig = getCurrentPageConfig();

  const handleNavigate = (path) => {
      setCurrentPath(path);
      setMobileMenuOpen(false);
  };

  const renderContent = () => {
    if (currentPath === 'home') return <LandingPage onNavigate={handleNavigate} lang={lang} />;
    
    if (!pageConfig) return null;

    if (pageConfig.category === 'logoTools') {
      return <LogoGeneratorEngine pageConfig={pageConfig} lang={lang} />;
    } else if (pageConfig.category === 'privacyTools') {
      return <PrivacyEngine pageConfig={pageConfig} lang={lang} />;
    } else {
      return <BlogEngine pageConfig={pageConfig} lang={lang} />;
    }
  };

  const t = I18N[lang];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex flex-col md:flex-row selection:bg-blue-500/30">
      <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="font-bold text-white flex items-center gap-2" onClick={() => handleNavigate('home')}>
           <BrandIcon />
           {SEO_DATA.brand.name}
        </div>
        <div className="flex items-center gap-4">
            <button onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')} className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-300 border border-slate-700">{lang === 'zh' ? 'EN' : '中文'}</button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white"><Menu /></button>
        </div>
      </div>
      <aside className={`fixed inset-y-0 left-0 z-40 w-72 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen overflow-y-auto ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <div className="text-xl font-bold text-white flex items-center gap-2 mb-10 tracking-tight cursor-pointer" onClick={() => handleNavigate('home')}>
            <BrandIcon />
            {SEO_DATA.brand.name}
          </div>
          <nav className="space-y-8">
            <div><button onClick={() => handleNavigate('home')} className={`w-full text-left px-3 py-2 text-sm rounded-lg font-bold flex items-center gap-2 ${currentPath === 'home' ? 'text-blue-400 bg-slate-800' : 'text-slate-400 hover:text-white'}`}><Home size={16}/> {t.nav.home}</button></div>
            <div>
               <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-3">{t.nav.logoTools}</h3>
               <ul className="space-y-1">{SEO_DATA.tools.developer_logo_generator.pages.map(p => (<li key={p.path}><button onClick={() => handleNavigate(p.path)} className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-all ${currentPath === p.path ? 'bg-slate-800 text-blue-400' : 'text-slate-400 hover:text-white'}`}>{lang === 'zh' ? p.titleZh : p.title}</button></li>))}</ul>
            </div>
            <div>
               <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-3">{t.nav.privacyTools}</h3>
               <ul className="space-y-1">{SEO_DATA.tools.image_privacy_protection.pages.map(p => (<li key={p.path}><button onClick={() => handleNavigate(p.path)} className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-all ${currentPath === p.path ? 'bg-slate-800 text-blue-400' : 'text-slate-400 hover:text-white'}`}>{lang === 'zh' ? p.titleZh : p.title}</button></li>))}</ul>
            </div>
             <div>
               <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-3">{t.nav.resources}</h3>
               <ul className="space-y-1">{SEO_DATA.resources.blog.pages.map(p => (<li key={p.path}><button onClick={() => handleNavigate(p.path)} className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-all ${currentPath === p.path ? 'bg-slate-800 text-blue-400' : 'text-slate-400 hover:text-white'}`}>{lang === 'zh' ? p.titleZh : p.title}</button></li>))}</ul>
            </div>
          </nav>
        </div>
      </aside>
      <main className="flex-1 min-h-screen bg-slate-950 overflow-y-auto relative">
         <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none"></div>
        <div className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 px-8 py-4 flex justify-between items-center">
           <div className="flex items-center text-xs text-slate-500 font-medium">
             <span className="hover:text-slate-300 cursor-pointer" onClick={() => handleNavigate('home')}>{t.nav.home}</span>
             {currentPath !== 'home' && pageConfig && (<><ChevronRight size={12} className="mx-2 text-slate-700"/><span className="text-blue-400">{lang === 'zh' ? pageConfig.titleZh : pageConfig.title}</span></>)}
           </div>
           <div className="hidden md:flex items-center gap-2">
             <Globe size={14} className="text-slate-500"/>
             <button onClick={() => setLang('zh')} className={`text-xs px-2 py-1 rounded transition-colors ${lang === 'zh' ? 'text-white bg-slate-800 font-bold' : 'text-slate-500 hover:text-slate-300'}`}>中文</button>
             <span className="text-slate-700">/</span>
             <button onClick={() => setLang('en')} className={`text-xs px-2 py-1 rounded transition-colors ${lang === 'en' ? 'text-white bg-slate-800 font-bold' : 'text-slate-500 hover:text-slate-300'}`}>EN</button>
           </div>
        </div>
        <div className="p-4 md:p-12 max-w-6xl mx-auto relative z-10">{renderContent()}</div>
        <footer className="border-t border-slate-800/50 mt-20 py-8 text-center"><p className="text-slate-600 text-sm">© 2026 {SEO_DATA.brand.name}. {t.brandDesc}</p></footer>
      </main>
    </div>
  );
}
