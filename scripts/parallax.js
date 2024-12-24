const PARALLAX_BACKGROUND_FACTOR = 0.5;
const CENTERED_POSITION = 'center';
const PIXEL_SUFFIX = 'px';

export class Parallax
{
    Init()
    {
        this.UpdateParallaxBackground();
    }
    
    UpdateParallaxBackground() 
    {
        const scrollPosition = window.scrollY;
        const backgroundOffset = scrollPosition * PARALLAX_BACKGROUND_FACTOR;
        document.body.style.backgroundPosition = `${CENTERED_POSITION} ${backgroundOffset}${PIXEL_SUFFIX}`;
    }
}