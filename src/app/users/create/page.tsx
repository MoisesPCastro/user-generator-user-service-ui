'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useCreateUser } from '@/hooks/useUsers';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function UserForm() {
  const router = useRouter();
  const createUser = useCreateUser();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createUser.mutateAsync(formData);
      toast.success('Usuário cadastrado com sucesso!');
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
      <h1 className="text-2xl font-bold mb-4">Cadastrar Novo Usuário</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-96">
        <Input type="text" name="name" placeholder="Nome" value={formData.name} onChange={handleChange} required />
        <Input type="email" name="email" placeholder="E-mail" value={formData.email} onChange={handleChange} required />
        <Input type="password" name="password" placeholder="Senha" value={formData.password} onChange={handleChange} required />
        <Input type="password" name="confirmPassword" placeholder="Confirme a senha" value={formData.confirmPassword} onChange={handleChange} required />
        <Button type="submit">Cadastrar</Button>
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
