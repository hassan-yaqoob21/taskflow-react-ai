export default async function HealthPage() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");

  if (!response.ok) {
    throw new Error("Health check failed");
  }

  const data = await response.json();

  return (
    <main>
      <h1>Health Check</h1>

      <p>API connection is working.</p>

      <div>
        <p>
          <strong>ID:</strong> {data.id}
        </p>

        <p>
          <strong>Title:</strong> {data.title}
        </p>

        <p>
          <strong>Completed:</strong> {data.completed ? "Yes" : "No"}
        </p>
      </div>
    </main>
  );
}