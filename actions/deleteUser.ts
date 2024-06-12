"use server";

export async function deleteUser(userId: string) {
  const response = await fetch('/api/deleteUser', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: userId }),
  });

  if (!response.ok) {
    throw new Error('Failed to delete user');
  }
}