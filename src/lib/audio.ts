// Real track playback (the user's own licensed audio), analyzed live so the
// hero's bars are driven by actual FFT data — not a decorative loop.
"use client";

import * as Tone from "tone";

export const TRACK_SRC = "/audio/hero-track.mp3";
export const TRACK_LABEL = "Hip-Hop Beat 1";

let built = false;
let building: Promise<void> | null = null;
let playing = false;
let player: Tone.Player | null = null;
let analyser: Tone.Analyser | null = null;

async function build() {
  if (built) return;
  if (building) return building;
  building = (async () => {
    analyser = new Tone.Analyser("fft", 64);
    player = new Tone.Player({ url: TRACK_SRC, loop: true }).toDestination();
    player.connect(analyser);
    await Tone.loaded();
    built = true;
  })();
  return building;
}

export async function startAudio() {
  await Tone.start();
  await build();
  if (!player) return;
  player.start();
  playing = true;
}

export function pauseAudio() {
  player?.stop();
  playing = false;
}

export async function resumeAudio() {
  if (!built) {
    await startAudio();
    return;
  }
  player?.start();
  playing = true;
}

export function isPlaying() {
  return playing;
}

export function getFftLevels(): Float32Array | null {
  if (!analyser) return null;
  return analyser.getValue() as Float32Array;
}
