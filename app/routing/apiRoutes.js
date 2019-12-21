const friends = require("../data/friends");

module.exports = function (app) {


    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    // Taking in the POST request from the front end and adding a new user to our array.
    app.post("/api/friends", function (req, res) {

        let newUser = req.body;

        friends.push(req.body);

        let bestMatch = findBestMatch(newUser, friends);

        res.json(friends[bestMatch]);

    });
}

// This function compares the difference between the user's answers and each previous user in our server-side array. If the total difference is less than the current best match then the best match will change to that user. This is then returned back to the front end for the user to see.
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