let transaction = {
    waiver_budget: [],
    type: 'trade',
    transaction_id: '977757529587388416',
    status_updated: 1687564142432,
    status: 'complete',
    settings: null,
    roster_ids: [ 10, 8 ],
    metadata: null,
    leg: 1,
    drops: null,
    draft_picks: [
        {
            season: '2023',
            round: 2,
            roster_id: 10,
            previous_owner_id: 10,
            owner_id: 8,
            league_id: null
        },{
            season: '2023',
            round: 3,
            roster_id: 10,
            previous_owner_id: 10,
            owner_id: 8,
            league_id: null
          },
          {
            season: '2023',
            round: 1,
            roster_id: 8,
            previous_owner_id: 8,
            owner_id: 10,
            league_id: null
          },
          {
            season: '2023',
            round: 7,
            roster_id: 8,
            previous_owner_id: 8,
            owner_id: 10,
            league_id: null
          }
        //... other draft pick objects ...
    ],
    creator: '428800244474454016',
    created: 1687478070211,
    consenter_ids: [ 10, 8 ],
    adds: {"4892":8, "4811":8,"1892":10,"4832":10,"4822":10}
};

function groupBy(arr, keyGetter) {
    const map = new Map();
    arr.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    console.log(map);
    return map;
}



function parseAndGroupTransaction(transaction) {
    let message = "TRADE:\n";

    // Get unique roster ids involved in the transaction
    let uniqueRosterIds = [...new Set(transaction.roster_ids)];

    uniqueRosterIds.forEach(rosterId => {
        let rosterAdds = transaction.adds && getPlayerIdForRosterId(transaction.adds, rosterId) || [];
        let rosterDraftPicks = transaction.draft_picks && transaction.draft_picks.filter(pick => pick.owner_id === rosterId) || [];

        // Construct adds message
        let addsMessage = rosterAdds.join("\n") + "\n";

        // Construct draft picks message
        let picksMessage = rosterDraftPicks.map(pick => `Roster ID ${pick.roster_id} ${pick.season} ${addNumberSuffix(pick.round)} Round Pick`).join("\n");

        message += `Roster ID ${rosterId} Receives:\n${addsMessage}${picksMessage}\n\n`;
    });

    return message;
}

function addNumberSuffix(num) {
    num = parseInt(num);
    let j = num % 10,
        k = num % 100;
    if (j == 1 && k != 11) {
        return num + "st";
    } else if (j == 2 && k != 12) {
        return num + "nd";
    } else if (j == 3 && k != 13) {
        return num + "rd";
    } else {
        return num + "th";
    }
}

function getPlayerIdForRosterId(obj, rosterId) {
    return Object.entries(obj)
        .filter(([key, value]) => value === rosterId)
        .map(([key, value]) => key);
}



console.log(parseAndGroupTransaction(transaction));
