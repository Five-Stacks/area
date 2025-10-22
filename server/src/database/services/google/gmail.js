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

const googleEmailReceivedActionConfig = {
    "fields": [
        {
            "id": 1,
            "name": "List of senders",
            "title": "List of senders",
            "input_field": {
                "placeholder": "sender@example.com (multiple emails separated by commas) if set to 'None', will accept emails from any sender"
            }
        },
        {
            "id": 2,
            "name": "Subject keywords",
            "title": "Subject keywords",
            "input_field": {
                "placeholder": "keyword1, keyword2 (multiple keywords separated by commas) if set to 'None', will accept any subject"
            }
        },
        {
            "id": 3,
            "name": "Body keywords",
            "title": "Body keywords",
            "input_field": {
                "placeholder": "keyword1, keyword2 (multiple keywords separated by commas) if set to 'None', will accept any body content"
            }
        }
    ]
};

/* Export action config */
export { sendEmailGmailActionConfig, googleEmailReceivedActionConfig };