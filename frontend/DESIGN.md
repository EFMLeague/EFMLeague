---
name: EFM League
description: L'archivio della lega come dashboard esports scura nel solco del client di League of Legends.
colors:
  bg: "#0b0b12"
  bg-2: "#101019"
  surface: "#15141f"
  surface-2: "#1c1b29"
  surface-3: "#262535"
  line: "#2a2939"
  line-2: "#3a3950"
  text: "#eeece6"
  text-2: "#acaabb"
  text-3: "#8a889c"
  blue: "#2f66f5"
  blue-text: "#6e95ff"
  blue-tint: "rgba(47, 102, 245, 0.13)"
  red: "#e3172b"
  red-text: "#ff6170"
  red-tint: "rgba(227, 23, 43, 0.12)"
  gold: "#c8aa6e"
  gold-2: "#f0e6d2"
  gold-tint: "rgba(200, 170, 110, 0.12)"
  action: "#f2f0ea"
  action-hover: "#ffffff"
  action-text: "#0b0b12"
typography:
  display-hero:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(3.4rem, 8.5vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.86
    letterSpacing: "-0.005em"
  display:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)"
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: "-0.005em"
  headline:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(1.6rem, 3vw, 2.25rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.005em"
  title:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.05em"
  body:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  lede:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "clamp(1rem, 1.3vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.08em"
  stat:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "1.6rem"
    fontWeight: 700
    lineHeight: 1.1
    fontFeature: "\"tnum\""
rounded:
  sm: "4px"
  md: "6px"
  lg: "10px"
  pill: "999px"
spacing:
  gutter: "clamp(16px, 4vw, 48px)"
  container: "1320px"
  nav-h: "64px"
  section: "clamp(2.5rem, 5vw, 4rem)"
  section-head: "1.25rem"
  grid-gap: "1rem"
  row: "0.45rem 1.1rem"
components:
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "{colors.action-text}"
    rounded: "{rounded.md}"
    padding: "0 1.25rem"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
    textColor: "{colors.action-text}"
  button-primary-big:
    backgroundColor: "{colors.action}"
    textColor: "{colors.action-text}"
    rounded: "{rounded.md}"
    padding: "0 1.75rem"
    height: "52px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: "0 1.25rem"
    height: "44px"
  button-secondary-hover:
    backgroundColor: "{colors.surface-2}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
  badge-blue:
    backgroundColor: "{colors.blue-tint}"
    textColor: "{colors.blue-text}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0.2rem 0.55rem"
  badge-red:
    backgroundColor: "{colors.red-tint}"
    textColor: "{colors.red-text}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0.2rem 0.55rem"
  badge-plain:
    backgroundColor: "{colors.surface-3}"
    textColor: "{colors.text-2}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0.2rem 0.55rem"
  nav:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.text-2}"
    height: "{spacing.nav-h}"
  nav-link-active:
    textColor: "{colors.text}"
  input-search:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: "0 0.9rem"
    height: "46px"
  pick:
    backgroundColor: "{colors.bg-2}"
    textColor: "{colors.text-2}"
    rounded: "{rounded.md}"
    padding: "0.35rem 0.6rem 0.35rem 0.4rem"
    height: "48px"
  pick-selected:
    backgroundColor: "{colors.surface-3}"
    textColor: "{colors.text}"
---

# Design System: EFM League

Ambito: questo documento descrive solo la nuova UI costruita sotto `app/newUI/` e interamente confinata nello scope `.efm` di `app/newUI/efm.css` (font caricati in `app/newUI/layout.tsx`). Il resto di `app/` (navbar, pagine, `globals.css`) e `/addMatch` sono la vecchia UI conservata intenzionalmente: non ne eredita le regole e non va migrata verso questo sistema senza una decisione esplicita. Sostituisce integralmente il mondo "Il Provino", rifiutato: nessun motivo di pellicola, carta o matita sopravvive.

## Overview

**Creative North Star: "Il client della lega"**

L'archivio della EFM League si legge come il client di League of Legends, lolesports.com o Mobalytics: shell scura blu-notte, card leggermente più chiare con filetti sottili, classifiche, storico partite e profili costruiti con le convenzioni che i giocatori riconoscono già. È il canone delle dashboard esports eseguito per bene, senza ironia e senza metafore contrabbandate.

Il colore è informazione, non decorazione. Blu e rosso dicono solo squadra e Vittoria/Sconfitta, come nel post-game del client; l'oro hextech dice solo MVP e primo posto; il bianco pieno dice solo "questa è l'azione". Tutto il resto è una scala di neutri blu-notte. L'identità EFM arriva dal display corsivo nero e pesante dei video di presentazione e dalle immagini reali della lega: il fotogramma gessato con le pennellate in testata, i video dei giocatori, i volti ritagliati dai fotogrammi, lo splash del campione più giocato nel profilo.

La densità è quella di un client: righe da 44–48px, cifre tabellari, intestazioni in maiuscolo spaziato. Il movimento è breve e funzionale: card che si sollevano di 3px, video che sfumano al passaggio, il rullo del sorteggio come un'apertura di forziere; tutto si azzera con `prefers-reduced-motion`.

**Key Characteristics:**
- Fondo blu-notte quasi nero, card `surface` con filetto `line` da 1px, raggi piccoli (6px / 10px).
- Blu/rosso solo per squadre e Vittoria/Sconfitta; oro solo per MVP e primo posto; bianco pieno solo per l'azione primaria.
- Display Barlow Condensed corsivo 800–900 maiuscolo; interfaccia in Barlow con cifre tabellari.
- Icone di ruolo neutre (grigie), mai dorate.
- Texture gessata e pennellate solo in testata della home e attorno ai video.
- Il volto del giocatore e i video reali della lega come immagini principali.

## Colors

Una scala di neutri blu-notte che porta tutta la UI, e tre voci cromatiche con un significato ciascuna: squadra/esito, eccellenza, azione.

### Primary
- **Bianco gesso d'azione** (`action`, hover `action-hover`, testo `action-text`): fondo del bottone primario ("Guarda la presentazione", "Conferma", "Gira"), outline di `:focus-visible`. Mai come fondo di superficie o testo decorativo.

### Secondary
- **Blu squadra** (`blue`, testo `blue-text`, velo `blue-tint`): Squadra Blu e Vittoria. Testata della squadra blu, velo della squadra vincente, riga Vittoria nella cronologia, quadratino V della forma, barre di win rate sopra soglia, voci blu del sorteggio. `blue` pieno anche come colore della selezione testo.
- **Rosso squadra** (`red`, testo `red-text`, velo `red-tint`): Squadra Rossa e Sconfitta, con gli stessi usi speculari; barre sotto soglia (win rate sotto il 50%) e riga Sconfitta.

### Tertiary
- **Oro hextech** (`gold`, chiaro `gold-2`, velo `gold-tint`): MVP e primo posto. Etichetta MVP nella card partita e velo della riga MVP, anello attorno all'avatar del leader di classifica, numero di posizione e barra del primo, valore del leader, card "Serie più lunga", dato "Re degli MVP" in testata, stat MVP nel profilo.

### Neutral
- **Notte** (`bg`): fondo della pagina, nav traslucida, intestazioni sticky del mese.
- **Notte velata** (`bg-2`): footer, fondo dei rulli e del verdetto del sorteggio, voci selezionabili a riposo.
- **Superficie** (`surface`), **Superficie alta** (`surface-2`), **Superficie massima** (`surface-3`): card; hover di righe, bottoni secondari e documenti; binari delle barre, placeholder di avatar e campioni, voce selezionata.
- **Filetto** (`line`) e **Filetto marcato** (`line-2`): bordi da 1px delle card e divisori interni; bordo dei bottoni secondari, della ricerca e degli hover.
- **Testo** (`text`), **Testo secondario** (`text-2`), **Testo terziario** (`text-3`): contenuto, link e voci di nav a riposo, etichette e metadati. `text-3` è il valore più spento ammesso per testo leggibile.

### Named Rules
**The Client Convention Rule.** Blu e rosso esistono solo per squadra e per esito (Vittoria/Sconfitta, win rate sopra/sotto il 50%). Mai come accento di brand, link, stato attivo o categoria di dati.

**The Hextech Rule.** L'oro marca solo l'MVP e il primo posto (o il record #1). Se più di un elemento per card è dorato, uno è di troppo.

**The White Action Rule.** L'azione primaria è un pieno `action` con testo `action-text`. Nessun bottone primario blu, rosso o oro.

## Typography

**Display Font:** Barlow Condensed corsivo 700/800/900 (con sans-serif), via `--f-display`
**Body Font:** Barlow 400–700 (con system-ui, sans-serif), via `--f-body`

**Character:** Il grottesco condensato corsivo e nero ripete le scritte dei video di presentazione della lega; Barlow dritto è il sans da lavoro del client, compatto e con cifre tabellari per ogni numero.

### Hierarchy
- **Display hero** (900 corsivo, `clamp(3.4rem, 8.5vw, 6rem)`, 0.86, maiuscolo): solo "EFM League" in testata, su due righe.
- **Display** (900 corsivo, `clamp(2.5rem, 6vw, 4.5rem)`, 0.92, maiuscolo, `text-wrap: balance`): H1 di pagina; il nome nel profilo sale a `clamp(2.2rem, 6vw, 4.5rem)`.
- **Headline** (800 corsivo, `clamp(1.6rem, 3vw, 2.25rem)`, maiuscolo): H2 di sezione e del mese. Varianti 1.4–1.9rem per il valore del leader, la serie e il verdetto del sorteggio.
- **Title** (Barlow 700, 1rem, 0.05em, maiuscolo): titoli delle schede di classifica, delle squadre, delle tabelle.
- **Body** (400, 1rem, 1.5) e **Lede** (`clamp(1rem, 1.3vw, 1.125rem)`, max 60ch, `text-2`, `text-wrap: pretty`).
- **Label** (600, 0.75rem, 0.08em, maiuscolo, `text-3`): termini dei dati, intestazioni di tabella (0.7rem), conteggi accanto ai titoli. Bottoni e nav usano la stessa voce a 0.875rem, 0.06em, peso 600–700.
- **Stat** (700, 1.6rem, 1.1, cifre tabellari): valori delle statistiche del profilo; i fatti in testata a 1.25rem.

### Named Rules
**The Tabular Rule.** Ogni numero di dato (posizioni, valori, contatori, percentuali, punteggi) è in cifre tabellari e allineato a destra nelle colonne.

**The Italic Display Rule.** Il corsivo condensato è solo per titoli e per pochi numeri-eroe (valore del leader, verdetto, serie). Mai per corpo, etichette o navigazione, dove si usa Barlow dritto maiuscolo.

## Layout

Contenitore centrato massimo 1320px con `gutter` elastico. Nav sticky alta 64px; sotto 760px va a capo e le voci scorrono in orizzontale in una fascia di 46px senza scrollbar. Le sezioni respirano con `section` verticale; la prima dopo la testata parte stretta (1.75rem) perché l'ultima partita si affacci nel primo schermo. L'intestazione di sezione allinea il titolo in basso a sinistra e un link "Tutte le …" con freccia a destra.

Le collezioni sono griglie `auto-fill` con gap 1rem: partite a 560px minimi (una partita sola sull'ultima riga occupa tutta la larghezza), classifiche a 330px, giocatori a 170px (due per riga su mobile), documenti a 300px, tabelle a 420px. La card partita divide blu|rosso in due colonne e le impila sotto 560px. La testata della home è una griglia a due colonne (testo | video verticale 9:16) che sotto 900px mette il video sopra; la testata del profilo è ritratto 9:16 | identità, in colonna sotto 700px. Il sorteggio affianca selezione e rulli fino a 960px.

## Elevation & Depth

Profondità per toni: `bg` → `surface` → `surface-2` → `surface-3`, con filetti da 1px. Le ombre sono poche e servono a staccare oggetti-immagine o a rispondere al passaggio.

### Shadow Vocabulary
- **Sollevamento** (`box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4), 0 18px 40px -18px rgba(0, 0, 0, 0.75)`): hover della card giocatore e ritratto del profilo.
- **Schermo video** (`box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5), 0 40px 80px -30px rgba(0, 0, 0, 0.9)`): solo il video verticale della testata.
- **Anello MVP** (`box-shadow: 0 0 0 2px var(--bg), 0 0 0 3.5px var(--gold)`): anello dorato staccato dell'avatar del leader. È un bordo, non elevazione.
- **Partita puntata** (`box-shadow: 0 0 0 1px var(--text-2)`): card partita raggiunta via ancora (`:target`).

### Named Rules
**The Tonal Depth Rule.** Card, righe e pannelli sono piatti a riposo; si distinguono per tono e filetto. L'ombra compare solo su immagini e video in primo piano o come risposta all'hover.

**The Winner Veil Rule.** Il lato vincente e la riga MVP si illuminano con un gradiente dal velo della loro voce (`blue-tint`, `red-tint`, `gold-tint`) al trasparente; il lato perdente desatura i campioni (saturate 0.55, brightness 0.8) e spegne i nomi in `text-2`.

## Shapes

Raggi piccoli e costanti: 4px per badge, quadratini di forma, icone di campione e miniature; 6px per bottoni, campi, voci selezionabili, righe della cronologia, rulli; 10px per card, schede di classifica, video e ritratti. Il cerchio è riservato a volti (avatar, icona evocatore, logo) e bottoni-icona sui video; la pillola solo al badge del rango. I bordi sono filetti da 1px; le barre di misura sono alte 3px su binario `surface-3`. I rulli del sorteggio sfumano ai lati con una maschera lineare e hanno un marcatore centrale `text` con due triangoli.

## Components

### Buttons
Diretti e leggibili, maiuscolo spaziato come i comandi del client.
- **Shape:** raggio 6px, altezza minima 44px (52px per `--big`), icona 18px.
- **Primary:** pieno `action`, testo `action-text`, Barlow 700 0.875rem a 0.06em maiuscolo.
- **Hover / Focus:** `action-hover` e sollevamento di 1px in 0.2s `ease-out`; focus con outline 2px `action` a 2px di offset (globale nello scope).
- **Secondary:** trasparente, filetto `line-2`, testo `text`; hover `surface-2` e filetto `text-3`.
- **Disabled:** opacità 0.4, cursore not-allowed.
- **Icon button:** cerchio 44px su nero traslucido con filetto bianco al 16%, solo sopra i video (audio, pausa).

### Chips / Badge
- **Style:** raggio 4px, label 0.75rem 700 maiuscola, velo della voce e testo `*-text`: `blue`/`red` per "Vince Blu/Rossa", `plain` (`surface-3`/`text-2`) per dati neutri come lo stato del giocatore nel profilo.
- **MVP:** etichetta oro con icona corona a 0.7rem, mai su fondo pieno.

### Cards / Containers
- **Corner Style:** 10px.
- **Background:** `surface`; intestazioni di scheda con gradiente `surface-2` → `surface`.
- **Shadow Strategy:** piatte a riposo (vedi Elevation & Depth).
- **Border:** 1px `line`, divisori interni 1px `line`.
- **Internal Padding:** 1–1.1rem; righe a 0.45rem × 1.1rem.

### Inputs / Fields
- **Style:** ricerca alta 46px, larga fino a 340px, fondo `surface`, filetto `line-2`, raggio 6px, icona lente 18px `text-3`.
- **Focus:** il filetto diventa `text-2` (`focus-within`); l'input non ha outline proprio.

### Navigation
- **Style:** barra sticky `bg` al 90% con blur 14px e filetto inferiore; logo EFM circolare 36px con "EFM League" in display corsivo; voci Barlow 600 0.875rem maiuscole in `text-2`.
- **Hover / Active:** testo `text`; la voce corrente ha una linea da 2px `text` sul bordo inferiore che si estende da 0 in 0.3s.
- **Selettore UI:** segmentato a destra (Vecchia/Nuova) su `surface`, opzione attiva `surface-3`.
- **Mobile:** sotto 760px la riga delle voci va a capo e scorre in orizzontale.

### Match Card (post-game)
La partita come la schermata post-game del client: intestazione con numero a tre cifre, nome, data e badge del vincitore; due colonne blu|rosso con testata di squadra ed esito; per ogni slot icona di ruolo neutra 18px, campione 36px raggio 4px, nome e campione, MVP in oro. Lato vincente velato, lato perdente desaturato.

### Leaderboard
Scheda di classifica: testata con avatar del primo (52px con anello oro), titolo, nota e valore del leader in display corsivo `gold-2`; righe numerate con avatar 28px, nome, barra di misura da 3px proporzionale al valore e valore tabellare. Il primo ha numero e barra in oro; le barre sotto soglia vanno in `red-text` al 70%. "Altri N" in un `details` con chevron che ruota.

### Player Card
Card 3:4 con il volto del giocatore (ritaglio dal fotogramma, `object-position: 50% 44%`), nome e sottotitolo. Se il giocatore ha un video, un tag-play circolare in alto a destra e, al passaggio, il video sfuma sopra la foto in 0.35s; la card si solleva di 3px con l'ombra "Sollevamento". Senza foto: iniziali in display corsivo su gradiente radiale.

### Match History Row
Riga della cronologia del profilo come nel client: esito ("Vittoria"/"Sconfitta" colorato) e data, campione 56px con icona di ruolo neutra in un cerchio, partita, campione, ruolo ed eventuale MVP, i dieci campioni della partita con il proprio contornato in `text`. Il fondo parte dal velo dell'esito e sfuma in `surface` al 45%.

### Profile Header
Lo splash Data Dragon del campione più giocato come fondo (opacità 0.38, centrato al 20%) sotto un gradiente verso `bg`; in assenza di splash, la foto del giocatore sfocata. Ritratto 9:16 con video, nome in display, badge del rango a pillola, icona evocatore, griglia di statistiche a celle separate da 1px e quadratini della forma V/S.

### Sorteggio
Selezione dei giocatori a pulsanti-voce (`pick`, `aria-pressed`) e rulli orizzontali come un'apertura di forziere: elementi da 96px che scorrono sotto un marcatore centrale; il verdetto esce in display corsivo; le formazioni finali in due schede blu|rosso con nomi che entrano da sinistra.

## Do's and Don'ts

### Do:
- **Do** confinare ogni regola sotto `.efm` e nei token di `app/newUI/efm.css`; la vecchia UI fuori da `app/newUI` e `/addMatch` restano come sono.
- **Do** usare blu e rosso solo per squadra ed esito, oro solo per MVP e primo posto, `action` solo per l'azione primaria.
- **Do** rendere le icone di ruolo neutre (`grayscale(1) brightness(1.5)`, opacità 0.7), anche se gli asset originali sono dorati.
- **Do** mostrare i giocatori col loro volto reale e i video della lega; lo splash del campione più giocato in testata al profilo.
- **Do** tenere ogni numero di dato in cifre tabellari e ogni misura proporzionale al valore (larghezza = valore / massimo).
- **Do** azzerare transizioni e animazioni con `prefers-reduced-motion` e montare i video al passaggio solo senza riduzione del movimento.

### Don't:
- **Don't** usare la texture gessata e le pennellate fuori dalla testata della home e dai video.
- **Don't** usare blu o rosso come colore di brand, link o stato attivo, né l'oro per evidenziare qualcosa che non sia MVP o primo posto.
- **Don't** fare bottoni primari colorati: il primario è bianco pieno.
- **Don't** reintrodurre motivi del mondo rifiutato "Il Provino": pellicola, perforazioni, carta fotografica, segni a matita.
- **Don't** usare il display corsivo per corpo, etichette o navigazione.
- **Don't** usare toni più spenti di `text-3` per testo da leggere.
