const timerActionConfig = {
    "fields": [
        {
            "id": 1,
            "name": "Day of the Week",
            "title": "Day of the Week",
            "options_field": {
                "values": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
            }
        },
        {
            "id": 2,
            "name": "Time (HH:MM)",
            "title": "Time (HH:MM)",
            "input_field": {
                "placeholder": "09:00"
            }
        }
    ]
};

const timerReactionConfig = {
    "fields": [
        {
            "id": 1,
            "name": "Duration (minutes)",
            "title": "Duration (minutes)",
            "input_field": {
                "placeholder": "30"
            }
        }
    ]
};

const timerEveryXActionConfig = {
    "fields": [
        {
            "id": 1,
            "mandatory": true,
            "name": "Interval (minutes)",
            "title": "Interval (minutes)",
            "input_field": {
                "placeholder": "e.g. 15"
            }
        }
    ]
};

/* Export action config */
export { timerActionConfig, timerReactionConfig, timerEveryXActionConfig };
