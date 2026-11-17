---
name: Lereng Asri Tourism Experience
colors:
  surface: '#f8f9ff'
  surface-dim: '#d0dbed'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dee9fc'
  surface-container-highest: '#d9e3f6'
  on-surface: '#121c2a'
  on-surface-variant: '#414940'
  inverse-surface: '#27313f'
  inverse-on-surface: '#eaf1ff'
  outline: '#71796f'
  outline-variant: '#c1c9bd'
  surface-tint: '#36693d'
  primary: '#013a13'
  on-primary: '#ffffff'
  primary-container: '#1e5128'
  on-primary-container: '#8cc38f'
  inverse-primary: '#9cd49e'
  secondary: '#904d00'
  on-secondary: '#ffffff'
  secondary-container: '#fe932c'
  on-secondary-container: '#663500'
  tertiary: '#003914'
  on-tertiary: '#ffffff'
  tertiary-container: '#005321'
  on-tertiary-container: '#4fcd6e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b8f1b9'
  primary-fixed-dim: '#9cd49e'
  on-primary-fixed: '#002108'
  on-primary-fixed-variant: '#1e5128'
  secondary-fixed: '#ffdcc3'
  secondary-fixed-dim: '#ffb77d'
  on-secondary-fixed: '#2f1500'
  on-secondary-fixed-variant: '#6e3900'
  tertiary-fixed: '#7ffc97'
  tertiary-fixed-dim: '#62df7d'
  on-tertiary-fixed: '#002109'
  on-tertiary-fixed-variant: '#005320'
  background: '#f8f9ff'
  on-background: '#121c2a'
  surface-variant: '#d9e3f6'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '800'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes a warm, organic, and grounded digital presence for rural mountain tourism. The brand personality blends pastoral Indonesian warmth (*gotong royong*, rural hospitality) with modern eco-tourism reliability. 

The aesthetic is **Tactile Modernist with Organic Earth Tones**. It avoids cold synthetic minimalism in favor of rich forest greens, sunbaked terracotta accents, soft cream backdrops, and approachable geometry. Interface elements feel tangible, generous, and sun-drenched, designed primarily for travelers viewing information on handheld mobile devices under bright outdoor light.

Visual principles:
- **Atmospheric Warmth:** Surfaces reject clinical cold grays and pure whites; everything is tinted with subtle cream and sand undertones.
- **Direct Accessibility Under Outdoor Glare:** High-contrast text, prominent visual hierarchy, and large tap areas for moving hands.
- **Biophilic Grounding:** Clean natural lines, soft elevations, and structural references to terraced landscapes.

## Colors

The palette is derived directly from the highland landscape: canopy foliage, terraced rice hills, midday sun on red clay tiles, and mountain soil.

- **Primary (`#1E5128`):** Deep Forest Green. Anchors navigation bars, primary headlines, active navigation states, and hero backdrops. Evokes pristine hillside flora and conservation.
- **Secondary (`#D97706`):** Warm Terracotta / Golden Amber. Used for promotional badges, ratings, seasonal package highlights, and cultural event accents.
- **Tertiary / Action Accent (`#16A34A`):** High-clarity Booking Emerald / WhatsApp Green. Dedicated exclusively to booking conversions, WhatsApp contact triggers, and real-time availability badges.
- **Neutral Base & Canvas:**
  - Page canvas: Soft organic cream (`#FBF9F5` / `#F4F1EA`).
  - Elevated surfaces & cards: Warm pure cream (`#FFFFFF` to `#FDFCF9`).
  - Primary text: Slate charcoal (`#1F2937`), delivering WCAG AAA contrast without the jarring edge of `#000000`.
  - Secondary/Caption text: Muted olive-slate (`#4B5563`).
  - Surface divider / Border: Sandstone tint (`#E5E0D8`).

## Typography

The design system uses **Plus Jakarta Sans** throughout headlines, body, and labels. Its open apertures, geometric purity, and humanist contours offer optimal legibility across mobile touchscreens and ambient outdoor glare.

- **Legibility Standard:** Body text never drops below 16px (`body-md`) for content paragraphs to guarantee readability while walking or in high daylight conditions.
- **Headlines:** Dense, confident, and tight-tracked (`letterSpacing: -0.01em` to `-0.02em`) to command attention on narrow viewport widths.
- **Line Heights:** Generous line heights (1.5x to 1.6x) are maintained on all body styles to prevent accidental tap errors and cognitive fatigue during excursion planning.

## Layout & Spacing

A mobile-first fluid layout forms the spine of the experience:
- **Mobile (<768px):** Single-column stack with `margin: 1rem` (16px) dynamic padding. Horizontal carousel ribbons for card lists allow dense information scanning without excessive vertical scrolling.
- **Tablet (768px - 1024px):** 2-column asymmetric grid; content modules leverage `margin: 1.5rem` and `gutter: 1rem`.
- **Desktop (L
NŠŠˆL‹XÛÛ[[ˆÜšYØ\Y]HX^[][HÛÛ[›Ý[™\žHÙˆLŒÙ[\™YÛˆHšY]ÜÜÚ]X\™Ú[Žˆ‹\™[X[™Ý]\ŽˆK\™[X‚‚[ÝXÚZ[\˜XÝ]™H\™Ù]È]\ÝXZ[Z[ˆHZ[š[][H›Ý[™[™È›ÞÙˆ0åÈÚ]HZ[š[][HÙ\\˜][ÛˆÙˆÜXÙK\ÛX

K‚‚ˆÈÈ[]˜][Ûˆ	ˆ\‚•š\ÝX[Y\˜\˜ÚH[\Þ\È
ŠØ\›H[XšY[ÚYÝÜÈÛÛXš[™YÚ]ÛÙÝXÝ\˜[ÛÛZ[›Y[›Ü™\œÊŠ‹ˆ]›ÚYÛ[šXØ[Ý\šÈ›ÜÚYÝÜÈÜˆÚ\œÜ™^H›Ü™\œË‚‚‹H
Š“]™[
›]ÈØ[˜\ÊNŠŠˆ\ÙY›Üˆ˜\ÙHYÙHØ[˜\È
Ñ‘ŽQX
Kˆ›ÈÚYÝË›È›Ü™\‹‚‹H
Š“]™[H
Ø\™Y˜][
NŠŠˆÑ‘‘‘‘‘˜Ý\™˜XÙHXØÛÛ\[šYYžHH\ÛÛY›Ü™\ˆ[ˆÑMQL[™[ˆ[XšY[[Y›ÜÚYÝÎˆMœLœ™Ø˜JÌKŒ
KœœL\™Ø˜JÌKKMKŒÊX‚‹H
Š“]™[ˆ
[\˜XÝ]™HÝ™\ˆÈÚY][Ù[
NŠŠˆLœŽM™Ø˜JÌKŒ
KLLœ™Ø˜JÌKKMKŒ
X‚‹H
Š“]™[È
ÝXÚÞHÕH˜\ˆ	ˆ›Ø][™ÈÚ]Ð\XÝ[ÛŠNŠŠˆ[]˜]YX›Ý™H[ØÜ›Û[™\ÎˆMœÍœMœ™Ø˜JŒ‹MŒËÍŒŒŠKœMLÜ™Ø˜JÌKKMKŒ
X‚‚ˆÈÈÚ\\Â‚•H[\™˜XÙH[Xœ˜XÙ\ÈÜ™Ø[šXÈÝ\˜]\™KˆÛÛZ[™\œË[XYÙ\ËØ\™Ë[™[Ù[ÚY]ÈYÜÛÙXÝ[H›Ý[™YÙ[ÛY]žH
›Ý[™Y™\ÜÎˆ˜Y˜][[™È˜\ÙHÛÜ›™\œÈÈ\™[XÈ[™ÝXÝ\˜[Ø\™ÛÛ\Û™[ÈÈ\™[XÈMœÚ]\™ÙHØ\™ÈØØ[[™ÈÈK\™[X
K‚‚‹H
Š’[œ]ÛÛ›ÛÈ	ˆ]ÛœÎŠŠˆÍ\™[XÈ\™[X›ÜˆœšY[™K[š][™ÈÜš\‚‹H
Š”[YÜÈ	ˆ›Ø][™ÈÕ\ÎŠŠˆ[H›Ý[™Y[\Ú\Y[™È
NNN\
HÈ\Ý[™ÝZ\ÚXÝ[Û˜X›H[™XØ]ÜœÈ[™›ÛÚÚ[™ÈÛÛXÝšYÙÙ\œÈœ›ÛHÛÛ^X[[™›Ü›X][ÛˆÛÛZ[™\œË‚‚ˆÈÈÛÛ\Û™[Â‚ˆÈÈÈ]ÛœÈ	ˆ[\˜XÝ]™HÝXÚ\™Ù]Â‹H
Š”š[X\žHXÝ[Ûˆ
XÚØYÙH›ÛÚÚ[™ÈÈ[œ]Z\šY\ÊNŠŠˆY\›Ü™\ÝÜ™Y[ˆ
ÌQMLLŽ
H˜XÚÙÜ›Ý[™Ú]H^
Ñ‘‘‘‘‘˜
KZ[š[][HZYÚÍ\™[XÛÜ›™\ˆ˜Y]\Ë›ÛÙZYÚŒˆXÝ]™H\šYÙÙ\œÈHÝXHØØ[HÛÛ\™\ÜÚ[Ûˆ
ØØ[JŽN
X
K‚‹H
Š”ÙXÛÛ™\žHXÝ[Ûˆ
Ý\ˆ]Z[ËÝÛ›ØYœ›ØÚ\™JNŠŠˆØ\›HÜ™X[HÝ\™˜XÙHÚ]K\›Ü™\ˆ[ˆš[X\žH
ÌQMLLŽ
K^[ˆÌQMLLŽ‚‹H
Š•Ú]Ð\›Ø][™ÈXÝ[Ûˆ]Ûˆ
PŠNŠŠˆš^Y]H›ÝÛK\šYÚ[Øš[HšY]ÜÜ
Mœ›ÝÛKMœšYÚ
Kˆ[ÜˆÚ\˜Ý[\ˆ\™Ù]Ú]HZ[š[][HMœ›ÛÝš[[YÌMLÍX˜XÚÙÜ›Ý[™Ú]HÚ]Ð\Û\[]˜]YÚ]]™[È\ˆšYÙÙ\œÈ\™XÝY\ÜØYÙH[š]X][ÛˆÚ][˜ÛÙY]Y\žHÝš[™ÜÈ
K™Ë‹Ý^R[ÉLŒ\ØILŒÚ\Ø]ILŒ\™[™ÉLŒ\ÜšK‹‹˜
K‚‚ˆÈÈÈØ\™È	ˆXÚØYÚ[™ÈÛÛZ[™\œÂ‹HÛÛœÝXÝYÛˆÑ‘‘‘‘‘˜Ý\™˜XÙ\ÈÚ]\™[X˜Y]\Ë[˜ÛÜÙYÚ]H\ÝXHØ[™Ý›ÚÙH
ÑMQL
K‚‹HÝÈXY\œÈ\ÙH\ÜXÝ˜][ÈMŽŒLÚ]Ý™\™›ÝÈY[ˆÈX]ÚHÜÝ\˜]\™K‚‹HÛÛ[›ÙH™X]\™\ÈXÚØYÙH]H
XY[™K\ÛX
KšXÙHYÈYÚYÚY[ˆY\›Ü™\ÝÜ™Y[‹\˜][Û‹ÙY™šXÝ[HÚ\Ë[™H[]ÚY›ÝÛHÕH]Û‹‚‚ˆÈÈÈ˜YÙ\È	ˆš[\ˆÚ\Â‹H
Š”šXÚ[™ÈYÎŠŠˆYÚ]š\ÚXš[]HÚ\Ú][X™\‹]\œ˜XÛÝHØ\Ú
Ñ‘QŒÐÍØ˜XÚÙÜ›Ý[™ÐLÌX^
HÜˆ\™XÝY\[Y\˜[^Ú]›Û[Y\šXØ[[\\Ú\Ë‚‹H
Š[Y[š]HÈÜ\˜][Û˜[˜YÙ\ÎŠŠˆÛÛ\XÝX™[ÈÚ]ÑŒQPX˜XÚÙÜ›Ý[™Û]KXÚ\˜ÛØ[^
ÌQŒŽLÍØ
K[™ÝXHÝ][™Kˆ[\Ú\Y
›Ý[™YY[
KYYL‚‚ˆÈÈÈÝÈØ[\žHÜšY‹H[Øš[H[\[Y[][Ûˆ\Ù\È[ˆYÙK]ËYYÙHÜš^›Û[HØÜ›ÛX›H˜XÚÈÚ]š\ÚX›HYZÈ
ÚÝÚ[™ÈMIHÙˆH˜Z[[™ÈØ\™
HÈÚYÛ˜[ÛÛ[X][Û‹‚‹H\ÚÝÜ™Y›ÝÜÈ[ÈHÝYÙÙ\™YËXÛÛ[[ˆ\Þ[[Y]šXÈ[ÜØZXÈÚ]ÛÙMœØ\È[™[XYÙH\ÜXÝ˜][ÜÈÙˆŒØ[™NŒX‚‚ˆÈÈÈX\	ˆØØ][Ûˆ[X™YÛÛZ[™\‚‹HÛÛZ[™YÚ][ˆH›Ý[™Y\™[XÜ˜\\ˆÚ]\›Ü™\‹‚‹H™X]\™\ÈH›Ø][™ÈØ\™Ý™\›^H]H›ÝÛHÚ]š[YÙHY™\ÜË[]YH[™XØ]Üˆ
K™Ë‹
ŒKŒY
ŠK[™HK]\ZØHHÛÛÙÛHX\Èˆ›Ý]HXÝ[Ûˆ]Û‹