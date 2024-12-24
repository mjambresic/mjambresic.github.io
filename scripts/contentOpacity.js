const BODY_OPACITY_PROPERTY = '--body-opacity';
const INTRO_OPACITY_PROPERTY = '--intro-opacity';
const CONTENT_OPACITY_PROPERTY = '--content-opacity';
const INTRO_INTERACTION_PROPERTY = '--enable-intro-interaction';
const CONTENT_INTERACTION_PROPERTY = '--enable-content-interaction';
const INTERACTABLE_CONTENT = 'auto';
const NON_INTERACTABLE_CONTENT = 'none';
const INTRO_START_SCROLL = 300;
const INTRO_MAX_SCROLL = 550;
const CONTENT_START_SCROLL = 0;
const CONTENT_MAX_SCROLL = 450;
const FULL_OPACITY = 1.0;
const NO_OPACITY = 0.0;
const EASE_MIN = 0.0;
const EASE_MAX = 1.0;

export class ContentOpacity
{
    isActive = true;
    
    SetActive(active)
    {
        this.isActive = active;    
    }
    
    Init()
    {
        this.ResolveBodyOpacity()
        this.ResolveContentOpacityByScroll();
    }
    
    ResolveBodyOpacity()
    {
        this.SetVariableOpacity(BODY_OPACITY_PROPERTY, FULL_OPACITY)
    }

    ResolveContentOpacityByScroll()
    {
        if (!this.isActive)
        {
            return;
        }
        
        const scrollTop = document.documentElement.scrollTop;
    
        // Calculate and set intro opacity
        this.SetOpacity(scrollTop, INTRO_START_SCROLL, INTRO_MAX_SCROLL, INTRO_OPACITY_PROPERTY, INTRO_INTERACTION_PROPERTY, this.EaseOut, FULL_OPACITY);
    
        // Calculate and set content opacity
        this.SetOpacity(scrollTop, CONTENT_START_SCROLL, CONTENT_MAX_SCROLL, CONTENT_OPACITY_PROPERTY, CONTENT_INTERACTION_PROPERTY, this.EaseIn, NO_OPACITY);
    }

    SetOpacity(scrollTop, startScroll, maxScroll, cssVariable, cssInteractionVariable, easingFunction, defaultOpacity)
    {
        let opacity;
        if (scrollTop >= startScroll)
        {
            opacity = easingFunction(scrollTop, startScroll, maxScroll);
        }
        else
        {
            opacity = defaultOpacity;
        }

        this.SetVariableOpacity(cssVariable, opacity);
        document.documentElement.style.setProperty(cssInteractionVariable, opacity > NO_OPACITY ? INTERACTABLE_CONTENT : NON_INTERACTABLE_CONTENT); // sets content interactable if visible and vice versa
    }

    SetVariableOpacity(cssVariable, value) 
    {
        document.documentElement.style.setProperty(cssVariable, value);
    }
    
    GetIntroOpacity()
    {
        return getComputedStyle(document.documentElement).getPropertyValue(INTRO_OPACITY_PROPERTY).trim();
    }

    GetContentOpacity()
    {
        return getComputedStyle(document.documentElement).getPropertyValue(CONTENT_OPACITY_PROPERTY).trim();
    }
    
    SetIntroOpacity(opacity)
    {
        this.SetVariableOpacity(INTRO_OPACITY_PROPERTY, opacity);
    }
    
    SetContentOpacity(opacity)
    {
        this.SetVariableOpacity(CONTENT_OPACITY_PROPERTY, opacity);
    }

    EaseOut(scrollTop, start, maxScroll) 
    {
        return Math.max(EASE_MIN, EASE_MAX - ((scrollTop - start) / (maxScroll - start)) * EASE_MAX);
    }

    EaseIn(scrollTop, start, maxScroll) 
    {
        return Math.min(EASE_MAX, (scrollTop - start) / (maxScroll - start));
    }

}


