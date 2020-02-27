import Darken from './index'

const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn()
};
// eslint-disable-next-line no-undef
global.localStorage = localStorageMock;

// eslint-disable-next-line no-undef
global.window = {};
const mockAddListener = jest.fn();
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: mockAddListener, // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

const documentMock = {
    addEventListener: jest.fn(),
    dispatchEvent: jest.fn()
};
// eslint-disable-next-line no-undef
global.document = documentMock;
const mockAddEventListener = jest.fn();
Object.defineProperty(document, 'querySelector', {
    writable: true,
    value: jest.fn().mockImplementation(() => ({
        addEventListener: mockAddEventListener,
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

const EventMock = jest.fn();
// eslint-disable-next-line no-undef
global.Event = EventMock;

describe('Darken Class', () => {

    test('it Should default to dark by default', () => {
        const darken = new Darken({
            usePrefersColorScheme: false // avoid clashing with the mock
        });
        expect(darken.dark).toEqual(false)
    })

    test('It should listen to darken-light events when instantiated', () => {
        new Darken();

        const actual = document.addEventListener.mock.calls.some((item) => item.includes('darken-light'));

        expect(actual).toEqual(true)
    })

    test('Should allow function to be sent first', () => {
        const instantiate = () => {
            new Darken(() => { }, {
                default: 'dark'
            });
        }

        expect(instantiate).not.toThrow()
    })

    test('It should listen to darken-dark events when instantiated', () => {
        new Darken();

        const actual = document.addEventListener.mock.calls.some((item) => item.includes('darken-dark'));

        expect(actual).toEqual(true)
    })

    test('Should try to put off darken when default is light and launch darken light event', () => {
        Darken.off = jest.fn()
        const darken = new Darken({
            usePrefersColorScheme: false, // avoid clashing with the mock
            default: "light"
        });

        expect(darken.dark).toBe(false)
        expect(Event.mock.calls.some((item) => item.includes('darken-light'))).toBe(true)
    })

    test('Should try to put on darken when default is light and launch darken dark event', () => {
        const darken = new Darken({
            default: "dark"
        });

        expect(darken.dark).toBe(true)
        expect(Event.mock.calls.some((item) => item.includes('darken-dark'))).toBe(true)
    })

    test('It Should grab the default option from localStorage if remember is enabled', () => {
        localStorage.getItem.mockImplementation(() => {
            return 'dark'
        })

        const darken = new Darken({
            remember: 'darken-mode'
        });


        expect(darken.dark).toBe(true)
        expect(localStorage.getItem.mock.calls.length).toBe(2)
    })

    test('It should not grab default option from localstorage if remember is enabled but localStorage does not contain anything', () => {
        localStorage.getItem.mockImplementation(() => {
            return null
        })

        const darken = new Darken({
            usePrefersColorScheme: false, // avoid clashing with the mock
            remember: 'darken-mode'
        });


        expect(darken.dark).toBe(false)
        expect(localStorage.getItem.mock.calls.length).toBe(1)

    })

    test('It should check prefers-color-scheme when the localStorage is empty and usePrefersColorScheme is activated', () => {
        localStorage.getItem.mockImplementation(() => {
            return null
        })

        window.matchMedia.mockImplementation(() => {
            return true;
        })

        new Darken({
            remember: 'darken-mode',
            usePrefersColorScheme: true
        });


        expect(window.matchMedia.mock.calls.length).toBe(1)
        expect(localStorage.getItem.mock.calls.length).toBe(1)

    })

    test('It should activate light when color scheme light is activated and remember is true', () => {
        localStorage.getItem.mockImplementation(() => {
            return null
        })

        window.matchMedia.mockImplementation((item) => {
            if (item === "(prefers-color-scheme: light)") return true;
            return false;
        })

        const darken = new Darken({
            remember: 'darken-mode',
            usePrefersColorScheme: true
        });


        expect(darken.dark).toBe(false)
        expect(window.matchMedia.mock.calls.length).toBe(2)
        expect(localStorage.getItem.mock.calls.length).toBe(1)

    })

    test('It should activate dark when color scheme dark is activated and remember is false', () => {
        localStorage.getItem.mockImplementation(() => {
            return null
        })

        window.matchMedia.mockImplementation((item) => {
            if (item === "(prefers-color-scheme: dark)") return true;
            return false;
        })

        const darken = new Darken({
            remember: 'darken-mode',
            usePrefersColorScheme: true
        });


        expect(darken.dark).toBe(true)

    })

    test('It should listen to prefered color scheme changes when remember is deactivated and we usePreferColorScheme', () => {

        const mockAddListener = jest.fn();
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: mockAddListener, // deprecated
                removeListener: jest.fn(), // deprecated
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            })),
        });

        new Darken({
            remember: false,
            usePrefersColorScheme: true
        });

        expect(mockAddListener.mock.calls.length).toBe(2);

    })

    test('It should add an event listener if a toggle is passed to it', () => {
        new Darken({
            toggle: '#testelement'
        });

        expect(mockAddEventListener.mock.calls.length).toBe(1)
    })

    describe('Toggle method', () => {
        test('It should invert current mode', () => {
            const darkenLight = new Darken({
                default: 'light',
                usePrefersColorScheme: false// avoid clashing with the mock
            });
            const darkenDark = new Darken({
                default: 'dark',
                usePrefersColorScheme: false// avoid clashing with the mock
            });

            darkenLight.toggle();
            darkenDark.toggle();


            expect(darkenLight.dark).toBe(true)
            expect(darkenDark.dark).toBe(false)
        })

        test('it should trigger the right event', () => {

            const darkenLight = new Darken({
                default: 'light',
                usePrefersColorScheme: false// avoid clashing with the mock
            });
            Event.mockClear();// Clear constructor events
            darkenLight.toggle();
            expect(Event.mock.calls).toEqual([['darken-dark']])

            const darkenDark = new Darken({
                default: 'dark',
                usePrefersColorScheme: false// avoid clashing with the mock
            });
            Event.mockClear();// Clear constructor events
            darkenDark.toggle();
            expect(Event.mock.calls).toEqual([['darken-light']])
        })
    })

    describe('On method', () => {
        test('It should set the current mode to dark', () => {
            const darken = new Darken({
                default: 'light',
                usePrefersColorScheme: false // avoid clashing with the mock
            });

            darken.on();


            expect(darken.dark).toBe(true)
        })

        test('Current mode should stay dark if dark', () => {
            const darken = new Darken({
                default: 'dark',
                usePrefersColorScheme: false // avoid clashing with the mock
            });

            darken.on();


            expect(darken.dark).toBe(true)
        })

        test('it should darken-dark event', () => {
            const darken = new Darken({
                default: 'dark',
                usePrefersColorScheme: false
            });
            Event.mockClear(); // Clear constructor events
            darken.on();
            expect(Event.mock.calls).toEqual([['darken-dark']])
        })
    })

    describe('Off method', () => {
        test('It should set the current mode to light', () => {
            const darken = new Darken({
                default: 'dark',
                usePrefersColorScheme: false // avoid clashing with the mock
            });

            darken.off();


            expect(darken.dark).toBe(false)
        })

        test('Current mode should stay light if light', () => {
            const darken = new Darken({
                default: 'light',
                usePrefersColorScheme: false // avoid clashing with the mock
            });

            darken.off();


            expect(darken.dark).toBe(false)
        })

        test('it should darken-light event', () => {
            const darken = new Darken({
                default: 'light',
                usePrefersColorScheme: false
            });
            Event.mockClear(); // Clear constructor events
            darken.off();
            expect(Event.mock.calls).toEqual([['darken-light']])
        })
    })

    describe('__checkMatchMedia', () => {
        test('It should return "dark" when prefers-color-scheme is set to dark', () => {
            window.matchMedia.mockImplementation((item) => {
                if (item === "(prefers-color-scheme: dark)") return true;
                return false;
            })

            const darken = new Darken();

            const actual = darken.__checkMatchMedia();

            expect(actual).toBe('dark')
        })

        test('It should return "light" when prefers-color-scheme is set to dark', () => {
            window.matchMedia.mockImplementation((item) => {
                if (item === "(prefers-color-scheme: light)") return true;
                return false;
            })

            const darken = new Darken();

            const actual = darken.__checkMatchMedia();

            expect(actual).toBe('light')
        })

        test('It should return undefined if none was found', () => {
            window.matchMedia.mockImplementation(() => {
                return false;
            })

            const darken = new Darken();

            const actual = darken.__checkMatchMedia();

            expect(actual).toBe(undefined)
        })
    })

    describe('__handleClick', () => {
        test('It should invert current value', () => {
            const preventDefaultMock = {
                preventDefault: jest.fn()
            }

            const darken = new Darken();
            const previous = darken.dark;
            darken.__handleClick(preventDefaultMock)

            expect(darken.dark).not.toBe(previous)
        })

        test('It should prevent default on click to not launch unwanted browser action', () => {
            const preventDefaultMock = {
                preventDefault: jest.fn()
            }

            const darken = new Darken();
            darken.__handleClick(preventDefaultMock)

            expect(preventDefaultMock.preventDefault.mock.calls.length).toBe(1)
        })
    })
})