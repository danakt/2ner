/**
 * List of note numbers with octaves
 *
 * Oct. | Note numbers
 *      | C   C#    D    D#   E    F    F#   G    G#   A    A#   B
 * -----|-----------------------------------------------------------
 * -3   | 0    1    2    3    4    5    6    7    8    9    10   11
 * -2   | 12   13   14   15   16   17   18   19   20   21   22   23
 * -1   | 24   25   26   27   28   29   30   31   32   33   34   35
 *  0   | 36   37   38   39   40   41   42   43   44   45   46   47
 *  1   | 48   49   50   51   52   53   54   55   56   57   58   59
 *  2   | 60   61   62   63   64   65   66   67   68   69   70   71
 *  3   | 72   73   74   75   76   77   78   79   80   81   82   83
 *  4   | 84   85   86   87   88   89   90   91   92   93   94   95
 *  5   | 96   97   98   99   100  101  102  103  104  105  106  107
 *  6   | 108  109  110  111  112  113  114  115  116  117  118  119
 *  7   | 120  121  122  123  124  125  126  127
 */
const NOTE_STRINGS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

/**
 * Returns note number from pitch
 * @param  {number} frequency
 * @return {number}
 */
export function getNoteNumberFromPitch(frequency: number): number {
  const noteNum: number = 12 * (Math.log(frequency / 440) / Math.log(2));
  return Math.round(noteNum) + 69;
}

/**
 * Return pitch from notenumber
 * @param  {number} noteNumber
 * @return {number}
 */
export function getFrequencyFromNoteNumber(noteNumber: number): number {
  return 440 * Math.pow(2, (noteNumber - 69) / 12);
}

/**
 * Returns cent off from pitch
 * @param {number} frequency
 * @param {number} note
 */
export function getCentsOffFromPitch(frequency: number, note: number) {
  return Math.floor(1200 * (Math.log(frequency / getFrequencyFromNoteNumber(note)) / Math.log(2)));
}

/**
 * Returns note name from pitch
 * @param  {number} frequency
 * @return {string}
 */
export function getNoteNameFromPitch(frequency: number): string {
  return NOTE_STRINGS[getNoteNumberFromPitch(frequency) % 12];
}
