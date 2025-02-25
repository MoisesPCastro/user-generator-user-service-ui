'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { searchAllUsers, useDeleteUser } from '@/hooks/useUsers';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { confirmToast } from '@/utils/confirmToast';

export default function UsersList() {
  const { data: users, isLoading, error } = searchAllUsers();
  const deleteUser = useDeleteUser();
  const router = useRouter();
  const [deletingUserId, setDeletingUserId] = useState<number | null>(null);

  if (isLoading) return <p>Carregando usuários...</p>;
  if (error) return <p>Erro ao carregar usuários.</p>;

  const handleDelete = (id: number) => {
    confirmToast({
      title: 'Excluir Usuário',
      message: 'Tem certeza que deseja excluir este usuário?',
      onConfirm: async () => {
        setDeletingUserId(id);
        await deleteUser.mutateAsync(id);
        setDeletingUserId(null);
      },
    });
  };

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
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="flex gap-2">
                  <Button
                  className="text-blue-600 border-blue-600 hover:bg-blue-50" 
                    variant="outline"
                    onClick={() => router.push(`/users/${user.id}`)}
                  >
                    Editar
                  </Button>
                  <Button
                    className="text-red-600 border-red-600 hover:bg-red-50"
                    variant="ghost"
                    disabled={deletingUserId === user.id}
                    onClick={() => handleDelete(user.id)}
                  >
                    {deletingUserId === user.id ? 'Excluindo...' : 'Excluir'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
