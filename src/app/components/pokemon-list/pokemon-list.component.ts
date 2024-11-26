import { Component, OnInit, HostListener, EventEmitter, Output } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  @Output() pokemonSelected = new EventEmitter<any>()
  pokemons: any[] = [];
  filteredPokemons: any[] = []; 
  searchTerm: string = '';
  offset: number = 0; 
  limit: number = 20; 
  loading = false;
  loadingMore = false;


  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(): void {
    if (this.loadingMore) return; 
    this.loadingMore = true;

    this.pokemonService.getPokemons(this.limit, this.offset).subscribe({
      next: (data) => {
        data.results.forEach((pokemon: any) => {
          this.pokemonService.getPokemonDetails(pokemon.url).subscribe((details) => {
            this.pokemons.push({
              name: details.name,
              image: details.sprites.front_default,
              types: details.types.map((t: any) => t.type.name).join(', '),
              stats: details.stats.map((s: any) => ({
                name: s.stat.name,
                value: s.base_stat,
              })),
              height: details.height,
              weight: details.weight,
              abilities: details.abilities.map((a: any) => a.ability.name).join(', '),
              base_experience: details.base_experience,
            });
            this.filterPokemons();
          });
        });
        this.offset += this.limit;
        this.loadingMore = false;
      },
      error: (err) => {
        console.error('Error fetching Pokémon:', err);
        this.loadingMore = false;
      }
    });
  }

  filterPokemons(): void {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredPokemons = this.pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTermLower)
    );
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (this.isBottomOfPage() && !this.loadingMore) {
      this.loadPokemons();
    }
  }

  isBottomOfPage(): boolean {
    return (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 50
    );
  }
  selectPokemon(pokemon: any): void {
    this.pokemonSelected.emit(pokemon); 
  }
}
