'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { 
    Table, 
    TableHeader, 
    TableBody, 
    TableRow, 
    TableCell, 
    TableHead 
} from '@/components/ui/table';
import { searchAllUsers } from '@/hooks/useUsers';

export default function UsersList() {
  const { data: users, isLoading, error } = searchAllUsers();
  const router = useRouter();

  if (isLoading) return <p>Carregando usuários...</p>;
  if (error) return <p>Erro ao carregar usuários.</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Usuários Cadastrados</h1>
      
      <Button onClick={() => router.push('/users/create')} className="mb-4">
        Cadastrar Novo Usuário
      </Button>

      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
