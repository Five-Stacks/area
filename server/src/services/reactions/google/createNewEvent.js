import getAccessTokenGoogle from '../../../utils/getAccessToken.js';

async function run(area) {
    const actionForm = area?.config?.action?.datas_form || [];

    try {
        const accessToken = await getAccessTokenGoogle(area);
        if (!accessToken) {
            throw new Error('Unable to obtain Google access token.');
        }

        const eventTitle = actionForm.find(f => f.fieldName === "Name of the event")?.response || 'New Event';
        const startDate = actionForm.find(f => f.fieldName === "Start date")?.response;
        const endDate = actionForm.find(f => f.fieldName === "End date")?.response;
        const startTime = actionForm.find(f => f.fieldName === "Start time")?.response;
        const endTime = actionForm.find(f => f.fieldName === "End time")?.response;
        const description = actionForm.find(f => f.fieldName === "Description")?.response || '';
        const location = actionForm.find(f => f.fieldName === "Location")?.response || '';

        if (!startDate || !endDate || !startTime || !endTime) {
            throw new Error('Missing date or time fields in action configuration.');
        }


        const serverTimeZone = 'Europe/Paris';

        const formatDateTime = (date, time) => {
            if (time.toLowerCase() === 'all-day') {
                return { date: date };
            } else {
                const hasOffset = /[Zz+-]/.test(time);
                const dateTime = `${date}T${time}:00`;
                if (hasOffset) {
                    return { dateTime };
                }
                return { dateTime, timeZone: serverTimeZone };
            }
        };

        const event = {
            summary: eventTitle,
            location: location,
            description: description,
            start: formatDateTime(startDate, startTime),
            end: formatDateTime(endDate, endTime),
        };

        const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to create calendar event: ${errorData.error.message}`);
        }

        const eventData = await response.json();
        return `Event '${eventData.summary}' created successfully on ${new Date().toISOString()}.`;
    } catch (error) {
        console.error('Error in Google create event reaction:', error);
        throw error;
    }
}

export default { run };