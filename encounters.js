(function (window, $) {
    var encounterListEl;
    var encounters = [
        {
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
            strainLimit: 13,
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
                    name: 'Fernkampfwaffen(leicht)',
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
                    name: 'Nahkampfwaffen',
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
        }
    ];

    function determineDice(attribute, skillLvl) {
        var higherValue = 0; // higherValue determines total dice count
        var lowerValue = 0; // lowerValue determines better dice count
        var isEqual = false;
        if (attribute > skillLvl) {
            higherValue = attribute;
            lowerValue = skillLvl;
        } else if (attribute < skillLvl) {
            higherValue = skillLvl;
            lowerValue = attribute;
        } else {
            isEqual = attribute === skillLvl;
        }
        var diceEl = $('<span><span>');

        if (!isEqual) {
            var higherDice = lowerValue;
            var lowerDice = higherValue - lowerValue;

            for (var i = 0; i < higherDice; i++) {
                diceEl.append('<i class="material-icons" style="color: yellow;">fiber_manual_record</i>');
            }
            for (var i = 0; i < lowerDice; i++) {
                diceEl.append('<i class="material-icons" style="color: green;">fiber_manual_record</i>');
            }

        } else {
            var higherDice = attribute;

            for (var i = 0; i < higherDice; i++) {
                diceEl.append('<i class="material-icons" style="color: yellow;">fiber_manual_record</i>');
            }
        }

        return diceEl;
    }

    function buildSkills(encounter, determineDice, newRow) {
        var skillsDesc = $('<div class="col-12"><br/><strong>Fertigkeiten</strong></div>');
        var skillContainer = $('<div class="container"></div>');
        encounter.skills.forEach(skill => {
            var skillRow = $('<div class="row"></div>');
            var skillName = $('<div class="col-4">' + skill.name + ' (' + skill.att + ')</div>');
            var skillLvl = $('<div class="col-4">' + skill.lvl + '</div>');
            var skillDice = $('<div class="col-4">' + determineDice(encounter.attributes[skill.att], skill.lvl).html() + '</div>');
            skillRow.append(skillName).append(skillLvl).append(skillDice);
            skillContainer.append(skillRow);
        });
        newRow.append(skillsDesc);
        newRow.append(skillContainer);
    }
    
    function buildAttributes(encounter, newRow) {
        var attDesc = $('<div class="col-12"><br/><strong>Attribute</strong></div>');
        var attributesEl = $('<div class="col-2">Stärke</div><div class="col-2">Gewandheit</div><div class="col-2">Intelligenz</div><div class="col-2">List</div><div class="col-2">Willenskraft</div><div class="col-2">Charisma</div>');
        var attValues = $('<div class="col-2">' + encounter.attributes.str + '</div><div class="col-2">' + encounter.attributes.agi + '</div><div class="col-2">' + encounter.attributes.int + '</div><div class="col-2">' + encounter.attributes.cun + '</div><div class="col-2">' + encounter.attributes.wil + '</div><div class="col-2">' + encounter.attributes.pre + '</div>');
        newRow.append(attDesc);
        newRow.append(attributesEl);
        newRow.append(attValues);
    }
    
    function buildDamage(encounter, newRow) {
        var woundDesc = $('<div class="col-12"><br/><strong>Wunden</strong></div>');
        var woundValue = $('<div class="container"></div>');
        var strainDesc = $('<div class="col-12"><strong>Erschöpfung</strong></div>');
        var strainValue = $('<div class="container"></div>');
        if (encounter.type === 'minion') {
        }
        else {
            var woundRow = $('<div class="row input-group"></div>');
            var strainRow = $('<div class="row input-group"></div>');
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
        var defDesc = $('<div class="col-12"><br/><strong>Defensive</strong></div>');
        var defEl = $('<div class="col-4">Absorbtion</div><div class="col-4">Nahkampf</div><div class="col-4">Fernkampf</div>');
        var defValues = $('<div class="col-4">' + encounter.absorbtion + '</div><div class="col-4">' + encounter.defense.melee + '</div><div class="col-4">' + encounter.defense.range + '</div>');
        newRow.append(defDesc);
        newRow.append(defEl);
        newRow.append(defValues);
    }
    
    function buildName(encounter, newRow) {
        var nameEl = $('<div class="col-12"><strong>Name: ' + encounter.name + '</strong></div>');
        newRow.append(nameEl);
    }

    function initEncounters() {
        encounters.forEach(encounter => {
            console.dir(encounter);
            var newRow = $('<div class="row"></div>');

            buildName(encounter, newRow);

            buildDefenese(encounter, newRow);

            buildDamage(encounter, newRow);

            buildAttributes(encounter, newRow);

            buildSkills(encounter, determineDice, newRow);

            encounterListEl.append(newRow);
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
