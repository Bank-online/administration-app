import { atom } from 'recoil';
import { instance, token } from '../apiHelper';

/**contient la data de l'utilisateur logger */
const userAtom = atom({
  key: 'userState',
  default: undefined,
});

const isLoginAtom = atom({
  key: 'isLogin',
  default: false,
});

/**contient l'ensemble des utilisateur disponible */
const users = atom({
  key: 'allUsers',
  default: [],
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
  /**
   * cette fonction nous permet de recuperer la data liee a un utilisateur
   * @param {*} uuid uui de user qu'on souhaite recuperer la data
   * @param {*} token  token user
   * @returns
   */
  getInfoUser: (uuid, tokKen) => {
    return instance.get(`/user/get-user/${uuid}`, token);
  },
  getAll: () => {
    return instance.get(`/user`, token);
  },
};
const Atom = {
  users,
};
const toExport = {
  isLoginAtom,
  userAtom,
  service,
  Atom,
};

export default toExport;
