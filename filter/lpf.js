'use strict';

class Synth {
  constructor() {
    this.ctx = new AudioContext;

    this.distortion = this.ctx.createWaveShaper();
    this.setDistortionCurve(22000);
    this.distortion.oversample = 'none';

    this.filter = this.ctx.createBiquadFilter();
    this.distortion.connect(this.filter);

    this.filter.type = 'lowpass';
    this.filter.frequency.value = 880.0;
    this.filter.Q.value = 10.0;
    this.filter.connect(this.ctx.destination);

  }

  setDistortionCurve(amount) {
    console.log(`setDistortionCurve: ${amount}`);
    var k = typeof amount === 'number' ? amount : 50,
      n_samples = 44100,
      curve = new Float32Array(n_samples),
      deg = Math.PI / 180,
      i = 0,
      x;
    for (; i < n_samples; ++i) {
      x = i * 2 / n_samples - 1;
      curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
    }
    this.distortion.curve = curve;
  }

  playTone(key, duration) {
    let frequency = 440 * Math.pow(2, key / 12);

    let oscillator = this.ctx.createOscillator();
    oscillator.type = 'sawtooth';
    oscillator.frequency.value = frequency;
    oscillator.connect(this.distortion);

    oscillator.start();
    oscillator.stop(this.ctx.currentTime + duration);
  }
}
