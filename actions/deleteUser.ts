"use server";

export async function deleteUser(userId: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
  const fullUrl = `${baseUrl}/api/deleteUser`;
  console.log('Full URL:', fullUrl);

  const response = await fetch(fullUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: userId }),
  });

  if (!response.ok) {
    const errorDetails = await response.json();
    throw new Error(`Failed to delete user: ${errorDetails.error}`);
  }

  const result = await response.json();
  console.log('Delete user response:', result);
}