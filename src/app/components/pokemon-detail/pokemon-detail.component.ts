import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-pokemon-detail',
  imports: [CommonModule],
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnChanges {
  @Input() pokemon: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pokemon'] && changes['pokemon'].currentValue) {
      this.showModal();
    }
  }

  showModal(): void {
    const modalElement = document.getElementById('pokemonDetailModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

}
