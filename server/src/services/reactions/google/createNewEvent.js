/* Import modules */
import getAccessToken from '../../../utils/getAccessToken.js';

const serverTimeZone = 'Europe/Paris';

function parseDateToken(token) {
    if (!token) return null;
    const raw = String(token).trim();
    const lower = raw.toLowerCase();
    if (lower === 'today') {
        return new Date().toISOString().slice(0, 10);
    }

    const plusMatch = lower.match(/^\+(\d+)\s*(days?)?$/);
    if (plusMatch) {
        const n = parseInt(plusMatch[1], 10);
        const d = new Date();
        d.setUTCDate(d.getUTCDate() + n);
        return d.toISOString().slice(0, 10);
    }

    if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
        return raw;
    }

    const parsed = new Date(raw);
    if (!isNaN(parsed.getTime())) {
        return parsed.toISOString().slice(0, 10);
    }
    return null;
}

function addDaysToDateString(dateStr, n) {
    const [y, m, d] = dateStr.split('-').map(Number);
    const dt = new Date(Date.UTC(y, m - 1, d));
    dt.setUTCDate(dt.getUTCDate() + n);
    return dt.toISOString().slice(0, 10);
}

function formatDateTime(dateToken, time, isEnd = false) {
    const parsedDate = parseDateToken(dateToken);
    if (!parsedDate) {
        throw new Error(`Invalid date token: ${dateToken}`);
    }

    if (String(time).toLowerCase() === 'all-day') {
        if (isEnd) {
            return { date: addDaysToDateString(parsedDate, 1) };
        }
        return { date: parsedDate };
    }

    const hasOffset = /[Zz+-]/.test(String(time));
    const dateTime = `${parsedDate}T${time}:00`;
    if (hasOffset) {
        return { dateTime };
    }
    return { dateTime, timeZone: serverTimeZone };
}

/* Run function for create new Google Calendar event reaction */
async function run(area, reactionEntry) {
    if (!reactionEntry) {
        return 'No reaction entry provided.';
    }
    const reactionForm = reactionEntry?.datas_form || [];

    try {
        const accessToken = await getAccessToken(area, 'Google');
        if (!accessToken) {
            throw new Error('Unable to obtain Google access token.');
        }

        const eventTitle = reactionForm.find(f => f.fieldName === "Name of the event")?.response || 'New Event';
        const startDate = reactionForm.find(f => f.fieldName === "Start date")?.response;
        const endDate = reactionForm.find(f => f.fieldName === "End date")?.response;
        const startTime = reactionForm.find(f => f.fieldName === "Start time")?.response;
        const endTime = reactionForm.find(f => f.fieldName === "End time")?.response;
        const description = reactionForm.find(f => f.fieldName === "Description")?.response || '';
        const location = reactionForm.find(f => f.fieldName === "Location")?.response || '';

        if (!startDate || !endDate || !startTime || !endTime) {
            throw new Error('Missing date or time fields in action configuration.');
        }

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
        return `Event '${eventData.summary}' created successfully.`;
    } catch (error) {
        console.error('Error in Google create event reaction:', error);
        throw error;
    }
}

/* Export the run function */
export default { run };
