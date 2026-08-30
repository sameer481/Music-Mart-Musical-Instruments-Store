// Professional Web Audio API Synthesizer & Sound Sampler Engine
// Features high-fidelity DSP synthesis, ADSR envelopes, DSP Reverb & Delay effects, and live frequency analysis

let audioCtx = null;
let masterGain = null;
let reverbNode = null;
let delayNode = null;
let analyserNode = null;

// Global FX state
let fxSettings = {
  reverbEnabled: true,
  delayEnabled: true,
  reverbMix: 0.35,
  delayMix: 0.25,
  masterVolume: 0.8,
  octaveOffset: 0
};

/**
 * Initialize audio context with effects chain
 */
export function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContextClass();

    // Master Gain
    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(fxSettings.masterVolume, audioCtx.currentTime);

    // Analyser Node for Visualizers
    analyserNode = audioCtx.createAnalyser();
    analyserNode.fftSize = 64;
    analyserNode.smoothingTimeConstant = 0.8;

    // Delay Node (220ms feedback delay)
    delayNode = audioCtx.createDelay();
    delayNode.delayTime.setValueAtTime(0.22, audioCtx.currentTime);

    const delayFeedback = audioCtx.createGain();
    delayFeedback.gain.setValueAtTime(0.3, audioCtx.currentTime);

    const delayFilter = audioCtx.createBiquadFilter();
    delayFilter.type = 'lowpass';
    delayFilter.frequency.setValueAtTime(2000, audioCtx.currentTime);

    delayNode.connect(delayFilter);
    delayFilter.connect(delayFeedback);
    delayFeedback.connect(delayNode); // Feedback loop

    // Reverb Node (Impulse Response Generator)
    reverbNode = audioCtx.createConvolver();
    reverbNode.buffer = createImpulseResponse(audioCtx, 1.8, 2.0);

    // Connect Chain to Destination
    masterGain.connect(analyserNode);
    analyserNode.connect(audioCtx.destination);
  }

  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Generate synthetic reverb impulse response buffer
 */
function createImpulseResponse(ctx, duration = 1.8, decay = 2.0) {
  const sampleRate = ctx.sampleRate;
  const length = sampleRate * duration;
  const impulse = ctx.createBuffer(2, length, sampleRate);
  const left = impulse.getChannelData(0);
  const right = impulse.getChannelData(1);

  for (let i = 0; i < length; i++) {
    const n = length - i;
    left[i] = (Math.random() * 2 - 1) * Math.pow(n / length, decay);
    right[i] = (Math.random() * 2 - 1) * Math.pow(n / length, decay);
  }
  return impulse;
}

/**
 * Get live audio frequency data array for canvas visualizers
 */
export function getAudioFrequencyData(dataArray) {
  if (analyserNode) {
    analyserNode.getByteFrequencyData(dataArray);
  } else {
    dataArray.fill(0);
  }
}

/**
 * Update FX settings dynamically
 */
export function setFxSettings(newSettings) {
  fxSettings = { ...fxSettings, ...newSettings };
  if (masterGain && audioCtx) {
    masterGain.gain.setValueAtTime(fxSettings.masterVolume, audioCtx.currentTime);
  }
}

export function getFxSettings() {
  return fxSettings;
}

/**
 * Connect sound node output through FX chain (Dry + Reverb + Delay)
 */
function connectThroughFx(sourceNode, now, gainLevel = 1.0) {
  const ctx = getAudioContext();
  const directGain = ctx.createGain();
  directGain.gain.setValueAtTime(gainLevel, now);

  sourceNode.connect(directGain);
  directGain.connect(masterGain);

  if (fxSettings.delayEnabled && delayNode) {
    const delaySend = ctx.createGain();
    delaySend.gain.setValueAtTime(fxSettings.delayMix * gainLevel, now);
    sourceNode.connect(delaySend);
    delaySend.connect(delayNode);
    delayNode.connect(masterGain);
  }

  if (fxSettings.reverbEnabled && reverbNode) {
    const reverbSend = ctx.createGain();
    reverbSend.gain.setValueAtTime(fxSettings.reverbMix * gainLevel, now);
    sourceNode.connect(reverbSend);
    reverbSend.connect(reverbNode);
    reverbNode.connect(masterGain);
  }
}

/**
 * Play high-fidelity synthesizer note / instrument preview
 * @param {string} instrumentType - 'guitar', 'piano', 'synth', 'drums', 'violin', 'brass', 'dj', 'lofi'
 * @param {number} rawFreq - Base frequency in Hz
 */
export function playInstrumentPreview(instrumentType = 'guitar', rawFreq = 440) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Apply Octave multiplier
    const octaveMultiplier = Math.pow(2, fxSettings.octaveOffset || 0);
    const baseFreq = rawFreq * octaveMultiplier;

    switch (instrumentType) {
      case 'guitar': {
        // Acoustic / Electric Polyphonic Strum with harmonics
        const chordMultipliers = [1, 1.25, 1.498, 1.88, 2.25];
        chordMultipliers.forEach((mult, idx) => {
          const stringFreq = baseFreq * mult;
          const osc = ctx.createOscillator();
          const subOsc = ctx.createOscillator();
          const gain = ctx.createGain();
          const filter = ctx.createBiquadFilter();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(stringFreq, now + idx * 0.05);

          subOsc.type = 'triangle';
          subOsc.frequency.setValueAtTime(stringFreq * 0.5, now + idx * 0.05);

          // Warm Lowpass Filter pluck contour
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(1800, now + idx * 0.05);
          filter.frequency.exponentialRampToValueAtTime(350, now + idx * 0.05 + 1.2);

          // Pluck ADSR
          gain.gain.setValueAtTime(0.001, now + idx * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.35, now + idx * 0.05 + 0.015);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 1.6);

          osc.connect(filter);
          subOsc.connect(filter);
          connectThroughFx(filter, now + idx * 0.05, 0.4);

          osc.start(now + idx * 0.05);
          subOsc.start(now + idx * 0.05);
          osc.stop(now + idx * 0.05 + 1.7);
          subOsc.stop(now + idx * 0.05 + 1.7);
        });
        break;
      }

      case 'piano': {
        // Concert Grand Piano with realistic hammer attack noise & sub harmonics
        const harmonicRatios = [1.0, 2.0, 3.01, 4.02];
        const harmonicGains = [0.5, 0.25, 0.12, 0.05];

        harmonicRatios.forEach((ratio, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = i === 0 ? 'triangle' : 'sine';
          osc.frequency.setValueAtTime(baseFreq * ratio, now);

          // Piano decay curve
          gain.gain.setValueAtTime(0.001, now);
          gain.gain.exponentialRampToValueAtTime(harmonicGains[i], now + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

          connectThroughFx(osc, now, 0.5);

          osc.start(now);
          osc.stop(now + 2.3);
        });

        // Hammer click transient
        const noise = ctx.createBufferSource();
        const buf = ctx.createBuffer(1, ctx.sampleRate * 0.03, ctx.sampleRate);
        const data = buf.getChannelData(0);
        for (let j = 0; j < data.length; j++) data[j] = Math.random() * 2 - 1;
        noise.buffer = buf;

        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.setValueAtTime(1400, now);
        noiseFilter.Q.setValueAtTime(2, now);

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.15, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

        noise.connect(noiseFilter);
        connectThroughFx(noiseFilter, now, 0.3);

        noise.start(now);
        noise.stop(now + 0.03);
        break;
      }

      case 'synth': {
        // Modern Fat Sawtooth + Pulse Lead with Filter Envelope Glide
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(baseFreq * 0.995, now);

        osc2.type = 'square';
        osc2.frequency.setValueAtTime(baseFreq * 1.005, now);

        // Filter Envelope opening up
        filter.type = 'lowpass';
        filter.Q.setValueAtTime(4, now);
        filter.frequency.setValueAtTime(400, now);
        filter.frequency.exponentialRampToValueAtTime(3200, now + 0.15);
        filter.frequency.exponentialRampToValueAtTime(600, now + 1.4);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.4, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);

        osc1.connect(filter);
        osc2.connect(filter);
        connectThroughFx(filter, now, 0.5);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 1.5);
        osc2.stop(now + 1.5);
        break;
      }

      case 'drums': {
        // Multi-layered Kick, Snare & Open Hi-Hat Beat Sequence
        // 1. Heavy Punchy Kick Drum
        const kickOsc = ctx.createOscillator();
        const kickGain = ctx.createGain();
        kickOsc.frequency.setValueAtTime(160, now);
        kickOsc.frequency.exponentialRampToValueAtTime(28, now + 0.15);
        kickGain.gain.setValueAtTime(0.9, now);
        kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        connectThroughFx(kickOsc, now, 0.7);
        kickOsc.start(now);
        kickOsc.stop(now + 0.35);

        // 2. Snare drum at 0.2s
        const snareTime = now + 0.18;
        const snareNoise = ctx.createBufferSource();
        const sBuf = ctx.createBuffer(1, ctx.sampleRate * 0.18, ctx.sampleRate);
        const sData = sBuf.getChannelData(0);
        for (let k = 0; k < sData.length; k++) sData[k] = Math.random() * 2 - 1;
        snareNoise.buffer = sBuf;

        const snareFilter = ctx.createBiquadFilter();
        snareFilter.type = 'highpass';
        snareFilter.frequency.setValueAtTime(1200, snareTime);

        const snareGain = ctx.createGain();
        snareGain.gain.setValueAtTime(0.5, snareTime);
        snareGain.gain.exponentialRampToValueAtTime(0.001, snareTime + 0.2);

        snareNoise.connect(snareFilter);
        connectThroughFx(snareFilter, snareTime, 0.6);
        snareNoise.start(snareTime);
        snareNoise.stop(snareTime + 0.2);

        // 3. Crisp Hi-Hat at 0.36s
        const hatTime = now + 0.36;
        const hatNoise = ctx.createBufferSource();
        const hBuf = ctx.createBuffer(1, ctx.sampleRate * 0.08, ctx.sampleRate);
        const hData = hBuf.getChannelData(0);
        for (let l = 0; l < hData.length; l++) hData[l] = Math.random() * 2 - 1;
        hatNoise.buffer = hBuf;

        const hatFilter = ctx.createBiquadFilter();
        hatFilter.type = 'highpass';
        hatFilter.frequency.setValueAtTime(7000, hatTime);

        const hatGain = ctx.createGain();
        hatGain.gain.setValueAtTime(0.3, hatTime);
        hatGain.gain.exponentialRampToValueAtTime(0.001, hatTime + 0.08);

        hatNoise.connect(hatFilter);
        connectThroughFx(hatFilter, hatTime, 0.4);
        hatNoise.start(hatTime);
        hatNoise.stop(hatTime + 0.08);
        break;
      }

      case 'violin': {
        // Bowed String section with 5.5Hz Vibrato & Expressive Swell
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(baseFreq, now);

        // LFO Vibrato
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(5.5, now);
        lfoGain.gain.setValueAtTime(9.0, now);
        lfo.connect(osc.frequency);
        lfo.start(now);
        lfo.stop(now + 2.8);

        // Resonant String Filter
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(baseFreq * 1.4, now);
        filter.Q.setValueAtTime(2.5, now);

        // Violin Bow Attack & Sustain Envelope
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.4, now + 0.25);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

        osc.connect(filter);
        connectThroughFx(filter, now, 0.5);

        osc.start(now);
        osc.stop(now + 2.8);
        break;
      }

      case 'brass': {
        // Symphonic Horn Swell with Filter sweep
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();

        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(baseFreq, now);

        osc2.type = 'sawtooth';
        osc2.frequency.setValueAtTime(baseFreq * 1.003, now); // Detuned brass chorus

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(250, now);
        filter.frequency.exponentialRampToValueAtTime(3400, now + 0.3);
        filter.frequency.exponentialRampToValueAtTime(350, now + 2.0);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.5, now + 0.18);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);

        osc1.connect(filter);
        osc2.connect(filter);
        connectThroughFx(filter, now, 0.5);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 2.0);
        osc2.stop(now + 2.0);
        break;
      }

      case 'lofi': {
        // Warm Lo-Fi FM Rhodes Electric Piano
        const carrier = ctx.createOscillator();
        const modulator = ctx.createOscillator();
        const modGain = ctx.createGain();
        const gain = ctx.createGain();

        carrier.type = 'sine';
        carrier.frequency.setValueAtTime(baseFreq, now);

        modulator.type = 'sine';
        modulator.frequency.setValueAtTime(baseFreq * 2.0, now);

        modGain.gain.setValueAtTime(baseFreq * 0.8, now);
        modGain.gain.exponentialRampToValueAtTime(10, now + 1.2);

        modulator.connect(carrier.frequency);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.45, now + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

        modulator.start(now);
        connectThroughFx(carrier, now, 0.45);
        carrier.start(now);

        modulator.stop(now + 2.2);
        carrier.stop(now + 2.2);
        break;
      }

      default: {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(baseFreq, now);
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.0);
        connectThroughFx(osc, now, 0.4);
        osc.start(now);
        osc.stop(now + 1.0);
        break;
      }
    }
  } catch (err) {
    console.error('Audio Synth Engine Error:', err);
  }
}

/**
 * UI Audio Chime for Toast alerts / button feedback
 */
export function playUiChime(type = 'success') {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    if (type === 'success') {
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.08); // E5
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.16); // G5
    } else {
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(349.23, now + 0.1);
    }

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.35);
  } catch (e) {
    // Ignore audio error
  }
}
