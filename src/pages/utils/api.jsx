const apiUrl = "https://task-data-9a5y.onrender.com";

export async function getTask(userName) {
  try {
    const response = await fetch(`${apiUrl}/myTasks?createdBy=${userName}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
