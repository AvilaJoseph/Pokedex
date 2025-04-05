import { Animated } from "react-native";
import { PokemonData } from "./pokemonData.interfaces";
 

export interface PokemonListProps {
  pokemons: PokemonData[];
  onToggleFavorite: (id: string) => void;
  scrollY: Animated.Value;
  contentPaddingTop?: number;
}