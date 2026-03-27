export const heroMetrics = [
  { label: "核心名词", value: "12 个" },
  { label: "重点演示", value: "7 段" },
  { label: "培训目标", value: "认知拉齐" },
];

export const trainingStages = [
  {
    id: "llm",
    kicker: "Stage 01",
    title: "先理解什么是 LLM",
    summary:
      "把大模型先理解成一个强大的语言黑盒。它可以自然语言输入、自然语言输出，但并不天然等于真实业务结果。",
    focus: ["黑盒输入输出", "Token 消耗", "幻觉风险"],
    outcome: "建立统一认知：大模型很强，但不能直接替代业务判断。",
    accent: "#f05a28",
  },
  {
    id: "workflow",
    kicker: "Stage 02",
    title: "再理解 Workflow 和 Agent 的区别",
    summary:
      "AI 真正落地时，不只是聊天，还会进入工作流和 agent 两种不同的执行方式，适用场景也不同。",
    focus: ["步骤编排", "工具调用", "准确性边界"],
    outcome: "理解为什么高准确性业务通常更适合工作流。",
    accent: "#15616d",
  },
  {
    id: "openclaw",
    kicker: "Stage 03",
    title: "最后理解 OpenClaw 的位置",
    summary:
      "OpenClaw 不是孤立的新名词，而是多种 AI 能力的组合：把视觉识别、逻辑推理和工具调用放到一起。",
    focus: ["Observe", "Act", "Verify"],
    outcome: "理解 OpenClaw 当前更适合作为个人助理来协助执行和验证任务。",
    accent: "#7a9e7e",
  },
];

export const capabilityCards = [
  {
    title: "这次培训在讲什么",
    body: "重点不是把所有人讲成工程师，而是帮助大家在众多 AI 名词里先抓住最重要的几个。",
  },
  {
    title: "这次培训重点讲什么",
    body: "LLM、Prompt、Token、MCP、Skill、Agent、Workflow、OpenClaw、RAG、幻觉，这些词会重点展开。",
  },
  {
    title: "这次培训不会过深讲什么",
    body: "多模态、多 Agent 等概念会快速介绍，帮助大家建立地图，但不会在这次会上做过深技术展开。",
  },
  {
    title: "今天希望带走什么",
    body: "听懂核心概念，看懂关键演示，知道落地边界，并理解什么场景适合工作流，什么场景再考虑 Agent。",
  },
];

export const glossaryTerms = [
  {
    id: "llm",
    term: "LLM",
    level: "重点讲",
    description: "可以先把它理解成强大的语言黑盒。给输入，它给输出，但它本身并不直接完成业务闭环。",
  },
  {
    id: "multimodal",
    term: "多模态",
    level: "快速介绍",
    description: "模型不只处理文字，也能看图片、听语音、理解更多类型的输入。",
  },
  {
    id: "prompt",
    term: "Prompt",
    level: "重点讲",
    description: "给模型的任务说明书。目标、约束和输出格式越清晰，结果通常越稳定。",
  },
  {
    id: "token",
    term: "Token",
    level: "重点讲",
    description: "衡量模型消耗资源的单位，可以简单理解成一种计算和使用成本的计量单位。",
  },
  {
    id: "mcp",
    term: "MCP",
    level: "重点讲",
    description: "让模型更规范地接入外部工具和上下文的一种协议思路，可以理解成统一的工具接口层。",
  },
  {
    id: "skill",
    term: "Skill",
    level: "重点讲",
    description: "把某类任务的最佳实践封装成稳定可复用的能力模块，像给 AI 装上专门能力包。",
  },
  {
    id: "agent",
    term: "Agent",
    level: "重点讲",
    description: "在 LLM 之上增加规划、工具、记忆和反馈闭环，让模型从会回答变成会行动。",
  },
  {
    id: "multi-agent",
    term: "多 Agent",
    level: "快速介绍",
    description: "多个 agent 分工协作，适合更复杂任务，但治理和稳定性要求也更高。",
  },
  {
    id: "openclaw",
    term: "OpenClaw",
    level: "重点讲",
    description: "它是多种 AI 能力的“组合拳”：集成视觉识别、逻辑推理和工具调用，让 AI 拥有眼睛和手。",
  },
  {
    id: "rag",
    term: "RAG",
    level: "重点讲",
    description: "通过检索外部知识增强回答质量，但它并不能保证完全没有幻觉。",
  },
  {
    id: "workflow",
    term: "工作流",
    level: "重点讲",
    description: "把固定流程拆成可控节点，更适合高准确性、高审计要求、路径较清晰的生产场景。",
  },
  {
    id: "hallucination",
    term: "幻觉",
    level: "重点讲",
    description: "模型可能会自信地说错，这不是小概率例外，而是必须先建立的风险共识。",
  },
];

export const aiWordCloudTerms = [
  { id: "llm", label: "LLM", tier: "primary", tone: "warm", size: "hero" },
  { id: "agent", label: "Agent", tier: "primary", tone: "dark", size: "hero" },
  { id: "workflow", label: "工作流", tier: "primary", tone: "teal", size: "large" },
  { id: "openclaw", label: "OpenClaw", tier: "primary", tone: "green", size: "large" },
  { id: "prompt", label: "Prompt", tier: "primary", tone: "warm", size: "large" },
  { id: "token", label: "Token", tier: "primary", tone: "sand", size: "medium" },
  { id: "mcp", label: "MCP", tier: "primary", tone: "dark", size: "medium" },
  { id: "rag", label: "RAG", tier: "primary", tone: "teal", size: "medium" },
  { id: "hallucination", label: "幻觉", tier: "primary", tone: "warm", size: "large" },
  { id: "skill", label: "Skill", tier: "secondary", tone: "sand", size: "medium" },
  { id: "multimodal", label: "多模态", tier: "secondary", tone: "green", size: "medium" },
  { id: "multi-agent", label: "多 Agent", tier: "secondary", tone: "teal", size: "medium" },
  { id: "memory", label: "Memory", tier: "secondary", tone: "dark", size: "medium" },
  { id: "context", label: "Context", tier: "secondary", tone: "sand", size: "medium" },
  { id: "tool-use", label: "Tool Use", tier: "secondary", tone: "dark", size: "compact" },
  { id: "human-loop", label: "人类在环", tier: "secondary", tone: "green", size: "medium" },
  { id: "reasoning", label: "Reasoning", tier: "secondary", tone: "teal", size: "medium" },
  { id: "evaluation", label: "Evaluation", tier: "secondary", tone: "sand", size: "medium" },
  { id: "safety", label: "Safety", tier: "secondary", tone: "dark", size: "compact" },
  { id: "automation", label: "Automation", tier: "secondary", tone: "green", size: "medium" },
  { id: "knowledge", label: "知识库", tier: "secondary", tone: "teal", size: "medium" },
  { id: "computer-use", label: "Computer Use", tier: "secondary", tone: "dark", size: "large" },
  { id: "governance", label: "治理", tier: "secondary", tone: "sand", size: "compact" },
  { id: "observability", label: "可观测性", tier: "secondary", tone: "green", size: "medium" },
  { id: "machine-learning", label: "机器学习", tier: "secondary", tone: "warm", size: "large" },
  { id: "deep-learning", label: "深度学习", tier: "secondary", tone: "dark", size: "large" },
  { id: "pretraining", label: "预训练", tier: "secondary", tone: "teal", size: "medium" },
  { id: "fine-tuning", label: "微调", tier: "secondary", tone: "green", size: "medium" },
  { id: "supervised-ft", label: "监督微调", tier: "secondary", tone: "sand", size: "medium" },
  { id: "alignment", label: "对齐", tier: "secondary", tone: "warm", size: "compact" },
  { id: "inference", label: "推理", tier: "secondary", tone: "dark", size: "medium" },
  { id: "embedding", label: "Embedding", tier: "secondary", tone: "teal", size: "medium" },
  { id: "vector-db", label: "向量数据库", tier: "secondary", tone: "green", size: "large" },
  { id: "retrieval", label: "检索", tier: "secondary", tone: "sand", size: "compact" },
  { id: "rerank", label: "重排序", tier: "secondary", tone: "dark", size: "compact" },
  { id: "knowledge-graph", label: "知识图谱", tier: "secondary", tone: "teal", size: "medium" },
  { id: "dataset", label: "数据集", tier: "secondary", tone: "green", size: "compact" },
  { id: "labeling", label: "数据标注", tier: "secondary", tone: "warm", size: "medium" },
  { id: "benchmark", label: "Benchmark", tier: "secondary", tone: "sand", size: "medium" },
  { id: "latency", label: "延迟", tier: "secondary", tone: "dark", size: "compact" },
  { id: "throughput", label: "吞吐", tier: "secondary", tone: "teal", size: "compact" },
  { id: "guardrail", label: "Guardrail", tier: "secondary", tone: "green", size: "medium" },
  { id: "grounding", label: "Grounding", tier: "secondary", tone: "sand", size: "medium" },
  { id: "planning", label: "规划", tier: "secondary", tone: "warm", size: "compact" },
  { id: "reflection", label: "反思", tier: "secondary", tone: "dark", size: "compact" },
  { id: "tool-calling", label: "Tool Calling", tier: "secondary", tone: "teal", size: "medium" },
  { id: "api", label: "API", tier: "secondary", tone: "green", size: "compact" },
  { id: "automation-bot", label: "自动化", tier: "secondary", tone: "sand", size: "medium" },
  { id: "model-context", label: "上下文窗口", tier: "secondary", tone: "dark", size: "large" },
  { id: "prompt-engineering", label: "提示工程", tier: "secondary", tone: "warm", size: "large" },
  { id: "ai-native", label: "AI Native", tier: "secondary", tone: "teal", size: "medium" },
  { id: "transformer", label: "Transformer", tier: "secondary", tone: "dark", size: "large" },
  { id: "decoder", label: "Decoder", tier: "secondary", tone: "green", size: "compact" },
  { id: "attention", label: "Attention", tier: "secondary", tone: "warm", size: "medium" },
  { id: "prompt-cache", label: "Prompt Cache", tier: "secondary", tone: "sand", size: "medium" },
  { id: "vector-search", label: "向量检索", tier: "secondary", tone: "teal", size: "medium" },
  { id: "agent-memory", label: "长期记忆", tier: "secondary", tone: "green", size: "medium" },
  { id: "orchestration", label: "编排", tier: "secondary", tone: "dark", size: "compact" },
  { id: "approval", label: "...", tier: "secondary", tone: "sand", size: "compact" },
];

export const focusTerms = [
  {
    id: "llm",
    term: "LLM",
    reason: "所有后续概念的起点，必须先讲成黑盒输入输出。",
  },
  {
    id: "prompt",
    term: "Prompt",
    reason: "最容易马上改变结果质量，适合用直观示例建立认知。",
  },
  {
    id: "token",
    term: "Token",
    reason: "是理解成本、上下文和资源消耗的关键单位。",
  },
  {
    id: "mcp",
    term: "MCP",
    reason: "可以帮助同事理解模型如何连接工具和系统。",
  },
  {
    id: "rag",
    term: "RAG",
    reason: "很多人会误以为接了知识库就不会错，这个词必须讲清边界。",
  },
  {
    id: "workflow",
    term: "工作流",
    reason: "和生产环境最相关，决定很多真实项目该怎么落地。",
  },
  {
    id: "agent",
    term: "Agent",
    reason: "是从聊天走向行动的关键升级，也是大家最容易混淆的概念。",
  },
  {
    id: "openclaw",
    term: "OpenClaw",
    reason: "是这次培训的进阶重点，适合做高感知度的动画演示。",
  },
  {
    id: "hallucination",
    term: "幻觉",
    reason: "必须尽早讲透，否则后面所有概念都会被误解成万能能力。",
  },
];

export const conceptDemos = [
  {
    id: "llm",
    term: "LLM",
    category: "基础能力",
    tagline: "自然语言输入，自然语言输出",
    summary: "把 LLM 看成一个会根据上下文生成结果的黑盒，不要把它直接等同于真实业务系统。",
    narrative: [
      "输入一段自然语言",
      "模型在黑盒中生成结果",
      "输出内容看起来很自然，但不代表一定正确",
    ],
    cta: "点选不同名词，下面的动画会切换到对应示例。",
  },
  {
    id: "prompt",
    term: "Prompt",
    category: "控制方式",
    tagline: "提示词决定方向和边界",
    summary: "Prompt 不是咒语，而是任务说明书。信息越清楚、边界越明确，输出越稳。",
    narrative: [
      "给角色、目标和限制",
      "模型按规则组织结果",
      "输出格式更稳定，更接近业务可用",
    ],
    cta: "你可以现场强调：同一个模型，提示词不同，结果质量差异很大。",
  },
  {
    id: "token",
    term: "Token",
    category: "资源单位",
    tagline: "模型会消耗上下文和算力预算",
    summary: "Token 可以理解成模型理解和生成时消耗的一种资源单位，和油耗、里程类似。",
    narrative: [
      "输入越长，消耗越多",
      "输出越长，消耗越多",
      "预算有限，所以要控制上下文和任务结构",
    ],
    cta: "这一段适合帮助非技术同事建立“AI 不是零成本”的基本认知。",
  },
  {
    id: "mcp",
    term: "MCP",
    category: "工具连接",
    tagline: "把模型接到真实工具上",
    summary: "MCP 更像统一接口层，让模型更规范地调用搜索、数据库、文件和内部系统。",
    narrative: [
      "模型先判断需要什么工具",
      "通过统一接口发起调用",
      "拿到结果后再回到模型继续处理",
    ],
    cta: "这里很适合解释：工具能力不是模型天生自带，而是接出来的。",
  },
  {
    id: "rag",
    term: "RAG",
    category: "知识增强",
    tagline: "先检索，再生成",
    summary: "RAG 会先去外部知识中检索相关内容，再把检索结果带回模型，以提高回答相关性。",
    narrative: [
      "先在知识库里检索",
      "把命中的资料送入上下文",
      "模型基于资料生成回答，但仍可能理解偏差",
    ],
    cta: "这部分要明确强调：RAG 能降低幻觉，不等于彻底消灭幻觉。",
  },
  {
    id: "workflow",
    term: "工作流",
    category: "确定性编排",
    tagline: "固定节点，固定路径，可控可审计",
    summary: "工作流适合高准确性、高稳定性业务，把流程拆成明确节点，让每一步都可观测。",
    narrative: [
      "节点 1 输入",
      "节点 2 处理",
      "节点 3 审核 / 输出",
    ],
    cta: "你可以在这里自然过渡到生产环境选型：很多高风险业务优先工作流。",
  },
  {
    id: "agent",
    term: "Agent",
    category: "自主决策",
    tagline: "会规划、会调用工具、会回看结果",
    summary: "Agent 的核心价值在于它不是按固定路径跑，而是能根据目标和环境动态做下一步决策。",
    narrative: [
      "先理解目标",
      "再规划路径并调用工具",
      "根据反馈调整下一步",
    ],
    cta: "这里适合强调：Agent 更灵活，但边界、审计和人工兜底也更重要。",
  },
  {
    id: "openclaw",
    term: "OpenClaw",
    category: "Computer Use",
    tagline: "让 Agent 直接操作界面",
    summary: "OpenClaw 把观察界面、执行动作和验证结果组合起来，更适合在当前阶段承担个人助理式的辅助任务。",
    narrative: [
      "观察屏幕状态",
      "计划并执行点击 / 输入",
      "回看结果并决定继续还是回退",
    ],
    cta: "这是最适合做视觉化演示的概念，现场观感会非常好。",
  },
  {
    id: "hallucination",
    term: "幻觉",
    category: "风险边界",
    tagline: "看起来像真的，不代表是真的",
    summary: "模型可能会非常流畅、自信地给出错误内容，这就是为什么企业级使用必须强调校验和人类在环。",
    narrative: [
      "模型给出看似完整的答案",
      "其中部分内容并不真实",
      "必须依赖校验机制和人工复核",
    ],
    cta: "建议把这个演示放在前面，让全员先建立正确预期。",
  },
];

export const livePoll = {
  question: "如果一个 AI 场景要在公司里优先落地，你最看重什么？",
  options: [
    {
      id: "accuracy",
      label: "结果准确",
      insight: "这是很多生产环境的第一优先级，所以工作流往往先于完全自主的 Agent 落地。",
    },
    {
      id: "efficiency",
      label: "提升效率",
      insight: "效率是 AI 最常见的第一波价值，但前提仍然是要可控、可回看、能兜底。",
    },
    {
      id: "flexibility",
      label: "足够灵活",
      insight: "灵活性通常意味着更高自主性，这类诉求更容易把方案引向 Agent。",
    },
  ],
};

export const mentalModelCards = [
  {
    title: "LLM 像发动机",
    body: "发动机给油就能输出动力，大模型给输入就能输出结果，但只有引擎本身还无法直接完成业务任务。",
  },
  {
    title: "Token 像油耗单位",
    body: "可以把 token 理解成一种资源消耗单位，类似油耗、里程或计量单位，用来帮助理解成本。",
  },
  {
    title: "Agent 像整车系统",
    body: "有了底盘、轮子、传动和控制系统，发动机的动力才会变成真正可用的行动力，这就是 agent 的价值。",
  },
  {
    title: "Prompt 和 Rules 像方向盘",
    body: "没有方向盘的车没人敢开。Prompt 决定方向，Rules 决定边界，它们共同决定结果是否可控。",
  },
  {
    title: "人类在环像安全员",
    body: "关键时刻人要能接管、复核和兜底，这不是保守，而是企业级 AI 设计里的必要机制。",
  },
  {
    title: "多模态像传感器",
    body: "文字像仪表盘，图片像摄像头，语音像麦克风。感知越丰富，模型越可能理解真实世界任务。",
  },
];

export const guardrailCards = [
  {
    title: "先看到能力，也先看到风险",
    body: "建议先演示一次模型可能答错，再讨论能力边界，这样后面的所有概念都会更容易被理解。",
  },
  {
    title: "生产环境优先可控",
    body: "只要业务准确性要求高、责任链清晰、步骤相对固定，就更应该优先考虑工作流。",
  },
  {
    title: "人审和日志很重要",
    body: "审批、财务、法务、合规、生产操作等场景，都必须具备人工复核、留痕和回滚能力。",
  },
];

export const roleTracks = [
  {
    id: "leaders",
    title: "管理层视角",
    duration: "15 分钟",
    audience: "部门负责人 / 培训组织者",
    highlights: [
      "看清 AI 的价值边界，而不是只看热闹",
      "优先寻找流程清晰、价值明确、风险可控的试点",
      "理解为什么很多高风险业务不适合直接放给 Agent 自主决策",
    ],
  },
  {
    id: "business",
    title: "业务同事视角",
    duration: "25 分钟",
    audience: "运营 / 销售 / 交付 / 中后台",
    highlights: [
      "理解如何更高质量地与模型协作",
      "理解什么场景下 AI 只能辅助，不能直接拍板",
      "理解工作流和 Agent 的业务差异",
    ],
  },
  {
    id: "builders",
    title: "产品研发视角",
    duration: "25 分钟",
    audience: "产品 / 研发 / 数据 / AI 团队",
    highlights: [
      "理解 MCP、Skill、RAG、Workflow、Agent 之间的关系",
      "理解如何为高风险场景设计审计、回滚和人工介入",
      "理解 OpenClaw 当前更适合作为个人助理，以及为什么需要谨慎控制风险边界",
    ],
  },
];

export const labs = [
  {
    id: "chat",
    title: "基础大模型对话",
    tagline: "先展示黑盒能力，再说明它并不等于真实业务系统",
    challenge:
      "通过一个简单问答展示模型为什么看起来很聪明，再引出“会聊天”和“会完成业务”并不是一回事。",
    takeaways: [
      "LLM 先作为黑盒理解更容易入门",
      "会对话不等于会执行",
      "能力展示之后必须紧跟边界说明",
    ],
  },
  {
    id: "hallucination",
    title: "幻觉演示",
    tagline: "看到模型可能一本正经地答错",
    challenge:
      "准备一个模型不容易完全答对的问题，让大家直观看到幻觉，再引出为什么人类在环很重要。",
    takeaways: [
      "幻觉是天然风险，不是偶发小问题",
      "不能把模型输出直接当事实",
      "越重要的业务越要设计校验机制",
    ],
  },
  {
    id: "mcp",
    title: "MCP 工具调用",
    tagline: "展示模型如何走出对话框并连接外部工具",
    challenge:
      "演示模型通过 MCP 访问一个工具或系统，帮助大家理解工具能力不是模型自带，而是通过连接获得。",
    takeaways: [
      "MCP 是工具接入层，不是模型本体",
      "模型能力和工具能力要分开理解",
      "工具越多，治理和权限越重要",
    ],
  },
  {
    id: "workflow",
    title: "工作流演示（Dify）",
    tagline: "展示确定性强、节点清晰的 AI 流程",
    challenge:
      "用 Dify 这类流程编排工具演示固定节点如何串联输入、检索、处理、审核和输出。",
    takeaways: [
      "高准确性业务通常更适合工作流",
      "路径清晰，便于排查和审计",
      "很适合生产环境优先落地",
    ],
  },
  {
    id: "agent",
    title: "Agent 演示",
    tagline: "展示自主规划和多步决策的价值",
    challenge:
      "让 agent 处理一个步骤不完全固定的任务，展示它如何规划、调用工具、回看结果并继续推进。",
    takeaways: [
      "Agent 的优势在灵活性和自主性",
      "越灵活，越需要边界和兜底",
      "不是所有业务都适合 Agent",
    ],
  },
  {
    id: "openclaw",
    title: "OpenClaw 演示",
    tagline: "展示 computer-use 如何作为个人助理协助完成界面操作",
    challenge:
      "模拟在传统后台系统里查找页面、输入内容、点击按钮、截图确认和回传结果的过程。",
    takeaways: [
      "OpenClaw 解决的是最后一公里的人机协作执行问题",
      "当前阶段更适合作为个人助理，而不是直接承担高风险自主执行",
      "观察、校验和人工兜底往往比点击本身更重要",
    ],
  },
];

export const decisionGuide = [
  {
    id: "workflow-first",
    title: "什么场景优先用工作流",
    summary: "当步骤相对固定、准确性要求高、责任边界清晰时，优先选择工作流。",
    bullets: [
      "审批、报表、标准化生成、信息抽取、知识问答增强",
      "需要强审计、强回放、强兜底的生产场景",
      "错误成本高、不能接受自由发挥的环节",
    ],
  },
  {
    id: "agent-fit",
    title: "什么场景适合 Agent",
    summary: "当目标明确但路径不固定，需要根据环境变化动态决策时，Agent 更有价值。",
    bullets: [
      "任务拆解、信息探索、多工具协作、开放式助手",
      "步骤可能因上下文变化而变化的复杂任务",
      "允许先试错、再校验、再继续推进的场景",
    ],
  },
  {
    id: "agent-caution",
    title: "什么场景不要急着上 Agent",
    summary: "只要结果必须稳定、责任必须清晰，就不要为了看起来更智能而过度 agent 化。",
    bullets: [
      "财务、法务、合规、生产控制等高风险环节",
      "需要固定输出格式和固定审批链路的场景",
      "还没有日志、权限、回滚和人工复核机制的时候",
    ],
  },
];

export const scenarioChallenges = [
  {
    id: "scenario-approval",
    title: "审批摘要生成",
    description: "输入固定表单和附件，输出固定格式摘要，并进入人工审批。",
    answer: "workflow",
    options: [
      { id: "workflow", label: "工作流" },
      { id: "agent", label: "Agent" },
      { id: "openclaw", label: "OpenClaw" },
    ],
    explanation: "步骤稳定、输出格式固定、需要审计和人工复核，这类场景通常优先选工作流。",
  },
  {
    id: "scenario-research",
    title: "复杂信息调研",
    description: "围绕一个开放问题，自主搜索资料、归纳观点、对比方案，再给出建议。",
    answer: "agent",
    options: [
      { id: "workflow", label: "工作流" },
      { id: "agent", label: "Agent" },
      { id: "openclaw", label: "OpenClaw" },
    ],
    explanation: "目标明确但路径不固定，需要动态决策和多步迭代，这类场景更适合 Agent。",
  },
  {
    id: "scenario-prompt",
    title: "任务描述不清",
    description: "同一个模型做同一件事时，结果忽好忽坏。进一步排查发现，需求目标、限制条件和输出格式都没有说清楚。",
    answer: "workflow",
    options: [
      { id: "prompt", label: "Prompt" },
      { id: "workflow", label: "工作流" },
      { id: "agent", label: "Agent" },
    ],
    explanation: "这类问题的根子通常不在模型本身，而在任务说明不清。先把目标、约束和输出格式描述清楚，往往比急着上更复杂的方案更重要。",
  },
];

export const openClawLoop = [
  {
    id: "observe",
    step: "01 Observe",
    title: "观察界面",
    summary: "读取页面结构、截图内容和当前位置，形成可以供模型判断的状态描述。",
    signal: "窗口标题、按钮文案、表单字段、异常提示",
  },
  {
    id: "plan",
    step: "02 Plan",
    title: "生成下一步",
    summary: "结合目标和当前页面上下文，判断下一步应该点击、输入、等待还是回退。",
    signal: "目标拆解、工具约束、失败回滚策略",
  },
  {
    id: "act",
    step: "03 Act",
    title: "执行动作",
    summary: "对真实界面发起点击、键入、滚动、快捷键或截图等动作。",
    signal: "点击坐标、键盘输入、系统操作",
  },
  {
    id: "verify",
    step: "04 Verify",
    title: "结果校验",
    summary: "回看页面反馈，判断动作是否生效，并决定继续、重试还是交给人工。",
    signal: "成功提示、字段变化、流程状态",
  },
  {
    id: "memory",
    step: "05 Memory",
    title: "沉淀经验",
    summary: "把成功路径、失败样本和权限边界写入记忆，帮助后续任务更稳定。",
    signal: "标准动作链、例外分支、审计日志",
  },
];

export const quizQuestions = [
  {
    id: "q1",
    prompt: "为什么要先建立“幻觉”这件事的共识？",
    options: [
      "因为这样会显得更技术",
      "因为要先知道 AI 不一定总是正确",
      "因为这样模型就不会再出错",
    ],
    answer: 1,
    explanation: "只有先建立风险共识，后面的 Prompt、Workflow、Agent 和人类在环才有真实意义。",
  },
  {
    id: "q2",
    prompt: "当业务准确性要求很高时，通常优先选择什么？",
    options: ["工作流", "完全自主的 Agent", "多 Agent 互相讨论"],
    answer: 0,
    explanation: "工作流路径更清晰、节点更可控、审计更容易，通常更适合高准确性要求的生产场景。",
  },
  {
    id: "q3",
    prompt: "现阶段看，OpenClaw 更适合以什么方式参与工作？",
    options: [
      "作为个人助理，协助人完成界面操作和结果校验",
      "直接独立接管高风险核心流程",
      "在没有人工复核的情况下自主连续执行",
    ],
    answer: 0,
    explanation: "现阶段更稳妥的定位，是把 OpenClaw 当成个人助理式能力来使用，因为它仍然存在较多风险和不可控性。",
  },
];

export const sampleRunLog = [
  "[09:30:01] 识别到旧系统登录页，读取账号框、密码框和登录按钮位置。",
  "[09:30:04] 输入账号与受控口令，点击登录。",
  "[09:30:08] 观察左侧菜单，定位到“培训课程管理”。",
  "[09:30:11] 进入课程页面，填写班次、讲师、日期并提交。",
  "[09:30:14] 读取成功提示，截图留痕并回传执行结果。",
];
