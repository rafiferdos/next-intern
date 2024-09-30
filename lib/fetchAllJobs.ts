export async function fetchAllJobs() {
    const response = await fetch('/api/jobs'); // Replace with your API endpoint
    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }
    return response.json();
  }