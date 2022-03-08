import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { schedule } from '@ember/runloop';
import { getBoxToBoxArrow } from 'curved-arrows';

function boxToArrow(ra, rb) {
  const bbA = ra.getBoundingClientRect();
  const bbB = rb.getBoundingClientRect();

  const [sx, sy, c1x, c1y, c2x, c2y, ex, ey, ae, as] = getBoxToBoxArrow(
    bbA.x,
    bbA.y,
    bbA.width,
    bbA.height,
    bbB.x,
    bbB.y,
    bbA.width,
    bbB.height
  );

  return {
    sx,
    sy,
    c1x,
    c1y,
    c2x,
    c2y,
    ex,
    ey,
    ae,
    as,
  };
}

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
