import { h, type FunctionalComponent, type VNodeChild } from 'vue';
import ActivityFeed from "../components/ui/EuActivityFeed.vue";
import Alert from "../components/ui/EuAlert.vue";
import SkeletonReveal from "../components/ui/EuSkeleton.vue";
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
import EuButton from "../components/ui/EuButton.vue";
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
import EuCursorFollower from '../components/ui/EuCursorFollower.vue';
import SlidePagination from "../components/ui/EuSlidePagination.vue";
import ActivityHeatmap from "../components/ui/EuActivityHeatmap.vue";
import BarChart from "../components/ui/EuBarChart.vue";
import FunnelChart from "../components/ui/EuFunnelChart.vue";
import Stepper from "../components/ui/EuStepper.vue";
import AnimatedFileUpload from "../components/ui/EuAnimatedFileUpload.vue";

type Demo = FunctionalComponent<Record<string, never>>;

const wrap = (c: unknown, props: Record<string, unknown> = {}): Demo => () => h(c as never, props) as VNodeChild;

export const DEMOS: Record<string, Demo> = {
  // ---------- Motion ----------
  'spotlight-card': () =>
    h(SpotlightCard, null, {
      default: () =>
        h('div', { class: 'text-left' }, [
          h('p', { class: 'text-xs uppercase tracking-widest text-muted' }, 'spotlight'),
          h('p', { class: 'mt-2 text-lg font-semibold tracking-tight' }, 'Pointer-following illumination'),
          h('p', { class: 'mt-1.5 text-sm text-muted' }, 'Border and surface glow track the cursor via MotionValues — zero re-renders per frame.'),
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
      h('div', { class: 'flex flex-wrap gap-2' }, (['primary', 'secondary', 'outline', 'ghost'] as const).map((v) => h(EuButton, { variant: v }, { default: () => v }))),
      h('div', { class: 'flex flex-wrap gap-2' }, (['danger', 'success', 'subtle', 'link'] as const).map((v) => h(EuButton, { variant: v, size: 'sm' }, { default: () => v }))),
      h('div', { class: 'flex items-center gap-2' }, [
        h(EuButton, { size: 'lg', loading: true }, { default: () => 'Saving…' }),
        h(EuButton, { size: 'lg', variant: 'outline' }, { default: () => 'Cancel' }),
      ]),
    ]),
  'code-snippet-deck': wrap(CodeSnippetDeck),
  'drag-to-confirm': wrap(DragToConfirm),
  'liquid-ripple-button': () => h(LiquidRippleButton, null, { default: () => 'Press for ripple' }),
  'liquid-toggle': wrap(LiquidToggle),
  'magnetic-button': () => h(MagneticButton, null, { default: () => 'Pull me' }),
  'morphing-button': wrap(MorphingButton),
  'neon-edge-button': () => h(NeonEdgeButton, null, { default: () => 'Neon edge' }),
  'press-button': () => h(PressButton, null, { default: () => 'Tactile press' }),
  'rainbow-button': wrap(RainbowButton),
  'split-button': wrap(SplitButton),
  'typewriter-button': wrap(TypewriterButton),

  // ---------- Navigation ----------
  'animated-tabs': wrap(AnimatedTabs, { tabs: ['Preview', 'Code', 'Props'] }),
  'pill-navigation': wrap(PillNavigation, { items: ['All', 'Motion', 'Forms'] }),
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
  breadcrumb: wrap(Breadcrumb),
  'floating-action-dock': wrap(FloatingActionDock),
  'ios-search-bar': wrap(IOSSearchBar),
  'morphing-mega-menu': wrap(MorphingMegaMenu),
  'scroll-progress-nav': wrap(ScrollProgressNav),
  sidebar: wrap(Sidebar),
  'small-floating-dock': wrap(SmallFloatingDock),
  'smart-comparison': wrap(SmartComparison),

  // ---------- Feedback ----------
  'donut-chart': wrap(DonutChart, {
    segments: [
      { label: 'Design', value: 34, color: '#6366f1' },
      { label: 'Motion', value: 28, color: '#22d3ee' },
      { label: 'Code', value: 22, color: '#f59e0b' },
      { label: 'Docs', value: 16, color: '#10b981' },
    ],
  }),
  'stat-card': () =>
    h('div', { class: 'grid w-full max-w-md grid-cols-2 gap-3' }, [
      h(StatCard, { label: 'Stars', value: 290, delta: 12.4, series: [4, 9, 6, 12, 18, 15, 24, 29] }),
      h(StatCard, { label: 'Downloads', value: 18420, delta: -3.2, series: [22, 18, 20, 14, 16, 11, 13, 9] }),
    ]),
  alert: () =>
    h('div', { class: 'w-full max-w-sm space-y-3' }, [
      h(Alert, { tone: 'success', title: 'Deployment complete', actionLabel: 'View logs' }, { default: () => '42 components shipped to production.' }),
      h(Alert, { tone: 'danger', title: 'Build failed' }, { default: () => 'Type error in AnimatedNumber.tsx.' }),
    ]),
  badge: () =>
    h('div', { class: 'flex flex-wrap items-center justify-center gap-2.5' }, [
      h(Badge, { label: 'Live', count: 3 }),
      h(Badge, { label: 'Beta', tone: 'accent', pulse: false }),
      h(Badge, { label: 'v2.4.0', pulse: false }),
    ]),
  skeleton: wrap(SkeletonReveal, { loading: true }),
  'smooth-accordion': wrap(SmoothAccordion, {
    items: [
      { title: 'What is EasyUI?', content: 'A copy-paste React motion component library in the shadcn style.' },
      { title: 'Which stack?', content: 'React 19, Tailwind CSS 4 and Framer Motion 13.' },
      { title: 'License?', content: 'MIT — copy the source into your project and own it.' },
    ],
  }),
  loader: wrap(Loader),
  'activity-heatmap': wrap(ActivityHeatmap),
  'bar-chart': wrap(BarChart, {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    series: [
      { name: 'Views', color: '#6366f1', values: [42, 68, 55, 90, 74] },
      { name: 'Clicks', color: '#22d3ee', values: [18, 30, 24, 48, 36] },
    ],
  }),
  'funnel-chart': wrap(FunnelChart, {
    stages: [
      { label: 'Visited', value: 4800 },
      { label: 'Signed up', value: 2400 },
      { label: 'Activated', value: 1350 },
      { label: 'Paid', value: 520 },
    ],
  }),
  'interactive-area-chart': wrap(InteractiveAreaChart, {
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
  faq: wrap(FAQ),
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
  'morphing-dialog': wrap(MorphingDialog, { title: 'Expandable card' }),
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
      h(DrawCheckbox, { label: 'Ship it' }),
      h(DrawCheckbox, { label: 'With motion', defaultChecked: true }),
    ]),
  'stretch-switch': wrap(StretchSwitch, { defaultOn: true }),
  'otp-input': wrap(OTPInput, { length: 5 }),
  'lock-input': wrap(LockInput, { label: 'API secret', placeholder: 'sk-••••••••••••' }),
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
