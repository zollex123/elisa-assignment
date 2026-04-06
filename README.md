# Toote pildigalerii komponent

Responsive ja ligipääsetav pildigalerii koos lightbox-funktsiooniga.

### [Demo](https://zollex123.github.io/elisa-assignment/)

## Lähenemine

- **Vanilla TypeScript**, ilma raamistiketa
- **BEM-metoodika** CSS-is kahe blokiga: `.gallery` ja `.lightbox`
- **Mobile-first** responsiivne disain murdepunktiga 768px juures

## Responsiivne käitumine

- **Mobiil:** Täislaiuses pilt, edasi/tagasi nooled, swipe-liigutused navigeerimiseks
- **Desktop:** Ümarate nurkadega pilt, pisipiltidega navigeerimine, klõps avab lightbox-modaali

## Ligipääsetavus

- Täielik klaviatuurinavigatsioon (nooleklahvid, Escape, Tab) koos fookuse lukustamise ja taastamisega lightboxis
- `aria-live` piirkonnad teavitavad ekraanilugejat pildi vahetusest (nt "Toote pilt 2/4")
- `prefers-reduced-motion` toetatud, nähtavad fookusindikaatorid kõigil interaktiivsetel elementidel
- [WCAG audit läbitud](https://accessibilitycheck.friendlycaptcha.com/audit?t=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJodHRwczovL3pvbGxleDEyMy5naXRodWIuaW8vZWxpc2EtYXNzaWdubWVudC8iLCJpYXQiOjE3NzU1MTcyODksImV4cCI6MTc3NTYwMzY4OX0.3oXIfaAxbNks3vJVFO8beT8wCfATjywP63rhi0EkzZo)