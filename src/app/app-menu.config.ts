export const AppMenuConfig = [
    {
        label: "",
        items: [
            {label: "Главная", icon: "pi pi-fw pi-microsoft", routerLink: ["/"]}
        ],
    },
    {
        label: "Мониторинг",
        items: [
            {label: "Объекты", icon: "pi pi-fw pi-home", routerLink: ["/"]},
            {label: "Документы", icon: "pi pi-fw pi-file", routerLink: ["/"]},
            {label: "Пользователи", icon: "pi pi-fw pi-users", routerLink: ["/"]},
            {label: "Промокоды", icon: "pi pi-fw pi-ticket", routerLink: ["/"]},
            {label: "Администраторы", icon: "pi pi-fw pi-shield", routerLink: ["/"]},
            {label: "Истории", icon: "pi pi-fw pi-instagram", routerLink: ["/"]},
            {label: "Услуги", icon: "pi pi-fw pi-server", routerLink: ["/"]},
            {label: "Идеи", icon: "pi pi-fw pi-twitter", routerLink: ["/"]},
            {label: "Претензии", icon: "pi pi-fw pi-thumbs-down", routerLink: ["/"]},
            {label: "Чаты", icon: "pi pi-fw pi-comments", routerLink: ["/"]},
        ]
    },
    {
        label: "Продукты",
        items: [
            {label: "Материалы", icon: "pi pi-fw pi-bookmark", routerLink: ["/"]},
            {label: "Системы", icon: "pi pi-fw pi-server", routerLink: ["/"]},
            {label: "Шаблоны", icon: "pi pi-fw pi-clone", routerLink: ["/"]},
            {label: "Руководства и инструкции", icon: "pi pi-fw pi-folder", routerLink: ["/"]},
        ]
    },
    {
        label: "Справочники",
        items: [
            {label: "Типы документов", icon: "pi pi-fw pi-book", routerLink: ["/"]},
            {label: "Направления", icon: "pi pi-fw pi-directions", routerLink: ["/"]},
            {label: "Единицы измерения", icon: "pi pi-fw pi-hourglass", routerLink: ["/"]},
            {label: "Страны", icon: "pi pi-fw pi-globe", routerLink: ["/"]},
            {label: "Языки", icon: "pi pi-fw pi-language", routerLink: ["/"]},
            {label: "Токены для отчетов", icon: "pi pi-fw pi-slack", routerLink: ["/"]},
        ]
    },
    {
        label: "Поддержка",
        items: [
            {label: "Регионы", icon: "pi pi-fw pi-map-marker", routerLink: ["/"]},
            {label: "Контакты", icon: "pi pi-fw pi-envelope", routerLink: ["/"]},
        ]
    },





    {label:"---------demo-------"},
    {
        label: 'Home',
        items: [
            {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/']}
        ]
    },
    {
        label: 'UI Components',
        items: [
            {label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/demo/uikit/formlayout']},
            {label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/demo/uikit/input']},
            {label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/demo/uikit/floatlabel']},
            {
                label: 'Invalid State',
                icon: 'pi pi-fw pi-exclamation-circle',
                routerLink: ['/uikit/invalidstate']
            },
            {label: 'Button', icon: 'pi pi-fw pi-box', routerLink: ['/demo/uikit/button']},
            {label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/demo/uikit/table']},
            {label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/demo/uikit/list']},
            {label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/demo/uikit/tree']},
            {label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/demo/uikit/panel']},
            {label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/demo/uikit/overlay']},
            {label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/demo/uikit/media']},
            {
                label: 'Menu',
                icon: 'pi pi-fw pi-bars',
                routerLink: ['/demo/uikit/menu'],
                routerLinkActiveOptions: {
                    paths: 'subset',
                    queryParams: 'ignored',
                    matrixParams: 'ignored',
                    fragment: 'ignored'
                }
            },
            {label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/demo/uikit/message']},
            {label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/demo/uikit/file']},
            {label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/demo/uikit/charts']},
            {label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/demo/uikit/misc']}
        ]
    },
    {
        label: 'Prime Blocks',
        items: [
            {label: 'Free Blocks', icon: 'pi pi-fw pi-eye', routerLink: ['/demo/blocks'], badge: 'NEW'},
            {
                label: 'All Blocks',
                icon: 'pi pi-fw pi-globe',
                url: ['https://www.primefaces.org/primeblocks-ng'],
                target: '_blank'
            },
        ]
    },
    {
        label: 'Utilities',
        items: [
            {label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['/demo/utilities/icons']},
            {
                label: 'PrimeFlex',
                icon: 'pi pi-fw pi-desktop',
                url: ['https://www.primefaces.org/primeflex/'],
                target: '_blank'
            },
        ]
    },
    {
        label: 'Pages',
        icon: 'pi pi-fw pi-briefcase',
        items: [
            {
                label: 'Landing',
                icon: 'pi pi-fw pi-globe',
                routerLink: ['/demo/landing']
            },
            {
                label: 'Auth',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Login',
                        icon: 'pi pi-fw pi-sign-in',
                        routerLink: ['/auth/login']
                    },
                    {
                        label: 'Error',
                        icon: 'pi pi-fw pi-times-circle',
                        routerLink: ['/auth/error']
                    },
                    {
                        label: 'Access Denied',
                        icon: 'pi pi-fw pi-lock',
                        routerLink: ['/auth/access']
                    }
                ]
            },
            {
                label: 'Crud',
                icon: 'pi pi-fw pi-pencil',
                routerLink: ['/demo/pages/crud']
            },
            {
                label: 'Timeline',
                icon: 'pi pi-fw pi-calendar',
                routerLink: ['/demo/pages/timeline']
            },
            {
                label: 'Not Found',
                icon: 'pi pi-fw pi-exclamation-circle',
                routerLink: ['/notfound']
            },
            {
                label: 'Empty',
                icon: 'pi pi-fw pi-circle-off',
                routerLink: ['/demo/pages/empty']
            },
        ]
    },
    {
        label: 'Hierarchy',
        items: [
            {
                label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
                items: [
                    {
                        label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark'},
                            {label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark'},
                            {label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark'},
                        ]
                    },
                    {
                        label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark'}
                        ]
                    },
                ]
            },
            {
                label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
                items: [
                    {
                        label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark'},
                            {label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark'},
                        ]
                    },
                    {
                        label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark'},
                        ]
                    },
                ]
            }
        ]
    },
    {
        label: 'Get Started',
        items: [
            {
                label: 'Documentation', icon: 'pi pi-fw pi-question', routerLink: ['/demo/documentation']
            },
            {
                label: 'View Source',
                icon: 'pi pi-fw pi-search',
                url: ['https://github.com/primefaces/sakai-ng'],
                target: '_blank'
            }
        ]
    }
] as const;
