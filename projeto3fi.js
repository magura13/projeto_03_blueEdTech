const prompt = require(`prompt-sync`)();

let choice; //VARIÁVEL PARA RECEBER A ESCOLHA DO PLAYER
let playAgain; //VARIÁVEL PARA JOGAR NOVAMENTE

const time = {
    //OBJETO CONSTRUIDO PARA PASSAGEM DO TEMPO
    day: 1,
    transitions: 0,
    changeMoment: function () {
        this.transitions++;
        if (this.transitions === 3) {
            this.transitions = 0;
            this.day++;
        }
    },
};

const tableStatus = {
    //OBJETO CONSTRUIDO PARA UTILIZAR UM CONSOLE.TABLE
    Hiit: {
        Stamina: -10,
        Power: +12,
        Experience: +2,
        Mindfullness: 0,
    },
    Pace: {
        Stamina: -6,
        Power: +8,
        Experience: +4,
        Mindfullness: +2,
    },
    Regenerative: {
        Stamina: -4,
        Power: +4,
        Experience: +4,
        Mindfullness: +4,
    },
    Tecnic: {
        Stamina: -6,
        Power: +6,
        Experience: +8,
        Mindfullness: +4,
    },
    Gym: {
        Stamina: -8,
        Power: +10,
        Experience: +4,
        Mindfullness: 0,
    },
    Meditation: {
        Stamina: +10,
        Power: 0,
        Experience: 0,
        Mindfullness: +10,
    },
    Phisioterapy: {
        Stamina: +8,
        Power: +2,
        Experience: 0,
        Mindfullness: +6,
    },
    Yoga: {
        Stamina: +6,
        Power: +4,
        Experience: 0,
        Mindfullness: +8,
    },
    Reading: {
        Stamina: +4,
        Power: +0,
        Experience: 0,
        Mindfullness: +4,
    },
    Nap: {
        Stamina: +12,
        Power: 0,
        Experience: 0,
        Mindfullness: 0,
    },
};

const player = {
    //OBJETO DO PLAYER COM OS STATUS E MÉTODO PARA ALTERAÇÃO DOS STATUS. TAMBÉM POSSUI UM MÉTODO PARA EXIBIR O OBJETO
    stamina: 10,
    power: 0,
    mindfullness: 0,
    experience: 0,
    choice: function (a) {
        this.stamina += a[0];
        this.power += a[1];
        this.mindfullness += a[2];
        this.experience += a[3];
    },
    show: function () {
        console.log(`\n\tPLAYER STATUS  
        Stamina: ${this.stamina}
        Power: ${this.power}
        Mindfullness: ${this.mindfullness}
        Experience: ${this.experience}
        `);
    },
};

const workouts = {
    //OBJETO CRIADO COM OS VALORES QUE SERÃO ALTERADOS DE ACORDO COM A ATIVIDADE ESCOLHIDA PELO USUÁRIO
    Hiit: [-10, +12, +2, +8],
    Pace: [-6, +8, +4, +2],
    Regenerative: [-4, +4, +4, +4],
    Tecnic: [-6, +6, +8, +6],
    Gym: [-8, +10, +4, 0],
};

const recovery = {
    //OBJETO CRIADO COM OS VALORES QUE SERÃO ALTERADOS DE ACORDO COM A ATIVIDADE ESCOLHIDA PELO USUÁRIO
    Meditation: [+10, 0, +10, 0],
    Phisiotherapy: [+8, +2, 0, +4],
    Yoga: [+6, +4, +8, 0],
    Reading: [+4, 0, +5, +2],
    Nap: [+12, 0, 0, 0],
};

const instructions = [
    //LISTA CRIADA PARA MOSTRAR AS INSTRUÇÕES, DA MANHÃ, DA TARDE E DA NOITE
    `\nGood Morning, let's start the day. What workout you will choose?\n`,
    "\nWell done! It's 14h, you can choose another workout.\n",
    '\nLast training session of the day.\n',
];
const instructionsTime = ['MORNING', 'AFTERNOON', 'NIGHT'];

function playerChoice(choice) {
    //FUNÇÃO PARA QUE, DE ACORDO COM A ESCOLHA NOS OBJETOS DE ATIVIDADES, ALTERAR OS STATUS NO OBJETO PLAYER
    if (choice === 'h') {
        player.choice(workouts.Hiit);
    } else if (choice === 'p') {
        player.choice(workouts.Pace);
    } else if (choice === 'r') {
        player.choice(workouts.Regenerative);
    } else if (choice === 't') {
        player.choice(workouts.Tecnic);
    } else if (choice === 'g') {
        player.choice(workouts.Gym);
    } else if (choice === 'm') {
        player.choice(recovery.Meditation);
    } else if (choice === 'ph') {
        player.choice(recovery.Phisiotherapy);
    } else if (choice === 'y') {
        player.choice(recovery.Yoga);
    } else if (choice === 're') {
        player.choice(recovery.Reading);
    } else if (choice === 'n') {
        player.choice(recovery.Nap);
    }
}

function valid(choice) {
    //FUNÇÃO PARA O MEU PROMPT ACEITE APENAS A RESPOSTA DE COMANDO DO JOGO
    if (
        choice != 'h' &&
        choice != 'p' &&
        choice != 'r' &&
        choice != 't' &&
        choice != 'g' &&
        choice != 'm' &&
        choice != 'ph' &&
        choice != 'y' &&
        choice != 're' &&
        choice != 'n'
    ) {
        return true;
    }
}

function options() {
    //FUNÇÃO PARA EXIBIR AS OPÇÕES DE ATIVIDADES
    console.log(`\nType the letter for each choice = 
    [H] = HIIT
    [P] = PACE
    [R] = REGENERATIVE
    [T] = TECNIC
    [G] = GYM
    [M] = MEDITATION
    [PH] = PHISIOTERAPY
    [Y] = YOGA
    [RE] = READING
    [N] = NAP\n
    `);
}

const name = prompt(`Welcome. What is your name:`);

console.log(
    //INSTRUÇÕES, INTERAÇÃO, ETC...
    `\n\n\tWelcome to the third project of Blue Edtech. My name is Tiago and i'm studing JavaScript.\n\n\tThis project is about a cyclist named ${name}. In this project ${name} have to choose the best training options for the best combination of all status at the big day, that is a race at the end of 7 training days. ${name} will have 10 options of workouts, and this options will increase or decreased the status.\n\nRules of the game:\n1-You can choose one workout for each time of the day, morning, afternoon and night.\n\n2-Player status are: Stamina, Power, Mindfullness, Experience. Stamina begins in 10, the others begins in 0.\n\n3-You will need Stamina for some workouts, if Stamina <= 0, you go for the next day, at the next day you will have Stamina = 10.\n\n4-If you don't have at least 30 stamina on race day(day 7), you will not be able to participate. GAME OVER!!\n\n5-The seventh day is the race day. You cannot make any choice!`,
);

prompt(`\nIf you are ready to play type enter for see the options\n`);
do {
    time.day = 1;
    player.stamina = 10;
    player.power = 0;
    player.mindfullness = 0;
    player.experience = 0;

    while (time.day <= 7) {
        if (time.day === 7) {
            if (player.stamina < 30) {
                console.log(
                    `You are too tired, at the warm you injured. Better luck next time!`,
                );
                break;
            } else if (player.mindfullness < 55) {
                console.log(
                    `You don't have enough mindfulness, ended up hitting a rock and had a flat tire. Better luck next time!`,
                );
                break;
            } else if (player.experience < 35) {
                console.log(
                    `Experience is too low, you ended up broking your rear derailleur.`,
                );
                break;
            } else {
                console.log(`YOU ARE THE CHAMPION!!!!`);
                break;
            }
        }

        console.log();
        console.log(`\nDAY: ${time.day}`);
        console.log(`TIME TRANSITIONS: ${instructionsTime[time.transitions]}`);
        console.log(instructions[time.transitions]);
        player.show();
        console.table(tableStatus);
        console.log(`\n`);
        if (time.day === 6) {
            console.log(
                `Tomorrow is the race day, becareful and make good choices. Today is the last oportunity for make good status.`,
            );
        }
        options();
        do {
            choice = prompt(`What is your choice: `).toLowerCase();
            if (
                choice != 'h' &&
                choice != 'p' &&
                choice != 'r' &&
                choice != 't' &&
                choice != 'g' &&
                choice != 'm' &&
                choice != 'ph' &&
                choice != 'y' &&
                choice != 're' &&
                choice != 'n'
            ) {
                console.log(
                    `The terminal only acept the information describe.`,
                );
            }
        } while (valid(choice));
        console.clear();
        time.changeMoment();
        playerChoice(choice);
        if (player.stamina <= 0) {
            if (time.day === 7) {
                console.log(`GAME OVER. BETTER LUCK NEXT TIME`);
            } else {
                console.log(
                    `You get 0 Stamina, now you have to rest and tomorrow is another day.`,
                );
                prompt(`TYPE ENTER`);
                console.clear();
                time.transitions = 0;
                time.day++;
                player.stamina = 10;
                continue;
            }
        }
        console.log();

        if (time.day === 7) {
            if (player.stamina < 30) {
                console.log(
                    `You are too tired, at the warm you injured. Better luck next time!`,
                );
                break;
            } else if (player.mindfullness < 55) {
                console.log(
                    `You don't have enough mindfulness, ended up hitting a rock and had a flat tire. Better luck next time!`,
                );
                break;
            } else if (player.experience < 35) {
                console.log(
                    `Experience is too low, you ended up broking your rear derailleur.`,
                );
                break;
            } else if (
                player.power >= 80 &&
                player.mindfullness >= 90 &&
                player.experience >= 45
            ) {
                console.log(`YOU ARE THE CHAMPION!!!!`);
                break;
            } else {
                console.log(
                    `You didn't train enough and couldn't complete the race. Better luck next time! `,
                );
            }
        }
    }

    do {
        playAgain = +prompt(`Do you wanna play again [1]YES || [0]NO: `);
    } while (playAgain != 1 && playAgain != 0);
} while (playAgain === 1);
