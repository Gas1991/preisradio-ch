export interface FaqItem {
  q: string
  a: string
}

export const CATEGORY_FAQS: Record<string, FaqItem[]> = {
  smartphones: [
    {
      q: 'Welches Smartphone bietet das beste Preis-Leistungs-Verhältnis in der Schweiz?',
      a: 'Mittelklasse-Modelle bieten in der Schweiz das beste Preis-Leistungs-Verhältnis – zum Beispiel die Samsung Galaxy A-Serie oder Google Pixel. Vergleichen Sie die aktuellen Preise bei Digitec, Interdiscount und Brack auf Preisradio, um das günstigste Angebot zu finden.',
    },
    {
      q: 'Lohnt es sich, ein gebrauchtes Smartphone zu kaufen?',
      a: 'Ja, gebrauchte Smartphones sind oft kaum von Neugeräten zu unterscheiden und kosten deutlich weniger. In der Schweiz kauft bereits jede zehnte Person ein gebrauchtes Gerät. Achten Sie auf den Akkuzustand, sichtbare Gebrauchsspuren und testen Sie alle Funktionen vor dem Kauf.',
    },
    {
      q: 'Mit oder ohne Abo – was ist langfristig günstiger?',
      a: 'Ohne Abo zahlen Sie den vollen Gerätepreis, haben aber volle Freiheit beim Netzanbieter. Mit Abo erhalten Sie das Gerät günstiger, zahlen aber über die Laufzeit meist mehr. Ein direkter Kauf bei Digitec oder Interdiscount ohne Bindung ist langfristig oft günstiger.',
    },
    {
      q: 'Wann lohnt sich ein 5G-Smartphone in der Schweiz?',
      a: '5G lohnt sich, wenn Sie unterwegs häufig grosse Datenmengen nutzen – zum Beispiel beim Streamen oder für Mobile Gaming. Die Schweizer Netze von Swisscom, Salt und Sunrise decken bereits grosse Teile des Landes mit 5G ab.',
    },
  ],

  kaffeemaschinen: [
    {
      q: 'Welcher Kaffeemaschinentyp passt am besten zu meinen Bedürfnissen?',
      a: 'Filterkaffeemaschinen eignen sich für grössere Mengen, Kapselmaschinen für Singles und Gelegenheitstrinker, Espressomaschinen für anspruchsvolle Kaffeeliebhaber und Kaffeevollautomaten für experimentierfreudige Nutzer mit häufigem Konsum. Wählen Sie je nach Tagesverbrauch und Budget.',
    },
    {
      q: 'Wie aufwändig ist die Reinigung einer Kaffeemaschine?',
      a: 'Das hängt vom Typ ab. Filtermaschinen sind sehr einfach zu reinigen. Vollautomaten reinigen sich teilweise selbst, benötigen aber regelmässige Entkalkung. Siebträgermaschinen erfordern tägliche Pflege. Achten Sie beim Kauf darauf, ob Teile spülmaschinengeeignet sind.',
    },
    {
      q: 'Sind Kapselmaschinen im Betrieb teurer als Kaffeevollautomaten?',
      a: 'Ja, die Folgekosten durch Kapseln oder Pads sind deutlich höher. Eine Kapsel kostet 0.30–0.60 CHF, während gemahlener Kaffee für einen Vollautomaten nur Rappen pro Tasse kostet. Bei täglichem Konsum amortisiert sich ein Vollautomat meist innerhalb eines Jahres.',
    },
    {
      q: 'Was kostet eine gute Kaffeemaschine in der Schweiz?',
      a: 'Filterkaffeemaschinen gibt es ab CHF 30, Kapselmaschinen ab CHF 50. Qualitative Siebträgermaschinen kosten CHF 200–800, Kaffeevollautomaten CHF 300–2\'000. Vergleichen Sie aktuelle Preise bei Digitec, Interdiscount und Brack auf Preisradio.',
    },
  ],

  'staubsauger-roboter': [
    {
      q: 'Was kostet ein guter Saugroboter in der Schweiz?',
      a: 'Empfehlenswerte Modelle beginnen ab CHF 200. Modelle mit guter Saugkraft und Navigationstechnologie kosten zwischen CHF 300 und 600. Highend-Geräte mit Wischfunktion und automatischer Entleerung können CHF 800–1\'500 kosten.',
    },
    {
      q: 'Wie oft sollte ein Saugroboter laufen?',
      a: 'Mindestens einmal pro Woche. Bei Haustieren oder Allergikern empfiehlt sich ein täglicher Einsatz. Die meisten Modelle lassen sich per App oder Zeitplan automatisch steuern, sodass der Roboter auch bei Abwesenheit saugt.',
    },
    {
      q: 'Kann ein Saugroboter den normalen Staubsauger ersetzen?',
      a: 'Nicht vollständig. Saugroboter haben eine schwächere Saugleistung und erreichen nicht alle Winkel. Sie eignen sich ideal als Ergänzung für die tägliche Pflege, können einen leistungsstarken Handstaubsauger für gründliche Reinigungen aber nicht komplett ersetzen.',
    },
    {
      q: 'Brauche ich einen reinen Saugroboter oder ein Saug-Wisch-Kombigerät?',
      a: 'Ein reiner Saugroboter genügt für Teppiche und trockenen Schmutz. Ein Saug-Wisch-Kombigerät lohnt sich bei viel Hartboden und wenn Sie hartnäckige Flecken regelmässig entfernen möchten. Achten Sie auf die Wischleistung, da günstige Modelle oft nur befeuchten statt wirklich wischen.',
    },
  ],

  klimaanlage: [
    {
      q: 'Brauche ich eine Baubewilligung für eine Klimaanlage in der Schweiz?',
      a: 'Mobile Klimageräte benötigen keine Bewilligung. Split-Klimaanlagen mit Ausseneinheit sind jedoch bewilligungspflichtig – je nach Kanton kostet die Bewilligung CHF 150–500. In Mietwohnungen brauchen Sie zusätzlich die Zustimmung des Vermieters.',
    },
    {
      q: 'Welche Kühlleistung benötige ich für meine Raumgrösse?',
      a: 'Als Faustregel gilt ca. 70–100 Watt Kühlleistung pro Quadratmeter. Für einen 20 m² Raum reichen 1.5–2 kW. Bei starker Sonneneinstrahlung oder schlechter Isolierung sollte die Leistung höher angesetzt werden.',
    },
    {
      q: 'Was kostet eine Split-Klimaanlage inklusive Montage in der Schweiz?',
      a: 'Eine einfache Split-Klimaanlage für einen Raum kostet inklusive Montage zwischen CHF 1\'850 und CHF 4\'400. Mobile Klimageräte ohne Montage sind bereits ab CHF 500 erhältlich, kühlen aber weniger effizient.',
    },
    {
      q: 'Darf ich in einer Mietwohnung eine Klimaanlage einbauen?',
      a: 'Für mobile Geräte brauchen Sie keine Genehmigung. Für fest installierte Split-Anlagen benötigen Sie die schriftliche Zustimmung des Vermieters. Viele Vermieter lehnen Fassadendurchbrüche ab – fragen Sie deshalb frühzeitig nach.',
    },
  ],

  waschmaschine: [
    {
      q: 'Welche Trommelgrösse brauche ich für meinen Haushalt?',
      a: 'Für Singles oder Paare genügen 6–7 kg. Für Familien mit Kindern empfehlen sich 8–9 kg. Eine zu grosse Trommel, die nur halb befüllt wird, verschwendet Energie; eine zu kleine führt zu Überladung und schlechteren Waschergebnissen.',
    },
    {
      q: 'Auf welche Schleuderdrehzahl soll ich beim Kauf achten?',
      a: 'Mindestens 1\'400 U/min, besser 1\'600 U/min. Eine höhere Drehzahl bedeutet weniger Restfeuchte in der Wäsche und damit weniger Energieverbrauch beim anschliessenden Trocknen. Für empfindliche Textilien reichen 1\'000 U/min.',
    },
    {
      q: 'Passen Schweizer 55-cm-Waschmaschinen in jede Waschküche?',
      a: 'Schweizer Waschküchen sind oft auf 55 cm Nischenbreite ausgelegt – diese Geräte gibt es fast nur in der Schweiz. Messen Sie Ihre Nische vor dem Kauf genau aus. Standard-Europageräte mit 60 cm Breite passen möglicherweise nicht.',
    },
    {
      q: 'Wie viel Strom verbraucht eine energieeffiziente Waschmaschine?',
      a: 'Moderne Waschmaschinen der Klasse A verbrauchen ca. 150–200 kWh pro Jahr. Bei einem Schweizer Strompreis von ca. 25 Rappen/kWh sind das CHF 37–50 pro Jahr. Das Waschen bei 30–40°C statt 60°C spart zusätzlich bis zu 50% Energie.',
    },
  ],

  waeschetrockner: [
    {
      q: 'Was ist der Unterschied zwischen Wärmepumpen- und Kondenstrocknern?',
      a: 'Wärmepumpentrockner nutzen einen geschlossenen Kreislauf und verbrauchen ca. halb so viel Strom wie Kondenstrockner. Kondenstrockner sind günstiger in der Anschaffung, aber teurer im Betrieb. Beide Typen benötigen keinen Abluftschlauch und können überall aufgestellt werden.',
    },
    {
      q: 'Welcher Trocknertyp verbraucht weniger Strom?',
      a: 'Wärmepumpentrockner sind deutlich sparsamer – sie verbrauchen ca. 1.5–2 kWh pro Ladung, während Kondenstrockner 3–5 kWh benötigen. Bei täglicher Nutzung spart ein Wärmepumpentrockner über CHF 100 pro Jahr.',
    },
    {
      q: 'Wie lange dauert ein Trocknungsgang?',
      a: 'Kondenstrockner trocknen eine Ladung in ca. 45–70 Minuten. Wärmepumpentrockner brauchen länger – typischerweise 90–150 Minuten. Dafür sind sie schonender für die Textilien, da sie mit niedrigerer Temperatur arbeiten.',
    },
    {
      q: 'Lohnt sich ein Wärmepumpentrockner trotz höherem Anschaffungspreis?',
      a: 'Ja, bei regelmässiger Nutzung. Ein Wärmepumpentrockner kostet CHF 200–400 mehr, spart aber jährlich CHF 80–150 Strom. Die Amortisation erfolgt meist nach 2–3 Jahren. Vergleichen Sie aktuelle Preise auf Preisradio.',
    },
  ],

  fritteuse: [
    {
      q: 'Was ist der Unterschied zwischen einer Heissluftfritteuse und einer normalen Fritteuse?',
      a: 'Eine Heissluftfritteuse (Air Fryer) gart Speisen mit heisser Umluft statt Öl – das Ergebnis ist knusprig bei bis zu 80% weniger Fettanteil. Eine normale Fritteuse taucht das Gargut in heisses Öl und ist schneller, aber kalorienreicher.',
    },
    {
      q: 'Wie viel Strom verbraucht eine Heissluftfritteuse?',
      a: 'Typische Geräte haben 1\'400–2\'000 Watt, heizen aber sehr schnell vor. Da der Garraum klein ist und die Garzeiten kürzer sind als beim Backofen, verbraucht ein Air Fryer insgesamt weniger Energie – ca. 0.3–0.5 kWh pro Nutzung.',
    },
    {
      q: 'Welche Kapazität brauche ich für meine Familie?',
      a: 'Für Singles oder Paare reichen 2–4 Liter. Für Familien ab 3–4 Personen sollten Sie mindestens 5–6 Liter einplanen. Grössere Modelle ab 8 Litern eignen sich für häufiges Kochen grösserer Portionen.',
    },
    {
      q: 'Sind die Körbe der Heissluftfritteuse spülmaschinengeeignet?',
      a: 'Bei den meisten Modellen ja – die antihaftbeschichteten Körbe und Schalen können in der Spülmaschine gereinigt werden. Prüfen Sie dies vor dem Kauf, da es Ausnahmen gibt. Die Reinigung von Hand mit warmem Seifenwasser ist immer möglich.',
    },
  ],

  kuehlschrank: [
    {
      q: 'Wie viele Liter Kühlschrank brauche ich für meinen Haushalt?',
      a: 'Pro Person rechnet man mit 40–50 Litern Nutzinhalt. Eine einzelne Person benötigt ca. 100 Liter, ein Paar 150 Liter, eine Familie mit Kindern mindestens 250–300 Liter. Wählen Sie lieber etwas grösser, um Platz für Vorräte zu haben.',
    },
    {
      q: 'Was bedeuten die Energieeffizienzklassen A bis G beim Kühlschrank?',
      a: 'Das neue EU-Energielabel reicht von A (am sparsamsten) bis G (am meisten Verbrauch). Das alte A+++ entspricht heute etwa Klasse C–D. Für neue Geräte empfiehlt EnergieSchweiz mindestens Klasse B oder A.',
    },
    {
      q: 'Wie hoch sind die jährlichen Stromkosten eines Kühlschranks in der Schweiz?',
      a: 'Ein moderner Kühlschrank verbraucht 100–300 kWh pro Jahr. Bei einem Schweizer Strompreis von ca. 25 Rappen/kWh entspricht das CHF 25–75 pro Jahr. Ältere Geräte können deutlich mehr verbrauchen – ein Neukauf lohnt sich ab 10 Jahren Alter.',
    },
    {
      q: 'Auf welche Temperatur soll ich meinen Kühlschrank einstellen?',
      a: 'Die ideale Kühlschranktemperatur liegt bei 5–7°C. Das Gefrierfach sollte auf –18°C eingestellt sein. Jedes Grad kälter erhöht den Stromverbrauch um ca. 6%. Stellen Sie den Kühlschrank zudem nicht neben Herd oder Backofen auf.',
    },
  ],
}
