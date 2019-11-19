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

export function check_potion_stock(character) {
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

export function spawn_party(leader, party) {
  for (var member in party) {
    if (member != leader.name) {
      start_character(member);
    }
  }
}

export function logoff_party(party) {
  for (var member in party) {
      stop_character(member);
  }
}

export function check_health_and_mana(character) {
  if (character.hp<=character.max_hp-200 || character.mp<character.mp_cost) {
    use_hp_or_mp();
  }
}

export function attack_closest(character) {
  var target=get_targeted_monster();
	if(!target)
	{
		target=get_nearest_monster({min_xp:100,max_att:120,path_check:true,no_target:true});
		// Ensures that your character can walk to the target (path_check) and the target isn't engaging with anyone else (no_target)
		if(target) change_target(target);
		else
		{
			set_message("No Monsters");
			return;
		}
	}

	if(!in_attack_range(target))
	{
		move(
			character.real_x+(target.real_x-character.real_x)/2,
			character.real_y+(target.real_y-character.real_y)/2
			);
		// Walk half the distance
	}
	else if(can_attack(target))
	{
		set_message("Attacking");
		attack(target);
	}
}
