
export interface TaskNew  {
    name: string;
    type: number;
    id: number;
  
};

export interface TaskView extends TaskNew {
    isDeleted: boolean;
}
