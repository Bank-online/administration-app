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

const userHelper = {
  /**
   * Fonction pour se connecter à l'interface
   * @param {string} login l'identifiant de l'utilisateur
   * @param {string} password le mot de passe de l'utilisateur
   */
  authenticate: (identifiant, password) => {
    return instance.post('/login', {
      identifiant,
      password,
    });
  },
};
const toExport = {
  isLoginAtom,
  userAtom,
};

export default toExport;
