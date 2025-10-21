/* Run function for Timer reaction */
async function run(area) {
    const actionForm = area?.config?.action?.datas_form || [];
    const durationObj = actionForm.find(f => f.fieldName === "Duration (minutes)");
    const duration = durationObj ? parseInt(durationObj.response, 10) : null;
    if (duration && !isNaN(duration)) {
        await new Promise(resolve => setTimeout(resolve, duration * 60 * 1000));
    }
    return `Timer reaction completed after ${duration} minute(s).`;
}

/* Export the run function */
export default { run };
