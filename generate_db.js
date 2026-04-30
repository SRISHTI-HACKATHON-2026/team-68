const fs = require('fs');
const path = require('path');

const classes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const subjects = ['Science', 'Math', 'English', 'History', 'Geography'];
const data = {
  Science: [
    { c: 'Roots, stems, and leaves are parts of a plant.', q: 'Which part of the plant grows under the ground?', h: 'Think about where water is found.' },
    { c: 'Plants make their own food using sunlight.', q: 'Why are plants called producers?', h: 'They do not need to hunt for food.' },
    { c: 'Magnets have a north and south pole. Opposite poles attract.', q: 'What happens when you put a north pole and a south pole together?', h: 'They pull toward each other.' },
    { c: 'Water can be a solid, liquid, or gas.', q: 'What do we call water when it is a solid?', h: 'Think of what you put in your drinks to cool them.' },
    { c: 'The Earth revolves around the Sun, which takes 365 days.', q: 'How long does one revolution of the Earth take?', h: 'It is the same as one year.' },
    { c: 'Cells are the basic building blocks of all living things.', q: 'What is the smallest unit of life?', h: 'It sounds like the word sell.' },
    { c: 'Photosynthesis requires sunlight, water, and carbon dioxide.', q: 'What three things do plants need to make food?', h: 'Light, a liquid, and a gas.' },
    { c: 'Force equals mass times acceleration (F=ma).', q: 'How do you calculate force?', h: 'Multiply two other physical properties.' },
    { c: 'DNA contains the genetic instructions for life.', q: 'What molecule holds our genetic code?', h: 'It is a three-letter acronym.' },
    { c: 'Chemical bonds store energy that is released during reactions.', q: 'Where is energy stored in a molecule?', h: 'Think about what holds atoms together.' },
    { c: 'Quantum mechanics describes the behavior of matter at atomic scales.', q: 'What branch of physics deals with atoms?', h: 'It starts with Quantum.' },
    { c: 'The theory of relativity was developed by Albert Einstein.', q: 'Who developed the theory of relativity?', h: 'Famous physicist with wild hair.' }
  ],
  Math: [
    { c: 'Counting by twos: 2, 4, 6, 8, 10.', q: 'What comes after 8 when counting by twos?', h: 'Add 2 to 8.' },
    { c: 'Adding tens means changing the digit in the tens place.', q: 'What is 10 more than 45?', h: 'Count by tens from 45.' },
    { c: 'Multiplication is repeated addition. 3 x 4 is 3 added 4 times.', q: 'What is 3 x 4?', h: 'Add 3 + 3 + 3 + 3.' },
    { c: 'Fractions represent equal parts of a whole.', q: 'If you cut a pizza into 4 equal slices and eat 1, what fraction did you eat?', h: 'One out of four.' },
    { c: 'The perimeter is the distance around a shape.', q: 'How do you find the perimeter of a square?', h: 'Add all the outside edges.' },
    { c: 'Area is the space inside a 2D shape. For a rectangle, it is length times width.', q: 'How do you calculate the area of a rectangle?', h: 'Multiply two sides.' },
    { c: 'An acute angle is less than 90 degrees.', q: 'What do we call an angle that is 45 degrees?', h: 'It means sharp or small.' },
    { c: 'The Pythagorean theorem is a^2 + b^2 = c^2.', q: 'What theorem relates the sides of a right triangle?', h: 'Named after Pythagoras.' },
    { c: 'A linear equation makes a straight line on a graph.', q: 'What shape does a linear equation make?', h: 'The word line is in the name.' },
    { c: 'Quadratic equations can have up to two real solutions.', q: 'How many real solutions can a quadratic equation have at most?', h: 'Think of the number two.' },
    { c: 'The derivative represents the rate of change.', q: 'What calculus concept measures the rate of change?', h: 'It starts with D.' },
    { c: 'Integrals calculate the area under a curve.', q: 'What do integrals calculate?', h: 'The space beneath a line on a graph.' }
  ],
  English: [
    { c: 'A noun is a person, place, or thing.', q: 'Which word is a naming word (noun)?', h: 'It is something you can touch.' },
    { c: 'An adjective describes a noun.', q: 'What does an adjective do?', h: 'It tells you more about a thing.' },
    { c: 'Verbs are action words, like run, jump, and play.', q: 'Which of these is a verb?', h: 'Look for the action.' },
    { c: 'A sentence always begins with a capital letter.', q: 'How should every sentence start?', h: 'Think about big letters.' },
    { c: 'A simile compares two things using like or as.', q: 'What is a simile?', h: 'It involves a comparison.' },
    { c: 'A metaphor states that one thing IS another thing.', q: 'How is a metaphor different from a simile?', h: 'It does not use like or as.' },
    { c: 'The protagonist is the main character in a story.', q: 'Who is the protagonist?', h: 'The hero or main person.' },
    { c: 'Foreshadowing gives hints about what will happen later.', q: 'What literary device hints at the future?', h: 'Think about a shadow cast forward.' },
    { c: 'Irony is when the opposite of what is expected happens.', q: 'What is it called when the unexpected happens?', h: 'Starts with I.' },
    { c: 'A sonnet is a 14-line poem with a specific rhyme scheme.', q: 'How many lines are in a sonnet?', h: 'Ten plus four.' },
    { c: 'Satire uses humor to criticize stupidity or vices.', q: 'What is the purpose of satire?', h: 'To make fun of or criticize.' },
    { c: 'Syntax refers to the arrangement of words in a sentence.', q: 'What term describes word order?', h: 'Starts with Syn.' }
  ],
  History: [
    { c: 'Long ago, people lived in caves and hunted for food.', q: 'Where did early humans live?', h: 'Dark places in mountains.' },
    { c: 'The Egyptians built the pyramids as tombs for pharaohs.', q: 'Why were the pyramids built?', h: 'To bury their kings.' },
    { c: 'Ancient Greeks invented the Olympic Games.', q: 'Who started the Olympics?', h: 'People from Greece.' },
    { c: 'The Romans built long roads to connect their empire.', q: 'What did the Romans build for travel?', h: 'Paths for walking and carts.' },
    { c: 'Castles were built in the Middle Ages for protection.', q: 'Why did kings build castles?', h: 'To stay safe from enemies.' },
    { c: 'The Renaissance was a time of rebirth in art and learning.', q: 'What does Renaissance mean?', h: 'It means rebirth.' },
    { c: 'The Industrial Revolution introduced machines and factories.', q: 'What did the Industrial Revolution bring?', h: 'Things that make manufacturing faster.' },
    { c: 'World War I began in 1914.', q: 'In what year did WWI begin?', h: 'Fourteen years after 1900.' },
    { c: 'The Cold War was a political rivalry between the US and USSR.', q: 'Who were the two main powers in the Cold War?', h: 'America and the Soviet Union.' },
    { c: 'The Civil Rights Movement fought for equal rights in the 1960s.', q: 'What did the Civil Rights Movement fight for?', h: 'Equality.' },
    { c: 'The fall of the Berlin Wall in 1989 symbolized the end of the Cold War.', q: 'What event symbolized the end of the Cold War?', h: 'A wall coming down.' },
    { c: 'Globalization refers to the interconnectedness of modern economies.', q: 'What is the term for a connected world economy?', h: 'Think of the globe.' }
  ],
  Geography: [
    { c: 'A map shows us where places are located.', q: 'What tool helps us find places?', h: 'It is drawn on paper.' },
    { c: 'Oceans are large bodies of saltwater.', q: 'What kind of water is in the ocean?', h: 'It is not fresh water.' },
    { c: 'The Earth is a sphere, and we use models called globes to see it.', q: 'Which model represents the Earth?', h: 'It is round like a ball.' },
    { c: 'Mountains are the highest landforms on Earth.', q: 'What is the highest landform?', h: 'They have peaks.' },
    { c: 'A desert is a very dry area with little rain.', q: 'What is a desert?', h: 'Think about sand and lack of water.' },
    { c: 'Rivers flow downhill into lakes or oceans.', q: 'Where do rivers flow into?', h: 'Larger bodies of water.' },
    { c: 'The equator is an imaginary line around the middle of the Earth.', q: 'What is the equator?', h: 'It divides the Earth into North and South.' },
    { c: 'Climate is the average weather over a long period.', q: 'How is climate different from weather?', h: 'It is over a long time.' },
    { c: 'Tectonic plates shifting cause earthquakes.', q: 'What causes earthquakes?', h: 'Moving pieces of the Earth crust.' },
    { c: 'Population density measures how many people live in an area.', q: 'What does population density measure?', h: 'Crowdedness.' },
    { c: 'Deforestation is the clearing of large forested areas.', q: 'What is deforestation?', h: 'Removing trees.' },
    { c: 'Renewable resources can be replenished naturally.', q: 'What are renewable resources?', h: 'Energy sources that do not run out.' }
  ]
};

const finalDB = {};
let counter = 1;

classes.forEach(c => {
  subjects.forEach(s => {
    let qInfo = data[s][c-1];
    let qId = `mapping_q_${counter}`;
    finalDB[qId] = {
      questionId: qId,
      subject: s.toLowerCase(),
      classLevel: String(c),
      concept: "general",
      difficulty: c <= 4 ? "easy" : c <= 8 ? "medium" : "hard",
      questionText: qInfo.q,
      context: qInfo.c,
      hints: [qInfo.h],
      correctKeywords: [qInfo.h.split(' ')[0]], // just a mock
      wrongKeywords: []
    };
    counter++;
  });
});

fs.writeFileSync(path.join(__dirname, '..', 'data', 'questions', 'full-curriculum.json'), JSON.stringify(finalDB, null, 2));
console.log('Database generated at ../data/questions/full-curriculum.json');
