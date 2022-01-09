const LOWER_PITCH_CUTOFF = 30.0;
const SMALL_CUTOFF = 0.5;
const CUTOFF = 0.93;

// /**
//  * Calculates root mean square of audio buffer
//  */
// export function calculateRMS(audioBuffer: Float32Array): number {
//   const bufLength = audioBuffer.length;

//   const rms: number = audioBuffer.reduce((acc: number, item: number) => {
//     return acc + item ** 2;
//   }, 0);

//   return Math.sqrt(rms / bufLength);
// }

export function getPitch(buffer: Float32Array, sampleRate: number) {
  const nsdf = normalizedSquareDifference(buffer);
  const maxPositions = peakPicking(nsdf);
  const estimates = [];

  let highestAmplitude = Number.MIN_SAFE_INTEGER;

  for (let i of maxPositions) {
    highestAmplitude = Math.max(highestAmplitude, nsdf[i]);
    if (nsdf[i] > SMALL_CUTOFF) {
      let est = parabolicInterpolation(nsdf, i);
      estimates.push(est);
      highestAmplitude = Math.max(highestAmplitude, est[1]);
    }
  }

  if (estimates.length === 0) {
    return null;
  }

  const actualCutoff = CUTOFF * highestAmplitude;
  let period = 0.0;

  for (const est of estimates) {
    if (est[1] >= actualCutoff) {
      period = est[0];
      break;
    }
  }

  const pitchEst = sampleRate / period;

  return pitchEst > LOWER_PITCH_CUTOFF ? pitchEst : -1;
}

function peakPicking(nsdf: number[]) {
  const maxPositions = [];
  let pos = 0;
  let curMaxPos = 0;
  const len = nsdf.length;

  while (pos < (len - 1) / 3 && nsdf[pos] > 0.0) {
    pos++;
  }
  while (pos < len - 1 && nsdf[0] <= 0.0) {
    pos++;
  }

  if (pos === 0) {
    pos = 1;
  }

  while (pos < len - 1) {
    if (nsdf[pos] < nsdf[pos - 1] && nsdf[pos] >= nsdf[pos + 1]) {
      if (curMaxPos === 0) {
        curMaxPos = pos;
      } else if (nsdf[pos] > nsdf[curMaxPos]) {
        curMaxPos = pos;
      }
    }

    pos++;

    if (pos < len - 1 && nsdf[pos] <= 0.0) {
      if (curMaxPos > 0) {
        maxPositions.push(curMaxPos);
        curMaxPos = 0;
      }
      while (pos < len - 1 && nsdf[0] <= 0.0) {
        pos++;
      }
    }
  }

  if (curMaxPos > 0) {
    maxPositions.push(curMaxPos);
  }

  return maxPositions;
}

function normalizedSquareDifference(buffer: Float32Array) {
  const len = buffer.length;
  const nsdf: number[] = new Array(len).fill(0.0);

  for (let tau = 0; tau < len; tau++) {
    let acf = 0.0;
    let divisorM = 0.0;

    for (let i = 0; i < len - tau; i++) {
      acf += buffer[i] * buffer[i + tau];
      let el1 = buffer[i];
      let p1 = Math.pow(el1, 2);
      let el2 = buffer[i + tau];
      let p2 = Math.pow(el2, 2);
      divisorM += p1 + p2;
    }

    nsdf[tau] = (2.0 * acf) / divisorM;
  }

  return nsdf;
}

function parabolicInterpolation(nsdf: number[], tau: number) {
  const nsdfa = nsdf[tau - 1];
  const nsdfb = nsdf[tau];
  const nsdfc = nsdf[tau + 1];
  const bottom = nsdfc + nsdfa - 2.0 * nsdfb;

  if (bottom === 0.0) {
    return [tau, nsdfb];
  } else {
    let delta = nsdfa - nsdfc;
    return [tau + delta / (2.0 * bottom), nsdfb - (delta * delta) / (8.0 * bottom)];
  }
}
