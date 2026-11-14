import { h, type FunctionalComponent, type VNodeChild } from 'vue';
import type { LocaleCode } from '../i18n/locales';
import EuButton from '../components/ui/EuButton.vue';
import EuCursorFollower from '../components/ui/EuCursorFollower.vue';
import ActivityFeed from "../components/ui/EuActivityFeed.vue";
import AIAgentActivity from "../components/ui/EuAIAgentActivity.vue";
import AdvancedDataTable from "../components/ui/EuAdvancedDataTable.vue";
import AirportMatrixClock from "../components/ui/EuAirportMatrixClock.vue";
import AIResponse from "../components/ui/EuAIResponse.vue";
import AnimatedNumber from "../components/ui/EuAnimatedNumber.vue";
import AnimatedTabs from "../components/ui/EuAnimatedTabs.vue";
import AvatarStack from "../components/ui/EuAvatarStack.vue";
import Badge from "../components/ui/EuBadge.vue";
import BatchGestureTray from "../components/ui/EuBatchGestureTray.vue";
import Breadcrumb from "../components/ui/EuBreadcrumb.vue";
import BookCallButton from "../components/ui/EuBookCallButton.vue";
import BranchingSubmenu from "../components/ui/EuBranchingSubmenu.vue";
import Calendar from "../components/ui/EuCalendar.vue";
import CarSmokePageTransition from "../components/ui/EuCarSmokePageTransition.vue";
import Chat from "../components/ui/EuChat.vue";
import CircularOrbit from "../components/ui/EuCircularOrbit.vue";
import CodeSnippetDeck from "../components/ui/EuCodeSnippetDeck.vue";
import Combobox from "../components/ui/EuCombobox.vue";
import CommandMenu from "../components/ui/EuCommandMenu.vue";
import DataTable from "../components/ui/EuDataTable.vue";
import DatePicker from "../components/ui/EuDatePicker.vue";
import DensityLens from "../components/ui/EuDensityLens.vue";
import DependencyTrace from "../components/ui/EuDependencyTrace.vue";
import DepthCorridor from "../components/ui/EuDepthCorridor.vue";
import DirectionalTooltipShowcase from "../components/ui/EuDirectionalTooltip.vue";
import DotField from "../components/ui/EuDotField.vue";
import DotShader from "../components/ui/EuDotShader.vue";
import DonutChart from "../components/ui/EuDonutChart.vue";
import DragToConfirm from "../components/ui/EuDragToConfirm.vue";
import DrawCheckbox from "../components/ui/EuDrawCheckbox.vue";
import DynamicIsland from "../components/ui/EuDynamicIsland.vue";
import Earnings from "../components/ui/EuEarnings.vue";
import EvilEye from "../components/ui/EuEvilEye.vue";
import ExpandableDataRow from "../components/ui/EuExpandableDataRow.vue";
import ExpandableSearch from "../components/ui/EuExpandableSearch.vue";
import FAQ from "../components/ui/EuFAQ.vue";
import FloatingActionDock from "../components/ui/EuFloatingActionDock.vue";
import FocusMode from "../components/ui/EuFocusMode.vue";
import Form from "../components/ui/EuForm.vue";
import GlassNavbar from "../components/ui/EuGlassNavbar.vue";
import GlitchText from "../components/ui/EuGlitchText.vue";
import GlyphMatrix from "../components/ui/EuGlyphMatrix.vue";
import GooeyMenu from "../components/ui/EuGooeyMenu.vue";
import GravityParticleBurst from "../components/ui/EuGravityParticleBurst.vue";
import HamburgerMenu from "../components/ui/EuHamburgerMenu.vue";
import IOSSearchBar from "../components/ui/EuIOSSearchBar.vue";
import InteractiveAreaChart from "../components/ui/EuInteractiveAreaChart.vue";
import InteractiveTimeline from "../components/ui/EuInteractiveTimeline.vue";
import IntroLoader from "../components/ui/EuIntroLoader.vue";
import LiquidRippleButton from "../components/ui/EuLiquidRippleButton.vue";
import LiquidToggle from "../components/ui/EuLiquidToggle.vue";
import LiveLineChart from "../components/ui/EuLiveLineChart.vue";
import Loader from "../components/ui/EuLoader.vue";
import LockInput from "../components/ui/EuLockInput.vue";
import LoginCard from "../components/ui/EuLoginCard.vue";
import MacOsFolderCards from "../components/ui/EuMacOsFolderCards.vue";
import MagneticButton from "../components/ui/EuMagneticButton.vue";
import Meteors from "../components/ui/EuMeteors.vue";
import MetricHUD from "../components/ui/EuMetricHUD.vue";
import MoneyCard from "../components/ui/EuMoneyCard.vue";
import MorphingBlob from "../components/ui/EuMorphingBlob.vue";
import MorphingButton from "../components/ui/EuMorphingButton.vue";
import MorphingDialog from "../components/ui/EuMorphingDialog.vue";
import MorphingIcon from "../components/ui/EuMorphingIcon.vue";
import MorphingMegaMenu from "../components/ui/EuMorphingMegaMenu.vue";
import MorphingShapeLoader from "../components/ui/EuMorphingShapeLoader.vue";
import NeonEdgeButton from "../components/ui/EuNeonEdgeButton.vue";
import NimbuMirchi from "../components/ui/EuNimbuMirchi.vue";
import NotFound from "../components/ui/EuNotFound.vue";
import NotificationBell from "../components/ui/EuNotificationBell.vue";
import NotificationStack from "../components/ui/EuNotificationStack.vue";
import OrbitalLoadingRing from "../components/ui/EuOrbitalLoadingRing.vue";
import OTPInput from "../components/ui/EuOTPInput.vue";
import OriginDropdown from "../components/ui/EuOriginDropdown.vue";
import PackageBox from "../components/ui/EuPackageBox.vue";
import ParticleDelete from "../components/ui/EuParticleDelete.vue";
import PaymentReceiptPrinter from "../components/ui/EuPaymentReceiptPrinter.vue";
import PaymentStatus from "../components/ui/EuPaymentStatus.vue";
import PeekCard from "../components/ui/EuPeekCard.vue";
import PhotoBox from "../components/ui/EuPhotoBox.vue";
import PillNavigation from "../components/ui/EuPillNavigation.vue";
import Pricing from "../components/ui/EuPricing.vue";
import ProductTour from "../components/ui/EuProductTour.vue";
import ProfileCard from "../components/ui/EuProfileCard.vue";
import PromptInput from "../components/ui/EuPromptInput.vue";
import PressButton from "../components/ui/EuPressButton.vue";
import PullToRefresh from "../components/ui/EuPullToRefresh.vue";
import RainbowButton from "../components/ui/EuRainbowButton.vue";
import RecoveryLedger from "../components/ui/EuRecoveryLedger.vue";
import RevealCard from "../components/ui/EuRevealCard.vue";
import RocketPartyPopper from "../components/ui/EuRocketPartyPopper.vue";
import ScrollProgressNav from "../components/ui/EuScrollProgressNav.vue";
import ScrollVelocityText from "../components/ui/EuScrollVelocityText.vue";
import SelectionBasket from "../components/ui/EuSelectionBasket.vue";
import SettleModal from "../components/ui/EuSettleModal.vue";
import Sheet from "../components/ui/EuSheet.vue";
import ShootingStars from "../components/ui/EuShootingStars.vue";
import Sidebar from "../components/ui/EuSidebar.vue";
import SignUp from "../components/ui/EuSignUp.vue";
import SmallFloatingDock from "../components/ui/EuSmallFloatingDock.vue";
import SmartComparison from "../components/ui/EuSmartComparison.vue";
import SmoothAccordion from "../components/ui/EuSmoothAccordion.vue";
import SparklesCore from "../components/ui/EuSparklesCore.vue";
import SpeedWarp from "../components/ui/EuSpeedWarp.vue";
import SplitButton from "../components/ui/EuSplitButton.vue";
import SpotlightCard from "../components/ui/EuSpotlightCard.vue";
import SpotlightSearch from "../components/ui/EuSpotlightSearch.vue";
import SpringSelect from "../components/ui/EuSpringSelect.vue";
import StackUnfoldPanel from "../components/ui/EuStackUnfoldPanel.vue";
import StackedCards from "../components/ui/EuStackedCards.vue";
import StatCard from "../components/ui/EuStatCard.vue";
import StickyPages from "../components/ui/EuStickyPages.vue";
import StoryCards from "../components/ui/EuStoryCards.vue";
import StretchSwitch from "../components/ui/EuStretchSwitch.vue";
import TextScrambleDecoder from "../components/ui/EuTextScrambleDecoder.vue";
import ThinkingOrb from "../components/ui/EuThinkingOrb.vue";
import TorqueDial from "../components/ui/EuTorqueDial.vue";
import TypewriterButton from "../components/ui/EuTypewriterButton.vue";
import UndoToast from "../components/ui/EuUndoToast.vue";
import UnfoldAccordion from "../components/ui/EuUnfoldAccordion.vue";
import VelocityToast from "../components/ui/EuVelocityToast.vue";
import WalletBalance from "../components/ui/EuWalletBalance.vue";
import WalletCard from "../components/ui/EuWalletCard.vue";
import { SkeletonReveal } from '../components/ui/EuSkeleton.vue';
import SlidePagination from "../components/ui/EuSlidePagination.vue";
import Alert from "../components/ui/EuAlert.vue";
import ActivityHeatmap from "../components/ui/EuActivityHeatmap.vue";
import BarChart from "../components/ui/EuBarChart.vue";
import FunnelChart from "../components/ui/EuFunnelChart.vue";
import Stepper from "../components/ui/EuStepper.vue";
import AnimatedFileUpload from "../components/ui/EuAnimatedFileUpload.vue";

type Demo = FunctionalComponent<Record<string, never>>;

const wrap = (c: unknown, props: Record<string, unknown> = {}): Demo => () => h(c as never, props) as VNodeChild;

/** Bilingual text picked by locale. */
const T = (locale: LocaleCode, en: string, zh: string): string => (locale === 'zh-CN' ? zh : en);

export function getDemos(locale: LocaleCode): Record<string, Demo> {
  const zh = locale === 'zh-CN';

  function EuButton2(props2: { variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'subtle' | 'link'; size?: 'sm' | 'md' | 'lg'; loading?: boolean }, ctx2: { slots: { default?: () => VNodeChild } }) {
    return h(EuButton, { variant: props2.variant, size: props2.size, loading: props2.loading }, { default: () => ctx2.slots.default?.() });
  }

  return {
    // ---------- Motion ----------
    'spotlight-card': () =>
      h(SpotlightCard, null, {
        default: () =>
          h('div', { class: 'text-left' }, [
            h('p', { class: 'text-xs uppercase tracking-widest text-muted' }, T(locale, 'spotlight', '聚光灯')),
            h('p', { class: 'mt-2 text-lg font-semibold tracking-tight' }, T(locale, 'Pointer-following illumination', '跟随指针的照明')),
            h('p', { class: 'mt-1.5 text-sm text-muted' }, T(locale, 'Border and surface glow track the cursor via MotionValues — zero re-renders per frame.', '边框与表面辉光经 MotionValue 跟随光标——每帧零组件重渲染。')),
          ]),
      }),
    'cursor-follower': wrap(EuCursorFollower),
    'animated-number': wrap(AnimatedNumber, { value: 98765, currency: 'USD' }),
    'wallet-card': wrap(WalletCard),
    'text-scramble-decoder': wrap(TextScrambleDecoder, { text: 'EASYUI // MOTION' }),
    meteors: wrap(Meteors, { count: 10 }),
    'morphing-blob': wrap(MorphingBlob),
    'glitch-text': wrap(GlitchText, { text: 'GLITCH' }),
    'reveal-card': wrap(RevealCard),
    'airport-matrix-clock': wrap(AirportMatrixClock),
    'sparkles-core': wrap(SparklesCore),
    'shooting-stars': wrap(ShootingStars),
    'dot-field': wrap(DotField),
    scrollvelocitytext: wrap(ScrollVelocityText),
    'car-smoke-page-transition': wrap(CarSmokePageTransition),
    'circular-orbit': wrap(CircularOrbit),
    'density-lens': wrap(DensityLens),
    'dependency-trace': wrap(DependencyTrace),
    'depth-corridor': wrap(DepthCorridor),
    'dot-shader': wrap(DotShader),
    'evil-eye': wrap(EvilEye),
    'expandable-data-row': wrap(ExpandableDataRow),
    'focus-mode': wrap(FocusMode),
    'glyph-matrix': wrap(GlyphMatrix),
    'gravity-particle-burst': wrap(GravityParticleBurst),
    'mac-os-folder-cards': wrap(MacOsFolderCards),
    'metric-hud': wrap(MetricHUD),
    'money-card': wrap(MoneyCard),
    'morphing-icon': wrap(MorphingIcon),
    'nimbu-mirchi': wrap(NimbuMirchi),
    'package-box': wrap(PackageBox),
    'particle-delete': wrap(ParticleDelete),
    'photo-box': wrap(PhotoBox),
    pricing: wrap(Pricing),
    'profile-card': wrap(ProfileCard),
    'speed-warp': wrap(SpeedWarp),
    'stacked-cards': wrap(StackedCards),
    'sticky-pages': wrap(StickyPages),
    'story-cards': wrap(StoryCards),
    'story-card': wrap(StoryCards),
    'thinking-orb': wrap(ThinkingOrb),
    'torque-dial': wrap(TorqueDial),
    'wallet-balance': wrap(WalletBalance),

    // ---------- Buttons ----------
    'book-call-button': wrap(BookCallButton),
    button: () =>
      h('div', { class: 'w-full max-w-md space-y-3' }, [
        h('div', { class: 'flex flex-wrap gap-2' }, (['primary', 'secondary', 'outline', 'ghost'] as const).map((v) => h(EuButton2, { variant: v }, { default: () => v }))),
        h('div', { class: 'flex flex-wrap gap-2' }, (['danger', 'success', 'subtle', 'link'] as const).map((v) => h(EuButton2, { variant: v, size: 'sm' }, { default: () => v }))),
        h('div', { class: 'flex items-center gap-2' }, [
          h(EuButton2, { size: 'lg', loading: true }, { default: () => T(locale, 'Saving…', '保存中…') }),
          h(EuButton2, { size: 'lg', variant: 'outline' }, { default: () => T(locale, 'Cancel', '取消') }),
        ]),
      ]),
    'code-snippet-deck': wrap(CodeSnippetDeck),
    'drag-to-confirm': wrap(DragToConfirm),
    'liquid-ripple-button': () => h(LiquidRippleButton, null, { default: () => T(locale, 'Press for ripple', '点按查看涟漪') }),
    'liquid-toggle': wrap(LiquidToggle),
    'magnetic-button': () => h(MagneticButton, null, { default: () => T(locale, 'Pull me', '吸引我') }),
    'morphing-button': wrap(MorphingButton),
    'neon-edge-button': () => h(NeonEdgeButton, null, { default: () => T(locale, 'Neon edge', '霓虹边缘') }),
    'press-button': () => h(PressButton, null, { default: () => T(locale, 'Tactile press', '按压反馈') }),
    'rainbow-button': wrap(RainbowButton),
    'split-button': wrap(SplitButton),
    'typewriter-button': wrap(TypewriterButton),

    // ---------- Navigation ----------
    'animated-tabs': () => h(AnimatedTabs, { tabs: zh ? ['预览', '代码', '属性'] : ['Preview', 'Code', 'Props'] }),
    'pill-navigation': () => h(PillNavigation, { items: zh ? ['全部', '动效', '表单'] : ['All', 'Motion', 'Forms'] }),
    'glass-navbar': wrap(GlassNavbar),
    'hamburger-menu': wrap(HamburgerMenu),
    'command-menu': wrap(CommandMenu),
    'spotlight-search': wrap(SpotlightSearch),
    'dynamic-island': wrap(DynamicIsland),
    'gooey-menu': wrap(GooeyMenu),
    'origin-dropdown': wrap(OriginDropdown),
    'slide-pagination': wrap(SlidePagination),
    'expandable-search': wrap(ExpandableSearch),
    'branching-submenu': wrap(BranchingSubmenu),
    breadcrumb: () =>
      h(Breadcrumb, {
        trail: zh
          ? ['首页', '组件库', '环形图', 'Donut Chart']
          : ['Home', 'Library', 'Components', 'Donut Chart'],
      }),
    'floating-action-dock': wrap(FloatingActionDock),
    'ios-search-bar': wrap(IOSSearchBar),
    'morphing-mega-menu': wrap(MorphingMegaMenu),
    'scroll-progress-nav': wrap(ScrollProgressNav),
    sidebar: wrap(Sidebar),
    'small-floating-dock': wrap(SmallFloatingDock),
    'smart-comparison': wrap(SmartComparison),

    // ---------- Feedback ----------
    'donut-chart': () =>
      h(DonutChart, {
        segments: zh
          ? [
              { label: '设计', value: 34, color: '#6366f1' },
              { label: '动效', value: 28, color: '#22d3ee' },
              { label: '代码', value: 22, color: '#f59e0b' },
              { label: '文档', value: 16, color: '#10b981' },
            ]
          : [
              { label: 'Design', value: 34, color: '#6366f1' },
              { label: 'Motion', value: 28, color: '#22d3ee' },
              { label: 'Code', value: 22, color: '#f59e0b' },
              { label: 'Docs', value: 16, color: '#10b981' },
            ],
      }),
    'stat-card': () =>
      h('div', { class: 'grid w-full max-w-md grid-cols-2 gap-3' }, [
        h(StatCard, { label: zh ? '星标' : 'Stars', value: 290, delta: 12.4, series: [4, 9, 6, 12, 18, 15, 24, 29] }),
        h(StatCard, { label: zh ? '下载量' : 'Downloads', value: 18420, delta: -3.2, series: [22, 18, 20, 14, 16, 11, 13, 9] }),
      ]),
    alert: () =>
      h('div', { class: 'w-full max-w-sm space-y-3' }, [
        h(Alert, { tone: 'success', title: T(locale, 'Deployment complete', '部署完成'), actionLabel: T(locale, 'View logs', '查看日志') }, { default: () => T(locale, '42 components shipped to production.', '42 个组件已发布到生产环境。') }),
        h(Alert, { tone: 'danger', title: T(locale, 'Build failed', '构建失败') }, { default: () => T(locale, 'Type error in AnimatedNumber.tsx.', 'EuAnimatedNumber.vue 存在类型错误。') }),
      ]),
    badge: () =>
      h('div', { class: 'flex flex-wrap items-center justify-center gap-2.5' }, [
        h(Badge, { label: T(locale, 'Live', '在线'), count: 3 }),
        h(Badge, { label: T(locale, 'Beta', '测试'), tone: 'accent', pulse: false }),
        h(Badge, { label: 'v2.4.0', pulse: false }),
      ]),
    skeleton: () => h(SkeletonReveal, { loading: true }),
    'smooth-accordion': () =>
      h(SmoothAccordion, {
        items: zh
          ? [
              { title: 'EasyUI 是什么？', content: '一个 shadcn 风格、可复制粘贴的 React 动效组件库，此处为 Vue 3 移植版。' },
              { title: '用了什么技术栈？', content: 'Vue 3、Tailwind CSS 4 与 Motion for Vue。' },
              { title: '开源协议？', content: 'MIT——把源码复制进你的项目，归你所有。' },
            ]
          : [
              { title: 'What is EasyUI?', content: 'A copy-paste React motion component library in the shadcn style.' },
              { title: 'Which stack?', content: 'React 19, Tailwind CSS 4 and Framer Motion 13.' },
              { title: 'License?', content: 'MIT — copy the source into your project and own it.' },
            ],
      }),
    loader: wrap(Loader),
    'activity-heatmap': wrap(ActivityHeatmap),
    'bar-chart': () =>
      h(BarChart, {
        labels: zh ? ['周一', '周二', '周三', '周四', '周五'] : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        series: [
          { name: zh ? '浏览' : 'Views', color: '#6366f1', values: [42, 68, 55, 90, 74] },
          { name: zh ? '点击' : 'Clicks', color: '#22d3ee', values: [18, 30, 24, 48, 36] },
        ],
      }),
    'funnel-chart': () =>
      h(FunnelChart, {
        stages: zh
          ? [
              { label: '访问', value: 4800 },
              { label: '注册', value: 2400 },
              { label: '激活', value: 1350 },
              { label: '付费', value: 520 },
            ]
          : [
              { label: 'Visited', value: 4800 },
              { label: 'Signed up', value: 2400 },
              { label: 'Activated', value: 1350 },
              { label: 'Paid', value: 520 },
            ],
      }),
    'interactive-area-chart': () =>
      h(InteractiveAreaChart, {
        labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'],
        values: [12, 30, 22, 44, 38, 62, 55, 78],
      }),
    'live-line-chart': wrap(LiveLineChart),
    earnings: wrap(Earnings),
    chat: wrap(Chat),
    'ai-response': wrap(AIResponse),
    'notification-bell': wrap(NotificationBell),
    stepper: wrap(Stepper),
    'undo-toast': wrap(UndoToast),
    'velocity-toast': wrap(VelocityToast),
    'payment-status': wrap(PaymentStatus),
    'orbital-loading-ring': wrap(OrbitalLoadingRing),
    'activity-feed': wrap(ActivityFeed),
    'ai-agent-activity': wrap(AIAgentActivity),
    'batch-gesture-tray': wrap(BatchGestureTray),
    faq: () =>
      h(FAQ, {
        items: zh
          ? [
              { q: '这是 EasyUI 的分支吗？', a: '不是——这是按上游文档行为从零重写的移植版，代码为原创。', cat: '通用' },
              { q: '支持哪些 Vue 版本？', a: 'Vue 3.5+；演示站点即运行在 Vue 3.5 上。', cat: '通用' },
              { q: '如何安装组件？', a: '把 src/components/ui/ 下的 SFC 复制进你的项目，或使用上游仓库的注册表。', cat: '使用' },
              { q: '可以商用吗？', a: '可以——MIT 协议，复制即拥有。', cat: '使用' },
            ]
          : [
              { q: 'Is this a fork of EasyUI?', a: 'No — it is a from-scratch port of the documented behavior, with original code.', cat: 'General' },
              { q: 'Which Vue versions work?', a: 'Vue 3.5+; the demo site itself runs on Vue 3.5.', cat: 'General' },
              { q: 'How do I install a component?', a: 'Copy the SFC from src/components/ui/ into your project, or use the registry in the upstream repo.', cat: 'Usage' },
              { q: 'Can I use it commercially?', a: 'Yes — MIT licensed, copy-paste ownership included.', cat: 'Usage' },
            ],
      }),
    'interactive-timeline': wrap(InteractiveTimeline),
    'morphing-shape-loader': wrap(MorphingShapeLoader),
    'not-found': wrap(NotFound),
    'notification-stack': wrap(NotificationStack),
    'payment-receipt-printer': wrap(PaymentReceiptPrinter),
    'product-tour': wrap(ProductTour),
    'pull-to-refresh': wrap(PullToRefresh),
    'recovery-ledger': wrap(RecoveryLedger),
    'rocket-party-popper': wrap(RocketPartyPopper),
    'stack-unfold-panel': wrap(StackUnfoldPanel),
    'unfold-accordion': wrap(UnfoldAccordion),

    // ---------- Overlays ----------
    'morphing-dialog': () => h(MorphingDialog, { title: T(locale, 'Expandable card', '可展开卡片') }),
    'directional-tooltip': wrap(DirectionalTooltipShowcase),
    'settle-modal': wrap(SettleModal),
    sheet: wrap(Sheet),
    'avatar-stack': wrap(AvatarStack),
    'intro-loader': wrap(IntroLoader),
    'peek-card': wrap(PeekCard),
    'selection-basket': wrap(SelectionBasket),

    // ---------- Forms ----------
    'draw-checkbox': () =>
      h('div', { class: 'space-y-3' }, [
        h(DrawCheckbox, { label: T(locale, 'Ship it', '发布它') }),
        h(DrawCheckbox, { label: T(locale, 'With motion', '带上动效'), defaultChecked: true }),
      ]),
    'stretch-switch': wrap(StretchSwitch, { defaultOn: true }),
    'otp-input': wrap(OTPInput, { length: 5 }),
    'lock-input': () => h(LockInput, { label: T(locale, 'API secret', 'API 密钥'), placeholder: 'sk-••••••••••••' }),
    combobox: wrap(Combobox),
    'date-picker': wrap(DatePicker),
    'spring-select': wrap(SpringSelect),
    'animated-file-upload': wrap(AnimatedFileUpload),
    'advanced-data-table': wrap(AdvancedDataTable),
    calendar: wrap(Calendar),
    'data-table': wrap(DataTable),
    form: wrap(Form),
    'prompt-input': wrap(PromptInput),

    // ---------- Auth ----------
    login: wrap(LoginCard),
    'sign-up': wrap(SignUp),
  };
}
