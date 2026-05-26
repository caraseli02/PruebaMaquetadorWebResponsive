import type { CardData } from "../../../types";
import { mockCards } from "../../../data/cards";

export interface FilterState {
  search: string;
  destinations: string[];
  activities: string[];
  maxPrice: number;
  ratings: string[];
}

export type FilterChangeListener = (state: FilterState, filteredCards: CardData[]) => void;

/**
 * Módulo Profundo: TravelFilterState
 * Centraliza la lógica de filtrado de viajes y el estado compartido de forma reactiva.
 */
export class TravelFilterState {
  private state: FilterState;
  private listeners: Set<FilterChangeListener> = new Set();

  constructor(initialState: Partial<FilterState> = {}) {
    this.state = {
      search: initialState.search ?? "",
      destinations: initialState.destinations ?? [],
      activities: initialState.activities ?? [],
      maxPrice: initialState.maxPrice ?? 700,
      ratings: initialState.ratings ?? [],
    };
  }

  /**
   * Suscribe un callback a cualquier cambio del estado de filtrado.
   * Retorna una función para cancelar la suscripción.
   */
  public subscribe(listener: FilterChangeListener): () => void {
    this.listeners.add(listener);
    // Notificación inmediata con los datos iniciales
    listener(this.getState(), this.getFilteredCards());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    const currentState = this.getState();
    const filtered = this.getFilteredCards();
    this.listeners.forEach((listener) => listener(currentState, filtered));
  }

  public getState(): FilterState {
    return {
      search: this.state.search,
      destinations: [...this.state.destinations],
      activities: [...this.state.activities],
      maxPrice: this.state.maxPrice,
      ratings: [...this.state.ratings],
    };
  }

  public setSearch(search: string): void {
    if (this.state.search !== search) {
      this.state.search = search;
      this.notify();
    }
  }

  public setMaxPrice(maxPrice: number): void {
    if (this.state.maxPrice !== maxPrice) {
      this.state.maxPrice = maxPrice;
      this.notify();
    }
  }

  public toggleDestination(dest: string): void {
    const current = new Set(this.state.destinations);
    if (current.has(dest)) {
      current.delete(dest);
    } else {
      current.add(dest);
    }
    this.state.destinations = [...current];
    this.notify();
  }

  public toggleActivity(activity: string): void {
    const current = new Set(this.state.activities);
    if (current.has(activity)) {
      current.delete(activity);
    } else {
      current.add(activity);
    }
    this.state.activities = [...current];
    this.notify();
  }

  public toggleRating(rating: string): void {
    const current = new Set(this.state.ratings);
    if (current.has(rating)) {
      current.delete(rating);
    } else {
      current.add(rating);
    }
    this.state.ratings = [...current];
    this.notify();
  }

  public clearAll(): void {
    this.state = {
      search: "",
      destinations: [],
      activities: [],
      maxPrice: 700,
      ratings: [],
    };
    this.notify();
  }

  /**
   * Ejecuta el filtrado sobre el catálogo de tarjetas estáticas en memoria.
   */
  public getFilteredCards(): CardData[] {
    return mockCards.filter((card) => {
      // A. Coincidencia por texto de búsqueda
      const matchesSearch =
        this.state.search === "" ||
        card.title.toLowerCase().includes(this.state.search.toLowerCase()) ||
        card.meta.toLowerCase().includes(this.state.search.toLowerCase());
        
      // B. Destinos
      const matchesDestination =
        this.state.destinations.length === 0 ||
        this.state.destinations.some((d) => card.meta.toLowerCase().includes(d.toLowerCase()));
        
      // C. Actividades / Aventura
      const matchesActivity =
        this.state.activities.length === 0 ||
        this.state.activities.includes(card.tag);
        
      // D. Límite de precio máximo
      const cardPriceNum = parseFloat(card.price.replace(/[^\d,]/g, "").replace(",", "."));
      const matchesPrice = cardPriceNum <= this.state.maxPrice;
      
      // E. Valoraciones (Rating >= 4.5)
      let matchesRating = true;
      if (this.state.ratings.length > 0) {
        matchesRating = this.state.ratings.some((ratingStr) => {
          if (ratingStr.includes("4.5+")) return card.rating >= 4.5;
          return true;
        });
      }
      
      return matchesSearch && matchesDestination && matchesActivity && matchesPrice && matchesRating;
    });
  }
}
