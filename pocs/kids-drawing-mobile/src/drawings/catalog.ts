import animals from './data/animals.json';
import bluePup from './data/blue-pup.json';
import christmas from './data/christmas.json';
import dinosaurs from './data/dinosaurs.json';
import farm from './data/farm.json';
import food from './data/food.json';
import halloween from './data/halloween.json';
import mouseFriends from './data/mouse-friends.json';
import piggyFamily from './data/piggy-family.json';
import princess from './data/princess.json';
import rescuePups from './data/rescue-pups.json';
import sea from './data/sea.json';
import space from './data/space.json';
import spring from './data/spring.json';
import summer from './data/summer.json';
import vehicles from './data/vehicles.json';

export type Shape = (string | number)[];
export type Drawing = { name: string; shapes: Shape[] };
export type Category = { id: string; name: string; emoji: string; color: string; drawings: Drawing[] };

export const BLANK: Drawing = { name: 'Free Draw', shapes: [] };

export const CATEGORIES: Category[] = [
  piggyFamily,
  rescuePups,
  mouseFriends,
  bluePup,
  princess,
  animals,
  dinosaurs,
  sea,
  farm,
  vehicles,
  space,
  food,
  halloween,
  christmas,
  summer,
  spring,
];
