import Gooey, { calc, Component, Dyn, dynGet, field } from '@srhazi/gooey';

import './KeyboardKey.css';

export const KeyboardKey: Component<{
    hue: string;
    saturation: string;
    key: string;
    isPressed: Dyn<boolean>;
}> = ({ key, isPressed, hue, saturation }, { onMount }) => {
    return (
        <div
            cssprop:hue={hue}
            cssprop:saturation={saturation}
            class={calc(() =>
                dynGet(isPressed)
                    ? 'KeyboardKey KeyboardKey--pressed'
                    : 'KeyboardKey'
            )}
        >
            {key}
        </div>
    );
};
