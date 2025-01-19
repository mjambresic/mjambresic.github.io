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
            'Game developer with expert skills in C# programming. Specialized in making Unity games with more than 7 years of game making and programming experience.',
            'I hold a Professional Bachelor’s degree in Computer Science, Software Engineering.',
            'Most of my specialization has been in Unity and C#, though I am also proficient with Unreal Engine and C++.'
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




