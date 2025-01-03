import {DescriptionData} from './data/descriptionData.js';
import {ProjectData} from './data/projectData.js';

const EMPTY_STRING = '';
const EMPTY_SPACE = ' ';
const LAST_INDEX_OFFSET = 1;
const FIRST_ELEMENT_INDEX = 0;

export class Content
{
    contentContainer = null;
    
    Init()
    {
        this.contentContainer = document.getElementById('content');
        console.log();
        this.RenderContent();
    }
    
    RenderContent()
    {
        this.RenderContentDescription(DescriptionData.Background);
        this.RenderContentDescription(DescriptionData.GameProjects);
        this.RenderProjects(ProjectData.Games);
        this.RenderContentDescription(DescriptionData.GameTools);
        this.RenderProjects(ProjectData.Tools);
        this.RenderContentDescription(DescriptionData.OtherProjects);
        this.RenderProjects(ProjectData.Other);
    }
    
    RenderContentDescription(description)
    {
        this.contentContainer.innerHTML += this.CreateContentDescriptionSection(description.title, description.descriptions);
    }
    
    RenderProjects(projects)
    {
        let projectsHTML = '<section class="project_grid_section">';
    
        projects.forEach((projectData, projectDataArrayIndex) =>
        {
            projectsHTML += this.CreateProjectSection(projectData, ProjectData.GetArrayId(projects), projectDataArrayIndex);
        });
    
        projectsHTML += '</section>';
        this.contentContainer.innerHTML += projectsHTML;
    }
    
    CreateContentDescriptionSection(title, descriptions)
    {
        return `
        <section class="content_description_section">
            <div class="content_description_title_div">
                <p><span class="highlighted_text">${title}</span></p><br>
            </div>
            <div class="content_description_text_div">
                ${descriptions.map((desc, index) => `<p class="normal_text">${desc}</p>${index < descriptions.length - LAST_INDEX_OFFSET ? '<br>' : EMPTY_STRING}`).join(EMPTY_STRING)}
            </div>
        </section>
        `;
    }
    
    CreateProjectSection(projectData, projectDataArrayId, projectDataArrayIndex)
    {
        let firstImageSrc = projectData.GetFirstImageSrc();
        let firstImageDataSrc = projectData.GetFirstImageDataSrc();
        let backgroundImageObjectPosition = projectData.GetBackgroundImageObjectPosition();
        
        return `            
        <section class="project_section" project-data-array-id="${projectDataArrayId}" project-data-array-index="${projectDataArrayIndex}">
            <div class="project_image_div">
                <div class="project_image_div_container">
                    <img class="project_image lazyload" src="${firstImageSrc}" data-src="${firstImageDataSrc}">
                    <img class="project_image_background lazyload" src="${firstImageSrc}" data-src="${firstImageDataSrc}" style="object-position: ${backgroundImageObjectPosition}">
                </div>
            </div>
            <div class="project_text_div">
                <p class="project_title_text">${projectData.title}</p><br>
                    ${projectData.descriptions.map(desc => `<p class="project_text">${desc}</p><br>`).join(EMPTY_STRING)}
            </div>        
                <div class="project_box_div">
                    <p class="project_development_time_text">
                        ${projectData.developmentTime}
                    </p>
                </div>
            <div class="project_box_div">
                <p>
                    ${projectData.tools.map(tool => `<span class="project_box_tool" style="background-color: ${tool.backgroundColor};">${tool.name}</span>`).join(EMPTY_SPACE)}
                </p>
            </div>
        </section>
        `;
    }
}