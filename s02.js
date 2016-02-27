'use strict';

class Synth {
  constructor() {
    this.ctx = new AudioContext;
  }

  // 標準周波数の矩形波を3秒間鳴らす
  testTone() {
    // 発生させる音の高さ
    let frequency = 440;

    // 秒数
    let duration = 3;

    // このコンテキストのサンプリング周波数(1秒間何フレームか)
    let sampleRate = this.ctx.sampleRate;

    // モノラル、3秒のバッファを作る
    let audioBuffer = this.ctx.createBuffer(1, sampleRate * duration, sampleRate);

    // 波形書き込み用のバッファを取得
    let buffer = audioBuffer.getChannelData(0);
    let frame = 1.0;

    // 周波数から波の一山の大きさを取得(概算)
    let waveLength = Math.ceil(sampleRate / frequency);

    // バッファに波形を書き込み
    for (let i = 0; i < audioBuffer.length; i++) {
      buffer[i] = frame * 0.5; // 1.0, -1.0だと音が大きすぎるので0.5
      if (i % waveLength == 0) {
        frame *= -1;
      }
    }

    // 音源を生成
    let source = this.ctx.createBufferSource();
    // 先ほど生成した波形を音源にセット
    source.buffer = audioBuffer;
    // 現在のコンテキストに音源を接続
    source.connect(this.ctx.destination);
    // 再生を開始
    source.start();
  }
}
