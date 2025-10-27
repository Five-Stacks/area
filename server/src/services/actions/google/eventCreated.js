import getAccessTokenGoogle from '../../../utils/getAccessToken.js';

async function check(area) {
    try {
        const accessToken = await getAccessTokenGoogle(area);
        if (!accessToken) {
            throw new Error('Unable to obtain Google access token.');
        }

    const updatedMinISO = new Date(Date.now() - 60_000).toISOString();
    const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?updatedMin=${encodeURIComponent(updatedMinISO)}&singleEvents=true`;

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
    const oneMinuteAgo = Date.now() - 60_000;
    let newEvents = [];

    for (const event of items) {
        const eventCreationTime = event.created;
        if (!eventCreationTime) {
            continue;
        }
        const createdMs = new Date(eventCreationTime).getTime();

        if (createdMs >= oneMinuteAgo) {
            newEvents.push(event);
        }
    }

    if (newEvents.length === 0) {
        return false;
    }

    const actionForm = area?.config?.trigger?.datas_form || [];
    const eventNameKeyword = actionForm.find(f => f.fieldName === "Event Name Keyword")?.response?.split(",") || [];
    const descriptionKeyword = actionForm.find(f => f.fieldName === "Description Keyword")?.response?.split(",") || [];

    newEvents = newEvents.filter(event => {
        const nameMatch = eventNameKeyword.length === 0 || eventNameKeyword.some(keyword => event.summary?.includes(keyword.trim()));
        const descriptionMatch = descriptionKeyword.length === 0 || descriptionKeyword.some(keyword => event.description?.includes(keyword.trim()));
        return nameMatch && descriptionMatch;
    });

    if (newEvents.length === 0) {
        return false;
    }

    return true;
    } catch (error) {
        console.error('Error in Google Calendar Event Created action:', error);
        return false;
    }
}

/* Export action */
export default { check };