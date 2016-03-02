'use strict';

class Synth {
  constructor() {
    this.ctx = new AudioContext;
  }

  // waveformで指定された波形の音を鳴らす
  playTone(key, duration, waveform) {
    let frequency = 440 * Math.pow(2, key / 12);

    let oscillator = this.ctx.createOscillator();
    oscillator.type = waveform;
    oscillator.frequency.value = frequency;
    oscillator.connect(this.ctx.destination);
    oscillator.start();
    oscillator.stop(this.ctx.currentTime + duration);
  }
}
