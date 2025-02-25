'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { useUpdateUser } from '@/hooks/useUsers';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { api } from '@/services/api';

export default function EditUserPage() {
  const router = useRouter();
  const { id } = useParams();
  const updateUser = useUpdateUser();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const resetForm = () => {
    setFormData({ name: '', email: ''});
  };

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get(`/users/${id}`);
        setFormData({ name: response.data.name, email: response.data.email });
      } catch {
        toast.error('Erro ao carregar usuário');
      }
    }
    if (id) fetchUser();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
    await updateUser.mutateAsync({ id: Number(id), userData: formData });
      toast.success('Usuário atualizado com sucesso!');
      resetForm();
      router.push('/users');
    } catch (error: any) {
      if (error.response) {
        const { status } = error.response;

        switch (status) {
          case 409:
            toast.warn('E-mail já está em uso.');
            setFormData((prevState) => ({
                ...prevState,
                email: '',
              }));
            break;
          default:
            toast.error('Ocorreu um erro inesperado. Tente novamente.');
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Editar Usuário</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-96">
        <Input type="text" name="name" value={formData.name} onChange={handleChange} required />
        <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
        <Button type="submit">Salvar Alterações</Button>
      </form>
      <div className="w-96 mt-10 flex justify-start">
        <Button
          variant="outline"
          onClick={() => router.push('/users')}
          className="border-gray-400 text-gray-600 hover:bg-gray-200 transition"
        >
          ← Voltar
      </Button>
      </div>
    </div>
  );
}
