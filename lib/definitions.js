// GUN DEFINITIONS
const combineStats = function(arr) {
    try {
    // Build a blank array of the appropiate length
    let data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    arr.forEach(function(component) {
        for (let i=0; i<data.length; i++) {
            data[i] = data[i] * component[i];
        }
    });
    return {
        reload:     data[0],
        recoil:     data[1],
        shudder:    data[2], 
        size:       data[3],
        health:     data[4],
        damage:     data[5],
        pen:        data[6],
        speed:      data[7],
        maxSpeed:   data[8],
        range:      data[9],
        density:    data[10],
        spray:      data[11],
        resist:     data[12],
    };
    } catch(err) {
        console.log(err);
        console.log(JSON.stringify(arr));
    }
};
const skillSet = (() => {
    let config = require('../config.json');
    let skcnv = {
        rld: 0,
        pen: 1,
        str: 2,
        dam: 3,
        spd: 4,
    
        shi: 5,
        atk: 6,
        hlt: 7,
        rgn: 8,
        mob: 9,
    };
    return args => {
        let skills = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let s in args) {
            if (!args.hasOwnProperty(s)) continue;
            skills[skcnv[s]] = Math.round(config.MAX_SKILL * args[s]);
        }
        return skills;
    };
})();

const g = { // Gun info here 
    trap:               [36,    1,     0.25,   0.6,    1,      0.75,   1,      5,      1,      1,      1,      15,     3], 
    swarm:              [18,    0.25,  0.05,   0.4,    1,      0.75,   1,      4,      1,      1,      1,      5,      1],  
    drone:              [50,    0.25,  0.1,    0.6,    1,      1,      1,      2,      1,      1,      1,      0.1,    1], 
    factory:            [60,    1,     0.1,    0.7,    1,      0.75,   1,      3,      1,      1,      1,      0.1,    1], 
    basic:              [18,    1.4,   0.1,    1,      1,      0.75,   1,      4.5,    1,      1,      1,      15,     1],  
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */   
   blank:              [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
        spam:           [1.1,   1,     1,      1.05,   1,      1.1,    1,      0.9,    0.7,    1,      1,      1,      1.05],      
        minion:         [1,     1,     2,      1,      0.4,    0.4,    1.2,    1,      1,      0.75,   1,      2,      1],      
        single:         [1.05,  1,     1,      1,      1,      1,      1,      1.05,   1,      1,      1,      1,      1],  
    sniper:             [1.35,  1,     0.25,   1,      1,      0.8,    1.1,    1.5,    1.5,    1,      1.5,    0.2,    1.15],
        rifle:          [0.8,   0.8,   1.5,    1,      0.8,    0.8,    0.9,    1,      1,      1,      1,      2,      1],     
        assass:         [1.65,  1,     0.25,   1,      1.15,   1,      1.1,    1.18,   1.18,   1,      3,      1,      1.3],
        hunter:         [1.5,   0.7,   1,      0.95,   1,      0.9,    1,      1.1,    0.8,    1,      1.2,    1,      1.15], 
            hunter2:    [1,     1,     1,      0.9,    2,      0.5,    1.5,    1,      1,      1,      1.2,    1,      1.1], 
            preda:      [1.4,   1,     1,      0.8,    1.5,    0.9,    1.2,    0.9,    0.9,    1,      1,      1,      1],   
            snake:      [0.4,   1,     4,      1,      1.5,    0.9,    1.2,    0.2,    0.35,   1,      3,      6,      0.5],   
            sidewind:   [1.5,   2,     1,      1,      1.5,    0.9,    1,      0.15,   0.5,    1,      1,      1,      1],  
            snakeskin:  [0.6,   1,     2,      1,      0.5,    0.5,    1,      1,      0.2,    0.4,    1,      5,      1],
    mach:               [0.5,   0.8,   1.7,    1,      0.7,    0.7,    1,      1,      0.8,    1,      1,      2.5,    1],
        blaster:        [1,     1.2,   1.25,   1.1,    1.5,    1,      0.6,    0.8,    0.33,   0.6,    0.5,    1.5,    0.8], 
        chain:          [1.25,  1.33,  0.8,    1,      0.8,    1,      1.1,    1.25,   1.25,   1.1,    1.25,   0.5,    1.1], 
        mini:           [1.25,  0.6,   1,      0.8,    0.55,   0.45,   1.25,   1.33,   1,      1,      1.25,   0.5,    1.1], 
            stream:     [1.1,   0.6,   1,      1,      1,      0.65,   1,      1.24,   1,      1,      1,      1,      1],    
        shotgun:        [8,     0.4,   1,      1.5,    1,      0.4,    0.8,    1.8,    0.6,    1,      1.2,    1.2,    1], 
    flank:              [1,     1.2,   1,      1,      1.02,   0.81,   0.9,    1,      0.85,   1,      1.2,    1,      1],
        tri:            [1,     0.9,   1,      1,      0.9,    1,      1,      0.8,    0.8,    0.6,    1,      1,      1],  
            trifront:   [1,     0.2,   1,      1,      1,      1,      1,      1.3,    1.1,    1.5,    1,      1,      1],  
            thruster:   [1,     1.5,   2,      1,      0.5,    0.5,    0.7,    1,      1,      1,      1,      0.5,    0.7], 
        auto: /*pure*/  [1.8,   0.75,  0.5,    0.8,    0.9,    0.6,    1.2,    1.1,    1,      0.8,    1.3,    1,      1.25],
            five:       [1.15,  1,     1,      1,      1,      1,      1,      1.05,   1.05,   1.1,    2,      1,      1],   
            autosnipe:  [1,     1,     1,      1.4,    2,      1,      1,      1,      1,      1,      1,      1,      1],  
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */ 
    pound:              [2,     1.6,   1,      1,      1,      2,      1,      2,   0.8,    1,      1.5,    1,      1.15], 
    haub:              [30,     10,   1,      1,      5,      5,      5,      5,       0.8,    2,      1.5,    1,      1.15], 
   msta:              [10,     10,   1,      1,      3,      4,      2,      5,       0.8,    2,      1.5,    1,      1.15], 
    norecoil:              [1,     0.1,   1,      1,      1,      1,      1,      1,   1,    1,      1,    1,      1], 
      destroy:        [2.2,   1.8,   0.5,    1,      2,      2,      1.2,    1,   0.5,    1,      2,      1,      3],
            anni:       [0.85,  1.25,  1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],    
            hive:       [1.5,   0.8,   1,      0.8,    0.7,    0.3,    1,      1,      0.6,    1,      1,      1,      1],
        arty:           [1.2,   0.7,   1,      0.9,    1,      1,      1,      1.15,   1.1,    1,      1.5,    1,      1], 
            mortar:     [1.2,   1,     1,      1,      1.1,    1,      1,      0.8,    0.8,    1,      1,      1,      1],   
            spreadmain: [0.78125, 0.25, 0.5,   1,      0.5,    1,      1,   1.5/0.78, 0.9/0.78,1,      1,      1,      1], 
            spread:     [1.5,   1,     0.25,   1,      1,      1,      1,      0.7,    0.7,    1,      1,      0.25,   1],   
            skim:       [1.33,  0.8,   0.8,    0.9,    1.35,   0.8,    2,      0.3,    0.3,    1,      1,      1,      1.1],   
    twin:               [1,     0.5,   0.9,    1,      0.9,    0.7,    1,      1,      1,      1,      1,      1.2,    1],
        bent:           [1.1,   1,     0.8,    1,      0.9,    1,      0.8,    1,      1,      1,      0.8,    0.5,    1],    
        triple:         [1.2,   0.667, 0.9,    1,      0.85,   0.85,   0.9,    1,      1,      1,      1.1,    0.9,    0.95], 
            quint:      [1.5,   0.667, 0.9,    1,      1,      1,      0.9,    1,      1,      1,      1.1,    0.9,    0.95], 
            dual:       [2,     1,     0.8,    1,      1.5,    1,      1,      1.3,    1.1,    1,      1,      1,      1.25], 
        double:         [1,     1,     1,      1,      1,      0.9,    1,      1,      1,      1,      1,      1,      1],
            hewn:       [1.25,  1.5,   1,      1,      0.9,    0.85,   1,      1,      0.9,    1,      1,      1,      1],
        puregunner:     [1,     0.25,  1.5,    1.2,    1.35,   0.25,   1.25,   0.8,    0.65,   1,      1.5,    1.5,    1.2],
            machgun:    [0.66,  0.8,   2,      1,      1,      0.75,   1,      1.2,    0.8,    1,      1,      2.5,    1], 
    gunner:             [1.25,  0.25,  1.5,    1.1,    1,      0.35,   1.35,   0.9,    0.8,    1,      1.5,    1.5,    1.2],
        power:          [1,     1,     0.6,    1.2,    1,      1,      1.25,   2,      1.7,    1,      2,      0.5,    1.5], 
            nail:       [0.85,  2.5,   1,      0.8,    1,      0.7,    1,      1,      1,      1,      2,      1,      1],       
        fast:           [1,     1,     1,      1,      1,      1,      1,      1.2,    1,      1,      1,      1,      1], 
    turret:             [2,     1,     1,      1,      0.8,    0.6,    0.7,    1,      1,      1,      0.1,    1,      1], 
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
    battle:             [1,     1,     1,      1,      1.25,   1.15,   1,      1,      0.85,   1,      1,      1,      1.1],
        bees:           [1.3,   1,     1,      1.4,    1,      1.5,    0.5,    3,      1.5,    1,      0.25,   1,      1],   
        carrier:        [1.5,   1,     1,      1,      1,      0.8,    1,      1.3,    1.2,    1.2,    1,      1,      1],
    hexatrap:           [1.3,   1,     1.25,   1,      1,      1,      1,      0.8,    1,      0.5,    1,      1,      1],     
    block:              [1.1,   2,     0.1,    1.5,    2,      1,      1.25,   1.5,    2.5,    1.25,   1,      1,      1.25],
        construct:      [1.3,   1,     1,      0.9,    1,      1,      1,      1,      1.1,    1,      1,      1,      1], 
        boomerang:      [0.8,   1,     1,      1,      0.5,    0.5,    1,      0.75,   0.75,   1.333,  1,      1,      1], 
    over:               [1.25,  1,     1,      0.85,   0.7,    0.8,    1,      1,      0.9,    1,      2,      1,      1], 
        meta:           [1.333, 1,     1,      1,      1,      0.667,  1,      1,      1,      1,      1,      1,      1],   
        weak:           [2,     1,     1,      1,      0.6,    0.6,    0.8,    0.5,    0.7,    0.25,   0.3,    1,      1], 
         norecoil:           [1,     0.000001,     1,      1,      1,    1,   1,   1,    1,    1,   1,    1,      1],   
        master:         [3,     1,     1,      0.7,    0.4,    0.7,    1,      1,      1,      0.1,    0.5,    1,      1], 
        sunchip:        [5,     1,     1,      1.4,    0.5,    0.4,    0.6,    1,      1,      1,      0.8,    1,      1],     
    babyfactory:        [1.5,   1,     1,      1,      1,      1,      1,      1,      1.35,   1,      1,      1,      1], 
    lowpower:           [1,     1,     2,      1,      0.5,    0.5,    0.7,    1,      1,      1,      1,      0.5,    0.7], 
    halfrecoil:         [1,     0.5,   1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    morerecoil:         [1,     1.15,  1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    muchmorerecoil:     [1,     1.35,  1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    lotsmorrecoil:      [1,     1.8,   1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    tonsmorrecoil:      [1,     4,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    doublereload:       [0.5,   1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],  
    morereload:         [0.75,  1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    halfreload:         [2,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    lessreload:         [1.5,   1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    threequartersrof:   [1.333, 1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    morespeed:          [1,     1,     1,      1,      1,      1,      1,      1.3,    1.3,    1,      1,      1,      1], 
    bitlessspeed:       [1,     1,     1,      1,      1,      1,      1,      0.93,   0.93,   1,      1,      1,      1], 
    slow:               [1,     1,     1,      1,      1,      1,      1,      0.7,    0.7,    1,      1,      1,      1], 
    halfspeed:          [1,     1,     1,      1,      1,      1,      1,      0.5,    0.5,    1,      1,      1,      1],
    notdense:           [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      0.1,    1,      1],
    halfrange:          [1,     1,     1,      1,      1,      1,      1,      1,      1,      0.5,    1,      1,      1], 
    fake:               [1,     1,     1,   0.00001, 0.0001,   1,      1,   0.00001,   2,      0,      1,      1,      1], 
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
    op:                 [0.5,   1.3,   1,      1,      4,      4,      4,      3,      2,      1,      5,      2,      1],       
    protectorswarm:     [5,  0.000001, 1,      1,      100,    1,      1,      1,      1,     0.5,     5,      1,      10], 
};

const dfltskl = 9;

// NAMES
const statnames = {
    smasher: 1,
    drone: 2,
    necro: 3,
    swarm: 4,
    trap: 5,
    generic: 6,
};
const gunCalcNames = {
    default: 0,
    bullet: 1,
    drone: 2,
    swarm: 3,
    fixedReload: 4,
    thruster: 5,
    sustained: 6,
    necro: 7,
    trap: 8,
};

// ENTITY DEFINITIONS
exports.genericEntity = {
    NAME: '',
    LABEL: 'Unknown Entity',
    TYPE: 'unknown',
    DAMAGE_CLASS: 0, // 0: def, 1: food, 2: tanks, 3: obstacles
    DANGER: 0,
    VALUE: 0,
    SHAPE: 0,
    COLOR: 16,    
    INDEPENDENT: false,
    CONTROLLERS: ['doNothing'],    
    HAS_NO_MASTER: false,
    MOTION_TYPE: 'glide', // motor, swarm, chase
    FACING_TYPE: 'toTarget', // turnWithSpeed, withMotion, looseWithMotion, toTarget, looseToTarget
    DRAW_HEALTH: false,
    DRAW_SELF: true,
    DAMAGE_EFFECTS: true,
    RATEFFECTS: true,
    MOTION_EFFECTS: true,
    INTANGIBLE: false,
    ACCEPTS_SCORE: true,
    GIVE_KILL_MESSAGE: false,
    CAN_GO_OUTSIDE_ROOM: false,
    HITS_OWN_TYPE: 'normal', // hard, repel, never, hardWithBuffer
    DIE_AT_LOW_SPEED: false,
    DIE_AT_RANGE: false,
    CLEAR_ON_MASTER_UPGRADE: false,
    PERSISTS_AFTER_DEATH: false,
    VARIES_IN_SIZE: false,
    HEALTH_WITH_LEVEL: true,
    CAN_BE_ON_LEADERBOARD: true,
    HAS_NO_RECOIL: false,
    AUTO_UPGRADE: 'none',
    BUFF_VS_FOOD: false,
    OBSTACLE: false,
    CRAVES_ATTENTION: false,
    NECRO: false,
    UPGRADES_TIER_1: [],
    UPGRADES_TIER_2: [],
    UPGRADES_TIER_3: [],
    SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    LEVEL: 0,
    SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
    GUNS: [],
    MAX_CHILDREN: 0,
    BODY: {
        ACCELERATION: 1,
        SPEED: 0,
        HEALTH: 1000,
        RESIST: 1,
        SHIELD: 0,
        REGEN: 0,
        DAMAGE: 1,
        PENETRATION: 1,

        RANGE: 0,
        FOV: 1,
        DENSITY: 1,
        STEALTH: 1,
        PUSHABILITY: 1,        
        HETERO: 2,
    },    
    FOOD: {
        LEVEL: -1,
    },
};

// FOOD
exports.food = {
    TYPE: 'food',
    DAMAGE_CLASS: 1,
    CONTROLLERS: ['moveInCircles'],
    HITS_OWN_TYPE: 'repel',
    MOTION_TYPE: 'drift',
    FACING_TYPE: 'turnWithSpeed',
    VARIES_IN_SIZE: true,
    BODY: {
        STEALTH: 30,
        PUSHABILITY: 1,
    },
    DAMAGE_EFFECTS: false,
    RATEFFECTS: false,
    HEALTH_WITH_LEVEL: false,
    GIVE_KILL_MESSAGE: false,
};

const basePolygonDamage = 1;
const basePolygonHealth = 2;
exports.hugePentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 5,
    },
    LABEL: 'Alpha Pentagon',
    VALUE: 15000,
    SHAPE: -5,
    SIZE: 58,
    COLOR: 14,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 80,
        HEALTH: 300 * basePolygonHealth,
        RESIST: Math.pow(1.25, 3),
        SHIELD: 40 * basePolygonHealth,
        REGEN: 0.6,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: false,
};
exports.bigPentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 4,
    },
    LABEL: 'Beta Pentagon',
    VALUE: 2500,
    SHAPE: 5,
    SIZE: 30,
    COLOR: 14,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 30,
        HEALTH: 50 * basePolygonHealth,
        RESIST: Math.pow(1.25, 2),
        SHIELD: 20 * basePolygonHealth,
        REGEN: 0.2,
    },
    DRAW_HEALTH: true,
    // GIVE_KILL_MESSAGE: true,
};
exports.pentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 3,
    },
    LABEL: 'Pentagon',
    VALUE: 400,
    SHAPE: 5,
    SIZE: 16,
    COLOR: 14,
    BODY: {
        DAMAGE: 1.5 * basePolygonDamage,
        DENSITY: 8,
        HEALTH: 10 * basePolygonHealth,
        RESIST: 1.25,
        PENETRATION: 1.1,
    },
    DRAW_HEALTH: true,
};
exports.Hexagon = {
  PARENT: [exports.food],
  FOOD: {
    LEVEL: 6,
  },
  LABEL: "Hexagon",
  VALUE: 1000,
  SHAPE: 6,
  SIZE: 20,
  COLOR: 1,
  BODY: {
    DAMAGE: 1.5 * basePolygonDamage,
    DENSITY: 8,
    HEALTH: 10 * basePolygonHealth,
    RESIST: 1.25,
    PENETRATION: 1.1
  },
  DRAW_HEALTH: true
};
exports.Septagon = {
  PARENT: [exports.food],
  FOOD: {
    LEVEL: 7,
  },
  LABEL: "Septagon",
  VALUE: 2000,
  SHAPE: 7,
  SIZE: 26,
  COLOR: 10,
  BODY: {
    DAMAGE: 1.5 * basePolygonDamage,
    DENSITY: 8,
    HEALTH: 10 * basePolygonHealth,
    RESIST: 1.25,
    PENETRATION: 1.1
  },
  DRAW_HEALTH: true
};
exports.greenpentagon = {
  PARENT: [exports.food],
  FOOD: {
    LEVEL: 3
  },
  LABEL: "Pentagon",
  VALUE: 2400,
  SHAPE: 5,
  SIZE: 16,
  COLOR: 1,
  BODY: {
    DAMAGE: 1.5 * basePolygonDamage,
    DENSITY: 8,
    HEALTH: 10 * basePolygonHealth,
    RESIST: 1.25,
    PENETRATION: 1.1
  },
  DRAW_HEALTH: true
};
exports.triangle = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 2,
    },
    LABEL: 'Triangle',
    VALUE: 120,
    SHAPE: 3,
    SIZE: 9,
    COLOR: 2,
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 6,
        HEALTH: 3 * basePolygonHealth,
        RESIST: 1.15,
        PENETRATION: 1.5,
    },
    DRAW_HEALTH: true,
};
exports.greentriangle = {
  PARENT: [exports.food],
  FOOD: {
    LEVEL: 2
  },
  LABEL: "Triangle",
  VALUE: 2400,
  SHAPE: 3,
  SIZE: 9,
  COLOR: 1,
  BODY: {
    DAMAGE: basePolygonDamage,
    DENSITY: 6,
    HEALTH: 33 * basePolygonHealth,
    RESIST: 1.15,
    PENETRATION: 1.5
  },
  DRAW_HEALTH: true
};
exports.greensquare = {
  PARENT: [exports.food],
  FOOD: {
    LEVEL: 1
  },
  LABEL: "Square",
  VALUE: 2400,
  SHAPE: 4,
  SIZE: 10,
  COLOR: 1,
  BODY: {
    DAMAGE: basePolygonDamage,
    DENSITY: 4,
    HEALTH: basePolygonHealth,
    PENETRATION: 20
  },
  DRAW_HEALTH: true,
  INTANGIBLE: false
};
exports.square = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 1,
    },
    LABEL: 'Bullet',
    VALUE: 30,
    SHAPE: "M 0 0 L 0 1 L 7 1 L 9 0 L 7 -1 L 0 -1 L 0 0",
    SIZE: 2,
    COLOR: 13,
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 4,
        HEALTH: basePolygonHealth,
        PENETRATION: 2,
    },
    DRAW_HEALTH: false,
    INTANGIBLE: false,
};
exports.egg = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 0,
    },
    LABEL: 'Egg',
    VALUE: 10,
    SHAPE: 0,
    SIZE: 5,
    COLOR: 6,
    INTANGIBLE: true,
    BODY: {
        DAMAGE: 0,
        DENSITY: 2,
        HEALTH: 0.0011,
        PUSHABILITY: 0,
    },
    DRAW_HEALTH: false,
};

exports.gem = {
    PARENT: [exports.food],
    LABEL: 'Gem',
    VALUE: 2000,
    SHAPE: 6,
    SIZE: 5,
    COLOR: 0,
    BODY: {
        DAMAGE: basePolygonDamage/4,
        DENSITY: 4,
        HEALTH: 10,
        PENETRATION: 2,
        RESIST: 2,
        PUSHABILITY: 0.25,
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
};
exports.obstacle = {
    TYPE: 'wall',
    DAMAGE_CLASS: 1,
    LABEL: 'Rock',
    FACING_TYPE: 'turnWithSpeed',
    SHAPE: -9,
    BODY: {
        PUSHABILITY: 0,
        HEALTH: 10000,
        SHIELD: 10000,
        REGEN: 1000,
        DAMAGE: 1,
        RESIST: 100,
        STEALTH: 1,
    },
    VALUE: 0,
    SIZE: 60,
    COLOR: 16,
    VARIES_IN_SIZE: true,
    GIVE_KILL_MESSAGE: true,
    ACCEPTS_SCORE: false,
};
    exports.babyObstacle = {
        PARENT: [exports.obstacle],
        SIZE: 25,
        SHAPE: -7,
        LABEL: "Gravel",
    };

// WEAPONS
const wepHealthFactor = 0.5;
const wepDamageFactor = 1.5;
exports.bullet = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    SHAPE: "M 0 0 L 0 1 L 7 1 L 9 0 L 7 -1 L 0 -1 L 0 0",
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
    exports.casing = {
        PARENT: [exports.bullet],
        LABEL: 'Shell',
        TYPE: 'swarm',
    };

exports.swarm = {
    LABEL: 'Swarm Drone',
    TYPE: 'swarm',
    ACCEPTS_SCORE: false,
    SHAPE: 3,
    MOTION_TYPE: 'swarm',
    FACING_TYPE: 'smoothWithMotion',
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    CRAVES_ATTENTION: true,
    BODY: {
        ACCELERATION: 3,
        PENETRATION: 1.5,
        HEALTH: 0.35 * wepHealthFactor,
        DAMAGE: 1.5 * wepDamageFactor,
        SPEED: 4.5,
        RESIST: 1.6,
        RANGE: 225,
        DENSITY: 12,
        PUSHABILITY: 0.5,
        FOV: 1.5,
    },
    DIE_AT_RANGE: true,
    BUFF_VS_FOOD: true,
};
    exports.bee = {
        PARENT: [exports.swarm],
        PERSISTS_AFTER_DEATH: true, 
        SHAPE: 4, 
        LABEL: 'Drone',
        HITS_OWN_TYPE: 'hardWithBuffer',
    };
    exports.autoswarm = {
        PARENT: [exports.swarm],
        AI: { FARMER: true, },
        INDEPENDENT: true,
    };

exports.trap = {
    LABEL: 'Thrown Trap',
    TYPE: 'trap',
    ACCEPTS_SCORE: false,
    SHAPE: -3, 
    MOTION_TYPE: 'glide', // def
    FACING_TYPE: 'turnWithSpeed',
    HITS_OWN_TYPE: 'push',
    DIE_AT_RANGE: true,
    BODY: {
        HEALTH: 1 * wepHealthFactor,
        DAMAGE: 2 * wepDamageFactor,
        RANGE: 450,
        DENSITY: 2.5,
        RESIST: 2.5,
        SPEED: 0,
    },
};
    exports.block = {
        LABEL: 'Set Trap',
        PARENT: [exports.trap],
        SHAPE: -4,
        MOTION_TYPE: 'motor',    
        CONTROLLERS: ['goToMasterTarget'],
        BODY: {
            SPEED: 1,
            DENSITY: 5,
        },
    };
    exports.boomerang = {
        LABEL: 'Boomerang',
        PARENT: [exports.trap],
        CONTROLLERS: ['boomerang'],
        MOTION_TYPE: 'motor',  
        HITS_OWN_TYPE: 'never',
        SHAPE: -5,
        BODY: {
            SPEED: 1.25,
            RANGE: 120,
        },
    };

exports.drone = {
    LABEL: 'Drone',
    TYPE: 'drone',
    ACCEPTS_SCORE: false,
    DANGER: 2,
    CONTROL_RANGE: 0,
    SHAPE: 3,
    MOTION_TYPE: 'chase',
    FACING_TYPE: 'smoothToTarget',
    CONTROLLERS: [
        'nearestDifferentMaster',
        'canRepel',
        'mapTargetToGoal',
        'hangOutNearMaster'
    ],
    AI: { BLIND: true, },
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 0.05,
        HEALTH: 0.6 * wepHealthFactor,
        DAMAGE: 1.25 * wepDamageFactor,
        SPEED: 3.8,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 0.8,
    },
    HITS_OWN_TYPE: 'hard',
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    BUFF_VS_FOOD: true,
};
    exports.sunchip = {
        PARENT: [exports.drone],
        SHAPE: 4,
        NECRO: true,
        HITS_OWN_TYPE: 'hard',
        BODY: {
            FOV: 0.5,
        },
        AI: {
            BLIND: true,
            FARMER: true,
        },
        DRAW_HEALTH: false,
    };
    exports.autosunchip = {
        PARENT: [exports.sunchip],
        AI: {
            BLIND: true,
            FARMER: true,
        },
        INDEPENDENT: true,
    };
    exports.gunchip = {
        PARENT: [exports.drone],
        SHAPE: -2,
        NECRO: true,
        HITS_OWN_TYPE: 'hard',
        BODY: {
            FOV: 0.5,
        },
        AI: {
            BLIND: true,
            FARMER: true,
        },
        DRAW_HEALTH: false,
    };

exports.missile = {
    PARENT: [exports.bullet],
    LABEL: 'Missile',
  SHAPE: "M -2 -0.1 L -2 1 L -1.9 1 L -1 0.5 L 2 0.5 L 3 0 L 2 -0.5 L -1 -0.5 L -2 -1 L -2 -0.6 L -2 0.1",
    INDEPENDENT: true,
    BODY: {
        RANGE: 200,
    },  
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  14,     6,      1,      0,     0,     180,     0,   ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,
            }, }, {
        POSITION: [  14,     6,      1,      0,      0,     180,     0,  ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,    
            }, }, 
    ],
};
    exports.hypermissile = {
        PARENT: [exports.missile],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  14,     6,      1,      0,     -2,     150,     0,   ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                    STAT_CALCULATOR: gunCalcNames.thruster,
                }, }, {
            POSITION: [  14,     6,      1,      0,      2,     210,     0,   ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                    STAT_CALCULATOR: gunCalcNames.thruster,
                }, }, {        
            POSITION: [  14,     6,      1,      0,     -2,      90,    0.5,  ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, }, {
            POSITION: [  14,     6,      1,      0,      2,     270,    0.5,  ],  
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, },
        ],
    };
    exports.snake = {
        PARENT: [exports.bullet],
        LABEL: 'Snake',
        INDEPENDENT: true,
        BODY: {
            RANGE: 120,
        },  
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,    12,     1.4,     8,      0,     180,    0,   ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    STAT_CALCULATOR: gunCalcNames.thruster,
                    SHOOT_SETTINGS: combineStats([
                        g.basic, g.sniper, g.hunter, g.hunter2, g.snake, g.snakeskin,
                    ]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, }, {
            POSITION: [  10,    12,     0.8,     8,      0,     180,   0.5,  ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    NEGATIVE_RECOIL: true,
                    STAT_CALCULATOR: gunCalcNames.thruster,
                    SHOOT_SETTINGS: combineStats([
                        g.basic, g.sniper, g.hunter, g.hunter2, g.snake,
                    ]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, },
        ],
    };
    exports.hive = {
        PARENT: [exports.bullet],
        LABEL: 'Hive',
        BODY: {
            RANGE: 90,
            FOV: 0.5,
        },  
        FACING_TYPE: 'turnWithSpeed',
        INDEPENDENT: true,
        CONTROLLERS: ['alwaysFire', 'nearestDifferentMaster', 'targetSelf',],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,    9.5,    0.6,     7,      0,      108,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,    
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      180,    0.2,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      252,    0.4,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      324,    0.6,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      36,     0.8,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, 
        ],
    };

// TANK CLASSES
const base = {
    ACCEL: 1.6,
    SPEED: 6,
    HEALTH: 1000,
    DAMAGE: 3,
    RESIST: 1,
    PENETRATION: 1.05,
    SHIELD: 8,
    REGEN: 0.025,
    FOV: 1,
    DENSITY: 0.5,
};
exports.genericTank = {
    LABEL: 'Unknown Class',
    TYPE: 'tank',
    DAMAGE_CLASS: 2,
    DANGER: 5,
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'toTarget',
    SIZE: 12,
    MAX_CHILDREN: 0,   
    DAMAGE_EFFECTS: false,
    BODY: { // def
        ACCELERATION: base.ACCEL,
        SPEED: base.SPEED,
        HEALTH: base.HEALTH, 
        DAMAGE: base.DAMAGE, 
        PENETRATION: base.PENETRATION, 
        SHIELD: base.SHIELD,
        REGEN: base.REGEN,
        FOV: base.FOV,
        DENSITY: base.DENSITY,
        PUSHABILITY: 0.9,
        HETERO: 3,
    },
    GUNS: [],
    TURRETS: [],
    GIVE_KILL_MESSAGE: true,
    DRAW_HEALTH: true,
};
let gun = { };

exports.autoTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.8
    },
    COLOR: 16,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: exports.bullet,
            }, },
    ],
};
    exports.mausgun = {
        PARENT: [exports.genericTank],
        LABEL: '',
       LABEL: 'Maus turret',
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
        SHAPE: [[-0.69995,-0.8],[1.3999,-0.8001],[1.401,0.7984],[-0.7,0.8005]],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [  20,     3,      1,      0,     5.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  25,     8,      1,      0,    0,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pound, g.pound, g.norecoil]),
                TYPE: exports.bullet,
                }, }
        ],
    };
exports.mggun = {
  PARENT: [exports.genericTank],
  LABEL: "Mg",
  CONTROLLERS: [
    "canRepel",
    "onlyAcceptInArc",
    "mapAltToFire",
    "nearestDifferentMaster"
  ],
  SHAPE: "M -2 -0.1 L -2 1 L 2 1 L 2 -1 L 0 -1 L -2 -1 L -2 0.1",
  BODY: {
    FOV: 2,
  },
  COLOR: 16,
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [60, 7, 1, 0, 0, 0, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.doublereload,
          g.morespeed,
          g.weak,
        ]),
        TYPE: exports.bullet
      }, }, {
         POSITION: [40, 10, 1, 0, 0, 0, 0.5],
      }
  ]
};
exports.Tankgun = {
  PARENT: [exports.genericTank],
  LABEL: "Tank-gun",
  CONTROLLERS: [
    "canRepel",
    "onlyAcceptInArc",
    "mapAltToFire",
    "nearestDifferentMaster"
  ],
  SHAPE: "M -2 -0.1 L -2 1 L 1 1 L 1 -1 L 0 -1 L -2 -1 L -2 0.1",
  BODY: {
    FOV: 2,
  },
  COLOR: 16,
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
             /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  10,     7,      1.2,      80,    0,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.msta, g.norecoil]),
                TYPE: exports.bullet,
            }, }, {
              POSITION: [  80,     5,      1,      0,    0,     0,     0.5,  ],
              }, {
              
            POSITION: [  30,     7,      1,      0,    0,     0,     0.5,  ],
            }, {
              POSITION: [  15,     9,      1,      0,    0,     0,     0.5,  ],
              }, {
              POSITION: [  10,     7,      1,      50,    0,     0,     0.5,  ],
            
      }
  ]
};
exports.Tankgun2 = {
  PARENT: [exports.genericTank],
  LABEL: "Tank-gun",
  CONTROLLERS: [
    "canRepel",
    "onlyAcceptInArc",
    "mapAltToFire",
    "nearestDifferentMaster"
  ],
  
  BODY: {
    FOV: 2,
  },
  COLOR: 16,
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
         GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
             /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  30,     6,      1,      0,    0,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pound, g.pound, g.destroy, g.norecoil]),
                TYPE: exports.bullet,
            }, }, {
              
            POSITION: [  20,     8,      1,      0,    0,     0,     0.5,  ], 
            }
  ]
};
exports.missilegun = {
  PARENT: [exports.genericTank],
  LABEL: "Missile-gun",
  CONTROLLERS: [
    "canRepel",
    "onlyAcceptInArc",
    "mapAltToFire",
    "nearestDifferentMaster"
  ],
  SHAPE: "M -2 -0.1 L -2 1 L 2 1 L 2 -1 L 0 -1 L -2 -1 L -2 0.1",
  BODY: {
    FOV: 2,
  },
  COLOR: 16,
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [60, 7, 1.2, 0, 0, 0, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.doublereload,
          g.morespeed,
          g.weak,
          g.pound,
          g.pound,
          g.norecoil
        ]),
        TYPE: exports.missile
      }, 
      }
  ]
};
exports.crewdeg = {
  PARENT: [exports.genericTank],
  LABEL: "Crew Deg",
  CONTROLLERS: [
    "canRepel",
    "onlyAcceptInArc",
    "mapAltToFire",
    "nearestDifferentMaster"
  ],
  BODY: {
    FOV: 2,
  },
  GUNS: []
};
exports.barrel = { // not a gun Lmfao, tbh what did you think?
  PARENT: [exports.genericTank],
  LABEL: "Mg",
  CONTROLLERS: [],
  SHAPE: "M -2 -0.1 L -2 1 L 2 1 L 2 -1 L 0 -1 L -2 -1 L -2 0.1",
  BODY: {
    FOV: 2,
  },
  COLOR: 16,
  GUNS: []
};

exports.tritrapgun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  20,    16,      1,      0,      0,      0,      0,   ], 
        }, {
        POSITION: [   2,    16,     1.1,     20,     0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.auto]),
                TYPE: exports.block,
            }, },
    ],
};
exports.smasherBody = {
    LABEL: '',
    CONTROLLERS: ['spin'], 
    COLOR: 9,
    SHAPE: 6,
    INDEPENDENT: true,
};
exports.spikeBody = {
    LABEL: '',
    CONTROLLERS: ['spin'],
    COLOR: 9,
    SHAPE: -4,
    INDEPENDENT: true,
};


exports.TankBody = {
    LABEL: '',
    COLOR: 9,
    SHAPE: [[-1.19,-1.01],[2,-0.98],[2.01,1.034],[-1.19,1]],
    INDEPENDENT: true,
};
    exports.spikeBody1 = {
        LABEL: '',
        CONTROLLERS: ['fastspin'], 
        COLOR: 9,
        SHAPE: 3,
        INDEPENDENT: true,
    };
    exports.spikeBody2 = {
        LABEL: '',
        CONTROLLERS: ['reversespin'], 
        COLOR: 9,
        SHAPE: 3,
        INDEPENDENT: true,
    };
exports.megasmashBody = {
    LABEL: '',
    CONTROLLERS: ['spin'], 
    COLOR: 9,
    SHAPE: -6,
    INDEPENDENT: true,
};
exports.dominationBody = {
    LABEL: '',
    CONTROLLERS: ['dontTurn'], 
    COLOR: 9,
    SHAPE: 8,
    INDEPENDENT: true,
};
    exports.baseSwarmTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Protector',
        COLOR: 16,
        BODY: {
            FOV: 2,
        },
        CONTROLLERS: ['nearestDifferentMaster'], 
        AI: {
            NO_LEAD: true,
            LIKES_SHAPES: true,
        },
        INDEPENDENT: true,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   5,    4.5,    0.6,     7,      2,      0,     0.15, ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
                    TYPE: exports.swarm,
                    STAT_CALCULATOR: gunCalcNames.swarm,          
                }, }, {
            POSITION: [   5,    4.5,    0.6,     7,     -2,      0,     0.15, ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
                    TYPE: exports.swarm,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, {
            POSITION: [   5,    4.5,    0.6,    7.5,     0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
                    TYPE: [exports.swarm, { INDEPENDENT: true, AI: { LIKES_SHAPES: true, }, }, ],
                    STAT_CALCULATOR: gunCalcNames.swarm,  
            }, }
        ],
    };
    exports.baseGunTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Protector',
        BODY: {
            FOV: 5,
        },
        ACCEPTS_SCORE: false,
        CONTROLLERS: ['nearestDifferentMaster'], 
        INDEPENDENT: true,
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  12,    12,     1,       6,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.destroy]),
                    TYPE: exports.bullet,          
                }, }, {
            POSITION: [  11,    13,     1,       6,      0,      0,     0.1,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.destroy]),
                    TYPE: exports.bullet,          
                }, }, {
            POSITION: [   7,    13,    -1.3,     6,      0,      0,      0,   ],
                }
        ],
    };
        exports.baseProtector = {
            PARENT: [exports.genericTank],
            LABEL: 'Base',
            SIZE: 64,
            DAMAGE_CLASS: 0,
            ACCEPTS_SCORE: false,
            SKILL: skillSet({ 
                rld: 1,
                dam: 1,
                pen: 1,
                spd: 1,
                str: 1,
            }),
            BODY: { // def
                SPEED: 0,
                HEALTH: 10000, 
                DAMAGE: 10, 
                PENETRATION: 0.25, 
                SHIELD: 1000,
                REGEN: 100,
                FOV: 1,
                PUSHABILITY: 0,
                HETERO: 0,
            },
            //CONTROLLERS: ['nearestDifferentMaster'],
            FACING_TYPE: 'autospin',
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  25,     0,      0,      0,     360,  0], 
                    TYPE: exports.dominationBody,
                        }, {
                POSITION: [  12,     7,      0,      45,     100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        }, {
                POSITION: [  12,     7,      0,     135,    100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        }, {
                POSITION: [  12,     7,      0,     225,    100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        }, {
                POSITION: [  12,     7,      0,     315,    100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        },
            ],
            GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,      45,     0,   ], }, {   
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,     135,     0,   ], }, {   
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,     225,     0,   ], }, {   
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,     315,     0,   ], }, {
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,      45,     0,   ], }, {   
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,     135,     0,   ], }, {   
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,     225,     0,   ], }, {   
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,     315,     0,   ], }, 
            ],
        };

exports.minion = {
    PARENT: [exports.genericTank],
    LABEL: 'Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.5,
        SPEED: 3,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     9,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.minion]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, }, 
    ],
};
exports.pillboxTurret = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    BODY: {
        FOV: 2,
    },
    HAS_NO_RECOIL: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    11,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minion, g.turret, g.power, g.auto, g.notdense]),
                TYPE: exports.bullet,
            }, },
    ],
};
exports.pillbox = {
    LABEL: 'Pillbox',
    PARENT: [exports.trap],
    SHAPE: -4,
    MOTION_TYPE: 'motor',    
    CONTROLLERS: ['goToMasterTarget', 'nearestDifferentMaster'],
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true, 
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      0,     360,  1], 
            TYPE: exports.pillboxTurret,
        }
    ]
};
exports.skimturret = {
    PARENT: [exports.genericTank],
    BODY: {
        FOV: base.FOV * 2,
    },
    COLOR: 2,
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    LABEL: '',
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  10,    14,    -0.5,     9,      0,      0,      0,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
                TYPE: exports.hypermissile,
            }, }, {
        POSITION: [  17,    15,      1,      0,      0,      0,      0,  ], 
            },
    ],
};
    exports.skimboss = {
        PARENT: [exports.genericTank],
        BODY: {
            HEALTH: 300,
            DAMAGE: 2,
            SHIELD: 200,
        },
        SHAPE: 3, 
        COLOR: 2,
        FACING_TYPE: 'autospin',
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [  15,     5,      0,     60,     170, 0], 
                TYPE: exports.skimturret,
                    }, {
            POSITION: [  15,     5,      0,     180,    170, 0], 
                TYPE: exports.skimturret,
                    }, {
            POSITION: [  15,     5,      0,     300,    170, 0], 
                TYPE: exports.skimturret,
                    },
        ],
    };

function makeAuto(type, name = -1, options = {}) {
    let turret = { type: exports.autoTurret, size: 10, independent: true, };
    if (options.type != null) { turret.type = options.type; }
    if (options.size != null) { turret.size = options.size; }
    if (options.independent != null) { turret.independent = options.independent; }
    
    let output = JSON.parse(JSON.stringify(type));
    let autogun = {
        /*********  SIZE               X       Y     ANGLE    ARC */
        POSITION: [  turret.size,     0,      0,     180,    360,  1,], 
        TYPE: [turret.type, { CONTROLLERS: ['nearestDifferentMaster'], INDEPENDENT: turret.independent, }],
    };
    if (type.GUNS != null) { output.GUNS = type.GUNS; }
    if (type.TURRETS == null) { output.TURRETS = [autogun]; }
    else { output.TURRETS = [...type.TURRETS, autogun]; }
    if (name == -1) { output.LABEL = 'Auto-' + type.LABEL; } else { output.LABEL = name; }
    output.DANGER = type.DANGER + 1;
    return output;
}
function makeHybrid(type, name = -1) {
    let output = JSON.parse(JSON.stringify(type));
    let spawner = { 
        /********* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [   7,     12,    1.2,     8,      0,     180,     0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.weak]),
            TYPE: [exports.drone, { INDEPENDENT: true, }],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: false,    
            MAX_CHILDREN: 3,
        }, };
    if (type.TURRETS != null) { output.TURRETS = type.TURRETS; }
    if (type.GUNS == null) { output.GUNS = [spawner]; }
    else { output.GUNS = [...type.GUNS, spawner]; }
    if (name == -1) { output.LABEL = 'Hybrid ' + type.LABEL; } else { output.LABEL = name; }
    return output;
}

exports.basic = {
    PARENT: [exports.genericTank],
    LABEL: 'Basic',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
        }, }, 
    ],
};
        exports.testbed = {
            PARENT: [exports.genericTank],
            LABEL: 'TESTBED',
            RESET_UPGRADES: true,
            SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            LEVEL: -1,
            BODY: { // def
                SHIELD: 1000,
                REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
                FOV: 2,
            },
            SHAPE: [
              [-1, -0.8],
              [-0.8, -1],
              [0.8, -1],
              [1, -0.8],
              [0.2, 0],
              [1, 0.8],
              [0.8, 1],
              [-0.8, 1],
              [-1, 0.8],
            ],
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                    TYPE: [exports.bullet, { SHAPE: 5, }],
                }, }, 
            ],
        };
            exports.single = {
                PARENT: [exports.genericTank],
                LABEL: 'Single',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.single]),
                            TYPE: exports.bullet,
                        }, },  {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],                         
                    }
                ],
            };  
            exports.AC = {
                PARENT: [exports.genericTank],
                LABEL: 'Arena Closer',
              NAME: "Arena Closer",
              COLOR: 35,
              SIZE: 60,
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  16,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.single, g.op]),
                            TYPE: exports.bullet,
                        },
                    }
                ],
            }; 
exports.leopard = {
        PARENT: [exports.genericTank],
  SIZE: 18,
        LABEL: 'Leopard II',
        SHAPE: "M -2 -0.1 L -2 1 L 2 1 L 3 0.6 L 3 -0.6 L 2 -1 L 0 -1 L -2 -1 L -2 0.1",
   TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  35,   0,      0,      0,     0,  0,], 
                TYPE: exports.TankBody, 
   }, {
             POSITION: [  35,   0,      0,      0,     0,  0,], 
                TYPE: [exports.TankBody, ],
   }, {
     POSITION: [8, 0, -5, 0, 360, 1],
      TYPE: [exports.crewdeg, { INDEPENDENT: false, COLOR: 16 }]
     
   }, {
     POSITION: [8, 0, 5, 0, 360, 1],
      TYPE: [exports.mggun, { INDEPENDENT: false, COLOR: 16 }]
     
            }],
  
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
             /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  60,     6,      1,      0,    0,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pound, g.pound, g.destroy, g.norecoil]),
                TYPE: exports.bullet,
            }, }, {
              
            POSITION: [  40,     8,      1,      0,    0,     0,     0.5,  ], 
            }
        ],
    };
exports.abram = {
        PARENT: [exports.genericTank],
  SIZE: 18,
  BODY: {
    SPEED: 10,
  },
        LABEL: 'M1 Abram',
        SHAPE: "M -2 -0.1 L -2 1 L 1 1 L 2.6 0.7 L 3 0 L 2.5 -0.6 L 1 -1 L 0 -1 L -2 -1 L -2 0.1",
   TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  35,   -6,      0,      0,     0,  0,], 
                TYPE: exports.TankBody, 
   }, {
             POSITION: [  35,   -6,      0,      0,     0,  0,], 
                TYPE: [exports.TankBody, ],
     
   }, {
     POSITION: [8, 0, -5, 0, 360, 1],
      TYPE: [exports.crewdeg, { INDEPENDENT: false , COLOR: 16}]
     
   }, {
     POSITION: [8, 0, 5, 0, 360, 1],
      TYPE: [exports.crewdeg, { INDEPENDENT: false , COLOR: 16}]
     
   }, {
     POSITION: [4, 7, -5, 90, 180, 1],
      TYPE: [exports.mggun, { INDEPENDENT: false, COLOR: 16 }]
     
   }, {
     POSITION: [6, 7, 5, -90, 180, 1],
      TYPE: [exports.mggun, { INDEPENDENT: false, COLOR: 16 }]
            }],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
             
            POSITION: [  60,     6,      1,      0,    0,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pound, g.destroy, g.norecoil]),
                TYPE: exports.bullet,
            }, }, {
              
            POSITION: [  10,     8,      0,      40,    0,     0,     0.5,  ], 
            }
        ],
    };
exports.haubitze = {
        PARENT: [exports.genericTank],
  SIZE: 18,
  BODY: {
    FOV: 2,
    HEALTH: 500,
    SPEED: 0.8
  },
        LABEL: 'Panzer Haubitze 2000',
        SHAPE: "M -2 -0.1 L -2 1 L 2 1 L 3 0.6 L 3 -0.6 L 2 -1 L 0 -1 L -2 -1 L -2 0.1",
   TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  35,   0,      0,      0,     0,  0,], 
                TYPE: exports.TankBody, 
   }, {
             POSITION: [  35,   0,      0,      0,     0,  0,], 
                TYPE: [exports.TankBody,],
     
            }],
  
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
             /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  80,     5,      1,      0,    0,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.haub]),
                TYPE: exports.bullet,
            }, }, {
              
            POSITION: [  40,     7,      1,      0,    0,     0,     0.5,  ], 
            }
        ],
    };
exports.t_90m = {
        PARENT: [exports.genericTank],
  SIZE: 18,
        LABEL: 'T-90M',
        SHAPE: "M -2 -0.1 L -2 1 L 2 1 L 3 0.6 L 3 -0.6 L 2 -1 L 0 -1 L -2 -1 L -2 0.1",
   TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  30,   -1,      0,      0,     0,  0,], 
                TYPE: exports.TankBody, 
   }, {
             POSITION: [  30,   -1,      0,      0,     0,  0,], 
                TYPE: [exports.TankBody,],
     
   }, {
     POSITION: [8, 0, 5, 0, 360, 1],
      TYPE: [exports.mggun, { INDEPENDENT: false, COLOR: 16 }]
     
            }],
  
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
             /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  60,     6,      1,      0,    0,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pound, g.destroy]),
                TYPE: exports.bullet,
            }, }, {
              
            POSITION: [  10,     8,      0,      40,    0,     0,     0.5,  ],
            }
        ],
    };
exports.t_50 = {
        PARENT: [exports.genericTank],
  SIZE: 24,
        LABEL: 'T-50',
   TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  20,   -5,      0,      0,     0,  0,], 
                TYPE: exports.TankBody, 
   }, {
             POSITION: [  20,   -5,      0,      0,     0,  0,], 
                TYPE: [exports.TankBody, ],
     
      }, {
     POSITION: [4, 6, 16, 90, 0, 1],
      TYPE: [exports.barrel, { INDEPENDENT: false, COLOR: 16 }]
      }, {
     POSITION: [4, -6, 16, 90, 0, 1],
      TYPE: [exports.barrel, { INDEPENDENT: false, COLOR: 16 }]
   }, {
     POSITION: [8, 0, -5, 0, 360, 1],
      TYPE: [exports.crewdeg, { INDEPENDENT: false, COLOR: 16 }]
     
   }, {
     POSITION: [7, 0, 5, 0, 360, 1],
      TYPE: [exports.mggun, { INDEPENDENT: false, COLOR: 16 }]
     
            }],
  
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
             /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  30,     6,      1,      0,    0,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pound, g.pound, g.destroy, g.norecoil]),
                TYPE: exports.bullet,
            }, }, {
              
            POSITION: [  20,     8,      1,      0,    0,     0,     0.5,  ], 
            }
        ],
    };

exports.amx = {
        PARENT: [exports.genericTank],
  SIZE: 24,
  BODY: {
    HEALTH: 300,
    SPEED: 4,
  },
        LABEL: 'Amx-13',
   TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  20,   -5,      0,      0,     0,  0,], 
                TYPE: exports.TankBody, 
   }, {
             POSITION: [  20,   -5,      0,      0,     0,  0,], 
                TYPE: [exports.TankBody, ],
     
      }, {
     POSITION: [4, 6, 16, 90, 0, 1],
      TYPE: [exports.barrel, { INDEPENDENT: false, COLOR: 16 }]
      }, {
     POSITION: [4, -6, 16, 90, 0, 1],
      TYPE: [exports.barrel, { INDEPENDENT: false, COLOR: 16 }]
   }, {
     POSITION: [8, 0, -5, 0, 360, 1],
      TYPE: [exports.crewdeg, { INDEPENDENT: false, COLOR: 16 }]
     
            }],
  
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
             /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
             POSITION: [  5,     8,      1.2,      30,    0,     0,     0.5,  ],  
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pound, g.destroy, g.norecoil]),
                TYPE: exports.bullet,
            }, }, {
              
            POSITION: [  30,     7,      1,      0,    0,     0,     0.5,  ], 
            }, {
              POSITION: [  17,     8,      1,      0,    0,     0,     0.5,  ],
            }
        ],
    };
exports.type_99 = {
        PARENT: [exports.genericTank],
  SIZE: 18,
        LABEL: 'Type 99',
        SHAPE: "M -2 -0.1 L -2 1 L 2 1 L 3 0.6 L 3 -0.6 L 2 -1 L 0 -1 L -2 -1 L -2 0.1",
   TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  40,   0,      0,      0,     0,  0,], 
                TYPE: exports.TankBody, 
   }, {
             POSITION: [  40,   0,      0,      0,     0,  0,], 
                TYPE: [exports.TankBody, ],
      }, {
     POSITION: [9, 12, 27, 90, 0, 1],
      TYPE: [exports.barrel, { INDEPENDENT: false, COLOR: 16 }]
      }, {
     POSITION: [9, -12, 27, 90, 0, 1],
      TYPE: [exports.barrel, { INDEPENDENT: false, COLOR: 16 }]
   }, {
     POSITION: [8, 0, -6, 0, 360, 1],
      TYPE: [exports.crewdeg, { INDEPENDENT: false, COLOR: 16 }]
     
   }, {
     POSITION: [8, 0, 5, 0, 360, 1],
      TYPE: [exports.mggun, { INDEPENDENT: false, COLOR: 16 }]
     
            }],
  
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
             /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  60,     6,      1,      0,    0,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.arty, g.destroy, g.norecoil]),
                TYPE: exports.bullet,
            }, }, {
              
           POSITION: [  10,     8,      1,      17,    0,     0,     0.5,  ], 
            }
        ],
    };
exports.mk7 = {
        PARENT: [exports.genericTank],
  SIZE: 24,
        LABEL: 'Centcurion MK. 7',
   TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  20,   -5,      0,      0,     0,  0,], 
                TYPE: exports.TankBody, 
   }, {
             POSITION: [  20,   -5,      0,      0,     0,  0,], 
                TYPE: [exports.TankBody, ],
     
      }, {
     POSITION: [8, 0, -5, 0, 360, 1],
      TYPE: [exports.crewdeg, { INDEPENDENT: false, COLOR: 16 }]
     
            }],
  
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
             /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  30,     6,      1,      0,    0,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pound, g.pound, g.destroy, g.destroy]),
                TYPE: exports.bullet,
            }, }, {
              
            POSITION: [  10,     8,      1,      10,    0,     0,     0.5,  ], 
            }
        ],
    };
exports.destroy = {
        PARENT: [exports.genericTank],
  SIZE: 24,
        LABEL: 'Destroyer K6',
   TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  20,   -5,      0,      0,     0,  0,], 
                TYPE: exports.TankBody, 
   }, {
             POSITION: [  20,   -5,      0,      0,     0,  0,], 
                TYPE: [exports.TankBody, ],
      }, {
     POSITION: [4, 6, 16, 90, 0, 1],
      TYPE: [exports.barrel, { INDEPENDENT: false, COLOR: 16 }]
      }, {
     POSITION: [4, -6, 16, 90, 0, 1],
      TYPE: [exports.barrel, { INDEPENDENT: false, COLOR: 16 }]
      }, {
     POSITION: [8, 0, -5, 0, 360, 1],
      TYPE: [exports.crewdeg, { INDEPENDENT: false, COLOR: 16 }]
     }, {
     POSITION: [5, 0, 5, 0, 360, 1],
      TYPE: [exports.missilegun, { INDEPENDENT: false, COLOR: 16 }]
            }],
  
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
             /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  30,     6,      1,      0,    0,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy, g.norecoil]),
                TYPE: exports.bullet,
            }, }, {
              
            POSITION: [  10,     8,      1,      17,    0,     0,     0.5,  ], 
            }
        ],
    };
exports.msta = {
        PARENT: [exports.genericTank],
  SIZE: 18,
  BODY: {
    FOV: 2.2,
    SPEED: 0.8
  },
        LABEL: '2S19-Msta',
       SHAPE: "M -2 -0.1 L -2 1 L 1 1 L 1 -1 L 0 -1 L -2 -1 L -2 0.1",
   TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  35,   0,      0,      0,     0,  0,], 
                TYPE: exports.TankBody, 
   }, {
             POSITION: [  35,   0,      0,      0,     0,  0,], 
                TYPE: [exports.TankBody,],
     
            }],
  
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
             /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  10,     7,      1.2,      80,    0,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.msta, g.norecoil]),
                TYPE: exports.bullet,
            }, }, {
              POSITION: [  80,     5,      1,      0,    0,     0,     0.5,  ],
              }, {
              
            POSITION: [  30,     7,      1,      0,    0,     0,     0.5,  ],
            }, {
              POSITION: [  15,     9,      1,      0,    0,     0,     0.5,  ],
              }, {
              POSITION: [  10,     7,      1,      50,    0,     0,     0.5,  ],
            }
        ],
    };
exports.challenger3 = {
        PARENT: [exports.genericTank],
  SIZE: 22,
        LABEL: 'Challenger3',
        SHAPE: "M 0 0 L 0 1 L 2 1 L 3 0.6 L 3 -0.6 L 2 -1 L 0 -1 L 0 0 L 0 0",
   TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  30,   0,      0,      0,     0,  0,], 
                TYPE: exports.TankBody, 
   }, {
             POSITION: [  30,   0,      0,      0,     0,  0,], 
                TYPE: [exports.TankBody, ],
   }, {
     POSITION: [8, 15, -4, 0, 360, 1],
      TYPE: [exports.crewdeg, { INDEPENDENT: false, COLOR: 16 }]
     
            }],
  
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
             /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  60,     6,      1,      0,    0,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pound, g.pound, g.destroy, g.norecoil]),
                TYPE: exports.bullet,
            }, }, {
              
            POSITION: [  20,     8,      1,      0,    0,     0,     0.5,  ], 
              },  {
              
            POSITION: [  10,     8,      1,      40,    0,     0,     0.5,  ], 
            }
        ],
    };
exports.lecrec = {
        PARENT: [exports.genericTank],
  SIZE: 24,
  BODY:{
    HEALTH: 1000
},
  SHAPE: 4,
        LABEL: 'Lecrec T6',
   TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  20,   -5,      0,      0,     0,  0,], 
                TYPE: exports.TankBody, 
   }, {
             POSITION: [  20,   -5,      0,      0,     0,  0,], 
                TYPE: [exports.TankBody, ],
     
      }, {
     POSITION: [4, 6, 16, 90, 0, 1],
      TYPE: [exports.barrel, { INDEPENDENT: false, COLOR: 16 }]
      }, {
     POSITION: [4, -6, 16, 90, 0, 1],
      TYPE: [exports.barrel, { INDEPENDENT: false, COLOR: 16 }]
   }, {
     POSITION: [8, 0, -5, 0, 360, 1],
      TYPE: [exports.crewdeg, { INDEPENDENT: false, COLOR: 16 }]
     
            }],
  
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
             /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  30,     6,      1,      0,    0,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.norecoil]),
                TYPE: exports.bullet,
            }, 
            }
        ],
    };

// UPGRADE PATHS
exports.testbed.UPGRADES_TIER_1 = [];
        exports.basic.UPGRADES_TIER_3 = [exports.leopard, exports.abram, exports.haubitze, exports.t_90m, 
                  exports.t_50, exports.amx, exports.type_99, exports.mk7, exports.destroy, exports.msta,
                  exports.challenger3, exports.lecrec];


// NPCS:
exports.crasher = {
    TYPE: 'crasher',
    LABEL: 'Crasher',
    COLOR: 5,
    SHAPE: 3,
    SIZE: 5,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        SPEED: 5,
        ACCEL: 0.01,
        HEALTH: 0.5,
        DAMAGE: 5,
        PENETRATION: 2,
        PUSHABILITY: 0.5,
        DENSITY: 10,
        RESIST: 2,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
};
exports.sentry = {
    PARENT: [exports.genericTank],
    TYPE: 'crasher',
    LABEL: 'Sentry',
    DANGER: 3,
    COLOR: 5,
    SHAPE: 3,
    SIZE: 10,
    SKILL: skillSet({
        rld: 0.5,
        dam: 0.8, 
        pen: 0.8,
        str: 0.1,
        spd: 1,
        atk: 0.5,
        hlt: 0,
        shi: 0,
        rgn: 0.7,
        mob: 0,        
    }),
    VALUE: 1500,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        FOV: 0.5,
        ACCEL: 0.006,
        DAMAGE: base.DAMAGE * 2,
        SPEED: base.SPEED * 0.5,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothToTarget',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.trapTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.5,
    },
    INDEPENDENT: true,
    CONTROLLERS: ['nearestDifferentMaster'], 
    COLOR: 16,
    AI: {
        SKYNET: true,
        FULL_VIEW: true,
    },
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  16,    14,      1,      0,      0,      0,      0,   ],
            }, {
        POSITION: [   4,    14,     1.8,    16,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.lowpower, g.fast, g.halfreload]),
                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
            }, },
    ],
};
exports.sentrySwarm = {
    PARENT: [exports.sentry],
    DANGER: 3,
    GUNS: [{
        POSITION: [    7,    14,    0.6,     7,     0,    180,     0,  ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.morerecoil, g.basic, g.weak, g.weak]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,     
        }, },
    ],
};
exports.sentryGun = makeAuto(exports.sentry, 'Sentry', { type: exports.heavy3gun, size: 12, });
exports.sentryTrap = makeAuto(exports.sentry, 'Sentry', { type: exports.trapTurret, size: 12, });

exports.miniboss = {
    PARENT: [exports.genericTank],
    TYPE: 'miniboss',
    DANGER: 6,
    SKILL: skillSet({
        rld: 0.7,
        dam: 0.5, 
        pen: 0.8,
        str: 0.8,
        spd: 0.2,
        atk: 0.3,
        hlt: 1,
        shi: 0.7,
        rgn: 0.7,
        mob: 0,        
    }),
    LEVEL: 45,
    CONTROLLERS: ['nearestDifferentMaster', 'minion', 'canRepel'],
    AI: { NO_LEAD: true, },
    FACING_TYPE: 'autospin',
    HITS_OWN_TYPE: 'hard',
    BROADCAST_MESSAGE: 'A visitor has left!',
};
    exports.crasherSpawner = {
        PARENT: [exports.genericTank],
        LABEL: 'Spawned',  
        STAT_NAMES: statnames.drone,
        CONTROLLERS: ['nearestDifferentMaster'], 
        COLOR: 5, 
        INDEPENDENT: true, 
        AI: { chase: true, },
        MAX_CHILDREN: 4,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic]),
                    TYPE: [exports.drone, { LABEL: 'Crasher', VARIES_IN_SIZE: true, DRAW_HEALTH: true }],
                    SYNCS_SKILLS: true,
                    AUTOFIRE: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
    exports.elite = {
        PARENT: [exports.miniboss],
        LABEL: 'Elite Crasher',
        COLOR: 5,
        SHAPE: 3,
        SIZE: 20,
        VARIES_IN_SIZE: true,
        VALUE: 150000,
        BODY: {
            FOV: 1.3,
            SPEED: base.SPEED * 0.25,
            HEALTH: base.HEALTH * 1.5,
            SHIELD: base.SHIELD * 1.25,
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 2.5,
        },
    };
    exports.Monster = {
        PARENT: [exports.miniboss],
        LABEL: 'Monster',
      COLOR: 40,
        SHAPE: "M -2 -0.1 L -2 1 L 1 1 L 1 -1 L 0 -1 L -2 -1 L -2 0.1",
        SIZE: 120,
        VARIES_IN_SIZE: true,
        VALUE: 150000,
        BODY: {
            FOV: 1.3,
            SPEED: base.SPEED * 0.25,
            HEALTH: base.HEALTH * 1.5,
            SHIELD: base.SHIELD * 1.25,
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 2.5,
        },
          TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
            
            /***==================Mini Turrets======================***/
             POSITION: [3, 9, 11, 90, 360, 1],
      TYPE: [exports.Tankgun2, { INDEPENDENT: false, COLOR: 16 }]
          }, {
             POSITION: [3, 9, -11, -90, 360, 1],
      TYPE: [exports.Tankgun2, { INDEPENDENT: false, COLOR: 16 }]
          }, {
                  POSITION: [3, 9, 8, 90, 360, 1],
      TYPE: [exports.Tankgun2, { INDEPENDENT: false, COLOR: 16 }]
          }, {
             POSITION: [3, 9, -8, -90, 360, 1],
      TYPE: [exports.Tankgun2, { INDEPENDENT: false, COLOR: 16 }]
             }, {
                  POSITION: [3, 9, 5, 90, 360, 1],
      TYPE: [exports.missilegun, { INDEPENDENT: false, COLOR: 16 }]
          }, {
             POSITION: [3, 9, -5, -90, 360, 1],
      TYPE: [exports.missilegun, { INDEPENDENT: false, COLOR: 16 }]
          }, {
                  POSITION: [3, 9, 2, 90, 360, 1],
      TYPE: [exports.missilegun, { INDEPENDENT: false, COLOR: 16 }]
          }, {
             POSITION: [3, 9, -2, -90, 360, 1],
      TYPE: [exports.missilegun, { INDEPENDENT: false, COLOR: 16 }]
             }, {
                  POSITION: [3, 9, -1, 90, 360, 1],
      TYPE: [exports.Tankgun2, { INDEPENDENT: false, COLOR: 16 }]
          }, {
             POSITION: [3, 9, 1, -90, 360, 1],
      TYPE: [exports.Tankgun2, { INDEPENDENT: false, COLOR: 16 }]
             }, {
                  POSITION: [3, 9, -4, 90, 360, 1],
      TYPE: [exports.Tankgun2, { INDEPENDENT: false, COLOR: 16 }]
                }, {
             POSITION: [3, 9, 4, -90, 360, 1],
      TYPE: [exports.Tankgun2, { INDEPENDENT: false, COLOR: 16 }]
                  
                  
               /***===========Front===============***/
               
         
              }, {
                  POSITION: [3, 8, 4, 0, 360, 1],
      TYPE: [exports.Tankgun2, { INDEPENDENT: false, COLOR: 16 }]
          }, {
             POSITION: [3, 8, -4, 0, 360, 1],
      TYPE: [exports.Tankgun2, { INDEPENDENT: false, COLOR: 16 }]
          }, {
            POSITION: [3, 8, 1, 0, 360, 1],
      TYPE: [exports.Tankgun2, { INDEPENDENT: false, COLOR: 16 }]
          }, {
             POSITION: [3, 8, -1, 0, 360, 1],
      TYPE: [exports.Tankgun2, { INDEPENDENT: false, COLOR: 16 }]
             }, {
               
               
                /***===========Back===============***/
               
               
                  POSITION: [3, 17, 4, 180, 360, 1],
      TYPE: [exports.Tankgun2, { INDEPENDENT: false, COLOR: 16 }]
          }, {
             POSITION: [3, 17, -4, 180, 360, 1],
      TYPE: [exports.Tankgun2, { INDEPENDENT: false, COLOR: 16 }]
          }, {
            POSITION: [3, 17, 1, 180, 360, 1],
      TYPE: [exports.Tankgun2, { INDEPENDENT: false, COLOR: 16 }]
          }, {
             POSITION: [3, 17, -1, 180, 360, 1],
      TYPE: [exports.Tankgun2, { INDEPENDENT: false, COLOR: 16 }]
          }, {
            
            
            /***====================BIG ARTY STUFF=================***/
            
            
            
             POSITION: [5, 8, 7, 0, 360, 1],
      TYPE: [exports.Tankgun, { INDEPENDENT: false, COLOR: 16 }]
          }, {
            POSITION: [5, 8, -7, 0, 360, 1],
      TYPE: [exports.Tankgun, { INDEPENDENT: false, COLOR: 16 }] 
          }, {
                POSITION: [5, -15, 7, 0, 360, 1],
      TYPE: [exports.Tankgun, { INDEPENDENT: false, COLOR: 16 }]
          }, {
            POSITION: [5, -15, -7, 0, 360, 1],
      TYPE: [exports.Tankgun, { INDEPENDENT: false, COLOR: 16 }] 
            }, {
            POSITION: [5, -3, 0, 0, 360, 1],
      TYPE: [exports.Tankgun, { INDEPENDENT: false, COLOR: 16 }] 
          }
          ]
        
    };
         exports.elite_sprayer = { 
            PARENT: [exports.elite],
           BODY: {
             HEALTH: 1000
           },
           LABEL: "Test01",
            AI: { NO_LEAD: false, },
        };

    exports.palisade = (() => {
        let props = {
            SHOOT_SETTINGS: combineStats([g.pound]),
            TYPE: exports.minion,
            STAT_CALCULATOR: gunCalcNames.drone,                        
            AUTOFIRE: true,
            MAX_CHILDREN: 1,
            SYNCS_SKILLS: true,   
            WAIT_TO_CYCLE: true,
        };
        return {
            PARENT: [exports.miniboss],
            LABEL: 'Rogue Palisade',
            COLOR: 17,
            SHAPE: 6,
            SIZE: 28,
            VALUE: 500000,
            BODY: {
                FOV: 1.3,
                SPEED: base.SPEED * 0.1,
                HEALTH: base.HEALTH * 2,
                SHIELD: base.SHIELD * 2,
                REGEN: base.REGEN,
                DAMAGE: base.DAMAGE * 3,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   4,      6,    -1.6,     8,      0,      0,      0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     60,      0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     120,     0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.pound]),
                        TYPE: exports.minion,
                        STAT_CALCULATOR: gunCalcNames.drone,                        
                        AUTOFIRE: true,
                        MAX_CHILDREN: 1,
                        SYNCS_SKILLS: true, 
                        WAIT_TO_CYCLE: true,  
                    }, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     240,     0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     300,     0,   ], 
                    PROPERTIES: props, },
            ],
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [   5,    10,      0,      30,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,      90,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     150,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     210,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     270,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     330,    110, 0], 
                    TYPE: exports.trapTurret,
                        },
            ],
        };
    })();

exports.bot = {
    AUTO_UPGRADE: 'random',
    FACING_TYPE: 'looseToTarget',
    BODY: {
        SIZE: 10,
    },
    //COLOR: 17,
    NAME: "ai_",
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'fleeAtLowHealth'
    ],
    AI: { STRAFE: true, },
};

exports.testbed.UPGRADES_TIER_1.push(exports.elite_sprayer, exports.basic, exports.Monster, exports.genericTank, exports.AC);