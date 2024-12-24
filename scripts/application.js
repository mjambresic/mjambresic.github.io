import {Content} from './content.js';
import {ContentOpacity} from './contentOpacity.js';
import {Intro} from './intro.js';
import {Modal} from './modal.js';
import {Parallax} from './parallax.js';
import '../packages/lazysizes/lazysizes.min.js';

document.addEventListener('DOMContentLoaded', Init);
document.addEventListener('scroll', OnScroll);
window.addEventListener('resize', OnWindowResize);

let content = new Content();
let contentOpacity = new ContentOpacity();
let modal = new Modal();
let intro = new Intro();
let parallax = new Parallax();

function Init()
{
    content.Init();
    contentOpacity.Init();
    modal.Init(contentOpacity);
    intro.Init();
    parallax.Init();
}

function OnScroll() 
{
    contentOpacity.ResolveContentOpacityByScroll();
    parallax.UpdateParallaxBackground();
}

function OnWindowResize()
{
    intro.UpdateIntroImageHeightProperty();
    intro.UpdateIntroImageContainerWidthProperty();
}