const sendEmailGmailActionConfig = {
    "fields": [
        {
            "id": 1,
            "name": "Send to",
            "title": "Send to",
            "input_field": {
                "placeholder": "recipient@example.com (multiple emails separated by commas)"
            }
        },
        {
            "id": 2,
            "name": "Subject",
            "title": "Subject",
            "input_field": {
                "placeholder": "Email subject"
            }
        },
        {
            "id": 3,
            "name": "Body",
            "title": "Body",
            "input_field": {
                "placeholder": "Email body"
            }
        }
    ]
};

/* Export action config */
export { sendEmailGmailActionConfig };