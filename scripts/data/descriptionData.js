class Description
{
    constructor(title, descriptions)
    {
        this.title = title;
        this.descriptions = descriptions;
    }
}

export class DescriptionData
{
    static Background = new Description
    (
        'Background',
        [
            'With over 7 years of professional experience, I have contributed to a diverse range of commercial and open-source software projects.',
            'Holding a Professional Bachelor’s degree in Computer Science with a specialization in Software Engineering, I possess a comprehensive understanding of software development and engineering principles.',
            'Most of my specialization has been in Unity and C#, though I am also familiar with Unreal Engine.'
        ]
    )

    static GameProjects = new Description
    (
        'Game Projects',
        [
            'The following are some games I\'ve made or heavily contributed to.'
        ]
    )

    static GameTools = new Description
    (
        'Game Tools',
        [
            'Below are some of the tools and reusable resources I\'ve made for video games.'
        ]
    )
    
    static OtherProjects = new Description
    (
        'Other Projects',
        [
            'Check out some of my other cool software development projects.'
        ]
    )
}




