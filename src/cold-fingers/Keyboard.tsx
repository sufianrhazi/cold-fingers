import Gooey, {
    calc,
    collection,
    Component,
    field,
    model,
} from '@srhazi/gooey';

import { KeyboardKey } from './KeyboardKey';

const rows = [
    '1234567890'.split(''),
    'qwertyuiop'.split(''),
    'asdfghjkl;'.split(''),
    'zxcvbnm,./'.split(''),
] as (keyof typeof keyToCode)[][];

const numRows = rows.length;
const numCols = 10;

const keyToCode = {
    '1': 'Digit1',
    '2': 'Digit2',
    '3': 'Digit3',
    '4': 'Digit4',
    '5': 'Digit5',
    '6': 'Digit6',
    '7': 'Digit7',
    '8': 'Digit8',
    '9': 'Digit9',
    '0': 'Digit0',
    '-': 'Minus',
    '=': 'Equal',
    a: 'KeyA',
    b: 'KeyB',
    c: 'KeyC',
    d: 'KeyD',
    e: 'KeyE',
    f: 'KeyF',
    g: 'KeyG',
    h: 'KeyH',
    i: 'KeyI',
    j: 'KeyJ',
    k: 'KeyK',
    l: 'KeyL',
    m: 'KeyM',
    n: 'KeyN',
    o: 'KeyO',
    p: 'KeyP',
    q: 'KeyQ',
    r: 'KeyR',
    s: 'KeyS',
    t: 'KeyT',
    u: 'KeyU',
    v: 'KeyV',
    w: 'KeyW',
    x: 'KeyX',
    y: 'KeyY',
    z: 'KeyZ',
    ';': 'Semicolon',
    "'": 'Quote',
    ',': 'Comma',
    '.': 'Period',
    '/': 'Slash',
};
const codeToKey: Record<string, keyof typeof keyToCode> = {
    Digit1: '1',
    Digit2: '2',
    Digit3: '3',
    Digit4: '4',
    Digit5: '5',
    Digit6: '6',
    Digit7: '7',
    Digit8: '8',
    Digit9: '9',
    Digit0: '0',
    Minus: '-',
    Equal: '=',
    KeyA: 'a',
    KeyB: 'b',
    KeyC: 'c',
    KeyD: 'd',
    KeyE: 'e',
    KeyF: 'f',
    KeyG: 'g',
    KeyH: 'h',
    KeyI: 'i',
    KeyJ: 'j',
    KeyK: 'k',
    KeyL: 'l',
    KeyM: 'm',
    KeyN: 'n',
    KeyO: 'o',
    KeyP: 'p',
    KeyQ: 'q',
    KeyR: 'r',
    KeyS: 's',
    KeyT: 't',
    KeyU: 'u',
    KeyV: 'v',
    KeyW: 'w',
    KeyX: 'x',
    KeyY: 'y',
    KeyZ: 'z',
    Semicolon: ';',
    Quote: "'",
    Comma: ',',
    Period: '.',
    Slash: '/',
};

const getFrequency = function (baseFreq: number, numSemitones: number) {
    return baseFreq * Math.pow(Math.pow(2, 1 / 12), numSemitones);
};

const keyFrequency = {
    '1': getFrequency(880, 0),
    '2': getFrequency(880, 2),
    '3': getFrequency(880, 4),
    '4': getFrequency(880, 5),
    '5': getFrequency(880, 7),
    '6': getFrequency(880, 9),
    '7': getFrequency(880, 11),
    '8': getFrequency(880, 12),
    '9': getFrequency(880, 14),
    '0': getFrequency(880, 16),
    '-': getFrequency(880, 17),
    '=': getFrequency(880, 19),
    q: getFrequency(440, 0),
    w: getFrequency(440, 2),
    e: getFrequency(440, 4),
    r: getFrequency(440, 5),
    t: getFrequency(440, 7),
    y: getFrequency(440, 9),
    u: getFrequency(440, 11),
    i: getFrequency(440, 12),
    o: getFrequency(440, 14),
    p: getFrequency(440, 16),
    a: getFrequency(220, 0),
    s: getFrequency(220, 2),
    d: getFrequency(220, 4),
    f: getFrequency(220, 5),
    g: getFrequency(220, 7),
    h: getFrequency(220, 9),
    j: getFrequency(220, 11),
    k: getFrequency(220, 12),
    l: getFrequency(220, 14),
    ';': getFrequency(220, 16),
    z: getFrequency(110, 0),
    x: getFrequency(110, 2),
    c: getFrequency(110, 4),
    v: getFrequency(110, 5),
    b: getFrequency(110, 7),
    n: getFrequency(110, 9),
    m: getFrequency(110, 11),
    ',': getFrequency(110, 12),
    '.': getFrequency(110, 14),
    '/': getFrequency(110, 16),
};

export const Keyboard: Component = (props, { onMount }) => {
    const audioContext = new AudioContext({
        latencyHint: 'interactive',
    });
    const gain = audioContext.createGain();
    gain.gain.value = 0.3;
    gain.connect(audioContext.destination);
    const oscillators = Object.fromEntries(
        Object.entries(keyFrequency).map(([key, freq]) => {
            const oscillatorGain = audioContext.createGain();
            oscillatorGain.gain.value = 0;
            oscillatorGain.connect(gain);
            const oscillator = audioContext.createOscillator();
            oscillator.frequency.value = freq;
            oscillator.connect(oscillatorGain);
            oscillator.start(audioContext.currentTime);
            return [key, { oscillator, oscillatorGain }];
        })
    );

    const pressedState = model({
        '1': false,
        '2': false,
        '3': false,
        '4': false,
        '5': false,
        '6': false,
        '7': false,
        '8': false,
        '9': false,
        '0': false,
        '-': false,
        '=': false,
        a: false,
        b: false,
        c: false,
        d: false,
        e: false,
        f: false,
        g: false,
        h: false,
        i: false,
        j: false,
        k: false,
        l: false,
        m: false,
        n: false,
        o: false,
        p: false,
        q: false,
        r: false,
        s: false,
        t: false,
        u: false,
        v: false,
        w: false,
        x: false,
        y: false,
        z: false,
        ';': false,
        "'": false,
        ',': false,
        '.': false,
        '/': false,
    });
    const timings = collection<number>([]);
    let lastTime: number | null = null;
    let lastDelta: number | null = null;
    const exponentialMovingAverage = field<null | number>(null);
    onMount(() => {
        document.body.addEventListener('keydown', (e) => {
            const now = performance.now();
            const currentTime = audioContext.currentTime;
            if (e.repeat) {
                return;
            }
            timings.push(now);
            if (timings.length > 10) {
                timings.shift();
            }
            if (e.code in codeToKey && codeToKey[e.code]) {
                if (oscillators[codeToKey[e.code]]) {
                    oscillators[
                        codeToKey[e.code]
                    ].oscillatorGain.gain.linearRampToValueAtTime(
                        1 / 42,
                        currentTime + 0.1
                    );
                }
                pressedState[codeToKey[e.code]] = true;
            }
            if (lastTime !== null) {
                const delta = now - lastTime;
                if (exponentialMovingAverage.get() === null) {
                    exponentialMovingAverage.set(delta);
                } else {
                    const prev = exponentialMovingAverage.get()!;
                    const smoothingFactor = 0.1;
                    const s1 =
                        smoothingFactor * delta + (1 - smoothingFactor) * prev;
                    exponentialMovingAverage.set(s1);
                }
            }
            lastTime = now;
        });
        document.body.addEventListener('keyup', (e) => {
            const currentTime = audioContext.currentTime;
            if (e.code in codeToKey && codeToKey[e.code]) {
                if (oscillators[codeToKey[e.code]]) {
                    oscillators[
                        codeToKey[e.code]
                    ].oscillatorGain.gain.linearRampToValueAtTime(
                        0,
                        currentTime + 0.5
                    );
                }
                pressedState[codeToKey[e.code]] = false;
            }
        });
    });

    const items: JSX.Node[] = [];
    for (let i = 0; i < 10 - 1; ++i) {
        items.push(
            <li>
                {calc(() =>
                    i + 1 < timings.length
                        ? `${(timings[i + 1] - timings[i]).toFixed(2)}ms`
                        : '...'
                )}
            </li>
        );
    }

    return (
        <div>
            <div>
                {rows.map((row, rowIndex) => (
                    <div>
                        {row.map((key, keyIndex) => (
                            <KeyboardKey
                                hue={`${(360 * keyIndex) / numCols}deg`}
                                saturation={`${100 * (0.25 + (0.5 * rowIndex) / numRows)}%`}
                                key={key}
                                isPressed={calc(() => pressedState[key])}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <p></p>
            <ul>{items}</ul>
            <p>
                Exp weighted average:{' '}
                {calc(() => {
                    const msPerBeat = exponentialMovingAverage.get();
                    if (msPerBeat === null) {
                        return 'N/A';
                    }
                    return `${msPerBeat.toFixed(2)}ms`;
                })}
            </p>
        </div>
    );
};
