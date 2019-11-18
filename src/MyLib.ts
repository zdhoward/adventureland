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
export function check_potion_stock() {
  function item_quantity(name){
    for(var i=0;i<42;i++){
      if(character.items[i] && character.items[i].name==name) return character.items[i].q||0;
    }
    return 0;
  }

  if(item_quantity("mpot0")<5) // item_quantity is defined below
  {
    smart_move({to:"potions",return:true},function(){ buy("mpot0",10); });
    return;
  }
}
