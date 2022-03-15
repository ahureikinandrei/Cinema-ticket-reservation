interface ILink {
    path: string;
    name: string;
}

interface ILinkList {
    admin: ILink[];
    navigate: ILink[];
    auth: ILink[];
}

export const linkList: ILinkList = {
    admin: [
        {
            path: '/create',
            name: 'Create',
        },
    ],
    navigate: [
        {
            path: '/',
            name: 'Home',
        },
    ],
    auth: [
        {
            path: '/profile',
            name: 'Profile',
        },
    ],
};
