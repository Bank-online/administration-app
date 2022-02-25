import { atom } from 'recoil';
import { instance } from '../apiHelper';

const userAtom = atom({
  key: 'userState',
  default: undefined,
});

const isLoginAtom = atom({
  key: 'isLogin',
  default: false,
});

const service = {
  /**
   * Fonction pour se connecter à l'interface
   * @param {string} login l'identifiant de l'utilisateur
   * @param {string} password le mot de passe de l'utilisateur
   */
  authenticate: (identifiant, password) => {
    return instance.post('/user/login', {
      identifiant,
      password,
    });
  },
  getInfoUser: (uuid, token) => {
    return instance.get(`/user/get-user/${uuid}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
const toExport = {
  isLoginAtom,
  userAtom,
  service,
};

export default toExport;
