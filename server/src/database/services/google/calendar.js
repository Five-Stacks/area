const createNewEventGoogleReactionConfig = {
    "fields": [
        {
            "id": 1,
            "mandatory": true,
            "name": "Name of the event",
            "title": "Name of the event",
            "input_field": {
                "placeholder": "Enter the name of the event"
            }
        },
        {
            "id": 2,
            "mandatory": true,
            "name": "Start date in format YYYY-MM-DD or today, or +n days from now",
            "title": "Start date in format YYYY-MM-DD or today, or +n days from now",
            "input_field": {
                "placeholder": "Date in format YYYY-MM-DD or today, or +n days from now"
            }
        },
        {
            "id": 3,
            "mandatory": true,
            "name": "End date in format YYYY-MM-DD or today, or +n days from now",
            "title": "End date in format YYYY-MM-DD or today, or +n days from now",
            "input_field": {
                "placeholder": "Date in format YYYY-MM-DD or today, or +n days from now"
            }
        },
        {
            "id": 4,
            "mandatory": true,
            "name": "Start time in format HH:MM (24h) or all-day",
            "title": "Start time in format HH:MM (24h) or all-day",
            "input_field": {
                "placeholder": "Time in format HH:MM (24h) or all-day"
            }
        },
        {
            "id": 5,
            "mandatory": true,
            "name": "End time in format HH:MM (24h) or all-day",
            "title": "End time in format HH:MM (24h) or all-day",
            "input_field": {
                "placeholder": "Time in format HH:MM (24h) or all-day"
            }
        },
        {
            "id": 6,
            "mandatory": false,
            "name": "Description",
            "title": "Description",
            "input_field": {
                "placeholder": "Enter the description of the event"
            }
        },
        {
            "id": 7,
            "mandatory": false,
            "name": "Location",
            "title": "Location",
            "input_field": {
                "placeholder": "Enter the location of the event"
            }
        }
    ]
};

const eventCreatedGoogleActionConfig = {
    "fields": [
        {
            "id": 1,
            "mandatory": false,
            "name": "Event Name Keyword",
            "title": "Event Name Keyword",
            "input_field": {
                "placeholder": "Enter keyword to filter event names"
            }
        },
        {
            "id": 2,
            "mandatory": false,
            "name": "Description Keyword",
            "title": "Description Keyword",
            "input_field": {
                "placeholder": "Enter keyword to filter event descriptions"
            }
        }
    ]
};

const eventStartedGoogleActionConfig = {
    "fields": [
        {
            "id": 1,
            "mandatory": false,
            "name": "Event Name Keyword",
            "title": "Event Name Keyword",
            "input_field": {
                "placeholder": "Enter keyword to filter event names"
            }
        },
        {
            "id": 2,
            "mandatory": false,
            "name": "Description Keyword",
            "title": "Description Keyword",
            "input_field": {
                "placeholder": "Enter keyword to filter event descriptions"
            }
        }
    ]
};

/* Export action config */
export { createNewEventGoogleReactionConfig, eventCreatedGoogleActionConfig, eventStartedGoogleActionConfig };
