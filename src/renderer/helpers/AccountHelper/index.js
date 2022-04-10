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
};
const Atom = {
  accounts,
};
const toExport = {
  service,
  Atom,
};

export default toExport;
