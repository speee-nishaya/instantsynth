'use strict'

class SimpleSampler {
  constructor(sampleFile) {
    this.buffer = null;
    this.ctx = new AudioContext;
    let request = new XMLHttpRequest;
    request.open('GET', sampleFile, true);
    request.responseType = 'arraybuffer';
    request.onload = () => {
      let audioData = request.response;
      this.ctx.decodeAudioData(audioData, (buffer) => {
        this.buffer = buffer;
      },
        function(e) {
          `Error with decoding audio data ${e.err}`
        });
    }
    request.send();
  }

  play(key) {
    if (this.buffer) {
      let source = this.ctx.createBufferSource();
      source.buffer = this.buffer;
      source.playbackRate.value = Math.pow(2, key / 12);
      source.connect(this.ctx.destination);
      source.start();
    }
  }
}
