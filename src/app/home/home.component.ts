import { Component } from '@angular/core';
import { PokemonListComponent } from "../components/pokemon-list/pokemon-list.component";
import { PokemonDetailComponent } from '../components/pokemon-detail/pokemon-detail.component';

@Component({
  selector: 'app-home',
  imports: [PokemonListComponent, PokemonDetailComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  selectedPokemon: any = null; 

  onPokemonSelected(pokemon: any): void {
    this.selectedPokemon = pokemon;
  }
}
