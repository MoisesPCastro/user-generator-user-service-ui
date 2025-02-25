// src/hooks/useUsers.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { api } from '../services/api';
export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    confirmPassword?: string;
}

export function searchAllUsers() {
    return useQuery<User[]>({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await api.get('/users?status=1');
            return response.data;
        },
    });
}

export function useCreateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newUser: Partial<User> & { password: string }) => {
            const response = await api.post('/users', newUser);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
}

export function useUpdateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, userData }: { id: number; userData: Partial<User> }) => {
            const response = await api.patch(`/users/${id}`, userData);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
}

export function useDeleteUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            return api.delete(`/users/${id}`);
        },
        onSuccess: () => {
            toast.success('Usuário removido com sucesso!');
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
        onError: () => {
            toast.error('Erro ao excluir usuário. Tente novamente.');
        },
    });
}

