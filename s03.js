'use strict';

class Synth {
  constructor() {
    this.ctx = new AudioContext;
  }

  // keyで指定された高さの矩形波をdurationの秒数鳴らす
  playTone(key, duration) {
    let frequency = 440 * Math.pow(2, key / 12);
    let sampleRate = this.ctx.sampleRate;
    let audioBuffer = this.ctx.createBuffer(1, sampleRate * duration, sampleRate);
    let buffer = audioBuffer.getChannelData(0);
    let frame = 1.0;
    let waveLength = Math.ceil(sampleRate / frequency);
    for (let i = 0; i < audioBuffer.length; i++) {
      buffer[i] = frame * 0.5; // 1.0, -1.0だと音が大きすぎるので0.5
      if (i % waveLength == 0) {
        frame *= -1;
      }
    }

    let source = this.ctx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(this.ctx.destination);
    source.start();
  }
}
