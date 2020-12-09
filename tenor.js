const{tenorKey} = require('./config.json');
const Tenor = require("tenorjs").client({
    "Key": tenorKey, // https://tenor.com/developer/keyregistration
    "Filter": "off", // "off", "low", "medium", "high", not case sensitive
    "Locale": "en_US", // Your locale here, case-sensitivity depends on input
    "MediaFilter": "minimal", // either minimal or basic, not case sensitive
    "DateFormat": "D/MM/YYYY - H:mm:ss A" // Change this accordingly
});

// Tenor.Trending.GIFs("LIMIT HERE")
Tenor.Trending.GIFs("2").then(Results => {
      Results.forEach(Post => {
            console.log(`Item #${Post.id} (${Post.created}) @ ${Post.url}`);
      });
}).catch(console.error);
// Item #11672604 (Created: 19/04/2018 - 7:28:09 PM) @ https://tenor.com/W8JY.gif.

Tenor.Search.Random("food", "3").then(Results => {
      Results.forEach(Post => {
            console.log(`Item ${Post.id} (Created: ${Post.created}) @ ${Post.url}`);
      });
}).catch(console.error);
// Item 7677199 (Created: 31/01/2017 - 20:43:51 PM) @ https://tenor.com/GnlX.gif
// Item 9176226 (Created: 9/07/2017 - 18:59:40 PM) @ https://tenor.com/MFjO.gif
// Item 8448338 (Created: 30/04/2017 - 20:55:24 PM) @ https://tenor.com/JBXG.gif
