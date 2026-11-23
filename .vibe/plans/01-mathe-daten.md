---
# Read by the hooks, the review, the evals. Schema: @lernapps/tooling/guidance/plan-front-matter.v1.schema.json
# Written by `lernapps plan` and the hooks. Never change a key or a value by hand.
# Archetype, null until chosen in Explore. Allowed values: explainer, interactive, quiz.
archetype: explainer
# Current phase. Allowed values: explore, plan, code, commit.
phase: code
# prePushFailures: failed pre-push runs, written by the hook.
prePushFailures: 0
# failedChecks: failed rules and runs, written by lernapps check and the hooks.
failedChecks: { checks-pass: 1 }
---

# Plan: mathe-daten, first version

<!--
For you, the assistant. The process is in AGENTS.md; this plan holds the method.
- `npx --no -- lernapps plan next` prints the task to do now, `plan done` ticks it and prints the next one.
- You write only below Goal, Key decisions, Notes, Answers, Entry draft, Content method and Retrospective, in the
  creator's language. Delete the comment of a section once the section is filled.
- Work on the branch `work`, locally: push nothing before Commit.
-->

*Started 2026-11-23. Explore, Plan, Code, Commit.*

## Goal

<!-- 1–2 sentences: what learners do, what they learn. -->

Lernende erheben Daten einer eigenen Klassenumfrage, stellen sie dar, beschreiben sie mit Kennwerten und prüfen Diagramme und Stichproben kritisch. Ein Datensatz wächst über drei Kapitel mit (5-6, 7-8, 9-10). Auftrag: Issue lernapps/apps#400, Strang `mathematik/stochastik`.

## Key decisions

<!-- One line each: decision and reason. Archetype first. Your own choice without the creator: mark "(guess)". -->

- Archetype `explainer`: Lernende brauchen Erklärung, Darstellung und Herleitung vor den Aufgaben; kein Spiel, keine Echtzeit (`quiz` zu knapp, `interactive` passt nicht).
- Strang `mathematik/stochastik`, Format 2, drei Kapitel wie im Issue (Stufen 5-6, 7-8, 9-10).
- Die Umfrage der Klasse ist der rote Faden (Geschichte): erfundene Klasse, ein Datensatz, der mitwächst.
- `scope`: ja, in `src/app.yaml` (`text`, `out`) und auf jeder Seite, weil Kap. 3 `open-task` „Mein Urteil“ hat (Tutor beurteilt offene Antworten nur nach dem Scope).
- Antworten zu „Answers“ stammen aus dem Issue #400 und den Regeln, nicht aus einem Gespräch (guess, wo nicht im Issue).

## Notes

<!-- Strand or subject, competencies by chapter (ids), didactic approach, scope, sources and licences, open questions. -->

**Strang:** `mathematik/stochastik`. Karte gelesen (lernapps.net/apps/map/mathematik.json), alle 8 Bausteine sind Lücken (`practisedBy` leer).

**Bausteine nach Abhängigkeit (Schritt in der Karte):**

| Kap. | Baustein (id) | requires | Stufe/Schritt | öffnet |
|---|---|---|---|---|
| 1 | Daten darstellen (`daten-darstellen`) | `zahlen-vergleichen-ordnen` (außen) | 5-6 / 3 | 6 |
| 1 | Absolute und relative Häufigkeit (`haeufigkeiten`) | `brueche-begriff` (außen) | 5-6 / 3 | 15 |
| 1 | Umfragen durchführen (`umfragen-erhebungen`) | `daten-darstellen` | 5-6 / 4 | 1 |
| 1 | Diagramme kritisch lesen (`daten-kritisch-lesen`) | `daten-darstellen` | 5-6 / 4 | 0 |
| 1 | Arithmetisches Mittel (`mittelwert`) | `daten-darstellen`, `dezimalbrueche-rechnen` (außen) | 5-6 / 5 | 2 |
| 2 | Median, Spannweite und Quartile (`kenngroessen-lage-streumasse`) | `mittelwert` | 7-8 / 1 | 1 |
| 2 | Boxplot (`boxplot`) | `kenngroessen-lage-streumasse` | 7-8 / 2 | 0 |
| 3 | Stichproben und Erhebungen (`stichproben-erhebungen-planen`) | `umfragen-erhebungen`, `haeufigkeiten` | 9-10 / 1 | 0 |

**Reihenfolge Kapitel 1 (Vorschlag):** Umfrage planen kommt nach Darstellen laut Karte; didaktisch beginnt die Klasse mit der Frage und der Strichliste. Seitenfolge: Daten darstellen (Tabelle, Strichliste, Säule) → Häufigkeiten (absolut, relativ als Bruch, Kreisdiagramm) → Umfragen durchführen (Fragen formulieren, Liste erfassen) → Mittelwert → Diagramme kritisch lesen. `ahead` nur falls nötig; `lernapps check` meldet unnötige.

**Sammel-Wiederholung (recap, Regeln §7), Kapitel 1:** `zahlen-vergleichen-ordnen` (#385, Schicht 1), `brueche-begriff` (#389), `dezimalbrueche-rechnen` (#389). Kapitel 2 und 3 brauchen nichts von außerhalb des Explainers (nur eigene Bausteine; Dezimalrechnen und Brüche stehen schon im Recap von Kap. 1). Je Voraussetzung ein Abschnitt mit erklärten Begriffen, Selbsttest und Kartenlink, keine Links in andere Apps.

**Didaktik (aus Issue):** Kap. 1 Klassenumfrage, Strichliste, Säulen-/Kreisdiagramm, relative Häufigkeit als Bruch, Mittelwert als „gerecht verteilen“ (Würfeltürme einebnen), irreführende Diagramme selbst zeichnen und „reparieren“. Kap. 2 Perlenkette der geordneten Daten, geteilt in Viertel, daraus Boxplot, zwei Klassen im Vergleich. Kap. 3 Spricht die Klasse für die ganze Schule? Simulierte zu kleine/einseitige Stichproben gegen die Gesamtheit, Erhebung neu planen, jede Seite endet mit eigenem Urteil.

**Abgrenzung:** Nur beschreibende Statistik. Relative Häufigkeit als Schätzwert für Wahrscheinlichkeit gehört zu #401 (baut auf `haeufigkeiten` hier auf): hier nur bestimmen und deuten, nicht Wahrscheinlichkeit schätzen.

**Darstellungen:** Säulendiagramm, Kreisdiagramm, Boxplot, Perlenkette als eigene SVG/`figure`; Zahlenstrahl ab 0 (nur nicht-negative Zahlen, Regeln §2), keine negativen Werte nötig. Wo Blöcke nicht reichen (Würfeltürme einebnen, Boxplot aus Perlenkette, Stichprobensimulation): Vue-Komponente mit statischer Form und Text ohne JavaScript, Aufgaben daneben als `generated`/Fragen.

**Übungsmuster pro Kompetenz (Vorschlag, im Plan festzulegen):** Darstellen: Tabelle ↔ Diagramm ablesen/zuordnen; Häufigkeit: `generated` mit Fehlerdiagnose (absolut/relativ verwechselt, Bruch nicht gekürzt); Umfrage: Fragen beurteilen (Auswahl mit Begründung), Liste auswerten; Mittelwert: `generated`, Fehler „Summe nicht geteilt“, „durch falsche Anzahl geteilt“; kritisch lesen: Diagramm gegeben, Täuschung benennen (single-choice, Begründung im Feedback); Median/Quartile: `generated` für gerade/ungerade Anzahl, Fehler „nicht geordnet“; Boxplot: aus Daten ablesen, Aussagen wahr/falsch; Stichprobe: beurteilen, entscheiden, begründen (Urteil).

**Je Kompetenz: Herleiten und Fehlerbild:** Mittelwert – Türme einebnen, dann Summe : Anzahl; Fehler: Mittelwert mit Median verwechselt, Anzahl falsch. Median – Perlenkette ordnen, Mitte suchen; Fehler: ungeordnet, bei gerader Anzahl nur einen Wert. Quartile – Kette in Hälften teilen, Hälften nochmal; Fehler: Median in beide Hälften einbezogen (bei ungerader Anzahl, Konvention in der App festlegen und nennen). Boxplot – Fünf-Werte-Zusammenfassung → Box; Fehler: Länge der Box als Anzahl gedeutet. Häufigkeit – Strichliste zählen, durch Gesamtzahl teilen; Fehler: absolut/relativ verwechselt, Prozentpunkte. Diagramme – Achse abgeschnitten, Piktogramm verzerrt; Fehler: Höhe statt Fläche. Stichprobe – Simulation klein vs. groß, einseitig; Fehler: „große Stichprobe ist immer repräsentativ“.

**Scope:** Datenbereiche kleine Datensätze (bis ca. 30 Werte, Klassenumfrage), Zufallswerte mit festem Seed. Kein Statistik-Tool, keine Standardabweichung, keine Hypothesentests (nicht in den Bausteinen). Sprache: Deutsch (guess; Issue nennt nur Deutsch). Hessen-Schreibweisen (Regeln §2): Komma, `·`, `:`, Bruch gesetzt, Prozent mit geschütztem Leerzeichen.

**Quellen:** Lernlandkarte Mathematik (geöffnet), KMK-Bildungsstandards ESA/MSA 2022 (Quelle der Karte; Seitenangabe zu Stichproben „S. 21“ aus dem Issue, nicht selbst geprüft → offen). Hessisches Kerncurriculum: nicht geprüft (nicht nötig: App mit Strang, die Karte gibt die Reihenfolge). Eigene Aufgaben und Herleitungen; keine Schulbuch- oder Arbeitsblattquellen. Keine Dritt-Inhalte.

**Baustein → Seite (Vorschlag, im Plan bestätigen):**

- Kap. 1 „Unsere Umfrage“ (5-6): Recap „Das brauchst du hier“ (`zahlen-vergleichen-ordnen`, `brueche-begriff`, `dezimalbrueche-rechnen`) · Seite Daten darstellen (`daten-darstellen`) · Seite Häufigkeiten (`haeufigkeiten`) · Seite Umfrage durchführen (`umfragen-erhebungen`) · Seite Mittelwert (`mittelwert`) · Seite Diagramme kritisch lesen (`daten-kritisch-lesen`). Reihenfolge nach Karte; Umfrage vor Häufigkeiten wäre didaktisch möglich, braucht dann `ahead` nur falls `requires` verletzt (nein: `umfragen-erhebungen` verlangt `daten-darstellen`, nicht `haeufigkeiten`).
- Kap. 2 „Median, Quartile und Boxplot“ (7-8): Seite Median, Spannweite, Quartile · Seite Boxplot. Kein Recap nötig (`mittelwert` ist Seite von Kap. 1).
- Kap. 3 „Spricht die Stichprobe für alle?“ (9-10): Seite Stichproben und Erhebungen (eine Seite oder zwei: „zu klein / einseitig“ und „Erhebung planen“; Regel: eine Kompetenz, mehrere Seiten erlaubt).
- Von außen nicht geübt: `zahlen-vergleichen-ordnen` (Seite Daten darstellen), `brueche-begriff` (Häufigkeiten: relative Häufigkeit als Bruch), `dezimalbrueche-rechnen` (Mittelwert).

**Änderung Recap (Orchestrator, nach dem Plan-Bericht):** Der Recap bleibt eine Seite mit `recap:`; der Selbsttest ist die Komponente `Kurztest` darin, keine eigene Seite `vorwissen-test`. Die Plan-Aufgabe zum Recap nennt noch den Kurztest als Seite: sie gilt in dieser Fassung (Aufgabentext darf nur `lernapps plan` ändern).

**Code-Stand Daten:** `src/data/verkehrsmittel.yaml` (Seiten 1 und 2), `src/data/werte.yaml` (Vorrat 3 bis 60 Minuten für die Aufgaben zu Median und Quartilen). `klassen.yaml` entfällt: die Werte der 8b und 8c stehen in der Seite und im Test `Perlenkette.test.ts` (Rechenprobe: 8b Median 12, Q1 7, Q3 18, Spannweite 31; 8c Median 12,5, Q1 9,5, Q3 15,5, Spannweite 13). `schule.yaml` (600 Lernende) entsteht mit der Komponente `StichprobeZiehen` (Aufgabe Seite 8), die Rechenprobe der Anteile steht dort im Test. Chromium: `lernapps screenshots` und eigenes Playwright finden Version 1243, nicht 1254; mein Skript setzt `executablePath` auf `/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell`. Typfehler in `.vue` zeigt nur `npx vue-tsc --noEmit` (der Hook meldet sie erst beim Commit).

**Offen / geraten:** Quartilsverfahren (Median in die Hälften einbeziehen oder nicht) – Wahl: Hessen-übliches Verfahren, in der App erklärt (guess, vom fachlichen Prüfer zu bestätigen). Namen der Klasse und der Figuren erfinden wir (Klasse 6a/8b/10c, gemischte Namen).

## Explore

<!--
- Find out what the app teaches, for whom, how much and how it looks. Ask; write no code, run no `create`.
- An answer counts only in the creator's words under "Answers". At most 2 questions per message, one topic each.
-->

### Tasks

- [x] Check the start: the folder `.agents/skills/lernapps-app` exists (else stop and tell the creator that the folder
      was not started with `init`), and `git branch --show-current` prints `work` (else `git switch -c work`).
- [x] Load skill `lernapps-app`. Tell the creator in two sentences what a lernapps app is and where it will live: at
      their own address, free and public, and once listed as a copy on lernapps.net. Say that the technical part
      (GitHub) comes at the end and that you do it.
- [x] Interview: ask the topics "Goal" and "Learners" of "Answers".
- [x] Load skill `lernapps-map-assignment` and read the learning map of the subject as it says. The creator brings
      the content themselves (material, a word list, the pages): note under "Notes" which competencies of the map it
      covers. Else write the skill's assignment, with its story; the creator's yes answers the topics Content and
      Amount. A subject without a map: skip this task and say so.
- [x] Load skill `lernapps-exercise-patterns` and read its reference for the subject. Note under "Notes" how learners
      will practise what the goal names.
- [x] Choose the archetype as skill `lernapps-app` says: read the README of each archetype in question, then tell the
      creator in plain words what the chosen one can and cannot do. Write the archetype and its reason under "Key
      decisions".
- [x] Run `npx --no -- lernapps skills --archetype <name>` with the chosen archetype. It installs the archetype's
      skills and adds the archetype's tasks to this plan.
- [x] Load skill `lernapps-explainer-design`. An explainer has the look of the runtime: write "fixed by the
      archetype" under the topic "Look and feel" of "Answers".
- [x] Interview: ask every other topic of "Answers", in order. Leave out only a topic that an answer of the creator
      already covers, and note which answer. A topic nobody answered is asked once before you write an assumption
      with "(guess)".
- [x] Load skill `lernapps-content-research` and research as it says. Write under "Notes": the strand or subject, the
      competencies by chapter with their ids, the sources you opened.
- [x] Write under "Notes" which competency goes on which page and which pages form a chapter, as "Map the content" of
      skill `lernapps-explainer-design` says. Per page, name the prerequisites the app does not practise.
- [x] Write under "Notes", one line per competency: how learners get there (they derive it, they do not only read it
      off), and which misconception the feedback catches.
- [x] Write under "Notes" the scope: what is in, what is out and why, the data range (for example "all main-group
      elements", never a silent "1–20"), the languages.
- [x] **Checkpoint:** research. Show in plain words: the strand or why none, the competencies by chapter, the didactic
      approach, the scope, every "(guess)", the sources and what is unchecked, the archetype and its reason. Stop and
      wait. Changes: change them, then ask again.
      Creator: Recherche freigegeben. Kap. 1 Reihenfolge nach Karte prüfen; Recap als Seite mit Begriffen, Beispielen, Kopf, Checkliste plus eigene Kurztest-Seite; Quartile: erklärtes Verfahren, vom fachlichen Prüfer bestätigt, überall gleich; Musterseite 'Unsere Umfrage' mit Lernenden-Prüfer Klasse 5; Plan auf work pushen.

### Answers

<!-- The interview: per topic the creator's answer, in their words. Keep the topics. -->

Quelle der Antworten: Issue lernapps/apps#400 (Auftrag fertig entworfen) und `regeln.md`; der Orchestrator antwortet am Checkpoint „Recherche“ für den Menschen.

- Goal: „Ich verstehe, wie man aus Daten Aussagen gewinnt, und kann Daten erheben, darstellen, mit Kennwerten beschreiben und Darstellungen und Stichproben kritisch prüfen.“ (Issue #400, Leitidee)
- Learners: Stufen 5-6, 7-8, 9-10 in drei Kapiteln; Vorwissen je Kapitel über den Recap (Zahlen ordnen, Bruchbegriff, Dezimalrechnen). (Issue)
- Model and focus: Beispiel-App `franzoesisch` des Templates; Schwerpunkt Darstellungen und Herleitung (Strichliste, Diagramme, Perlenkette, Boxplot), Übungen mit inhaltlicher Rückmeldung. (guess)
- Hurdles: Mittelwert „gerecht verteilen“; irreführende Diagramme aus Zeitung und Werbung „reparieren“; zu kleine und einseitige Stichproben. (Issue, Didaktik)
- Content: ich schreibe sie aus Karte und eigenen Herleitungen; kein eigenes Material des Menschen. (Regeln §4)
- Amount: alle 8 Bausteine, mindestens drei Aufgaben je Baustein (Regeln §3); später nichts geplant. (Issue, Regeln)
- Languages: nur Deutsch. (guess; Issue und Regeln nennen nur Deutsch)
- Look and feel: fixed by the archetype (ruhig wie ein Arbeitsblatt, Dunkelmodus folgt dem Gerät); Schreibweisen nach Regeln §2.
- Terms: Wörter der Karte (Namen der Bausteine); „Zahlenstrahl“ nur ab 0 (Regeln §2). (Regeln)
- Finding the app: Statistik, Daten auswerten, Diagramme, Mittelwert, Median, Boxplot, Stichprobe, Umfrage. (guess)

## Plan

<!--
- Map the confirmed content onto the archetype. No new content questions: a gap in the content goes back to Explore.
- The creator confirms the plan in one read. After the yes you work on your own.
-->

### Tasks

- [x] Map the content as "Map the content" of skill `lernapps-explainer-design` says, and write the result under
      "Content method".
- [x] Choose a pattern per competency as skill `lernapps-exercise-patterns` says, and add it to "Content method".
- [x] Add to "Content method" one line per page, as "Engagement" of skill `lernapps-explainer-design` says: the
      opening task, the change of activity, the reward, the story.
- [x] Add the tasks of Code, each one a piece of work that ends in a commit. First the pattern: one complete page or
      screen, `npx --no -- lernapps plan add --at pattern "<task>"`. Then the others, one call each:
      `npx --no -- lernapps plan add --at pages "<task>"`. Each task says what it builds and what it shows.
- [x] Draw a sketch of each screen, component or interactive exercise: a static SVG or image, or the steps with what
      learners see after each. Keep the files in `.vibe/sketches/`.
- [x] Show the creator, short: goal, competencies by chapter, the Code tasks, the sketches, and the content method in
      plain words (what learners see and do, what the app cannot do). At most 2 questions.
- [x] **Checkpoint:** confirm the plan and the content method. Stop and wait for an explicit yes. Changes: change
      them, then ask again.
      Creator: Plan bestätigt, weiter mit Code: Musterseite Daten darstellen mit SaeulenZeichnen, vorher unabhängiger Lernenden-Prüfer Klasse 5; open-task Mein Urteil mit scope, wo eindeutig zusätzlich single-choice; Komponenten ok mit Tastatur, Textalternative, statischer Form.

### Content method

<!-- One line each: the patterns and where; the figures and how they are made; the data files; each component, what it
checks and what it cannot; how a later agent adds a chapter. It becomes the content guide in Code. -->
<!-- An explainer: per figure, model and component its learning action in two to four sentences
(`explainer-representation-explained`); per page its prerequisites the app does not practise, and which get a recap
page, which a link. -->

**Geschichte:** Eine erfundene Klasse fragt „Wie kommen wir zur Schule?“ (Schulweg). Kap. 1: Klasse 6a, 24 Kinder, gezeichnete Kinder (Mira, Jonas, Ayşe, Tom, Lena, Paul), eine Szene je Seite, Aussehen einmal im Content-Guide festgelegt (Vorlage `story-characters.svg`). Kap. 2 (7-8): die Klassen 8b und 8c als Chat-Nachrichten, derselbe Schulweg als Zahl in Minuten. Kap. 3 (9-10): ein realistischer Fall ohne erfundene Kinder: Schule mit 600 Lernenden, die Schülervertretung will eine Aussage über alle. Der Datensatz wächst: gleiche Frage, andere Zahlenart, andere Gruppen.

**Reihenfolge (Karte hat Vorrang vor dem Vorschlag des Orchestrators):** Die Karte verlangt `daten-darstellen` vor `umfragen-erhebungen`. Kap. 1 daher: Recap → Daten darstellen → Häufigkeiten → Umfrage durchführen → Mittelwert → Diagramme kritisch lesen. Seite 1 beginnt mit der Umfrage der 6a (Frage steht, Strichliste wird gezählt, dann dargestellt); „Umfrage durchführen“ (Fragen formulieren, Antworten erfassen) folgt als Seite für eine zweite Umfrage der Klasse. Kein `ahead` nötig.

**Seiten und Bausteine (eine Kompetenz je Seite):**

| Nr | Seite (id) | Kompetenz | Von außen, nicht geübt |
|---|---|---|---|
| 0 | `umfrage/vorwissen` Recap „Das brauchst du hier“ (`recap:`; Begriffe, Beispiele, Kopf, Checkliste, Selbsttest je Baustein als Komponente `Kurztest` in der Seite; Änderung des Orchestrators: kein eigener Kurztest-Seite, Rückfall nur wenn es nicht geht) | `recap:` mathematik/zahlen-vergleichen-ordnen, brueche-begriff, dezimalbrueche-rechnen | alle drei |
| 1 | `umfrage/daten-darstellen` Unsere Umfrage: Daten darstellen | `daten-darstellen` | Zahlen ordnen (Recap) |
| 2 | `umfrage/haeufigkeiten` Wie oft kommt was vor? | `haeufigkeiten` | Bruchbegriff (Recap) |
| 3 | `umfrage/umfrage-durchfuehren` Eine eigene Umfrage durchführen | `umfragen-erhebungen` | – |
| 4 | `umfrage/mittelwert` Der Mittelwert: gerecht verteilen | `mittelwert` | Dezimalrechnen (Recap) |
| 5 | `umfrage/diagramme-kritisch-lesen` Wie Diagramme täuschen | `daten-kritisch-lesen` | – |
| 6 | `kennwerte/median-quartile` Median, Spannweite und Quartile | `kenngroessen-lage-streumasse` | – |
| 7 | `kennwerte/boxplot` Zwei Klassen im Boxplot-Vergleich | `boxplot` | – |
| 8 | `stichprobe/klein-oder-einseitig` Spricht die Klasse für die ganze Schule? | `stichproben-erhebungen-planen` | – |
| 9 | `stichprobe/erhebung-planen` Eine Erhebung neu planen | `stichproben-erhebungen-planen` | – |

Kapitel-Ids: `umfrage` (Unsere Umfrage), `kennwerte` (Median, Quartile und Boxplot), `stichprobe` (Spricht die Stichprobe für alle?). Recap nur in Kap. 1 (Kap. 2 und 3 brauchen nichts von außen). Alle Seiten haben `scope` (wegen `open-task` „Mein Urteil“ auf den Seiten 8 und 9; `scope` gilt dann für alle). Nur Deutsch (`languages: [de]`).

**Abschnitt-Ids (gleich auf allen Seiten):** `einstieg` (Ziel, Szene, erste leichte Aufgabe), `erklaerung`, `beispiel`, `merke`, `uebung`; Kap. 3 zusätzlich `urteil`. Titel sagen, was der Abschnitt tut.

**Muster je Kompetenz:**

- Daten darstellen: Strichliste → Tabelle (`table`) → Säulendiagramm. Muster „Tabelle ↔ Diagramm“: Säulen aus einer Tabelle setzen (Exercise-Komponente `SaeulenZeichnen`), aus einem Diagramm (`image`) ablesen (`number`, `single-choice`), die Darstellung begründen (`single-choice`: Säulen oder Kreis für diese Frage). Fehler: Höhe ≠ Anzahl, Säule ohne Beschriftung.
- Häufigkeiten: Strichliste zählen = absolute Häufigkeit; relative Häufigkeit als Bruch Anzahl über Gesamtzahl (`formula`), dann als Kreisdiagramm (`image`). `generated` mit Zählungen aus `src/data/umfragen.yaml`; Fehler: durch die falsche Zahl geteilt, absolut und relativ verwechselt. Bruch gekürzt oder nicht: der Wert zählt.
- Umfrage durchführen: Fragen beurteilen und verbessern (`single-choice`/`multiple-choice`, Begründung je Option), Antwortmöglichkeiten festlegen, Rohantworten in die Strichliste übertragen (`generated`: Antworten zählen). Fehler: Doppelzählung, Antwort vergessen.
- Mittelwert: Würfeltürme einebnen (`WuerfelTuerme`, Nicht-Exercise-Komponente, Würfel verschieben), danach Summe : Anzahl (`formula`); `generated` (4 bis 8 Werte, Ergebnis `decimal` mit 1 Stelle), Deutung „der Mittelwert muss kein Wert der Liste sein“ (`true-false`). Fehler: durch die falsche Anzahl geteilt, nur addiert.
- Diagramme kritisch lesen: je Täuschung ein eigenes SVG (abgeschnittene Achse, verzerrtes Bild, andere Skalenteilung); Täuschung benennen (`single-choice`, Begründung im `info`), Problem ↔ Reparatur (`matching`), Schritte zum Reparieren (`ordering`); `AchseSchieber` (Nicht-Exercise-Komponente: Nullpunkt der Achse an/aus, dieselben Daten, zwei Wirkungen). Fehler: Höhe statt Fläche gelesen.
- Median, Spannweite, Quartile: Perlenkette (`Perlenkette`, Nicht-Exercise-Komponente: Werte der Größe nach ordnen, halbieren, Mitte markieren; nojs: Beispiel mit 11 Werten ausgerechnet). **Verfahren, überall gleich (guess, fachlicher Prüfer bestätigt):** Daten ordnen; Median = mittlerer Wert, bei gerader Anzahl Mittel der beiden mittleren; Q1 = Median der unteren Hälfte, Q3 = Median der oberen Hälfte; bei ungerader Anzahl gehört der Median **nicht** zu den Hälften; Spannweite = größter minus kleinster Wert. `generated` (7 bis 12 Werte, `sortBy`); Fehler: nicht geordnet, bei gerader Anzahl nur ein mittlerer Wert, Median in beide Hälften gerechnet, Mittelwert statt Median.
- Boxplot: Fünf-Werte-Zusammenfassung → Boxplot (`image` je Klasse) und Aussagen über zwei Klassen (`true-false`/`single-choice`, Begründung); Boxplot aus Daten zeichnen: `generated`, das die fünf Werte verlangt (Komponente `BoxplotZeichnen` nur, wenn Zeit bleibt, sonst nicht). Fehler: Boxlänge als Anzahl gedeutet, „50 % der Daten liegen in der Box“ falsch erklärt.
- Stichproben: `StichprobeZiehen` (Nicht-Exercise-Komponente: Gesamtheit aus `src/data/schule.yaml`, Stichprobengröße 5/30/100 oder „nur die Klasse 6a“ wählen, Anteil gegen die Gesamtheit, wiederholbar); Urteil als `open-task` (Punkte: Größe, Auswahl, Aussage begrenzen) mit Musterlösung; `matching`/`single-choice` Stichprobe oder Erhebungsplan beurteilen. Fehler: „große Stichprobe ist automatisch repräsentativ“, „zufällig = beliebig“.

**Figuren:** Alle Diagramme (Säulen, Kreis, Boxplot, Täuschungsbeispiele) sind eigene SVG in `src/images/`, `source: eigene Zeichnung`, `licence: CC-BY-4.0`, aus den Zahlen der Datendateien gezeichnet (kleines Skript außerhalb des Repos, die SVG werden eingecheckt), mit `alt` und Bildunterschrift; Farben, Achsen, Beschriftung einheitlich (Content-Guide „Figures“). Der Block `figure` mit `bar` taugt nicht (nur ein Streifen), `hundred-grid` ebenso. Zahlenstrahl (nur ab 0) nur im Recap.

**Datendateien:** `src/data/umfragen.yaml` (Antworten der 6a: Verkehrsmittel und Schulweg in Minuten, 24 Kinder), `src/data/klassen.yaml` (8b und 8c: Minuten, je 11 bis 13 Werte), `src/data/schule.yaml` (Gesamtheit 600 Lernende). Jede Tatsache einmal.

**Komponenten (Begründung, `prefer-built-in-block`):** kein Block kann Würfel verschieben, Werte in einer Kette ordnen, Säulen setzen oder eine Stichprobe ziehen. Je Komponente `.vue`, `.ts`, `.test.ts` und `nojs`-Text. Exercise nur `SaeulenZeichnen` (Seite 1) und eventuell `BoxplotZeichnen`. Nicht-Exercise: `WuerfelTuerme` (Mittelwert, Seite 4), `AchseSchieber` (Seite 5), `Perlenkette` (Seite 6), `StichprobeZiehen` (Seite 8).

**Engagement je Seite:**

- Recap (0): Kopf „Das brauchst du für dieses Kapitel“, je Baustein ein Abschnitt mit fetten Begriffen und Zahlenbeispiel, Selbsttest als Komponente `Kurztest` (Vorlage `/tmp/epic/docs/mathe-epic/components/` (Kurztest.ts, .vue, .test.ts): kopieren und anpassen), Schluss als Checkliste. Keine Geschichte außer einem Satz zur 6a.
- 1 Daten darstellen: Öffnung: die 6a hat 24 Zettel („Bus“, „Rad“ …), die Kinder zählen eine Spalte der Strichliste nach. Wechsel: Zettel → Strichliste → Tabelle → Säulen (setzen, ablesen). Belohnung: ihr Säulendiagramm der 6a. Ende: „Wie oft kam jedes Verkehrsmittel vor?“.
- 2 Häufigkeiten: Öffnung: „Wie viele von 24 gehen zu Fuß?“. Wechsel: zählen → Bruch → Kreisdiagramm. Belohnung: Tabelle mit absolut und relativ, fertig. Ende: „Und wie lange sind die Kinder unterwegs?“.
- 3 Umfrage durchführen: Öffnung: zwei Fragen, welche ist besser? Wechsel: beurteilen → verbessern → Antworten übertragen. Belohnung: eine eigene Frage mit Antwortmöglichkeiten. Ende: die neuen Zahlen der Klasse (Schulwegzeit).
- 4 Mittelwert: Öffnung: fünf Würfeltürme, gleich hoch machen. Wechsel: verschieben → Summe : Anzahl → Aufgaben. Belohnung: „So lang ist der Schulweg im Durchschnitt“. Ende: ein Diagramm, das etwas anderes behauptet.
- 5 Diagramme kritisch lesen: Öffnung: zwei Diagramme zu denselben Daten, welches sieht dramatischer aus? Wechsel: Regler → benennen → reparieren. Belohnung: Rückblick Kap. 1 (Checkliste „Ich kann …“). Ende: Kap. 2, die 8b und 8c.
- 6 Median/Quartile: Öffnung: ein Ausreißer (35 Minuten) in der Kette, was macht der Mittelwert? Wechsel: ordnen → halbieren → rechnen. Belohnung: Fünf-Werte-Zusammenfassung der 8b. Ende: „Wie sieht das als Bild aus?“.
- 7 Boxplot: Öffnung: Boxplot der 8b lesen. Wechsel: aus Zahlen bauen → zwei Klassen vergleichen → Aussagen prüfen. Belohnung: Rückblick Kap. 2, ein Urteil über den Vergleich. Ende: Kap. 3, die ganze Schule.
- 8 Klein oder einseitig: Öffnung: „Die 6a sagt: 70 % fahren Rad. Stimmt das für alle?“. Wechsel: Stichprobe ziehen → vergleichen → beurteilen. Belohnung: Mein Urteil (`open-task`). Ende: „Wie müsste man es besser machen?“.
- 9 Erhebung planen: Öffnung: ein schlechter Erhebungsplan, was ist falsch? Wechsel: Fehler finden → neu planen → Plan prüfen. Belohnung: eigener Plan, Mein Urteil, Rückblick Kap. 3. Ende: letzte Seite, Hinweis auf die Karte.

**Aufgaben:** mindestens vier je Seite (`explainer-interaction`), mindestens drei je Baustein, steigend: erkennen/ablesen → anwenden mit anderen Zahlen → neue Situation (umgekehrte Frage, Begründung). Rückmeldung inhaltlich mit Fehlertyp (Regeln §3.2); Werte werden geprüft: `0,5`, `0.5`, `1/2` gelten, wo erlaubt; Rundung steht in der Aufgabe. Brüche in Text gesetzt; in `mistakes` und Rückmeldungen von Komponenten ist `a/b` erlaubt (Regeln §2, Fund W28), jede solche Stelle wird im Plan gezählt: bisher 0.

**Wie ein späterer Agent ein Kapitel ergänzt:** neue Seite = neue YAML in `src/<kapitel>/`, in `chapter.yaml` eintragen, Daten in `src/data/`, Figuren-Konventionen und das Quartilsverfahren stehen im Content-Guide; Grenze zu #401 (relative Häufigkeit als Schätzwert für Wahrscheinlichkeit) ebenfalls.


## Code

<!--
- Build the app, locally on `work`, on your own. After each task: `plan done`, then one commit with the work and this
  plan. The hooks check each commit; a failing check is fixed from its message, as skill `lernapps-cli` says.
- What you cannot decide: choose, write it under "Key decisions" with "(guess)", go on.
- The creator asks for a change: say your reading in one sentence first, then change every place it holds for
  (`feedback-applied-everywhere`).
-->

### Tasks

- [x] Load skill `lernapps-cli`. Create the app as its section "Create" says:
      `npx --no -- lernapps create --archetype explainer`.
- [x] Fill the content guide `.agents/skills/app-content/SKILL.md` from "Notes" and "Content method": every heading,
      no "FILL IN" left. Commit it before any content.
- [x] Load skill `lernapps-explainer`.
- [x] Load skill `lernapps-content-questions`. Read whole, with your file tool:
      `.agents/skills/lernapps-explainer/references/blocks.md` and
      `.agents/skills/lernapps-explainer/references/exercises.md`. A foreign language: also
      `references/language-tasks.md` in the same folder. A component in the plan: also `references/components.md`.
- [x] Decide whether the app needs `scope`, as "`scope`" in
      `.agents/skills/lernapps-explainer/references/structure.md` says. Write the choice under "Key decisions".
- [x] Muster: App-Gerüst (app.yaml, drei Kapitel, Datendatei umfragen.yaml, Figuren-Konventionen) und die Seite umfrage/daten-darstellen komplett: Einstieg mit Zettelzählung, Strichliste, Tabelle, Säulendiagramm als eigene SVG, Exercise-Komponente SaeulenZeichnen, mindestens vier Aufgaben mit Fehlerrückmeldung
<!-- tasks: pattern (1 added): the one page or screen that is the pattern for the others -->
- [x] **Checkpoint:** the pattern page. Load skill `lernapps-learner-check` and do its learner check on the page. Fix
      what it finds. Then show the creator the page and ask whether the others may follow it. Stop and wait. A
      change: change the pattern first.
      Creator: Musterseite angenommen, die übrigen Seiten dürfen nach diesem Muster folgen; Änderungen nach der Prüfung unter Review als nicht erneut geprüft; fachlicher Prüfer rechnet vor Veröffentlichen alles nach; Push nach jedem größeren Schritt.
- [x] Seite umfrage/haeufigkeiten (haeufigkeiten): absolute und relative Häufigkeit als gesetzter Bruch, Kreisdiagramm als SVG, generated mit Fehlerdiagnose, mindestens vier Aufgaben
- [x] Seite umfrage/umfrage-durchfuehren (umfragen-erhebungen): Fragen beurteilen und verbessern, Antworten erfassen, generated Rohantworten zählen, mindestens vier Aufgaben
- [x] Seite umfrage/mittelwert (mittelwert): Komponente WuerfelTuerme mit Test und nojs, Summe : Anzahl, generated mit Fehlerdiagnose, Deutung, mindestens vier Aufgaben
- [x] Seite umfrage/diagramme-kritisch-lesen (daten-kritisch-lesen): Täuschungs-SVGs, Komponente AchseSchieber mit Test und nojs, benennen, zuordnen, reparieren, Rückblick Kapitel 1
- [x] Recap umfrage/vorwissen und Kurztest umfrage/vorwissen-test nach regeln.md Abschnitt 7: Begriffe fett mit Beispiel, Kopf, Checkliste, Selbsttest je Baustein mit Kartenseite; Glossar-Einträge; prüfen, ob eine Seite ohne Kompetenz erlaubt ist (sonst Fund)
- [ ] Datendateien klassen.yaml (8b, 8c) und schule.yaml (600 Lernende) mit Rechenprobe der Kennwerte (Median, Quartile, Spannweite) als Test oder Selbsttest
- [ ] Seite kennwerte/median-quartile (kenngroessen-lage-streumasse): Komponente Perlenkette mit Test und nojs, Quartilsverfahren eindeutig, generated mit Fehlerdiagnose, mindestens vier Aufgaben
- [ ] Seite kennwerte/boxplot (boxplot): Boxplot-SVGs aus den Daten von 8b und 8c, Fünf-Werte-Zusammenfassung, Aussagen prüfen, generated, Rückblick Kapitel 2
- [ ] Seite stichprobe/klein-oder-einseitig (stichproben-erhebungen-planen): Komponente StichprobeZiehen mit Test und nojs, Vergleich mit der Gesamtheit, open-task Mein Urteil, scope auf allen Seiten
- [ ] Seite stichprobe/erhebung-planen (stichproben-erhebungen-planen): Erhebungsplan beurteilen und neu planen, open-task Mein Urteil, Rückblick Kapitel 3 und Gesamtrückblick
- [ ] Zwei Prüfer starten (Lernenden-Prüfer je Stufe, fachlicher Prüfer), Befunde im Plan unter Review, umsetzen; was danach inhaltlich geändert wurde, nochmals prüfen
<!-- tasks: pages (11 added): the other pages or screens, after the pattern -->
- [ ] Update the content guide so that it describes the app as built (`app-content-matches`).
- [ ] Run `npx --no -- lernapps check` until it passes.
- [ ] Look at every screen and state, at 360 px and on a desktop, as "Look at the app" of skill `lernapps-cli` says.
      Compare each with its sketch.
- [ ] Do the whole-app check of skill `lernapps-learner-check`. Fix what it finds and write under "Notes" what you
      fixed.

## Commit

<!--
- Put the app on GitHub, publish it with the creator's yes, then list it. A push to `main` publishes.
- Open the pull requests (to `main`, to the catalog) without asking: they publish nothing.
- The creator asked to stop before publishing (a trial): stop here and say so.
-->

### Tasks

- [ ] Load skill `lernapps-explainer-self-assessment`. Add the self-assessment as it says, or write under "Key
      decisions" why the app has none. Commit.
- [ ] Load skill `lernapps-github`. Set up the repository and Pages as it says. Ask for the repository's name and
      every click only the creator can make, in one message.
- [ ] Push `work`, open the preview pull request and see its checks to green, as skill `lernapps-github` says.
- [ ] **Checkpoint:** publish. Show what the app does and the preview link from the comment "Vorschau der App". Ask
      whether it may go online. Stop and wait for the yes.
- [ ] Load skill `lernapps-commit`. Publish as skill `lernapps-github` says: `work` into `main` as one squash commit,
      the run of `Pages` watched to its end.
- [ ] Open the address the job `deploy` printed and confirm that the app shows. Never use a derived address.
- [ ] Load skill `lernapps-listing`. Write the entry under "Entry draft" as it says, with the creator's answer to
      "Finding the app".
- [ ] Fill the retrospective.
- [ ] Commit this plan on `main` and push it: the listing check and the review read it there.
- [ ] **Checkpoint:** list. Open the listing pull request as skill `lernapps-listing` says, without asking first: the
      pull request is the review. See it to "bestanden", then show the creator the pull request and its result.
- [ ] If the plan changed since its last push, commit it on `main` and push again.

### Entry draft

<!-- YAML valid against the entry schema the listing skill names. Only known values, never invented. -->

```yaml
```

## Retrospective

<!-- At the end of Commit, before the listing pull request. Facts, short, no names. Read by review and evals. -->

### Phases reached

<!-- Last phase completed, checkpoints passed. E.g. "commit; confirmed, published". -->

### Creator turns after the plan

<!-- Number of creator messages after the confirmation, topic of each. Target: at most 3. -->

### Where I had to guess

<!-- Each gap in plan, skills, messages or answers, and your choice. "None" if none. -->
