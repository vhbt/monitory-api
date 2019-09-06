import axios from 'axios';

export const StudentSuapApi = axios.create({
  baseURL: 'https://suap.ifrn.edu.br/api/v2',
});

export const SuapApi = axios.create({
  baseURL: 'https://suap.ifrn.edu.br/api/v2',
});

export const OneSignalApi = axios.create({
  baseURL: 'https://onesignal.com/api/v1',
  headers: {
    Authorization: `BASIC ${process.env.ONESIGNAL_KEY}`,
  },
});
