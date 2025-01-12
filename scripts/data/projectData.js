import {ToolData} from '../data/toolData.js';

const FIRST_ELEMENT_INDEX = 0;
const SOLO_IMAGE_COUNT = 1;
const EMPTY_STRING = '';
const DEFAULT_PROJECT_IMAGE_DURATION_MS = 5000;
const DEFAULT_BACKGROUND_HORIZONTAL_POSITION = 'center';
const DEFAULT_BACKGROUND_VERTICAL_POSITION = '50%';

class Project
{
    constructor(title, projectImages, note, descriptions, responsibilityTitle, responsibilities, developmentTime, tools, links)
    {
        this.title = title;
        this.projectImages = projectImages;
        this.note = note;
        this.descriptions = descriptions;
        this.responsibilityTitle = responsibilityTitle;
        this.responsibilities = responsibilities;
        this.developmentTime = developmentTime;
        this.tools = tools;
        this.links = links;
    }
    
    HasMultipleProjectImages()
    {
        return this.projectImages.length > SOLO_IMAGE_COUNT;
    }

    GetFirstImageSrc()
    {
        let firstProjectImage = this.projectImages[FIRST_ELEMENT_INDEX];
        return firstProjectImage == null ? EMPTY_STRING : firstProjectImage.src;
    }

    GetFirstImageDataSrc()
    {
        let firstProjectImage = this.projectImages[FIRST_ELEMENT_INDEX];
        return firstProjectImage == null ? EMPTY_STRING : firstProjectImage.dataSrc;
    }
    
    GetBackgroundImageObjectPosition()
    {
        let firstProjectImage = this.projectImages[FIRST_ELEMENT_INDEX];
        return firstProjectImage == null ? EMPTY_STRING : firstProjectImage.backgroundImageObjectPosition;
    }
}

class ProjectImage
{
    modal = null;
    element = null;
    index = null;
    
    constructor(src, dataSrc, duration = DEFAULT_PROJECT_IMAGE_DURATION_MS, backgroundImageObjectPosition = DEFAULT_BACKGROUND_VERTICAL_POSITION)
    {
        this.src = src;
        this.dataSrc = dataSrc;
        this.duration = duration;
        this.backgroundImageObjectPosition = `${DEFAULT_BACKGROUND_HORIZONTAL_POSITION} ${backgroundImageObjectPosition}`;
    }
    
    SetModalTitleImage(selectedOnClick)
    {
        this.modal.SetTitleImage(this.src, this.dataSrc, this.backgroundImageObjectPosition);
        this.modal.DeselectLastSelectedProjectImage();
        this.modal.SelectProjectImageContainerAndCacheValues(this, selectedOnClick);
    }
}


class ProjectNote
{
    constructor(text, colorOverride = null, backgroundColorOverride = null)
    {
        this.text = text;
        this.colorOverride = colorOverride;
        this.backgroundColorOverride = backgroundColorOverride;
    }
}

export class ProjectData
{
    static Games =
    [
        new Project
        (
            'Kick League',
            [
                new ProjectImage('./assets/klps.webp', './assets/klp.webp', 7120),
                new ProjectImage('./assets/klp_1.webp', ''),
                new ProjectImage('./assets/klp_2.webp', ''),
                new ProjectImage('./assets/klp_3.webp', ''),
                new ProjectImage('./assets/klp_4.webp', ''),
            ],
            new ProjectNote
            (
                'I hold full ownership of this project and all associated rights. The technical part of the project is in the finishing stages, while art and sound will undergo one more iteration. The game build is available on request if you want to evaluate gameplay and stability. If you are interested in being part of this project, feel free to contact me through the contacts section at the bottom of this website, so we can arrange a meeting.',
                '#810077',
                '#ffe3fd'
            ),
            [
                'Fast-paced, retro-styled, arcade multiplayer balling game! Featuring PvP and solo gameplay.',
            ],
            'Some of the most notable features:',
            [
                'Input management, utilizing new Unity Input System.',
                '* Support for multiple controller connections.',
                '* Input selection for solo play or local co-op multiplayer.',
                '* Management between different user interfaces and gameplay modes.',
                'Gameplay and Movement.',
                '* Move, Jump, Jetpack Thrust, Dash and Shoot.',
                '* Stamina spending, regen and management.',
                '* Curve evaluation, organic game feel polishes, camera shakes and similar.',
                '* Input caching for better and fair input feel.',
                '* Ball hit indicator physics pre-simulation.',
                'Organic player and ball animation.',
                '* Complex multi layered animation state machine.',
                '* Body squashing and stretching based on current object physics forces.',
                'Game mode creation and management system.',
                '* Support for unified and specific game mode rules and scoring.',
                '* Match 1v1, 2v2, Practice, Tutorial, Arcades and more.',
                'Robust state machine.',
                '* Different Input bindings for different states.',
                '* Transition and loading between states.',
                'Player progress and user experience.',
                '* Player leveling system.',
                '* Saving states, objectives, stats and unlocks.',
                'Networking, multiplayer and digital stores.',
                '* Unity game services, relay and lobby.',
                '* Match browser and joining lobbies with passcode.',
                'Automated editor tools.',
                '* Asset id generation, used for saved data, prevents human error.',
                '* Build automation for major platforms.',
                '* Build versioning system that works with git.',
                '* Steam command line integration tool.',
                'Game settings.',
                '* Development and performance stat options.',
                '* Standard display settings like resolution, vsync, external display selection and similar.',
                '* Audio options and slider functionality.',
                '* Control and input related options.',
                '* Descriptions for better user experience and option understanding.',
                'Game audio system.',
                '* Multi-layered sound design including gameplay, ui and other sounds.',
                '* Main menu music player and its sound level manipulation.',
                'User Interface and its animation.',
                '* User interface for all game states.',
                '* Input bindings related to the current user interface state.',
                '* Scoreboards, stats, objectives and timing signalization.',
                '* Seamless Video player user interface integration.'
            ],
            '1 year, 2 months',
            [
                ToolData.Unity,
                ToolData.CSharp,
                ToolData.Netcode,
                ToolData.Git,
                ToolData.Affinity
            ],
            [
                {url: 'https://www.youtube.com/watch?v=rRJOZeQzzzc', text: 'Video'}
            ]
        ),

        new Project
        (
            'PHAGEBORN: Online Card Game',
            [
                new ProjectImage('./assets/phas.webp', './assets/pha.webp', 6060),
                new ProjectImage('./assets/pha_1.webp', ''),
                new ProjectImage('./assets/pha_2.webp', ''),
                new ProjectImage('./assets/pha_3.webp', ''),
                new ProjectImage('./assets/pha_4.webp', '')
            ],
            null,
            [
                'Immersive online card game which combines rich and engaging storytelling with deep and strategic gameplay.'
            ],
            'Contributions and responsibilities:',
            [
                'Gameplay additions and changes.',
                '* Card animation, tweening and sequence overhaul.',
                '* Card session stats representation (+/-).',
                '* Card graveyard functionality and behaviour overhaul.',
                '* Low on time visuals and signalization.',
                '* Low on card count visuals and signalization.',
                '* End turn button logic changes and fixes, animator controller overhaul.',
                '* Replication requests for better visual sync over the network.',
                'User interface implementations and overhauls.',
                '* Card library additional filtering logic.',
                '* Card library, locked and unlocked card visuals.',
                '* Tutorial user interface.',
                '* Map selection, both manual and random.',
                '* Font changes and addition.',
                '* Hover and tooltip overhaul.',
                'Project directory maintenance.',
                '* Imported and exchanged new assets for avatars and cards.',
                '* Unused and duplicate assets cleanup.',
                'Project tools and data maintenance.',
                '* Gamesparks SDK updates.',
                '* Unity major version update, migration fixes.',
                'Communication handling between tech and artist teams.',
                '* Guided freshly joined members in utilising tech tools like Git and Unity.',
                'Social menu client side implementation.',
                '* Friends list buffered and shown in menu.',
                '* Actions like "Accept", "Decline" and "Invite to game".',
                '* Social menu activity and notifications.',
                'Audio System',
                '* Audio clip FMOD export and Unity import pipeline.',
                '* Most of the in game sound implementation including fresh ambient sound system.',
                '* Audio logic with mixers, sliders and settings.',
            ],
            '7 months',
            [
                ToolData.Unity,
                ToolData.CSharp,
                ToolData.Git
            ],
            [
                {url: 'https://store.steampowered.com/app/1037990/PHAGEBORN_Online_Card_Game/', text: 'Steam'},
                {url: 'https://www.youtube.com/watch?v=qEAvwwXACf8', text: 'Video'},
            ]
        ),

        new Project
        (
            'Survival Game #1',
            [
                new ProjectImage('./assets/sg1.webp', ''),
                new ProjectImage('./assets/sg1_1.webp', ''),
                new ProjectImage('./assets/sg1_2.webp', ''),
                new ProjectImage('./assets/sg1_3.webp', ''),
                new ProjectImage('./assets/sg1_4.webp', '')
            ],
            null,
            [
                'Science-fantasy, online survival first-person shooter set in a unique tropical world.',
            ],
            'Some of the features and responsibilities:',
            [
                'Input management system.',
                '* Abstract input interface that works with any input system asset.',
                '* Rewired third party asset utilization and enhancements.',
                '* Priority, layer based input management system for different game states and user interfaces.',
                '* Editor tool for a priority, layer based input management.',
                '* Control settings and input remapping.',
                'Character controller enhancements changes and overhauls.',
                '* Adaptation for new input system.',
                'Third person animation.',
                '* State machine that blends animations based on networked properties.',
                '* Emotes, networked animations to interact with others.',
                'Networking and gameplay additions and overhauls.',
                '* TV and radio interactable object behaviour.',
                '* Page based interactable objects like newspapers, diaries and their interactive user interface.',
                '* Dialogue subtitle system.',
                '* Tutorial and its user interface implementation.',
                '* Status effect networking, slow, hungry, wet, high jump and similar.',
                '* Status effect interactive user interface with radial duration bar.',
                '* Updated existing crafting logic.',
                '* MLAPI to Photon Bolt networking solution migration.',
                '* Existing interaction system overhaul and upgrades.',
                '* Centralized VFX system, reusing objects with the pooling system.',
                '* Game specific events like storms, world anomalies, player perception and dimension shifts.',
                '* Loading hundreds of objects synced over network, used in the specific game events mentioned.',
                'Structure building system overhaul and enhancements.',
                '* Added new networked structures like pillar based wooden fence and gates. ',
                'AI and NPC behaviour.',
                '* Created new enemies using behaviour trees and existing system',
                '* Added more organic AI behaviour by implementing 3D model spine deformation asset.',
                '* Sea-world AI behaviour, added peaceful fish species as well as hostile predators.',
                'Game settings.',
                '* General, Audio, Video and Control sections, including all the specific options',
                '* User interface and layout.',
                'Online communication.',
                '* Chat with players over network and its user interface.',
                '* Steamworks features, like showing player name in chat and in game.',
                'Character creation.',
                '* Screen and user interface sliders, dropdowns and other creation elements.',
                '* Drawing 3D model on user interface, using additional camera.',
                '* 3D model deformation using blend shapes.',
                '* Implemented UMA2 third party asset.',
                'Other user interface enhancements.',
                '* Tool and weapon repair screen.',
                '* Overhauled existing game interface fully. Player inventory, equipment, crafting, settings, and most of other menus.',
                'Editor tools enhancement.',
                '* Update existing games localization asset with additional code and features.'
            ],
            '2 years',
            [
                ToolData.Unity,
                ToolData.CSharp,
                ToolData.Photon,
                ToolData.Perforce,
                ToolData.Git
            ],
            []
        ),

        new Project
        (
            'Survival Game #2',
            [
                new ProjectImage('./assets/sg2.webp', ''),
                new ProjectImage('./assets/sg2_1.webp', ''),
                new ProjectImage('./assets/sg2_2.webp', ''),
                new ProjectImage('./assets/sg2_3.webp', ''),
                new ProjectImage('./assets/sg2_4.webp', ''),
            ],
            null,
            [
                'Survival game with a playful twist, presented from a first-person shooter perspective.',
            ],
            'Some of the features and responsibilities:',
            [
                'First-Person player animation system.',
                '* All states and transitions including sprint, reload, jump, idle, aim down sight and similar.',
                '* Inverse-Kinematics.',
                '* Tool and weapon specific animations.',
                'Third-Person player animation system.',
                '* All states and transitions including sprint, crouch, prone, jump and similar.',
                '* Network replication for this system.',
                'Gameplay features.',
                '* Interaction system \"Press E to interact\".',
                '* Traveling projectiles math calculation and logic.',
                '* Physics and collision maintenance for local and networked environment.',
                '* Camera Stacking, multiple camera layers and sniper optics.',
                'Networked gameplay features.',
                '* Character stats like health and similar.',
                '* Weapon reload, making sure player has ammo on server.',
                '* Authoritative session scoreboard, user interface and player sorting.',
                '* Player equipment that affects player stats, and user interface.',
                'Advanced networking backend.',
                '* Server-Authoritative movement with client side prediction.',
                '* Lag-Compensation system for traveling projectiles.',
                'Input system and management.',
                '* Standard input management using engine input events.',
                '* Ensured networked authority and server input simulation.',
                'Weapons and tools.',
                '* Weapon characteristics including power, recoil power, bullet spread and reload time.',
                '* Guns recoil and bullet spread system.',
                '* Unique power and recoil patterns for each weapon.',
                '* Attachment system that affects stats of a weapon, and its user interface.',
                '* Crosshair, hit markers, hit sounds, headshot signalization, camera shakes and other shooting related polishes.',
            ],
            '6 months',
            [
                ToolData.Unity,
                ToolData.CSharp,
                ToolData.Mlapi,
                ToolData.Git
            ],
            []
        ),

        new Project
        (
            'Action RPG Game #1',
            [
                new ProjectImage('./assets/rpg1s.webp', './assets/rpg1.webp', 8760),
                new ProjectImage('./assets/rpg1_1.webp', ''),
                new ProjectImage('./assets/rpg1_2.webp', ''),
                new ProjectImage('./assets/rpg1_3.webp', ''),
                new ProjectImage('./assets/rpg1_4.webp', '')
            ],
            null,
            [
                '3D isometric role-playing game that combines classic gameplay mechanics with immersive storytelling and horror-filled world.',
            ],
            'Some of the features and responsibilities:',
            [
                'Objective based quest-line system.',
                '* Unique objectives and dialogue for each NPC.',
                'Non-Playable characters.',
                '* Merchant NPC logic and in game currency.',
                'User Interface.',
                '* Merchants shop user interface.',
                '* Level selection screen.',
                '* NPC Dialogue screen',
                '* Other elements and animations including bars, timers and similar.',
                'Other game systems and gameplay.',
                '* Interaction system "Press E to interact".',
                '* Passive ability, a pet that follows the player and attacks enemies.',
                '* Timed events, other specific game behaviours and more.',
                '* Localization for other languages.'
            ],
            '3 months',
            [
                ToolData.Unity,
                ToolData.CSharp,
                ToolData.Git
            ],
            []
        ),

        new Project
        (
            'Action RPG Game #2',
            [
                new ProjectImage('./assets/rpg2s.webp', './assets/rpg2.webp', 10080),
                new ProjectImage('./assets/rpg2_1.webp', ''),
                new ProjectImage('./assets/rpg2_2.webp', ''),
                new ProjectImage('./assets/rpg2_3.webp', ''),
                new ProjectImage('./assets/rpg2_4.webp', '')
            ],
            null,
            [
                'Dark fantasy role-playing game with a strong emphasis on combat against challenging enemies.',
            ],
            'Some of the features and responsibilities:',
            [
                'Combat system.',
                '* First iteration was souls like combat system, utilizing root motion animation.',
                '* Pivoted to "free flow" Spider-Man and Batman like combat system.',
                '* Attack combos, with multiple possible combo strings.',
                '* Accessibility features, like auto-aim for easier controller gameplay.',
                '* Target switching.',
                '* Visual enemy attack indicator.',
                '* Attack blocking with shield.',
                '* Attack visual effects.',
                'Character Animation.',
                '* Character animation controllers, for both player and enemies.',
                '* Smooth blending between animations.',
                'Player input management.',
                '* Player movement system, run, sprint, dodge and similar.',
                '* Unreal Engine enhanced input mapping system.',
                'Other gameplay related features.',
                '* Character stats like health, poise and stamina.',
                '* Projectile that damages character health, applies physics impact pushing all bodies around.',
                'Enemies AI.',
                '* Prototyped initial enemy behaviour.',
                '* Behaviour tree and AI navigation.',
            ],
            '4 months',
            [
                ToolData.Unreal,
                ToolData.CPlusPlus,
                ToolData.Perforce
            ],
            []
        ),

        new Project
        (
            'Mobile Games',
            [
                new ProjectImage('./assets/spls.webp', './assets/spl.webp', 7280, '52%'),
                new ProjectImage('./assets/scls.webp', './assets/scl.webp', 10800, '60%'),
                new ProjectImage('./assets/buns.webp', './assets/bun.webp', 6640, '64%'),
                new ProjectImage('./assets/wbls.webp', './assets/wbl.webp', 5680)
            ],
            null,
            [
                'A collection of some mobile games I\'ve designed and developed over the years.',
            ],
            'Featured projects:',
            [
                'Splash\'em',
                '* Colorful game with unlimited levels, difficulty progression and simple ball spinning mechanic.',
                '# Snake Colors',
                '* A game inspired by the classic Snake, and modern color matching mechanic.',
                '# Bunners',
                '* An endless runner game in which you play as a little bunny, dodging obstacles to survive.',
                '# White Blocks',
                '* Destroy as many white blocks as you can. Tap tap tap!',
            ],
            '1 years, 6 months',
            [
                ToolData.MixedTools
            ],
            []
        ),

        new Project
        (
            'Prototypes',
            [
                new ProjectImage('./assets/tims.webp', './assets/tim.webp', 13040),
            ],
            new ProjectNote
            (
                'Most of these projects are unfinished and represent ideas or learning pieces rather than a complete work. Many of other prototypes have been developed over the years and will be added here sometime in the future.',
                '#760c00',
                '#ffdcd8'
            ),
            [
                'Created purely for fun, learning and experimentation, showcasing various game worlds or gameplay mechanics I developed.'
            ],
            'Featured projects:',
            [
                'Timecode',
                '* Set in a dystopian cyberpunk future, this action puzzle game tasks players with overcoming environmental challenges, hack systems, and solve intricate puzzles.',
            ],
            '2 months',
            [
                ToolData.MixedTools
            ],
            []
        )
    ];

    static Tools =
    [
        new Project
        (
            'FPS Multiplayer Backend',
            [
                new ProjectImage('./assets/slcs.webp', './assets/slc.webp', 9740),
            ],
            new ProjectNote
            (
                'The source code for this project is not publicly available, but is available upon request. Since this release, I have rewritten the code for other projects and will make this repository public once it has been updated with improvements.',
                '#006c00',
                '#e2ffe2'
            ),
            [
                'Robust backend for FPS multiplayer games, featuring essential components for a fair and responsive online environment.',
            ],
            'Features:',
            [
                'Server authoritative movement.',
                '* Client side movement prediction.',
                '* Client re-simulation of unsynchronized data.',
                'Lag compensation for hitscan and projectile-based weapons.',
                '* Supports full server authorization.',
                '* Supports hybrid authorization, optimized for big number of damageable entities.',
                'Network stats.',
                '* Round trip time or latency.',
                '* Server input buffers.',
                '* Message receiving visual signalization for easier debugging.'
            ],
            '2 months',
            [
                ToolData.Unity,
                ToolData.CSharp,
                ToolData.Mlapi,
                ToolData.Git
            ],
            []
        ),

        new Project
        (
            'Path Generation',
            [
                new ProjectImage('./assets/ppgs.webp', './assets/ppg.webp', 6540),
            ],
            null,
            [
                'Reusable, grid-based procedural path generation algorithm, designed to create dynamic and efficient pathways.',
            ],
            'Features:',
            [
                'Resizeable environment.',
                '* Vertical.',
                '* Horizontal.',
                'Multiple tile sizes.',
                '* 1-1',
                '* 1-2',
                '* 2-1',
                '* 4-4',
            ],
            '1 day',
            [
                ToolData.CSharp,
                ToolData.Git
            ],
            [
                {url: 'https://github.com/mjambresic/path-gen', text: 'Source Code'}
            ]
        ),
    ];

    static Other =
    [
        new Project
        (
            'Homebound',
            [
                new ProjectImage('./assets/homs.webp', './assets/hom.webp', 7520),
            ],
            null,
            [
                'Server-Client software that enables user to effortlessly create and manage a secure home server without a static IP.',
            ],
            'Features:',
            [
                'Server software.',
                '* Ticks every n seconds, with editable tick interval.',
                '* Compares local and gateway state.',
                '* Pushes updated connection data to gateway.',
                'Client software.',
                '* Securely auto connects to remote server using SSH.',
                'Shared data between server and client.',
                '* Allows users to customize scripts and manage their network to meet specific needs.'
            ],
            '1 month',
            [
                ToolData.Bash,
                ToolData.Git
            ],
            [
                {url: 'https://github.com/mjambresic/homebound', text: 'Source Code'}
            ]
        ),
        
        new Project
        (
            'Portfolio',
            [
                new ProjectImage('./assets/pors.webp', ''),
            ],
            null,
            [
                'Designed and developed from scratch, ensuring scalability for future growth and enhancements.',
            ],
            'Features:',
            [
                'Responsive layout, dynamic data loading and instantiation.',
                '* Parallax scrolling.',
                '* Engaging content opacity.',
                '* CSS definitions for different screen sizes.',
                '* Third party lazy loading asset.',
                'Reusable and dynamic modal window.',
                '* Video and screenshot manual and automatic selection carousel.'
            ],
            '1 month',
            [
                ToolData.Javascript,
                ToolData.Node,
                ToolData.Git
            ],
            [
                {url: 'https://github.com/mjambresic/mjambresic.github.io', text: 'Source Code'}
            ]
        )
    ];

    static ArrayIds = 
    {
        games: this.Games,
        tools: this.Tools,
        other: this.Other
    };

    static GetArrayId(array) 
    {
        for (let key in this.ArrayIds) 
        {
            if (this.ArrayIds[key] === array) 
            {
                return key;
            }
        }
        return undefined;
    }

    static GetArrayById(id) 
    {
        return this.ArrayIds[id];
    }
}