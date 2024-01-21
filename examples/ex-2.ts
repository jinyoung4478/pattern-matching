import { match, P } from 'ts-pattern';

/**
 * example 2
 */

type State =
  | { status: 'idle' }
  | { status: 'loading'; startTime: number }
  | { status: 'success'; data: string }
  | { status: 'error'; error: Error };

type Event =
  | { type: 'fetch' }
  | { type: 'success'; data: string }
  | { type: 'error'; error: Error }
  | { type: 'cancel' };

const reducer = (state: State, event: Event) =>
  match([state, event])
    .returnType<State>()
    .with([{ status: 'loading' }, { type: 'success' }], ([_, event]) => ({
      status: 'success',
      data: event.data,
    }))
    .with([{ status: 'loading' }, { type: 'error', error: P.select() }], (error) => ({
      status: 'error',
      error,
    }))
    .with([{ status: P.not('loading') }, { type: 'fetch' }], () => ({
      status: 'loading',
      startTime: Date.now(),
    }))
    .with(
      [
        {
          status: 'loading',
          startTime: P.when((t) => t + 2000 < Date.now()),
        },
        { type: 'cancel' },
      ],
      () => ({ status: 'idle' })
    )
    .with(P._, () => state)
    .exhaustive();
// .otherwise(() => console.error('ERROR'))

const result = reducer(
  { status: 'loading', startTime: 1 },
  { type: 'success', data: 'event-success' }
);

console.log(result);
