import {ProjectData} from './data/projectData.js';

const PROJECT_DATA_ARRAY_ID_ATTRIBUTE = 'project-data-array-id';
const PROJECT_DATA_ARRAY_INDEX_ATTRIBUTE = 'project-data-array-index';
const DATA_SRC_ATTRIBUTE = 'data-src';
const MODAL_TITLE_IMAGE_CLASS_NAME = 'modal_title_image';
const LAZY_LOADING_CLASS = 'lazyload'
const LAZY_LOADING_LOADED_EVENT = 'lazyloaded'
const EMPTY_STRING = '';
const EMPTY_SPACE = ' ';
const DISPLAY_NONE = 'none';
const DISPLAY_BLOCK = 'block';
const DISPLAY_GRID = 'grid';
const DISPLAY_FLEX = 'flex';
const OVERFLOW_HIDDEN = 'hidden';
const OVERFLOW_AUTO = 'auto';
const FIXED_BODY = 'fixed';
const NON_FIXED_BODY = '';
const FIXED_BODY_OFFSET_NEGATIVE_PREFIX = '-';
const PIXEL_SUFFIX = 'px'
const SCROLL_BEHAVIOR_AUTO = 'auto';
const SCROLL_BEHAVIOR_SMOOTH = 'smooth';
const SCROLL_BEHAVIOR_PROPERTY = '--scroll-behavior';
const IPHONE_USER_AGENT_ID = 'iPhone';
const DIV_ELEMENT_TAG = 'div';
const IMG_ELEMENT_TAG = 'img';
const CLICK_EVENT_TYPE = 'click';
const PROJECT_IMAGE_DIV_CLASS_NAME = 'modal_project_image_div';
const PROJECT_IMAGE_CLASS_NAME = 'modal_project_image';
const PROJECT_IMAGE_SELECTED_CLASS_NAME = 'modal_project_image_selected';
const PROJECT_IMAGE_SELECTED_ARROW_CLASS_NAME = 'modal_project_image_div_selected_arrow';
const ARROW_IMAGE_DATA_PATH = './assets/arr.png';
const RESPONSIBILITY_IDENT_SPECIAL_CHARACTER = '*';
const AUTO_SELECT_DOUBLE_TIME_MULTIPLIER = 2;
const DONT_EXTEND_AUTO_SELECT_DURATION_THRESHOLD_MS = 8000;
const RESPONSIBILITY_IDENT_SUBSTRING = 1;
const SCROLL_START_VALUE = 0;
const EMPTY_ARRAY_LENGTH = 0;
const FIRST_INDEX = 0;
const SOLO_IMAGE_COUNT = 1;
const NO_COUNT = 0;
const RESET_ARRAY_VALUE = 0;

export class Modal
{
    projects = null;
    modal = null;
    title = null;
    titleImage = null;
    modalProjectImagesContainer = null;
    text = null;
    responsibilitiesContainer = null;
    developmentTime = null;
    developmentTimeContainer = null;
    links = null;
    linksContainer = null;
    tools = null;
    toolsContainer = null;
    closeButton = null;
    contentOpacity = null;
    lastSelectedProjectImage = null;
    autoSelectionCurrentIndex = null;
    currentProjectData = null;
    currentAutoSelectTimeout = null;
    loadingProjectImages = [];
    
    Init(contentOpacity)
    {
        this.contentOpacity = contentOpacity;
        this.projects = document.querySelectorAll('.project_section');
        this.modal = document.getElementById('projectModal');
        this.title = document.getElementById('modalTitle');
        this.titleImage = document.getElementById('modalTitleImage');
        this.modalProjectImagesContainer = document.getElementById('modalProjectImagesDiv');
        this.text = document.getElementById('modalText');
        this.responsibilitiesContainer = document.getElementById('modalResponsibilitiesDiv');
        this.developmentTime = document.getElementById('modalDevTime');
        this.developmentTimeContainer = document.getElementById('modalDevTimeDiv');
        this.links = document.getElementById('modalLinks');
        this.linksContainer = document.getElementById('modalLinksDiv');
        this.tools = document.getElementById('modalTools');
        this.toolsContainer = document.getElementById('modalToolsDiv');
        this.closeButton = document.getElementById('closeButton');
        
        this.RegisterProjectsToOpenModal();
        this.RegisterModalCloseOnButtonClick();
        this.RegisterModalCloseOnOutsideClick();
    }
    
    RegisterProjectsToOpenModal()
    {
        this.projects.forEach(project =>
        {
            let projectDataArrayId = project.getAttribute(PROJECT_DATA_ARRAY_ID_ATTRIBUTE);
            let projectDataArrayIndex = project.getAttribute(PROJECT_DATA_ARRAY_INDEX_ATTRIBUTE);
            let projectData = ProjectData.GetArrayById(projectDataArrayId)[projectDataArrayIndex];
            
            project.onclick = () =>
            {
                this.currentProjectData = projectData;
                this.SetupModalWithProjectData();
                this.SetFirstTitleImage();
                this.ResolveDataVisibility();
                this.OpenModal();
            };
        });
    }
    
    SetupModalWithProjectData()
    {
        let projectData = this.currentProjectData;
        this.title.textContent = projectData.title;
        this.SetupAndGenerateProjectImages(projectData);
        this.text.innerHTML = `${projectData.descriptions.map(desc => `<p>${desc}</p><br>`).join(EMPTY_STRING)}`;
        this.responsibilitiesContainer.innerHTML = this.GenerateResponsibilitiesText(projectData);
        this.developmentTime.textContent = projectData.developmentTime;
        this.links.innerHTML = `${projectData.links.map(link => `<a href="${link.url}" target="_blank" rel="noopener noreferrer" class="hyperlink_simple">${link.text} <img src="./assets/sexl.png" class="hyperlink_simple_image"></a>`).join(EMPTY_SPACE)}`;
        this.tools.innerHTML = `${projectData.tools.map(tool => `<span class="project_box_tool" style="background-color: ${tool.backgroundColor};">${tool.name}</span>`).join(EMPTY_SPACE)}`;
    }

    SetupAndGenerateProjectImages() 
    {
        this.loadingProjectImages.length = RESET_ARRAY_VALUE;
        
        const htmlElements = this.currentProjectData.projectImages.map((projectImage, index) => 
        {
            const div = document.createElement(DIV_ELEMENT_TAG); // Create project image container
            div.className = PROJECT_IMAGE_DIV_CLASS_NAME;
            
            const img = document.createElement(IMG_ELEMENT_TAG); // Create project image
            img.src = projectImage.src;
            img.className = PROJECT_IMAGE_CLASS_NAME;
            this.loadingProjectImages.push(img);
            
            div.appendChild(img);
            div.addEventListener(CLICK_EVENT_TYPE, () => projectImage.SetModalTitleImage(true));
            
            projectImage.modal = this;
            projectImage.element = div;
            projectImage.index = index;
            
            if (projectImage.dataSrc !== EMPTY_STRING) // Enable lazy loading only if we have anything to lazy load
            {
                img.setAttribute(DATA_SRC_ATTRIBUTE, projectImage.dataSrc);
                img.classList.add(LAZY_LOADING_CLASS);
                img.addEventListener(LAZY_LOADING_LOADED_EVENT, (e) => { this.UpdateLoadingProjectImages(img); }); // Listen to lazyload image loading
            }
            else
            {   
                img.onload = () => { this.UpdateLoadingProjectImages(img); }; // listen to default image loading...
            }
            
            return div;
        });

        this.modalProjectImagesContainer.innerHTML = EMPTY_STRING; // deletes older project images from html
        htmlElements.forEach(element => this.modalProjectImagesContainer.appendChild(element)); // appends all new images/elements
    }
    
    UpdateLoadingProjectImages(img)
    {
        this.loadingProjectImages = this.loadingProjectImages.filter(image => image !== img);
        this.SetProjectImageAutoSelection() // will only trigger if all images are loaded.
    }

    SetFirstTitleImage()
    {
        let projectImage = this.currentProjectData.projectImages[FIRST_INDEX];
        projectImage.SetModalTitleImage(false);
    }
    
    SetTitleImage(imageSrc, imageDataSrc)
    {
        this.titleImage.className = MODAL_TITLE_IMAGE_CLASS_NAME;
        this.titleImage.src = EMPTY_STRING; // resets image in order to not show the old one before new starts loading
        this.titleImage.src = imageSrc;

        if (imageDataSrc !== EMPTY_STRING)
        {
            this.titleImage.classList.add(LAZY_LOADING_CLASS); // resets lazy loading with the combination of class name override above
            this.titleImage.setAttribute(DATA_SRC_ATTRIBUTE, imageDataSrc);
        }
    }

    SetProjectImageAutoSelection(selectedOnClick)
    {
        if (this.currentProjectData.projectImages.length <= SOLO_IMAGE_COUNT) // Nothing to select if we only have one image
        {
            return;
        }

        if (this.loadingProjectImages.length > NO_COUNT)
        {
            return;
        }

        this.autoSelectionCurrentIndex = this.lastSelectedProjectImage.index;
        let projectImage = this.currentProjectData.projectImages[this.autoSelectionCurrentIndex];
        let autoSelectTimeoutDuration = projectImage.duration;
        
        if (selectedOnClick && autoSelectTimeoutDuration < DONT_EXTEND_AUTO_SELECT_DURATION_THRESHOLD_MS)
        {
            autoSelectTimeoutDuration *= AUTO_SELECT_DOUBLE_TIME_MULTIPLIER; // if duration is lower than threshold, extend duration when user clicked
        }
        
        this.SetAutoSelectTimeout(autoSelectTimeoutDuration);
    }

    UpdateAutoSelection()
    {
        if (++this.autoSelectionCurrentIndex >= this.currentProjectData.projectImages.length)
        {
            this.autoSelectionCurrentIndex = FIRST_INDEX; // resets to first image
        }

        let projectImage = this.currentProjectData.projectImages[this.autoSelectionCurrentIndex];
        projectImage.SetModalTitleImage(false);
    }

    SetAutoSelectTimeout(timeoutDuration)
    {
        this.currentAutoSelectTimeout = setTimeout(() => this.UpdateAutoSelection(), timeoutDuration);
    }
    
    SelectProjectImageContainerAndCacheValues(projectImage, selectedOnClick)
    {
        projectImage.element.classList.add(PROJECT_IMAGE_SELECTED_CLASS_NAME);
        const imgSelectionArrow = document.createElement(IMG_ELEMENT_TAG);
        imgSelectionArrow.src = ARROW_IMAGE_DATA_PATH;
        imgSelectionArrow.className = PROJECT_IMAGE_SELECTED_ARROW_CLASS_NAME;
        projectImage.element.append(imgSelectionArrow);
        
        this.lastSelectedProjectImage = projectImage;
        this.autoSelectionCurrentIndex = this.lastSelectedProjectImage.index;
        this.ClearAutoSelectionTimeout();
        this.SetProjectImageAutoSelection(selectedOnClick);
    }
    
    DeselectLastSelectedProjectImage()
    {
        if (this.lastSelectedProjectImage === null)
        {
            return;
        }
        
        this.lastSelectedProjectImage.element.classList.remove(PROJECT_IMAGE_SELECTED_CLASS_NAME);
        let arrowElement = document.querySelector('.modal_project_image_div_selected_arrow');
        arrowElement?.remove() // this could be null sometimes by design
    }

    GenerateResponsibilitiesText()
    {
        return `
        <p class="modal_subtitle">${this.currentProjectData.responsibilityTitle}</p>
        <ul class="modal_responsibility_list">
            ${this.currentProjectData.responsibilities.map(responsibility =>
            {
                if (responsibility.startsWith(RESPONSIBILITY_IDENT_SPECIAL_CHARACTER))
                {
                    return `<ul><li>${responsibility.substring(RESPONSIBILITY_IDENT_SUBSTRING).trim()}</li></ul>`;
                } 
                else
                {
                    return `<li>${responsibility}</li>`;
                }
            }).join(EMPTY_STRING)}
        </ul>`;
    }
    
    ResolveDataVisibility()
    {
        let projectData = this.currentProjectData;
        this.linksContainer.style.display = projectData.links.length === EMPTY_ARRAY_LENGTH ? DISPLAY_NONE : DISPLAY_BLOCK;
        this.toolsContainer.style.display = projectData.tools.length === EMPTY_ARRAY_LENGTH ? DISPLAY_NONE : DISPLAY_BLOCK;
        this.responsibilitiesContainer.style.display = projectData.responsibilities.length === EMPTY_ARRAY_LENGTH ? DISPLAY_NONE : DISPLAY_BLOCK;
        this.developmentTimeContainer.style.display = projectData.developmentTime === EMPTY_STRING ? DISPLAY_NONE : DISPLAY_BLOCK;
        this.modalProjectImagesContainer.style.display = projectData.HasMultipleProjectImages() ? DISPLAY_GRID : DISPLAY_NONE; 
    }
    
    RegisterModalCloseOnButtonClick()
    {
        this.closeButton.onclick = () =>
        {
            this.CloseModal();
        };
    }

    RegisterModalCloseOnOutsideClick() 
    {
        window.onclick = (event) => 
        {
            if (event.target === this.modal) 
            {
                this.CloseModal();
            }
        };
    }

    OpenModal() 
    {
        document.body.style.overflow = OVERFLOW_HIDDEN;
        this.modal.style.display = DISPLAY_FLEX; // Show modal
        this.modal.scrollTop = SCROLL_START_VALUE; // Ensure the modal starts at the top

        if (this.BrowsingOnIphone())
        {
            this.DisableIphoneScroll();
        }
    }

    CloseModal() 
    {
        this.modal.style.display = DISPLAY_NONE; // Hide modal
        document.body.style.overflow = OVERFLOW_AUTO;
        this.ClearAutoSelectionTimeout();
        
        if (this.BrowsingOnIphone())
        {
            this.EnableIphoneScroll();
        }
    }
    
    ClearAutoSelectionTimeout()
    {
        if (this.currentAutoSelectTimeout !== null)
        {
            clearTimeout(this.currentAutoSelectTimeout);
        }
    }

    BrowsingOnIphone() 
    {
        return navigator.userAgent.includes(IPHONE_USER_AGENT_ID);
    }

    DisableIphoneScroll() // iOS Hack, workaround for unexpected behaviour on iOS Mobiles apple haven't fixed in more than 12 years.
    {
        this.contentOpacity.SetActive(false);
        let lastIntroOpacity = this.contentOpacity.GetIntroOpacity();
        let lastContentOpacity = this.contentOpacity.GetContentOpacity();
        
        this.lastScrollPosition = window.scrollY;
        document.body.style.position = FIXED_BODY;
        document.body.style.top = `${FIXED_BODY_OFFSET_NEGATIVE_PREFIX}${this.lastScrollPosition}${PIXEL_SUFFIX}`; // Keep track of the body's scroll position, top offset

        this.contentOpacity.SetIntroOpacity(lastIntroOpacity);
        this.contentOpacity.SetContentOpacity(lastContentOpacity);
    }
    
    EnableIphoneScroll() // Same applies as for disabling safari scroll
    {
        document.body.style.position = NON_FIXED_BODY;
        document.body.style.top = EMPTY_STRING; // clears top offset
        this.contentOpacity.SetActive(true);
        this.SetScrollBehaviour(SCROLL_BEHAVIOR_AUTO);
        window.scrollTo(this.lastScrollPosition, this.lastScrollPosition);
        this.SetScrollBehaviour(SCROLL_BEHAVIOR_SMOOTH);
    }
    
    SetScrollBehaviour(value)
    {
        document.documentElement.style.setProperty(SCROLL_BEHAVIOR_PROPERTY, value);
    }
}