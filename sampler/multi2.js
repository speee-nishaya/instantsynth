'use strict'


class DrumKit {
  constructor(numPads) {
    console.log("dk new");
    this.pads = new Array(numPads);


  }

  assign(slot, sampleFile, key) {
    console.log(`assign ${slot} ${sampleFile} ${key}`);
    this.pads[slot] = {
      sampler: new SimpleSampler(sampleFile),
      key: key
    };
  }

  play(padNumber) {
    if (this.pads[padNumber]) {
      this.pads[padNumber].sampler.play(this.pads[padNumber].key);
    }
  }
}


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
        this.setFx();
      },
        function(e) {
          `Error with decoding audio data ${e.err}`
        });
    }
    request.send();
  }

  setFx() {
    this.delay = this.ctx.createDelay(5.0);
    this.delay.delayTime.value = 0.15;
    this.gain = this.ctx.createGain();
    this.gain.gain.value = 0.3;
  }

  play(key) {
    if (this.buffer) {
      let source = this.ctx.createBufferSource();
      source.buffer = this.buffer;
      source.playbackRate.value = Math.pow(2, key / 12);

      source.connect(this.delay);
      this.delay.connect(this.gain);
      this.gain.connect(this.delay);
      this.gain.connect(this.ctx.destination);

      source.connect(this.ctx.destination);
      source.start();

    }
  }
}
