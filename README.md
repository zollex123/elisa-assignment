# Toote pildigalerii komponent

Responsive ja ligipääsetav pildigalerii koos lightbox-funktsiooniga.

## Lähenemine

- **Vanilla TypeScript**, ilma raamistiketa
- **BEM-metoodika** CSS-is kahe blokiga: `.gallery` ja `.lightbox`
- **Mobile-first** responsiivne disain murdepunktiga 768px juures

## Responsiivne käitumine

- **Mobiil:** Täislaiuses pilt, edasi/tagasi nooled, swipe-liigutused navigeerimiseks
- **Desktop:** Ümarate nurkadega pilt, pisipiltidega navigeerimine, klõps avab lightbox-modaali

## Ligipääsetavus

- Täielik klaviatuurinavigatsioon (nooleklahvid, Escape, Tab) koos fookuse lukustamise ja taastamisega lightboxis
- `aria-live` piirkonnad teavitavad ekraanilugejat pildi vahetusest (nt "Product image 2 of 4")
- `prefers-reduced-motion` toetatud, nähtavad fookusindikaatorid kõigil interaktiivsetel elementidel