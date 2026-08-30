// Web Audio API Synthesizer & Sound Sampler Engine for MusicMart

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play synth sound for specific instrument types
 * @param {string} instrumentType - 'guitar', 'piano', 'synth', 'drums', 'violin', 'brass', 'dj'
 * @param {number} baseFreq - Base frequency in Hz (e.g. 440 for A4, 261.63 for C4)
 */
export function playInstrumentPreview(instrumentType = 'guitar', baseFreq = 440) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    switch (instrumentType) {
      case 'guitar': {
        // Electric / Acoustic Guitar strum sequence
        const freqs = [baseFreq, baseFreq * 1.25, baseFreq * 1.5, baseFreq * 2];
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);

          // Low pass filter for guitar tone warmth
          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(1200, now);

          gain.gain.setValueAtTime(0.001, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.3, now + idx * 0.08 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 1.2);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 1.3);
        });
        break;
      }

      case 'piano': {
        // Grand Piano rich harmonic triad
        const chord = [baseFreq, baseFreq * 1.26, baseFreq * 1.498];
        chord.forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.4, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + 2.0);
        });
        break;
      }

      case 'synth': {
        // Modern Synth Lead with pitch slide
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(baseFreq * 0.5, now);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.3);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2500, now);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 1.5);
        break;
      }

      case 'drums': {
        // Drum beat: Kick + Snare + Hi-Hat pattern
        // 1. Kick
        const kickOsc = ctx.createOscillator();
        const kickGain = ctx.createGain();
        kickOsc.frequency.setValueAtTime(150, now);
        kickOsc.frequency.exponentialRampToValueAtTime(0.01, now + 0.4);
        kickGain.gain.setValueAtTime(0.8, now);
        kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        kickOsc.connect(kickGain);
        kickGain.connect(ctx.destination);
        kickOsc.start(now);
        kickOsc.stop(now + 0.4);

        // 2. Snare at 0.25s
        const snareNoise = ctx.createBufferSource();
        const bufferSize = ctx.sampleRate * 0.2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        snareNoise.buffer = buffer;

        const snareFilter = ctx.createBiquadFilter();
        snareFilter.type = 'highpass';
        snareFilter.frequency.value = 1000;

        const snareGain = ctx.createGain();
        snareGain.gain.setValueAtTime(0.4, now + 0.25);
        snareGain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);

        snareNoise.connect(snareFilter);
        snareFilter.connect(snareGain);
        snareGain.connect(ctx.destination);

        snareNoise.start(now + 0.25);
        snareNoise.stop(now + 0.45);
        break;
      }

      case 'violin': {
        // Sustained bowed Violin string effect with vibrato
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(baseFreq, now);

        // Vibrato
        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(5, now); // 5Hz vibrato
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(8, now);
        lfo.connect(osc.frequency);
        lfo.start(now);
        lfo.stop(now + 2.5);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.35, now + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(baseFreq * 1.5, now);
        filter.Q.value = 3;

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 2.5);
        break;
      }

      case 'brass': {
        // Trumpet/Brass swell
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(baseFreq, now);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(300, now);
        filter.frequency.exponentialRampToValueAtTime(3000, now + 0.3);
        filter.frequency.exponentialRampToValueAtTime(400, now + 1.8);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.4, now + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 1.8);
        break;
      }

      default: {
        // Generic tone
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(baseFreq, now);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.0);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 1.0);
        break;
      }
    }
  } catch (err) {
    console.error('Audio Preview error:', err);
  }
}
