'use strict'

class FMSynth {
  constructor() {
    this.modRatio = 0.3;

    let ctx = new AudioContext;
    this.modulator = ctx.createOscillator();
    this.modulator.type = 'square';
    this.carrier = ctx.createOscillator();
    this.carrier.type = 'square';

    this.modulatorGain = ctx.createGain();
    this.carrierGain = ctx.createGain();
    this.feedbackGain = ctx.createGain();

    this.modulator.connect(this.modulatorGain);
    this.modulatorGain.connect(this.carrier.frequency);
    this.carrier.connect(this.carrierGain);
    this.carrierGain.connect(ctx.destination);
    this.modulator.connect(this.feedbackGain);
    this.feedbackGain.connect(this.modulator.frequency);
  }

  setFrequency(frequency) {
    console.log(`setFrequency: ${frequency}`);
    this.frequency = frequency;

    this.modulator.frequency.value = this.modRatio * this.frequency;
    this.carrier.frequency.value = 0.5 * this.frequency;
    this.feedbackGain.gain.value = 0.1;
    this.modulatorGain.gain.value = (60 / 100) * 1024 * 5;
    this.carrierGain.gain.value = (99 / 100);
  }

  play(frequency) {
    if (this.playing) {
      return;
    }

    this.setFrequency(frequency);
    this.modulator.start(0);
    this.carrier.start(0);
    this.playing = true;
  }

  setModRatio(ratio) {
    console.log(`modRatio: ${ratio}`);
    this.modRatio = ratio;
    if (!this.playing) {
      return;
    }
    this.modulator.frequency.value = this.modRatio * this.frequency;
  }
}
