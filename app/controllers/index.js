import Controller from '@ember/controller';
import d3 from 'd3';

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

  get hierarchy() {
    const { data } = this;

    return d3
      .stratify()
      .id((d) => d.id)
      .parentId((d) => d.prevEval)(data);
  }

  get descendentsMap() {
    return this.hierarchy
      .descendants()
      .map((d) => d.children)
      .compact();
  }
}
