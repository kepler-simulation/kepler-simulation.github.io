// made by @LaurinSeeholzer

class Planet {
    constructor(x, y, m) {
        this.pos = createVector(x, y); // Positionsvektor erstellen
        this.vel = createVector(1, 0, 0); // Geschwindigkeitsvektor erstellen
        this.vel.mult(5); // Geschwindigkeit skalieren
        this.acc = createVector(0, 0); // Beschleungiungsvektor erstellen
        this.mass = m; // Masse definieren
        this.r = sqrt(this.mass) * 2; // Radius definieren
        this.points = []; // Liste vergangener Positionen
    }

    // Funktion zur beeinflussung des Planeten
    applyForce(force) {
        let f = p5.Vector.div(force, this.mass);
        this.acc.add(f);
    }

    // Updatefunktion 
    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.set(0, 0);
    }

    // Showfunktion zum rendern des Planeten
    show() {
        stroke(255); // Linienfarbe auf Weiss setzen
        strokeWeight(0); // Liniendicke auf Null setzen
        fill(147, 168, 172); // Farbe der Objekte
        // Liste vergangener Punkte erneuern
        if (this.points.length >= 10) {
            this.points.shift()
        }
        // Neuer Punkt zur Liste vergangener Punkte hinzufügen
        this.points.push([this.pos.x, this.pos.y])
            // Jeden Punkt der Liste vergangener Punkte rendern
        this.points.forEach((ball) => {
            ellipse(ball[0], ball[1], this.r * 2);
        });
        fill(66, 75, 84); // Farbe der Objekte
        ellipse(this.pos.x, this.pos.y, this.r * 4); // Planet rendern
    }
}