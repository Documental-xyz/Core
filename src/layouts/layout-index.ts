import type { AstroComponentFactory } from 'astro/runtime/server/index.js';

import ButtonLayout from './components/ButtonLayout.astro';
import CardLayout from './components/CardLayout.astro';
import CardsCallLayout from './components/CardsCallLayout.astro';
import CardsLayout from './components/CardsLayout.astro';
import ChartBarLayout from './components/ChartBarLayout.astro';
import ChartPercentageLayout from './components/ChartPercentageLayout.astro';
import ColumnLayout from './components/ColumnLayout.astro';
import ColumnStickyLayout from './components/ColumnStickyLayout.astro';
import ColumnsLayout from './components/ColumnsLayout.astro';
import CompareLayout from './components/CompareLayout.astro';
import CtaLayout from './components/CtaLayout.astro';
import GalleryLayout from './components/GalleryLayout.astro';
import GroupLayout from './components/GroupLayout.astro';
import HtmlEmbedLayout from './components/HtmlEmbedLayout.astro';
import ImageBlockLayout from './components/ImageBlockLayout.astro';
import InnerColumnsLayout from './components/InnerColumnsLayout.astro';
import LogosGroupLayout from './components/LogosGroupLayout.astro';
import MapLayout from './components/MapLayout.astro';
import MapViewLayout from './components/MapViewLayout.astro';
import MapboxLayout from './components/MapboxLayout.astro';
import PullquoteLayout from './components/PullquoteLayout.astro';
import SliderLayout from './components/SliderLayout.astro';
import SpacerLayout from './components/SpacerLayout.astro';
import TextLayout from './components/TextLayout.astro';
import TextPlaceholderLayout from './components/TextPlaceholderLayout.astro';
import TimelineBulletLayout from './components/TimelineBulletLayout.astro';
import TimelineLayout from './components/TimelineLayout.astro';
import VideoEmbedLayout from './components/VideoEmbedLayout.astro';

export const layoutMap: Record<string, AstroComponentFactory> = {
  Button: ButtonLayout,
  Card: CardLayout,
  CardsCall: CardsCallLayout,
  Cards: CardsLayout,
  ChartBar: ChartBarLayout,
  ChartPercentage: ChartPercentageLayout,
  Column: ColumnLayout,
  ColumnSticky: ColumnStickyLayout,
  Columns: ColumnsLayout,
  Compare: CompareLayout,
  Cta: CtaLayout,
  Gallery: GalleryLayout,
  Group: GroupLayout,
  HtmlEmbed: HtmlEmbedLayout,
  ImageBlock: ImageBlockLayout,
  InnerColumns: InnerColumnsLayout,
  LogosGroup: LogosGroupLayout,
  Map: MapLayout,
  MapView: MapViewLayout,
  Mapbox: MapboxLayout,
  Pullquote: PullquoteLayout,
  Slider: SliderLayout,
  Spacer: SpacerLayout,
  Text: TextLayout,
  TextPlaceholder: TextPlaceholderLayout,
  TimelineBullet: TimelineBulletLayout,
  Timeline: TimelineLayout,
  VideoEmbed: VideoEmbedLayout,
};