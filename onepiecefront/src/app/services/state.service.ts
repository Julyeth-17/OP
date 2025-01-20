import { computed, Injectable, signal } from "@angular/core";

interface AppState{
  counter: number;
  user: {
    name: string;
    isAuth: boolean;
  }
}

@Injectable({providedIn: 'root'})

export class StateService {
  private _state = signal<AppState>({
    counter: 0,
    user: {
      name: '',
      isAuth: false
    }
  })

  readonly counter = computed(() => this._state().counter);
  readonly user = computed(() => this._state().user);
  readonly isAuth = computed(() => this._state().user.isAuth);

  setUser(name: string): void{
    this._state.update((state) => ({
      ...state,
      user: {
        ...state,
        name,
        isAuth: true
      },
    }));
  }

  logOut(): void{
    this._state.update((state) => ({
      ...state,
      user: {
        ...state,
        name: '',
        isAuth: false
      },
    }));
  }

  incrementCounter(): void{
    this._state.update((state) => ({
      ...state,
      counter: state.counter + 1
    }))
  }
}
