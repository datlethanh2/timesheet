export type Task= {
    name: string;
    type: number;
    isDeleted: boolean;
    id: number;
};
export type TaskEdit= {
      name: string;
      type: number;
      id: number;   
};
export const TasksTypes = [
      {
        value: '0',
        label: 'Common Task',
      },
      {
        value: '1',
        label: 'Other Task',
      },       
];

export type TaskNew= {
    name: string;
    type: number;
    id: 0;
    
};
export const taskstypes = [
    {
      value: '0',
      label: 'Common Task',
    },
    {
      value: '1',
      label: 'Other Task',
    },       
];