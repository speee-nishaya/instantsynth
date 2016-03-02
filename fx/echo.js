"use strict";

class Synth {
  constructor() {
    this.ctx = new AudioContext;
    this.fx = true;
    this.delay = this.ctx.createDelay(5.0);
    this.delay.delayTime.value = 0.2;
    this.gain = this.ctx.createGain();
    this.gain.gain.value = 0.2;
  }

  /**
   * @param [boolean] enable trueならエコーon, falseならoff
   */
  fx(enable) {
    //
  }

  /**
   * @param [number] key C3を0とするキー
   * @param [number] duration 音の持続秒数
   */
  play(key, duration) {
    let freq = 440 * Math.pow(2, (-9 + key) / 12);
    let osc = this.ctx.createOscillator();
    osc.frequency.value = freq;
    osc.type = 'square';
    osc.connect(this.delay);
    this.delay.connect(this.gain);
    this.gain.connect(this.delay);
    this.gain.connect(this.ctx.destination);


    osc.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }
}
