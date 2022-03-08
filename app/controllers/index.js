import Controller from '@ember/controller';

export default class IndexController extends Controller {
  data = [
    {
      id: '1',
      prevEval: '0',
      nextEval: '2',
      blockedEval: '3',
    },
    {
      id: '2',
      prevEval: '1',
      nextEval: '',
      blockedEval: '',
    },
    {
      id: '3',
      prevEval: '1',
      nextEval: '',
      blockedEval: '',
    },
    {
      id: '0',
      prevEval: '',
      nextEval: '1',
      blockedEval: '',
    },
  ];
}
