# youtube-playlist-video-ids
Retreive all video ids from a Youtube playlist

## Installation

Install with [npm](https://www.npmjs.com/):

``` sh
npm install youtube-playlist-video-ids --save
```

## Usage

First, you have to get an api key for [YouTube Data API v3](https://developers.google.com/youtube/v3/)

### Using a dotenv file

Create a `.env` in the project root directory and add these variables: 
``` sh
API_KEY={YOUR API KEY}
PLAYLIST_ID={YOUR PLAYLIST ID}
```

Then just do
``` bash
npm start
```
It'll print the video ids to stdout.

### Using command line arguments

You can also handle everything in your terminal
``` bash
npm start -- --api-key {YOUR API KEY} --playlist-id {YOUR PLAYLIST ID} > {TARGET FILE}
```

