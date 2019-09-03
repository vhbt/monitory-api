import axios from 'axios';

export const StudentSuapApi = axios.create({
  baseURL: 'https://suap.ifrn.edu.br/api/v2',
});

export const SuapApi = axios.create({
  baseURL: 'https://suap.ifrn.edu.br/api/v2',
});
