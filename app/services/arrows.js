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
    const { evals, curves } = this;

    return {
      evals,
      curves,
    };
  }

  get rects() {
    const { evals } = this;

    return evals
      .filter((e) => e.data.prevEval)
      .map((e) => {
        const {
          data: { prevEval: pid, id },
        } = e;

        const eRectangle = document.querySelector(`[data-eval="${id}"]`);
        const prevRectangle = document.querySelector(`[data-eval="${pid}"]`);

        return [eRectangle, prevRectangle];
      });
    // find previousEval if it exists calculate and add add a path
  }

  get curves() {
    const { rects } = this;

    return rects.map(([eRectangle, prevRectangle]) => {
      const { sx, sy, c1x, c1y, c2x, c2y, ex, ey } = boxToArrow(
        eRectangle,
        prevRectangle
      );

      return `M ${sx} ${sy} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${ex} ${ey}`;
    });
  }

  @action registerEval(evaluation) {
    schedule('actions', () => {
      this.evals = [...this.evals, evaluation];
    });
  }

  @action unregisterEval(evaluation) {
    schedule('actions', () => {
      this.evals = this.evals.filter((e) => e.id === evaluation.id);
    });
  }

  @action recalcCurves() {
    // retrigger the tracked getters by resetting dependent keys
    // eslint-disable-next-line no-self-assign
    this.evals = this.evals;
  }
}
