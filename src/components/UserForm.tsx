'use client';

import { useState, FormEvent } from 'react';

interface UserFormProps {
  onSubmit: (data: { name: string; email: string; password: string }) => void;
  initialData?: { name?: string; email?: string; password?: string };
  buttonText: string;
}

export function UserForm({ onSubmit, initialData, buttonText }: UserFormProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [password, setPassword] = useState(initialData?.password || '');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome"
        />
      </div>
      <div>
        <label>E-mail</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />
      </div>
      <div>
        <label>Senha</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
        />
      </div>
      <button type="submit">{buttonText}</button>
    </form>
  );
}
