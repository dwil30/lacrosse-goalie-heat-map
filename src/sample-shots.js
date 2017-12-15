// This is just some sample data so you don't have to think of your own!

const shots = {};

for (var x = 0; x < 25; x++) {
  shots[x] = {
      xCoor:Math.floor(Math.random() * 420),
      yCoor:Math.floor(Math.random() * 440),
      shotResult: (Math.random() >= 0.5),
      goalie: true,
  }
}

export default shots;
