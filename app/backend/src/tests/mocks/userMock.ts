import ILogin from '../../api/interfaces/Login'
import IUser from '../../api/interfaces/IUser';
import IToken from '../../api/interfaces/IToken';

export const logInInformations: ILogin = {
    email: 'trybe@trybe.com',
    password: 'nescaumelhorquetoddy',
};

export const user: IUser = {
    id: 1,
    userName: 'Tryber',
    role: 'admin',
    email: 'trybe@trybe.com',
    password: '123456',
};

const token: IToken = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc',
}; 

export default {
    token,
}