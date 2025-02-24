'use client';

import { useRouter, useParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../services/api';
import { UserForm } from '../../../components/UserForm';

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id;
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    },
    enabled: !!userId,
  });

  const updateUserMutation = useMutation({
    mutationFn: async (data: { name?: string; email?: string; password?: string }) => {
      const response = await api.patch(`/users/${userId}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      queryClient.invalidateQueries(['user', userId]);
      router.push('/users');
    },
  });

  const handleUpdateUser = (data: { name?: string; email?: string; password?: string }) => {
    updateUserMutation.mutate(data);
  };

  if (isLoading) return <p>Carregando usuário...</p>;

  return (
    <div>
      <h1>Editar Usuário</h1>
      <UserForm
        onSubmit={handleUpdateUser}
        initialData={{
          name: user.name,
          email: user.email,
          password: '',
        }}
        buttonText="Salvar Alterações"
      />
    </div>
  );
}
