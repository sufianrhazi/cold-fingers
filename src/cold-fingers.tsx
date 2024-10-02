import Gooey, { calc, field, mount } from '@srhazi/gooey';

import { Keyboard } from './cold-fingers/Keyboard';

import './cold-fingers.css';

const ready = field(false);

const app = document.getElementById('app');
if (!app) {
    alert('RUH ROH, no #app element found');
} else {
    mount(
        app,
        <>
            <h1>Cold fingers</h1>
            {calc(() =>
                !ready.get() ? (
                    <button on:click={() => ready.set(true)}>
                        Click to start
                    </button>
                ) : (
                    <Keyboard />
                )
            )}
        </>
    );
}
