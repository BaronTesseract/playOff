//--------------------------------------------------тестовая таблица-----------------
let cells = {
    name: 'Cell1',
    players: [{ id: 4 }],
    children: [
        {
            name: 'Cell2',
            players: [{ id: 4 }, { id: 8 }],
            children: [
                {
                    name: 'Cell3',
                    players: [{ id: 2 }, { id: 4 }],
                    children: [
                        {
                            name: 'Cell4',
                            players: [{ id: 1 }, { id: 2 }],
                            children: [
                                {
                                    name: 'Cell4',
                                    players: [{ id: 1 }, { id: 2 }],
                                },
                                {
                                    name: 'Cell4',
                                    players: [{ id: 3 }, { id: 4 }],
                                }
                            ]
                        },
                        {
                            name: 'Cell4',
                            players: [{ id: 3 }, { id: 4 }],
                            children: [
                                {
                                    name: 'Cell4',
                                    players: [{ id: 1 }, { id: 2 }],
                                },
                                {
                                    name: 'Cell4',
                                    players: [{ id: 3 }, { id: 4 }],
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'Cell5',
                    players: [{ id: 5 }, { id: 8 }],
                    children: [
                        {
                            name: 'Cell6',
                            players: [{ id: 5 }, { id: 6 }],
                            children: [
                                {
                                    name: 'Cell4',
                                    players: [{ id: 1 }, { id: 2 }],
                                },
                                {
                                    name: 'Cell4',
                                    players: [{ id: 3 }, { id: 4 }],
                                }
                            ]
                        },
                        {
                            name: 'Cell4',
                            players: [{ id: 7 }, { id: 8 }],
                            children: [
                                {
                                    name: 'Cell4',
                                    players: [{ id: 1 }, { id: 2 }],
                                },
                                {
                                    name: 'Cell4',
                                    players: [{ id: 3 }, { id: 4 }],
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};
//-----------------------------------------------------------------------------------

//---------------генерация игроков------


function createPlayers(num) {
    let players = [];
    for (let i = 0; i < num; i++) {
        players.push({ id: i, name: `Name ${i}` });
    }
    return players;
}


//------------генерация дерева----------


function createPlayOff(players) {
    let cells = {};
    const len = players.length;
    let deep = len;
    //----создание игроков в Cell
    function addPlayers(numOfPlayers) {    
        let players = [];
        for (let i = 0; i < numOfPlayers; i++) {
            players.push({id: "randomId", name: "Random Player Name"})
        }
        return players;
    }
    //----создание потомков в Cell
    function addChildren(numOfChildren) {
        let children = [];
        for (let i = 0; i < numOfChildren; i++) {
            console.log(deep);
            deep = deep / 2;
            children.push({});
            let child = children[i];
            createCell(child);
            // console.log(child);   
        }
        return children;
    }
    function createCell(cells, numOfPlayers = 2, numOfChildren = 2) {
        cells.name = "Name of Cell";
        //добавление игроков
        cells.players = addPlayers(numOfPlayers);
        //----создание потомков
        if (deep <= 1) {
            return;
        } 
        else cells.children = addChildren(numOfChildren);
    }
    createCell(cells, 1, 1);  
    
    return cells;
}
let tree = createPlayOff(createPlayers(8));
console.log(tree);//=========

//------------отрисовка дерева----playoff---------
Vue.component('match', {
    template: ` <li class="cell" >
                        <ul v-if="hasPlayers" class="wrapper">
                            <li v-for="(player, index) in item.players"
                                class="cell"
                                v-bind:class="{'vertical-line': hasChildren}"
                            >
                                <span class="name" v-bind:class="{'horisontal-line': hasChildren}">{{ player.name ? player.name : "no name" }}</span>       
                                <ul v-if="hasChildren">
                                    <template>
                                        <match 
                                            v-bind:item="item.children[index]"
                                            >
                                        </match>
                                    </template>
                                </ul>
                            </li>
                        </ul>
                </li>`,
    props: {
        item: Object
    },
    computed: {
        hasChildren: function () {
            return this.item.children && this.item.children.length;
        },
        hasPlayers: function () {
            return this.item.players && this.item.players.length;
        }
    }
})

let app = new Vue({
    el: "#app",
    data: {
        count: 2,
        item: {},
        //item: cells,
    },
    methods: {
        generate: function (object, count) {
            this.item = createPlayOff(createPlayers(this.count));
        }
    },
})