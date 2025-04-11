export interface Task {
    id?: string;
    title: string;
    description: string;
    status: 'pendente' | 'em_andamento' | 'concluida';
    priority: 'baixa' | 'media' | 'alta';
    dueDate: Date;
    owner?: string;
  }