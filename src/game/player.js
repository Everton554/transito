export class Player {
  constructor(x, y, type = 'car') {
    this.x = x;
    this.y = y;

    this.angle = 0;
    this.speed = 0;

    this.type = type;

    this.maxSpeed = type === 'moto' ? 7 : 5;
    this.acceleration = type === 'moto' ? 0.18 : 0.15;
    this.friction = 0.08;
    this.turnSpeed = 0.045;

    this.width = type === 'moto' ? 24 : 34;
    this.height = type === 'moto' ? 42 : 58;
  }

  update(keys) {

    if (
      keys['ArrowUp'] ||
      keys['w'] ||
      keys['W']
    ) {
      this.speed += this.acceleration;
    }

    if (
      keys['ArrowDown'] ||
      keys['s'] ||
      keys['S']
    ) {
      this.speed -= this.acceleration;
    }

    if (
      !keys['ArrowUp'] &&
      !keys['ArrowDown'] &&
      !keys['w'] &&
      !keys['W'] &&
      !keys['s'] &&
      !keys['S']
    ) {
      if (this.speed > 0) {
        this.speed -= this.friction;
      }

      if (this.speed < 0) {
        this.speed += this.friction;
      }
    }

    this.speed = Math.max(
      -2,
      Math.min(this.maxSpeed, this.speed)
    );

    if (Math.abs(this.speed) > 0.1) {

      const direction =
        this.speed > 0 ? 1 : -1;

      if (
        keys['ArrowLeft'] ||
        keys['a'] ||
        keys['A']
      ) {
        this.angle -= this.turnSpeed * direction;
      }

      if (
        keys['ArrowRight'] ||
        keys['d'] ||
        keys['D']
      ) {
        this.angle += this.turnSpeed * direction;
      }
    }

    this.x += Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
  }

  getBounds() {
    return {
      x: this.x - this.width / 2,
      y: this.y - this.height / 2,
      width: this.width,
      height: this.height
    };
  }

  draw(ctx) {

    ctx.save();

    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    if (this.type === 'moto') {

      ctx.fillStyle = '#ef4444';

      ctx.fillRect(
        -8,
        -21,
        16,
        42
      );

      ctx.fillStyle = '#111827';

      ctx.beginPath();
      ctx.arc(0, -12, 6, 0, Math.PI * 2);
      ctx.fill();

    } else {

      ctx.fillStyle = '#2563eb';

      ctx.fillRect(
        -17,
        -29,
        34,
        58
      );

      ctx.fillStyle = '#93c5fd';

      ctx.fillRect(
        -11,
        -17,
        22,
        15
      );

      ctx.fillStyle = '#111827';

      ctx.fillRect(
        -19,
        -20,
        4,
        12
      );

      ctx.fillRect(
        15,
        -20,
        4,
        12
      );

      ctx.fillRect(
        -19,
        10,
        4,
        12
      );

      ctx.fillRect(
        15,
        10,
        4,
        12
      );
    }

    ctx.restore();
  }
}