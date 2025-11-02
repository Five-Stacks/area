async function check(area) {
    try {
        const actionForm = area?.config?.trigger?.datas_form || [];
        const intervalStr = actionForm.find(f => f.fieldName === 'Interval (minutes)')?.response;
        const interval = Number.isFinite(Number(intervalStr)) ? Math.max(1, parseInt(intervalStr, 10)) : null;
        if (!interval) return false;

        const nowMinutes = Math.floor(Date.now() / 60_000);
        const cfg = (area.config && typeof area.config === 'object') ? { ...area.config } : {};
        const lastMinutes = Number.isFinite(Number(cfg._lastEveryXMinutes)) ? Number(cfg._lastEveryXMinutes) : null;

        if (lastMinutes === null) {
            cfg._lastEveryXMinutes = nowMinutes;
            try { await area.update({ config: cfg }); } catch (e) { console.error('Failed to persist lastEveryXMinutes', e); }
            return false;
        }

        if ((nowMinutes - lastMinutes) >= interval) {
            cfg._lastEveryXMinutes = nowMinutes;
            try { await area.update({ config: cfg }); } catch (e) { console.error('Failed to persist lastEveryXMinutes', e); }
            return true;
        }

        return false;
    } catch (error) {
        console.error('Error in Timer every X minutes action:', error);
        return false;
    }
}

export default { check };
