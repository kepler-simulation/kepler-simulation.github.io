// made by @LaurinSeeholzer

class Zentralgestirn {
    constructor(x, y, m) {
        this.pos = createVector(x, y); // Positionsvektor erstellen
        this.mass = m; // Masse definieren
        this.r = sqrt(this.mass) * 2; // Radius definieren
    }

    // Funktion zur Beeinflussung der Planeten
    attract(planet) {
        let force = p5.Vector.sub(this.pos, planet.pos); // Kraft berechnen
        let distanceSq = force.magSq();
        let G = 50; // Universale Variable G definieren, welche zur Skalierung der Simulation verwendet wird
        let strength = (G * (this.mass * planet.mass)) / distanceSq; // Stärke definieren
        force.setMag(strength);
        planet.applyForce(force); // Planet beeinflussen
    }

    // Showfunktion zum rendern des Zentralgetirns
    show() {
        noStroke(); // Liniendicke auf Null setzen
        fill(66, 75, 84); // Farbe definieren
        ellipse(this.pos.x, this.pos.y, 20); // Zentralgestirn rendern
    }
}