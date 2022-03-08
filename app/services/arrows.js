import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { schedule } from '@ember/runloop';

export default class ArrowsService extends Service {
  @tracked evals = [];

  get fns() {
    const { registerEval, unregisterEval, recalcCurves } = this;

    return {
      registerEval,
      unregisterEval,
      recalcCurves,
    };
  }

  get data() {
    const { evals } = this;

    return {
      evals,
    };
  }

  @action registerEval(evaluation) {
    schedule('actions', () => {
      this.evals = [...this.evals, evaluation];
    });
  }

  @action unregisterEval(evalucation) {
    schedule('actions', () => {
      this.evals = this.evals.filter((e) => e.id === evaluation.id);
    });
  }
}
