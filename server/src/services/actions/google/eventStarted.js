import getAccessTokenGoogle from '../../../utils/getAccessToken.js';

async function check(area) {
    try {
        const accessToken = await getAccessTokenGoogle(area);
        if (!accessToken) {
            throw new Error('Unable to obtain Google access token.');
        }

    const now = Date.now();
    const windowStart = now;
    const windowEnd = now + 60_000;
    const timeMinISO = new Date(windowStart).toISOString();
    const timeMaxISO = new Date(windowEnd).toISOString();
    const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${encodeURIComponent(timeMinISO)}&timeMax=${encodeURIComponent(timeMaxISO)}&singleEvents=true&orderBy=startTime`;

    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch Google Calendar events.');
    }

    const data = await response.json();
    const items = data.items || [];

    let startingEvents = [];

    for (const event of items) {
        startingEvents.push(event);
    }

    if (startingEvents.length === 0) return false;

    const actionForm = area?.config?.trigger?.datas_form || [];
    const eventNameKeyword = actionForm.find(f => f.fieldName === "Event Name Keyword")?.response?.split(",") || [];
    const descriptionKeyword = actionForm.find(f => f.fieldName === "Description Keyword")?.response?.split(",") || [];

    startingEvents = startingEvents.filter(event => {
        const nameMatch = eventNameKeyword.length === 0 || eventNameKeyword.some(keyword => event.summary?.includes(keyword.trim()));
        const descriptionMatch = descriptionKeyword.length === 0 || descriptionKeyword.some(keyword => event.description?.includes(keyword.trim()));
        return nameMatch && descriptionMatch;
    });

    if (startingEvents.length === 0) return false;

    return true;
    } catch (error) {
        console.error('Error in Google Calendar Event Started action:', error);
        return false;
    }
}

/* Export action */
export default { check };