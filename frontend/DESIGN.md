---
name: EFM League — Il Provino
description: L'archivio della lega come foglio di provini a contatto, carta fotografica, negativo e matita grassa.
colors:
  paper: "#f4f5f2"
  paper-2: "#e4e5e0"
  rule: "#c2c3bd"
  ink: "#151413"
  ink-2: "#47443f"
  film: "#141312"
  film-2: "#2a2724"
  film-3: "#3b3733"
  edge: "#e0893a"
  edge-ink: "#8f4512"
  wax: "#d3261d"
  chalk: "#f3f0e8"
  team-blue: "#2c5a8c"
  team-red: "#8c3a2c"
typography:
  display-hero:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(4.2rem, 13vw, 9.5rem)"
    fontWeight: 900
    lineHeight: 0.8
    letterSpacing: "-0.01em"
    fontVariation: "\"wdth\" 62"
  display:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(3.4rem, 11vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.84
    letterSpacing: "-0.01em"
    fontVariation: "\"wdth\" 62"
  headline:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(2.4rem, 6.4vw, 4.25rem)"
    fontWeight: 900
    lineHeight: 0.84
    letterSpacing: "-0.01em"
    fontVariation: "\"wdth\" 62"
  title:
    fontFamily: "Archivo, sans-serif"
    fontSize: "1.45rem"
    fontWeight: 800
    lineHeight: 1
    fontVariation: "\"wdth\" 75"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  lede:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.02rem, 1.4vw, 1.15rem)"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Martian Mono, ui-monospace, monospace"
    fontSize: "0.72rem"
    fontWeight: 400
    letterSpacing: "0.14em"
    fontFeature: "\"tnum\""
    fontVariation: "\"wdth\" 75"
  hand:
    fontFamily: "Permanent Marker, cursive"
    fontSize: "1.3rem"
    fontWeight: 400
    lineHeight: 1
rounded:
  none: "0"
  sprocket: "1.6px"
spacing:
  gutter: "clamp(16px, 4vw, 56px)"
  strip-gap: "14px"
  section-top: "clamp(4rem, 9vw, 7.5rem)"
  section-head: "1.6rem"
  row: "0.42rem"
components:
  button-primary:
    backgroundColor: "{colors.film}"
    textColor: "{colors.chalk}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.95rem 1.4rem"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.film-3}"
    textColor: "{colors.chalk}"
  button-primary-disabled:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink-2}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.95rem 1.4rem"
  button-ghost-hover:
    backgroundColor: "{colors.paper-2}"
  nav-band:
    backgroundColor: "{colors.film}"
    textColor: "{colors.edge}"
    padding: "12px 0"
  nav-link:
    textColor: "{colors.edge}"
    typography: "{typography.label}"
    padding: "0.45rem 0.15rem"
  nav-link-active:
    textColor: "{colors.chalk}"
  shot:
    backgroundColor: "{colors.film}"
    textColor: "{colors.edge}"
    rounded: "{rounded.none}"
    padding: "19px 5px 38px"
    width: "clamp(118px, 13vw, 190px)"
  team-tag:
    backgroundColor: "{colors.film}"
    textColor: "{colors.edge}"
    padding: "3px 4px"
  input-search:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.3rem 0"
  print:
    backgroundColor: "{colors.chalk}"
    padding: "12px 12px 3.2rem"
---

# Design System: EFM League — Il Provino

Ambito: questo documento descrive solo il mondo visivo "Il Provino", costruito sotto `app/newUI/` e interamente confinato nello scope `.pv` di `app/newUI/provino.css`. Il resto di `app/` (navbar, pagine, `globals.css`, `/addMatch`) è la vecchia UI conservata intenzionalmente come ricordo: non ne eredita le regole e non va migrata verso questo sistema senza una decisione esplicita.

## Overview

**Creative North Star: "Il Provino a contatto"**

La lega è un rullino sviluppato e stampato a contatto. La pagina è carta fotografica RC bianca; sopra ci sono strisce di negativo nere, perforate, con i numeri di bordo stampati in ambra. Ogni giocatore è una posa mezzo formato verticale, ogni partita una striscia di dieci pose, e le scelte sono segnate a mano con una matita grassa rossa: cerchio per l'MVP e lo stato attivo, croce per la sconfitta, freccia per la serie.

La densità è quella di un foglio di provini: la ripetizione delle pose è il dato, non una decorazione. Il resto è registro: tabelle a filetti, numeri tabellari, righe lunghe esattamente quanto il valore che rappresentano. Il display è un grotesk extra-condensato nero, maiuscolo, che occupa la carta come un titolo stampato a timbro; il wayfinding è letterale, stampato sul bordo della pellicola. Il mondo rifiuta la dashboard esports scura a card con oro hextech.

Il movimento è fisico e raro: le strisce avanzano di pochi punti percentuali all'ingresso come pellicola nel trascinatore, una posa si anima col video di presentazione al passaggio, il sorteggio scorre la pellicola sotto il quadro di proiezione. Tutto si azzera con `prefers-reduced-motion`.

**Key Characteristics:**
- Carta chiara come fondo, negativo nero come unica superficie scura.
- Pose mezzo formato 3:4 con perforazioni e bordo stampato in mono ambra.
- Un solo rosso caldo, la matita grassa, riservato a MVP, stato attivo e focus.
- Display Archivo extra-condensato (wdth 62) nero e maiuscolo; mono Martian condensato per tutto ciò che è stampato a macchina.
- Annotazioni a mano (Permanent Marker e segni SVG filtrati a cera) come stati, non come ornamento.
- Lunghezze esatte: barre di classifica e linea del tempo proporzionali al valore.

## Colors

Due materiali e un segno: carta fotografica e negativo neutri, l'ambra del bordo pellicola come voce stampata, un solo rosso a matita grassa.

### Primary
- **Rosso matita grassa** (`wax`): l'unico colore caldo saturo. Segni Ring/Cross/Arrow, link attivo nella nav, outline di `:focus-visible`, bordo della ricerca a `focus-within`, partita puntata da `:target`, la parola chiave del verdetto del sorteggio, il testo a pennarello `.pv-marker` di default.

### Secondary
- **Ambra bordo pellicola** (`edge`): numeri di bordo e didascalie stampate sul negativo, voci della nav a riposo, tag di squadra, cornice del quadro di proiezione, linea del tempo del Projector, colore della selezione testo. Vive solo su `film`.
- **Ambra bruciata** (`edge-ink`): la stessa voce di bordo quando è stampata sulla carta: numeri di posizione nelle classifiche, edge print sotto il titolo della home, `summary` "Altri N".

### Tertiary
- **Blu squadra** (`team-blue`) e **Rosso mattone squadra** (`team-red`): solo codifica dei lati di partita (quadratino `.pv-side`, filetto inferiore degli slot del sorteggio). Il mattone è volutamente spento e distinto dal `wax`: non è un secondo accento.

### Neutral
- **Carta RC** (`paper`): fondo di ogni pagina e delle intestazioni sticky del mese.
- **Carta velata** (`paper-2`): binario vuoto delle barre di misura, hover del bottone ghost, bottone disabilitato.
- **Filetto** (`rule`): righe da 1px fra le voci di registro, classifiche e tabelle.
- **Inchiostro** (`ink`): testo, filetti di testa da 2px, barre di misura piene.
- **Inchiostro secondario** (`ink-2`): note, didascalie mono, intestazioni di tabella, barre sotto soglia (a opacità 0.45).
- **Negativo** (`film`), **Negativo velato** (`film-2`), **Negativo bruciato** (`film-3`): striscia, fondo immagine della posa e posa non sviluppata, hover del bottone e scrollbar.
- **Gesso** (`chalk`): testo chiaro sul negativo (nomi sul bordo, brand, voce attiva), carta della stampa singola del profilo, croce sulle pose perse.

### Named Rules
**The One Warm Rule.** `wax` è l'unico rosso: compare solo come segno a mano, stato attivo o focus. Mai come fondo, mai per una categoria di dati; il lato rosso della partita usa `team-red`.

**The Two Materials Rule.** Ogni superficie è carta (`paper`) o negativo (`film`). Non esistono pannelli grigi intermedi né card: `paper-2` è solo binario, hover o disabilitato.

**The Edge Voice Rule.** L'ambra `edge` sta sul negativo, `edge-ink` sulla carta. Non invertirli.

## Typography

**Display Font:** Archivo variabile, asse `wdth` (con sans-serif)
**Body Font:** Archivo (con system-ui, sans-serif), tramite `--f-body: var(--f-display)`
**Label/Mono Font:** Martian Mono variabile, asse `wdth` (con ui-monospace)
**Hand Font:** Permanent Marker (con cursive)

**Character:** Un grotesk compresso al 62% e nero 900 timbra i titoli come un'etichetta di scatola; il mono condensato stampa numeri e didascalie come il bordo di una pellicola; il pennarello interviene solo dove una persona ha annotato.

### Hierarchy
- **Display hero** (900, wdth 62, `clamp(4.2rem, 13vw, 9.5rem)`, 0.8): solo "EFM League" in home.
- **Display** (900, wdth 62, `clamp(3.4rem, 11vw, 6rem)`, 0.84, maiuscolo): H1 delle pagine (Classifiche, Storico, Rosa).
- **Headline** (900, wdth 62, `clamp(2.4rem, 6.4vw, 4.25rem)`, 0.84, maiuscolo, `text-wrap: balance`): H2 di sezione e mese.
- **Title** (800, wdth 75, 1.45rem, 1, maiuscolo): titoli delle schede di classifica, allegati, squadre.
- **Body** (400, 1rem, 1.5) e **Lede** (`clamp(1.02rem, 1.4vw, 1.15rem)`, max 58ch, `ink-2`, `text-wrap: pretty`).
- **Label** (Martian Mono, wdth 75, 0.72rem, 0.14em, maiuscolo, cifre tabellari): bordo pellicola, nav, didascalie, intestazioni di tabella, bottoni. Varianti di bordo posa a 0.66rem / 0.56rem.
- **Hand** (Permanent Marker, ~1.2–1.8rem, 1): suggerimenti, nomi annotati, stati vuoti ("rullino vuoto"), didascalia della stampa.

### Named Rules
**The Stamped Caps Rule.** Display e title sono sempre maiuscoli e compressi via `font-stretch` (62% display, 75% title, 70–80% per valori nel registro). Archivo a larghezza piena non compare come titolo.

**The Printed Numbers Rule.** Ogni numero di registro (posizioni, valori, contatori) è in cifre tabellari; i numeri di bordo sono zero-padded (`01`, `Posa 042`).

**The Hand Is Annotation Rule.** Permanent Marker scrive solo ciò che una mano scriverebbe sul provino: mai titoli, mai etichette di navigazione, mai corpo testo.

## Layout

Un foglio a tutta larghezza con margine elastico `gutter` e contenitore massimo 1600px. Le strisce di negativo rompono il margine e corrono a filo pagina, in orizzontale con scroll-snap `proximity`; in home sono due, la seconda sfalsata verso sinistra (`clamp(-120px, -7vw, -40px)`). Le pose larghe `clamp(118px, 13vw, 190px)` (112px sotto 560px) si dispongono anche a foglio con griglia `auto-fill` e `strip-gap` 14px fra le file.

Le sezioni respirano con `section-top`; l'intestazione di sezione allinea il titolo in basso a sinistra e il link mono a destra, andando a capo da sola. La striscia di partita è una griglia di dieci colonne (minimo 92px, 84px su mobile) con un salto di 14px fra la quinta e la sesta posa: blu a sinistra, rosso a destra, nell'ordine dei ruoli. Le intestazioni del mese sono sticky sotto la nav.

Sotto 900px le composizioni a due colonne (hero, profilo, colonne, proiettore, schermo) collassano in una colonna; sotto 560px si stringono pose e brand.

## Elevation & Depth

Il foglio è piatto: la profondità viene dal contrasto fra carta e negativo, dai filetti e dall'esposizione delle pose (perse = desaturate e scurite, selezionate = piene). Due sole eccezioni, entrambe oggetti fisici del mondo.

### Shadow Vocabulary
- **Stampa sollevata** (`box-shadow: 0 1px 1px rgba(21, 20, 19, 0.12), 0 14px 30px -12px rgba(21, 20, 19, 0.35)`): solo la stampa singola del profilo, ruotata di -1.2deg, appoggiata sul foglio.
- **Quadro di proiezione** (`box-shadow: 0 0 0 100vmax rgba(10, 9, 8, 0.62)`): oscura la pellicola fuori dalla finestra del sorteggio. È una maschera, non un'ombra.
- I filetti inset (`inset 0 0 0 1.5px` del bottone ghost, `inset 0 -4px 0` degli slot squadra) sono bordi, non elevazione.

### Named Rules
**The Flat Sheet Rule.** Niente ombre su strisce, schede, bottoni o righe. Un'ombra è ammessa solo per un oggetto fotografico fisicamente sollevato dal foglio.

## Shapes

Tutto è rettangolo vivo, raggio 0: pose, strisce, bottoni, tag, campi. L'unico raggio del sistema è quello della perforazione (`sprocket`, rettangolo 9×7 nel tile SVG 18×7 ripetuto in `round`), che appartiene alla pellicola. I bordi sono filetti: 2px `ink` in testa a registro, classifiche, tabelle, ricerca e liste; 1px `rule` fra le righe. Le uniche linee curve sono i segni a matita, tracciati in due passate e passati nel filtro `#pv-wax` (turbolenza + displacement + grana).

## Components

### Buttons
Comandi stampati a macchina sul negativo, asciutti.
- **Shape:** rettangolo vivo (0), altezza minima 44px.
- **Primary:** fondo `film`, testo `chalk`, label mono 0.8rem a 0.16em maiuscolo, padding 0.95rem 1.4rem; `--big` a 0.95rem e 1.15rem 2rem.
- **Hover / Focus:** fondo `film-3` in 0.2s `ease-out`; focus con outline 2px `wax` a 3px di offset.
- **Ghost:** trasparente, testo `ink`, filetto inset 1.5px `ink`; hover `paper-2`.
- **Disabled:** `paper-2` con testo `ink-2`, cursore not-allowed.

### Cards / Containers
Non esistono card. I contenitori sono la **Scheda di registro** (Board): filetto di testa 2px `ink`, posa del primo in miniatura (84px) cerchiata, titolo, nota mono, righe numerate con barra di misura sotto ogni nome, `details` "Altri N" con chevron.

### Inputs / Fields
- **Style:** ricerca come riga di un modulo: niente box, solo filetto inferiore 2px `ink`, icona lente 18px, testo 1.1rem.
- **Focus:** il filetto diventa `wax` (`focus-within`); l'input non ha outline proprio.

### Navigation
- **EdgeNav:** banda di negativo sticky con perforazioni sopra e sotto. Brand "EFM League" in display gesso con "League" in ambra; voci in label mono ambra, hover e corrente in `chalk`. La voce corrente è cerchiata con il Ring a matita. Su mobile la riga scorre in orizzontale senza scrollbar. Il footer usa la stessa banda.

### Shot (posa)
La primitiva del mondo. Posa mezzo formato 3:4 su striscia `film` con perforazioni, immagine `object-position: 50% 28%`, bordo stampato in basso: numero ambra a sinistra, nome `chalk` a destra. Con un video, al passaggio o al focus il video viene montato e sfuma in 0.35s sopra il fotogramma (mai con reduced motion). Stati: `is-dim`/`is-loss` (grayscale 0.7, brightness 0.62), Ring per MVP, Cross per sconfitta (in gesso). Posa non sviluppata: iniziali display su `film-2`, decorative.

### Marks (segni a matita)
Ring, Cross, Arrow e i glifi di legenda: SVG `currentColor` (default `wax`) con tratti a due spessori e filtro `#pv-wax`, montato una volta nel layout. Cerchio = MVP / attivo, croce = sconfitta, freccia = serie. Sono semantici: hanno `title` quando portano significato.

### GameStrip
Una partita come dieci pose blu|rosso in ordine di ruolo, il lato perdente sottoesposto, l'MVP cerchiato, tag di squadra mono sulla prima posa di ogni lato, metadati mono sopra (Posa NNN · nome · data · vincitore · MVP).

### Projector
Video dentro una posa o una banda di negativo: nessun controllo del browser, un bottone primario "Presentazione/Pausa/Riprendi" in basso a destra e una linea del tempo di 4px in `edge` lunga quanto il tempo proiettato.

### Print
La stampa singola del profilo: carta `chalk`, margine 12px con fascia inferiore per la didascalia a pennarello e mono, ruotata -1.2deg con l'ombra "Stampa sollevata".

## Do's and Don'ts

### Do:
- **Do** confinare ogni regola sotto `.pv` e nei token di `app/newUI/provino.css`; la vecchia UI fuori da `app/newUI` resta com'è.
- **Do** rappresentare un giocatore sempre come Shot, una partita sempre come striscia di dieci pose blu|rosso.
- **Do** usare i segni a matita (Ring, Cross, Arrow) per gli stati MVP, attivo, sconfitta, serie, e solo per quelli.
- **Do** rendere ogni misura una lunghezza esatta: larghezza = valore / massimo, binario `paper-2`, pieno `ink`, sotto soglia `ink-2` a 0.45.
- **Do** stampare il wayfinding sul bordo pellicola in label mono (nav, numeri di posa, link "Tutte le classifiche").
- **Do** azzerare animazioni e video al passaggio con `prefers-reduced-motion`.

### Don't:
- **Don't** usare card, pannelli scuri a riquadri, glow o oro hextech: è la dashboard esports che questo mondo rifiuta.
- **Don't** introdurre un secondo colore caldo o usare `wax` come fondo o per categorie di dati.
- **Don't** arrotondare angoli: l'unico raggio è la perforazione della pellicola.
- **Don't** mettere ombre su strisce, schede o bottoni; l'ombra appartiene solo alla stampa sollevata.
- **Don't** usare Permanent Marker per titoli, navigazione o corpo testo.
- **Don't** usare `film-3` o `ink-2` a opacità ridotta per testo da leggere: sono per iniziali decorative, barre e scrollbar.
