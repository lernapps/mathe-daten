---
name: app-content
description: Use for any content work in this app - researching, writing, extending, correcting or reviewing its competencies, chapters, pages, rounds, questions, exercises, figures, terms or sources. This app's own content decisions; they take precedence over the generic lernapps content skills. Load it before you change any content.
---

# Content guide of this app

Explainer „Daten erheben und auswerten“ (Mathematik, Strang `mathematik/stochastik`, Issue lernapps/apps#400). Der Plan ist `.vibe/plans/01-mathe-daten.md`; die gemeinsamen Regeln des Epics (Schreibweisen, Aufgaben, Quellen) stehen in `docs/mathe-epic/regeln.md` des Repos `lernapps/apps` und gelten hier.

## Curriculum

Land Hessen (Annahme), Gymnasium Sek I, Stufen 5-6, 7-8, 9-10. Die Reihenfolge gibt die Lernlandkarte Mathematik (`https://lernapps.net/apps/map/mathematik.json`, Quelle KMK-Bildungsstandards ESA/MSA 2022); ein Lehrplan wurde nicht gelesen und ist nicht nötig. Die App übt nur Bausteine des Strangs `stochastik`; Voraussetzungen von außen stehen im Recap.

## Competencies

Kapitel `umfrage` (5-6):

- `daten-darstellen` „Ich kann Daten in Tabellen und Diagrammen darstellen und die Darstellung begründen.“ → `umfrage/daten-darstellen`
- `haeufigkeiten` „Ich kann absolute und relative Häufigkeiten bestimmen.“ → `umfrage/haeufigkeiten`
- `umfragen-erhebungen` „Ich kann eine einfache Umfrage planen, durchführen und die Antworten in Listen erfassen.“ → `umfrage/umfrage-durchfuehren`
- `mittelwert` „Ich kann das arithmetische Mittel berechnen und deuten.“ → `umfrage/mittelwert`
- `daten-kritisch-lesen` „Ich kann Diagramme in Medien kritisch lesen und erkennen, wie sie täuschen können.“ → `umfrage/diagramme-kritisch-lesen`
- Recap (nicht geübt): `zahlen-vergleichen-ordnen`, `brueche-begriff`, `dezimalbrueche-rechnen` → `umfrage/vorwissen`

Kapitel `kennwerte` (7-8):

- `kenngroessen-lage-streumasse` „Ich kann Median, Spannweite und Quartile von Daten bestimmen und deuten.“ → `kennwerte/median-quartile`
- `boxplot` „Ich kann einen Boxplot zeichnen und daraus Aussagen über die Daten ablesen.“ → `kennwerte/boxplot`

Kapitel `stichprobe` (9-10):

- `stichproben-erhebungen-planen` „Ich kann eine statistische Erhebung mit Stichprobe und Erhebungsinstrument planen und beurteilen, wie aussagekräftig sie ist.“ → `stichprobe/klein-oder-einseitig` und `stichprobe/erhebung-planen`

Die Exercise-Ids je Seite stehen in der Seite (Abschnitt `uebung`).

## Content structure

- Dateien: `src/app.yaml`, `src/<kapitel>/chapter.yaml`, `src/<kapitel>/<seite>.yaml`, Daten in `src/data/`, Figuren in `src/images/`, Komponenten in `src/components/`.
- Jede Seite hat `scope`, nur Deutsch (`languages: [de]`), Abschnitte mit gleichen Ids: `einstieg` (Ziel in Lernendenworten, Szene, erste leichte Aufgabe), `erklaerung`, `beispiel`, `merke`, `uebung`; Kapitel 3 zusätzlich `urteil` („Mein Urteil“, `open-task` mit Musterlösung und konkreter Checkliste, dazu wo eindeutig eine `single-choice`). Titel sagen, was der Abschnitt tut.
- Die Recap-Seite hat `recap:` und keine Aufgaben: Kopf „Das brauchst du für dieses Kapitel“, je Voraussetzung ein Abschnitt (Überschrift = Name des Bausteins, fette Begriffe, Beispiel im Kasten), darin die Komponente `Kurztest`, am Ende die Checkliste „Du bist bereit, wenn du …“.
- Mindestens vier Aufgaben je Seite, steigend (erkennen → anwenden → neue Situation); jede Seite endet mit einem Satz, was nun möglich ist, und dem nächsten Schritt der Geschichte.
- Geschichte: Kap. 1 Klasse 6a (gezeichnete Kinder Mira, Jonas, Ayşe, Tom, Lena, Paul), Kap. 2 Chat der Klassen 8b und 8c, Kap. 3 ein Fall (Schule mit 600 Lernenden, die Schülervertretung). Derselbe Datensatz „Schulweg“ wächst mit.

## Terminology

- Wörter der Karte gelten: Häufigkeit (absolut, relativ), arithmetisches Mittel („Mittelwert“ in Alltagssprache), Median, Spannweite, Quartil, Boxplot, Stichprobe, Erhebung.
- „du“, kurze Sätze, kein „man“ in Aufträgen. Dezimalkomma, Malpunkt `·`, Doppelpunkt `:`, Minus `−`, Einheit mit geschütztem Leerzeichen (`7 min`), `15 %` mit geschütztem Leerzeichen, Brüche gesetzt (nicht `3/4`). Ausnahme: in `mistakes` und Rückmeldungen von Komponenten ist `a/b` erlaubt (Laufzeit, Fund W28).
- Zahlenstrahl nur ab 0 (Recap).
- **Quartile, überall gleich:** Daten ordnen; Median = mittlerer Wert, bei gerader Anzahl der Mittelwert der beiden mittleren; Q1 = Median der unteren Hälfte, Q3 = Median der oberen Hälfte; bei ungerader Anzahl gehört der Median nicht zu den Hälften; Spannweite = größter minus kleinster Wert.
- Glossar (`definition`-Blöcke): wird mit den Seiten gefüllt, Begriffe des Recaps (Bruch, Dezimalbruch, Vergleichen und Ordnen, Stellenwert) eingeschlossen.

## Exercise patterns

- *Tabelle ↔ Diagramm* (`daten-darstellen`): Säulen setzen (Exercise-Komponente `SaeulenZeichnen`), aus einem Diagramm ablesen (`number`, `single-choice`), Darstellung begründen (`single-choice`).
- *Zählen und teilen* (`haeufigkeiten`): `single-choice` (Bruch), `generated` `relative-haeufigkeit` (Dezimalzahl, weil das Zahlenfeld keine Brüche annimmt), `ordering`; Fehler: durch die falsche Zahl geteilt, absolut und relativ verwechselt. Daten der 6a: `src/data/verkehrsmittel.yaml`.
- *Frage beurteilen* (`umfragen-erhebungen`): `single-choice`/`multiple-choice` mit Begründung je Option; `generated` Rohantworten zählen.
- *Mittelwert* (`mittelwert`): `generated` (4 bis 8 Werte, Ergebnis `decimal`), Fehler: nur addiert, durch die falsche Anzahl geteilt; `true-false` zur Deutung.
- *Täuschung benennen und reparieren* (`daten-kritisch-lesen`): `single-choice`, `matching`, `ordering`.
- *Kennwerte aus Liste* (`kenngroessen-lage-streumasse`): `generated` mit `sortBy([a, b, …], wert)[k].wert`, die Werte einzeln aus `src/data/werte.yaml` (3 bis 60 Minuten) mit `where`-Bedingungen für verschiedene Werte; Aufgaben `median-ungerade`, `median-gerade`, `spannweite-bestimmen`, `unteres-quartil`, `oberes-quartil-gerade`; Fehler: nicht geordnet, gerade Anzahl, Median in beiden Hälften.
- *Boxplot lesen und zeichnen* (`boxplot`): Aussagen über zwei Klassen (`single-choice`, `true-false`), `number` mit Toleranz (Median ablesen), `generated` `box-laenge` und `box-anzahl`, `matching` der Stellen eines Boxplots (Zeichnen), `ordering` der Zeichenschritte.
- *Stichprobe beurteilen* (`stichproben-erhebungen-planen`): Komponente `StichprobeZiehen` (keine Exercise; Daten `src/data/schule.yaml`, 600 Lernende, die ersten 24 sind die 6a), `single-choice`, `generated` `hochrechnen` und `jede-kte-person`, `matching`, `ordering`, `open-task` „Mein Urteil“ (Kap. 3, Abschnitt `urteil`, mit konkreter Punkteliste und Musterlösung).
- Rückmeldungen nennen den Fehlertyp; Werte werden geprüft, nicht als Text verglichen (`0,5`, `0.5`, `1/2` gelten, wo erlaubt); Rundung steht in der Aufgabe.

## Figures

- Alle Diagramme (Säulen, Kreis, Boxplot, Täuschungsbeispiele) sind eigene SVG in `src/images/`, aus den Zahlen der Datendateien gezeichnet, `source: eigene Zeichnung`, `licence: CC-BY-4.0`; jedes hat `alt` (was zu sehen ist, ohne die Lösung) und eine Bildunterschrift (wohin schauen). `figure` mit `bar`/`hundred-grid` taugt nicht für Säulen.
- Konventionen: Achsen beschriftet, Skala sichtbar, Säulen mit Zahl, Kategorien als Wort; eine Farbe je Merkmal plus zweites Merkmal (Muster oder Beschriftung), nie Farbe allein; Dezimalkomma.
- Komponenten (Begründung: kein Block kann das): `SaeulenZeichnen` (Exercise, Säulen setzen; Seite 1), `WuerfelTuerme` (Würfel verschieben; Mittelwert), `AchseSchieber` (Achse bei 0 oder 5; Diagramme kritisch lesen), `Perlenkette` (Werte ordnen, Mitte markieren, Hälften teilen; zweimal auf der Median-Seite, ungerade und gerade Anzahl), `StichprobeZiehen` (Stichprobe ziehen; Seite `klein-oder-einseitig`), `Kurztest` (Selbsttest im Recap, Vorlage aus `docs/mathe-epic/components/`). Jede hat Tastatur, Textalternative (`nojs`/`describe`) und Test; der Text vor ihr sagt, was die Knöpfe tun. Eigene SVG: `strichliste-6a`, `saeulen-6a`, `kreis-6a`, `becher-werbung`, `saeulen-abgeschnitten`, `zahlenstrahl-0-10`, `rechteck-drei-viertel`, `boxplot-8b-8c`, `boxplot-8b-erklaert`.

## Sources

Lernlandkarte Mathematik (geöffnet), KMK-Bildungsstandards ESA/MSA 2022 (Quelle der Karte; Seitenangaben nicht geprüft). Alle Texte, Aufgaben und Zahlen sind eigen; keine Schulbücher, keine Dritt-Inhalte, keine externen Links.

## Self-assessment

Jedes Kapitel hat in seiner `chapter.yaml` eine `selfAssessment`: Kapitel 1 vier Schritte, Kapitel 2 und 3 je zwei, je zwei bis drei Aufgaben (`generated`, `number`, `matching` und `single-choice`, die ohne ihre Seite klar sind).

## Adding a chapter or round

1. Baustein und Voraussetzungen in der Karte nachsehen; Voraussetzung von außen → Abschnitt im Recap des Kapitels.
2. Ordner `src/<kapitel>/` mit `chapter.yaml` (Titel, Seitenreihenfolge), in `src/app.yaml` eintragen.
3. Seiten nach dem Muster der Seite `umfrage/daten-darstellen` (Abschnitte wie oben), Daten in `src/data/`, Figuren als SVG mit `alt`.
4. Aufgaben aus den Mustern oben, mindestens vier je Seite, Fehler mit Rückmeldung.
5. 1 bis 3 ihrer Übungen in `selfAssessment` aufnehmen, wie Skill `lernapps-explainer-self-assessment` sagt (in der Einschätzung stehen nur Aufgaben, die ohne ihre Seite verständlich sind: kein „oben“, Bild in `material`).
6. `npx --no -- lernapps check`, dann committen. Relative Häufigkeit als Schätzwert für Wahrscheinlichkeit gehört nicht hierher (Issue #401).

## Rules learned from mistakes

- Erst die Arbeit, dann `lernapps plan done`: ein vorzeitiges `done` hakt Aufgaben ab, die noch offen sind.
- Keine `links:` an Aufgaben (Regeln §9.6); der Build besteht ohne sie.
- Das Zahlenfeld nimmt keine Brüche und keine Einheiten an: Aufgaben verlangen Dezimalzahlen oder ganze Zahlen, die Einheit steht in `unit`.
- Ein Satzpunkt am Ende einer Antwortoption macht in der Rückmeldung „.:“: Optionen ohne Schlusspunkt schreiben.
- Zahl und Einheit mit geschütztem Leerzeichen (`12 Minuten`, `37 %`).
- Aufgabe mit mehreren Listenwerten: `where` gegen gleiche Werte und gegen gleiche `mistakes` (Property-Test), Reihenfolge leicht vor schwer.
- Neue Darstellung vor der ersten Aufgabe in Worten einführen (Boxplot, Perlenkette); Text vor einer Komponente sagt, was ihre Knöpfe tun.
- Typfehler in `.vue` zeigt `npx vue-tsc --noEmit`, nicht `vp check`.
