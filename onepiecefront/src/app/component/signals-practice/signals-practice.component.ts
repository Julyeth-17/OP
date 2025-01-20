import { Component, effect, inject, Injector, Signal, WritableSignal } from '@angular/core';
import { signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-signals-practice',
  templateUrl: './signals-practice.component.html',
  styleUrls: ['./signals-practice.component.css'],
  standalone: false,
})
export class SignalsPracticeComponent  {
  stateService = inject(StateService)

  data = signal<object | null>(null);
  loading = signal(false);

  userName = signal<string>('pro_programer')
  userNameReanOnly = this.userName.asReadonly();
  user = signal<string>('Julieth V.')
  resultComputed = computed(() => `Result ${this.user()} ${this.userName()}`)

  // private readonly injector = inject(Injector)
  count3 = signal(3)

  constructor( private http:HttpClient ){
    effect(() => {
      console.log(`The current value is: ${this.user()}`)
    })
  }

  changeUsername(){
    this.userName.set('cool_coder');
  }

  changeUser(){
    this.user.set('Catalino')
    // effect(() => console.log(this.user()), { injector: this.injector})
  }

  onUpdateValue(): void{
    this.userName.update((current) => current + ' GitHub');
  }

  fetchData(){
    this.loading.set(true);
    this.http.get('https://api.api-onepiece.com/v2/sagas/en')
    .subscribe((response) => {
        this.data.set(response);
        this.loading.set(false)
        console.log(response)
      })
  }

  increment(){
    this.count3.set(this.count3() + 1)
  }
}

// SIGNALS: Una señal es un contenedor que rodea un valor y notifica a los consumidores interesados ​​cuando dicho valor cambia.
// Las señales pueden contener cualquier valor, desde valores primitivos hasta estructuras de datos complejas.

// Writable signals have the type WritableSignal.

const firstName = signal('Morgan');
console.log(firstName())

// firstName.set('jaime')
// console.log(firstName())

// firstName.update(name => name.toUpperCase())
// console.log(firstName())

// COMPUTED EXPRESSIONS
// COMPUTED is a signal that produces it's value based on other signals. Is read-only and it doesn't have a SET or UPDATE method
// the value of the COMPUTED signal automatically changes when any of the signals it read change. READ-ONLY, they're dynamics

const firstNameCapitalized = computed(() => firstName().toUpperCase())
console.log(firstNameCapitalized())

firstName.set('Jaime')
console.log(firstNameCapitalized())

console.log('-----------------------------')

const count1: WritableSignal<number> = signal(1)
console.log(count1())

const doubleCount: Signal<number> = computed(() => count1() * 2);
console.log(doubleCount())

console.log('-----------------------------')

const showCount = signal(false);
const count2 = signal(5);
const conditionalCount = computed(() => {
  if(showCount()) {
    return `The count is ${count2()}`
  } else {
    return `Nothing to see here!`
  }
});
console.log(conditionalCount())

console.log('-----------------------------')

// ----------------------------- // ----------------------------- // ----------------------------- // ----------------------------- //

const count = signal(0)
console.log('the count is: ' + count())

count.set(3);
console.log('the count is: ' + count())

count.update(value => value + 1)
console.log('the count is: ' + count())

console.log('-----------------------------')
