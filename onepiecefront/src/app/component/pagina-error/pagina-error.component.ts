import { Component, effect, OnInit, Signal, WritableSignal } from '@angular/core';
import { signal, computed } from '@angular/core';


@Component({
  selector: 'app-pagina-error',
  templateUrl: './pagina-error.component.html',
  styleUrls: ['./pagina-error.component.css']
})

export class PaginaErrorComponent implements OnInit {
  isTrial = signal(false);
  isTrialExpired = signal(false);
  showTrialDiration = computed(() => this.isTrial() && !this.isTrialExpired());

  userName = signal('pro_programer_123')
  isValidUserId = signal(true)
  count3 = signal(3)
  // private readonly logginEfect = efect(() =>{
  //  console.log(`The count is: ${this.count()}`);
  //})

  constructor(){
    effect(() => {
      console.log(`The current count is: ${this.count3}`)
    })
  }

  increment(){
    this.count3.set(this.count3() + 1)
  }

  ngOnInit(): void {
    this.updating()
  }


  activateTrial() {
    this.isTrial.set(true)
  }

  updating() {
    this.userName.set('cool_coder_789')
  }

  //shippingOptions: Signal<ShippingMethod[]> = getShippingOptions();

    // Select the first shipping option by default.
    // selectedOption = signal(this.shippingOptions()[0]);

    // changeShipping(newOptionIndex: number) {
    //   this.selectedOption.set(this.shippingOptions()[newOptionIndex]);
    // }
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

// const data = signal(['test'], {equal: _.isEqual})
// data.set(['test'])

const shippingOptions = signal(['Ground', 'Air', 'Sea']);
//const selectedOption = linkedSignal(() => shippingOptions()[0]);
// console.log(selectedOption()); // 'Ground'
// selectedOption.set(shippingOptions()[2]);
// console.log(selectedOption()); // 'Sea'
// shippingOptions.set(['Email', 'Will Call', 'Postal service']);
// console.log(selectedOption()); // 'Email'
