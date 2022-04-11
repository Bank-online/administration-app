import { atom } from 'recoil';
import { instance, token } from '../apiHelper';

/**contient l'ensemble des compte disponible pour le filtre */
const accounts = atom({
  key: 'allaccounts',
  default: undefined,
});

const service = {
  /**
   * cette fonction nous permet de cree un ou des compte bancaire a un utilisateur
   * @param {*} data
   * @returns
   */
  create: (data) => {
    return instance.post(`/account`, data);
  },
  /**
   * cette function nous permet de recuperer les compte bancaire lier a un utilisateur
   * @param {*} uuid
   * @returns
   */
  AllAccountUser: (uuid) => {
    return instance.get(`/accounts/${uuid}`);
  },
  /**
   * cette fonction nous permet de recuperer les information et les operation liee a un compte bancaire
   * @param {*} uuid
   * @returns
   */
  getAccount: (uuid) => {
    return instance.get(`/account/${uuid}`);
  },
};
const Atom = {
  accounts,
};
const toExport = {
  service,
  Atom,
};

export default toExport;
