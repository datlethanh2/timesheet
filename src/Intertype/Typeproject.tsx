export const currencies = [
    {
      value: 'acpro',
      label: 'Active Projects',
    },
    {
      value: 'depro',
      label: 'Deactive Projects',
    },
    {
      value: 'alpro',
      label: 'All Projects',
    },
];
export type Project= {
    customerName: string,
    name: string,
    code: string,
    status: number,
    pms: string[],
    activeMember: number,
    projectType: number,
    timeStart: string,
    timeEnd: string,
    id: number,
};

export type Newpro= {
    name: string,
    code: string,
    status: number,
    timeStart: string,
    timeEnd: string,
    note: string,
    projectType: number,
    customerId: number,
    tasks: [
        {
            taskId: number,
            billable: boolean ,
            id: number,
        }
    ],
    users: [
        {
            userId: number,
            type: number,
            isTemp: boolean,
            id: number,
        }
    ],
    projectTargetUsers: [
        {
            userId: number,
            roleName: string,
            id: number,
        }
    ],
    komuChannelId: string,
    isNotifyToKomu: boolean,
    isNoticeKMSubmitTS: boolean,
    isNoticeKMRequestOffDate: boolean,
    isNoticeKMApproveRequestOffDate: boolean,
    isNoticeKMRequestChangeWorkingTime: boolean,
    isNoticeKMApproveChangeWorkingTime: boolean,
    isAllUserBelongTo: boolean,
    id: number,

};
export type UserNotPagging= {
    name: string,
    emailAddress: string,
    isActive: boolean,
    type: number,
    jobTitle: string,
    level: number,
    userCode: string,
    avatarPath: string,
    avatarFullPath: string,
    branch: number,
    branchColor: string,
    branchDisplayName: string,
    branchId: number,
    id: number
   
};
export type Users={
    userId: number,
    type: number,
    isTemp: boolean,
    id: number,
};
export type Taskp={
    taskId: number,
    billable: boolean,
    id: number,
};
export type Task= {
    name: string;
    type: number;
    isDeleted: boolean;
    id: number;
};

export type CustomerClient= {
    name: string,
    code: string,
    id: number;
};
export type NewClient= {
    name: string,
    code: string,
    id: number,
    address: string,
};

export type Listtask={
    name: string,
    id: number,
}