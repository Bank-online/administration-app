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
  getInfoUser: (uuid, tok = null) => {
    return instance.get(
      `/user/get-user/${uuid}`,
      tok
        ? {
            headers: {
              Authorization: `Bearer ${tok}`,
            },
          }
        : token
    );
  },
  /**
   * cette fonction nous permet de recuperer l'ensemble des utilisateur
   * @returns
   */
  getAll: () => {
    return instance.get(`/user`);
  },
  /**
   * cette fonction nous permet de bloquer ,supprimer , suspendre un compte
   * @param {*} action emu active ,banish ,suspend
   * @param {*} uuid uuid du compte uilisateur qu'on souhaite faire une acction
   * @returns
   */
  managementAccount: (action, uuid, comment = null) => {
    return instance.patch(`/user/${action}/${uuid}`, {
      comment: comment ? comment : '',
    });
  },
  /**
   * cette fonction nous permet de mettre a jour des information client
   * @param {*} data
   * @returns
   */
  updateUser: (data) => {
    return instance.patch(`/user`, data);
  },
  /**
   * cette fonction nous permet de verifier si un utilisateur existe
   * @param {*} user
   */
  checkExisteUser: (user) => {
    return instance.post(`/user/checkUser`, user);
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
