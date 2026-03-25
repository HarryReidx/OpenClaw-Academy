import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import {
  aiWordCloudTerms,
  capabilityCards,
  conceptDemos,
  decisionGuide,
  focusTerms,
  glossaryTerms,
  guardrailCards,
  heroMetrics,
  labs,
  livePoll,
  mentalModelCards,
  openClawLoop,
  quizQuestions,
  roleTracks,
  scenarioChallenges,
  sampleRunLog,
  trainingStages,
} from "./src/data/trainingContent";

const backgroundShapes = [
  { top: -40, right: -50, size: 180, color: "rgba(240, 90, 40, 0.16)" },
  { top: 240, left: -60, size: 220, color: "rgba(21, 97, 109, 0.13)" },
  { bottom: 180, right: -70, size: 260, color: "rgba(122, 158, 126, 0.18)" },
];

export default function App() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1080;
  const isTablet = width >= 720;
  const [selectedRole, setSelectedRole] = useState(roleTracks[1].id);
  const [selectedLab, setSelectedLab] = useState(labs[0].id);
  const [selectedLoopStep, setSelectedLoopStep] = useState(openClawLoop[0].id);
  const [selectedTerm, setSelectedTerm] = useState(glossaryTerms[0].id);
  const [selectedConceptDemo, setSelectedConceptDemo] = useState(conceptDemos[0].id);
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [scenarioAnswers, setScenarioAnswers] = useState({});
  const [answers, setAnswers] = useState({});
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 900,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 2400,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2400,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnim, floatAnim]);

  const currentRole = roleTracks.find((item) => item.id === selectedRole) ?? roleTracks[0];
  const currentLab = labs.find((item) => item.id === selectedLab) ?? labs[0];
  const currentLoopStep =
    openClawLoop.find((item) => item.id === selectedLoopStep) ?? openClawLoop[0];
  const currentTerm = glossaryTerms.find((item) => item.id === selectedTerm) ?? glossaryTerms[0];
  const currentConceptDemo =
    conceptDemos.find((item) => item.id === selectedConceptDemo) ?? conceptDemos[0];
  const currentPoll = livePoll.options.find((item) => item.id === selectedPoll) ?? null;
  const score = quizQuestions.reduce((total, question) => {
    return total + (answers[question.id] === question.answer ? 1 : 0);
  }, 0);
  const scenarioScore = scenarioChallenges.reduce((total, item) => {
    return total + (scenarioAnswers[item.id] === item.answer ? 1 : 0);
  }, 0);

  const heroTranslateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.appShell}>
        {backgroundShapes.map((shape, index) => (
          <Animated.View
            key={index}
            style={[
              styles.shape,
              {
                width: shape.size,
                height: shape.size,
                borderRadius: shape.size / 2,
                backgroundColor: shape.color,
                transform: [{ translateY: heroTranslateY }],
                top: shape.top,
                right: shape.right,
                bottom: shape.bottom,
                left: shape.left,
              },
            ]}
          />
        ))}

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Animated.View style={[styles.contentWrap, { opacity: fadeAnim }]}>
            <HeroSection isDesktop={isDesktop} isTablet={isTablet} />

            <SectionHeader
              eyebrow="Meeting Purpose"
              title="今天这场培训，重点是统一认知"
              description="这不是一场技术深潜课，而是一场面向全公司的 AI 认知拉齐会议。我们会从最重要的概念讲起，再看真实演示和落地边界。"
            />
            <View style={[styles.capabilityGrid, isTablet ? styles.capabilityGridWide : styles.stackGap]}>
              {capabilityCards.map((item) => (
                <View
                  key={item.title}
                  style={[styles.capabilityCard, isTablet && styles.capabilityCardWide]}
                >
                  <Text style={styles.capabilityTitle}>{item.title}</Text>
                  <Text style={styles.capabilityBody}>{item.body}</Text>
                </View>
              ))}
            </View>

            <SectionHeader
              eyebrow="Keyword Map"
              title="先建立一张 AI 关键词地图"
              description="面对很多新名词时，不需要一次全部学深。先抓住重点词，建立整体认识，再逐步进入更具体的应用场景。"
            />
            <WordCloudStage
              terms={aiWordCloudTerms}
              activeId={selectedConceptDemo}
              onSelect={(id) => {
                if (conceptDemos.some((item) => item.id === id)) {
                  setSelectedConceptDemo(id);
                }
                if (glossaryTerms.some((item) => item.id === id)) {
                  setSelectedTerm(id);
                }
              }}
            />
            <CardGrid isDesktop={isDesktop} isTablet={isTablet}>
              {glossaryTerms.map((item) => (
                <Pressable
                  key={item.id}
                  onPress={() => setSelectedTerm(item.id)}
                  style={[
                    ...gridWidthStyle(isDesktop, isTablet, styles.glossaryCard),
                    selectedTerm === item.id && styles.glossaryCardActive,
                  ]}
                >
                  <View style={styles.glossaryHeader}>
                    <Text style={styles.glossaryTerm}>{item.term}</Text>
                    <View
                      style={[
                        styles.levelPill,
                        item.level === "重点讲" ? styles.levelPillPrimary : styles.levelPillSecondary,
                      ]}
                    >
                      <Text
                        style={[
                          styles.levelPillText,
                          item.level === "重点讲"
                            ? styles.levelPillTextPrimary
                            : styles.levelPillTextSecondary,
                        ]}
                      >
                        {item.level}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.glossaryBody}>{item.description}</Text>
                </Pressable>
              ))}
            </CardGrid>
            <View style={styles.spotlightCard}>
              <Text style={styles.detailEyebrow}>当前聚焦</Text>
              <Text style={styles.detailTitle}>{currentTerm.term}</Text>
              <Text style={styles.detailMeta}>
                {currentTerm.level} · 点选上方任一名词即可切换
              </Text>
              <Text style={styles.capabilityBody}>{currentTerm.description}</Text>
            </View>

            <SectionHeader
              eyebrow="Interactive Stage"
              title="本次培训最值得讲透的 9 个核心名词"
              description="这里是会议现场的互动演示台。点选任一名词，页面会切换到对应动画和讲解，让抽象概念变得更直观。"
            />
            <View style={styles.focusTermRail}>
              {focusTerms.map((item) => {
                const selected = selectedConceptDemo === item.id;
                return (
                  <Pressable
                    key={item.id}
                    onPress={() => setSelectedConceptDemo(item.id)}
                    style={[styles.focusTermChip, selected && styles.focusTermChipActive]}
                  >
                    <Text style={[styles.focusTermText, selected && styles.focusTermTextActive]}>
                      {item.term}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            <View style={[styles.demoStageCard, isDesktop && styles.demoStageCardDesktop]}>
              <View style={[styles.demoNarrativePanel, isDesktop && styles.demoNarrativePanelDesktop]}>
                <Text style={styles.detailEyebrow}>本次重点讲解</Text>
                <Text style={styles.detailTitle}>{currentConceptDemo.term}</Text>
                <Text style={styles.detailMeta}>
                  {currentConceptDemo.category} · {currentConceptDemo.tagline}
                </Text>
                <Text style={styles.capabilityBody}>{currentConceptDemo.summary}</Text>
                <View style={styles.reasonCard}>
                  <Text style={styles.outcomeLabel}>为什么本次要重点讲</Text>
                  <Text style={styles.capabilityBody}>
                    {focusTerms.find((item) => item.id === currentConceptDemo.id)?.reason}
                  </Text>
                </View>
                <Text style={styles.outcomeLabel}>建议理解路径</Text>
                {currentConceptDemo.narrative.map((item) => (
                  <View key={item} style={styles.pointRow}>
                    <View style={styles.pointDot} />
                    <Text style={styles.pointText}>{item}</Text>
                  </View>
                ))}
                <View style={styles.presenterHintCard}>
                  <Text style={styles.outcomeLabel}>现场讲解提示</Text>
                  <Text style={styles.capabilityBody}>{currentConceptDemo.cta}</Text>
                </View>
              </View>
              <ConceptShowcase demo={currentConceptDemo} />
            </View>

            <SectionHeader
              eyebrow="Roadmap"
              title="今天的主线：LLM -> Workflow / Agent -> OpenClaw"
              description="先理解模型本身，再理解执行方式，最后理解 computer-use 的价值和边界。"
            />
            <View style={[styles.stageGrid, isDesktop ? styles.stageGridDesktop : styles.stackGap]}>
              {trainingStages.map((stage) => (
                <View key={stage.id} style={[styles.stageCard, isDesktop && styles.stageCardDesktop]}>
                  <View style={[styles.stageAccent, { backgroundColor: stage.accent }]} />
                  <Text style={styles.stageKicker}>{stage.kicker}</Text>
                  <Text style={styles.stageTitle}>{stage.title}</Text>
                  <Text style={styles.stageSummary}>{stage.summary}</Text>
                  <View style={styles.tagRow}>
                    {stage.focus.map((tag) => (
                      <View key={tag} style={styles.tag}>
                        <Text style={styles.tagLabel}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                  <Text style={styles.outcomeLabel}>这一部分的核心结论</Text>
                  <Text style={styles.outcomeText}>{stage.outcome}</Text>
                </View>
              ))}
            </View>

            <SectionHeader
              eyebrow="Mental Model"
              title="用一个更容易理解的类比来认识 AI"
              description="如果把 LLM、Agent、Prompt 和人类在环讲成一台车的不同部分，整体会更容易理解。"
            />
            <CardGrid isDesktop={isDesktop} isTablet={isTablet}>
              {mentalModelCards.map((item) => (
                <View key={item.title} style={gridWidthStyle(isDesktop, isTablet, styles.glossaryCard)}>
                  <Text style={styles.capabilityTitle}>{item.title}</Text>
                  <Text style={styles.glossaryBody}>{item.body}</Text>
                </View>
              ))}
            </CardGrid>

            <SectionHeader
              eyebrow="Guardrails"
              title="理解能力，也理解风险"
              description="AI 的价值很大，但能力边界同样重要。尤其进入生产环境后，可控、可审计、可回滚会变得非常关键。"
            />
            <CardGrid isDesktop={isDesktop} isTablet={isTablet}>
              {guardrailCards.map((item) => (
                <View key={item.title} style={gridWidthStyle(isDesktop, isTablet, styles.capabilityCard)}>
                  <Text style={styles.capabilityTitle}>{item.title}</Text>
                  <Text style={styles.capabilityBody}>{item.body}</Text>
                </View>
              ))}
            </CardGrid>

            <SectionHeader
              eyebrow="Live Poll"
              title="现场投票：你最看重什么"
              description="共享屏幕时可以让同事直接口头参与，你来点击结果。投完后页面会即时给出对应解读。"
            />
            <View style={styles.pollCard}>
              <Text style={styles.questionPrompt}>{livePoll.question}</Text>
              <View style={styles.pollOptions}>
                {livePoll.options.map((option) => {
                  const selected = selectedPoll === option.id;
                  return (
                    <Pressable
                      key={option.id}
                      onPress={() => setSelectedPoll(option.id)}
                      style={[styles.pollButton, selected && styles.pollButtonActive]}
                    >
                      <Text style={[styles.pollButtonText, selected && styles.pollButtonTextActive]}>
                        {option.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
              <View style={styles.pollResult}>
                <Text style={styles.outcomeLabel}>投票解读</Text>
                <Text style={styles.capabilityBody}>
                  {currentPoll
                    ? currentPoll.insight
                    : "先让同事投一票，再一起看不同选择背后的实际含义。"}
                </Text>
              </View>
            </View>

            <SectionHeader
              eyebrow="Audience View"
              title="从不同岗位看 AI 的价值"
              description="不同岗位关注点不同，但核心问题是一致的：它能帮我们什么，边界在哪里，什么情况下应该谨慎。"
            />
            <View style={[styles.roleLayout, isDesktop ? styles.roleLayoutDesktop : styles.stackGap]}>
              <View style={[styles.roleSelector, isDesktop && styles.roleSelectorDesktop]}>
                {roleTracks.map((role) => {
                  const selected = selectedRole === role.id;
                  return (
                    <Pressable
                      key={role.id}
                      onPress={() => setSelectedRole(role.id)}
                      style={[styles.roleButton, selected && styles.roleButtonActive]}
                    >
                      <Text style={[styles.roleButtonTitle, selected && styles.roleButtonTitleActive]}>
                        {role.title}
                      </Text>
                      <Text style={[styles.roleButtonMeta, selected && styles.roleButtonMetaActive]}>
                        {role.duration} · {role.audience}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
              <View style={styles.roleDetailCard}>
                <Text style={styles.detailEyebrow}>当前视角</Text>
                <Text style={styles.detailTitle}>{currentRole.title}</Text>
                <Text style={styles.detailMeta}>
                  适合 {currentRole.audience} · 典型关注点如下
                </Text>
                {currentRole.highlights.map((point) => (
                  <View key={point} style={styles.pointRow}>
                    <View style={styles.pointDot} />
                    <Text style={styles.pointText}>{point}</Text>
                  </View>
                ))}
              </View>
            </View>

            <SectionHeader
              eyebrow="Demo Plan"
              title="一条更容易理解的演示主线"
              description="从“会聊天”开始，到“会答错”，再到“会调用工具”“会跑流程”“会自主规划”“会操作界面”，这条线最容易帮助大家建立完整认识。"
            />
            <View style={[styles.labLayout, isDesktop ? styles.labLayoutDesktop : styles.stackGap]}>
              <View style={[styles.labSelector, isDesktop && styles.labSelectorDesktop]}>
                {labs.map((lab) => {
                  const selected = selectedLab === lab.id;
                  return (
                    <Pressable
                      key={lab.id}
                      onPress={() => setSelectedLab(lab.id)}
                      style={[styles.labButton, selected && styles.labButtonActive]}
                    >
                      <Text style={[styles.labButtonTitle, selected && styles.labButtonTitleActive]}>
                        {lab.title}
                      </Text>
                      <Text style={[styles.labButtonTagline, selected && styles.labButtonTaglineActive]}>
                        {lab.tagline}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
              <View style={styles.labDetailCard}>
                <Text style={styles.detailEyebrow}>当前演示</Text>
                <Text style={styles.detailTitle}>{currentLab.title}</Text>
                <Text style={styles.labChallenge}>{currentLab.challenge}</Text>
                <Text style={styles.outcomeLabel}>这一段希望带走什么</Text>
                {currentLab.takeaways.map((point) => (
                  <View key={point} style={styles.pointRow}>
                    <View style={styles.pointDot} />
                    <Text style={styles.pointText}>{point}</Text>
                  </View>
                ))}
              </View>
            </View>

            <SectionHeader
              eyebrow="Decision Guide"
              title="什么时候用工作流，什么时候再考虑 Agent"
              description="这是最重要的落地判断之一。尤其在生产环境里，准确性和可控性往往比“更智能”更重要。"
            />
            <CardGrid isDesktop={isDesktop} isTablet={isTablet}>
              {decisionGuide.map((item) => (
                <View key={item.id} style={gridWidthStyle(isDesktop, isTablet, styles.decisionCard)}>
                  <Text style={styles.capabilityTitle}>{item.title}</Text>
                  <Text style={styles.glossaryBody}>{item.summary}</Text>
                  {item.bullets.map((bullet) => (
                    <View key={bullet} style={styles.pointRow}>
                      <View style={styles.pointDot} />
                      <Text style={styles.pointText}>{bullet}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </CardGrid>

            <SectionHeader
              eyebrow="Scenario Lab"
              title="现场判断：这个场景更适合什么"
              description="这部分很适合会上互动。先让同事猜，再点击答案，帮助大家真正掌握工作流、Agent 和 OpenClaw 的边界。"
            />
            <View style={styles.quizCard}>
              {scenarioChallenges.map((scenario) => (
                <View key={scenario.id} style={styles.questionBlock}>
                  <Text style={styles.questionPrompt}>{scenario.title}</Text>
                  <Text style={styles.scenarioDescription}>{scenario.description}</Text>
                  <View style={styles.answerGroup}>
                    {scenario.options.map((option) => {
                      const selected = scenarioAnswers[scenario.id] === option.id;
                      const correct = option.id === scenario.answer;
                      const showResult = scenarioAnswers[scenario.id] !== undefined;
                      return (
                        <Pressable
                          key={option.id}
                          onPress={() =>
                            setScenarioAnswers((current) => ({
                              ...current,
                              [scenario.id]: option.id,
                            }))
                          }
                          style={[
                            styles.answerButton,
                            selected && styles.answerButtonSelected,
                            showResult && correct && styles.answerButtonCorrect,
                          ]}
                        >
                          <Text style={styles.answerLabel}>{option.label}</Text>
                        </Pressable>
                      );
                    })}
                  </View>
                  {scenarioAnswers[scenario.id] !== undefined ? (
                    <Text style={styles.explanationText}>{scenario.explanation}</Text>
                  ) : null}
                </View>
              ))}
              <View style={styles.scorePanel}>
                <Text style={styles.scoreLabel}>场景判断得分</Text>
                <Text style={styles.scoreValue}>
                  {scenarioScore} / {scenarioChallenges.length}
                </Text>
                <Text style={styles.scoreHint}>
                  这组题比概念题更适合会议互动，因为大家会直接把名词映射到业务场景里。
                </Text>
              </View>
            </View>

            <SectionHeader
              eyebrow="OpenClaw Loop"
              title="OpenClaw 如何完成一次界面操作"
              description="理解它的运行逻辑，不需要很深的工程背景，但能帮助大家知道它为什么适合某些场景，又为什么必须有边界。"
            />
            <View style={[styles.loopLayout, isDesktop ? styles.loopLayoutDesktop : styles.stackGap]}>
              <View style={[styles.loopRail, isDesktop && styles.loopRailDesktop]}>
                {openClawLoop.map((item) => {
                  const selected = selectedLoopStep === item.id;
                  return (
                    <Pressable
                      key={item.id}
                      onPress={() => setSelectedLoopStep(item.id)}
                      style={[styles.loopButton, selected && styles.loopButtonActive]}
                    >
                      <Text style={[styles.loopStep, selected && styles.loopStepActive]}>{item.step}</Text>
                      <Text style={[styles.loopTitle, selected && styles.loopTitleActive]}>{item.title}</Text>
                    </Pressable>
                  );
                })}
              </View>
              <View style={styles.loopDetailCard}>
                <Text style={styles.detailEyebrow}>当前步骤</Text>
                <Text style={styles.detailTitle}>{currentLoopStep.title}</Text>
                <Text style={styles.capabilityBody}>{currentLoopStep.summary}</Text>
                <Text style={styles.outcomeLabel}>这一阶段关注什么</Text>
                <Text style={styles.signalText}>{currentLoopStep.signal}</Text>
                <View style={styles.console}>
                  <Text style={styles.consoleTitle}>示例运行日志</Text>
                  {sampleRunLog.map((line) => (
                    <Text key={line} style={styles.consoleLine}>
                      {line}
                    </Text>
                  ))}
                </View>
              </View>
            </View>

            <SectionHeader
              eyebrow="Knowledge Check"
              title="最后用几道题快速收口"
              description="重点不是考试，而是帮助大家确认有没有抓住今天最关键的判断标准。"
            />
            <View style={styles.quizCard}>
              {quizQuestions.map((question) => (
                <View key={question.id} style={styles.questionBlock}>
                  <Text style={styles.questionPrompt}>{question.prompt}</Text>
                  <View style={styles.answerGroup}>
                    {question.options.map((option, optionIndex) => {
                      const selected = answers[question.id] === optionIndex;
                      const correct = optionIndex === question.answer;
                      const showResult = answers[question.id] !== undefined;
                      return (
                        <Pressable
                          key={option}
                          onPress={() =>
                            setAnswers((current) => ({
                              ...current,
                              [question.id]: optionIndex,
                            }))
                          }
                          style={[
                            styles.answerButton,
                            selected && styles.answerButtonSelected,
                            showResult && correct && styles.answerButtonCorrect,
                          ]}
                        >
                          <Text style={styles.answerLabel}>{option}</Text>
                        </Pressable>
                      );
                    })}
                  </View>
                  {answers[question.id] !== undefined ? (
                    <Text style={styles.explanationText}>{question.explanation}</Text>
                  ) : null}
                </View>
              ))}

              <View style={styles.scorePanel}>
                <Text style={styles.scoreLabel}>当前得分</Text>
                <Text style={styles.scoreValue}>
                  {score} / {quizQuestions.length}
                </Text>
                <Text style={styles.scoreHint}>
                  这一页可以直接作为会议收尾，快速检查大家有没有抓住最关键的结论。
                </Text>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
        <View pointerEvents="none" style={styles.watermarkWrap}>
          <Text style={styles.watermarkText}>Powered By 清云· 武汉研发中心</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

function HeroSection({ isDesktop, isTablet }) {
  return (
    <View style={[styles.heroCard, isDesktop ? styles.heroCardDesktop : styles.stackGap]}>
      <View style={[styles.heroTextColumn, isDesktop && styles.heroTextColumnDesktop]}>
        <Text style={styles.heroEyebrow}>Enterprise AI Training</Text>
        <Text style={styles.heroTitle}>从 LLM 到 Agent，再到 OpenClaw</Text>
        <Text style={styles.heroDescription}>
          这一页面向全公司同事，用来帮助大家理解 AI 的核心概念、能力边界、典型落地方式，以及在真实业务中应该如何判断和使用。
        </Text>
        <View style={styles.metricRow}>
          {heroMetrics.map((metric) => (
            <View key={metric.label} style={styles.metricCard}>
              <Text style={styles.metricValue}>{metric.value}</Text>
              <Text style={styles.metricLabel}>{metric.label}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={[styles.heroPanel, isTablet && styles.heroPanelWide]}>
        <Text style={styles.heroPanelLabel}>今天会看到什么</Text>
        <View style={styles.timelineItem}>
          <Text style={styles.timelineTime}>Part 1</Text>
          <Text style={styles.timelineText}>理解什么是 LLM，以及为什么它不总是正确。</Text>
        </View>
        <View style={styles.timelineItem}>
          <Text style={styles.timelineTime}>Part 2</Text>
          <Text style={styles.timelineText}>理解 MCP、Skill、Workflow 和 Agent 如何让 AI 走出对话框。</Text>
        </View>
        <View style={styles.timelineItem}>
          <Text style={styles.timelineTime}>Part 3</Text>
          <Text style={styles.timelineText}>理解 OpenClaw 的价值、适用场景和边界。</Text>
        </View>
      </View>
    </View>
  );
}

function SectionHeader({ eyebrow, title, description }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionEyebrow}>{eyebrow}</Text>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionDescription}>{description}</Text>
    </View>
  );
}

function CardGrid({ children, isDesktop, isTablet }) {
  return <View style={[styles.glossaryGrid, isTablet && styles.glossaryGridWide]}>{children}</View>;
}

function WordCloudStage({ terms, activeId, onSelect }) {
  return (
    <View style={styles.wordCloudStage}>
      <View style={styles.wordCloudHeader}>
        <Text style={styles.detailEyebrow}>AI Word Cloud</Text>
        <Text style={styles.wordCloudHint}>点击重点词可联动下方演示</Text>
      </View>
      <View style={styles.wordCloudWrap}>
        {terms.map((term, index) => (
          <WordChip
            key={term.id}
            term={term}
            index={index}
            active={activeId === term.id}
            onPress={() => onSelect(term.id)}
          />
        ))}
      </View>
    </View>
  );
}

function WordChip({ term, index, active, onPress }) {
  const float = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(float, {
          toValue: 1,
          duration: 2200 + (index % 5) * 240,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(float, {
          toValue: 0,
          duration: 2200 + (index % 5) * 240,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [float, index]);

  const translateY = float.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -8 - (index % 3) * 2],
  });

  const toneStyle =
    term.tone === "warm"
      ? styles.wordChipWarm
      : term.tone === "dark"
        ? styles.wordChipDark
        : term.tone === "green"
          ? styles.wordChipGreen
          : term.tone === "teal"
            ? styles.wordChipTeal
            : styles.wordChipSand;

  const isPrimary = term.tier === "primary";
  const sizeStyle =
    term.size === "hero"
      ? styles.wordChipHero
      : term.size === "large"
        ? styles.wordChipLarge
        : term.size === "compact"
          ? styles.wordChipCompact
          : isPrimary
            ? styles.wordChipPrimary
            : styles.wordChipSecondary;
  const textSizeStyle =
    term.size === "hero"
      ? styles.wordChipTextHero
      : term.size === "large"
        ? styles.wordChipTextLarge
        : term.size === "compact"
          ? styles.wordChipTextCompact
          : isPrimary
            ? styles.wordChipTextPrimary
            : styles.wordChipTextSecondary;

  return (
    <Animated.View style={{ transform: [{ translateY }] }}>
      <Pressable
        onPress={onPress}
        style={[
          styles.wordChip,
          sizeStyle,
          toneStyle,
          active && styles.wordChipActive,
        ]}
      >
        <Text
          style={[
            styles.wordChipText,
            textSizeStyle,
            term.tone === "dark" && styles.wordChipTextOnDark,
            active && styles.wordChipTextActive,
          ]}
        >
          {term.label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

function ConceptShowcase({ demo }) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    progress.setValue(0);
    const loop = Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        duration: 3200,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: false,
      })
    );
    loop.start();
    return () => loop.stop();
  }, [demo.id, progress]);

  const pulse = progress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.96, 1.06, 0.96],
  });
  const orbit = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  const drift = progress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 16, 0],
  });
  const fill = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["14%", "100%"],
  });
  const glowA = progress.interpolate({
    inputRange: [0, 0.2, 0.5, 1],
    outputRange: [0.25, 0.95, 0.35, 0.25],
  });
  const glowB = progress.interpolate({
    inputRange: [0, 0.35, 0.7, 1],
    outputRange: [0.2, 0.2, 0.95, 0.2],
  });
  const glowC = progress.interpolate({
    inputRange: [0, 0.55, 0.85, 1],
    outputRange: [0.18, 0.18, 0.95, 0.18],
  });
  const cursorX = progress.interpolate({
    inputRange: [0, 0.4, 0.7, 1],
    outputRange: [18, 146, 146, 238],
  });
  const cursorY = progress.interpolate({
    inputRange: [0, 0.4, 0.7, 1],
    outputRange: [24, 68, 68, 126],
  });
  const warning = progress.interpolate({
    inputRange: [0, 0.6, 0.8, 1],
    outputRange: [0, 0, 1, 1],
  });
  const loopDot = progress.interpolate({
    inputRange: [0, 0.33, 0.66, 1],
    outputRange: [0, 94, 188, 0],
  });

  return (
    <View style={styles.demoVisualPanel}>
      {demo.id === "llm" ? (
        <View style={styles.demoCanvasWide}>
          <View style={styles.llmInputPanel}>
            <Text style={styles.demoMicroLabel}>Input</Text>
            <Animated.View style={[styles.queryCard, { transform: [{ translateY: drift }] }]}>
              <Text style={styles.queryCardText}>请根据会议纪要整理待办事项，并按负责人归类</Text>
            </Animated.View>
          </View>
          <View style={styles.blackBoxPanel}>
            <Animated.View style={[styles.blackBoxGlow, { opacity: glowB, transform: [{ scale: pulse }] }]} />
            <Text style={styles.blackBoxTitle}>LLM Black Box</Text>
            <View style={styles.tokenRain}>
              <Animated.View style={[styles.tokenChip, styles.tokenChipA, { opacity: glowA }]} />
              <Animated.View style={[styles.tokenChip, styles.tokenChipB, { opacity: glowB }]} />
              <Animated.View style={[styles.tokenChip, styles.tokenChipC, { opacity: glowC }]} />
            </View>
          </View>
          <View style={styles.llmOutputPanel}>
            <Text style={styles.demoMicroLabel}>Output</Text>
            <Animated.View style={[styles.outputCard, { opacity: glowC }]}>
              <Text style={styles.outputCardText}>1. 整理需求  2. 分配负责人  3. 跟进时间节点</Text>
            </Animated.View>
          </View>
        </View>
      ) : null}

      {demo.id === "prompt" ? (
        <View style={styles.demoCanvasWide}>
          <View style={styles.compareCard}>
            <Text style={styles.compareLabel}>普通问法</Text>
            <Text style={styles.compareMain}>帮我写个总结</Text>
          </View>
          <Animated.View style={[styles.compareArrow, { transform: [{ translateY: drift }] }]}>
            <Text style={styles.compareArrowText}>Prompt 重构</Text>
          </Animated.View>
          <Animated.View style={[styles.compareCard, styles.compareCardActive, { transform: [{ scale: pulse }] }]}>
            <Text style={styles.compareLabelStrong}>结构化提示</Text>
            <Text style={styles.compareMainStrong}>请输出 3 点总结，并列出负责人、截止时间和风险提醒</Text>
          </Animated.View>
        </View>
      ) : null}

      {demo.id === "token" ? (
        <View style={styles.demoCanvasWide}>
          <View style={styles.tokenBoard}>
            <Text style={styles.demoMicroLabel}>Context Budget</Text>
            <View style={styles.meterWrapLarge}>
              <Animated.View style={[styles.meterFillLarge, { width: fill }]} />
            </View>
            <View style={styles.tokenScaleRow}>
              <Text style={styles.tokenScaleLabel}>输入</Text>
              <Text style={styles.tokenScaleLabel}>上下文</Text>
              <Text style={styles.tokenScaleLabel}>输出</Text>
            </View>
          </View>
          <View style={styles.tokenCardsRow}>
            <Animated.View style={[styles.miniStatCard, { opacity: glowA }]}>
              <Text style={styles.miniStatValue}>1.8k</Text>
              <Text style={styles.miniStatLabel}>Input Tokens</Text>
            </Animated.View>
            <Animated.View style={[styles.miniStatCard, { opacity: glowB }]}>
              <Text style={styles.miniStatValue}>6.2k</Text>
              <Text style={styles.miniStatLabel}>Context Used</Text>
            </Animated.View>
            <Animated.View style={[styles.miniStatCard, { opacity: glowC }]}>
              <Text style={styles.miniStatValue}>640</Text>
              <Text style={styles.miniStatLabel}>Output Tokens</Text>
            </Animated.View>
          </View>
        </View>
      ) : null}

      {demo.id === "mcp" ? (
        <View style={styles.demoCanvasWide}>
          <View style={styles.mcpOrbitStage}>
            <Animated.View style={[styles.mcpRing, { transform: [{ rotate: orbit }] }]} />
            <View style={styles.mcpHub}>
              <Text style={styles.mcpHubText}>MCP</Text>
            </View>
            <Animated.View style={[styles.mcpToolCard, styles.mcpToolTop, { opacity: glowA }]}>
              <Text style={styles.mcpToolText}>Search</Text>
            </Animated.View>
            <Animated.View style={[styles.mcpToolCard, styles.mcpToolLeft, { opacity: glowB }]}>
              <Text style={styles.mcpToolText}>Files</Text>
            </Animated.View>
            <Animated.View style={[styles.mcpToolCard, styles.mcpToolRight, { opacity: glowC }]}>
              <Text style={styles.mcpToolText}>CRM</Text>
            </Animated.View>
          </View>
        </View>
      ) : null}

      {demo.id === "rag" ? (
        <View style={styles.demoCanvasWide}>
          <View style={styles.ragColumn}>
            <Animated.View style={[styles.ragCard, { opacity: glowA }]}>
              <Text style={styles.ragTitle}>问题</Text>
              <Text style={styles.ragBody}>客户的报销制度是什么？</Text>
            </Animated.View>
            <Animated.View style={[styles.ragConnectorVertical, { opacity: glowB }]} />
            <Animated.View style={[styles.ragCard, styles.ragCardDark, { opacity: glowB }]}>
              <Text style={styles.ragTitleLight}>检索</Text>
              <Text style={styles.ragBodyLight}>制度文档 / FAQ / 历史通知</Text>
            </Animated.View>
            <Animated.View style={[styles.ragConnectorVertical, { opacity: glowC }]} />
            <Animated.View style={[styles.ragCard, styles.ragCardSuccess, { opacity: glowC }]}>
              <Text style={styles.ragTitle}>回答</Text>
              <Text style={styles.ragBody}>基于检索资料组织结果</Text>
            </Animated.View>
          </View>
        </View>
      ) : null}

      {demo.id === "workflow" ? (
        <View style={styles.demoCanvasWide}>
          <View style={styles.workflowStage}>
            <Animated.View style={[styles.workflowStageNode, { opacity: glowA }]}>
              <Text style={styles.workflowStageNodeText}>输入</Text>
            </Animated.View>
            <Animated.View style={[styles.workflowStageLine, { opacity: glowA }]} />
            <Animated.View style={[styles.workflowStageNode, styles.workflowStageNodeDark, { opacity: glowB }]}>
              <Text style={styles.workflowStageNodeTextLight}>处理</Text>
            </Animated.View>
            <Animated.View style={[styles.workflowStageLine, { opacity: glowB }]} />
            <Animated.View style={[styles.workflowStageNode, { opacity: glowC }]}>
              <Text style={styles.workflowStageNodeText}>审核</Text>
            </Animated.View>
            <Animated.View style={[styles.workflowStageLine, { opacity: glowC }]} />
            <Animated.View style={[styles.workflowStageNode, styles.workflowStageNodeWarm, { opacity: glowC }]}>
              <Text style={styles.workflowStageNodeText}>输出</Text>
            </Animated.View>
          </View>
        </View>
      ) : null}

      {demo.id === "agent" ? (
        <View style={styles.demoCanvasWide}>
          <View style={styles.agentLoopWrap}>
            <View style={styles.agentLoopTrack}>
              <Animated.View style={[styles.agentLoopDot, { left: loopDot }]} />
            </View>
            <View style={styles.agentLoopLabels}>
              <View style={styles.agentLoopLabel}><Text style={styles.agentLoopLabelText}>目标</Text></View>
              <View style={styles.agentLoopLabel}><Text style={styles.agentLoopLabelText}>规划</Text></View>
              <View style={styles.agentLoopLabel}><Text style={styles.agentLoopLabelText}>行动</Text></View>
              <View style={styles.agentLoopLabel}><Text style={styles.agentLoopLabelText}>反馈</Text></View>
            </View>
          </View>
        </View>
      ) : null}

      {demo.id === "openclaw" ? (
        <View style={styles.demoCanvasWide}>
          <View style={styles.windowMock}>
            <View style={styles.windowHeader}>
              <View style={styles.windowDots}>
                <View style={[styles.windowDot, styles.windowDotRed]} />
                <View style={[styles.windowDot, styles.windowDotYellow]} />
                <View style={[styles.windowDot, styles.windowDotGreen]} />
              </View>
              <Text style={styles.windowTitle}>Legacy Console</Text>
            </View>
            <View style={styles.windowBody}>
              <View style={styles.windowSidebar} />
              <View style={styles.windowContent}>
                <View style={styles.windowMenuRow} />
                <View style={styles.windowInputRow} />
                <View style={styles.windowInputRowShort} />
                <View style={styles.windowAction} />
              </View>
              <Animated.View style={[styles.cursor, { left: cursorX, top: cursorY }]} />
            </View>
          </View>
        </View>
      ) : null}

      {demo.id === "hallucination" ? (
        <View style={styles.demoCanvasWide}>
          <View style={styles.hallucinationStage}>
            <View style={styles.answerBubble}>
              <Text style={styles.answerBubbleLabel}>模型回答</Text>
              <Text style={styles.answerBubbleText}>根据公司制度，第 18 条明确要求……</Text>
            </View>
            <Animated.View style={[styles.warningPanel, { opacity: warning, transform: [{ scale: pulse }] }]}>
              <Text style={styles.warningTitle}>需要校验</Text>
              <Text style={styles.warningText}>这条制度可能并不存在，必须回到资料或人工确认。</Text>
            </Animated.View>
          </View>
        </View>
      ) : null}

      <View style={styles.demoLegendCard}>
        <Text style={styles.demoLegendTitle}>演示说明</Text>
        <Text style={styles.demoLegendBody}>{demo.tagline}</Text>
      </View>
    </View>
  );
}

function gridWidthStyle(isDesktop, isTablet, baseStyle) {
  return [
    baseStyle,
    {
      width: isDesktop ? "31.9%" : isTablet ? "48.7%" : "100%",
    },
  ];
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f7f1e8",
  },
  appShell: {
    flex: 1,
    backgroundColor: "#f7f1e8",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 72,
  },
  contentWrap: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 1240,
    gap: 22,
  },
  shape: {
    position: "absolute",
  },
  stackGap: {
    gap: 18,
  },
  heroCard: {
    overflow: "hidden",
    borderRadius: 32,
    borderWidth: 1,
    borderColor: "rgba(39, 54, 59, 0.08)",
    backgroundColor: "rgba(255, 252, 248, 0.86)",
    padding: 24,
    gap: 18,
  },
  heroCardDesktop: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  heroTextColumn: {
    gap: 16,
  },
  heroTextColumnDesktop: {
    flex: 1.3,
    paddingRight: 18,
  },
  heroEyebrow: {
    color: "#9a3412",
    fontSize: 13,
    letterSpacing: 1.6,
    textTransform: "uppercase",
    fontFamily: "Georgia",
  },
  heroTitle: {
    color: "#1f2f33",
    fontSize: 40,
    lineHeight: 48,
    fontFamily: "Georgia",
    fontWeight: "700",
  },
  heroDescription: {
    color: "#42555a",
    fontSize: 17,
    lineHeight: 28,
    maxWidth: 760,
  },
  metricRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  metricCard: {
    minWidth: 132,
    borderRadius: 22,
    backgroundColor: "#fffaf3",
    borderWidth: 1,
    borderColor: "rgba(39, 54, 59, 0.08)",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  metricValue: {
    color: "#1f2f33",
    fontSize: 24,
    fontWeight: "700",
  },
  metricLabel: {
    color: "#6c7b80",
    marginTop: 4,
    fontSize: 13,
  },
  heroPanel: {
    borderRadius: 26,
    backgroundColor: "#173c45",
    padding: 20,
    gap: 16,
  },
  heroPanelWide: {
    flex: 0.9,
  },
  heroPanelLabel: {
    color: "#f6f0e8",
    fontSize: 13,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    fontFamily: "Georgia",
  },
  timelineItem: {
    gap: 6,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.16)",
    paddingTop: 14,
  },
  timelineTime: {
    color: "#f9d8c3",
    fontSize: 14,
    fontWeight: "700",
  },
  timelineText: {
    color: "#eff7f3",
    fontSize: 15,
    lineHeight: 24,
  },
  sectionHeader: {
    marginTop: 6,
    gap: 8,
  },
  sectionEyebrow: {
    color: "#a04d1a",
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    fontFamily: "Georgia",
  },
  sectionTitle: {
    color: "#1f2f33",
    fontSize: 28,
    lineHeight: 36,
    fontFamily: "Georgia",
    fontWeight: "700",
  },
  sectionDescription: {
    color: "#52656a",
    fontSize: 16,
    lineHeight: 26,
    maxWidth: 920,
  },
  capabilityGrid: {
    gap: 14,
  },
  capabilityGridWide: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  capabilityCard: {
    borderRadius: 26,
    backgroundColor: "rgba(255, 250, 243, 0.82)",
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(39, 54, 59, 0.08)",
  },
  capabilityCardWide: {
    width: "48.8%",
  },
  capabilityTitle: {
    color: "#173c45",
    fontSize: 20,
    lineHeight: 26,
    fontFamily: "Georgia",
    fontWeight: "700",
    marginBottom: 8,
  },
  capabilityBody: {
    color: "#45585d",
    fontSize: 15,
    lineHeight: 24,
  },
  glossaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
  },
  glossaryGridWide: {
    alignItems: "stretch",
  },
  glossaryCard: {
    borderRadius: 26,
    backgroundColor: "#fffaf3",
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(39, 54, 59, 0.08)",
    gap: 10,
  },
  glossaryCardActive: {
    borderColor: "#15616d",
    backgroundColor: "rgba(21, 97, 109, 0.08)",
  },
  glossaryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  glossaryTerm: {
    color: "#173c45",
    fontSize: 22,
    lineHeight: 28,
    fontFamily: "Georgia",
    fontWeight: "700",
  },
  glossaryBody: {
    color: "#45585d",
    fontSize: 15,
    lineHeight: 24,
  },
  spotlightCard: {
    borderRadius: 28,
    backgroundColor: "#fffaf3",
    padding: 22,
    borderWidth: 1,
    borderColor: "rgba(39, 54, 59, 0.08)",
    gap: 10,
  },
  wordCloudStage: {
    borderRadius: 30,
    backgroundColor: "#fffaf3",
    padding: 22,
    borderWidth: 1,
    borderColor: "rgba(39, 54, 59, 0.08)",
    gap: 16,
  },
  wordCloudHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  wordCloudHint: {
    color: "#6f817f",
    fontSize: 13,
  },
  wordCloudWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  wordChip: {
    borderRadius: 999,
    paddingHorizontal: 16,
    justifyContent: "center",
    borderWidth: 1,
    marginHorizontal: 1,
    marginVertical: 1,
  },
  wordChipPrimary: {
    minHeight: 52,
    paddingVertical: 13,
  },
  wordChipSecondary: {
    minHeight: 40,
    paddingVertical: 9,
  },
  wordChipHero: {
    minHeight: 60,
    paddingVertical: 14,
    paddingHorizontal: 22,
  },
  wordChipLarge: {
    minHeight: 48,
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  wordChipCompact: {
    minHeight: 34,
    paddingVertical: 7,
    paddingHorizontal: 13,
  },
  wordChipWarm: {
    backgroundColor: "#f4dfd0",
    borderColor: "rgba(240, 90, 40, 0.14)",
  },
  wordChipDark: {
    backgroundColor: "#173c45",
    borderColor: "rgba(23, 60, 69, 0.3)",
  },
  wordChipGreen: {
    backgroundColor: "#d9e9e5",
    borderColor: "rgba(122, 158, 126, 0.2)",
  },
  wordChipTeal: {
    backgroundColor: "#d9ecef",
    borderColor: "rgba(21, 97, 109, 0.16)",
  },
  wordChipSand: {
    backgroundColor: "#efe6d7",
    borderColor: "rgba(90, 77, 52, 0.1)",
  },
  wordChipActive: {
    transform: [{ scale: 1.04 }],
    borderColor: "#f05a28",
    shadowColor: "#f05a28",
    shadowOpacity: 0.18,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  wordChipText: {
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  wordChipTextPrimary: {
    fontSize: 18,
    color: "#173c45",
  },
  wordChipTextSecondary: {
    fontSize: 14,
    color: "#33474c",
  },
  wordChipTextHero: {
    fontSize: 22,
    color: "#173c45",
  },
  wordChipTextLarge: {
    fontSize: 17,
    color: "#173c45",
  },
  wordChipTextCompact: {
    fontSize: 13,
    color: "#33474c",
  },
  wordChipTextOnDark: {
    color: "#f6f1e7",
  },
  wordChipTextActive: {
    color: "#a23f13",
  },
  focusTermRail: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  focusTermChip: {
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: "#fffaf3",
    borderWidth: 1,
    borderColor: "rgba(39, 54, 59, 0.1)",
  },
  focusTermChipActive: {
    backgroundColor: "#173c45",
    borderColor: "#173c45",
  },
  focusTermText: {
    color: "#33474c",
    fontSize: 14,
    fontWeight: "700",
  },
  focusTermTextActive: {
    color: "#f9f5ee",
  },
  demoStageCard: {
    borderRadius: 30,
    backgroundColor: "#fffaf3",
    padding: 22,
    borderWidth: 1,
    borderColor: "rgba(39, 54, 59, 0.08)",
    gap: 18,
  },
  demoStageCardDesktop: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  demoNarrativePanel: {
    gap: 10,
  },
  demoNarrativePanelDesktop: {
    flex: 1,
    paddingRight: 8,
  },
  reasonCard: {
    borderRadius: 20,
    backgroundColor: "rgba(240, 90, 40, 0.08)",
    padding: 14,
    gap: 6,
  },
  presenterHintCard: {
    borderRadius: 20,
    backgroundColor: "rgba(21, 97, 109, 0.08)",
    padding: 14,
    gap: 6,
    marginTop: 6,
  },
  demoVisualPanel: {
    flex: 1,
    minHeight: 340,
    borderRadius: 26,
    backgroundColor: "#173c45",
    padding: 20,
    justifyContent: "space-between",
    gap: 18,
  },
  demoCanvasWide: {
    minHeight: 220,
    justifyContent: "center",
    gap: 18,
  },
  demoMicroLabel: {
    color: "#f3decf",
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  llmInputPanel: {
    gap: 8,
  },
  llmOutputPanel: {
    gap: 8,
  },
  queryCard: {
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.92)",
    padding: 16,
  },
  queryCardText: {
    color: "#173c45",
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "600",
  },
  blackBoxPanel: {
    minHeight: 120,
    borderRadius: 28,
    backgroundColor: "#0c2328",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  blackBoxGlow: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 999,
    backgroundColor: "rgba(39, 176, 255, 0.18)",
  },
  blackBoxTitle: {
    color: "#f6f2ec",
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  tokenRain: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  tokenChip: {
    position: "absolute",
    width: 54,
    height: 12,
    borderRadius: 999,
    backgroundColor: "rgba(240, 90, 40, 0.92)",
  },
  tokenChipA: {
    top: 22,
    left: 34,
  },
  tokenChipB: {
    bottom: 28,
    right: 42,
  },
  tokenChipC: {
    top: 54,
    right: 88,
  },
  outputCard: {
    borderRadius: 20,
    backgroundColor: "rgba(217, 233, 229, 0.96)",
    padding: 16,
  },
  outputCardText: {
    color: "#173c45",
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "600",
  },
  compareCard: {
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.92)",
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    gap: 8,
  },
  compareCardActive: {
    backgroundColor: "#f4dfd0",
    borderColor: "rgba(240, 90, 40, 0.24)",
  },
  compareLabel: {
    color: "#6b7e83",
    fontSize: 12,
    letterSpacing: 1.1,
    textTransform: "uppercase",
  },
  compareLabelStrong: {
    color: "#9a3412",
    fontSize: 12,
    letterSpacing: 1.1,
    textTransform: "uppercase",
  },
  compareMain: {
    color: "#203338",
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
  },
  compareMainStrong: {
    color: "#7a2c10",
    fontSize: 18,
    lineHeight: 28,
    fontWeight: "700",
  },
  compareArrow: {
    alignSelf: "center",
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.12)",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  compareArrowText: {
    color: "#f6efe7",
    fontSize: 13,
    fontWeight: "700",
  },
  tokenBoard: {
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.92)",
    padding: 18,
    gap: 10,
  },
  meterWrapLarge: {
    height: 18,
    borderRadius: 999,
    backgroundColor: "rgba(23, 60, 69, 0.12)",
    overflow: "hidden",
  },
  meterFillLarge: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#f05a28",
  },
  tokenScaleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tokenScaleLabel: {
    color: "#55696e",
    fontSize: 12,
    fontWeight: "600",
  },
  tokenCardsRow: {
    flexDirection: "row",
    gap: 12,
  },
  miniStatCard: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 14,
    gap: 6,
  },
  miniStatValue: {
    color: "#fff4ea",
    fontSize: 24,
    fontWeight: "700",
  },
  miniStatLabel: {
    color: "#cfe2dd",
    fontSize: 12,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  mcpOrbitStage: {
    minHeight: 220,
    alignItems: "center",
    justifyContent: "center",
  },
  mcpRing: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    borderStyle: "dashed",
  },
  mcpHub: {
    width: 92,
    height: 92,
    borderRadius: 28,
    backgroundColor: "#f3dfd0",
    alignItems: "center",
    justifyContent: "center",
  },
  mcpHubText: {
    color: "#173c45",
    fontSize: 22,
    fontWeight: "800",
  },
  mcpToolCard: {
    position: "absolute",
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.12)",
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  mcpToolTop: {
    top: 18,
  },
  mcpToolLeft: {
    left: 28,
    bottom: 42,
  },
  mcpToolRight: {
    right: 28,
    bottom: 42,
  },
  mcpToolText: {
    color: "#f6f1e7",
    fontSize: 13,
    fontWeight: "700",
  },
  ragColumn: {
    gap: 8,
  },
  ragCard: {
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.92)",
    padding: 16,
    gap: 6,
  },
  ragCardDark: {
    backgroundColor: "#0c2328",
  },
  ragCardSuccess: {
    backgroundColor: "#d9e9e5",
  },
  ragTitle: {
    color: "#173c45",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    fontWeight: "700",
  },
  ragTitleLight: {
    color: "#f8f4ec",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    fontWeight: "700",
  },
  ragBody: {
    color: "#264045",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  ragBodyLight: {
    color: "#dfeae7",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  ragConnectorVertical: {
    alignSelf: "center",
    width: 3,
    height: 24,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.28)",
  },
  workflowStage: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  workflowStageNode: {
    width: 78,
    height: 78,
    borderRadius: 24,
    backgroundColor: "#dce9e5",
    alignItems: "center",
    justifyContent: "center",
  },
  workflowStageNodeDark: {
    backgroundColor: "#0e2d34",
  },
  workflowStageNodeWarm: {
    backgroundColor: "#f4dfd0",
  },
  workflowStageNodeText: {
    color: "#173c45",
    fontSize: 14,
    fontWeight: "700",
  },
  workflowStageNodeTextLight: {
    color: "#f6f2e9",
    fontSize: 14,
    fontWeight: "700",
  },
  workflowStageLine: {
    flex: 1,
    height: 3,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.22)",
    marginHorizontal: 8,
  },
  agentLoopWrap: {
    gap: 18,
    paddingVertical: 12,
  },
  agentLoopTrack: {
    height: 6,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.16)",
    position: "relative",
  },
  agentLoopDot: {
    position: "absolute",
    top: -6,
    width: 18,
    height: 18,
    borderRadius: 999,
    backgroundColor: "#f05a28",
  },
  agentLoopLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  agentLoopLabel: {
    flex: 1,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.09)",
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  agentLoopLabelText: {
    color: "#e7f1ef",
    textAlign: "center",
    fontSize: 13,
    fontWeight: "700",
  },
  windowMock: {
    borderRadius: 24,
    backgroundColor: "#eff4f2",
    overflow: "hidden",
  },
  windowHeader: {
    height: 42,
    backgroundColor: "#d8e3df",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    justifyContent: "space-between",
  },
  windowDots: {
    flexDirection: "row",
    gap: 6,
  },
  windowDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
  },
  windowDotRed: {
    backgroundColor: "#ef7d62",
  },
  windowDotYellow: {
    backgroundColor: "#e9bf55",
  },
  windowDotGreen: {
    backgroundColor: "#6bc28e",
  },
  windowTitle: {
    color: "#41575c",
    fontSize: 12,
    fontWeight: "700",
  },
  windowBody: {
    minHeight: 170,
    flexDirection: "row",
    position: "relative",
  },
  windowSidebar: {
    width: 58,
    backgroundColor: "#173c45",
  },
  windowContent: {
    flex: 1,
    padding: 16,
    gap: 10,
  },
  windowMenuRow: {
    width: "82%",
    height: 18,
    borderRadius: 999,
    backgroundColor: "#d7e4e0",
  },
  windowInputRow: {
    width: "100%",
    height: 42,
    borderRadius: 14,
    backgroundColor: "#ffffff",
  },
  windowInputRowShort: {
    width: "72%",
    height: 42,
    borderRadius: 14,
    backgroundColor: "#ffffff",
  },
  windowAction: {
    width: 110,
    height: 34,
    borderRadius: 12,
    backgroundColor: "#f05a28",
  },
  cursor: {
    position: "absolute",
    width: 18,
    height: 18,
    borderRadius: 999,
    backgroundColor: "#0e2d34",
    borderWidth: 3,
    borderColor: "#f6f2e9",
  },
  hallucinationStage: {
    gap: 16,
  },
  answerBubble: {
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.92)",
    padding: 18,
    gap: 8,
  },
  answerBubbleLabel: {
    color: "#6a7f84",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1.1,
    fontWeight: "700",
  },
  answerBubbleText: {
    color: "#1d3439",
    fontSize: 18,
    lineHeight: 28,
    fontWeight: "600",
  },
  warningPanel: {
    borderRadius: 22,
    backgroundColor: "rgba(240, 90, 40, 0.16)",
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(240, 90, 40, 0.24)",
    gap: 6,
  },
  warningTitle: {
    color: "#ffd8c8",
    fontSize: 14,
    textTransform: "uppercase",
    letterSpacing: 1.1,
    fontWeight: "800",
  },
  warningText: {
    color: "#fff2eb",
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "600",
  },
  demoCanvas: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 180,
  },
  demoNode: {
    width: 92,
    height: 92,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  demoNodeWarm: {
    backgroundColor: "#f5d6bf",
  },
  demoNodeDark: {
    backgroundColor: "#0e2d34",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  demoNodeSoft: {
    backgroundColor: "#d9e9e5",
  },
  demoNodeText: {
    color: "#173c45",
    fontSize: 14,
    lineHeight: 18,
    textAlign: "center",
    fontWeight: "700",
  },
  demoNodeTextLight: {
    color: "#f4f8f7",
    fontSize: 14,
    lineHeight: 18,
    textAlign: "center",
    fontWeight: "700",
  },
  demoConnector: {
    flex: 1,
    height: 3,
    marginHorizontal: 10,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.28)",
  },
  demoLegendCard: {
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.08)",
    padding: 16,
    gap: 10,
  },
  demoLegendTitle: {
    color: "#f4efe6",
    fontSize: 13,
    letterSpacing: 1.1,
    textTransform: "uppercase",
  },
  demoLegendBody: {
    color: "#d9e8e4",
    fontSize: 14,
    lineHeight: 22,
  },
  meterWrap: {
    height: 14,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.12)",
    overflow: "hidden",
  },
  meterFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#f05a28",
  },
  workflowMini: {
    flexDirection: "row",
    alignItems: "center",
  },
  workflowMiniNode: {
    width: 22,
    height: 22,
    borderRadius: 999,
    backgroundColor: "#f4efe6",
  },
  workflowMiniLine: {
    flex: 1,
    height: 3,
    marginHorizontal: 8,
    backgroundColor: "rgba(255,255,255,0.24)",
  },
  hallucinationCard: {
    flexDirection: "row",
    gap: 10,
  },
  truthBadge: {
    width: 54,
    height: 20,
    borderRadius: 999,
    backgroundColor: "#7a9e7e",
  },
  riskBadge: {
    width: 54,
    height: 20,
    borderRadius: 999,
    backgroundColor: "#f05a28",
  },
  levelPill: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  levelPillPrimary: {
    backgroundColor: "rgba(240, 90, 40, 0.12)",
  },
  levelPillSecondary: {
    backgroundColor: "rgba(21, 97, 109, 0.1)",
  },
  levelPillText: {
    fontSize: 12,
    fontWeight: "700",
  },
  levelPillTextPrimary: {
    color: "#b44916",
  },
  levelPillTextSecondary: {
    color: "#15616d",
  },
  stageGrid: {
    gap: 16,
  },
  stageGridDesktop: {
    flexDirection: "row",
  },
  stageCard: {
    flex: 1,
    borderRadius: 28,
    backgroundColor: "#fffaf3",
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(39, 54, 59, 0.08)",
    gap: 12,
  },
  stageCardDesktop: {
    minHeight: 324,
  },
  stageAccent: {
    width: 54,
    height: 8,
    borderRadius: 999,
  },
  stageKicker: {
    color: "#76878b",
    fontSize: 12,
    letterSpacing: 1.3,
    textTransform: "uppercase",
  },
  stageTitle: {
    color: "#1f2f33",
    fontSize: 24,
    lineHeight: 30,
    fontFamily: "Georgia",
    fontWeight: "700",
  },
  stageSummary: {
    color: "#45585d",
    fontSize: 15,
    lineHeight: 24,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    borderRadius: 999,
    backgroundColor: "#f4ede2",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  tagLabel: {
    color: "#4f6065",
    fontSize: 13,
    fontWeight: "600",
  },
  outcomeLabel: {
    color: "#a04d1a",
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginTop: 2,
  },
  outcomeText: {
    color: "#314449",
    fontSize: 15,
    lineHeight: 24,
  },
  roleLayout: {
    gap: 16,
  },
  roleLayoutDesktop: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  roleSelector: {
    gap: 12,
  },
  roleSelectorDesktop: {
    width: 360,
  },
  roleButton: {
    borderRadius: 22,
    padding: 18,
    backgroundColor: "rgba(255, 250, 243, 0.86)",
    borderWidth: 1,
    borderColor: "rgba(39, 54, 59, 0.08)",
    gap: 5,
  },
  roleButtonActive: {
    backgroundColor: "#173c45",
    borderColor: "#173c45",
  },
  roleButtonTitle: {
    color: "#1f2f33",
    fontSize: 18,
    fontFamily: "Georgia",
    fontWeight: "700",
  },
  roleButtonTitleActive: {
    color: "#fdf8ef",
  },
  roleButtonMeta: {
    color: "#64757a",
    fontSize: 13,
  },
  roleButtonMetaActive: {
    color: "#d6e5e1",
  },
  roleDetailCard: {
    flex: 1,
    borderRadius: 28,
    backgroundColor: "#fffaf3",
    padding: 22,
    borderWidth: 1,
    borderColor: "rgba(39, 54, 59, 0.08)",
    gap: 10,
  },
  detailEyebrow: {
    color: "#a04d1a",
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  detailTitle: {
    color: "#1f2f33",
    fontSize: 28,
    lineHeight: 34,
    fontFamily: "Georgia",
    fontWeight: "700",
  },
  detailMeta: {
    color: "#67787d",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 4,
  },
  pollCard: {
    borderRadius: 28,
    backgroundColor: "#fffaf3",
    padding: 22,
    borderWidth: 1,
    borderColor: "rgba(39, 54, 59, 0.08)",
    gap: 14,
  },
  pollOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  pollButton: {
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#f4ede2",
    borderWidth: 1,
    borderColor: "rgba(39, 54, 59, 0.08)",
  },
  pollButtonActive: {
    backgroundColor: "#15616d",
    borderColor: "#15616d",
  },
  pollButtonText: {
    color: "#33474c",
    fontSize: 15,
    fontWeight: "600",
  },
  pollButtonTextActive: {
    color: "#eff7f3",
  },
  pollResult: {
    borderRadius: 20,
    backgroundColor: "rgba(21, 97, 109, 0.08)",
    padding: 16,
    gap: 8,
  },
  pointRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  pointDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: "#f05a28",
    marginTop: 8,
  },
  pointText: {
    flex: 1,
    color: "#33474c",
    fontSize: 15,
    lineHeight: 24,
  },
  labLayout: {
    gap: 16,
  },
  labLayoutDesktop: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  labSelector: {
    gap: 12,
  },
  labSelectorDesktop: {
    width: 360,
  },
  labButton: {
    borderRadius: 22,
    padding: 18,
    backgroundColor: "#fff5e9",
    borderWidth: 1,
    borderColor: "rgba(160, 77, 26, 0.12)",
    gap: 6,
  },
  labButtonActive: {
    backgroundColor: "#f05a28",
    borderColor: "#f05a28",
  },
  labButtonTitle: {
    color: "#1f2f33",
    fontSize: 18,
    fontFamily: "Georgia",
    fontWeight: "700",
  },
  labButtonTitleActive: {
    color: "#fff7f1",
  },
  labButtonTagline: {
    color: "#6f6059",
    fontSize: 13,
    lineHeight: 20,
  },
  labButtonTaglineActive: {
    color: "#ffe8d7",
  },
  labDetailCard: {
    flex: 1,
    borderRadius: 28,
    backgroundColor: "#fffaf3",
    padding: 22,
    borderWidth: 1,
    borderColor: "rgba(39, 54, 59, 0.08)",
    gap: 10,
  },
  labChallenge: {
    color: "#33474c",
    fontSize: 16,
    lineHeight: 27,
    marginBottom: 4,
  },
  decisionCard: {
    borderRadius: 28,
    backgroundColor: "#fffaf3",
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(39, 54, 59, 0.08)",
    gap: 10,
  },
  loopLayout: {
    gap: 16,
  },
  loopLayoutDesktop: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  loopRail: {
    gap: 10,
  },
  loopRailDesktop: {
    width: 300,
  },
  loopButton: {
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 16,
    backgroundColor: "rgba(21, 97, 109, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(21, 97, 109, 0.1)",
  },
  loopButtonActive: {
    backgroundColor: "#15616d",
    borderColor: "#15616d",
  },
  loopStep: {
    color: "#628187",
    fontSize: 12,
    letterSpacing: 1.1,
    textTransform: "uppercase",
  },
  loopStepActive: {
    color: "#d8edf0",
  },
  loopTitle: {
    color: "#173c45",
    marginTop: 5,
    fontSize: 18,
    fontFamily: "Georgia",
    fontWeight: "700",
  },
  loopTitleActive: {
    color: "#f0faf8",
  },
  loopDetailCard: {
    flex: 1,
    borderRadius: 28,
    backgroundColor: "#fffaf3",
    padding: 22,
    borderWidth: 1,
    borderColor: "rgba(39, 54, 59, 0.08)",
    gap: 10,
  },
  signalText: {
    color: "#314449",
    fontSize: 15,
    lineHeight: 24,
  },
  console: {
    marginTop: 8,
    borderRadius: 22,
    backgroundColor: "#102e35",
    padding: 16,
    gap: 6,
  },
  consoleTitle: {
    color: "#f9d8c3",
    fontSize: 13,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  consoleLine: {
    color: "#dcecea",
    fontSize: 13,
    lineHeight: 22,
  },
  quizCard: {
    borderRadius: 30,
    backgroundColor: "#fffaf3",
    padding: 22,
    borderWidth: 1,
    borderColor: "rgba(39, 54, 59, 0.08)",
    gap: 18,
  },
  questionBlock: {
    gap: 10,
  },
  questionPrompt: {
    color: "#1f2f33",
    fontSize: 18,
    lineHeight: 28,
    fontFamily: "Georgia",
    fontWeight: "700",
  },
  answerGroup: {
    gap: 10,
  },
  scenarioDescription: {
    color: "#52656a",
    fontSize: 15,
    lineHeight: 24,
  },
  answerButton: {
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: "#f4ede2",
    borderWidth: 1,
    borderColor: "rgba(39, 54, 59, 0.08)",
  },
  answerButtonSelected: {
    borderColor: "#15616d",
    backgroundColor: "rgba(21, 97, 109, 0.08)",
  },
  answerButtonCorrect: {
    borderColor: "#7a9e7e",
    backgroundColor: "rgba(122, 158, 126, 0.12)",
  },
  answerLabel: {
    color: "#33474c",
    fontSize: 15,
    lineHeight: 24,
  },
  explanationText: {
    color: "#52656a",
    fontSize: 14,
    lineHeight: 23,
  },
  scorePanel: {
    marginTop: 8,
    borderRadius: 22,
    backgroundColor: "#173c45",
    padding: 18,
    gap: 6,
  },
  scoreLabel: {
    color: "#f9d8c3",
    fontSize: 13,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  scoreValue: {
    color: "#fff9f1",
    fontSize: 34,
    fontFamily: "Georgia",
    fontWeight: "700",
  },
  scoreHint: {
    color: "#d6e5e1",
    fontSize: 14,
    lineHeight: 22,
  },
  watermarkWrap: {
    position: "absolute",
    left: 14,
    bottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(255, 250, 243, 0.4)",
    borderWidth: 1,
    borderColor: "rgba(23, 60, 69, 0.08)",
  },
  watermarkText: {
    color: "rgba(23, 60, 69, 0.5)",
    fontSize: 11,
    letterSpacing: 0.2,
  },
});
