import { greeting } from "TestModule";
import { BaseCharacter } from "lib/BaseCharacter";
import { Party } from "lib/Party";

greeting("TypeScript");
map_key("1", "sjnippet", "parent.start_runner();");
map_key("2", "snippet", "parent.stop_runner();");
map_key("3", "snippet", 'load_code("' + character.ctype + '")');
game_log("To reload your code, first press 2 to stop the current AI, and then press 3 to reload the code.");

var attack_mode=true;
var leader_mode=true;
var desired_party=['ZECHS', 'TYPHOS', 'ASHPHOLD'];
var party=get_active_characters();

if (character.name == "ZECHS"){
  if (!party.hasOwnProperty("TYPHOS")){
    start_character("TYPHOS", 1)
  }
  if (!party.hasOwnProperty("ASHPHOLD")) {
    start_character("ASHPHOLD", 2)
  }
}

//show_json(character);

setInterval(function(){

	if(character.hp<400 || character.mp<300) use_hp_or_mp();
	// Uses potions only when the above conditions are met
	loot();

	if(!attack_mode || character.moving) return;

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

},250);
