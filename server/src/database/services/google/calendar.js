const createNewEventGoogleActionConfig = {
    "fields": [
        {
            "id": 1,
            "name": "Name of the event",
            "title": "Name of the event",
            "input_field": {
                "placeholder": "Enter the name of the event"
            }
        },
        {
            "id": 2,
            "name": "Start date",
            "title": "Start date",
            "input_field": {
                "placeholder": "Date in format YYYY-MM-DD or today, or +n days from now"
            }
        },
        {
            "id": 3,
            "name": "End date",
            "title": "End date",
            "input_field": {
                "placeholder": "Date in format YYYY-MM-DD or today, or +n days from now"
            }
        },
        {
            "id": 4,
            "name": "Start time",
            "title": "Start time",
            "input_field": {
                "placeholder": "Time in format HH:MM (24h) or all-day"
            }
        },
        {
            "id": 5,
            "name": "End time",
            "title": "End time",
            "input_field": {
                "placeholder": "Time in format HH:MM (24h) or all-day"
            }
        },
        {
            "id": 6,
            "name": "Description",
            "title": "Description",
            "input_field": {
                "placeholder": "Enter the description of the event"
            }
        },
        {
            "id": 7,
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
            "name": "Event Name Keyword",
            "title": "Event Name Keyword",
            "input_field": {
                "placeholder": "Enter keyword to filter event names"
            }
        },
        {
            "id": 2,
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
            "name": "Event Name Keyword",
            "title": "Event Name Keyword",
            "input_field": {
                "placeholder": "Enter keyword to filter event names"
            }
        },
        {
            "id": 2,
            "name": "Description Keyword",
            "title": "Description Keyword",
            "input_field": {
                "placeholder": "Enter keyword to filter event descriptions"
            }
        }
    ]
};

/* Export action config */
export { createNewEventGoogleActionConfig, eventCreatedGoogleActionConfig, eventStartedGoogleActionConfig };