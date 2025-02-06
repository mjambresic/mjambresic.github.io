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

    static MobileGames = new Description
    (
        'Mobile Games',
        [
            'A collection of some mobile games I\'ve designed and developed over the years.'
        ]
    )

    static Prototypes = new Description
    (
        'Prototypes',
        [
            'Created purely for fun, learning and experimentation, showcasing various game worlds or gameplay mechanics I developed.'
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




