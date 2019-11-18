export function return_to_leader(character: Entity, leader:Entity, range:Int) {
  if (parent.distance(character, leader) >= range){
    xmove(leader.x, leader.y);
  }
}
export function go_heal(character: Entity) {
  if (!in_attack_range(character)){
    xmove(character.x, character.y);
  }
  heal(character);
}
