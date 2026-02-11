class Games {

collection = [
    {
        name: "Schwanz ziehen",
        mode_All: true,
        mode_unfair: true,
        mode_2vs2: true,
        rules_All: "Ein Spieler pro Team bekommt ein Tuch hinten in die Hose gesteckt, das zu 75% rausschauen muss. Beim Startsignal muss das Tuch der Gegner herausgezogen werden. Wer sein Tuch verliert scheidet aus. Wer am Ende übrig bleibt gewinnt.",
        rules_unfair: "Team Blau gegen Team Rot: Ein Spieler pro Team (Unterlegene Farbe füllt Spieler auf) bekommt ein Tuch hinten in die Hose gesteckt, das zu 75% rausschauen muss. Beim Startsignal muss das Tuch der Gegnerfarbe herausgezogen werden. Wer sein Tuch verliert scheidet aus. Die Farbe, die am Ende übrig bleibt gewinnt.",
        rules_2vs2: "Team Blau gegen Team Rot: Ein Spieler pro Team bekommt ein Tuch hinten in die Hose gesteckt, das zu 75% rausschauen muss. Beim Startsignal muss das Tuch der Gegnerfarbe herausgezogen werden. Wer sein Tuch verliert scheidet aus. Die Farbe, die am Ende übrig bleibt gewinnt."
    },
    {
        name: "Schnick Schnack Schnuck",
        mode_All: true,
        mode_unfair: true,
        mode_2vs2: true,
        rules_All: "Ein Spieler pro Team tritt an. Jeder Spieler sucht sich einen Gegner und spielt Schere-Stein-Papier (nicht mehr!). Der erster Sieg zählt, bei Unentschieden wird wiederholt. Die Sieger treten gegeneinander an. Bei ungerader Spieleranzahl wird zu dritt gespielt.",
        rules_unfair: "Ein Spieler pro Team tritt an. Ein roter Spieler spielt gegen einen blauen Spieler Schere-Stein-Papier (nicht mehr!). Der erster Sieg zählt, bei Unentschieden wird wiederholt. Die Sieger treten gegeneinander an. Bei ungerader Spieleranzahl wird zu dritt gespielt. Ist eine Farbe eliminiert, gewinnen alle übrig gebliebenen Teams.",
        rules_2vs2: "Ein Spieler pro Team tritt an. Ein roter Spieler spielt gegen einen blauen Spieler Schere-Stein-Papier (nicht mehr!). Der erster Sieg zählt, bei Unentschieden wird wiederholt. Die Sieger treten gegeneinander an. Bei ungerader Spieleranzahl wird zu dritt gespielt. Ist eine Farbe eliminiert, gewinnen alle übrig gebliebenen Teams."
    },
    {
        name: "Karten-Flaschen-Pusten",
        mode_All: true,
        mode_unfair: true,
        mode_2vs2: true,
        rules_All: "Ein Spieler pro Team tritt an. Auf einem Flaschenhals ist ein Spielkartenset gestapelt. Reihum muss jeweils immer ein Spieler aus jedem Team mind. eine Karte vom Stapel pusten, ohne die Karten zu berühren. Das Team, bei dem der Stapel komplett runterfällt, scheidet aus. Eine neue Runde beginnt, bis ein Siegerteam feststeht.",
        rules_unfair: "Ein Spieler pro Team tritt an. Auf einem Flaschenhals ist ein Spielkartenset gestapelt. Reihum muss jeweils immer ein Spieler aus jeder Farbe mind. eine Karte vom Stapel pusten, ohne die Karten zu berühren. Das Farb-Team, bei dem der Stapel komplett runterfällt, verliert dieses Spiel.",
        rules_2vs2: "Ein Spieler pro Team tritt an. Auf einem Flaschenhals ist ein Spielkartenset gestapelt. Reihum muss jeweils immer ein Spieler aus jeder Farbe mind. eine Karte vom Stapel pusten, ohne die Karten zu berühren. Das Farb-Team, bei dem der Stapel komplett runterfällt, verliert dieses Spiel."
    },
    {
        name: "Flaschenkicker",
        mode_All: true,
        mode_unfair: true,
        mode_2vs2: true,
        rules_All: "Ein Spieler pro Team tritt an. Jedes Team hat eine Flasche in einer Ecke stehen. Mit dem Ball müssen die Spieler versuchen, die gegnerischen Flaschen um zu kicken. Umtreten ist nicht erlaubt. Das Team, dessen Flasche umgeschossen wurde, scheidet aus. Das Team, das übrig bleibt, gewinnt.",
        rules_unfair: "Ein Spieler pro Team tritt an. Jedes Farb-Team hat pro Spieler eine Flasche in einer Ecke stehen. Mit dem Ball müssen die Spieler versuchen, die gegnerischen Flaschen um zu kicken. Umtreten ist nicht erlaubt. Das Farb-Team, dessen Flasche komplett umgeschossen wurde, verliert.",
        rules_2vs2: "Ein Spieler pro Team tritt an. Jedes Farb-Team hat pro Spieler eine Flasche in einer Ecke stehen. Mit dem Ball müssen die Spieler versuchen, die gegnerischen Flaschen um zu kicken. Umtreten ist nicht erlaubt. Das Farb-Team, dessen Flasche komplett umgeschossen wurde, verliert."
    },
    {
        name: "Dachdecker-Meister",
        mode_All: true,
        mode_unfair: true,
        mode_2vs2: true,
        rules_All: "Ein Spieler pro Team tritt an. Jedes Team bekommt 10 Bierdeckel. Auf Stadtsignal hat jedes Team max. 1 Minute Zeit möglichst viele Dächer aus jeweils zwei Bierdeckeln zu bauen (nicht stapeln). Wer zuerst 5 Dächer gebaut hat oder am Schluss die meisten Dächer aufgestellt hat, gewinnt.",
        rules_unfair: "Ein Spieler pro Team tritt an. Jedes Team bekommt 10 Bierdeckel. Auf Startsignal hat jedes Team max. 1 Minute Zeit möglichst viele Dächer aus jeweils zwei Bierdeckeln zu bauen (nicht stapeln). Wer zuerst 5 Dächer gebaut hat oder am Schluss die meisten Dächer aufgestellt hat, dessen Team-Farbe gewinnt.",
        rules_2vs2: "Ein Spieler pro Team tritt an. Jedes Team bekommt 10 Bierdeckel. Auf Startsignal hat jedes Team max. 1 Minute Zeit möglichst viele Dächer aus jeweils zwei Bierdeckeln zu bauen (nicht stapeln). Wer zuerst 5 Dächer gebaut hat oder am Schluss die meisten Dächer aufgestellt hat, dessen Team-Farbe gewinnt."
    },
    {
        name: "Schuh-Boccia",
        mode_All: true,
        mode_unfair: true,
        mode_2vs2: true,
        rules_All: "Alle Spieler in jedem Team ziehen ein Schuh aus. Bei ungleich großen Teams dürfen die unterlegenen Teams entsprechend zweite Schuhe ausziehen. Der Spielleiter wirft die Zielmarkierung in den Raum. Abwechselnd wirft jeweils immer ein Spieler aus jedem Team nacheinander von der Startlinie aus sein Schuh so nah wie möglich an die Zielmarkierung heran. Das Team, das am Ende am dichtesten dran liegt, gewinnt.",
        rules_unfair: "Drei Spieler aus jedem Team treten an mit jeweils einem Schuh. Der Spielleiter wirft die Zielmarkierung in den Raum. Abwechselnd wirft jeweils immer ein Spieler aus jedem Team nacheinander von der Startlinie aus sein Schuh so nah wie möglich an die Zielmarkierung heran. Das Farb-Team, das am Ende am dichtesten dran liegt, gewinnt.",
        rules_2vs2: "Drei Spieler aus jedem Team treten an mit jeweils einem Schuh. Der Spielleiter wirft die Zielmarkierung in den Raum. Abwechselnd wirft jeweils immer ein Spieler aus jedem Team nacheinander von der Startlinie aus sein Schuh so nah wie möglich an die Zielmarkierung heran. Das Farb-Team, das am Ende am dichtesten dran liegt, gewinnt."
    },
    {
        name: "Knandschuh-Ball",
        mode_All: true,
        mode_unfair: false,
        mode_2vs2: true,
        rules_All: "Ein Spieler pro Team tritt an und trägt die Schuhe als Handschuhe an den Händen. Jedes Team hat jeweils 1 Stuhl als Tor in einer Ecke. Bei <Start> müssen die Spieler den Ball krabbelnd/knieend mit den Schuhen ins generische Tor schlagen. Dabei ist der Stuhl als Tor von allen Seiten bespielbar. Das Team, das ein Tor kassiert, scheidet aus. Wer übrig bleibt gewinnt. Gibt es nach 5 Minuten kein Sieger, gewinnt keiner.",
        rules_unfair: "",
        rules_2vs2: "Ein Spieler pro Team tritt an und trägt die Schuhe als Handschuhe an den Händen. Jedes Farb-Team hat jeweils 1 Stuhl als Tor in einer Ecke. Bei <Start> müssen die Spieler den Ball krabbelnd/knieend mit den Schuhen ins generische Tor schlagen. Dabei ist der Stuhl als Tor von allen Seiten bespielbar. Das Farb-Team, das ein zuerst ein Tor erzielt, gewinnt. Gibt es nach 2 Minuten kein Sieger, gewinnt keiner."
    }
];


constructor() { }

}