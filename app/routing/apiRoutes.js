const friends = require("../data/friends");

module.exports = function (app) {


    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {

        let newUser = req.body;

        friends.push(req.body);

        let bestMatch = findBestMatch(newUser, friends);
        
        res.json(friends[bestMatch]);

    });
}

function findBestMatch(user, matches) {

    let userScores = user.scores

    let bestMatch;

    let leastDifference = 41;

    
    for (let i = 0; i < matches.length; i++) {
        
        let totalDifference = 0;

        for (let j = 0; j < 10; j++) {

            totalDifference += Math.abs(userScores[j] - matches[i].scores[j])

        }

        if (totalDifference < leastDifference && user.photo !== matches[i].photo) {

            leastDifference = totalDifference;
            bestMatch = i;
            
        }
        
    }
    
    return bestMatch;
}