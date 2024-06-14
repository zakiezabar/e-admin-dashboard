'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { SelectUser } from '@/lib/types';
import { deleteUser } from '@/actions/deleteUser';
import { useRouter } from 'next/navigation';

export function ListingsTable({
  users,
  offset
}: {
  users: SelectUser[];
  offset: number | null;
}) {

  const router = useRouter();

  console.log('Users Table Props:', { users, offset }); // Debugging log

  function onClick() {
    router.replace(`/?offset=${offset}`);
  }

  return (
    <>
      <form className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="max-w-[150px]">Name</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden md:table-cell">Action</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <UserRow key={user.id} user={user} />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </form>
      {offset !== null && (
        <Button
          className="mt-4 w-40"
          variant="link"
          onClick={() => onClick()}
        >
          Next Page
        </Button>
      )}
    </>
  );
}

function UserRow({ user }: { user: SelectUser }) {
  const router = useRouter();

  async function handleDelete() {
    try {
      await deleteUser(user.id);
      router.refresh();
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  }

  console.log('Rendering UserRow for:', user); // Debugging log

  return (
    <TableRow>
      <TableCell className="font-medium">{user.name}</TableCell>
      <TableCell className="hidden md:table-cell">{user.email}</TableCell>
      <TableCell>
        <Button
          className="w-full"
          size="sm"
          variant="danger"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};