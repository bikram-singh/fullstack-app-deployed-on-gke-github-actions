const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

export async function fetchHealth() {
  const res = await fetch(`${API_BASE_URL}/health`);
  return res.json();
}

export async function fetchDbCheck() {
  const res = await fetch(`${API_BASE_URL}/db-check`);
  return res.json();
}

export async function fetchItems() {
  const res = await fetch(`${API_BASE_URL}/items`);
  return res.json();
}
