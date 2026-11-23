---
# Read by the hooks, the review, the evals. Schema: @lernapps/tooling/guidance/plan-front-matter.v1.schema.json
# Written by `lernapps plan` and the hooks. Never change a key or a value by hand.
# Archetype, null until chosen in Explore. Allowed values: explainer, interactive, quiz.
archetype: explainer
# Current phase. Allowed values: explore, plan, code, commit.
phase: explore
# prePushFailures: failed pre-push runs, written by the hook.
prePushFailures: 0
# failedChecks: failed rules and runs, written by lernapps check and the hooks.
failedChecks: {}
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
- [ ] **Checkpoint:** research. Show in plain words: the strand or why none, the competencies by chapter, the didactic
      approach, the scope, every "(guess)", the sources and what is unchecked, the archetype and its reason. Stop and
      wait. Changes: change them, then ask again.

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

- [ ] Map the content as "Map the content" of skill `lernapps-explainer-design` says, and write the result under
      "Content method".
- [ ] Choose a pattern per competency as skill `lernapps-exercise-patterns` says, and add it to "Content method".
- [ ] Add to "Content method" one line per page, as "Engagement" of skill `lernapps-explainer-design` says: the
      opening task, the change of activity, the reward, the story.
- [ ] Add the tasks of Code, each one a piece of work that ends in a commit. First the pattern: one complete page or
      screen, `npx --no -- lernapps plan add --at pattern "<task>"`. Then the others, one call each:
      `npx --no -- lernapps plan add --at pages "<task>"`. Each task says what it builds and what it shows.
- [ ] Draw a sketch of each screen, component or interactive exercise: a static SVG or image, or the steps with what
      learners see after each. Keep the files in `.vibe/sketches/`.
- [ ] Show the creator, short: goal, competencies by chapter, the Code tasks, the sketches, and the content method in
      plain words (what learners see and do, what the app cannot do). At most 2 questions.
- [ ] **Checkpoint:** confirm the plan and the content method. Stop and wait for an explicit yes. Changes: change
      them, then ask again.

### Content method

<!-- One line each: the patterns and where; the figures and how they are made; the data files; each component, what it
checks and what it cannot; how a later agent adds a chapter. It becomes the content guide in Code. -->
<!-- An explainer: per figure, model and component its learning action in two to four sentences
(`explainer-representation-explained`); per page its prerequisites the app does not practise, and which get a recap
page, which a link. -->

## Code

<!--
- Build the app, locally on `work`, on your own. After each task: `plan done`, then one commit with the work and this
  plan. The hooks check each commit; a failing check is fixed from its message, as skill `lernapps-cli` says.
- What you cannot decide: choose, write it under "Key decisions" with "(guess)", go on.
- The creator asks for a change: say your reading in one sentence first, then change every place it holds for
  (`feedback-applied-everywhere`).
-->

### Tasks

- [ ] Load skill `lernapps-cli`. Create the app as its section "Create" says:
      `npx --no -- lernapps create --archetype explainer`.
- [ ] Fill the content guide `.agents/skills/app-content/SKILL.md` from "Notes" and "Content method": every heading,
      no "FILL IN" left. Commit it before any content.
- [ ] Load skill `lernapps-explainer`.
- [ ] Load skill `lernapps-content-questions`. Read whole, with your file tool:
      `.agents/skills/lernapps-explainer/references/blocks.md` and
      `.agents/skills/lernapps-explainer/references/exercises.md`. A foreign language: also
      `references/language-tasks.md` in the same folder. A component in the plan: also `references/components.md`.
- [ ] Decide whether the app needs `scope`, as "`scope`" in
      `.agents/skills/lernapps-explainer/references/structure.md` says. Write the choice under "Key decisions".
<!-- tasks: pattern: the one page or screen that is the pattern for the others -->
- [ ] **Checkpoint:** the pattern page. Load skill `lernapps-learner-check` and do its learner check on the page. Fix
      what it finds. Then show the creator the page and ask whether the others may follow it. Stop and wait. A
      change: change the pattern first.
<!-- tasks: pages: the other pages or screens, after the pattern -->
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
