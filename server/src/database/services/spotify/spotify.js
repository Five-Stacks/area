const spotifyCurrentlyPlayingActionConfig = {
    "fields": [
        {
            "id": 1,
            "mandatory": false,
            "name": "Keyword(s)",
            "title": "Keyword(s)",
            "input_field": {
                "placeholder": "keyword1, keyword2 (comma separated)"
            }
        }
    ]
};

const spotifyAddCurrentTrackReactionConfig = {
    "fields": [
        {
            "id": 1,
            "mandatory": true,
            "name": "Playlist ID or URL",
            "title": "Playlist ID or URL",
            "input_field": {
                "placeholder": "spotify:playlist:... or https://open.spotify.com/playlist/..."
            }
        },
        {
            "id": 2,
            "mandatory": false,
            "name": "Position",
            "title": "Position",
            "input_field": {
                "placeholder": "Optional numeric index (0 = top of playlist)"
            }
        }
    ]
};

export { spotifyCurrentlyPlayingActionConfig, spotifyAddCurrentTrackReactionConfig };
