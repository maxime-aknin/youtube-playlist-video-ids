require('dotenv').config();
var fetch = require('node-fetch');
var commandLineArgs = require('command-line-args');
var optionDefinitions = [
	{name: 'api-key', type: String},
	{name: 'playlist-id', type: String}
];
var options = commandLineArgs(optionDefinitions)
var apiKey, playlistId, counter = 0, maxResults = 50, video_ids = [];

if (typeof options['api-key'] !== 'undefined')
	apiKey = options['api-key'];
else if (typeof process.env.API_KEY !== 'undefined')
	apiKey = process.env.API_KEY;
else {
	console.error('Error: Missing api key');
	process.exit(1);
}

if (typeof options['playlist-id'] !== 'undefined')
	playlistId = options['playlist-id'];
else if (typeof process.env.PLAYLIST_ID !== 'undefined')
	playlistId = process.env.PLAYLIST_ID;
else {
	console.error('Error: Missing api key');
	process.exit(1);
}

function run(pageToken = false) {
	var url = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=" + maxResults + "&playlistId=" + playlistId + "&key=" + apiKey
	if (pageToken) url += "&pageToken=" + pageToken
	fetch(url)
		.then(function (res) {
			counter++;
			if (!res.ok || res.status !== 200) {
				console.error('Error: Bad response status.');
				process.exit(1);
			}
			return res.json();
		})
		.then(function (json) {
			for (var i = 0; i < json.items.length; i++) {
				var item = json.items[i]
				video_ids.push(item.snippet.resourceId.videoId);
			}
			if (typeof json.nextPageToken !== 'undefined' && json.nextPageToken.length) {
				run(json.nextPageToken);
			}
			else {
				for (var j = 0; j < video_ids.length; j++)
					console.log(video_ids[j]);
				process.exit(0)
			}
		})
		.catch(function (err) {
			console.error(err);
			process.exit(1);
		});
}

run();

