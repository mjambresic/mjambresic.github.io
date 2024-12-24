const IMAGE_HEIGHT_PROPERTY = '--intro-image-height';
const IMAGE_WIDTH_PROPERTY = '--intro-image-container-width';
const PIXEL_SUFFIX = 'px';

export class Intro
{
    introText = document.getElementById('introText');
    introImage = document.getElementById('introImageContainer');
    
    Init()
    {
        this.UpdateIntroImageHeightProperty();
        this.UpdateIntroImageContainerWidthProperty();
    }

    UpdateIntroImageHeightProperty() // reflects the height of the intro text
    {
        document.documentElement.style.setProperty(IMAGE_HEIGHT_PROPERTY, `${this.introText.getBoundingClientRect().height}${PIXEL_SUFFIX}`);
    }
    
    UpdateIntroImageContainerWidthProperty() // reflects the intro image container width
    {
        document.documentElement.style.setProperty(IMAGE_WIDTH_PROPERTY, `${this.introImage.getBoundingClientRect().width}${PIXEL_SUFFIX}`);
    }
}    
