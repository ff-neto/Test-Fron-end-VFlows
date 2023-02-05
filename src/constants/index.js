export const CONSTANTS = {
    get USERS() {
        return [
            {
                id: 1,
                name: 'Empresa 1',
                cnpj:'91.526.551/0001-49',
                businessName: 'Empresa Businness',
                listContracts: [
                    {
                        id: 1,
                        name: 'Contrato por tempo determinado',
                        code: '11664477-01',
                        percent: 50,
                    },
                    {
                        id: 2,
                        name: 'Contrato por tempo indeterminado',
                        code: '77662299-01',
                        percent: 50,
                    },
                    {
                        id: 3,
                        name: 'Contrato de trabalho temporário',
                        code: '99225544-01',
                        percent: 50,
                    },
                    {
                        id: 4,
                        name: 'Contrato de trabalho eventual',
                        code: '11442266-01',
                        percent: 50,
                    },
                    {
                        id: 5,
                        name: 'Contrato de trabalho home office',
                        code: '11662222-01',
                        percent: 50,
                    },
                    {
                        id: 6,
                        name: 'Contrato 1',
                        code: '44007766-01',
                        percent: 50,
                    },
                    {
                        id: 7,
                        name: 'Contrato de trabalho terceirizado',
                        code: '77662200-01',
                        percent: 50,
                    },
                    {
                        id: 8,
                        name: 'Contrato de trabalho para estagiário',
                        code: '33552288-01',
                        percent: 50,
                    },
                    {
                        id: 9,
                        name: 'Contrato de trabalho intermitente',
                        code: '22552277-01',
                        percent: 50,
                    },
                    {
                        id: 10,
                        name: 'Contrato de trabalho parcial',
                        code: '44008855-01',
                        percent: 50,
                    },
                    {
                        id: 11,
                        name: 'Contrato de trabalho terceirizado',
                        code: '11772266-01',
                        percent: 50,
                    }
                ]
            },
        ]
    },
    get VALID_CNPJ() {
        return ['91.526.551/0001-49','77.955.732/0001-60','13.571.303/0001-06'];
    }
}
