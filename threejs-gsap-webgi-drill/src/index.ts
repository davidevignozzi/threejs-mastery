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
    TweakpaneUiPlugin,
    AssetManagerBasicPopupPlugin,
    CanvasSnipperPlugin,
    IViewerPlugin
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

    // Add some UI for tweak and testing.

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
                x: -1.03,
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
                x: -2.5,
                y: -0.6,
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
    document.querySelectorAll('.footer_button')?.forEach((item) => {
        item.addEventListener('click', () => {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        });
    });
}

setupViewer();
