'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateUser } from '@/hooks/useUsers';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { userSchema } from '@/schemas/userShema';

export default function UserForm() {
  const router = useRouter();
  const createUser = useCreateUser();

  const {
    register,
    handleSubmit,//Moises@2020
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      await createUser.mutateAsync(data);
      toast.success('Usuário cadastrado com sucesso!');
      router.push('/users');
    } catch (error: any) {
      if (error.response) {
        const { status } = error.response;
  
        switch (status) {
          case 409:
            toast.warn('E-mail já está em uso.');
            break;
          default:
            toast.error('Ocorreu um erro inesperado. Tente novamente.');
        }
      }
    } finally {
      reset();
    }
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-4 bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-black">Cadastrar Usuário</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <Input type="text" placeholder="Nome" {...register('name')} />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <Input type="email" placeholder="E-mail" {...register('email')} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <Input type="password" placeholder="Senha" {...register('password')} />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div>
            <Input type="password" placeholder="Confirmação de Senha" {...register('confirmPassword')} />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>

          <Button type="submit" disabled={isSubmitting || createUser.isPending} className="w-full">
            {isSubmitting || createUser.isPending ? 'Cadastrando...' : 'Cadastrar'}
          </Button>
        </form>
      </div>
    </div>
  );
}
