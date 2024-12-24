class Tool 
{
    constructor(name, backgroundColor) 
    {
        this.name = name;
        this.backgroundColor = backgroundColor;
    }
}

export class ToolData
{
    static Unity = new Tool('Unity', '#000000');
    static Unreal = new Tool('Unreal Engine', '#000000');
    static CSharp = new Tool('C#', '#239120');
    static CPlusPlus = new Tool('C++', '#7733C7');
    static Javascript = new Tool('JavaScript', '#DAA520');
    static Node = new Tool('Node', '#417E38');
    static Git = new Tool('Git', '#E35A38');
    static Perforce = new Tool('Perforce', '#4EACE9');
    static Affinity = new Tool('Affinity', '#D778F4');
    static Photon = new Tool('Photon', '#1A437C');
    static Mlapi = new Tool('MLAPI', '#B23E38');
    static Netcode = new Tool('Netcode', '#B23E38');
    static Bash = new Tool('Bash', '#76A74D');
    static MixedTools = new Tool('Mixed Tools', '#000000');
}


