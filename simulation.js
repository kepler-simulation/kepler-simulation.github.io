// made by @LaurinSeeholzer

// definieren von benötigten Variablen
let planets = []; // Liste von Planeten 
let zentralgestirn; // Zentralgestirn
let chart_planet_a; // Diagramm für Planet A
let chart_planet_b; // Diagramm für Planet B
let chartdata_planet_a = []; // Diagrammdaten für Planet A
let chartdata_planet_b = []; // Diagrammdaten für Planet A

// Setupfunktion, wird beim Start des programms einmalig aufgerufen
function setup() {

    // Falls das Fenster mehr als 991px gross ist
    if (window.innerWidth >= 992) {
        createCanvas((window.innerWidth / 2) - 100, (window.innerWidth / 2) - 100) // Erstellen einer Fläche um Simulation zu zeichnen
            // Falls das Fenster weniger als 992px gross ist
    } else {
        createCanvas(window.innerWidth - 20, window.innerWidth - 20) // Erstellen einer Fläche um Simulation zu zeichnen
    }

    // Planetenpositionen berechnen
    let x = width / 2;
    let y = height / 2;


    planets[0] = new Planet(x, y + 147.1, 1); // Planet A erstellen und der Liste hinzufügen
    planets[1] = new Planet(x + 100, y - 10 - 147.1, 2); // Planet B erstellen und der Liste hinzufügen
    zentralgestirn = new Zentralgestirn(width / 2, height / 2, 150000); // Zentralgestirn erstellen

    // Erstellen des Diagramms für Planet A
    chart_planet_a = new CanvasJS.Chart("chartContainer_planet_a", {
        axisY: {
            x: 20
        },
        title: {
            text: "Planet A"
        },
        data: [{
            type: "line",
            color: "#424B54",
            dataPoints: chartdata_planet_a
        }]
    });
    chart_planet_a.render(); // Rendern des Diagramms

    // Erstellen des Diagramms für Planet A
    chart_planet_b = new CanvasJS.Chart("chartContainer_planet_b", {
        title: {
            text: "Planet B"
        },
        data: [{
            type: "line",
            color: "#424B54",
            dataPoints: chartdata_planet_b
        }]
    });
    chart_planet_b.render(); // Rendern des Diagramms
}


// Drawfunktion, wird periodisch aufgerufen, um die Werte der Simulation und der Diagramme zu erneuern
function draw() {
    background(255); // Hintergrund der Simulation Weiss
    var datapointlength = 200; // Maximale Länge der Diagramme
    zentralgestirn.mass = document.getElementById("zentralgestirnmass").value // Masse des Zentralgestirns auf die Masse des Reglers setzen

    // Für jeden Planeten in der Liste
    for (let planet of planets) {
        planet.update(); // Planetdaten erneuern
        planet.show(); // Planet rendern
        zentralgestirn.attract(planet); // Rendern des Diagramms
    }

    zentralgestirn.show(); // Zentralgestirn rendern

    // Daten für Diagramm von Planet A erneuern
    // Wenn die länge der Datenpunkte grösser als das gesetzte Maximum ist
    if (chartdata_planet_a.length >= datapointlength) {
        chartdata_planet_a.shift() // Ältester Datenpunkt löschen
            // X-Achse der Datenpunkte jeweils -1
        chartdata_planet_a.forEach((datapoint) => {
            datapoint["x"] = datapoint["x"] - 1;
        });
    }
    // Neuen Datenpunkt hinzufügen
    chartdata_planet_a.push({
        x: chartdata_planet_a.length + 1,
        y: Math.sqrt((planets[0].vel.x * planets[0].vel.x) + (planets[0].vel.y * planets[0].vel.y)),
        color: "#424B54"
    })
    chart_planet_a.render() // Diagramm für Planet A rendern

    // Daten für Diagramm von Planet B erneuern
    // Wenn die länge der Datenpunkte grösser als das gesetzte Maximum ist
    if (chartdata_planet_b.length >= datapointlength) {
        chartdata_planet_b.shift() // Ältester Datenpunkt löschen
            // X-Achse der Datenpunkte jeweils -1
        chartdata_planet_b.forEach((datapoint) => {
            datapoint["x"] = datapoint["x"] - 1;
        });
    }
    // Neuen Datenpunkt hinzufügen
    chartdata_planet_b.push({
        x: chartdata_planet_b.length + 1,
        y: Math.sqrt((planets[1].vel.x * planets[1].vel.x) + (planets[1].vel.y * planets[1].vel.y)),
        color: "#424B54"
    })
    chart_planet_b.render() // Diagramm für Planet B rendern
}
