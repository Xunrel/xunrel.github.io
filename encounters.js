(function (window, $) {
    var encounterListEl;
    var encounters = [
        {
            name: 'Reom',
            stats: {
                str: 2,
                agi: 2,
                int: 3,
                cun: 4,
                wil: 2,
                pre: 4
            },
            absorbtion: 3,
            woundLimit: 13,
            wounds: 0,
            strainLimit: 13,
            strain: 0,
            defense: {
                melee: 0,
                range: 0
            },
            skills: [
                {
                    name: 'Astronavgation',
                    stat: 'int',
                    lvl: 1
                }, {
                    name: 'Charm',
                    stat: 'pre',
                    lvl: 2
                }, {
                    name: 'Coolness',
                    stat: 'pre',
                    lvl: 2
                }, {
                    name: 'Disziplin',
                    stat: 'wil',
                    lvl: 3
                }, {
                    name: 'Einschüchterung',
                    stat: 'wil',
                    lvl: 4
                }, {
                    name: 'Fernkampfwaffen(leicht)',
                    stat: 'agi',
                    lvl: 4
                }, {
                    name: 'Mechanik',
                    stat: 'int',
                    lvl: 5
                }, {
                    name: 'Medizin',
                    stat: 'int',
                    lvl: 1
                }, {
                    name: 'Nahkampfwaffen',
                    stat: 'str',
                    lvl: 2
                }, {
                    name: 'Pilot (Weltraum)',
                    stat: 'agi',
                    lvl: 2
                }, {
                    name: 'Täuschung',
                    stat: 'cun',
                    lvl: 2
                }, {
                    name: 'Verhandeln',
                    stat: 'pre',
                    lvl: 3
                }, {
                    name: 'Wachsamkeit',
                    stat: 'wil',
                    lvl: 2
                }, {
                    name: 'Wissen (Unterwel)',
                    stat: 'int',
                    lvl: 2
                }
            ]
        }
    ];

    function initEncounters() {
        encounters.forEach(encounter => {
            console.dir(encounter);
            var newRow = $('<div class="row"></div>');
            var nameEl = $('<div class="col-12"><strong>Name:' + encounter.name + '</strong></div>');

            newRow.append(nameEl);
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
})(window, jQuery);