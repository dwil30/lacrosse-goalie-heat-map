// This is just some sample data so you don't have to think of your own!

const sampleData = {
    id: 'sampleData',
    shots: [],
    filter: {},
    name: 'Sample data',
    updated: '',
    goalie: true,
    heatmapGrid: 3,
};




for (var x = 0; x < 80; x++) {
    sampleData.shots[`shot-${x}`] = {
        xCoor:Math.floor(Math.random() * 420),
        yCoor:Math.floor(Math.random() * 440),
        shotResult: (Math.random() >= 0.4),
        goalie: true,
    }
}




export default sampleData;
