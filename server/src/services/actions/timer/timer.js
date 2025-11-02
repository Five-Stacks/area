/* Check function for Timer action */
async function check(area) {
	const actionForm = area?.config?.trigger?.datas_form || [];
	const dayObj = actionForm.find(f => f.fieldName === "Day of the Week");
	const timeObj = actionForm.find(f => f.fieldName === "Time (HH:MM)");
	if (!dayObj || !timeObj) return false;

	const now = new Date();
	const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	const currentDay = daysOfWeek[now.getDay()];
	const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

	const requiredDay = dayObj.response;
    let [requiredHour, requiredMinute] = timeObj.response.split(":").map(Number);
	requiredHour = (requiredHour - 1 + 24) % 24;
	if (currentDay === requiredDay && currentHour === requiredHour && currentMinute === requiredMinute) {
		return true;
	}
	return false;
}

/* Export check function */
export default { check };
