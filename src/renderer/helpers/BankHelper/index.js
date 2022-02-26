import { atom } from 'recoil';
import { instance, token } from '../apiHelper';

/**contient tous les banks dispo */
const banksAtom = atom({
  key: 'Banks',
  default: [],
});

const service = {
  /**
   * recupere toute les bank
   */
  getAll: () => {
    return instance.get('/banks', token);
  },
  /**
   * permet de cree une bank
   * @param {Objet} data  data bank
   */
  create: (data) => {
    return instance.post('/bank', data, token);
  },
};
const toExport = {
  banksAtom,
  service,
};

export default toExport;
