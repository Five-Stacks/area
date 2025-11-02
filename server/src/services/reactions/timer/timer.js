/* Run function for Timer reaction */
async function run(area, reactionEntry) {
    if (!reactionEntry) {
        return 'No reaction entry provided.';
    }
    const form = reactionEntry?.datas_form || [];
    const durationObj = form.find(f => f.fieldName === "Duration (minutes)");
    const duration = durationObj ? parseInt(durationObj.response, 10) : null;
    if (isNaN(duration) || duration <= 0) {
        return 'Timer reaction skipped: Invalid duration.';
    }
    await new Promise(resolve => setTimeout(resolve, duration * 60 * 1000));
    return `Timer reaction completed after ${duration} minute(s).`;
}

/* Export the run function */
export default { run };
