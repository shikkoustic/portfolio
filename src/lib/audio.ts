// A short, fully original generative lo-fi loop — not a streamed or sampled
// track, so there's nothing here to license. It exists so the hero's bar
// visualizer can react to real audio data instead of a fake decorative loop.
"use client";

import * as Tone from "tone";

export const BPM = 72;

let built = false;
let playing = false;
let analyser: Tone.Analyser | null = null;
let padSynth: Tone.PolySynth<Tone.FMSynth> | null = null;
let pluckSynth: Tone.PluckSynth | null = null;
let hat: Tone.NoiseSynth | null = null;
let chordLoop: Tone.Loop | null = null;
let hatLoop: Tone.Loop | null = null;

const CHORDS: string[][] = [
  ["C3", "E3", "G3", "B3"],
  ["A2", "C3", "E3", "G3"],
  ["F2", "A2", "C3", "E3"],
  ["G2", "B2", "D3", "F3"],
];

function build() {
  if (built) return;
  built = true;

  const filter = new Tone.Filter(1600, "lowpass").toDestination();
  analyser = new Tone.Analyser("fft", 64);
  filter.connect(analyser);

  const reverb = new Tone.Reverb({ decay: 3, wet: 0.25 }).connect(filter);

  padSynth = new Tone.PolySynth(Tone.FMSynth, {
    volume: -11,
    harmonicity: 1.5,
    modulationIndex: 2,
    envelope: { attack: 1.2, decay: 0.4, sustain: 0.6, release: 2.5 },
  }).connect(reverb);

  pluckSynth = new Tone.PluckSynth({ volume: -16, dampening: 3500 }).connect(reverb);

  hat = new Tone.NoiseSynth({
    volume: -30,
    noise: { type: "white" },
    envelope: { attack: 0.001, decay: 0.05, sustain: 0 },
  }).connect(filter);

  let chordIndex = 0;
  chordLoop = new Tone.Loop((time) => {
    const chord = CHORDS[chordIndex % CHORDS.length];
    padSynth?.triggerAttackRelease(chord, "2n", time);
    pluckSynth?.triggerAttack(chord[2], time + 0.5);
    chordIndex++;
  }, "1n");

  let hatStep = 0;
  hatLoop = new Tone.Loop((time) => {
    if (hatStep % 2 === 1) hat?.triggerAttack(time);
    hatStep++;
  }, "8n");

  Tone.getTransport().bpm.value = BPM;
}

export async function startAudio() {
  await Tone.start();
  build();
  chordLoop?.start(0);
  hatLoop?.start(0);
  Tone.getTransport().start();
  playing = true;
}

export function pauseAudio() {
  Tone.getTransport().pause();
  playing = false;
}

export function resumeAudio() {
  if (!built) return;
  Tone.getTransport().start();
  playing = true;
}

export function isPlaying() {
  return playing;
}

export function getFftLevels(): Float32Array | null {
  if (!analyser) return null;
  return analyser.getValue() as Float32Array;
}
