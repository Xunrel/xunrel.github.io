(function (window, $) {
    let encounterListEl;
    let attributeKeys = [
        'str',
        'agi',
        'int',
        'cun',
        'wil',
        'pre'
    ];
    let attributeNames = {
        str: {
            name: 'Stärke'
        },
        agi: {
            name: 'Gewandheit'
        },
        int: {
            name: 'Intelligenz'
        },
        cun: {
            name: 'List'
        },
        wil: {
            name: 'Willensstärke'
        },
        pre: {
            name: 'Charisma'
        }
    };
    let encounters = [
        {
            id: 'npc_reom',
            name: 'Reom',
            type: 'rival',
            attributes: {
                str: 2,
                agi: 2,
                int: 3,
                cun: 4,
                wil: 2,
                pre: 4
            },
            woundLimit: 13,
            wounds: 0,
            strainLimit: 0,
            strain: 0,
            absorbtion: 3,
            defense: {
                melee: 0,
                range: 0
            },
            skills: [
                {
                    name: 'Astronavgation',
                    att: 'int',
                    lvl: 1
                }, {
                    name: 'Charm',
                    att: 'pre',
                    lvl: 2
                }, {
                    name: 'Coolness',
                    att: 'pre',
                    lvl: 2
                }, {
                    name: 'Disziplin',
                    att: 'wil',
                    lvl: 3
                }, {
                    name: 'Einschüchterung',
                    att: 'wil',
                    lvl: 4
                }, {
                    name: 'Fernkampf (leicht)',
                    att: 'agi',
                    lvl: 4
                }, {
                    name: 'Mechanik',
                    att: 'int',
                    lvl: 5
                }, {
                    name: 'Medizin',
                    att: 'int',
                    lvl: 1
                }, {
                    name: 'Nahkampf',
                    att: 'str',
                    lvl: 2
                }, {
                    name: 'Pilot (Weltraum)',
                    att: 'agi',
                    lvl: 2
                }, {
                    name: 'Täuschung',
                    att: 'cun',
                    lvl: 2
                }, {
                    name: 'Verhandeln',
                    att: 'pre',
                    lvl: 3
                }, {
                    name: 'Wachsamkeit',
                    att: 'wil',
                    lvl: 2
                }, {
                    name: 'Wissen (Unterwel)',
                    att: 'int',
                    lvl: 2
                }
            ]
        },
        {
            id: 'yav_yiyar',
            name: 'Yav Yiyar',
            type: 'rival',
            attributes: {
                str: 3,
                agi: 3,
                int: 2,
                cun: 3,
                wil: 2,
                pre: 3
            },
            woundLimit: 18,
            wounds: 0,
            strainLimit: 0,
            strain: 0,
            absorbtion: 4,
            defense: {
                melee: 1,
                range: 1
            },
            skills: [
                {
                    name: 'Coolness',
                    att: 'pre',
                    lvl: 1
                }, {
                    name: 'Täuschung',
                    att: 'cun',
                    lvl: 2
                }, {
                    name: 'Fernkampf (leicht)',
                    att: 'agi',
                    lvl: 3
                }, {
                    name: 'Nahkampf',
                    att: 'str',
                    lvl: 2
                }, {
                    name: 'Pilot (Weltraum)',
                    att: 'agi',
                    lvl: 3
                }, {
                    name: 'Wachsamkeit',
                    att: 'wil',
                    lvl: 2
                }
            ]
        }
    ];

    function determineDice(attribute, skillLvl) {
        let higherValue = 0; // higherValue determines total dice count
        let lowerValue = 0; // lowerValue determines better dice count
        let isEqual = false;
        if (attribute > skillLvl) {
            higherValue = attribute;
            lowerValue = skillLvl;
        } else if (attribute < skillLvl) {
            higherValue = skillLvl;
            lowerValue = attribute;
        } else {
            isEqual = attribute === skillLvl;
        }
        let diceEl = $('<span><span>');

        if (!isEqual) {
            let higherDice = lowerValue;
            let lowerDice = higherValue - lowerValue;

            for (let i = 0; i < higherDice; i++) {
                diceEl.append('<i class="material-icons" style="color: yellow;">fiber_manual_record</i>');
            }
            for (let i = 0; i < lowerDice; i++) {
                diceEl.append('<i class="material-icons" style="color: green;">fiber_manual_record</i>');
            }

        } else {
            let higherDice = attribute;

            for (let i = 0; i < higherDice; i++) {
                diceEl.append('<i class="material-icons" style="color: yellow;">fiber_manual_record</i>');
            }
        }

        return diceEl;
    }

    function buildSkills(encounter, determineDice, newRow) {
        let skillsDesc = $('<div class="col-12"><br/><strong>Fertigkeiten</strong></div>');
        let skillContainer = $('<div class="container"></div>');
        encounter.skills.forEach(skill => {
            let skillRow = $('<div class="row"></div>');
            let skillName = $('<div class="col-4">' + skill.name + ' (<u>' + attributeNames[skill.att].name + '</u>)</div>');
            let skillLvl = $('<div class="col-4">' + skill.lvl + '</div>');
            let skillDice = $('<div class="col-4">' + determineDice(encounter.attributes[skill.att], skill.lvl).html() + '</div>');
            skillRow.append(skillName).append(skillLvl).append(skillDice);
            skillContainer.append(skillRow);
        });
        newRow.append(skillsDesc);
        newRow.append(skillContainer);
    }

    function buildAttributes(encounter, newRow) {
        let attDesc = $('<div class="col-12"><br/><strong>Attribute</strong></div>');
        newRow.append(attDesc);
        attributeKeys.forEach(key => {
            let attributesEl = $('<div class="col-4">' + attributeNames[key].name + '</div><div class="col-8">' + encounter.attributes[key] + '</div>');
            newRow.append(attributesEl);
        });
    }

    function buildDamage(encounter, newRow) {
        let woundDesc = $('<div class="col-12"><br/><strong>Wunden</strong></div>');
        let woundValue = $('<div class="container"></div>');
        let strainDesc = $('<div class="col-12"><br/><strong>Erschöpfung</strong></div>');
        let strainValue = $('<div class="container"></div>');
        if (encounter.type === 'minion') {
        }
        else {
            let woundRow = $('<div class="row input-group"></div>');
            let strainRow = $('<div class="row input-group"></div>');
            for (let i = 0; i < encounter.woundLimit; i++) {
                woundRow.append('<div class="col-1"><input type="checkbox" /></div>');
            }
            woundValue.append(woundRow);
            for (let i = 0; i < encounter.strainLimit; i++) {
                strainRow.append('<div class="col-1"><input type="checkbox" /></div>');
            }
            strainValue.append(strainRow);
        }
        newRow.append(woundDesc);
        newRow.append(woundValue);
        newRow.append(strainDesc);
        newRow.append(strainValue);
    }

    function buildDefenese(encounter, newRow) {
        let defDesc = $('<div class="col-12"><br/><strong>Defensive</strong></div>');
        let defEl = $('<div class="col-4">Absorbtion</div><div class="col-4">Nahkampf</div><div class="col-4">Fernkampf</div>');
        let defValues = $('<div class="col-4">' + encounter.absorbtion + '</div><div class="col-4">' + encounter.defense.melee + '</div><div class="col-4">' + encounter.defense.range + '</div>');
        newRow.append(defDesc);
        newRow.append(defEl);
        newRow.append(defValues);
    }

    function buildName(encounter, newRow) {
        let nameEl = $('<div class="col-12"><strong>Name: ' + encounter.name + '</strong></div>');
        newRow.append(nameEl);
    }

    function buildEncounterRow(encounter) {
        let newRow = $('<div style="cursor:pointer;" class="row card" data-toggle="collapse" data-target="#' + encounter.id + '" aria-expanded="false" aria-controls="' + encounter.id + '"></div>');
        let encounterContainer = $('<div class="container collapse" id="' + encounter.id + '"></div>');
        let encounterRow = $('<div class="row"></div>');
        buildName(encounter, newRow);
        buildDefenese(encounter, encounterRow);
        buildDamage(encounter, encounterRow);
        buildAttributes(encounter, encounterRow);
        buildSkills(encounter, determineDice, encounterRow);
        encounterContainer.append(encounterRow);
        newRow.append(encounterContainer);
        encounterListEl.append(newRow);
    }

    function initEncounters() {
        encounters.forEach(encounter => {
            console.dir(encounter);
            buildEncounterRow(encounter);
        });
    }

    function init() {
        $(document).ready(function () {
            console.log('Initializing...');
            encounterListEl = $('#encountersList');
            initEncounters();
            console.log('... done!');
        });
    }

    init();
})(window, jQuery);