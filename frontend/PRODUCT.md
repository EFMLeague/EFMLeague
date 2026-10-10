# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Il gruppo di amici che ha giocato la EFM League: circa 25 giocatori italiani di League of Legends che si conoscono personalmente. Aprono il sito per rivedere la propria storia nella lega, confrontarsi con gli altri e prendersi in giro (classifiche come "Trofeo Pepe" per le ammonizioni o "King of Sola" per le assenze). Nessun pubblico esterno da convincere.

## Product Purpose

EFM League è stata una lega privata di partite personalizzate 5v5 di League of Legends tra amici, con classifiche, MVP, punti e ammonizioni. La lega oggi è ferma: il sito è un archivio/ricordo. Successo significa che chi lo apre ritrova facilmente le proprie partite, i numeri e i momenti della lega, e ha voglia di girarci dentro.

## Positioning

È l'archivio di *quella* lega e di *quelle* persone: nomi reali dei giocatori, le loro statistiche, i loro campioni, le loro presentazioni video, le classifiche goliardiche interne. Nessun altro sito di stats LoL può avere questo contenuto.

## Operating Context

- Dati su Supabase (ripristinato a ott 2026 dal backup del 06-02-2025): tabelle `user`, `league_match`, `has_played_league_match`, vista `hasplayed_match_merged`. I dati non crescono più in modo significativo.
- Partite 5v5 blue vs red, ruoli top/jng/mid/adc/sup, per ogni partecipazione: campione, vittoria, MVP, punteggio.
- Account segnaposto `FORESTIERO` per giocatori esterni, escluso da classifiche ed elenchi.
- Elo SoloQ/Flex e icona profilo letti live dalle API Riot (possono mancare o fallire).
- Immagini campioni da Data Dragon di Riot.

## Capabilities and Constraints

- Next.js 13 (app router), Tailwind, Supabase lato server.
- Il redesign vive interamente sotto `app/newUI/...`. Le rotte esistenti restano intatte come ricordo della vecchia UI. `/addMatch` non va toccato.
- Dati: riusare `app/utils/supabase/fetchAll.ts` e `app/ranking/computeRankings.ts`.
- Superfici: home, classifiche, storico partite (e dettaglio partita), elenco giocatori, profilo giocatore, ruota della fortuna (estrazione casuale tra giocatori).
- Login Riot esistente (`/login`, `/api/auth/riot/*`) usato soprattutto per inserire partite.

## Brand Commitments

- Nome: EFM League. Logo in `public/img/logo/Logocentrato.png`, `public/logo/logo.svg`.
- Lingua: italiano. I termini di gioco (MVP, win rate, SoloQ, Flex, ruoli) restano come li usano i giocatori.
- Tono: tra amici, goliardico; i nomi delle classifiche interne ("Trofeo Pepe", "King of Sola") fanno parte della lega.
- Ruoli dei giocatori: "Padre fondatore", "Esperto partecipante", "Nuova recluta".
- Direzione visiva scelta (ott 2026): la convenzione delle dashboard esports/LoL, eseguita bene, non un mondo metaforico. Riferimenti di qualità: client di League of Legends, lolesports.com, Mobalytics/Blitz.gg. Niente concetti forzati (la metafora della pellicola è stata rifiutata).
- Firma del brand EFM dai video di presentazione: nero gessato, pennellate e schizzi blu/rossi, logo bianco. Blu e rosso sono i colori di squadra; la texture vive in testata e attorno ai video.

## Evidence on Hand

- Statistiche reali di partite e giocatori su Supabase.
- Video di presentazione giocatori: `public/video/Presentazione*.mp4` (16 file, più `IntroPresentazione.mp4`) e fotogrammi `public/img/screenshots/frame_*.jpg` (25 giocatori).
- PDF: `public/pdf/regolamento.pdf`, `public/pdf/organigramma.pdf`.
- Icone elo (`public/img/elo`), ruoli (`public/img/roles`), medaglie, icone coppa/cartellino/corona, banner `public/img/banner.jpg`.
- Font locale Decalotype in `app/utils/font`.
- Testi home attuali (chi siamo / missione) in inglese.
- Assenti: date di inizio/fine stagioni, albo d'oro ufficiale, foto reali dei giocatori. Non inventarli.

## Product Principles

1. Le persone prima dei numeri: ogni statistica rimanda a un giocatore e al suo profilo.
2. Archivio vivo, non dashboard morta: deve far venire voglia di esplorare e ricordare.
3. Il goliardico è contenuto: le classifiche ironiche hanno la stessa dignità di quelle serie.
4. Robustezza sui dati esterni: Riot e Data Dragon possono mancare, la pagina regge comunque.
