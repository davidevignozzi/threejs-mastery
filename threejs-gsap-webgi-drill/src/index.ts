import {
    ViewerApp,
    AssetManagerPlugin,
    GBufferPlugin,
    ProgressivePlugin,
    TonemapPlugin,
    SSRPlugin,
    SSAOPlugin,
    BloomPlugin,
    GammaCorrectionPlugin,
    AssetManagerBasicPopupPlugin,
    CanvasSnipperPlugin,
    MeshBasicMaterial2,
    Color
} from 'webgi';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import './styles.css';

async function setupViewer() {
    // Initialize the viewer
    const viewer = new ViewerApp({
        canvas: document.getElementById('webgi-canvas') as HTMLCanvasElement,
        useRgbm: false
    });

    // Add some plugins
    const manager = await viewer.addPlugin(AssetManagerPlugin);

    const camera = viewer.scene.activeCamera;
    const position = camera.position;
    const target = camera.target;
    const sections = document.querySelector('.wrapper') as HTMLElement;
    const exitButton = document.querySelector('.button-exit') as HTMLElement;
    const customizeButton = document.querySelector('.customize-button') as HTMLElement;
    const blackButton = document.querySelector('.button-colors.black');
    const redButton = document.querySelector('.button-colors.red');
    const yellowButton = document.querySelector('.button-colors.yellow');
    const mainContainer = document.getElementById('webgi-canvas-container') as HTMLElement;
    const customizerInterface = document.querySelector('.customizer-container') as HTMLElement;

    // Add a popup(in HTML) with download progress when any asset is downloading.
    await viewer.addPlugin(AssetManagerBasicPopupPlugin);

    // Add plugins individually.
    await viewer.addPlugin(GBufferPlugin);
    await viewer.addPlugin(new ProgressivePlugin(32));
    await viewer.addPlugin(new TonemapPlugin(!viewer.useRgbm));
    await viewer.addPlugin(GammaCorrectionPlugin);
    await viewer.addPlugin(SSRPlugin);
    await viewer.addPlugin(SSAOPlugin);
    await viewer.addPlugin(BloomPlugin);

    // Add more plugins not available in base, like CanvasSnipperPlugin which has helpers to download an image of the canvas.
    await viewer.addPlugin(CanvasSnipperPlugin);

    // This must be called once after all plugins are added.
    viewer.renderer.refreshPipeline();

    await manager.addFromPath('./assets/drill.glb');

    /**
     * Materials
     */
    const drillMaterial = manager.materials!.findMaterialsByName(
        'Drill_01'
    )[0] as MeshBasicMaterial2;

    function setupScrollAnimation() {
        const tl = gsap.timeline();

        /**
         * From the 1 section to 2 section
         */
        tl
            // position
            .to(position, {
                x: 4.56,
                y: -2.71,
                z: -5.95,
                scrollTrigger: {
                    trigger: '#second-section',
                    start: 'top bottom',
                    end: 'top top',
                    scrub: true,
                    immediateRender: false
                },
                onUpdate
            })

            // First Contianer dissolves
            .to('#first-section', {
                xPercent: '-150',
                opacity: 0,
                scrollTrigger: {
                    trigger: '#second-section',
                    start: 'top bottom',
                    end: 'top top',
                    scrub: 1,
                    immediateRender: false
                },
                onUpdate
            })

            // target
            .to(target, {
                x: -1.5,
                y: 0.35,
                z: -0.25,
                scrollTrigger: {
                    trigger: '#second-section',
                    start: 'top bottom',
                    end: 'top top',
                    scrub: true,
                    immediateRender: false
                },
                onUpdate
            });

        /**
         * From the 2 section to 3 section
         */
        tl
            // position
            .to(position, {
                x: -5.98,
                y: 0.27,
                z: 6.56,
                scrollTrigger: {
                    trigger: '#third-section',
                    start: 'top bottom',
                    end: 'top top',
                    scrub: true,
                    immediateRender: false
                },
                onUpdate
            })

            // target
            .to(target, {
                x: -2,
                y: -0.4,
                z: -0.33,
                scrollTrigger: {
                    trigger: '#third-section',
                    start: 'top bottom',
                    end: 'top top',
                    scrub: true,
                    immediateRender: false
                },
                onUpdate
            });
    }

    setupScrollAnimation();

    /**
     * WEBGI UPDATE
     */
    let needsUpdate = true;

    function onUpdate() {
        needsUpdate = true;
        viewer.renderer.resetShadows();
    }

    viewer.addEventListener('preFrame', () => {
        if (needsUpdate) {
            camera.positionUpdated(true);
            camera.targetUpdated(true);
            needsUpdate = false;
        }
    });

    /**
     * Scroll Events
     */
    // Hero to Second
    document.querySelector('.hero-button')?.addEventListener('click', () => {
        const element = document.querySelector('#second-section');
        window.scrollTo({ top: element?.getBoundingClientRect().top, left: 0, behavior: 'smooth' });
    });

    // Footer to Top
    document.querySelectorAll('.footer-button')?.forEach((item) => {
        item.addEventListener('click', () => {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        });
    });

    /**
     * CUSTOMIZER
     */
    // ENTER CUSTOMIZE
    customizeButton.addEventListener('click', () => {
        sections.style.display = 'none';
        mainContainer.style.pointerEvents = 'all';
        document.body.style.cursor = 'grab';
        gsap.fromTo(
            position,
            {
                x: -5.98,
                y: 0.27,
                z: 6.56
            },
            {
                x: -2.6,
                y: -0.5,
                z: -9.6,
                duration: 2,
                ease: 'power3.inOut',
                onUpdate
            }
        );
        gsap.fromTo(
            target,
            { x: -2, y: -0.4, z: -0.33 },
            {
                x: -0.15,
                y: 0.25,
                z: 0.12,
                duration: 2,
                ease: 'power3.inOut',
                onUpdate,
                onComplete: enableControlers
            }
        );
    });

    function enableControlers() {
        exitButton.style.display = 'block';
        customizerInterface.style.display = 'block';
        viewer.scene.activeCamera.setCameraOptions({ controlsEnabled: true });
    }

    // EXIT CUSTOMIZER
    exitButton.addEventListener('click', () => {
        gsap.to(position, {
            x: -3.066,
            y: -0.584,
            z: 1.752,
            duration: 1,
            ease: 'power3.inOut',
            onUpdate
        });
        gsap.to(target, {
            x: -1.542,
            y: 0.909,
            z: -0.298,
            duration: 1,
            ease: 'power3.inOut',
            onUpdate
        });

        viewer.scene.activeCamera.setCameraOptions({ controlsEnabled: false });
        sections.style.display = 'block';
        mainContainer.style.pointerEvents = 'none';
        document.body.style.cursor = 'default';
        exitButton.style.display = 'none';
        customizerInterface.style.display = 'none';
    });

    /**
     * CUSTOMIZATION => CHANGE MATEIRAL COLOR
     *
     */
    // Black
    blackButton?.addEventListener('click', () => {
        changeColor(new Color(0x383830).convertSRGBToLinear());
    });

    // Red
    redButton?.addEventListener('click', () => {
        changeColor(new Color(0xfe2d2d).convertSRGBToLinear());
    });

    // Yellow
    yellowButton?.addEventListener('click', () => {
        changeColor(new Color(0xffffff).convertSRGBToLinear());
    });

    function changeColor(_colorToBeChanged: Color) {
        drillMaterial.color = _colorToBeChanged;
        viewer.scene.setDirty();
    }
}

setupViewer();
