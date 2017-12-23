// This is just some sample data so you don't have to think of your own!

const sampleData = {
    id: 'sampleData',
    shots: {},
    filter: {}
};




for (var x = 0; x < 150; x++) {
  sampleData.shots[x] = {
      xCoor:Math.floor(Math.random() * 420),
      yCoor:Math.floor(Math.random() * 440),
      shotResult: (Math.random() >= 0.4),
      goalie: true,
  }
}




export default sampleData;
