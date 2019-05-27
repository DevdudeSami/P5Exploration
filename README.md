# P5Exploration
Exploring p5.js

## Some links

[Web Index](https://devdudesami.github.io/P5Exploration/)

Currently, this is mainly used to demonstrate physical phenomena resulting from Newton's law of gravitation. At each frame, the gravitational force between each entity is calculated and applied. Collisions are also checked and accounted for.

Here are some nice simulations:

- [Planetary Motion Scene](https://devdudesami.github.io/P5Exploration/physics-engine/PlanetaryMotion.html): A sun, 2 planets, and a moon. Orbits are achieved by optimising the masses, radii, and initial applied impulse of each object.
- [Particle Collection Scene](https://devdudesami.github.io/P5Exploration/physics-engine/ParticleCollection.html): A grid of identical particles with restitution of 1, attracting and bouncing off each other.
- [Falling Objects Scene](https://devdudesami.github.io/P5Exploration/physics-engine/FallingObjects.html): Demonstrating that objects of different masses fall at the same rate when air resistance is not present. The ground is represented by a circle entity (the same as other objects) with a very large radius and mass. The gravitational forces between the falling objects also apply. The ground has a restitution of 1.

You can use the arrow keys to move the camera so you can follow entities.